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
        handler: (request, h) => handler.deletePlaylistsByIdHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
    {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: (request, h) => handler.postPlaylistSongsHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: (request, h) => handler.getSongsInPlaylistHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}/songs',
        handler: (request, h) => handler.deleteSongInPlaylistHandler(request, h),
        options: {
            auth: 'apimusic_jwt',
        },
    },
];

module.exports = routes;
