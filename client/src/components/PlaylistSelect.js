import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as actions from "../actions/genre";
import { connect } from "react-redux";
import compose from "recompose/compose";

const styles = theme => ({
  container: {
    display: "flex",
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
  }
});

class PlaylistSelect extends React.Component {
  handleChange = genre => event => {
    // event.preventDefault();
    //   let newGenre = event.target.value
    this.props.setGenreState(genre);
  };

  render() {
    const { classes } = this.props;
    console.log("form props" + this.props);
    return (
      <form
        onSubmit={this.handleChange()}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-genre"
          label="Genre"
          className={classes.textField}
          value={this.genre}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <button type="submit">Set Genre</button>
      </form>
    );
  }
}

PlaylistSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    genre: state.genre
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGenre: value => dispatch(actions.setGenreState(value))
  };
};

export default compose(
  withStyles(styles, { name: "PlaylistSelect" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlaylistSelect);
