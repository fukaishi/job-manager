'use client';

import { Card, Button, Typography, Row, Col, Table, Checkbox, Input, Space, Statistic } from 'antd';
import { TeamOutlined, FileTextOutlined } from '@ant-design/icons';
import { mockTeams } from '@/lib/mock-data';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0]);

  const memberColumns = [
    {
      title: '名前',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '権限',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'アクション',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" size="small">
            編集
          </Button>
          <Button type="link" size="small" danger>
            削除
          </Button>
        </Space>
      ),
    },
  ];

  const memberData = [
    { key: '1', name: '山田太郎', email: 'yamada@example.com', role: 'エンジニア' },
    { key: '2', name: '佐藤花子', email: 'sato@example.com', role: 'エンジニア' },
    { key: '3', name: '鈴木一郎', email: 'suzuki@example.com', role: '管理者' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            チーム管理
          </Title>
          <Text type="secondary">チームとメンバーを管理</Text>
        </div>
        <Button type="primary">+ 新規チーム</Button>
      </div>

      <Row gutter={24}>
        {/* チーム一覧 */}
        <Col xs={24} lg={8}>
          <Card title="チーム一覧">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {mockTeams.map((team) => (
                <Card
                  key={team.id}
                  hoverable
                  onClick={() => setSelectedTeam(team)}
                  style={{
                    cursor: 'pointer',
                    borderColor: selectedTeam.id === team.id ? '#1890ff' : '#d9d9d9',
                    borderWidth: selectedTeam.id === team.id ? 2 : 1,
                    backgroundColor: selectedTeam.id === team.id ? '#e6f7ff' : 'white',
                  }}
                >
                  <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                    {team.name}
                  </Title>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">
                      <TeamOutlined /> {team.memberCount}人
                    </Text>
                    <Text type="secondary">
                      <FileTextOutlined /> {team.jobCount}ジョブ
                    </Text>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>

        {/* チーム詳細 */}
        <Col xs={24} lg={16}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <Title level={3} style={{ margin: 0 }}>
                    {selectedTeam.name}
                  </Title>
                  <Text type="secondary">チームID: {selectedTeam.id}</Text>
                </div>
                <Space>
                  <Button>編集</Button>
                  <Button danger>削除</Button>
                </Space>
              </div>

              <Row gutter={16} style={{ marginTop: '24px' }}>
                <Col xs={24} sm={8}>
                  <Card style={{ backgroundColor: '#e6f7ff', borderColor: '#1890ff' }}>
                    <Statistic title="メンバー数" value={selectedTeam.memberCount} valueStyle={{ color: '#1890ff' }} />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card style={{ backgroundColor: '#f6ffed', borderColor: '#52c41a' }}>
                    <Statistic title="管理ジョブ数" value={selectedTeam.jobCount} valueStyle={{ color: '#52c41a' }} />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card style={{ backgroundColor: '#f9f0ff', borderColor: '#722ed1' }}>
                    <Statistic title="実行中" value={2} valueStyle={{ color: '#722ed1' }} />
                  </Card>
                </Col>
              </Row>
            </Card>

            <Card
              title="メンバー一覧"
              extra={
                <Button type="primary" size="small">
                  + メンバー追加
                </Button>
              }
            >
              <Table columns={memberColumns} dataSource={memberData} pagination={false} />
            </Card>

            <Card title="権限設定">
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Title level={5}>エンジニア</Title>
                  <Space direction="vertical" style={{ paddingLeft: '16px' }}>
                    <Checkbox defaultChecked>ジョブの作成・編集・削除</Checkbox>
                    <Checkbox defaultChecked>ジョブの実行</Checkbox>
                    <Checkbox defaultChecked>ログの閲覧</Checkbox>
                  </Space>
                </div>

                <div>
                  <Title level={5}>営業</Title>
                  <Space direction="vertical" style={{ paddingLeft: '16px' }}>
                    <Checkbox>ジョブの作成・編集・削除</Checkbox>
                    <Checkbox defaultChecked>ジョブの実行</Checkbox>
                    <Checkbox defaultChecked>ログの閲覧</Checkbox>
                  </Space>
                </div>
              </Space>
            </Card>

            <Card title="通知設定">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    Slackチャンネル
                  </Text>
                  <Input defaultValue="#dev-alerts" />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    メール通知先
                  </Text>
                  <Input type="email" defaultValue="dev-team@example.com" />
                </div>
                <Space>
                  <Checkbox defaultChecked>ジョブ失敗時に通知</Checkbox>
                  <Checkbox>ジョブ成功時に通知</Checkbox>
                </Space>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
