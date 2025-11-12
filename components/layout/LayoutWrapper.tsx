'use client';

import { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Layout } from 'antd';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const { Content } = Layout;

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
            fontSize: 14,
          },
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5', overflow: 'auto' }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </AntdRegistry>
  );
}
