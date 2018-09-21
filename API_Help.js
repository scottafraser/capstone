

// - Fetches a list of the current user's playlists.
// - See [Get a List of a User's Playlists](https://developer.spotify.com/web-api/get-list-users-playlists/) on
// - the Spotify Developer site for more information about the endpoint.
// -
// - @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
// - to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
// - the permissions will be used.
// - @param {Object} options A JSON object with options that can be passed
// - @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
// - one is the error object (null if no error), and the second is the value if the request succeeded.
// - @return {Object} Null if a callback is provided, a `Promise` object otherwise

  Constr.prototype.getUserPlaylists = function(userId, options, callback) {
  var requestData;
  if (typeof userId === 'string') {
  requestData = {
  url: \_baseUri + '/users/' + encodeURIComponent(userId) + '/playlists'
  };
  } else {
  requestData = {
  url: \_baseUri + '/me/playlists'
  };
  callback = options;
  options = userId;
  }
  return \_checkParamsAndPerformRequest(requestData, options, callback);
  };
