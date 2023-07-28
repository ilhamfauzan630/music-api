const {
    addAlbumHandler,
    getAlbumByIdHandler,
    editAlbumByIdHandler,
    deleteAlbumByIdHandler,
} = require('./handler');

const routes = [{
        method: 'POST',
        path: '/album',
        handler: addAlbumHandler,
    },
    {
        method: 'GET',
        path: '/album{id}',
        handler: getAlbumByIdHandler,
    },
    {
        method: 'PUT',
        path: '/album{id}',
        handler: editAlbumByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/album{id}',
        handler: deleteAlbumByIdHandler,
    },
];

module.exports = routes;
