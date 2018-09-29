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
  }
});

class PlaylistSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { genre: "" };
  }

  handleChange = e => {
    this.setState({
      genre: e.target.value
    });
  };

  setGenreClick = e => {
    e.preventDefault();
    console.log(this.state.genre);
    this.props.setGenre(this.state.genre);
  };

  render() {
    const { classes } = this.props;
    console.log("playlist maker props" + this.props.createList);
    return (
      <div>
        <form
          onSubmit={e => this.setGenreClick(e)}
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-genre"
            label="Genre"
            className={classes.textField}
            value={this.props.genre}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <button type="submit">button</button>
        </form>
        <button onClick={this.props.createList}>Make Playlist</button>
      </div>
    );
  }
}

PlaylistSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  genre: PropTypes.string
};

const mapStateToProps = state => {
  return {
    genre: state.genre
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGenre: genre => dispatch(actions.setGenreState(genre))
  };
};

export default compose(
  withStyles(styles, { name: "PlaylistSelect" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlaylistSelect);
