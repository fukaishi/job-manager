'use client';

import { Card, Tag, Button, Typography, Row, Col, Space, Timeline } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { mockJobs } from '@/lib/mock-data';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function SchedulePage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate] = useState(new Date('2025-11-12'));

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            スケジュール管理
          </Title>
          <Text type="secondary">カレンダービューでスケジュールを確認</Text>
        </div>
        <Space>
          <Button type={view === 'month' ? 'primary' : 'default'} onClick={() => setView('month')}>
            月
          </Button>
          <Button type={view === 'week' ? 'primary' : 'default'} onClick={() => setView('week')}>
            週
          </Button>
          <Button type={view === 'day' ? 'primary' : 'default'} onClick={() => setView('day')}>
            日
          </Button>
        </Space>
      </div>

      {/* カレンダーヘッダー */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button icon={<LeftOutlined />}>前へ</Button>
          <Title level={3} style={{ margin: 0 }}>
            2025年11月 {view === 'week' && '第2週'} {view === 'day' && '12日'}
          </Title>
          <Button icon={<RightOutlined />}>次へ</Button>
        </div>
      </Card>

      {/* 週表示 */}
      {view === 'week' && (
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #f0f0f0', padding: '8px', backgroundColor: '#fafafa', width: '64px' }}></th>
                  {[10, 11, 12, 13, 14, 15, 16].map((day) => (
                    <th key={day} style={{ border: '1px solid #f0f0f0', padding: '8px', backgroundColor: '#fafafa' }}>
                      <div style={{ textAlign: 'center' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {daysOfWeek[new Date(`2025-11-${day}`).getDay()]}
                        </Text>
                        <div style={{ fontSize: '18px', fontWeight: 600 }}>{day}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 2, 9, 14].map((hour) => (
                  <tr key={hour}>
                    <td
                      style={{
                        border: '1px solid #f0f0f0',
                        padding: '8px',
                        backgroundColor: '#fafafa',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {hour}:00
                    </td>
                    {[10, 11, 12, 13, 14, 15, 16].map((day, idx) => (
                      <td key={day} style={{ border: '1px solid #f0f0f0', padding: '4px', minHeight: '80px', verticalAlign: 'top' }}>
                        {hour === 2 && idx === 2 && (
                          <div style={{ backgroundColor: '#e6f7ff', color: '#1890ff', fontSize: '12px', padding: '4px', borderRadius: '4px', marginBottom: '4px' }}>
                            <div style={{ fontWeight: 500 }}>データ同期</div>
                            <div style={{ fontSize: '10px' }}>開発</div>
                          </div>
                        )}
                        {hour === 0 && idx === 2 && (
                          <div style={{ backgroundColor: '#f9f0ff', color: '#722ed1', fontSize: '12px', padding: '4px', borderRadius: '4px', marginBottom: '4px' }}>
                            <div style={{ fontWeight: 500 }}>バックアップ</div>
                            <div style={{ fontSize: '10px' }}>インフラ</div>
                          </div>
                        )}
                        {hour === 9 && idx === 1 && (
                          <div style={{ backgroundColor: '#f6ffed', color: '#52c41a', fontSize: '12px', padding: '4px', borderRadius: '4px', marginBottom: '4px' }}>
                            <div style={{ fontWeight: 500 }}>レポート生成</div>
                            <div style={{ fontSize: '10px' }}>営業</div>
                          </div>
                        )}
                        {hour === 14 && idx === 2 && (
                          <div style={{ backgroundColor: '#fffbe6', color: '#faad14', fontSize: '12px', padding: '4px', borderRadius: '4px', marginBottom: '4px' }}>
                            <div style={{ fontWeight: 500 }}>通知送信</div>
                            <div style={{ fontSize: '10px' }}>営業</div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 日表示 - タイムライン */}
      {view === 'day' && (
        <Card title="2025年11月12日のスケジュール">
          <Timeline>
            {mockJobs.slice(0, 5).map((job, idx) => (
              <Timeline.Item key={job.id} color="blue">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{job.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {job.team}
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text style={{ fontFamily: 'monospace', fontSize: '14px' }}>{job.schedule}</Text>
                    <br />
                    <Tag color="blue" style={{ marginTop: '4px' }}>
                      予定
                    </Tag>
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      )}

      {/* 月表示 */}
      {view === 'month' && (
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#f0f0f0' }}>
            {daysOfWeek.map((day) => (
              <div key={day} style={{ backgroundColor: '#fafafa', padding: '8px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div key={day} style={{ backgroundColor: 'white', padding: '8px', minHeight: '96px' }}>
                <Text style={{ fontSize: '14px', fontWeight: 500 }}>{day}</Text>
                {day === 12 && (
                  <div style={{ marginTop: '4px' }}>
                    <div style={{ fontSize: '12px', backgroundColor: '#e6f7ff', color: '#1890ff', borderRadius: '4px', padding: '2px 4px', marginBottom: '4px' }}>
                      データ同期
                    </div>
                    <div style={{ fontSize: '12px', backgroundColor: '#f9f0ff', color: '#722ed1', borderRadius: '4px', padding: '2px 4px', marginBottom: '4px' }}>
                      バックアップ
                    </div>
                    <div style={{ fontSize: '12px', backgroundColor: '#fffbe6', color: '#faad14', borderRadius: '4px', padding: '2px 4px' }}>
                      通知送信
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* スケジュール統計 */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={8}>
          <Card>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
              本日の予定
            </Text>
            <Title level={2} style={{ margin: 0 }}>
              15
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              件のジョブが実行予定
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
              今週の予定
            </Text>
            <Title level={2} style={{ margin: 0 }}>
              87
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              件のジョブが実行予定
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
              スケジュール競合
            </Text>
            <Title level={2} style={{ margin: 0, color: '#ff4d4f' }}>
              2
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              件の競合を検出
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
