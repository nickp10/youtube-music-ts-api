import YouTubeMusic from "./service/youtube-music";

/*
* This file is for internal testing purposes only and is not necessary for the resulting library.
* This allows the library to be tested in a sandbox environment during development.
*/
async function main(): Promise<void> {
    const cookieStr = "TODO: PUT YOUR COOKIE STRING HERE";
    const ytm = new YouTubeMusic();
    const ytma = await ytm.authenticate(cookieStr);
    const playlists = await ytma.getLibraryPlaylists();
    if (playlists) {
        for (const playlist of playlists) {
            console.log("Playlist: " + playlist.name);
            const playlistDetail = await ytma.getPlaylist(playlist.id);
            if (playlistDetail) {
                for (const track of playlistDetail.tracks) {
                    console.log("    Track: " + track.title);
                }
            }
        }
    }
}
main();
