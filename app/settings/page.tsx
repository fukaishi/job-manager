'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockCurrentUser } from '@/lib/mock-data';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ユーザー設定</h1>
        <p className="text-gray-600 mt-1">個人設定を変更</p>
      </div>

      {/* プロフィール */}
      <Card>
        <CardHeader title="プロフィール" />
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white text-3xl font-bold">
              山
            </div>
            <div>
              <Button variant="secondary" size="sm">
                写真を変更
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">名前</label>
              <input
                type="text"
                defaultValue={mockCurrentUser.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                defaultValue={mockCurrentUser.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">所属チーム</label>
              <input
                type="text"
                value={mockCurrentUser.team}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">権限レベル</label>
              <input
                type="text"
                value={
                  mockCurrentUser.role === 'engineer'
                    ? 'エンジニア'
                    : mockCurrentUser.role === 'sales'
                    ? '営業'
                    : '管理者'
                }
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button>保存</Button>
          </div>
        </div>
      </Card>

      {/* 通知設定 */}
      <Card>
        <CardHeader title="通知設定" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">メール通知</p>
              <p className="text-sm text-gray-500">ジョブの実行結果をメールで受け取る</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="border-t pt-4">
            <p className="font-medium text-gray-700 mb-3">通知するイベント</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">ジョブ失敗</p>
                  <p className="text-xs text-gray-500">ジョブが失敗したときに通知</p>
                </div>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">ジョブ成功</p>
                  <p className="text-xs text-gray-500">ジョブが成功したときに通知</p>
                </div>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">長時間実行</p>
                  <p className="text-xs text-gray-500">
                    予想時間を超えて実行されているときに通知
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-medium text-gray-700 mb-3">お気に入りジョブの通知</p>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-sm text-gray-700">
                お気に入りに登録したジョブの実行結果を常に通知
              </span>
            </label>
          </div>
        </div>
      </Card>

      {/* 表示設定 */}
      <Card>
        <CardHeader title="表示設定" />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">タイムゾーン</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Asia/Tokyo (UTC+9)</option>
              <option>America/New_York (UTC-5)</option>
              <option>Europe/London (UTC+0)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">言語</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>日本語</option>
              <option>English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">テーマ</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-primary-500 rounded-lg p-4 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">ライト</span>
                  <span className="text-primary-600">✓</span>
                </div>
                <div className="h-16 bg-white border border-gray-300 rounded"></div>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">ダーク</span>
                </div>
                <div className="h-16 bg-gray-900 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* セキュリティ */}
      <Card>
        <CardHeader title="セキュリティ" />
        <div className="space-y-4">
          <div>
            <Button variant="secondary">パスワードを変更</Button>
          </div>
          <div className="border-t pt-4">
            <p className="font-medium text-gray-900 mb-2">二要素認証</p>
            <p className="text-sm text-gray-500 mb-3">
              アカウントのセキュリティを強化するために二要素認証を有効にします
            </p>
            <Button variant="secondary" size="sm">
              有効にする
            </Button>
          </div>
          <div className="border-t pt-4">
            <p className="font-medium text-gray-900 mb-2">APIトークン</p>
            <p className="text-sm text-gray-500 mb-3">
              API経由でジョブ管理ツールにアクセスするためのトークン
            </p>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm">
                トークンを生成
              </Button>
              <Button variant="ghost" size="sm">
                既存トークンを表示
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="pb-6">
        <Button>設定を保存</Button>
      </div>
    </div>
  );
}
