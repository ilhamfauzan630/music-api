class CollaborationsHandler {
    constructor(collaborationsService, playlistsService, validator) {
        this._collaborationsService = collaborationsService;
        this._playlistsService = playlistsService;
        this._validator = validator;
    }

    async postCollaborationHandler(request, h) {
        this._validator.validateCollaborationPayload(request.payload);

        const { id: credentialId } = request.auth.credentials;
        const { playlistId, userId } = request.payload;

        await this._collaborationsService.verifyUserIsExist(userId);
        await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
        /* eslint max-len: ["error", { "code": 200 }] */
        const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

        const response = h.response({
            status: 'success',
            message: 'Kolaborasi berhasil ditambahkan',
            data: {
                collaborationId,
            },
        });
        response.code(201);
        return response;
    }

    // eslint-disable-next-line no-unused-vars
    async deleteCollaborationHandler(request, h) {
        this._validator.validateCollaborationPayload(request.payload);

        const { id: credentialId } = request.auth.credentials;
        const { playlistId, userId } = request.payload;

        await this._collaborationsService.verifyUserIsExist(userId);

        await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
        await this._collaborationsService.deleteCollaboration(playlistId, userId);

        return {
            status: 'success',
            message: 'Kolaborasi berhasil dihapus',
        };
    }
}

module.exports = CollaborationsHandler;
