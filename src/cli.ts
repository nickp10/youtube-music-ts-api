import YouTubeMusic from "./service/youtube-music";

/*
* This file is for internal testing purposes only and is not necessary for the resulting library.
* This allows the library to be tested in a sandbox environment during development.
*/
async function main(): Promise<void> {
    const ytma = await YouTubeMusic.authenticate("");
    const playlists = await ytma.getLibraryPlaylists();
    if (playlists && playlists.length > 0) {
        const playlist = await ytma.getPlaylist(playlists[0].id);
        console.log(JSON.stringify(playlist));
    }
}
main();
