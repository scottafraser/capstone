import React, { Component } from "react";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import recordPic from "../images/recordPlayer.png";
import NavBar from "./NavBar";
import PropTypes from "prop-types";

//spotify library
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: { name: "", userImage: "" },
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
          name: response.display_name,
          userImage: response.images[0].url
        }
      });
      console.log(this.state.user);
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
        <NavBar
          loginName={this.state.user.name}
          loginPic={this.state.user.userImage}
        />
        <div>
          <img src={recordPic} style={{ height: 150 }} />
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
            {song.track.album.name}
            <br />
            {console.log(song.track.album.images)}
            <img src={song.track.album.images[1].url} />
          </li>
        ))}
      </div>
    );
  }
}

App.propTypes = {
  login: PropTypes.object
};

export default App;
