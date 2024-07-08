const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModelSong } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, performer, genre, duration, albumId }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('song gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs(title, performer) {
        let text = 'SELECT id, title, performer FROM songs';
        const values = [];

        if (title) {
            text += " WHERE title ILIKE '%' || $1 || '%'";
            values.push(title);
        }

        if (!title && performer) {
            text += " WHERE performer ILIKE '%' || $1 || '%'";
            values.push(performer);
        }

        if (title && performer) {
            text += " AND performer ILIKE '%' || $2 || '%'";
            values.push(performer);
        }

        const query = {
            text,
            values,
        };

        const result = await this._pool.query(query);

        return result.rows.map(mapDBToModelSong);
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('song tidak ditemukan');
        }

        return result.rows.map(mapDBToModelSong)[0];
    }

    async getSongByTitle(title) {
        const query = {
            text: 'SELECT * FROM songs WHERE title = $1',
            values: [title],
        };

        const result = await this._pool.query(query);
        return result.rows.map(mapDBToModelSong);
    }

    async editSongById(id, { title, year, performer, genre, duration }) {
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5 WHERE id = $6 RETURNING id',
            values: [title, year, performer, genre, duration, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('gagal update song. id tidak ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('song gagal dihapus. id tidak ditemukan');
        }
    }
}

module.exports = SongService;
