# youtube-music-ts-api

Description
----
This is a TypeScript API for YouTube Music (not to be confused with music videos and what not that you can watch on YouTube). This is written in TypeScript with all the appropriate types exported, so that you can easily use this API in your developer tools.

Using the API
----
This node module can be used as a dependency of another node module. Run `npm install youtube-music-ts-api --save` to add it as a dependency to your node module. An example usage of the module (note this example was built with the TypeScript target set to es6 and module set to commonjs, i.e. `tsc demo.ts --target es6 --module commonjs`):

```
import YouTubeMusic from "youtube-music-ts-api";

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
```

For more detailed information regarding the API, visit the [DOCUMENTATION.md](DOCUMENTATION.md).

Contributing
----
It would be greatly appreciated to have others contribute into this project by submitting pull requests that can be merged. The main things that could be worked on would be improved API authentication to remove the current manual process and/or building out more API calls that YouTube Music provides. All other features and changes are welcome as well pending a code review. Some commands that are useful when developing in this project are:

1. Run `npm install` to initialize the project.
1. Run `npm run test` to run the unit tests or `npm run test-coverage` to retrieve code coverage.
1. Run `npm run build` to build the production version of the API or `npm run build-debug` to build a debuggable version of the API.
1. Run `npm run build-docs` to build an updated API documentation markdown file.

Attribution
----
A huge thanks goes to the [ytmusicapi](https://github.com/sigma67/ytmusicapi) which is a Python API that did a lot of the groundwork reverse engineering the YouTube Music API.

Thanks to this [StackOverflow](https://stackoverflow.com/a/32065323/5726546) post for reverse engineering the authentication to the YouTube Music API (which is attributed in the source code of ytmusicapi).

Thanks to [YouTube Music](https://music.youtube.com/) for building a platform for our music pleasures.
