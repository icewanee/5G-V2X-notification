import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Layout, Menu } from "antd";
import { Row, Col } from "antd";
import red from "../pictureNvideo/redd.png";

import "../App.css";
import history from "../history";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Header, Footer, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    return (
      <div
        style={{
          height: "100vh",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          backgroundColor: "#c6d5ad",
        }}
      >
        <Layout>
          <Header>
            <h2 style={{ color: "white" }}>Welcome to 5G-V2X (add username)</h2>
          </Header>
          <Layout
            className="site-layout-background"
            // style={{ padding: "24px 0" }}
          >
            <Content
              style={{
                height: "100vh",
                backgroundColor: "#c6d5ad",
              }}
            >
              <Row>
                <Col
                  span={12}
                  style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      height: "80vh",
                      width: "30vw",
                    }}
                  >
                    Default Button
                  </Button>
                </Col>
                <Col
                  span={12}
                  style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      height: "80vh",
                      width: "30vw",
                    }}
                  >
                    Default Button
                  </Button>
                </Col>
              </Row>
            </Content>
            <Sider
              className="site-layout-background"
              width={200}
              style={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="2">SOS</Menu.Item>
                <Menu.Item key="4">Logout</Menu.Item>
                <Footer>Footer</Footer>
              </Menu>
            </Sider>
          </Layout>

          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}
export default Home;