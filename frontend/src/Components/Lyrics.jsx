import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Lyrics extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        albumArt: "",
        lyrics: [],
        time_left: 0,
        total_time: 0
      }
    };
    console.log(params);
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  hasChanged() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      console.log(response.item.name);
      console.log(this.state.nowPlaying.name);
      if (
        response.item.name.valueOf() !== this.state.nowPlaying.name.valueOf()
      ) {
        this.getNowPlaying();
      } else {
        const {
          name,
          artist,
          albumArt,
          total_time,
          lyrics
        } = this.state.nowPlaying;
        this.setState({
          nowPlaying: {
            name: name,
            artist: artist,
            albumArt: albumArt,
            total_time: total_time,
            time_left: response.item.duration_ms - response.progress_ms,
            lyrics: lyrics
          }
        });
      }
    });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.hasChanged(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNowPlaying() {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then(response => {
        var artist = response.item.artists[0].name.replace(/[^\w\s]/g, "");
        var song_name = response.item.name.replace(/[^\w\s]/g, "");
        song_name = song_name.split(" ");
        song_name = song_name.slice(0, 5);
        song_name = song_name.join("%20");
        console.log(song_name);
        var url =
          "http://localhost:8888/get_lyrics/?artist=" +
          artist.replace(" ", "%20") +
          "&name=" +
          song_name;

        // this.getLyrics(response.item.artists[0].name, response.item.name)
        fetch(url)
          .then(data => data.json())
          .then(data => {
            var parsed = data.lyrics.song_lyrics.split("\n");
            console.log(parsed);
            this.setState({
              nowPlaying: {
                name: response.item.name,
                artist: response.item.artists[0].name,
                albumArt: response.item.album.images[0].url,
                total_time: response.item.duration_ms,
                time_left: response.item.duration_ms - response.progress_ms,
                lyrics: parsed
              }
            });
          })
          .catch(err => console.log("lyrical error:" + err));
      })
      .catch(err => console.log("There was an error:" + err));
  }

  render() {
    const lyrics = this.state.nowPlaying.lyrics.map(item =>
      item === "" ? <br /> : <div key={item.uniqueId}>{item}</div>
    );
    return (
      <div className="Lyrics">
        {this.state.loggedIn && (
          <React.Fragment>
            {" "}
            <input
              id="mycheckbox"
              onClick={() => this.getNowPlaying()}
              type="checkbox"
            />
            <label for="mycheckbox" />
          </React.Fragment>
        )}
        {!this.state.loggedIn && (
          <a href="http://localhost:8888/login">Connect your Spotify</a>
        )}
        <div>
          {this.state.nowPlaying.name}
          <div style={{ width: "300px", margin: "auto" }}>
            <ProgressBar
              active
              striped
              bsStyle="info"
              now={Math.floor(
                (1 -
                  this.state.nowPlaying.time_left /
                    this.state.nowPlaying.total_time) *
                  100
              )}
            />
          </div>
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
          <br />
          <br />
        </div>
        <div>Lyrics: {lyrics}</div>
      </div>
    );
  }
}

export default Lyrics;
