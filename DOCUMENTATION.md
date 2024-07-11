
<a name="interfaces-primaryreadmemd"></a>

[**youtube-music-ts-api**](../README.md) • **Docs**

***

# interfaces-primary

## Index

### Interfaces

- [IYouTubeMusic](#interfaces-primaryinterfacesiyoutubemusicmd)
- [IYouTubeMusicAuthenticated](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)
- [IYouTubeMusicGuest](#interfaces-primaryinterfacesiyoutubemusicguestmd)


<a name="interfaces-primaryinterfacesiyoutubemusicmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IYouTubeMusic

Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.

## Methods

### authenticate()

> **authenticate**(`cookiesStr`, `authUser`): `Promise`\<[`IYouTubeMusicAuthenticated`](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)\>

Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.

#### Parameters

• **cookiesStr**: `string`

The cookie string of a valid logged in user. To obtain this cookie value, log into https://music.youtube.com as a user
and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored.

• **authUser**: `number`

X-Goog-AuthUser header value

#### Returns

`Promise`\<[`IYouTubeMusicAuthenticated`](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)\>

A promise that will yield authenticated access to the YouTube Music API.

#### Defined in

[interfaces-primary.ts:16](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L16)

***

### guest()

> **guest**(): `Promise`\<[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd)\>

Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.

#### Returns

`Promise`\<[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd)\>

A promise that will yield guest access to the YouTube Music API.

#### Defined in

[interfaces-primary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L23)


<a name="interfaces-primaryinterfacesiyoutubemusicauthenticatedmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IYouTubeMusicAuthenticated

Defines the YouTube Music APIs available to an authenticated user. An authenticated user also naturally includes the APIs available to a guest.

## Extends

- [`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd)

## Methods

### addTracksToPlaylist()

> **addTracksToPlaylist**(`playlistId`, ...`tracks`): `Promise`\<`boolean`\>

Adds the tracks to the specified playlist.

#### Parameters

• **playlistId**: `string`

The ID of the playlist to add the tracks to.

• ...**tracks**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

The array of tracks to add to the playlist.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

#### Defined in

[interfaces-primary.ts:37](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L37)

***

### createPlaylist()

> **createPlaylist**(`name`, `description`?, `privacy`?, `sourcePlaylistId`?): `Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)\>

Creates a playlist in the user's library.

#### Parameters

• **name**: `string`

The name of the playlist to create.

• **description?**: `string`

An optional description for the playlist.

• **privacy?**: `string`

An optional privacy level for the playlist (either PUBLIC, PRIVATE, or UNLISTED).

• **sourcePlaylistId?**: `string`

An optional playlist ID to copy the initial set of tracks from.

#### Returns

`Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)\>

A promise that will yield the playlist with its ID.

#### Defined in

[interfaces-primary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L48)

***

### deletePlaylist()

> **deletePlaylist**(`playlistId`): `Promise`\<`boolean`\>

Deletes a playlist from the user's library.

#### Parameters

• **playlistId**: `string`

The ID of the playlist to delete.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

#### Defined in

[interfaces-primary.ts:56](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L56)

***

### getAlbum()

> **getAlbum**(`id`): `Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

Gets detailed information for a specific album.

#### Parameters

• **id**: `string`

The ID of the album to get the detailed information for.

#### Returns

`Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

A promise that will yield the detailed information for a specific album.

#### Inherited from

[`IYouTubeMusicGuest`](#interfaces-primaryinterfacesiyoutubemusicguestmd).[`getAlbum`](#getalbum)

#### Defined in

[interfaces-primary.ts:132](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L132)

***

### getLibraryAlbums()

> **getLibraryAlbums**(): `Promise`\<[`IAlbumSummary`](#interfaces-supplementaryinterfacesialbumsummarymd)[]\>

Gets all the albums in the user's library.

#### Returns

`Promise`\<[`IAlbumSummary`](#interfaces-supplementaryinterfacesialbumsummarymd)[]\>

A promise that will yield an array of all the albums in the user's library.

#### Defined in

[interfaces-primary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L63)

***

### getLibraryArtists()

> **getLibraryArtists**(): `Promise`\<[`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]\>

Gets all the artists in the user's library.

#### Returns

`Promise`\<[`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]\>

A promise that will yield an array of all the artists in the user's library.

#### Defined in

[interfaces-primary.ts:70](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L70)

***

### getLibraryHistory()

> **getLibraryHistory**(): `Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

Gets recently played tracks, in reverse chronological order, from the user's library

#### Returns

`Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

A promise that will yield a playlist with detailed information on a recently played tracks.

#### Defined in

[interfaces-primary.ts:91](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L91)

***

### getLibraryPlaylists()

> **getLibraryPlaylists**(): `Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)[]\>

Gets all the playlists in the user's library.

#### Returns

`Promise`\<[`IPlaylistSummary`](#interfaces-supplementaryinterfacesiplaylistsummarymd)[]\>

A promise that will yield an array of all the playlists in the user's library.

#### Defined in

[interfaces-primary.ts:77](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L77)

***

### getLibraryTracks()

> **getLibraryTracks**(): `Promise`\<[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]\>

Gets all the tracks in the user's library.

#### Returns

`Promise`\<[`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]\>

A promise that will yield an array of all the tracks in the user's library.

#### Defined in

[interfaces-primary.ts:84](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L84)

***

### getPlaylist()

> **getPlaylist**(`id`, `maxRetries`?): `Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

Gets detailed information for a specific playlist.

#### Parameters

• **id**: `string`

The ID of the playlist to get the detailed information for.

• **maxRetries?**: `number`

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

#### Defined in

[interfaces-primary.ts:145](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L145)

***

### moveTrackWithinPlaylist()

> **moveTrackWithinPlaylist**(`playlistId`, `trackToMove`, `trackToMoveBefore`?): `Promise`\<`boolean`\>

Moves the specified track within the playlist.

#### Parameters

• **playlistId**: `string`

The ID of the playlist to move the track within.

• **trackToMove**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)

The track that should be moved.

• **trackToMoveBefore?**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)

An optional track to move the track before. If unspecified, the track will be moved to the end of the playlist.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

#### Defined in

[interfaces-primary.ts:101](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L101)

***

### rateTrack()

> **rateTrack**(`trackId`, `rating`): `Promise`\<`boolean`\>

Rates a track ("thumbs up"/"thumbs down" interaction).

#### Parameters

• **trackId**: `string`

The ID of the track to rate.

• **rating**: `"LIKE"` \| `"DISLIKE"` \| `"INDIFFERENT"`

One of 'LIKE', 'DISLIKE', or 'INDIFFERENT'. 'INDIFFERENT' removes the previous rating and assigns no rating.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

#### Defined in

[interfaces-primary.ts:119](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L119)

***

### removeTracksFromPlaylist()

> **removeTracksFromPlaylist**(`playlistId`, ...`tracks`): `Promise`\<`boolean`\>

Removes the tracks from the specified playlist.

#### Parameters

• **playlistId**: `string`

The ID of the playlist to remove the tracks from.

• ...**tracks**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

The array of tracks to remove from the playlist.

#### Returns

`Promise`\<`boolean`\>

A promise that will yield whether or not the operation was successful.

#### Defined in

[interfaces-primary.ts:110](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L110)


<a name="interfaces-primaryinterfacesiyoutubemusicguestmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IYouTubeMusicGuest

Defines the YouTube Music APIs available to a guest.

## Extended by

- [`IYouTubeMusicAuthenticated`](#interfaces-primaryinterfacesiyoutubemusicauthenticatedmd)

## Methods

### getAlbum()

> **getAlbum**(`id`): `Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

Gets detailed information for a specific album.

#### Parameters

• **id**: `string`

The ID of the album to get the detailed information for.

#### Returns

`Promise`\<[`IAlbumDetail`](#interfaces-supplementaryinterfacesialbumdetailmd)\>

A promise that will yield the detailed information for a specific album.

#### Defined in

[interfaces-primary.ts:132](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L132)

***

### getPlaylist()

> **getPlaylist**(`id`, `maxRetries`?): `Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

Gets detailed information for a specific playlist.

#### Parameters

• **id**: `string`

The ID of the playlist to get the detailed information for.

• **maxRetries?**: `number`

An optional maximum number of retries to obtain the tracks. YouTube Music is
incredibly buggy in that not all tracks will be returned in a single request. If the request is
retried, you may get a different set of tracks in the response. If you retry enough times, you
will eventually get all the tracks (a union operation is done internally between all the tracks
returned from each individual request).

#### Returns

`Promise`\<[`IPlaylistDetail`](#interfaces-supplementaryinterfacesiplaylistdetailmd)\>

A promise that will yield the detailed information for a specific playlist.

#### Defined in

[interfaces-primary.ts:145](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L145)


<a name="interfaces-supplementaryreadmemd"></a>

[**youtube-music-ts-api**](../README.md) • **Docs**

***

# interfaces-supplementary

## Index

### Interfaces

- [IAlbumDetail](#interfaces-supplementaryinterfacesialbumdetailmd)
- [IAlbumSummary](#interfaces-supplementaryinterfacesialbumsummarymd)
- [IArtistSummary](#interfaces-supplementaryinterfacesiartistsummarymd)
- [IPlaylistDetail](#interfaces-supplementaryinterfacesiplaylistdetailmd)
- [IPlaylistSummary](#interfaces-supplementaryinterfacesiplaylistsummarymd)
- [IThumbnail](#interfaces-supplementaryinterfacesithumbnailmd)
- [ITrackDetail](#interfaces-supplementaryinterfacesitrackdetailmd)


<a name="interfaces-supplementaryinterfacesialbumdetailmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IAlbumDetail

Defines the details for an album.

## Properties

### artists?

> `optional` **artists**: [`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]

The artist(s) that composed the album.

#### Defined in

[interfaces-supplementary.ts:33](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L33)

***

### count?

> `optional` **count**: `number`

The count of tracks within the album.

#### Defined in

[interfaces-supplementary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L23)

***

### description?

> `optional` **description**: `string`

The description of the album.

#### Defined in

[interfaces-supplementary.ts:18](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L18)

***

### durationMillis?

> `optional` **durationMillis**: `number`

The duration of the album in milliseconds.

#### Defined in

[interfaces-supplementary.ts:28](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L28)

***

### id?

> `optional` **id**: `string`

The ID of the album.

#### Defined in

[interfaces-supplementary.ts:8](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L8)

***

### name?

> `optional` **name**: `string`

The name of the album.

#### Defined in

[interfaces-supplementary.ts:13](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L13)

***

### releaseDay?

> `optional` **releaseDay**: `number`

The day the album was released.

#### Defined in

[interfaces-supplementary.ts:38](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L38)

***

### releaseMonth?

> `optional` **releaseMonth**: `number`

The month the album was released.

#### Defined in

[interfaces-supplementary.ts:43](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L43)

***

### releaseYear?

> `optional` **releaseYear**: `number`

The year the album was released.

#### Defined in

[interfaces-supplementary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L48)

***

### tracks

> **tracks**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

The array of tracks within the album.

#### Defined in

[interfaces-supplementary.ts:53](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L53)


<a name="interfaces-supplementaryinterfacesialbumsummarymd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IAlbumSummary

Defines an album summary.

## Properties

### artist?

> `optional` **artist**: [`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)

The artist that composed the album.

#### Defined in

[interfaces-supplementary.ts:73](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L73)

***

### id?

> `optional` **id**: `string`

The ID of the album.

#### Defined in

[interfaces-supplementary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L63)

***

### name?

> `optional` **name**: `string`

The name of the album.

#### Defined in

[interfaces-supplementary.ts:68](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L68)

***

### year?

> `optional` **year**: `string`

The year the album was released.

#### Defined in

[interfaces-supplementary.ts:78](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L78)


<a name="interfaces-supplementaryinterfacesiartistsummarymd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IArtistSummary

Defines an artist summary.

## Properties

### id?

> `optional` **id**: `string`

The ID of the artist.

#### Defined in

[interfaces-supplementary.ts:88](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L88)

***

### name?

> `optional` **name**: `string`

The name of the artist.

#### Defined in

[interfaces-supplementary.ts:93](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L93)


<a name="interfaces-supplementaryinterfacesiplaylistdetailmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IPlaylistDetail

Defines the details for a playlist.

## Properties

### count?

> `optional` **count**: `number`

The count of tracks within the playlist.

#### Defined in

[interfaces-supplementary.ts:118](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L118)

***

### description?

> `optional` **description**: `string`

The description of the playlist.

#### Defined in

[interfaces-supplementary.ts:113](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L113)

***

### id?

> `optional` **id**: `string`

The ID of the playlist.

#### Defined in

[interfaces-supplementary.ts:103](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L103)

***

### name?

> `optional` **name**: `string`

The name of the playlist.

#### Defined in

[interfaces-supplementary.ts:108](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L108)

***

### privacy?

> `optional` **privacy**: `string`

The privacy level of the playlist. This value will be PUBLIC, PRIVATE, or UNLISTED.

#### Defined in

[interfaces-supplementary.ts:123](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L123)

***

### tracks?

> `optional` **tracks**: [`ITrackDetail`](#interfaces-supplementaryinterfacesitrackdetailmd)[]

The array of tracks within the playlist.

#### Defined in

[interfaces-supplementary.ts:128](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L128)


<a name="interfaces-supplementaryinterfacesiplaylistsummarymd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IPlaylistSummary

Defines a playlist summary.

## Properties

### count?

> `optional` **count**: `number`

The count of tracks within the playlist.

#### Defined in

[interfaces-supplementary.ts:148](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L148)

***

### id?

> `optional` **id**: `string`

The ID of the playlist.

#### Defined in

[interfaces-supplementary.ts:138](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L138)

***

### name?

> `optional` **name**: `string`

The name of the playlist.

#### Defined in

[interfaces-supplementary.ts:143](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L143)

***

### thumbnails?

> `optional` **thumbnails**: [`IThumbnail`](#interfaces-supplementaryinterfacesithumbnailmd)[]

The thumbnails for the playlist (ordered from smallest to largest).

#### Defined in

[interfaces-supplementary.ts:153](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L153)


<a name="interfaces-supplementaryinterfacesithumbnailmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: IThumbnail

Defines the details for a thumbnail.

## Properties

### height?

> `optional` **height**: `number`

The height of the thumbnail.

#### Defined in

[interfaces-supplementary.ts:229](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L229)

***

### url?

> `optional` **url**: `string`

The URL for the thumbnail.

#### Defined in

[interfaces-supplementary.ts:219](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L219)

***

### width?

> `optional` **width**: `number`

The width of the thumbnail.

#### Defined in

[interfaces-supplementary.ts:224](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L224)


<a name="interfaces-supplementaryinterfacesitrackdetailmd"></a>

[**youtube-music-ts-api**](../../README.md) • **Docs**

***

# Interface: ITrackDetail

Defines the details for a track.

## Properties

### album?

> `optional` **album**: [`IAlbumSummary`](#interfaces-supplementaryinterfacesialbumsummarymd)

The album the track is from.

#### Defined in

[interfaces-supplementary.ts:184](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L184)

***

### alternateId?

> `optional` **alternateId**: `string`

An alternate ID of the track. YouTube internally refers to this value as the setVideoId. This ID
is used in combination with the standard ID in order to remove tracks from playlists.

#### Defined in

[interfaces-supplementary.ts:169](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L169)

***

### artists?

> `optional` **artists**: [`IArtistSummary`](#interfaces-supplementaryinterfacesiartistsummarymd)[]

The artist(s) that compose the track.

#### Defined in

[interfaces-supplementary.ts:179](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L179)

***

### duration?

> `optional` **duration**: `string`

The duration of the track as a readable string.

#### Defined in

[interfaces-supplementary.ts:189](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L189)

***

### durationMillis?

> `optional` **durationMillis**: `number`

The duration of the track in milliseconds.

#### Defined in

[interfaces-supplementary.ts:194](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L194)

***

### id?

> `optional` **id**: `string`

The ID of the track.

#### Defined in

[interfaces-supplementary.ts:163](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L163)

***

### likeStatus?

> `optional` **likeStatus**: `"LIKE"` \| `"DISLIKE"` \| `"INDIFFERENT"`

The rating for the track (LIKE, DISLIKE, or INDIFFERENT).

#### Defined in

[interfaces-supplementary.ts:209](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L209)

***

### thumbnails?

> `optional` **thumbnails**: [`IThumbnail`](#interfaces-supplementaryinterfacesithumbnailmd)[]

The thumbnails for the track (ordered from smallest to largest).

#### Defined in

[interfaces-supplementary.ts:204](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L204)

***

### title?

> `optional` **title**: `string`

The title of the track.

#### Defined in

[interfaces-supplementary.ts:174](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L174)

***

### trackNumber?

> `optional` **trackNumber**: `number`

The track number within an album.

#### Defined in

[interfaces-supplementary.ts:199](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L199)
