import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import './AppLayout.scss';

const { Footer, Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className='app-layout'>
      <Header />
      <Content className='app-content'>{children}</Content>
      <Footer className='app-footer'>Made with Love 💙 @socool </Footer>
    </Layout>
  );
};

export default AppLayout;
