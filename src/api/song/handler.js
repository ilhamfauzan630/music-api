// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const songs = require('./song');

const addSongHandler = (request, h) => {
    const { title = 'untitled', year, performer, genre, duration, albumId } = request.payload;

    const id = nanoid(16);

    const newSong = {
        id, title, year, performer, genre, duration, albumId,
    };

    songs.push(newSong);

    const isSuccess = songs.filter((song) => song.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'song berhasil ditambahkan',
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'song gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllSongsHandler = () => ({
    status: 'success',
    data: {
        songs,
    },
});

const getSongByIdHandler = (request, h) => {
    const { id } = request.params;

    const song = songs.filter((n) => n.id === id)[0];

    if (song !== undefined) {
        return {
            status: 'success',
            data: {
                song: songs,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'album gagal ditambahkan',
    });
    response.code(404);
    return response;
};

const editSongByIdHandler = (request, h) => {
    const { id } = request.params;

    const { name, year } = request.payload;

    const index = songs.findIndex((song) => song.id === id);

    if (index !== -1) {
        songs[index] = {
            ...songs[index],
            name,
            year,
        };

        const response = h.response({
            status: 'success',
            message: 'album berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'album gagal diperbaharui',
    });
    response.code(404);
    return response;
};

const deleteSongByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = songs.findIndex((song) => song.id === id);

    if (index !== -1) {
        songs.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'album berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal dihapus',
    });
    response.code(404);
    return response;
};

module.exports = {
    addSongHandler,
    getAllSongsHandler,
    getSongByIdHandler,
    editSongByIdHandler,
    deleteSongByIdHandler,
};
