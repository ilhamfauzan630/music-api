// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumService {
    constructor() {
        this._albums = [];
    }

    addAlbum({ name, year }) {
        const id = nanoid(16);

        const newAlbum = {
            id, name, year,
        };

        this._albums.push(newAlbum);

        const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('album gagal ditambahkan');
        }

        return id;
    }

    getAlbumById(id) {
        const album = this._albums.filter((a) => a.id === id)[0];

        if (!album) {
            throw new NotFoundError('catatan tidak ditemukan');
        }
        return album;
    }

    editAlbumById(id, { name, year }) {
        const index = this._albums.findIndex((a) => a.id === id);

        if (index === -1) {
            throw new NotFoundError('gagal memperbaharui album. id tidak ditemukan');
        }

        this._albums[index] = {
            ...this._albums[index],
            name,
            year,
        };
    }

    deleteAlbumById(id) {
        const index = this._albums.findIndex((a) => a.id === id);

        if (index === -1) {
            throw new NotFoundError('gagal menghapus album. id tidak ditemukan');
        }

        this._albums.splice(index, 1);
    }
}

module.exports = AlbumService;
