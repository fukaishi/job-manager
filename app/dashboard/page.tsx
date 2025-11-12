'use client';

import { Card, Row, Col, Statistic, Alert, Typography, Tag, Progress, Button, Space } from 'antd';
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PercentageOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { mockJobs, mockExecutionHistory } from '@/lib/mock-data';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

export default function DashboardPage() {
  const runningJobs = mockJobs.filter(j => j.lastExecutionStatus === 'running').length;
  const todaySuccess = mockExecutionHistory.filter(h => h.status === 'success').length;
  const todayFailed = mockExecutionHistory.filter(h => h.status === 'failed').length;
  const errorRate = todayFailed / (todaySuccess + todayFailed) * 100;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 8 }}>ダッシュボード</Title>
        <Text type="secondary">ジョブ管理システムの概要</Text>
      </div>

      {/* KPIカード */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="実行中ジョブ"
              value={runningJobs}
              prefix={<SyncOutlined spin />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="本日の成功"
              value={todaySuccess}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="本日の失敗"
              value={todayFailed}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="エラー率"
              value={errorRate.toFixed(1)}
              suffix="%"
              prefix={<PercentageOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* アラート・通知 */}
        <Col xs={24} lg={24}>
          <Card title="アラート・通知" size="small">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Alert
                message="実行失敗"
                description="バックアップジョブが失敗しました · 2時間前"
                type="error"
                showIcon
              />
              <Alert
                message="長時間実行中"
                description="通知送信が予想より長く実行されています · 30分前"
                type="warning"
                showIcon
              />
              <Alert
                message="スケジュール更新"
                description="レポート生成のスケジュールが変更されました · 1日前"
                type="info"
                showIcon
              />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* よく使うジョブ */}
      <Card
        title="よく使うジョブ"
        extra={<Link href="/jobs"><Button type="link">すべて表示</Button></Link>}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          {mockJobs.slice(0, 6).map((job) => (
            <Col xs={24} md={12} lg={8} key={job.id}>
              <Card
                size="small"
                hoverable
                style={{ height: '100%' }}
                extra={
                  <Tag color={job.lastExecutionStatus === 'success' ? 'success' : job.lastExecutionStatus === 'failed' ? 'error' : 'processing'}>
                    {job.lastExecutionStatus === 'success' ? '成功' : job.lastExecutionStatus === 'failed' ? '失敗' : '実行中'}
                  </Tag>
                }
              >
                <div style={{ marginBottom: 12 }}>
                  <Title level={5} style={{ marginBottom: 4 }}>{job.name}</Title>
                  <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginBottom: 0 }}>
                    {job.description}
                  </Paragraph>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>{job.team}</Text>
                  <Link href={`/jobs/${job.id}`}>
                    <Button type="primary" size="small" icon={<PlayCircleOutlined />}>実行</Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* チーム別実行数と次回実行予定 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="チーム別実行数" extra={<Text type="secondary">本日の実行数</Text>}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>開発チーム</Text>
                  <Text strong>24</Text>
                </div>
                <Progress percent={80} strokeColor="#1890ff" />
              </div>
              <div>
                <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>営業チーム</Text>
                  <Text strong>18</Text>
                </div>
                <Progress percent={60} strokeColor="#52c41a" />
              </div>
              <div>
                <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>インフラチーム</Text>
                  <Text strong>12</Text>
                </div>
                <Progress percent={40} strokeColor="#722ed1" />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="次回実行予定" extra={<Text type="secondary">今後24時間以内</Text>}>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              {mockJobs.slice(0, 5).map((job) => (
                <div key={job.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{job.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{job.team}</Text>
                  </div>
                  <Text type="secondary">{job.nextExecutionTime}</Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
