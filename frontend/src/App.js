import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import socketIOClient from "socket.io-client";
import history from "./history";
import Accident from "./redesign/Accident";
import Home from "./redesign/Home";
import PageNotFound from "./page/PageNotFound";
import Login from "./redesign/Login";
import MapN from "./component/MapN";
import Playlist from "./redesign/Playlist";
import axios from "axios";
import confident from "../src/song/confident_demi.mp3";
import { Form, Input, Button, Layout, Menu, Modal, message } from "antd";
import { config } from "./config/config";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setIsModalVisible: false,
      currentLat: 0,
      currentLng: 0,
      play: false,
      pause: true,
      auto: true,
      start: 0,
    };
    this.uploadcurrentlo = this.uploadcurrentlo.bind(this);
    this.socket = socketIOClient("http://" + config.baseURL + ":4000");
  }

  // audio = new Audio(confident);
  loggedIn() {
    //return true;
    if (localStorage.getItem("islogin") === "true") {
      console.log("hh");
      return true;
    } else {
      console.log("gg");
      return false;
    }
  }

  // alertDrowsy() {
  //   var d = new Date();
  //   var start = d.getTime();
  //   this.showModal();

  //   var end = d.getTime();
  //   var response = start - end;
  //   return response;
  // }
  warning = (text) => {
    message.warning(text);
  };

  render() {
    return (
      <Router history={history}>
        <div>
          <Modal
            title="Drowsiness alert"
            visible={this.state.setIsModalVisible}
            onOk={() => this.handleOk()}
            onCancel={() => this.handleOk()}
            // cancelButtonProps={{ style: { display: "none" } }}
            footer={null}
          >
            <audio
              id="player"
              src={confident}
              autoPlay={true}
              controls={true}
              onPause={() => this.handleOk()}
            ></audio>
            {/* <button onclick="document.getElementById('player').play()">
                Play
              </button>
              <button onclick="document.getElementById('player').pause()">
                Pause
              </button> */}
          </Modal>

          <Switch>
            {this.loggedIn() ? (
              <Route
                path="/home"
                render={() => (
                  <Home
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            ) : (
              <Route
                path="/home"
                render={() => (
                  <Home
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
              // <Route path="/home" component={Login} />
            )}
            {this.loggedIn() ? (
              <Route
                path="/accident"
                render={() => (
                  <Accident
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            ) : (
              // <Route path="/accident" component={PageNotFound} />
              <Route
                path="/accident"
                render={() => (
                  <Accident
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            )}
            {this.loggedIn() ? (
              <Route
                path="/playlist"
                render={() => (
                  <Playlist
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            ) : (
              // <Route path="/playlist" component={PageNotFound} />
              <Route
                path="/playlist"
                render={() => (
                  <Playlist
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            )}
            <Route
              path="/test"
              render={() => (
                <Home
                  currentLat={this.state.currentLat}
                  currentLng={this.state.currentLng}
                />
              )}
            />
            <Route path="/" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
          <button onClick={() => this.showModal()}>sound test</button>
        </div>
      </Router>
    );
  }

  showModal = () => {
    this.setState({ setIsModalVisible: true });
    var d = new Date();
    var start = d.getTime();
    console.log(start);
    this.setState({ start: start });
  };
  handleOk = () => {
    this.setState({ setIsModalVisible: false });
    var d = new Date();
    var end = d.getTime();
    console.log(end);
    let totaltime = end - this.state.start;
    console.log("total", totaltime / 1000);

    axios({
      method: "POST",
      url: "http://" + config.baseURL + ":4000/newDrowsiness", // change
      headers: {},
      data: {
        username: "local username mock",
        response: totaltime / 1000,
      },
    })
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  handleCancel() {
    this.setState({ setIsModalVisible: false });
  }

  response() {
    // const socket = socketIOClient("http://" + config.baseURL + ":4000");
    this.socket.on("alert_sound", (message) => {
      console.log("message", message);
      // if (message == "request to alert") {
      console.log("pop up");
      this.showModal();
    });
    this.socket.on("eyeNotFound", (message) => {
      console.log(message);
      this.warning("This system can't detect eye");
    });
    // const socket2 = socketIOClient("http://"+config.ddsURL+":4000");
    // socket2.on("eyes_not_found", (message) => {
    //    console.log(message);
    //    this.warning("This system can't detect eye");
    // });
  }

  componentDidMount() {
    this.uploadcurrentlo();
    this.response();
  }

  uploadcurrentlo() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        //   localStorage.setItem("currentLat", Number(position.coords.latitude));
        //   localStorage.setItem("currentLng", Number(position.coords.longitude));
        console.log(Number(position.coords.latitude));

        let response = {
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        };
        console.log(this.state.currentLat);

        this.socket.emit("position", response);

        this.setState({
          currentLat: Number(position.coords.latitude),
          currentLng: Number(position.coords.longitude),
        });
      }.bind(this)
    );
    // const Socket = socketIOClient("http://" + config.baseURL + ":4000");
  }

  // componentDidUpdate() {
  //   setInterval(() => {
  //     console.log("didup");
  //     this.uploadcurrentlo();
  //   }, 30000);
  // }
}

export default App;
