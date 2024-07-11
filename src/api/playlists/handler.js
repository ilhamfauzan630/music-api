class PlaylistHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postPlaylistsHandler(request, h) {
        this._validator.validatePlaylistPayload(request.payload);

        const { name } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        const playlistId = await this._service.addPlaylist(name, credentialId);

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
        const { id: credentialId } = request.auth.credentials;

        const playlists = await this._service.getPlaylists(credentialId);

        return {
            status: 'success',
            data: {
                playlists,
            },
        };
    }

    async deletePlaylistsByIdHandler(request) {
        const { id } = request.params;

        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistOwner(id, credentialId);
        await this._service.deletePlaylistById(id);

        return {
            status: 'success',
            message: 'Playlist berhasil dihapus',
        };
    }

    async postPlaylistSongsHandler(request, h) {
        this._validator.validatePlaylistSongsPayload(request.payload);

        const { songId } = request.payload;
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistAccess(id, credentialId);
        await this._service.verifySongIsExist(songId);
        await this._service.addSongToPlaylist(id, songId, credentialId);

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan ke playlist',
        });
        response.code(201);
        return response;
    }

    // eslint-disable-next-line no-unused-vars
    async getSongsInPlaylistHandler(request, h) {
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistAccess(id, credentialId);

        const playlist = await this._service.getSongsInPlaylist(id);

        return {
            status: 'success',
            data: {
                playlist,
            },
        };
    }

    async deleteSongInPlaylistHandler(request) {
        await this._validator.validatePlaylistSongsPayload(request.payload);

        const { id } = request.params;
        const { songId } = request.payload;

        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistAccess(id, credentialId);
        await this._service.verifySongIsExist(songId);
        await this._service.deleteSongInPlaylistById(id, songId, credentialId);

        return {
            status: 'success',
            message: 'Lagu berhasil dihapus dari playlist',
        };
    }

    // eslint-disable-next-line no-unused-vars
    async getPlaylistSongsActivityHandler(request, h) {
        const { id: playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistAccess(playlistId, credentialId);

        const activities = await this._service.getPlaylistSongsActivity(playlistId);

        return {
            status: 'success',
            data: {
                playlistId,
                activities,
            },
        };
    }
}

module.exports = PlaylistHandler;
