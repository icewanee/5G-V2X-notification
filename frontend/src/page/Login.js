import React, { Component } from "react";

export default function Home() {
  return (
    <div
      className="Card "
      style={{
        paddingTop: 85,
        paddingBottom: 85,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0da8db",
      }}
    >
      <div
        className="Card "
        style={{
          paddingTop: 40,
          backgroundColor: "#55cbf2",
          borderRadius: 30,
          paddingBottom: 40,
        }}
      >
        <div className="row">
          <div className="col-md-7 ">
            <h1
              className="card-title"
              style={{
                fontFamily: "Courier New",
                fontSize: 45,
                fontWeight: "bold",
                paddingLeft: 30,
              }}
            >
              Logo here
            </h1>
          </div>
          <div className="col-md-5 "></div>
        </div>
        <br />
        <div className="Card box" style={{ width: "87vw", height: "60vh" }}>
          <br />
          <form className="needs-validation" noValidate>
            <div className="row">
              <div
                className="col-md-12 "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  className="card-title"
                  style={{
                    fontFamily: "Courier New",
                    fontSize: 45,
                    fontWeight: "bold",
                  }}
                >
                  Login
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <label
                  className="text"
                  style={{ fontFamily: "Courier New", fontSize: 30 }}
                >
                  Username
                  <br />
                  <input
                    type="text"
                    id="userName"
                    className="field"
                    style={{ width: 600, height: 50, borderRadius: 20 }}
                    /*onChange={(e) => {
                    this.setState({ userName: e.target.value });
                  }}*/
                    required
                  />
                </label>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <label
                  className="text"
                  style={{ fontFamily: "Courier New", fontSize: 30 }}
                >
                  password
                  <br />
                  <input
                    type="password"
                    id="password"
                    className="field"
                    style={{ width: 600, height: 50, borderRadius: 20 }}
                    /*onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}*/
                    required
                  />
                </label>
              </div>
              <div className="col-md-2"></div>
            </div>
            <br />
            <div className="row">
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  type="submit"
                  id="submit"
                  className="btn"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 50,
                    fontSize: 20,
                    backgroundColor: "#078ab5",
                    border: " solid white",
                    color: "white",
                  }}
                  /*onClick={() => this.onClick("/")}*/
                >
                  Sign in
                </button>
              </div>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}