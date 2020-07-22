import YouTubeMusic from "./service/youtube-music";

/*
* This file is for internal testing purposes only and is not necessary for the resulting library.
* This allows the library to be tested in a sandbox environment during development.
*/
async function main(): Promise<void> {
    const cookieStr = "TODO: PUT YOUR COOKIE STRING HERE";
    const ytm = new YouTubeMusic();
    const ytma = await ytm.authenticate(cookieStr);
    const ytmg = await ytm.guest();
    const album = await ytmg.getAlbum("MPREb_NDXVvJ4Gt60");
    console.log("Album: " + album.name);
    if (album) {
        for (const track of album.tracks) {
            console.log("    " + track.trackNumber + ": " + track.title);
        }
    }
    const playlist = await ytmg.getPlaylist("VLRDCLAK5uy_nnk58Y3rT4Y62vuYUvGpWGjxL9wsb10uI");
    console.log("Playlist: " + playlist.name);
    if (playlist) {
        for (const track of playlist.tracks) {
            console.log("    " + track.artists[0].name + " - \"" + track.title + "\"");
        }
    }
    console.log("Library Albums");
    const albums = await ytma.getLibraryAlbums();
    if (albums) {
        for (const album of albums) {
            console.log("    Album: " + album.name);
        }
    }
    console.log("Library Artists");
    const artists = await ytma.getLibraryArtists();
    if (artists) {
        for (const artist of artists) {
            console.log("    Artist: " + artist.name);
        }
    }
    console.log("Library Playlists");
    const playlists = await ytma.getLibraryPlaylists();
    if (playlists) {
        for (const playlist of playlists) {
            console.log("    Playlist: " + playlist.name);
        }
    }
    console.log("Library Tracks");
    const tracks = await ytma.getLibraryTracks();
    if (tracks) {
        for (const track of tracks) {
            console.log("    " + track.artists[0].name + " - \"" + track.title + "\"");
        }
    }
}
main();
