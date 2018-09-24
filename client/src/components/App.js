import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import recordPic from "../images/recordPlayer.png";
import NavBar from "./NavBar";
import PropTypes from "prop-types";

function getHashParams() {
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

//spotify library
const spotifyApi = new SpotifyWebApi();
const params = getHashParams();
const token = params.access_token;
if (token) {
  spotifyApi.setAccessToken(token);
}

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   const params = this.getHashParams();
  //   const token = params.access_token;
  //   if (token) {
  //     spotifyApi.setAccessToken(token);
  //   }
    this.state = {
      loggedIn: token ? true : false,
      user: { name: "", userImage: "" },
      nowPlaying: { name: "", albumArt: "" },
      userLists: { name: "stuff" },
      savedTracks: [],
      playlists: []
    };
  

 
  componentDidMount() {
    spotifyApi.getMe().then(response => {
      this.setState({
        user: {
          name: response.display_name,
          userImage: response.images[0].url
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

  // getRecentTracks() {
  //   spotifyApi.getMyRecentlyPlayedTracks().then(response => {
  //     this.setState({ savedTracks: response.items });
  //   });
  // }

  getPlaylists() {
    spotifyApi.getUserPlaylists().then(response => {
      console.log(response)
      this.setState({ playlists: response.items });
    });
  }


  render() {
    return <div className="App">
        <NavBar loggedIn={this.state.loggedIn}loginName={this.state.user.name} loginPic={this.state.user.userImage} />
        <div>
          <img src={recordPic} style={{ height: 150 }} />
          <h1>{this.state.nowPlaying.name}</h1>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && <button
            onClick={() => this.getNowPlaying()}
          >
            Check Now Playing
          </button>}
        <br />
        <button onClick={() => this.getPlaylists()}>
          Check User Playlists
        </button>
        {/* <button onClick={() => this.getRecentTracks()}>
          Check Users Recent Tracks
        </button> */}

        {this.state.playlists.map((playlist, index) => <li key={index}>
            {playlist.name}
            <br />
            <img src={playlist.images[0].url} />
          </li>)}

          {/* recent tracks
        {this.state.savedTracks.map((song, index) => <li key={index}>
            {song.track.artists[0].name}
            <br />
            {song.track.album.name}
            <br />
            {console.log(song.track.album.images)}
            <img src={song.track.album.images[1].url} />
          </li>)} */}
      </div>;
  }
}

App.propTypes = {
  login: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    loggedIn: token ? true : false,
    user: { name: "", userImage: "" },
    nowPlaying: { name: "", albumArt: "" },
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    // fetchData: (url) => dispatch(itemsFetchData(url)),
    // removeItem: (index) => dispatch(deleteItem(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

