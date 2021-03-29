import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Sidebar from './sidebar';
//import { isMobile } from 'react-device-detect';
import { Drawer, Button, Radio, Space } from 'antd';
import { useMediaQuery } from 'react-responsive';

const Dashboard_Content = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return (
    <Row>
      <Col xs={24} xl={23} lg={23} md={23}>
        <div style={{ marginTop: 30, marginLeft: 30 }}>{children}</div>
      </Col>
    </Row>
  );
};

export default Dashboard_Content;
