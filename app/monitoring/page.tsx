'use client';

import { Card, Tag, Button, Select, Row, Col, Progress, Typography, Space, Statistic } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { mockJobs } from '@/lib/mock-data';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export default function MonitoringPage() {
  const runningJobs = mockJobs.filter((j) => j.lastExecutionStatus === 'running');
  const [updateInterval, setUpdateInterval] = useState('10');

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            実行中ジョブ監視
          </Title>
          <Text type="secondary">リアルタイムでジョブを監視</Text>
        </div>
        <Space>
          <Text>自動更新間隔:</Text>
          <Select
            value={updateInterval}
            onChange={setUpdateInterval}
            style={{ width: 120 }}
            options={[
              { value: '5', label: '5秒' },
              { value: '10', label: '10秒' },
              { value: '30', label: '30秒' },
              { value: 'manual', label: '手動' },
            ]}
          />
          <Button icon={<ReloadOutlined />}>更新</Button>
        </Space>
      </div>

      {/* 実行中ジョブカード */}
      <Row gutter={[24, 24]}>
        {runningJobs.map((job) => (
          <Col xs={24} lg={12} key={job.id}>
            <Card style={{ borderLeft: '4px solid #1890ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {job.name}
                  </Title>
                  <Space direction="vertical" size={0}>
                    <Text type="secondary">{job.team}</Text>
                    <Text type="secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>{job.conf}</Text>
                  </Space>
                </div>
                <Tag color="processing">実行中</Tag>
              </div>

              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text type="secondary">開始時刻</Text>
                    <Text strong>{job.lastExecutionTime}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">経過時間</Text>
                    <Text strong>5分23秒</Text>
                  </div>
                </div>

                {/* プログレスバー */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text type="secondary">進捗状況</Text>
                    <Text>34%</Text>
                  </div>
                  <Progress percent={34} status="active" />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    予想残り時間: 10分
                  </Text>
                </div>

                {/* リソース使用状況 */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Card size="small" style={{ backgroundColor: '#f5f5f5' }}>
                      <Statistic title="CPU使用率" value={45} suffix="%" valueStyle={{ fontSize: '24px' }} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small" style={{ backgroundColor: '#f5f5f5' }}>
                      <Statistic title="メモリ使用" value="2.1GB" valueStyle={{ fontSize: '24px' }} />
                    </Card>
                  </Col>
                </Row>

                {/* ライブログ */}
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    最新ログ
                  </Text>
                  <div
                    style={{
                      backgroundColor: '#1f1f1f',
                      color: '#52c41a',
                      padding: '12px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <div>[14:05:23] Processing record 5,234...</div>
                    <div>[14:05:24] Processing record 5,235...</div>
                    <div>[14:05:25] Processing record 5,236...</div>
                  </div>
                </div>

                {/* アクションボタン */}
                <Space style={{ width: '100%' }}>
                  <Button type="default" style={{ flex: 1 }}>
                    ライブログ表示
                  </Button>
                  <Button danger style={{ flex: 1 }}>
                    キャンセル
                  </Button>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}

        {runningJobs.length === 0 && (
          <Col span={24}>
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Text type="secondary" style={{ fontSize: '18px' }}>
                現在実行中のジョブはありません
              </Text>
            </div>
          </Col>
        )}
      </Row>

      {/* 待機中ジョブ */}
      <Card title="待機中ジョブ" style={{ marginTop: '24px' }}>
        <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
          依存関係またはリソース制限により待機中
        </Text>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Card size="small" style={{ borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <Text strong>データクリーニング</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  開発チーム • 依存ジョブ待機中
                </Text>
              </div>
              <Tag>待機中</Tag>
            </div>
          </Card>
          <Card size="small" style={{ borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <Text strong>レポート生成</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  営業チーム • リソース制限
                </Text>
              </div>
              <Tag>待機中</Tag>
            </div>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
