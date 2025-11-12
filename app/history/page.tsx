'use client';

import { Card, Table, Tag, Button, Select, DatePicker, Input, Space, Typography } from 'antd';
import { mockExecutionHistory } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function HistoryPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');

  const filteredHistory = mockExecutionHistory.filter((history) => {
    if (filterStatus !== 'all' && history.status !== filterStatus) return false;
    if (filterTeam !== 'all' && history.team !== filterTeam) return false;
    return true;
  });

  const teams = Array.from(new Set(mockExecutionHistory.map((h) => h.team)));

  const columns = [
    {
      title: '実行ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
    },
    {
      title: 'ジョブ名',
      dataIndex: 'jobName',
      key: 'jobName',
      render: (text: string, record: any) => (
        <Link href={`/jobs/${record.jobId}`} style={{ color: '#1890ff', fontWeight: 500 }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'チーム',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Conf',
      dataIndex: 'conf',
      key: 'conf',
      render: (text: string) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{text}</span>,
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
          cancelled: 'default',
        };
        const textMap: Record<string, string> = {
          success: '成功',
          failed: '失敗',
          running: '実行中',
          cancelled: 'キャンセル',
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
        <Space>
          <Link href={`/logs/${record.id}`}>
            <Button type="link" size="small">
              ログ
            </Button>
          </Link>
          <Button type="link" size="small">
            再実行
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>
          実行履歴
        </Title>
        <Text type="secondary">全ジョブの実行履歴を確認</Text>
      </div>

      {/* フィルタ */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
              期間
            </Text>
            <DatePicker style={{ width: '100%' }} />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
              チーム
            </Text>
            <Select
              value={filterTeam}
              onChange={setFilterTeam}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'すべてのチーム' },
                ...teams.map((team) => ({ value: team, label: team })),
              ]}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
              ステータス
            </Text>
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'すべて' },
                { value: 'success', label: '成功' },
                { value: 'failed', label: '失敗' },
                { value: 'running', label: '実行中' },
                { value: 'cancelled', label: 'キャンセル' },
              ]}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
              ジョブ名
            </Text>
            <Input.Search placeholder="検索..." />
          </div>
        </div>
      </Card>

      {/* 履歴テーブル */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredHistory}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `全${total}件の実行履歴`,
          }}
        />
      </Card>
    </div>
  );
}
