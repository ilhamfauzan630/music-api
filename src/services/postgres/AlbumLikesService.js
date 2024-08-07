const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumLikesService {
    constructor(cacheService) {
        this._pool = new Pool();
        this._cacheService = cacheService;
    }

    async addLikeAlbum(albumId, userId) {
        await this.verifyUserAndAlbumIsExist(userId, albumId);
        await this.verifyLikeAlbum(albumId, userId);

        const id = `like-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
            values: [id, userId, albumId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Gagal menambahkan like pada album');
        }

        await this._cacheService.delete(`likes:${albumId}`);

        return result.rows[0].id;
    }

    async verifyLikeAlbum(albumId, userId) {
        const query = {
            text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
            values: [userId, albumId],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Anda sudah memberikan like pada album ini');
        }
    }

    async verifyUserAndAlbumIsExist(userId, albumId) {
        const query = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [albumId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }

        const query2 = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [userId],
        };

        const result2 = await this._pool.query(query2);

        if (!result2.rows.length) {
            throw new NotFoundError('User tidak ditemukan');
        }
    }

    async getLikeCount(albumId) {
        try {
            const result = await this._cacheService.get(`likes:${albumId}`);

            const parseResult = JSON.parse(result);
            return {
                source: 'cache',
                likes: parseInt(parseResult, 10),
            };
        } catch (error) {
            const query = {
                text: 'SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1',
                values: [albumId],
            };

            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal mengambil like album');
            }

            await this._cacheService.set(`likes:${albumId}`, JSON.stringify(result.rows[0].count));

            return {
                source: 'database',
                likes: Number(result.rows[0].count),
            };
        }
    }

    async deleteLikeAlbum(albumId, userId) {
        const query = {
            text: 'DELETE FROM user_album_likes WHERE album_id = $1 AND user_id = $2 RETURNING id',
            values: [albumId, userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal menghapus like album');
        }

        await this._cacheService.delete(`likes:${albumId}`);
    }
}

module.exports = AlbumLikesService;
