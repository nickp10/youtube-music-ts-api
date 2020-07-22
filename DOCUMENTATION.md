
<a name="_interfaces_primary_iyoutubemusicmd"></a>


# Interface: IYouTubeMusic

Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.

## Hierarchy

* **IYouTubeMusic**

## Index

### Methods

* [authenticate](#authenticate)
* [guest](#guest)

## Methods

###  authenticate

▸ **authenticate**(`cookiesStr`: string): *Promise‹[IYouTubeMusicAuthenticated](#_interfaces_primary_iyoutubemusicauthenticatedmd)›*

*Defined in [interfaces-primary.ts:16](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L16)*

Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cookiesStr` | string | The cookie string of a valid logged in user. The minimum required cookie values needed are the HSID, SSID, APISID, SAPISID, and __Secure-3PSID. To obtain this cookie value, log into https://music.youtube.com as a user and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored. |

**Returns:** *Promise‹[IYouTubeMusicAuthenticated](#_interfaces_primary_iyoutubemusicauthenticatedmd)›*

A promise that will yield authenticated access to the YouTube Music API.

___

###  guest

▸ **guest**(): *Promise‹[IYouTubeMusicGuest](#_interfaces_primary_iyoutubemusicguestmd)›*

*Defined in [interfaces-primary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L23)*

Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.

**Returns:** *Promise‹[IYouTubeMusicGuest](#_interfaces_primary_iyoutubemusicguestmd)›*

A promise that will yield guest access to the YouTube Music API.


<a name="_interfaces_primary_iyoutubemusicauthenticatedmd"></a>


# Interface: IYouTubeMusicAuthenticated

Defines the YouTube Music APIs available to an authenticated user. An authenticated user also naturally includes the APIs available to a guest.

## Hierarchy

* [IYouTubeMusicGuest](#_interfaces_primary_iyoutubemusicguestmd)

  ↳ **IYouTubeMusicAuthenticated**

## Index

### Methods

* [addTracksToPlaylist](#addtrackstoplaylist)
* [createPlaylist](#createplaylist)
* [deletePlaylist](#deleteplaylist)
* [getAlbum](#getalbum)
* [getLibraryAlbums](#getlibraryalbums)
* [getLibraryArtists](#getlibraryartists)
* [getLibraryPlaylists](#getlibraryplaylists)
* [getLibraryTracks](#getlibrarytracks)
* [getPlaylist](#getplaylist)
* [removeTracksFromPlaylist](#removetracksfromplaylist)

## Methods

###  addTracksToPlaylist

▸ **addTracksToPlaylist**(`playlistId`: string, ...`tracks`: [ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[]): *Promise‹boolean›*

*Defined in [interfaces-primary.ts:37](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L37)*

Adds the tracks to the specified playlist.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`playlistId` | string | The ID of the playlist to add the tracks to. |
`...tracks` | [ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[] | The array of tracks to add to the playlist. |

**Returns:** *Promise‹boolean›*

A promise that will yield whether or not the operation was successful.

___

###  createPlaylist

▸ **createPlaylist**(`name`: string, `description?`: string, `privacy?`: string, `sourcePlaylistId?`: string): *Promise‹[IPlaylistSummary](#_interfaces_supplementary_iplaylistsummarymd)›*

*Defined in [interfaces-primary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L48)*

Creates a playlist in the user's library.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of the playlist to create. |
`description?` | string | An optional description for the playlist. |
`privacy?` | string | An optional privacy level for the playlist (either PUBLIC, PRIVATE, or UNLISTED). |
`sourcePlaylistId?` | string | An optional playlist ID to copy the initial set of tracks from. |

**Returns:** *Promise‹[IPlaylistSummary](#_interfaces_supplementary_iplaylistsummarymd)›*

A promise that will yield the playlist with its ID.

___

###  deletePlaylist

▸ **deletePlaylist**(`playlistId`: string): *Promise‹boolean›*

*Defined in [interfaces-primary.ts:56](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L56)*

Deletes a playlist from the user's library.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`playlistId` | string | The ID of the playlist to delete. |

**Returns:** *Promise‹boolean›*

A promise that will yield whether or not the operation was successful.

___

###  getAlbum

▸ **getAlbum**(`id`: string): *Promise‹[IAlbumDetail](#_interfaces_supplementary_ialbumdetailmd)›*

*Inherited from [IYouTubeMusicAuthenticated](#_interfaces_primary_iyoutubemusicauthenticatedmd).[getAlbum](#getalbum)*

*Defined in [interfaces-primary.ts:106](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L106)*

Gets detailed information for a specific album.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The ID of the album to get the detailed information for. |

**Returns:** *Promise‹[IAlbumDetail](#_interfaces_supplementary_ialbumdetailmd)›*

A promise that will yield the detailed information for a specific album.

___

###  getLibraryAlbums

▸ **getLibraryAlbums**(): *Promise‹[IAlbumSummary](#_interfaces_supplementary_ialbumsummarymd)[]›*

*Defined in [interfaces-primary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L63)*

Gets all the albums in the user's library.

**Returns:** *Promise‹[IAlbumSummary](#_interfaces_supplementary_ialbumsummarymd)[]›*

A promise that will yield an array of all the albums in the user's library.

___

###  getLibraryArtists

▸ **getLibraryArtists**(): *Promise‹[IArtistSummary](#_interfaces_supplementary_iartistsummarymd)[]›*

*Defined in [interfaces-primary.ts:70](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L70)*

Gets all the artists in the user's library.

**Returns:** *Promise‹[IArtistSummary](#_interfaces_supplementary_iartistsummarymd)[]›*

A promise that will yield an array of all the artists in the user's library.

___

###  getLibraryPlaylists

▸ **getLibraryPlaylists**(): *Promise‹[IPlaylistSummary](#_interfaces_supplementary_iplaylistsummarymd)[]›*

*Defined in [interfaces-primary.ts:77](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L77)*

Gets all the playlists in the user's library.

**Returns:** *Promise‹[IPlaylistSummary](#_interfaces_supplementary_iplaylistsummarymd)[]›*

A promise that will yield an array of all the playlists in the user's library.

___

###  getLibraryTracks

▸ **getLibraryTracks**(): *Promise‹[ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[]›*

*Defined in [interfaces-primary.ts:84](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L84)*

Gets all the tracks in the user's library.

**Returns:** *Promise‹[ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[]›*

A promise that will yield an array of all the tracks in the user's library.

___

###  getPlaylist

▸ **getPlaylist**(`id`: string, `maxRetries?`: number): *Promise‹[IPlaylistDetail](#_interfaces_supplementary_iplaylistdetailmd)›*

*Inherited from [IYouTubeMusicAuthenticated](#_interfaces_primary_iyoutubemusicauthenticatedmd).[getPlaylist](#getplaylist)*

*Defined in [interfaces-primary.ts:119](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L119)*

Gets detailed information for a specific playlist.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The ID of the playlist to get the detailed information for. |
`maxRetries?` | number | An optional maximum number of retries to obtain the tracks. YouTube Music is incredibly buggy in that not all tracks will be returned in a single request. If the request is retried, you may get a different set of tracks in the response. If you retry enough times, you will eventually get all the tracks (a union operation is done internally between all the tracks returned from each individual request). |

**Returns:** *Promise‹[IPlaylistDetail](#_interfaces_supplementary_iplaylistdetailmd)›*

A promise that will yield the detailed information for a specific playlist.

___

###  removeTracksFromPlaylist

▸ **removeTracksFromPlaylist**(`playlistId`: string, ...`tracks`: [ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[]): *Promise‹boolean›*

*Defined in [interfaces-primary.ts:93](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L93)*

Removes the tracks from the specified playlist.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`playlistId` | string | The ID of the playlist to remove the tracks from. |
`...tracks` | [ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[] | The array of tracks to remove from the playlist. |

**Returns:** *Promise‹boolean›*

A promise that will yield whether or not the operation was successful.


<a name="_interfaces_primary_iyoutubemusicguestmd"></a>


# Interface: IYouTubeMusicGuest

Defines the YouTube Music APIs available to a guest.

## Hierarchy

* **IYouTubeMusicGuest**

  ↳ [IYouTubeMusicAuthenticated](#_interfaces_primary_iyoutubemusicauthenticatedmd)

## Index

### Methods

* [getAlbum](#getalbum)
* [getPlaylist](#getplaylist)

## Methods

###  getAlbum

▸ **getAlbum**(`id`: string): *Promise‹[IAlbumDetail](#_interfaces_supplementary_ialbumdetailmd)›*

*Defined in [interfaces-primary.ts:106](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L106)*

Gets detailed information for a specific album.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The ID of the album to get the detailed information for. |

**Returns:** *Promise‹[IAlbumDetail](#_interfaces_supplementary_ialbumdetailmd)›*

A promise that will yield the detailed information for a specific album.

___

###  getPlaylist

▸ **getPlaylist**(`id`: string, `maxRetries?`: number): *Promise‹[IPlaylistDetail](#_interfaces_supplementary_iplaylistdetailmd)›*

*Defined in [interfaces-primary.ts:119](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-primary.ts#L119)*

Gets detailed information for a specific playlist.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The ID of the playlist to get the detailed information for. |
`maxRetries?` | number | An optional maximum number of retries to obtain the tracks. YouTube Music is incredibly buggy in that not all tracks will be returned in a single request. If the request is retried, you may get a different set of tracks in the response. If you retry enough times, you will eventually get all the tracks (a union operation is done internally between all the tracks returned from each individual request). |

**Returns:** *Promise‹[IPlaylistDetail](#_interfaces_supplementary_iplaylistdetailmd)›*

A promise that will yield the detailed information for a specific playlist.


<a name="_interfaces_supplementary_ialbumdetailmd"></a>


# Interface: IAlbumDetail

Defines the details for an album.

## Hierarchy

* **IAlbumDetail**

## Index

### Properties

* [artists](#optional-artists)
* [count](#optional-count)
* [description](#optional-description)
* [durationMillis](#optional-durationmillis)
* [id](#optional-id)
* [name](#optional-name)
* [releaseDay](#optional-releaseday)
* [releaseMonth](#optional-releasemonth)
* [releaseYear](#optional-releaseyear)
* [tracks](#tracks)

## Properties

### `Optional` artists

• **artists**? : *[IArtistSummary](#_interfaces_supplementary_iartistsummarymd)[]*

*Defined in [interfaces-supplementary.ts:33](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L33)*

The artist(s) that composed the album.

___

### `Optional` count

• **count**? : *number*

*Defined in [interfaces-supplementary.ts:23](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L23)*

The count of tracks within the album.

___

### `Optional` description

• **description**? : *string*

*Defined in [interfaces-supplementary.ts:18](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L18)*

The description of the album.

___

### `Optional` durationMillis

• **durationMillis**? : *number*

*Defined in [interfaces-supplementary.ts:28](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L28)*

The duration of the album in milliseconds.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces-supplementary.ts:8](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L8)*

The ID of the album.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces-supplementary.ts:13](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L13)*

The name of the album.

___

### `Optional` releaseDay

• **releaseDay**? : *number*

*Defined in [interfaces-supplementary.ts:38](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L38)*

The day the album was released.

___

### `Optional` releaseMonth

• **releaseMonth**? : *number*

*Defined in [interfaces-supplementary.ts:43](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L43)*

The month the album was released.

___

### `Optional` releaseYear

• **releaseYear**? : *number*

*Defined in [interfaces-supplementary.ts:48](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L48)*

The year the album was released.

___

###  tracks

• **tracks**: *[ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[]*

*Defined in [interfaces-supplementary.ts:53](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L53)*

The array of tracks within the album.


<a name="_interfaces_supplementary_ialbumsummarymd"></a>


# Interface: IAlbumSummary

Defines an album summary.

## Hierarchy

* **IAlbumSummary**

## Index

### Properties

* [artist](#optional-artist)
* [id](#optional-id)
* [name](#optional-name)
* [year](#optional-year)

## Properties

### `Optional` artist

• **artist**? : *[IArtistSummary](#_interfaces_supplementary_iartistsummarymd)*

*Defined in [interfaces-supplementary.ts:73](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L73)*

The artist that composed the album.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces-supplementary.ts:63](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L63)*

The ID of the album.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces-supplementary.ts:68](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L68)*

The name of the album.

___

### `Optional` year

• **year**? : *string*

*Defined in [interfaces-supplementary.ts:78](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L78)*

The year the album was released.


<a name="_interfaces_supplementary_iartistsummarymd"></a>


# Interface: IArtistSummary

Defines an artist summary.

## Hierarchy

* **IArtistSummary**

## Index

### Properties

* [id](#optional-id)
* [name](#optional-name)

## Properties

### `Optional` id

• **id**? : *string*

*Defined in [interfaces-supplementary.ts:88](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L88)*

The ID of the artist.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces-supplementary.ts:93](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L93)*

The name of the artist.


<a name="_interfaces_supplementary_iplaylistdetailmd"></a>


# Interface: IPlaylistDetail

Defines the details for a playlist.

## Hierarchy

* **IPlaylistDetail**

## Index

### Properties

* [count](#optional-count)
* [description](#optional-description)
* [id](#optional-id)
* [name](#optional-name)
* [privacy](#optional-privacy)
* [tracks](#optional-tracks)

## Properties

### `Optional` count

• **count**? : *number*

*Defined in [interfaces-supplementary.ts:118](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L118)*

The count of tracks within the playlist.

___

### `Optional` description

• **description**? : *string*

*Defined in [interfaces-supplementary.ts:113](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L113)*

The description of the playlist.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces-supplementary.ts:103](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L103)*

The ID of the playlist.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces-supplementary.ts:108](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L108)*

The name of the playlist.

___

### `Optional` privacy

• **privacy**? : *string*

*Defined in [interfaces-supplementary.ts:123](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L123)*

The privacy level of the playlist. This value will be PUBLIC, PRIVATE, or UNLISTED.

___

### `Optional` tracks

• **tracks**? : *[ITrackDetail](#_interfaces_supplementary_itrackdetailmd)[]*

*Defined in [interfaces-supplementary.ts:128](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L128)*

The array of tracks within the playlist.


<a name="_interfaces_supplementary_iplaylistsummarymd"></a>


# Interface: IPlaylistSummary

Defines a playlist summary.

## Hierarchy

* **IPlaylistSummary**

## Index

### Properties

* [count](#optional-count)
* [id](#optional-id)
* [name](#optional-name)

## Properties

### `Optional` count

• **count**? : *number*

*Defined in [interfaces-supplementary.ts:148](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L148)*

The count of tracks within the playlist.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces-supplementary.ts:138](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L138)*

The ID of the playlist.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces-supplementary.ts:143](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L143)*

The name of the playlist.


<a name="_interfaces_supplementary_itrackdetailmd"></a>


# Interface: ITrackDetail

Defines the details for a track.

## Hierarchy

* **ITrackDetail**

## Index

### Properties

* [album](#optional-album)
* [alternateId](#optional-alternateid)
* [artists](#optional-artists)
* [duration](#optional-duration)
* [durationMillis](#optional-durationmillis)
* [id](#optional-id)
* [title](#optional-title)
* [trackNumber](#optional-tracknumber)

## Properties

### `Optional` album

• **album**? : *[IAlbumSummary](#_interfaces_supplementary_ialbumsummarymd)*

*Defined in [interfaces-supplementary.ts:179](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L179)*

The album the track is from.

___

### `Optional` alternateId

• **alternateId**? : *string*

*Defined in [interfaces-supplementary.ts:164](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L164)*

An alternate ID of the track. YouTube internally refers to this value as the setVideoId. This ID
is used in combination with the standard ID in order to remove tracks from playlists.

___

### `Optional` artists

• **artists**? : *[IArtistSummary](#_interfaces_supplementary_iartistsummarymd)[]*

*Defined in [interfaces-supplementary.ts:174](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L174)*

The artist(s) that compose the track.

___

### `Optional` duration

• **duration**? : *string*

*Defined in [interfaces-supplementary.ts:184](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L184)*

The duration of the track as a readable string.

___

### `Optional` durationMillis

• **durationMillis**? : *number*

*Defined in [interfaces-supplementary.ts:189](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L189)*

The duration of the track in milliseconds.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces-supplementary.ts:158](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L158)*

The ID of the track.

___

### `Optional` title

• **title**? : *string*

*Defined in [interfaces-supplementary.ts:169](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L169)*

The title of the track.

___

### `Optional` trackNumber

• **trackNumber**? : *number*

*Defined in [interfaces-supplementary.ts:194](https://github.com/nickp10/youtube-music-ts-api/blob/master/src/interfaces-supplementary.ts#L194)*

The track number within an album.
