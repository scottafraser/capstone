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
  handleChange = event => {
    console.log("event-target-value" + event.target.value);
    this.props.genre(event.target.value);
  };

  setGenreClick = () => {
    this.props.genre(this.props);
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <form
        onSubmit={this.setGenreClick}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-genre"
          label="Genre"
          className={classes.textField}
          value={this.value}
          onChange={this.handleChange}
          onClick={this.setGenreClick}
          margin="normal"
          variant="outlined"
        />
        <button type="submit" onClick={console.log(this.state)}>
          button
        </button>
      </form>
    );
  }
}

PlaylistSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    genre: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    genre: genre => dispatch(actions.setGenreState(genre))
  };
};

export default compose(
  withStyles(styles, { name: "PlaylistSelect" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlaylistSelect);
