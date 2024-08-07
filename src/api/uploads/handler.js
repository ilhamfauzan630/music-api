class UploadsHandler {
    constructor(service, validator, albumService) {
        this._service = service;
        this._validator = validator;
        this._albumService = albumService;
    }

    async postUploadImageHandler(request, h) {
        const { cover } = request.payload;
        const { id } = request.params;

        this._validator.validateImageHeaders(cover.hapi.headers);

        const filename = await this._service.writeFile(cover, cover.hapi);

        const location = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;

        await this._albumService.updateAlbumCoverHandler(id, location);

        const response = h.response({
            status: 'success',
            message: 'Sampul berhasil diunggah',
        });
        response.code(201);
        return response;
    }
}

module.exports = UploadsHandler;
