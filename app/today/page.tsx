'use client';

import { Card, Table, Tag, Button, Space, Typography, Row, Col, Popconfirm } from 'antd';
import {
  FileTextOutlined,
  ReloadOutlined,
  StopOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { mockTodayScheduledJobs, type TodayScheduledJob } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function TodaySchedulePage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // ステータスの表示とカラーマッピング
  const getStatusConfig = (status: TodayScheduledJob['status']) => {
    const configs = {
      scheduled: { text: '実行前', color: 'default' },
      running_normal: { text: '実行中（通常通り）', color: 'processing' },
      running_delayed: { text: '実行中（遅延）', color: 'warning' },
      waiting_normal: { text: '実行待ち（通常通り）', color: 'cyan' },
      waiting_delayed: { text: '実行待ち（遅延）', color: 'orange' },
      completed_success: { text: '正常終了', color: 'success' },
      completed_error: { text: 'エラー終了', color: 'error' },
    };
    return configs[status] || { text: status, color: 'default' };
  };

  // 実行時間の計算
  const getDuration = (job: TodayScheduledJob) => {
    if (job.duration) {
      const minutes = Math.floor(job.duration / 60);
      const seconds = job.duration % 60;
      return `${minutes}分${seconds}秒`;
    }
    if (job.actualStartTime && !job.endTime) {
      return '実行中...';
    }
    return '-';
  };

  const columns = [
    {
      title: '実行ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => (
        <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>{text}</Text>
      ),
    },
    {
      title: 'ジョブ名',
      dataIndex: 'jobName',
      key: 'jobName',
      width: 200,
      render: (text: string, record: TodayScheduledJob) => (
        <Link href={`/jobs/${record.jobId}`}>
          <Text strong style={{ color: '#1890ff' }}>{text}</Text>
        </Link>
      ),
    },
    {
      title: 'チーム',
      dataIndex: 'team',
      key: 'team',
      width: 120,
      render: (team: string) => <Tag>{team}</Tag>,
    },
    {
      title: '開始時刻',
      dataIndex: 'scheduledStartTime',
      key: 'scheduledStartTime',
      width: 160,
      render: (time: string, record: TodayScheduledJob) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: 12 }}>予定: {time}</Text>
          {record.actualStartTime && (
            <Text style={{ fontSize: 12 }}>実際: {record.actualStartTime}</Text>
          )}
        </Space>
      ),
    },
    {
      title: '終了/終了予定時刻',
      key: 'endTime',
      width: 160,
      render: (_: any, record: TodayScheduledJob) => (
        <Space direction="vertical" size={0}>
          {record.endTime ? (
            <Text style={{ fontSize: 12 }}>終了: {record.endTime}</Text>
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>予定: {record.estimatedEndTime}</Text>
          )}
        </Space>
      ),
    },
    {
      title: '実行時間',
      key: 'duration',
      width: 120,
      render: (_: any, record: TodayScheduledJob) => (
        <Text>{getDuration(record)}</Text>
      ),
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: TodayScheduledJob['status']) => {
        const config = getStatusConfig(status);
        return <Tag color={config.color}>{config.text}</Tag>;
      },
      filters: [
        { text: '実行前', value: 'scheduled' },
        { text: '実行中（通常通り）', value: 'running_normal' },
        { text: '実行中（遅延）', value: 'running_delayed' },
        { text: '実行待ち（通常通り）', value: 'waiting_normal' },
        { text: '実行待ち（遅延）', value: 'waiting_delayed' },
        { text: '正常終了', value: 'completed_success' },
        { text: 'エラー終了', value: 'completed_error' },
      ],
      onFilter: (value: any, record: TodayScheduledJob) => record.status === value,
    },
    {
      title: '実行者',
      dataIndex: 'executor',
      key: 'executor',
      width: 100,
    },
    {
      title: 'アクション',
      key: 'action',
      width: 250,
      fixed: 'right' as const,
      render: (_: any, record: TodayScheduledJob) => {
        const isCompleted = record.status === 'completed_success' || record.status === 'completed_error';
        const isRunning = record.status === 'running_normal' || record.status === 'running_delayed';
        const canStart = record.status === 'scheduled';

        return (
          <Space size="small">
            {(isCompleted || isRunning) && (
              <Link href={`/logs/${record.id}`}>
                <Button type="link" size="small" icon={<FileTextOutlined />}>
                  ログ
                </Button>
              </Link>
            )}
            {isCompleted && (
              <Button type="link" size="small" icon={<ReloadOutlined />}>
                再実行
              </Button>
            )}
            {(isRunning || canStart) && (
              <Popconfirm
                title="ジョブを中止しますか？"
                okText="はい"
                cancelText="いいえ"
                onConfirm={() => console.log('Cancel job:', record.id)}
              >
                <Button type="link" size="small" danger icon={<StopOutlined />}>
                  中止
                </Button>
              </Popconfirm>
            )}
            <Button type="link" size="small" icon={<NotificationOutlined />}>
              通知
            </Button>
          </Space>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  // 統計情報
  const stats = {
    total: mockTodayScheduledJobs.length,
    completed: mockTodayScheduledJobs.filter(j => j.status === 'completed_success').length,
    error: mockTodayScheduledJobs.filter(j => j.status === 'completed_error').length,
    running: mockTodayScheduledJobs.filter(j => j.status.startsWith('running')).length,
    waiting: mockTodayScheduledJobs.filter(j => j.status.startsWith('waiting')).length,
    scheduled: mockTodayScheduledJobs.filter(j => j.status === 'scheduled').length,
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 8 }}>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            本日実行予定
          </Title>
          <Text type="secondary">今日実行予定の全ジョブ一覧</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<ReloadOutlined />}>更新</Button>
          </Space>
        </Col>
      </Row>

      {/* 統計カード */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={8} sm={8} md={4}>
          <Card size="small">
            <Space direction="vertical" size={0} style={{ width: '100%', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>全体</Text>
              <Title level={3} style={{ margin: 0 }}>{stats.total}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={4}>
          <Card size="small">
            <Space direction="vertical" size={0} style={{ width: '100%', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>正常終了</Text>
              <Title level={3} style={{ margin: 0, color: '#52c41a' }}>{stats.completed}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={4}>
          <Card size="small">
            <Space direction="vertical" size={0} style={{ width: '100%', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>エラー終了</Text>
              <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>{stats.error}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={4}>
          <Card size="small">
            <Space direction="vertical" size={0} style={{ width: '100%', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>実行中</Text>
              <Title level={3} style={{ margin: 0, color: '#1890ff' }}>{stats.running}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={4}>
          <Card size="small">
            <Space direction="vertical" size={0} style={{ width: '100%', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>実行待ち</Text>
              <Title level={3} style={{ margin: 0, color: '#13c2c2' }}>{stats.waiting}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={4}>
          <Card size="small">
            <Space direction="vertical" size={0} style={{ width: '100%', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>実行前</Text>
              <Title level={3} style={{ margin: 0, color: '#8c8c8c' }}>{stats.scheduled}</Title>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 一括操作バー */}
      {selectedRowKeys.length > 0 && (
        <Card style={{ marginBottom: 16, background: '#e6f7ff', borderColor: '#91d5ff' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>{selectedRowKeys.length} 件選択中</Text>
            </Col>
            <Col>
              <Space>
                <Button size="small" icon={<ReloadOutlined />}>一括再実行</Button>
                <Button size="small" icon={<NotificationOutlined />}>一括通知</Button>
                <Popconfirm
                  title="選択したジョブを中止しますか？"
                  okText="はい"
                  cancelText="いいえ"
                >
                  <Button size="small" danger icon={<StopOutlined />}>一括中止</Button>
                </Popconfirm>
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
          dataSource={mockTodayScheduledJobs}
          rowKey="id"
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `全 ${total} 件`,
          }}
        />
      </Card>
    </div>
  );
}
