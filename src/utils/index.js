const mapDBToModelAlbum = ({
    id,
    name,
    year,
}) => ({
    id,
    name,
    year,
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
