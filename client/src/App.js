import React, { Component } from "react";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";

//spotify library
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: { name: "" },
      nowPlaying: { name: "", albumArt: "" },
      userLists: { name: "stuff" },
      savedTracks: []
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    spotifyApi.getMe().then(response => {
      console.log(response);
      this.setState({
        user: {
          name: response.display_name
        }
      });
    });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  getSavedTracks() {
    spotifyApi.getMySavedTracks().then(response => {
      console.log(response.items);
      this.setState({
        savedTracks: response.items
      });
    });
  }

  getPlaylists() {
    spotifyApi.getUserPlaylists().then(response => {
      console.log(response);
      this.setState({
        nowPlaying: {
          name: response.playlist
        }
      });
    });
  }

  render() {
    const list = this.state.tracksList;

    return (
      <div className="App">
        <div>
          <a href="http://localhost:8888"> Login to Spotify </a>
        </div>
        <div>User: {this.state.user.name}</div>
        <div>
          <h1>{this.state.nowPlaying.name}</h1>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}
        <br />
        <button onClick={() => this.getPlaylists()}>
          Check User Playlists
        </button>
        <button onClick={() => this.getSavedTracks()}>
          Check User Saved Tracks
        </button>
        {this.state.savedTracks.map((song, index) => (
          <li key={index}>
            {song.track.artists[0].name}
            <br />
            {song.track.album.name}}<br />
            {console.log(song.track.album.images)}
            <img src={song.track.album.images[0].url} />
          </li>
        ))}
      </div>
    );
  }
}

export default App;
