const clientId = 'c22111d5e42f4810984fe5712201496d';
const redirectUri = 'http://jammming-cg.surge.sh/';

let accessToken;

const Spotify = {
  getAccessToken() {

    if (accessToken) {
      return accessToken;
    }

    let wlhref = window.location.href;
    let tempTokenMatch = wlhref.match(/access_token=([^&]*)/);
    let tempExpireMatch = wlhref.match(/expires_in=([^&]*)/);
    if (tempTokenMatch && tempExpireMatch) {

     accessToken = tempTokenMatch[1];
      const expiresIn = Number(tempExpireMatch[1]);
      console.log(expiresIn);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

      } else {

        const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = authorizeUrl;
      console.log(authorizeUrl);
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }

    }).then(response => {
    return response.json();
  }).then(jsonResponse => {

    if (!jsonResponse.tracks) {
        return [];
      }

      let tempTracks = jsonResponse.tracks.items.map(item => ({
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        uri: item.uri
      }));
      console.log(tempTracks);
      return tempTracks;
    });
  },

  savePlaylist(playlistName, trackURIs) {

    if (!playlistName || !trackURIs.length) {
          return;
        }

        const accessToken = Spotify.getAccessToken();
        let userId;
        const headers = {Authorization: `Bearer ${accessToken}` };

        return fetch(`https://api.spotify.com/v1/me`, {
        headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {

      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: playlistName})

      }).then(response => {
      return response.json();
    }).then(jsonResponse => {

      const playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({uris: trackURIs})
        });
      });
    });
  }
};

export default Spotify;
