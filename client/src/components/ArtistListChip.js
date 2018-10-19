import React from "react";
import PropTypes from "prop-types";
import * as actions from "../actions/genre";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class Chips extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e, newArtist) => {
    alert("You clicked the Chip."); // eslint-disable-line no-alert
    this.props.setArtist(newArtist);
    this.props.createArtistList(e);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Chip
          label={this.props.artist.name}
          onClick={this.handleClick(this.props.artist.name)}
          className={classes.chip}
        />
      </div>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
  artist: PropTypes.object,
  createArtistList: PropTypes.func
};

const mapStateToProps = state => {
  return {
    genre: state.genre,
    artist: state.artist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // setGenre: genre => dispatch(actions.setGenreState(genre)),
    setArtist: artist => dispatch(actions.setArtistState(artist))
  };
};

export default compose(
  withStyles(styles, { name: "Chips" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Chips);
