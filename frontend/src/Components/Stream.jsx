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
    this.createVisualization = this.createVisualization.bind(this);
  }

  componentDidMount() {
    this.createVisualization();
  }

  createVisualization() {
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let canvas = this.refs.analyzerCanvas;
    let ctx = canvas.getContext("2d");
    let audio = this.refs.audio;
    audio.crossOrigin = "anonymous";
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);

    function renderFrame() {
      let freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(freqData);
      ctx.fillStyle = "#9933ff";
      let bars = 100;
      for (var i = 0; i < bars; i++) {
        let bar_x = i * 3;
        let bar_width = 2;
        let bar_height = -(freqData[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }
    renderFrame();
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
      <div style={{ textAlign: "center" }}>
        <audio ref="audio" id="background">
          <source src="" preload="none" type="audio/mpeg" />
        </audio>
        <br />
        <br />
        <br />
        <br />
        <button className="button" id="player" onClick={() => this.play()}>
          <i
            className={this.state.icon}
            style={{ fontSize: "80px", marginLeft: this.state.marginLeft }}
          />
        </button>
        <canvas ref="analyzerCanvas" id="analyzer" />
      </div>
    );
  }
}
export default Stream;
