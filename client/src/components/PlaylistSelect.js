import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
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
    this.state = { localGenre: "" };
  }

  handleChange = e => {
    this.setState({
      localGenre: e.target.value
    });
  };

  componentDidUpdate() {
    this.props.setGenre(this.state.localGenre);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className="{classes.container}" noValidate autoComplete="off">
          <TextField
            id="outlined-genre"
            label="Genre"
            className={classes.textField}
            value={this.props.genre}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
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
