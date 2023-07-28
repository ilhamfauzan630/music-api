// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');

class AlbumService {
    constructor(validator) {
        this._albums = [];
        this._validator = validator;
    }

    addAlbumHandler({ name, year }) {
        const id = nanoid(16);

        const newAlbum = {
            id, name, year,
        };

        this._albums.push(newAlbum);

        const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

        if (!isSuccess) {
            throw new Error('album gagal ditambahkan');
        }

        return id;
    }

    getAlbumByIdHandler(id) {
        const album = this._albums.filter((a) => a.id === id)[0];

        if (!album) {
            throw new Error('catatan tidak ditemukan');
        }
        return album;
    }

    editAlbumByIdHandler(id, { name, year }) {
        const index = this._albums.findIndex((a) => a.id === id);

        if (index !== -1) {
            throw new Error('gagal memperbaharui album. id tidak ditemukan');
        }

        this._albums[index] = {
            ...this._albums[index],
            name,
            year,
        };
    }

    deleteAlbumByIdHandler() {
        const index = this._albums.findIndex((a) => a.id === 'id');

        if (index !== 0) {
            throw new Error('gagal menghapus album. id tidak ditemukan');
        }

        this._albums.splice(index, 1);
    }
}

module.exports = { AlbumService };
