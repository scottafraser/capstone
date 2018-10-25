import React, { Component } from "react";
import "./App.scss";

class SongCard extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="nowPlayingCard">
        <h4>Now Playing</h4>
        {this.props.nowPlaying.name}
        <br />
        <img src={this.props.nowPlaying.img} />
      </div>
    );
  }
}

export default SongCard;
