'use client';

import { Card, Button, Typography, Input, Select, DatePicker, Checkbox, Radio, Space, Row, Col } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function NewJobPage() {
  const [cronExpression, setCronExpression] = useState('0 2 * * *');

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            新規ジョブ登録
          </Title>
          <Text type="secondary">新しいジョブを作成</Text>
        </div>
      </div>

      <Row gutter={24}>
        {/* メインフォーム */}
        <Col xs={24} lg={16}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card title="基本設定">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    ジョブ名 <Text type="danger">*</Text>
                  </Text>
                  <Input placeholder="例: データ同期ジョブ" />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    説明
                  </Text>
                  <TextArea rows={3} placeholder="ジョブの説明を入力" />
                </div>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      所属チーム <Text type="danger">*</Text>
                    </Text>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="選択してください"
                      options={[
                        { value: 'dev', label: '開発チーム' },
                        { value: 'sales', label: '営業チーム' },
                        { value: 'infra', label: 'インフラチーム' },
                      ]}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      タグ
                    </Text>
                    <Input placeholder="カンマ区切りで入力" />
                  </Col>
                </Row>
              </Space>
            </Card>

            <Card title="実行設定">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    実行タイプ
                  </Text>
                  <Radio.Group defaultValue="python">
                    <Radio value="python">Python</Radio>
                    <Radio value="shell">Shell</Radio>
                  </Radio.Group>
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    スクリプトパス <Text type="danger">*</Text>
                  </Text>
                  <Input placeholder="/scripts/my_job.py" style={{ fontFamily: 'monospace' }} />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    作業ディレクトリ
                  </Text>
                  <Input placeholder="/var/jobs" style={{ fontFamily: 'monospace' }} />
                </div>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      タイムアウト(分)
                    </Text>
                    <Input type="number" defaultValue="60" />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      リトライ回数
                    </Text>
                    <Input type="number" defaultValue="3" />
                  </Col>
                </Row>
              </Space>
            </Card>

            <Card title="スケジュール設定">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Checkbox defaultChecked>
                  <Text strong>スケジュールを有効にする</Text>
                </Checkbox>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    Cron式
                  </Text>
                  <Input
                    value={cronExpression}
                    onChange={(e) => setCronExpression(e.target.value)}
                    style={{ fontFamily: 'monospace' }}
                  />
                  <Text type="secondary" style={{ fontSize: '14px', display: 'block', marginTop: '8px' }}>
                    毎日午前2時に実行
                  </Text>
                </div>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      開始日
                    </Text>
                    <DatePicker style={{ width: '100%' }} />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      終了日
                    </Text>
                    <DatePicker style={{ width: '100%' }} />
                  </Col>
                </Row>
              </Space>
            </Card>

            <Card title="エラーハンドリング">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Checkbox defaultChecked>
                  <Text strong>失敗時にメール通知</Text>
                </Checkbox>
                <Checkbox defaultChecked>
                  <Text strong>失敗時にSlack通知</Text>
                </Checkbox>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    通知先メールアドレス
                  </Text>
                  <Input type="email" placeholder="team@example.com" />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    Slackチャンネル
                  </Text>
                  <Input placeholder="#alerts" />
                </div>
              </Space>
            </Card>

            <Card title="依存関係">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    先行ジョブ
                  </Text>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="選択してください"
                    options={[
                      { value: '', label: 'なし' },
                      { value: 'job1', label: 'データ取得ジョブ' },
                      { value: 'job2', label: 'バックアップジョブ' },
                    ]}
                  />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    実行条件
                  </Text>
                  <Radio.Group defaultValue="all">
                    <Radio value="all">すべて成功</Radio>
                    <Radio value="any">いずれか成功</Radio>
                  </Radio.Group>
                </div>
              </Space>
            </Card>
          </Space>
        </Col>

        {/* プレビューサイドバー */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card title="設定プレビュー">
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    実行タイプ
                  </Text>
                  <Text strong>Python</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    スケジュール
                  </Text>
                  <Text strong style={{ fontFamily: 'monospace' }}>
                    {cronExpression}
                  </Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    タイムアウト
                  </Text>
                  <Text strong>60分</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block' }}>
                    リトライ
                  </Text>
                  <Text strong>3回</Text>
                </div>
              </Space>
            </Card>

            <Card title="次回実行予定">
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Text style={{ fontSize: '14px' }}>2025-11-13 02:00:00</Text>
                <Text style={{ fontSize: '14px' }}>2025-11-14 02:00:00</Text>
                <Text style={{ fontSize: '14px' }}>2025-11-15 02:00:00</Text>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* アクションボタン */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingBottom: '24px' }}>
        <Space>
          <Button>キャンセル</Button>
          <Button>保存</Button>
          <Button type="primary">保存して実行</Button>
        </Space>
      </div>
    </div>
  );
}
