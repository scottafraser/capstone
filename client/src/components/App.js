import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import record from "../images/record.jpeg";
import NavBar from "./NavBar";
import PropTypes from "prop-types";
import NowPlaying from "./NowPlaying";
import * as actions from "../actions/items";
import PlaylistSelect from "./PlaylistSelect";

//spotify library
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { genre: "" };
  }

  componentDidMount() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    const token = hashParams.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    spotifyApi.getMe().then(response => {
      this.props.setUser(response);
      let userLoggedIn = token ? true : false;
      this.props.loggedIn(userLoggedIn);
    });
  }

  updateInput = e => {
    this.setState({
      genre: e.target.value
    });
  };

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.props.getSong(response);
    });
  }

  getPlaylists() {
    spotifyApi.getUserPlaylists().then(response => {
      this.props.getPlaylists(response);
    });
  }

  createPlaylist(e) {
    e.preventDefault();
    let genre = this.state.genre;
    spotifyApi.getRecommendations({ seed_genres: genre }).then(response => {
      console.log("create response " + response);
      this.props.createPlaylist(response);
    });
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    console.log("app" + this.props.genre);
    return (
      <div className="App">
        <NavBar user={this.props.user} login={this.props.isLoggedIn} />
        <div>
          <img
            src={record}
            alt="record"
            className="App-logo"
            style={{ height: 150 }}
          />
        </div>
        <PlaylistSelect genre={this.props} />
        {/* {this.props.isLoggedIn && (
          <NowPlaying
            isLoggedIn={this.props.isLoggedIn}
            getNowPlaying={this.props.getSong}
            nowPlaying={this.props.nowPlaying}
          />
        )} */}
        <br />

        <button onClick={() => this.getPlaylists()}>
          Check User Playlists
        </button>
        <div>
          <form onSubmit={e => this.createPlaylist(e)}>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              onChange={this.updateInput}
              value={this.state.genre}
            />
            <button type="submit">create Playlist</button>
          </form>
        </div>

        <div className="playlists">
          {this.props.createPlaylistTracks.map((track, index) => (
            <div key={index}>
              <h3>{track.name}</h3>
              <h3>{track.artists[0].name}</h3>
              <br />
              <img src={track.album.images[1].url} alt="album art" />
            </div>
          ))}
        </div>

        <div className="playlists">
          <h1>USER PLAYLISTS</h1>
          {this.props.userPlaylists.map((playlist, index) => (
            <div key={index}>
              <h3>{playlist.name}</h3>
              <br />
              <img src={playlist.images[0].url} alt="playlist image" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  thisUser: PropTypes.object,
  setUser: PropTypes.func,
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    genre: state.genre,
    items: state.items,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    createPlaylistTracks: state.createPlaylistTracks,
    nowPlaying: state.nowPlaying,
    userPlaylists: state.userPlaylists,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: response => dispatch(actions.setUser(response)),
    createPlaylist: response => dispatch(actions.userCreatePlaylist(response)),
    loggedIn: bool => dispatch(actions.userIsLoggedIn(bool)),
    getSong: response => dispatch(actions.getUserCurrentSong(response)),
    getPlaylists: response => dispatch(actions.getUserPlaylists(response))
    // removeItem: (index) => dispatch(deleteItem(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// getRecentTracks() {
//   spotifyApi.getMyRecentlyPlayedTracks().then(response => {
//     this.setState({ savedTracks: response.items });
//   });
// }

{
  /* recent tracks
        {this.state.savedTracks.map((song, index) => <li key={index}>
            {song.track.artists[0].name}
            <br />
            {song.track.album.name}
            <br />
            {console.log(song.track.album.images)}
            <img src={song.track.album.images[1].url} />
          </li>)} */
}

{
  /* {this.props.isLoggedIn && (
          <div>
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
            <h1>{this.props.nowPlaying.name}</h1>
            <img src={this.props.nowPlaying.img} style={{ height: 150 }} />
          </div>
        )} */
}
