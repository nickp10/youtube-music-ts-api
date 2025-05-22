
<a name="interfaces-primaryreadmemd"></a>

[**youtube-music-ts-api**](../README.md)

***

# interfaces-primary

## Interfaces

- [IYouTubeMusic](#interfaces-primaryinterfacesiyoutubemusicmd)
- [IYouTubeMusicAuthenticated](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)
- [IYouTubeMusicGuest](#interfaces-primaryinterfacesiyoutubemusicguestmd)


<a name="interfaces-primaryinterfacesiyoutubemusicmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IYouTubeMusic

Defined in: [interfaces-primary.ts:7](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L7)

Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.

## Methods

### authenticate()

> **authenticate**(`cookiesStr`, `authUser`): `Promise`\<[`IYouTubeMusicAuthenticated`](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)\>

Defined in: [interfaces-primary.ts:16](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L16)

Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.

#### Parameters

##### cookiesStr

`string`

The cookie string of a valid logged in user. To obtain this cookie value, log into https://music.youtube.com as a user
and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored.

##### authUser

`number`

X-Goog-AuthUser header value

#### Returns

`Promise`\<[`IYouTubeMusicAuthenticated`](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)\>

A promise that will yield authenticated access to the YouTube Music API.

***

### guest()

> **guest**(): `Promise`\<[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd)\>

Defined in: [interfaces-primary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L23)

Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.

#### Returns

`Promise`\<[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd)\>

A promise that will yield guest access to the YouTube Music API.


<a name="interfaces-primaryinterfacesiyoutubemusicauthenticatedmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IYouTubeMusicAuthenticated

Defined in: [interfaces-primary.ts:29](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L29)

Defines the YouTube Music APIs available to an authenticated user. An authenticated user also naturally includes the APIs available to a guest.

## Extends

- [`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd)

## Methods

### addTracksToPlaylist()

> **addTracksToPlaylist**(`playlistId`, ...`tracks`): `Promise`\<`boolean`\>

Defined in: [interfaces-primary.ts:37](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L37)

Adds the tracks to the specified playlist.

#### Parameters

##### playlistId

`string`

The ID of the playlist to add the tracks to.

##### tracks

...[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

The array of tracks to add to the playlist.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

***

### createPlaylist()

> **createPlaylist**(`name`, `description?`, `privacy?`, `sourcePlaylistId?`): `Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)\>

Defined in: [interfaces-primary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L48)

Creates a playlist in the user's library.

#### Parameters

##### name

`string`

The name of the playlist to create.

##### description?

`string`

An optional description for the playlist.

##### privacy?

`string`

An optional privacy level for the playlist (either PUBLIC, PRIVATE, or UNLISTED).

##### sourcePlaylistId?

`string`

An optional playlist ID to copy the initial set of tracks from.

#### Returns

`Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)\>

A promise that will yield the playlist with its ID.

***

### deletePlaylist()

> **deletePlaylist**(`playlistId`): `Promise`\<`boolean`\>

Defined in: [interfaces-primary.ts:56](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L56)

Deletes a playlist from the user's library.

#### Parameters

##### playlistId

`string`

The ID of the playlist to delete.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

***

### getAlbum()

> **getAlbum**(`id`): `Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

Defined in: [interfaces-primary.ts:132](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L132)

Gets detailed information for a specific album.

#### Parameters

##### id

`string`

The ID of the album to get the detailed information for.

#### Returns

`Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

A promise that will yield the detailed information for a specific album.

#### Inherited from

[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd).[`getAlbum`](#getalbum)

***

### getLibraryAlbums()

> **getLibraryAlbums**(): `Promise`\<[`IAlbumSummary`](#interfaces-supplementaryinterfacesialbumsummarymd)[]\>

Defined in: [interfaces-primary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L63)

Gets all the albums in the user's library.

#### Returns

`Promise`\<[`IAlbumSummary`](#interfaces-supplementaryinterfacesialbumsummarymd)[]\>

A promise that will yield an array of all the albums in the user's library.

***

### getLibraryArtists()

> **getLibraryArtists**(): `Promise`\<[`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]\>

Defined in: [interfaces-primary.ts:70](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L70)

Gets all the artists in the user's library.

#### Returns

`Promise`\<[`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]\>

A promise that will yield an array of all the artists in the user's library.

***

### getLibraryHistory()

> **getLibraryHistory**(): `Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

Defined in: [interfaces-primary.ts:91](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L91)

Gets recently played tracks, in reverse chronological order, from the user's library

#### Returns

`Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

A promise that will yield a playlist with detailed information on a recently played tracks.

***

### getLibraryPlaylists()

> **getLibraryPlaylists**(): `Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)[]\>

Defined in: [interfaces-primary.ts:77](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L77)

Gets all the playlists in the user's library.

#### Returns

`Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)[]\>

A promise that will yield an array of all the playlists in the user's library.

***

### getLibraryTracks()

> **getLibraryTracks**(): `Promise`\<[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]\>

Defined in: [interfaces-primary.ts:84](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L84)

Gets all the tracks in the user's library.

#### Returns

`Promise`\<[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]\>

A promise that will yield an array of all the tracks in the user's library.

***

### getPlaylist()

> **getPlaylist**(`id`, `maxRetries?`): `Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

Defined in: [interfaces-primary.ts:145](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L145)

Gets detailed information for a specific playlist.

#### Parameters

##### id

`string`

The ID of the playlist to get the detailed information for.

##### maxRetries?

`number`

An optional maximum number of retries to obtain the tracks. YouTube Music is
incredibly buggy in that not all tracks will be returned in a single request. If the request is
retried, you may get a different set of tracks in the response. If you retry enough times, you
will eventually get all the tracks (a union operation is done internally between all the tracks
returned from each individual request).

#### Returns

`Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

A promise that will yield the detailed information for a specific playlist.

#### Inherited from

[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd).[`getPlaylist`](#getplaylist)

***

### moveTrackWithinPlaylist()

> **moveTrackWithinPlaylist**(`playlistId`, `trackToMove`, `trackToMoveBefore?`): `Promise`\<`boolean`\>

Defined in: [interfaces-primary.ts:101](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L101)

Moves the specified track within the playlist.

#### Parameters

##### playlistId

`string`

The ID of the playlist to move the track within.

##### trackToMove

[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)

The track that should be moved.

##### trackToMoveBefore?

[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)

An optional track to move the track before. If unspecified, the track will be moved to the end of the playlist.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

***

### rateTrack()

> **rateTrack**(`trackId`, `rating`): `Promise`\<`boolean`\>

Defined in: [interfaces-primary.ts:119](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L119)

Rates a track ("thumbs up"/"thumbs down" interaction).

#### Parameters

##### trackId

`string`

The ID of the track to rate.

##### rating

One of 'LIKE', 'DISLIKE', or 'INDIFFERENT'. 'INDIFFERENT' removes the previous rating and assigns no rating.

`"LIKE"` | `"DISLIKE"` | `"INDIFFERENT"`

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

***

### removeTracksFromPlaylist()

> **removeTracksFromPlaylist**(`playlistId`, ...`tracks`): `Promise`\<`boolean`\>

Defined in: [interfaces-primary.ts:110](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L110)

Removes the tracks from the specified playlist.

#### Parameters

##### playlistId

`string`

The ID of the playlist to remove the tracks from.

##### tracks

...[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

The array of tracks to remove from the playlist.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.


<a name="interfaces-primaryinterfacesiyoutubemusicguestmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IYouTubeMusicGuest

Defined in: [interfaces-primary.ts:125](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L125)

Defines the YouTube Music APIs available to a guest.

## Extended by

- [`IYouTubeMusicAuthenticated`](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)

## Methods

### getAlbum()

> **getAlbum**(`id`): `Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

Defined in: [interfaces-primary.ts:132](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L132)

Gets detailed information for a specific album.

#### Parameters

##### id

`string`

The ID of the album to get the detailed information for.

#### Returns

`Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

A promise that will yield the detailed information for a specific album.

***

### getPlaylist()

> **getPlaylist**(`id`, `maxRetries?`): `Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

Defined in: [interfaces-primary.ts:145](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L145)

Gets detailed information for a specific playlist.

#### Parameters

##### id

`string`

The ID of the playlist to get the detailed information for.

##### maxRetries?

`number`

An optional maximum number of retries to obtain the tracks. YouTube Music is
incredibly buggy in that not all tracks will be returned in a single request. If the request is
retried, you may get a different set of tracks in the response. If you retry enough times, you
will eventually get all the tracks (a union operation is done internally between all the tracks
returned from each individual request).

#### Returns

`Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

A promise that will yield the detailed information for a specific playlist.


<a name="interfaces-supplementaryreadmemd"></a>

[**youtube-music-ts-api**](../README.md)

***

# interfaces-supplementary

## Interfaces

- [IAlbumDetail](#interfaces-supplementaryinterfacesialbumdetailmd)
- [IAlbumSummary](#interfaces-supplementaryinterfacesialbumsummarymd)
- [IArtistSummary](#interfaces-supplementaryinterfacesiartistsummarymd)
- [IPlaylistDetail](#interfaces-supplementaryinterfacesiplaylistdetailmd)
- [IPlaylistSummary](#interfaces-supplementaryinterfacesiplaylistsummarymd)
- [IThumbnail](#interfaces-supplementaryinterfacesithumbnailmd)
- [ITrackDetail](#interfaces-supplementaryinterfacesitrackdetailmd)


<a name="interfaces-supplementaryinterfacesialbumdetailmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IAlbumDetail

Defined in: [interfaces-supplementary.ts:4](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L4)

Defines the details for an album.

## Properties

### artists?

> `optional` **artists**: [`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]

Defined in: [interfaces-supplementary.ts:33](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L33)

The artist(s) that composed the album.

***

### count?

> `optional` **count**: `number`

Defined in: [interfaces-supplementary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L23)

The count of tracks within the album.

***

### description?

> `optional` **description**: `string`

Defined in: [interfaces-supplementary.ts:18](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L18)

The description of the album.

***

### durationMillis?

> `optional` **durationMillis**: `number`

Defined in: [interfaces-supplementary.ts:28](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L28)

The duration of the album in milliseconds.

***

### id?

> `optional` **id**: `string`

Defined in: [interfaces-supplementary.ts:8](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L8)

The ID of the album.

***

### name?

> `optional` **name**: `string`

Defined in: [interfaces-supplementary.ts:13](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L13)

The name of the album.

***

### releaseDay?

> `optional` **releaseDay**: `number`

Defined in: [interfaces-supplementary.ts:38](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L38)

The day the album was released.

***

### releaseMonth?

> `optional` **releaseMonth**: `number`

Defined in: [interfaces-supplementary.ts:43](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L43)

The month the album was released.

***

### releaseYear?

> `optional` **releaseYear**: `number`

Defined in: [interfaces-supplementary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L48)

The year the album was released.

***

### tracks

> **tracks**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

Defined in: [interfaces-supplementary.ts:53](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L53)

The array of tracks within the album.


<a name="interfaces-supplementaryinterfacesialbumsummarymd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IAlbumSummary

Defined in: [interfaces-supplementary.ts:59](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L59)

Defines an album summary.

## Properties

### artist?

> `optional` **artist**: [`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)

Defined in: [interfaces-supplementary.ts:73](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L73)

The artist that composed the album.

***

### id?

> `optional` **id**: `string`

Defined in: [interfaces-supplementary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L63)

The ID of the album.

***

### name?

> `optional` **name**: `string`

Defined in: [interfaces-supplementary.ts:68](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L68)

The name of the album.

***

### year?

> `optional` **year**: `string`

Defined in: [interfaces-supplementary.ts:78](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L78)

The year the album was released.


<a name="interfaces-supplementaryinterfacesiartistsummarymd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IArtistSummary

Defined in: [interfaces-supplementary.ts:84](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L84)

Defines an artist summary.

## Properties

### id?

> `optional` **id**: `string`

Defined in: [interfaces-supplementary.ts:88](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L88)

The ID of the artist.

***

### name?

> `optional` **name**: `string`

Defined in: [interfaces-supplementary.ts:93](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L93)

The name of the artist.


<a name="interfaces-supplementaryinterfacesiplaylistdetailmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IPlaylistDetail

Defined in: [interfaces-supplementary.ts:99](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L99)

Defines the details for a playlist.

## Properties

### count?

> `optional` **count**: `number`

Defined in: [interfaces-supplementary.ts:118](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L118)

The count of tracks within the playlist.

***

### description?

> `optional` **description**: `string`

Defined in: [interfaces-supplementary.ts:113](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L113)

The description of the playlist.

***

### id?

> `optional` **id**: `string`

Defined in: [interfaces-supplementary.ts:103](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L103)

The ID of the playlist.

***

### name?

> `optional` **name**: `string`

Defined in: [interfaces-supplementary.ts:108](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L108)

The name of the playlist.

***

### privacy?

> `optional` **privacy**: `string`

Defined in: [interfaces-supplementary.ts:123](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L123)

The privacy level of the playlist. This value will be PUBLIC, PRIVATE, or UNLISTED.

***

### tracks?

> `optional` **tracks**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

Defined in: [interfaces-supplementary.ts:128](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L128)

The array of tracks within the playlist.


<a name="interfaces-supplementaryinterfacesiplaylistsummarymd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IPlaylistSummary

Defined in: [interfaces-supplementary.ts:134](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L134)

Defines a playlist summary.

## Properties

### count?

> `optional` **count**: `number`

Defined in: [interfaces-supplementary.ts:148](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L148)

The count of tracks within the playlist.

***

### id?

> `optional` **id**: `string`

Defined in: [interfaces-supplementary.ts:138](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L138)

The ID of the playlist.

***

### name?

> `optional` **name**: `string`

Defined in: [interfaces-supplementary.ts:143](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L143)

The name of the playlist.

***

### thumbnails?

> `optional` **thumbnails**: [`IThumbnail`](#interfaces-supplementaryinterfacesithumbnailmd)[]

Defined in: [interfaces-supplementary.ts:153](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L153)

The thumbnails for the playlist (ordered from smallest to largest).


<a name="interfaces-supplementaryinterfacesithumbnailmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: IThumbnail

Defined in: [interfaces-supplementary.ts:215](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L215)

Defines the details for a thumbnail.

## Properties

### height?

> `optional` **height**: `number`

Defined in: [interfaces-supplementary.ts:229](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L229)

The height of the thumbnail.

***

### url?

> `optional` **url**: `string`

Defined in: [interfaces-supplementary.ts:219](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L219)

The URL for the thumbnail.

***

### width?

> `optional` **width**: `number`

Defined in: [interfaces-supplementary.ts:224](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L224)

The width of the thumbnail.


<a name="interfaces-supplementaryinterfacesitrackdetailmd"></a>

[**youtube-music-ts-api**](../../README.md)

***

# Interface: ITrackDetail

Defined in: [interfaces-supplementary.ts:159](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L159)

Defines the details for a track.

## Properties

### album?

> `optional` **album**: [`IAlbumSummary`](#interfaces-supplementaryinterfacesialbumsummarymd)

Defined in: [interfaces-supplementary.ts:184](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L184)

The album the track is from.

***

### alternateId?

> `optional` **alternateId**: `string`

Defined in: [interfaces-supplementary.ts:169](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L169)

An alternate ID of the track. YouTube internally refers to this value as the setVideoId. This ID
is used in combination with the standard ID in order to remove tracks from playlists.

***

### artists?

> `optional` **artists**: [`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]

Defined in: [interfaces-supplementary.ts:179](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L179)

The artist(s) that compose the track.

***

### duration?

> `optional` **duration**: `string`

Defined in: [interfaces-supplementary.ts:189](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L189)

The duration of the track as a readable string.

***

### durationMillis?

> `optional` **durationMillis**: `number`

Defined in: [interfaces-supplementary.ts:194](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L194)

The duration of the track in milliseconds.

***

### id?

> `optional` **id**: `string`

Defined in: [interfaces-supplementary.ts:163](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L163)

The ID of the track.

***

### likeStatus?

> `optional` **likeStatus**: `"LIKE"` \| `"DISLIKE"` \| `"INDIFFERENT"`

Defined in: [interfaces-supplementary.ts:209](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L209)

The rating for the track (LIKE, DISLIKE, or INDIFFERENT).

***

### thumbnails?

> `optional` **thumbnails**: [`IThumbnail`](#interfaces-supplementaryinterfacesithumbnailmd)[]

Defined in: [interfaces-supplementary.ts:204](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L204)

The thumbnails for the track (ordered from smallest to largest).

***

### title?

> `optional` **title**: `string`

Defined in: [interfaces-supplementary.ts:174](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L174)

The title of the track.

***

### trackNumber?

> `optional` **trackNumber**: `number`

Defined in: [interfaces-supplementary.ts:199](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L199)

The track number within an album.
