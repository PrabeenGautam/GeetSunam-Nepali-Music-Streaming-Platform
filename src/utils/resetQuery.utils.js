export function resetQuery({ location, queryClient }) {
  if (location.startsWith("/home")) {
    queryClient.invalidateQueries("recentlyPlayed");
    return;
  }

  if (location.startsWith("/trends")) {
    queryClient.invalidateQueries("trendingSongs");
    return;
  }

  if (location.startsWith("/releases")) {
    queryClient.invalidateQueries("newReleases");
    return;
  }

  if (location.startsWith("/recommendation")) {
    queryClient.invalidateQueries("recommendedSongs");
    return;
  }

  if (location.startsWith("/likedsongs")) {
    queryClient.invalidateQueries("likedSongs");
    return;
  }

  const artistsRegex = /\/artists\//;
  const playlistsRegex = /\/playlists\//;

  if (location.match(artistsRegex)) {
    const artistsId = location.split("/").pop();
    if (!artistsId.includes("artists")) {
      queryClient.invalidateQueries(["songs", artistsId]);
    }
    return;
  }

  if (location.match(playlistsRegex)) {
    const id = location.split("/").pop();
    if (!id.includes("playlists")) {
      queryClient.invalidateQueries(["playlists", id]);
    }
    return;
  }
}
