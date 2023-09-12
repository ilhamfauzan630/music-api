const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongService {
    constructor() {
        this._songs = [];
    }

    addSong({ title, year, performer, genre, duration, albumId }) {
        const id = nanoid(16);

        const newSong = { id, title, year, performer, genre, duration, albumId };

        this._songs.push(newSong);

        const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('song berhasil ditambahkan');
        }

        return id;
    }

    getSongs() {
        return this._songs.map((s) => ({
            id: s.id,
            title: s.id,
            performer: s.performer,
        }));
    }

    getSongById(id) {
        const song = this._songs.filter((s) => s.id === id)[0];

        if (!song) {
            throw new NotFoundError('song tidak ditemukan');
        }

        return song;
    }

    editSongById(id, { title, year, performer, genre, duration, albumId }) {
        const index = this._songs.findIndex((song) => song.id === id);

        if (index === -1) {
            throw new NotFoundError('gagal memperbaharui song. id tidak ditemukan');
        }

        this._songs[index] = {
            ...this._songs[index],
            title,
            year,
            performer,
            genre,
            duration,
            albumId,
        };
    }

    deleteSongById(id) {
        const index = this._songs.findIndex((song) => song.id === id);

        if (index === -1) {
            throw new NotFoundError('gagal menghapus song. id tidak ditemukan');
        }

        this._songs.splice(index, 1);
    }
}

module.exports = SongService;
