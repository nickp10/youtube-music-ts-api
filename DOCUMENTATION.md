
<a name="interfaces-primaryiyoutubemusicmd"></a>

# Interface: IYouTubeMusic

[interfaces-primary](../modules/interfaces_primary.md).IYouTubeMusic

Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.

## Hierarchy

* **IYouTubeMusic**

## Table of contents

### Methods

- [authenticate](#authenticate)
- [guest](#guest)

## Methods

### authenticate

▸ **authenticate**(`cookiesStr`: *string*, `authUser`: *number*): *Promise*<[*IYouTubeMusicAuthenticated*](#interfaces-primaryiyoutubemusicauthenticatedmd)\>

Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cookiesStr` | *string* | The cookie string of a valid logged in user. The minimum required cookie values needed are the HSID, SSID, APISID, SAPISID, __Secure-3PSID, and __Secure-3PAPISID. To obtain this cookie value, log into https://music.youtube.com as a user and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored.   |
`authUser?` | *Number* | An optional param for auth user index (more than 1 account connected).    |

**Returns:** *Promise*<[*IYouTubeMusicAuthenticated*](#interfaces-primaryiyoutubemusicauthenticatedmd)\>

A promise that will yield authenticated access to the YouTube Music API.

Defined in: [interfaces-primary.ts:16](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L16)

___

### guest

▸ **guest**(): *Promise*<[*IYouTubeMusicGuest*](#interfaces-primaryiyoutubemusicguestmd)\>

Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.

**Returns:** *Promise*<[*IYouTubeMusicGuest*](#interfaces-primaryiyoutubemusicguestmd)\>

A promise that will yield guest access to the YouTube Music API.

Defined in: [interfaces-primary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L23)


<a name="interfaces-primaryiyoutubemusicauthenticatedmd"></a>

# Interface: IYouTubeMusicAuthenticated

[interfaces-primary](../modules/interfaces_primary.md).IYouTubeMusicAuthenticated

Defines the YouTube Music APIs available to an authenticated user. An authenticated user also naturally includes the APIs available to a guest.

## Hierarchy

* [*IYouTubeMusicGuest*](#interfaces-primaryiyoutubemusicguestmd)

  ↳ **IYouTubeMusicAuthenticated**

## Table of contents

### Methods

- [addTracksToPlaylist](#addtrackstoplaylist)
- [createPlaylist](#createplaylist)
- [deletePlaylist](#deleteplaylist)
- [getAlbum](#getalbum)
- [getLibraryAlbums](#getlibraryalbums)
- [getLibraryArtists](#getlibraryartists)
- [getLibraryPlaylists](#getlibraryplaylists)
- [getLibraryTracks](#getlibrarytracks)
- [getPlaylist](#getplaylist)
- [removeTracksFromPlaylist](#removetracksfromplaylist)

## Methods

### addTracksToPlaylist

▸ **addTracksToPlaylist**(`playlistId`: *string*, ...`tracks`: [*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[]): *Promise*<*boolean*\>

Adds the tracks to the specified playlist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`playlistId` | *string* | The ID of the playlist to add the tracks to.   |
`...tracks` | [*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[] | The array of tracks to add to the playlist.   |

**Returns:** *Promise*<*boolean*\>

A promise that will yield whether or not the operation was successful.

Defined in: [interfaces-primary.ts:37](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L37)

___

### createPlaylist

▸ **createPlaylist**(`name`: *string*, `description?`: *string*, `privacy?`: *string*, `sourcePlaylistId?`: *string*): *Promise*<[*IPlaylistSummary*](#interfaces-supplementaryiplaylistsummarymd)\>

Creates a playlist in the user's library.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | *string* | The name of the playlist to create.   |
`description?` | *string* | An optional description for the playlist.   |
`privacy?` | *string* | An optional privacy level for the playlist (either PUBLIC, PRIVATE, or UNLISTED).   |
`sourcePlaylistId?` | *string* | An optional playlist ID to copy the initial set of tracks from.   |

**Returns:** *Promise*<[*IPlaylistSummary*](#interfaces-supplementaryiplaylistsummarymd)\>

A promise that will yield the playlist with its ID.

Defined in: [interfaces-primary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L48)

___

### deletePlaylist

▸ **deletePlaylist**(`playlistId`: *string*): *Promise*<*boolean*\>

Deletes a playlist from the user's library.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`playlistId` | *string* | The ID of the playlist to delete.   |

**Returns:** *Promise*<*boolean*\>

A promise that will yield whether or not the operation was successful.

Defined in: [interfaces-primary.ts:56](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L56)

___

### getAlbum

▸ **getAlbum**(`id`: *string*): *Promise*<[*IAlbumDetail*](#interfaces-supplementaryialbumdetailmd)\>

Gets detailed information for a specific album.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | *string* | The ID of the album to get the detailed information for.   |

**Returns:** *Promise*<[*IAlbumDetail*](#interfaces-supplementaryialbumdetailmd)\>

A promise that will yield the detailed information for a specific album.

Inherited from: [IYouTubeMusicGuest](#interfaces-primaryiyoutubemusicguestmd)

Defined in: [interfaces-primary.ts:106](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L106)

___

### getLibraryAlbums

▸ **getLibraryAlbums**(): *Promise*<[*IAlbumSummary*](#interfaces-supplementaryialbumsummarymd)[]\>

Gets all the albums in the user's library.

**Returns:** *Promise*<[*IAlbumSummary*](#interfaces-supplementaryialbumsummarymd)[]\>

A promise that will yield an array of all the albums in the user's library.

Defined in: [interfaces-primary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L63)

___

### getLibraryArtists

▸ **getLibraryArtists**(): *Promise*<[*IArtistSummary*](#interfaces-supplementaryiartistsummarymd)[]\>

Gets all the artists in the user's library.

**Returns:** *Promise*<[*IArtistSummary*](#interfaces-supplementaryiartistsummarymd)[]\>

A promise that will yield an array of all the artists in the user's library.

Defined in: [interfaces-primary.ts:70](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L70)

___

### getLibraryPlaylists

▸ **getLibraryPlaylists**(): *Promise*<[*IPlaylistSummary*](#interfaces-supplementaryiplaylistsummarymd)[]\>

Gets all the playlists in the user's library.

**Returns:** *Promise*<[*IPlaylistSummary*](#interfaces-supplementaryiplaylistsummarymd)[]\>

A promise that will yield an array of all the playlists in the user's library.

Defined in: [interfaces-primary.ts:77](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L77)

___

### getLibraryTracks

▸ **getLibraryTracks**(): *Promise*<[*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[]\>

Gets all the tracks in the user's library.

**Returns:** *Promise*<[*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[]\>

A promise that will yield an array of all the tracks in the user's library.

Defined in: [interfaces-primary.ts:84](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L84)

___

### getPlaylist

▸ **getPlaylist**(`id`: *string*, `maxRetries?`: *number*): *Promise*<[*IPlaylistDetail*](#interfaces-supplementaryiplaylistdetailmd)\>

Gets detailed information for a specific playlist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | *string* | The ID of the playlist to get the detailed information for.   |
`maxRetries?` | *number* | An optional maximum number of retries to obtain the tracks. YouTube Music is incredibly buggy in that not all tracks will be returned in a single request. If the request is retried, you may get a different set of tracks in the response. If you retry enough times, you will eventually get all the tracks (a union operation is done internally between all the tracks returned from each individual request).   |

**Returns:** *Promise*<[*IPlaylistDetail*](#interfaces-supplementaryiplaylistdetailmd)\>

A promise that will yield the detailed information for a specific playlist.

Inherited from: [IYouTubeMusicGuest](#interfaces-primaryiyoutubemusicguestmd)

Defined in: [interfaces-primary.ts:119](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L119)

___

### removeTracksFromPlaylist

▸ **removeTracksFromPlaylist**(`playlistId`: *string*, ...`tracks`: [*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[]): *Promise*<*boolean*\>

Removes the tracks from the specified playlist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`playlistId` | *string* | The ID of the playlist to remove the tracks from.   |
`...tracks` | [*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[] | The array of tracks to remove from the playlist.   |

**Returns:** *Promise*<*boolean*\>

A promise that will yield whether or not the operation was successful.

Defined in: [interfaces-primary.ts:93](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L93)


<a name="interfaces-primaryiyoutubemusicguestmd"></a>

# Interface: IYouTubeMusicGuest

[interfaces-primary](../modules/interfaces_primary.md).IYouTubeMusicGuest

Defines the YouTube Music APIs available to a guest.

## Hierarchy

* **IYouTubeMusicGuest**

  ↳ [*IYouTubeMusicAuthenticated*](#interfaces-primaryiyoutubemusicauthenticatedmd)

## Table of contents

### Methods

- [getAlbum](#getalbum)
- [getPlaylist](#getplaylist)

## Methods

### getAlbum

▸ **getAlbum**(`id`: *string*): *Promise*<[*IAlbumDetail*](#interfaces-supplementaryialbumdetailmd)\>

Gets detailed information for a specific album.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | *string* | The ID of the album to get the detailed information for.   |

**Returns:** *Promise*<[*IAlbumDetail*](#interfaces-supplementaryialbumdetailmd)\>

A promise that will yield the detailed information for a specific album.

Defined in: [interfaces-primary.ts:106](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L106)

___

### getPlaylist

▸ **getPlaylist**(`id`: *string*, `maxRetries?`: *number*): *Promise*<[*IPlaylistDetail*](#interfaces-supplementaryiplaylistdetailmd)\>

Gets detailed information for a specific playlist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | *string* | The ID of the playlist to get the detailed information for.   |
`maxRetries?` | *number* | An optional maximum number of retries to obtain the tracks. YouTube Music is incredibly buggy in that not all tracks will be returned in a single request. If the request is retried, you may get a different set of tracks in the response. If you retry enough times, you will eventually get all the tracks (a union operation is done internally between all the tracks returned from each individual request).   |

**Returns:** *Promise*<[*IPlaylistDetail*](#interfaces-supplementaryiplaylistdetailmd)\>

A promise that will yield the detailed information for a specific playlist.

Defined in: [interfaces-primary.ts:119](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L119)


<a name="interfaces-supplementaryialbumdetailmd"></a>

# Interface: IAlbumDetail

[interfaces-supplementary](../modules/interfaces_supplementary.md).IAlbumDetail

Defines the details for an album.

## Hierarchy

* **IAlbumDetail**

## Table of contents

### Properties

- [artists](#artists)
- [count](#count)
- [description](#description)
- [durationMillis](#durationmillis)
- [id](#id)
- [name](#name)
- [releaseDay](#releaseday)
- [releaseMonth](#releasemonth)
- [releaseYear](#releaseyear)
- [tracks](#tracks)

## Properties

### artists

• `Optional` **artists**: [*IArtistSummary*](#interfaces-supplementaryiartistsummarymd)[]

The artist(s) that composed the album.

Defined in: [interfaces-supplementary.ts:33](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L33)

___

### count

• `Optional` **count**: *number*

The count of tracks within the album.

Defined in: [interfaces-supplementary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L23)

___

### description

• `Optional` **description**: *string*

The description of the album.

Defined in: [interfaces-supplementary.ts:18](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L18)

___

### durationMillis

• `Optional` **durationMillis**: *number*

The duration of the album in milliseconds.

Defined in: [interfaces-supplementary.ts:28](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L28)

___

### id

• `Optional` **id**: *string*

The ID of the album.

Defined in: [interfaces-supplementary.ts:8](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L8)

___

### name

• `Optional` **name**: *string*

The name of the album.

Defined in: [interfaces-supplementary.ts:13](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L13)

___

### releaseDay

• `Optional` **releaseDay**: *number*

The day the album was released.

Defined in: [interfaces-supplementary.ts:38](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L38)

___

### releaseMonth

• `Optional` **releaseMonth**: *number*

The month the album was released.

Defined in: [interfaces-supplementary.ts:43](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L43)

___

### releaseYear

• `Optional` **releaseYear**: *number*

The year the album was released.

Defined in: [interfaces-supplementary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L48)

___

### tracks

• **tracks**: [*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[]

The array of tracks within the album.

Defined in: [interfaces-supplementary.ts:53](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L53)


<a name="interfaces-supplementaryialbumsummarymd"></a>

# Interface: IAlbumSummary

[interfaces-supplementary](../modules/interfaces_supplementary.md).IAlbumSummary

Defines an album summary.

## Hierarchy

* **IAlbumSummary**

## Table of contents

### Properties

- [artist](#artist)
- [id](#id)
- [name](#name)
- [year](#year)

## Properties

### artist

• `Optional` **artist**: [*IArtistSummary*](#interfaces-supplementaryiartistsummarymd)

The artist that composed the album.

Defined in: [interfaces-supplementary.ts:73](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L73)

___

### id

• `Optional` **id**: *string*

The ID of the album.

Defined in: [interfaces-supplementary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L63)

___

### name

• `Optional` **name**: *string*

The name of the album.

Defined in: [interfaces-supplementary.ts:68](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L68)

___

### year

• `Optional` **year**: *string*

The year the album was released.

Defined in: [interfaces-supplementary.ts:78](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L78)


<a name="interfaces-supplementaryiartistsummarymd"></a>

# Interface: IArtistSummary

[interfaces-supplementary](../modules/interfaces_supplementary.md).IArtistSummary

Defines an artist summary.

## Hierarchy

* **IArtistSummary**

## Table of contents

### Properties

- [id](#id)
- [name](#name)

## Properties

### id

• `Optional` **id**: *string*

The ID of the artist.

Defined in: [interfaces-supplementary.ts:88](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L88)

___

### name

• `Optional` **name**: *string*

The name of the artist.

Defined in: [interfaces-supplementary.ts:93](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L93)


<a name="interfaces-supplementaryiplaylistdetailmd"></a>

# Interface: IPlaylistDetail

[interfaces-supplementary](../modules/interfaces_supplementary.md).IPlaylistDetail

Defines the details for a playlist.

## Hierarchy

* **IPlaylistDetail**

## Table of contents

### Properties

- [count](#count)
- [description](#description)
- [id](#id)
- [name](#name)
- [privacy](#privacy)
- [tracks](#tracks)

## Properties

### count

• `Optional` **count**: *number*

The count of tracks within the playlist.

Defined in: [interfaces-supplementary.ts:118](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L118)

___

### description

• `Optional` **description**: *string*

The description of the playlist.

Defined in: [interfaces-supplementary.ts:113](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L113)

___

### id

• `Optional` **id**: *string*

The ID of the playlist.

Defined in: [interfaces-supplementary.ts:103](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L103)

___

### name

• `Optional` **name**: *string*

The name of the playlist.

Defined in: [interfaces-supplementary.ts:108](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L108)

___

### privacy

• `Optional` **privacy**: *string*

The privacy level of the playlist. This value will be PUBLIC, PRIVATE, or UNLISTED.

Defined in: [interfaces-supplementary.ts:123](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L123)

___

### tracks

• `Optional` **tracks**: [*ITrackDetail*](#interfaces-supplementaryitrackdetailmd)[]

The array of tracks within the playlist.

Defined in: [interfaces-supplementary.ts:128](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L128)


<a name="interfaces-supplementaryiplaylistsummarymd"></a>

# Interface: IPlaylistSummary

[interfaces-supplementary](../modules/interfaces_supplementary.md).IPlaylistSummary

Defines a playlist summary.

## Hierarchy

* **IPlaylistSummary**

## Table of contents

### Properties

- [count](#count)
- [id](#id)
- [name](#name)

## Properties

### count

• `Optional` **count**: *number*

The count of tracks within the playlist.

Defined in: [interfaces-supplementary.ts:148](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L148)

___

### id

• `Optional` **id**: *string*

The ID of the playlist.

Defined in: [interfaces-supplementary.ts:138](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L138)

___

### name

• `Optional` **name**: *string*

The name of the playlist.

Defined in: [interfaces-supplementary.ts:143](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L143)


<a name="interfaces-supplementaryitrackdetailmd"></a>

# Interface: ITrackDetail

[interfaces-supplementary](../modules/interfaces_supplementary.md).ITrackDetail

Defines the details for a track.

## Hierarchy

* **ITrackDetail**

## Table of contents

### Properties

- [album](#album)
- [alternateId](#alternateid)
- [artists](#artists)
- [duration](#duration)
- [durationMillis](#durationmillis)
- [id](#id)
- [title](#title)
- [trackNumber](#tracknumber)

## Properties

### album

• `Optional` **album**: [*IAlbumSummary*](#interfaces-supplementaryialbumsummarymd)

The album the track is from.

Defined in: [interfaces-supplementary.ts:179](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L179)

___

### alternateId

• `Optional` **alternateId**: *string*

An alternate ID of the track. YouTube internally refers to this value as the setVideoId. This ID
is used in combination with the standard ID in order to remove tracks from playlists.

Defined in: [interfaces-supplementary.ts:164](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L164)

___

### artists

• `Optional` **artists**: [*IArtistSummary*](#interfaces-supplementaryiartistsummarymd)[]

The artist(s) that compose the track.

Defined in: [interfaces-supplementary.ts:174](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L174)

___

### duration

• `Optional` **duration**: *string*

The duration of the track as a readable string.

Defined in: [interfaces-supplementary.ts:184](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L184)

___

### durationMillis

• `Optional` **durationMillis**: *number*

The duration of the track in milliseconds.

Defined in: [interfaces-supplementary.ts:189](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L189)

___

### id

• `Optional` **id**: *string*

The ID of the track.

Defined in: [interfaces-supplementary.ts:158](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L158)

___

### title

• `Optional` **title**: *string*

The title of the track.

Defined in: [interfaces-supplementary.ts:169](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L169)

___

### trackNumber

• `Optional` **trackNumber**: *number*

The track number within an album.

Defined in: [interfaces-supplementary.ts:194](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L194)
