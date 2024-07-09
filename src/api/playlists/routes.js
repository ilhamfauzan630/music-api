const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: (request, h) => handler.postPlaylistsHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: (request, h) => handler.getPlaylistsHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}',
        handler: (request, h) => handler.deletePlaylistsHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
];

module.exports = routes;
