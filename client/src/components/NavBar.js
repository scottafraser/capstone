import React, {Component } from "react";
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
    console.log(this.state);
    this.setState({ anchorEl: null });
  };
  
  render() {
    const { anchorEl } = this.state;
    console.log(anchorEl);
    
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    console.log(this.state)

    let loggy = (
      <Button href="http://localhost:8888" color="inherit">
        Login to Spotify
      </Button>
    );

    if (this.props.login === true) {
      loggy = (
        <div className={classes.row}>
          <h3>{this.props.user.display_name}</h3>
          <Avatar
            alt={this.props.user.display_name}
            src={this.props.user.images[0].url}
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
              aria-owns={open ? 'simple-menu' : null}
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
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
          
            {/* <MenuIcon /> */}
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Sweet Spotify Thing
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

export default withStyles(styles)(ButtonAppBar);
