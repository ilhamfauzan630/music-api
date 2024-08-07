const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums/{id}/likes',
        handler: (request, h) => handler.postAlbumLikeHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/albums/{id}/likes',
        handler: (request, h) => handler.getCountAlbumLikeHandler(request, h),
    },
    {
        method: 'DELETE',
        path: '/albums/{id}/likes',
        handler: (request, h) => handler.deleteAlbumLikeHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
];

module.exports = routes;
