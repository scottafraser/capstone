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
      user: 
      nowPlaying: { name: "Not Checked", albumArt: "" },
      userLists: { name: "stuff" }
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

  getMe() {
  spotifyApi.getMe().then(response => {
    this.setState({
      nowPlaying: {
        name: response.item.name,
        albumArt: response.item.album.images[0].url
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
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>User: {this.state.nowPlaying.name}</div>
        <div>
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
      </div>
    );
  }
}

export default App;
