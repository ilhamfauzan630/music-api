/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addColumn('playlists', {
        owner: {
            type: 'VARCHAR(50)',
        },
    });

    pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
    pgm.dropColumn('playlists', 'owner');
};
