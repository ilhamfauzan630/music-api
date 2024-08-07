class AlbumLikeHandler {
    constructor(service) {
        this._service = service;
    }

    async postAlbumLikeHandler(request, h) {
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.addLikeAlbum(id, credentialId);

        const response = h.response({
            status: 'success',
            message: 'Like berhasil ditambahkan',
        });

        response.code(201);
        return response;
    }

    async getCountAlbumLikeHandler(request, h) {
        const { id } = request.params;

        const { source, likes } = await this._service.getLikeCount(id);

        const response = h.response({
            status: 'success',
            data: {
                likes,
            },
        });

        response.header('X-Data-Source', source);

        return response;
    }

    async deleteAlbumLikeHandler(request) {
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.deleteLikeAlbum(id, credentialId);

        return {
            status: 'success',
            message: 'Like berhasil dihapus',
        };
    }
}

module.exports = AlbumLikeHandler;
