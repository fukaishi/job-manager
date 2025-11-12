'use client';

import { Card, Tag, Button, Typography, Tabs, Checkbox, Table, Space, Row, Col, Progress } from 'antd';
import { Job, mockExecutionHistory } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

const { Title, Text } = Typography;

export function JobDetailClient({ job }: { job: Job }) {
  const [activeTab, setActiveTab] = useState('basic');
  const jobHistory = mockExecutionHistory.filter((h) => h.jobId === job.id);

  const historyColumns = [
    {
      title: '実行ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
    },
    {
      title: '開始時刻',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '終了時刻',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => text || '-',
    },
    {
      title: '実行時間',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) =>
        duration > 0 ? `${Math.floor(duration / 60)}分${duration % 60}秒` : '-',
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          success: 'success',
          failed: 'error',
          running: 'processing',
        };
        const textMap: Record<string, string> = {
          success: '成功',
          failed: '失敗',
          running: '実行中',
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      },
    },
    {
      title: '実行者',
      dataIndex: 'executor',
      key: 'executor',
    },
    {
      title: 'アクション',
      key: 'action',
      render: (_: any, record: any) => (
        <Link href={`/logs/${record.id}`}>
          <Button type="link" size="small">
            ログ
          </Button>
        </Link>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'basic',
      label: '基本情報',
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="実行設定">
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    実行タイプ
                  </Text>
                  <Text strong>{job.executionType === 'python' ? 'Python' : 'Shell'}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    スクリプトパス
                  </Text>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      backgroundColor: '#f5f5f5',
                      padding: '8px',
                      borderRadius: '4px',
                      marginTop: '4px',
                    }}
                  >
                    {job.scriptPath}
                  </div>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    作業ディレクトリ
                  </Text>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      backgroundColor: '#f5f5f5',
                      padding: '8px',
                      borderRadius: '4px',
                      marginTop: '4px',
                    }}
                  >
                    /var/jobs
                  </div>
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text type="secondary" style={{ display: 'block' }}>
                      タイムアウト
                    </Text>
                    <Text strong>{job.timeout}分</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary" style={{ display: 'block' }}>
                      リトライ回数
                    </Text>
                    <Text strong>{job.retryCount}回</Text>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="環境変数">
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                {[
                  { key: 'DB_HOST', value: 'localhost' },
                  { key: 'DB_PORT', value: '5432' },
                  { key: 'LOG_LEVEL', value: 'INFO' },
                ].map((env) => (
                  <div
                    key={env.key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{env.key}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 600 }}>{env.value}</span>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="通知設定">
              <Space direction="vertical">
                <Checkbox checked disabled>
                  失敗時にメール通知
                </Checkbox>
                <Checkbox checked disabled>
                  失敗時にSlack通知
                </Checkbox>
                <div style={{ marginTop: '16px' }}>
                  <Text type="secondary" style={{ display: 'block' }}>
                    通知先
                  </Text>
                  <Text>dev-team@example.com</Text>
                  <br />
                  <Text>#alerts</Text>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'schedule',
      label: 'スケジュール',
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="スケジュール設定">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    Cron式
                  </Text>
                  <div
                    style={{
                      fontSize: '18px',
                      fontFamily: 'monospace',
                      padding: '12px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      marginTop: '8px',
                    }}
                  >
                    {job.schedule}
                  </div>
                  <Text type="secondary" style={{ fontSize: '14px', display: 'block', marginTop: '8px' }}>
                    毎日午前2時に実行
                  </Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    有効期間
                  </Text>
                  <Text>開始: 2025-01-01</Text>
                  <br />
                  <Text>終了: 未設定</Text>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="次回実行予定" extra={<Text type="secondary">今後5回分</Text>}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {[1, 2, 3, 4, 5].map((day) => (
                  <div
                    key={day}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: day < 5 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <Text type="secondary">第{day}回</Text>
                    <Text>2025-11-{12 + day} 02:00:00</Text>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'dependencies',
      label: '依存関係',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="先行ジョブ" extra={<Text type="secondary">このジョブの前に実行</Text>}>
                <Card hoverable style={{ borderRadius: '8px' }}>
                  <Text strong style={{ display: 'block' }}>
                    データ取得ジョブ
                  </Text>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    開発チーム
                  </Text>
                </Card>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="後続ジョブ" extra={<Text type="secondary">このジョブの後に実行</Text>}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Card hoverable style={{ borderRadius: '8px' }}>
                    <Text strong style={{ display: 'block' }}>
                      レポート生成
                    </Text>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      営業チーム
                    </Text>
                  </Card>
                  <Card hoverable style={{ borderRadius: '8px' }}>
                    <Text strong style={{ display: 'block' }}>
                      通知送信
                    </Text>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      営業チーム
                    </Text>
                  </Card>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="DAG図" extra={<Text type="secondary">依存関係の可視化</Text>}>
            <div
              style={{
                padding: '32px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Text type="secondary">依存関係のビジュアル図がここに表示されます</Text>
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#e6f7ff',
                    color: '#1890ff',
                    borderRadius: '4px',
                  }}
                >
                  データ取得
                </div>
                <span style={{ fontSize: '24px' }}>→</span>
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f6ffed',
                    color: '#52c41a',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  {job.name}
                </div>
                <span style={{ fontSize: '24px' }}>→</span>
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f9f0ff',
                    color: '#722ed1',
                    borderRadius: '4px',
                  }}
                >
                  レポート生成
                </div>
              </div>
            </div>
          </Card>
        </Space>
      ),
    },
    {
      key: 'history',
      label: '実行履歴',
      children: (
        <Card title="実行履歴" extra={<Text type="secondary">直近100件</Text>}>
          <Table columns={historyColumns} dataSource={jobHistory} rowKey="id" pagination={{ pageSize: 10 }} />
        </Card>
      ),
    },
    {
      key: 'stats',
      label: '統計',
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="成功率">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {[
                  { label: '過去7日', value: 95.2 },
                  { label: '過去30日', value: 93.8 },
                  { label: '全期間', value: 94.5 },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <Text type="secondary">{item.label}</Text>
                      <Text strong style={{ fontSize: '18px', color: '#52c41a' }}>
                        {item.value}%
                      </Text>
                    </div>
                    <Progress percent={item.value} strokeColor="#52c41a" showInfo={false} />
                  </div>
                ))}
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="実行時間">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    平均実行時間
                  </Text>
                  <Title level={3} style={{ margin: 0 }}>
                    15分23秒
                  </Title>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    最長実行時間
                  </Text>
                  <Text strong style={{ fontSize: '18px' }}>
                    28分45秒
                  </Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    最短実行時間
                  </Text>
                  <Text strong style={{ fontSize: '18px' }}>
                    12分10秒
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="実行回数">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    過去7日
                  </Text>
                  <Title level={3} style={{ margin: 0 }}>
                    7回
                  </Title>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    過去30日
                  </Text>
                  <Text strong style={{ fontSize: '18px' }}>
                    30回
                  </Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    全期間
                  </Text>
                  <Text strong style={{ fontSize: '18px' }}>
                    365回
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* ヘッダー部 */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '12px' }}>
              <Title level={2} style={{ margin: 0 }}>
                {job.name}
              </Title>
              <Tag color={job.status === 'enabled' ? 'success' : 'default'}>
                {job.status === 'enabled' ? '有効' : '無効'}
              </Tag>
              <Tag
                color={
                  job.lastExecutionStatus === 'success'
                    ? 'success'
                    : job.lastExecutionStatus === 'failed'
                    ? 'error'
                    : 'processing'
                }
              >
                {job.lastExecutionStatus === 'success'
                  ? '成功'
                  : job.lastExecutionStatus === 'failed'
                  ? '失敗'
                  : '実行中'}
              </Tag>
            </div>
            <Text type="secondary" style={{ display: 'block', marginBottom: '12px' }}>
              {job.description}
            </Text>
            <Space>
              <Text type="secondary">
                <span style={{ marginRight: '4px' }}>👥</span>
                {job.team}
              </Text>
              {job.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
          <Space>
            <Button type="primary">今すぐ実行</Button>
            <Link href={`/jobs/${job.id}/edit`}>
              <Button>編集</Button>
            </Link>
            <Button>複製</Button>
            <Button danger>削除</Button>
          </Space>
        </div>
      </Card>

      {/* タブナビゲーション */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </div>
  );
}
