const {
    addSongHandler,
    getAllSongsHandler,
    getSongByIdHandler,
    editSongByIdHandler,
    deleteSongByIdHandler,
} = require('./handler');

const routes = [{
        method: 'POST',
        path: '/song',
        handler: addSongHandler,
    },
    {
        method: 'GET',
        path: '/song',
        handler: getAllSongsHandler,
    },
    {
        method: 'GET',
        path: '/song{id}',
        handler: getSongByIdHandler,
    },
    {
        method: 'PUT',
        path: '/song{id}',
        handler: editSongByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/song{id}',
        handler: deleteSongByIdHandler,
    },
];

module.exports = routes;
