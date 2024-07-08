class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postSongHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { title, year, performer, genre, duration, albumId } = request.payload;

        // eslint-disable-next-line max-len
        const songId = await this._service.addSong({ title, year, performer, genre, duration, albumId });

        const response = h.response({
            status: 'success',
            message: 'Song berhasil ditambahkan',
            data: {
                songId,
            },
        });
        response.code(201);
        return response;
    }

    // eslint-disable-next-line no-unused-vars
    async getSongsHandler(request, h) {
        const { title = null, performer = null } = request.query;

        const songs = await this._service.getSongs(title, performer);
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    // eslint-disable-next-line no-unused-vars
    async getSongByIdHandler(request, h) {
        const { id } = request.params;

        const song = await this._service.getSongById(id);
        return {
            status: 'success',
            data: {
                song,
            },
        };
    }

    // eslint-disable-next-line no-unused-vars
    async getSongByTitleHandler(request, h) {
        const { title = '' } = request.query;

        const songs = await this._service.getSongByTitle(title);
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    // eslint-disable-next-line no-unused-vars
    async putSongByIdHandler(request, h) {
        this._validator.validateSongPayload(request.payload);

        const { id } = request.params;

        await this._service.editSongById(id, request.payload);

        return {
            status: 'success',
            message: 'Song berhasil diperbaharui',
        };
    }

    // eslint-disable-next-line no-unused-vars
    async deleteSongByIdHandler(request, h) {
        const { id } = request.params;

        await this._service.deleteSongById(id);

        return {
            status: 'success',
            message: 'Song berhasil dihapus',
        };
    }
}

module.exports = SongsHandler;
