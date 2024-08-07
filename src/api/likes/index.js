const AlbumLikeHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'likes',
    version: '1.0.0',
    register: async (server, { service }) => {
        const albumLikeHandler = new AlbumLikeHandler(service);

        server.route(routes(albumLikeHandler));
    },
};
