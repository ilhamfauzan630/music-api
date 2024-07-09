const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist(name) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO playlists VALUES($1, $2) RETURNING id',
            values: [id, name],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Playlist gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getPlaylists() {
        const query = {
            text: 'SELECT id, name FROM playlists',
        };

        const result = await this._pool.query(query);

        return result.rows;
    }

    async deletePlaylists(id) {
        const query = {
            text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Playlist gagal dihapus');
        }
    }
}

module.exports = PlaylistsService;
