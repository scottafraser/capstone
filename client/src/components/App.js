import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import recordPic from "../images/recordPlayer.png";
import NavBar from "./NavBar";
import PropTypes from "prop-types";
import {
  itemsFetchDataSuccess,
  userPlaylists,
  setUser,
  userIsLoggedIn,
  getUserCurrentSong,
  getUserPlaylists} from "../actions/items";



//spotify library
const spotifyApi = new SpotifyWebApi();


class App extends Component {
 
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
      this.props.setUser(response)
      let userLoggedIn = token ? true : false;
      this.props.loggedIn(userLoggedIn);
    }); 
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.props.getSong(response)
    });
  }



  getPlaylists() {
    spotifyApi.getUserPlaylists().then(response => {
      console.log(response)
      this.props.getPlaylists(response);
    });
  }


  render() {
    console.log(this.props.userPlaylists)
    return <div className="App">
      <NavBar user={this.props.user} login={this.props.isLoggedIn}/>
        <p>
          {this.props.user.display_name}
          <br /> 
          {this.props.user.email}
        </p>
      <div>
        <img src={recordPic} alt="recrd" style={{ height: 150 }} />
      </div>
      {this.props.isloggedIn && 
      <div>
        <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        <h1>{this.props.nowPlaying.name}</h1>
        <img src={this.props.nowPlaying.img} style={{ height: 150 }} />
      </div>}
      <br />
        <button onClick={() => this.getPlaylists()}>
          Check User Playlists
        </button>
        {/* <button onClick={() => this.getRecentTracks()}>
          Check Users Recent Tracks
        </button> */}

        {this.props.userPlaylists.map((playlist, index) => <li key={index}>
            {playlist.name}
            <br />
            <img src={playlist.images[0].url} />
          </li>)}

      </div>;
  }
}

App.propTypes = {
  thisUser: PropTypes.object,
  setUser: PropTypes.func,
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    nowPlaying: state.nowPlaying,
    userPlaylists: state.userPlaylists,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
       setUser: (response) => dispatch(setUser(response)),
       loggedIn: (bool) => dispatch(userIsLoggedIn(bool)),
       getSong: (response) => dispatch(getUserCurrentSong(response)),
       getPlaylists: (response) => dispatch(getUserPlaylists(response))
    // removeItem: (index) => dispatch(deleteItem(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



  // getRecentTracks() {
  //   spotifyApi.getMyRecentlyPlayedTracks().then(response => {
  //     this.setState({ savedTracks: response.items });
  //   });
  // }

{/* recent tracks
        {this.state.savedTracks.map((song, index) => <li key={index}>
            {song.track.artists[0].name}
            <br />
            {song.track.album.name}
            <br />
            {console.log(song.track.album.images)}
            <img src={song.track.album.images[1].url} />
          </li>)} */}