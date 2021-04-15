import React, { useState } from "react";
import { Row, Col } from "antd";
import Sidebar from "./sidebar";
//import { isMobile } from 'react-device-detect';
import { Drawer, Button, Radio, Space } from "antd";
import { useMediaQuery } from "react-responsive";

const Dashboard_Content = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <Row>
      <Col xs={24} xl={23} lg={23} md={24} style={{}}>
        <div
          style={{
            marginTop: 50,
            padding: "30px 30px",
            border: "none",
            boxShadow: "2px 2px 15px 2px #eee,-2px -2px 15px 2px #eee",
            background: "#fff",
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard_Content;
