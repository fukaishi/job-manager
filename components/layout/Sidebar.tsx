'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  HistoryOutlined,
  SyncOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title, Text } = Typography;

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: <DashboardOutlined /> },
  { name: 'ジョブ一覧', href: '/jobs', icon: <UnorderedListOutlined /> },
  { name: '本日実行予定', href: '/today', icon: <ClockCircleOutlined /> },
  { name: '実行履歴', href: '/history', icon: <HistoryOutlined /> },
  { name: '実行中ジョブ', href: '/monitoring', icon: <SyncOutlined /> },
  { name: 'スケジュール', href: '/schedule', icon: <CalendarOutlined /> },
  { name: 'チーム管理', href: '/teams', icon: <TeamOutlined /> },
  { name: '設定', href: '/settings', icon: <SettingOutlined /> },
];

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = navigation.map((item) => ({
    key: item.href,
    icon: item.icon,
    label: <Link href={item.href}>{item.name}</Link>,
  }));

  const selectedKey = navigation.find(item =>
    pathname === item.href || pathname.startsWith(item.href + '/')
  )?.href || '/dashboard';

  return (
    <Sider
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#fff',
      }}
    >
      <div style={{ padding: '24px 16px', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={4} style={{ margin: 0, background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          ジョブ管理ツール
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>Job Management System</Text>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{ borderRight: 0, marginTop: 8 }}
      />

      <div style={{ position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #f0f0f0', padding: 16, background: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size={40} style={{ background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)' }}>
            山
          </Avatar>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>山田太郎</div>
            <Text type="secondary" style={{ fontSize: 12 }}>エンジニア</Text>
          </div>
        </div>
      </div>
    </Sider>
  );
}
