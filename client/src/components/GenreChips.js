import React from "react";
import PropTypes from "prop-types";
import * as actions from "../actions/genre";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

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
    this.state = {
      localGenre: ""
    };
  }

  handleClick = newGenre => {
    this.props.setGenre(newGenre);
    this.props.createGenreList(newGenre);
  };

  render() {
      console.log(this.props);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Chip
          label={this.props.chipGenre}
          onClick={() => this.handleClick(this.props.chipGenre)}
          className={classes.chip}
        />
      </div>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
  // artist: PropTypes.object
  // createArtistList: PropTypes.func
};

const mapStateToProps = state => {
  return {
    genre: state.genre
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGenre: genre => dispatch(actions.setGenreState(genre)),
  };
};

export default compose(
  withStyles(styles, { name: "Chips" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Chips);
