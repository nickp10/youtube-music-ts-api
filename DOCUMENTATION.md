
<a name="_interfaces_ialbumsummarymd"></a>


# Interface: IAlbumSummary

Defines an album summary.

## Hierarchy

* **IAlbumSummary**

## Index

### Properties

* [id](#optional-id)
* [name](#optional-name)

## Properties

### `Optional` id

• **id**? : *string*

*Defined in [interfaces.ts:57](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L57)*

The ID of the album.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces.ts:62](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L62)*

The name of the album.


<a name="_interfaces_iartistsummarymd"></a>


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

*Defined in [interfaces.ts:72](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L72)*

The ID of the artist.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces.ts:77](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L77)*

The name of the artist.


<a name="_interfaces_iplaylistdetailmd"></a>


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

*Defined in [interfaces.ts:102](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L102)*

The count of tracks within the playlist.

___

### `Optional` description

• **description**? : *string*

*Defined in [interfaces.ts:97](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L97)*

The description of the playlist.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces.ts:87](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L87)*

The ID of the playlist.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces.ts:92](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L92)*

The name of the playlist.

___

### `Optional` privacy

• **privacy**? : *string*

*Defined in [interfaces.ts:107](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L107)*

The privacy level of the playlist.

___

### `Optional` tracks

• **tracks**? : *[ITrackDetail](#_interfaces_itrackdetailmd)[]*

*Defined in [interfaces.ts:112](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L112)*

The array of tracks within the playlist.


<a name="_interfaces_iplaylistsummarymd"></a>


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

*Defined in [interfaces.ts:132](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L132)*

The count of tracks within the playlist.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces.ts:122](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L122)*

The ID of the playlist.

___

### `Optional` name

• **name**? : *string*

*Defined in [interfaces.ts:127](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L127)*

The name of the playlist.


<a name="_interfaces_itrackdetailmd"></a>


# Interface: ITrackDetail

Defines the details for a track.

## Hierarchy

* **ITrackDetail**

## Index

### Properties

* [album](#optional-album)
* [artists](#optional-artists)
* [duration](#optional-duration)
* [id](#optional-id)
* [title](#optional-title)

## Properties

### `Optional` album

• **album**? : *[IAlbumSummary](#_interfaces_ialbumsummarymd)*

*Defined in [interfaces.ts:157](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L157)*

The album the track is from.

___

### `Optional` artists

• **artists**? : *[IArtistSummary](#_interfaces_iartistsummarymd)[]*

*Defined in [interfaces.ts:152](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L152)*

The artist(s) that compose the track.

___

### `Optional` duration

• **duration**? : *string*

*Defined in [interfaces.ts:162](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L162)*

The duration of the track as a readable string.

___

### `Optional` id

• **id**? : *string*

*Defined in [interfaces.ts:142](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L142)*

The ID of the track.

___

### `Optional` title

• **title**? : *string*

*Defined in [interfaces.ts:147](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L147)*

The title of the track.


<a name="_interfaces_iyoutubemusicmd"></a>


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

▸ **authenticate**(`cookiesStr`: string): *Promise‹[IYouTubeMusicAuthenticated](#_interfaces_iyoutubemusicauthenticatedmd)›*

*Defined in [interfaces.ts:14](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L14)*

Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cookiesStr` | string | The cookie string of a valid logged in user. The minimum required cookie values needed are the HSID, SSID, APISID, SAPISID, and __Secure-3PSID. To obtain this cookie value, log into https://music.youtube.com as a user and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored. |

**Returns:** *Promise‹[IYouTubeMusicAuthenticated](#_interfaces_iyoutubemusicauthenticatedmd)›*

A promise that will yield authenticated access to the YouTube Music API.

___

###  guest

▸ **guest**(): *Promise‹[IYouTubeMusicGuest](#_interfaces_iyoutubemusicguestmd)›*

*Defined in [interfaces.ts:21](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L21)*

Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.

**Returns:** *Promise‹[IYouTubeMusicGuest](#_interfaces_iyoutubemusicguestmd)›*

A promise that will yield guest access to the YouTube Music API.


<a name="_interfaces_iyoutubemusicauthenticatedmd"></a>


# Interface: IYouTubeMusicAuthenticated

Defines the YouTube Music APIs available to an authenticated user. An authenticated user also naturally includes the APIs available to a guest.

## Hierarchy

* [IYouTubeMusicGuest](#_interfaces_iyoutubemusicguestmd)

  ↳ **IYouTubeMusicAuthenticated**

## Index

### Methods

* [getLibraryPlaylists](#getlibraryplaylists)
* [getPlaylist](#getplaylist)

## Methods

###  getLibraryPlaylists

▸ **getLibraryPlaylists**(): *Promise‹[IPlaylistSummary](#_interfaces_iplaylistsummarymd)[]›*

*Defined in [interfaces.ts:33](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L33)*

Gets all the playlists in the user's library.

**Returns:** *Promise‹[IPlaylistSummary](#_interfaces_iplaylistsummarymd)[]›*

A promise that will yield an array of all the playlists in the user's library.

___

###  getPlaylist

▸ **getPlaylist**(`id`: string): *Promise‹[IPlaylistDetail](#_interfaces_iplaylistdetailmd)›*

*Defined in [interfaces.ts:41](https://github.com/nickp10/youtube-music-ts-api/blob/896950b/src/interfaces.ts#L41)*

Gets detailed information for a specific playlist.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The ID of the playlist to get the detailed information for. |

**Returns:** *Promise‹[IPlaylistDetail](#_interfaces_iplaylistdetailmd)›*

A promise that will yield the detailed information for a specific playlist.


<a name="_interfaces_iyoutubemusicguestmd"></a>


# Interface: IYouTubeMusicGuest

Defines the YouTube Music APIs available to a guest.

## Hierarchy

* **IYouTubeMusicGuest**

  ↳ [IYouTubeMusicAuthenticated](#_interfaces_iyoutubemusicauthenticatedmd)
