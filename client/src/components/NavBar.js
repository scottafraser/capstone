import compose from "recompose/compose";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import classNames from "classnames";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import * as itemActions from "../actions/items";
import SpotifyWebApi from "spotify-web-api-js";
import SongCard from "./SongCard";
import Emoji from "./Emoji";

const spotifyApi = new SpotifyWebApi();

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
};

class ButtonAppBar extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.getNowPlaying();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  handleLogout = () => {
    window.location = "/#";
    window.open("https://www.spotify.com/us/logout");
    this.handleClose();
  };

  handleSongClick = (id) => {
    this.props.createSongList(id);
  };

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.props.getSong(response.item);
    });
    this.handleClose();
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  componentDidMount() {
    this.getNowPlaying();
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    let loggy = (
      <Button href="http://localhost:8888" color="inherit">
        Login to Spotify
      </Button>
    );

    let image = "";

    if (this.isEmpty(this.props.user.images)) {
      image =
        "http://foodbank.bradfrostweb.com/patternlab/v7/images/fpo_avatar.png";
    } else {
      image = this.props.user.images[0].url;
    }

    if (this.props.login === true) {
      loggy = (
        <div className={classes.row}>
          <h3>{this.props.user.display_name}</h3>
          <Avatar
            alt={this.props.user.display_name}
            src={image}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              aria-owns={open ? "simple-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              <SongCard nowPlaying={this.props.nowPlaying} />
              <MenuItem onClick={() => this.handleSongClick( this.props.nowPlaying.id)}>
                <Emoji symbol="☝️ " />
                Make Into Playlist
              </MenuItem>
              <MenuItem>
                <Emoji symbol="🍺 " />
                Buy Me a Beer
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>

            {/* <MenuIcon /> */}
            <Typography
              variant="h3"
              color="inherit"
              className={classes.grow}
            >
              {/* Spotify Playlist Generator */}
            </Typography>
            {loggy}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  getCurrentSong: PropTypes.func
};

const mapStateToProps = state => {
  return {
    genre: state.genre,
    artist: state.artist,
    showHome: state.showHome,
    nowPlaying: state.nowPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSong: response => dispatch(itemActions.getUserCurrentSong(response))
  };
};

export default compose(
  withStyles(styles, { name: "ButtonAppBar" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ButtonAppBar);
