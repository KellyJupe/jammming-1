const clientId = 'c22111d5e42f4810984fe5712201496d'; // Your client id
const redirectUri = 'http://localhost:3000/callback'; // Your redirect uri
let accessToken;


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};




export const Spotify={

	getAccessToken(){
		console.log(`Entering SPOTIFY.JS getAccessToken `)

		//if (accessToken){
		//	console.log(`YES, there is accesToken : ${accessToken}`);
		//	return accessToken;
		//}

		console.log('there is NOT accesToken');
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    	console.log('accessTokenMatch',accessTokenMatch);
    	const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
		console.log('expiresInMatch',expiresInMatch);
		let state=generateRandomString(8);
		console.log('generate state= ',state)
        let scope = 'user-read-private user-read-email';

        if (accessTokenMatch && expiresInMatch) {
        	accessToken = accessTokenMatch[1];
        	console.log('accessToken',accessToken);
        	const expiresIn = Number(expiresInMatch[1]);
        	console.log('expiresIn =',expiresIn);
        	window.setTimeout(() => accessToken = '', expiresIn * 1000);
        	window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
        	return accessToken;
		} else {
			//const accessUrl = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
	      	let accessUrl = 'https://accounts.spotify.com/authorize';
	            accessUrl += '?response_type=token';
	            accessUrl += '&client_id=' + encodeURIComponent(clientId);
	            accessUrl += '&scope=' + encodeURIComponent(scope);
	            accessUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);
	            accessUrl += '&state=' + encodeURIComponent(state);
	        console.log(`accessUrl to get token= ${accessUrl}`)

	      	window.location = accessUrl
	    }

	},

	handleErrors(response) {
	    if (!response.ok) {
	    	console.log('SPOTIFY.handleErrors()- response : ',response);
	        throw Error(response.statusText);
	    }
	    return response;
	},


	search(term){
		console.log('Entering SPOTIFY.JS search')
		Spotify.getAccessToken()
		console.log('continuiing in Search with accessToken...: ');
		//console.log('expires_in', expires_in);
		console.log('SPOTIFY.Search() ...term.....', term);
		return fetch('https://api.spotify.com/v1/search?&q=' + term + '&type=track&limit=10',{
			method: 'GET',
			headers: {Authorization: `Bearer ${accessToken}`}
		}).then(response => {
			console.log('SPOTIFY.Search()- response : ',response);
			Spotify.handleErrors(response)
			return response.json();
		}).then(jsonResponse =>{
			console.log('SPOTIFY.Search()- jsonResponse: ',jsonResponse);
			if (!jsonResponse.tracks){
				console.log('SPOTIFY.Search()-There is NO tracks.....');
				return [];
			} else{
				console.log('SPOTIFY.Search()- jsonresponse.tracks.items', jsonResponse.tracks.items);
				return jsonResponse.tracks.items.map( item=>(
						{
							id: item.id,
							name: item.name,
							artists: item.artists[0].name,
							album: item.album.name,
							uri: item.uri
						}
				));

			}
		});
	},



	savePlaylist(name, trackUris) {
		console.log('SPOTIFY.savePlaylist() -Entering ')
	    if (!name || !trackUris.length) {
	      return;
	    }

	    const accessToken = Spotify.getAccessToken();
	    const headers = { Authorization: `Bearer ${accessToken}` };
	    let userId;

	    return fetch('https://api.spotify.com/v1/me', {headers: headers}
	    ).then(response => response.json()
	    ).then(jsonResponse => {
	      userId = jsonResponse.id;
	      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
	        headers: headers,
	        method: 'POST',
	        body: JSON.stringify({name: name})
	      }).then(response => response.json()
	      ).then(jsonResponse => {
	        const playlistId = jsonResponse.id;
	        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
	          headers: headers,
	          method: 'POST',
	          body: JSON.stringify({uris: trackUris})
	        });
	      });
	    });
  	}


}
export default Spotify;
