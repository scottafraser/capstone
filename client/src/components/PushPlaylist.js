import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../actions/genre";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import SpotifyWebApi from "spotify-web-api-js";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const spotifyApi = new SpotifyWebApi();


class PushPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistTitle: '',  
      trackIdArray: [],
      open: false,
  };
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    handleChange = e => {
    this.setState({
        playlistTitle: e.target.value,
    });
    console.log(this.state.playlistTitle);
    };

  makePlaylist = () => {
    spotifyApi
      .createPlaylist({
        name: this.state.playlistTitle,
        description: "Made with ♥",
        public: false
      })
      .then(response => {
        let playlistId = response.id;
        this.mapPlaylistTrackIds();
        spotifyApi.addTracksToPlaylist(playlistId, this.state.trackIdArray);
        this.handleClose();
      });
}

  mapPlaylistTrackIds = () => {
    let trackArray = this.props.createPlaylistTracks.map(tracks => tracks.uri);
    this.setState({
      trackIdArray: trackArray
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
          <div>
        <Button    
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen}>
          Save Playlist
          </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Playlist</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Create a playlist with these songs, this will save to your spotify account.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="title"
              value={this.state.playlistTitle}
              onChange={this.handleChange}
              fullWidth
            />
            <DialogContentText>
                Create a playlist with these songs, this will save to your spotify account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.makePlaylist} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
        {/* {this.props.createPlaylistTracks.map(track => (
          <div key={track.id}>
            <h3>{track.name}</h3>
            <h3>{track.id}</h3>
            <br />
          </div>
        ))} */}
      </div>
    );
  }
}

PushPlaylist.propTypes = {
    classes: PropTypes.object.isRequired,
    genre: PropTypes.string,
    artist: PropTypes.string,
};

const mapStateToProps = state => {
    return {
    createPlaylistTracks: state.createPlaylistTracks,
    // artist: state.artist
    };
};

export default compose(
    withStyles(styles, { name: "PushPlaylist" }),
    connect(
        mapStateToProps,
        // mapDispatchToProps
    )
)(PushPlaylist);