import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as actions from "../actions/genre";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import PushPlaylist from "./PushPlaylist";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class PlaylistSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localGenre: "",
      localArtist: "",
      showGenre: false,
      showArtist: false,
      showSave: false
    };
  }

  handleGenreChange = e => {
    this.setState({
      localGenre: e.target.value
    });
  };

  handleArtistChange = e => {
    this.setState({
      localArtist: e.target.value
    });
  };

  onArtistClick = e => {
    this.props.createArtistList(e);
  };

  onGenreClick = e => {
    this.props.createGenreList(e);
  };

  toggleArtist = () => {
    this.setState({
      showArtist: !this.state.showArtist,
      showSave: true,
      showGenre: false
    });
  };

  toggleGenre = () => {
    this.setState({
      showGenre: !this.state.showGenre,
      showSave: true,
      showArtist: false
    });
  };

  componentDidUpdate() {
    this.props.setGenre(this.state.localGenre);
    this.props.setArtist(this.state.localArtist);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={this.toggleArtist}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Artist
        </Button>
        <Button
          onClick={this.toggleGenre}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Genre
        </Button>
        {this.state.showGenre && (
          <div>
            <form className="{classes.container}" noValidate autoComplete="off">
              <TextField
                id="outlined-genre"
                label="Genre"
                className={classes.textField}
                value={this.props.genre}
                onChange={this.handleGenreChange}
                margin="normal"
                variant="outlined"
                // onSubmit={this.onGenreClick}
              />
            </form>
            <Button
              onClick={this.onGenreClick}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create Playlist
            </Button>
          </div>
        )}
        {this.state.showArtist && (
          <div>
            <form className="{classes.container}" noValidate autoComplete="off">
              <TextField
                id="outlined-artist"
                label="Artist"
                className={classes.textField}
                value={this.props.artist}
                onChange={this.handleArtistChange}
                margin="normal"
                variant="outlined"
              />
            </form>
            <Button
              onClick={this.onArtistClick}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create Playlist
            </Button>
          </div>
        )}
        {this.state.showSave && (
          <div>
            <PushPlaylist />
          </div>
        )}
      </div>
    );
  }
}

PlaylistSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  genre: PropTypes.string,
  artist: PropTypes.string
};

const mapStateToProps = state => {
  return {
    genre: state.genre,
    artist: state.artist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGenre: genre => dispatch(actions.setGenreState(genre)),
    setArtist: artist => dispatch(actions.setArtistState(artist))
  };
};

export default compose(
  withStyles(styles, { name: "PlaylistSelect" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlaylistSelect);
