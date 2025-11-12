'use client';

import { Layout, Input, Badge, Button } from 'antd';
import { BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;

export function Header() {
  return (
    <AntHeader style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ flex: 1, maxWidth: 600 }}>
        <Search
          placeholder="ジョブを検索..."
          allowClear
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge count={5} size="small">
          <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
        </Badge>
        <Button type="text" icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />} />
      </div>
    </AntHeader>
  );
}
