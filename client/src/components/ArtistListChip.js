import React from "react";
import PropTypes from "prop-types";
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

function handleClick() {
  alert("You clicked the Chip."); // eslint-disable-line no-alert
}

function Chips(props) {
  console.log(props);

  // if (props.artist.images === undefined) {
  //   avatarImage = { account_circle };
  // }

  const { classes } = props;
  return (
    <div className={classes.root}>
      <Chip
        label={props.artist.name}
        onClick={handleClick}
        className={classes.chip}
      />
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
  artist: PropTypes.object
};

export default withStyles(styles)(Chips);
