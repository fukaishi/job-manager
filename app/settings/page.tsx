'use client';

import { Card, Button, Typography, Input, Select, Switch, Checkbox, Space, Avatar, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { mockCurrentUser } from '@/lib/mock-data';

const { Title, Text } = Typography;

export default function SettingsPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>
          ユーザー設定
        </Title>
        <Text type="secondary">個人設定を変更</Text>
      </div>

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* プロフィール */}
        <Card title="プロフィール">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginRight: '16px' }} />
              <Button>写真を変更</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  名前
                </Text>
                <Input defaultValue={mockCurrentUser.name} />
              </div>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  メールアドレス
                </Text>
                <Input type="email" defaultValue={mockCurrentUser.email} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  所属チーム
                </Text>
                <Input value={mockCurrentUser.team} disabled />
              </div>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  権限レベル
                </Text>
                <Input
                  value={
                    mockCurrentUser.role === 'engineer'
                      ? 'エンジニア'
                      : mockCurrentUser.role === 'sales'
                      ? '営業'
                      : '管理者'
                  }
                  disabled
                />
              </div>
            </div>

            <div style={{ paddingTop: '16px' }}>
              <Button type="primary">保存</Button>
            </div>
          </Space>
        </Card>

        {/* 通知設定 */}
        <Card title="通知設定">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong style={{ display: 'block' }}>
                  メール通知
                </Text>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  ジョブの実行結果をメールで受け取る
                </Text>
              </div>
              <Switch defaultChecked />
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                通知するイベント
              </Text>
              <Space direction="vertical">
                <Checkbox defaultChecked>
                  <div>
                    <Text strong style={{ fontSize: '14px' }}>
                      ジョブ失敗
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      ジョブが失敗したときに通知
                    </Text>
                  </div>
                </Checkbox>
                <Checkbox>
                  <div>
                    <Text strong style={{ fontSize: '14px' }}>
                      ジョブ成功
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      ジョブが成功したときに通知
                    </Text>
                  </div>
                </Checkbox>
                <Checkbox defaultChecked>
                  <div>
                    <Text strong style={{ fontSize: '14px' }}>
                      長時間実行
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      予想時間を超えて実行されているときに通知
                    </Text>
                  </div>
                </Checkbox>
              </Space>
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                お気に入りジョブの通知
              </Text>
              <Checkbox defaultChecked>
                <Text>お気に入りに登録したジョブの実行結果を常に通知</Text>
              </Checkbox>
            </div>
          </Space>
        </Card>

        {/* 表示設定 */}
        <Card title="表示設定">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                タイムゾーン
              </Text>
              <Select
                defaultValue="Asia/Tokyo"
                style={{ width: '100%' }}
                options={[
                  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' },
                  { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
                  { value: 'Europe/London', label: 'Europe/London (UTC+0)' },
                ]}
              />
            </div>

            <div>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                言語
              </Text>
              <Select
                defaultValue="ja"
                style={{ width: '100%' }}
                options={[
                  { value: 'ja', label: '日本語' },
                  { value: 'en', label: 'English' },
                ]}
              />
            </div>

            <div>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                テーマ
              </Text>
              <Radio.Group defaultValue="light">
                <Space direction="vertical">
                  <Radio value="light">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '40px',
                          backgroundColor: 'white',
                          border: '1px solid #d9d9d9',
                          borderRadius: '4px',
                          marginRight: '12px',
                        }}
                      ></div>
                      <Text>ライト</Text>
                    </div>
                  </Radio>
                  <Radio value="dark">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '40px',
                          backgroundColor: '#1f1f1f',
                          border: '1px solid #d9d9d9',
                          borderRadius: '4px',
                          marginRight: '12px',
                        }}
                      ></div>
                      <Text>ダーク</Text>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Space>
        </Card>

        {/* セキュリティ */}
        <Card title="セキュリティ">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Button>パスワードを変更</Button>
            </div>
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                二要素認証
              </Text>
              <Text type="secondary" style={{ display: 'block', marginBottom: '12px' }}>
                アカウントのセキュリティを強化するために二要素認証を有効にします
              </Text>
              <Button type="primary">有効にする</Button>
            </div>
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                APIトークン
              </Text>
              <Text type="secondary" style={{ display: 'block', marginBottom: '12px' }}>
                API経由でジョブ管理ツールにアクセスするためのトークン
              </Text>
              <Space>
                <Button type="primary">トークンを生成</Button>
                <Button>既存トークンを表示</Button>
              </Space>
            </div>
          </Space>
        </Card>

        <div style={{ paddingBottom: '24px' }}>
          <Button type="primary" size="large">
            設定を保存
          </Button>
        </div>
      </Space>
    </div>
  );
}
