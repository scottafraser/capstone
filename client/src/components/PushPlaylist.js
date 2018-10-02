import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as actions from "../actions/genre";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import SpotifyWebApi from "spotify-web-api-js";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const spotifyApi = new SpotifyWebApi();


class PushPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackIdArray: [],
        };
    }


    // makePlaylist() {
    //     spotifyApi.createPlaylist().then(response => {
    //         console.log(response)
    //     });
    // }
    
    makePlaylist = () => {
        console.log(this.state.trackIdArray);
        let trackArray = this.props.createPlaylistTracks.map(tracks => tracks.id)
            this.setState({
                trackIdArray: trackArray
            })
        };
    
    
    render() {
        const { classes } = this.props;
        return (
            <div>
   
            {this.props.createPlaylistTracks.map((track) => (
                <div key={track.id}>
                <h3>{track.name}</h3>
                <h3>{track.id}</h3>
                <br />
                </div>
                ))}

            <Button  onClick={this.makePlaylist} variant="contained" color="primary" className={classes.button}>Save Playlist</Button>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    createPlaylistTracks: state.createPlaylistTracks,
    };
};

export default compose(
    withStyles(styles, { name: "PushPlaylist" }),
    connect(
        mapStateToProps,
        // mapDispatchToProps
    )
)(PushPlaylist);