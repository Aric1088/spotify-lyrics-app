import React, { Component } from "react";

class Stream extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
    this.host = "ariczhuang.ddns.net:9900";
    this.state = {
      isPlaying: false,
      icon: "fa fa-play fa-2x",
      marginLeft: "12px"
    };
  }

  setDevice() {
    var seek;
    -1 !==
    (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR"))
      ? alert("Opera")
      : -1 !== navigator.userAgent.indexOf("Chrome")
      ? (seek = 1.45)
      : -1 !== navigator.userAgent.indexOf("Safari")
      ? (seek = 0)
      : -1 !== navigator.userAgent.indexOf("Firefox")
      ? (seek = 0)
      : -1 < navigator.userAgent.indexOf("Edge")
      ? (seek = 0)
      : -1 !== navigator.userAgent.indexOf("MSIE") ||
        1 === !!document.documentMode
      ? alert("IE")
      : alert("unknown");
    console.log(seek);
    return seek;
  }
  play() {
    if (this.state.isPlaying) {
      var e = document.getElementById("background");
      e.pause();
      e.src = "";
      this.setState({
        isPlaying: false,
        icon: "fa fa-play fa-2x",
        marginLeft: "12x"
      });
    } else {
      var e = document.getElementById("background");
      console.log(this);
      e.src = "http://" + this.host + "/stream";
      e.currentTime = this.setDevice();
      e.play();
      this.setState({
        isPlaying: true,
        icon: "fa fa-pause fa-2x",
        marginLeft: "0px"
      });
    }
  }
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <audio id="background">
          <source src="" preload="none" type="audio/mpeg" />
        </audio>
        <br />
        <br />
        <br />
        <br />
        <button
          className="button"
          id="player"
          onClick={() => this.play()}
        >
          <i
            className={this.state.icon}
            style={{ fontSize: "80px", marginLeft: this.state.marginLeft }}
          />
        </button>
      </div>
    );
  }
}
export default Stream;
