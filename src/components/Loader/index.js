import React from 'react';
import { Spin } from 'antd';

import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => {
  return (
    <Container>
      <Spin></Spin>
    </Container>
  );
};
