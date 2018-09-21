#Playlist Generator

###Technologies
node, react, redux, webpack, babel, materialUI, yarn, jest

# Intro

An app to build quick, custom, awesome playlists and upload them to your personal spotify account.

## Getting Statrted

### 1) Clone the app

- Visit https://developer.spotify.com/
- Log in and create an app
- Enter http//localhost:8888/callback as the redirect uri
- Save your changes
- Copy down the following: Redirect uri, client id, client secret

### 2) Start Auth Server

- Navigate to the auth-server directory `cd auth-server`
- Install the dependencies `yarn`
- Run the Server `node authorization_code/app.js`

### 3) Start Client

- Navigate to the auth-server directory `cd client`
- Install the dependencies `yarn`
- Run the Server `yarn start`

### 4) Use the App

- Make sure you have a song playing (or paused) on a Spotify app
- Visit your locally hosted copt at http://localhost:3000
- Click 'Log in with Spotify' and log in
- Click the 'Check Now Playing' Button
- Your currently playing song's name and album art should appear
