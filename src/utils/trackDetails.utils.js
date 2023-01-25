export function trackDetails(songsList) {
  if (Array.isArray(songsList)) {
    return songsList.map((song) => {
      return {
        ...song,
        trackDetails: {
          ID: song.ID || song._id,
          title: song.title,
          coverArt: song.coverArt,
          artists: song.artists.fullname,
          artist: song.artists.fullname,
          source: song.stream,
          isFavourite: song.isFavourite,
          isFeatured: song.isFeatured,
        },
      };
    });
  } else
    return {
      ...songsList,
      trackDetails: {
        ID: songsList?.ID || songsList?._id,
        title: songsList?.title,
        coverArt: songsList?.coverArt,
        artists: songsList?.artists.fullname,
        artist: songsList?.artists.fullname,
        source: songsList?.stream,
        isFavourite: songsList?.isFavourite,
        isFeatured: songsList?.isFeatured,
      },
    };
}
