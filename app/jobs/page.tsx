'use client';

import { Card, Table, Tag, Button, Space, Input, Select, Typography, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, PlayCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { mockJobs, type Job } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Search } = Input;

export default function JobsPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = mockJobs.filter((job) => {
    if (filterTeam !== 'all' && job.team !== filterTeam) return false;
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (searchQuery && !job.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const teams = Array.from(new Set(mockJobs.map((job) => job.team)));

  const statusColorMap = {
    success: 'success',
    failed: 'error',
    running: 'processing',
    pending: 'default',
  } as const;

  const columns = [
    {
      title: 'ジョブ名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Job) => (
        <Link href={`/jobs/${record.id}`}>
          <Text strong style={{ color: '#1890ff' }}>{text}</Text>
        </Link>
      ),
    },
    {
      title: '説明',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'チーム',
      dataIndex: 'team',
      key: 'team',
      render: (team: string) => <Tag>{team}</Tag>,
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'enabled' ? 'success' : 'default'}>
          {status === 'enabled' ? '有効' : '無効'}
        </Tag>
      ),
    },
    {
      title: '最終実行',
      dataIndex: 'lastExecutionStatus',
      key: 'lastExecutionStatus',
      render: (status: keyof typeof statusColorMap) => (
        <Tag color={statusColorMap[status]}>
          {status === 'success' ? '成功' : status === 'failed' ? '失敗' : status === 'running' ? '実行中' : '待機中'}
        </Tag>
      ),
    },
    {
      title: '最終実行時刻',
      dataIndex: 'lastExecutionTime',
      key: 'lastExecutionTime',
    },
    {
      title: '次回実行時刻',
      dataIndex: 'nextExecutionTime',
      key: 'nextExecutionTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Job) => (
        <Space size="small">
          <Link href={`/jobs/${record.id}`}>
            <Button type="link" size="small" icon={<PlayCircleOutlined />}>実行</Button>
          </Link>
          <Link href={`/jobs/${record.id}/edit`}>
            <Button type="link" size="small" icon={<EditOutlined />}>編集</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 8 }}>ジョブ一覧</Title>
          <Text type="secondary">すべてのジョブを管理</Text>
        </Col>
        <Col>
          <Link href="/jobs/new">
            <Button type="primary" icon={<PlusOutlined />}>新規登録</Button>
          </Link>
        </Col>
      </Row>

      {/* フィルタ・検索バー */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Search
              placeholder="ジョブ名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={12} md={6}>
            <Select
              value={filterTeam}
              onChange={setFilterTeam}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'すべてのチーム' },
                ...teams.map(team => ({ value: team, label: team }))
              ]}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'すべてのステータス' },
                { value: 'enabled', label: '有効' },
                { value: 'disabled', label: '無効' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* 一括操作バー */}
      {selectedRowKeys.length > 0 && (
        <Card style={{ marginBottom: 16, background: '#e6f7ff', borderColor: '#91d5ff' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>{selectedRowKeys.length} 件選択中</Text>
            </Col>
            <Col>
              <Space>
                <Button size="small">有効化</Button>
                <Button size="small">無効化</Button>
                <Button size="small" danger icon={<DeleteOutlined />}>削除</Button>
              </Space>
            </Col>
          </Row>
        </Card>
      )}

      {/* ジョブテーブル */}
      <Card>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredJobs}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `全 ${total} 件`,
          }}
        />
      </Card>
    </div>
  );
}
