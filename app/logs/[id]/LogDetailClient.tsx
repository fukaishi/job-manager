'use client';

import { Card, Tag, Button, Typography, Input, Tabs, Space, Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ExecutionHistory, mockExecutionHistory, mockLogs } from '@/lib/mock-data';
import { useState } from 'react';

const { Title, Text } = Typography;

export function LogDetailClient({ execution }: { execution: ExecutionHistory }) {
  const [activeTab, setActiveTab] = useState('stdout');
  const [searchQuery, setSearchQuery] = useState('');

  const tabItems = [
    {
      key: 'stdout',
      label: '標準出力',
      children: (
        <div
          style={{
            backgroundColor: '#1f1f1f',
            color: '#52c41a',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <pre style={{ margin: 0 }}>{mockLogs}</pre>
        </div>
      ),
    },
    {
      key: 'stderr',
      label: '標準エラー出力',
      children: (
        <div
          style={{
            backgroundColor: '#1f1f1f',
            color: '#ff4d4f',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <pre style={{ margin: 0 }}>エラー出力はありません</pre>
        </div>
      ),
    },
    {
      key: 'system',
      label: 'システムログ',
      children: (
        <div
          style={{
            backgroundColor: '#1f1f1f',
            color: '#d9d9d9',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <pre style={{ margin: 0 }}>{`[2025-11-12 02:00:00] SYSTEM: Job execution started
[2025-11-12 02:00:00] SYSTEM: Environment loaded
[2025-11-12 02:00:00] SYSTEM: Starting process
[2025-11-12 02:15:23] SYSTEM: Process completed with exit code 0`}</pre>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* ヘッダー情報 */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ display: 'block', fontSize: '14px' }}>
              実行ID
            </Text>
            <Text strong style={{ fontSize: '18px', fontFamily: 'monospace' }}>
              {execution.id}
            </Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ display: 'block', fontSize: '14px' }}>
              ジョブ名
            </Text>
            <Text strong style={{ fontSize: '18px' }}>
              {execution.jobName}
            </Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ display: 'block', fontSize: '14px' }}>
              実行時間
            </Text>
            <Text strong style={{ fontSize: '18px' }}>
              {execution.duration > 0
                ? `${Math.floor(execution.duration / 60)}分${execution.duration % 60}秒`
                : '-'}
            </Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>
              ステータス
            </Text>
            <Tag
              color={
                execution.status === 'success'
                  ? 'success'
                  : execution.status === 'failed'
                  ? 'error'
                  : 'processing'
              }
            >
              {execution.status === 'success' ? '成功' : execution.status === 'failed' ? '失敗' : '実行中'}
            </Tag>
          </Col>
        </Row>
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Text type="secondary" style={{ display: 'block', fontSize: '14px' }}>
                開始時刻
              </Text>
              <Text>{execution.startTime}</Text>
            </Col>
            <Col xs={24} sm={8}>
              <Text type="secondary" style={{ display: 'block', fontSize: '14px' }}>
                終了時刻
              </Text>
              <Text>{execution.endTime || '-'}</Text>
            </Col>
            <Col xs={24} sm={8}>
              <Text type="secondary" style={{ display: 'block', fontSize: '14px' }}>
                実行者
              </Text>
              <Text>{execution.executor}</Text>
            </Col>
          </Row>
        </div>
      </Card>

      {/* 検索バー */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Input.Search
          placeholder="ログを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button icon={<DownloadOutlined />}>ダウンロード</Button>
      </div>

      {/* ログ表示エリア */}
      <Card style={{ marginBottom: '24px' }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>

      {/* 関連情報 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="同じジョブの直近実行">
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              {mockExecutionHistory.slice(0, 3).map((history) => (
                <div
                  key={history.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <Text strong style={{ fontFamily: 'monospace', display: 'block' }}>
                      {history.id}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {history.startTime}
                    </Text>
                  </div>
                  <Tag
                    color={
                      history.status === 'success'
                        ? 'success'
                        : history.status === 'failed'
                        ? 'error'
                        : 'processing'
                    }
                  >
                    {history.status === 'success' ? '成功' : history.status === 'failed' ? '失敗' : '実行中'}
                  </Tag>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="関連ジョブの実行状況">
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <div
                style={{
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong style={{ display: 'block' }}>
                    データ取得ジョブ
                  </Text>
                  <Tag color="success">完了</Tag>
                </div>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                  先行ジョブ
                </Text>
              </div>
              <div
                style={{
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong style={{ display: 'block' }}>
                    レポート生成
                  </Text>
                  <Tag color="processing">待機中</Tag>
                </div>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                  後続ジョブ
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
