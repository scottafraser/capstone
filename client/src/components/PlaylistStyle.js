import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import Mood from '@material-ui/icons/Mood'
import Chill from '@material-ui/icons/BeachAccess'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function PlaylistStyle(props) {
  const { classes } = props;
  return (
    <div>
        <h4>Select Playlist Style</h4>
        <div>
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
            <DirectionsRun/>
        </Button>
            <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                <Mood />
            </Button>
            <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                <Chill/>
            </Button>
          </div>
    </div>
  );
}

PlaylistStyle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaylistStyle);