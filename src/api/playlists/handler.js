class PlaylistHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postPlaylistsHandler(request, h) {
        this._validator.validatePlaylistPayload(request.payload);

        const { name } = request.payload;

        const playlistId = await this._service.addPlaylist(name);

        const response = h.response({
            status: 'success',
            message: 'Playlist berhasil ditambahkan',
            data: {
                playlistId,
            },
        });
        response.code(201);
        return response;
    }

    // eslint-disable-next-line no-unused-vars
    async getPlaylistsHandler(request, h) {
        const playlists = await this._service.getPlaylists();

        return {
            status: 'success',
            data: {
                playlists,
            },
        };
    }

    async deletePlaylistsHandler(request) {
        const { id } = request.params;

        await this._service.deletePlaylist(id);

        return {
            status: 'success',
            message: 'Playlist berhasil dihapus',
        };
    }
}

module.exports = PlaylistHandler;
