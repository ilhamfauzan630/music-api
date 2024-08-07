const mapDBToModelAlbum = ({
    id,
    name,
    year,
    cover,
}) => ({
    id,
    name,
    year,
    coverUrl: cover,
});

const mapDBToModelSong = ({
        id,
        title,
        year,
        performer,
        genre,
        duration,
        // eslint-disable-next-line camelcase
        album_id,
    }) => ({
        id,
        title,
        year,
        performer,
        genre,
        duration,
        // eslint-disable-next-line camelcase
        albumId: album_id,
});

module.exports = { mapDBToModelAlbum, mapDBToModelSong };
