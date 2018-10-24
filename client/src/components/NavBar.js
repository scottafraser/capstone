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
import compose from "recompose/compose";
import * as actions from "../actions/nav";

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
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleHome = () => {
    this.props.goToHome();
    this.handleClose();
  };
  handleAbout = () => {
    this.props.goToAbout();
    this.handleClose();
  };
  handlePlaylistSelect = () => {
    this.props.goToPlaylistSelect();
    this.handleClose();
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

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

    // console.log(Object.length(this.props.user.images));

    if (this.isEmpty(this.props.user.images)) {
      console.log(this.props.user);
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
              <MenuItem onClick={this.handleHome}>Home</MenuItem>
              <MenuItem onClick={this.handlePlaylistSelect}>Playlists</MenuItem>
              <MenuItem onClick={this.handleAbout}>About</MenuItem>
            </Menu>

            {/* <MenuIcon /> */}
            <Typography
              variant="title"
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
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    genre: state.genre,
    artist: state.artist,
    showHome: state.showHome
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToHome: response => dispatch(actions.routeToHome(response)),
    goToAbout: response => dispatch(actions.routeToAbout(response)),
    goToPlaylistSelect: response =>
      dispatch(actions.routeToPlaylistSelect(response))
  };
};

export default compose(
  withStyles(styles, { name: "ButtonAppBar" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ButtonAppBar);
