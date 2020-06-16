import YouTubeMusic from "./service/youtube-music";

async function main(): Promise<void> {
    const ytma = await YouTubeMusic.authenticate("");
    const response = await ytma.browse();
    console.log(response);
}
main();
