'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function NewJobPage() {
  const [cronExpression, setCronExpression] = useState('0 2 * * *');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">新規ジョブ登録</h1>
          <p className="text-gray-600 mt-1">新しいジョブを作成</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メインフォーム */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="基本設定" />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ジョブ名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="例: データ同期ジョブ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="ジョブの説明を入力"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    所属チーム <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>開発チーム</option>
                    <option>営業チーム</option>
                    <option>インフラチーム</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">タグ</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="カンマ区切りで入力"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="実行設定" />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">実行タイプ</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="type" value="python" defaultChecked className="mr-2" />
                    <span>Python</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="shell" className="mr-2" />
                    <span>Shell</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  スクリプトパス <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  placeholder="/scripts/my_job.py"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">作業ディレクトリ</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  placeholder="/var/jobs"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">タイムアウト(分)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    defaultValue="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">リトライ回数</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    defaultValue="3"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="スケジュール設定" />
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm font-medium text-gray-700">スケジュールを有効にする</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cron式</label>
                <input
                  type="text"
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                />
                <p className="text-sm text-gray-500 mt-2">毎日午前2時に実行</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">開始日</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">終了日</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="エラーハンドリング" />
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm font-medium text-gray-700">失敗時にメール通知</span>
              </div>
              <div className="flex items-center space-x-4">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm font-medium text-gray-700">失敗時にSlack通知</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">通知先メールアドレス</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="team@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slackチャンネル</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="#alerts"
                />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="依存関係" />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">先行ジョブ</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">なし</option>
                  <option>データ取得ジョブ</option>
                  <option>バックアップジョブ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">実行条件</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="condition" defaultChecked className="mr-2" />
                    <span className="text-sm">すべて成功</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="condition" className="mr-2" />
                    <span className="text-sm">いずれか成功</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* プレビューサイドバー */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="設定プレビュー" />
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">実行タイプ</p>
                <p className="text-gray-900">Python</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">スケジュール</p>
                <p className="text-gray-900 font-mono">{cronExpression}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">タイムアウト</p>
                <p className="text-gray-900">60分</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">リトライ</p>
                <p className="text-gray-900">3回</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="次回実行予定" />
            <div className="space-y-2">
              <p className="text-sm text-gray-700">2025-11-13 02:00:00</p>
              <p className="text-sm text-gray-700">2025-11-14 02:00:00</p>
              <p className="text-sm text-gray-700">2025-11-15 02:00:00</p>
            </div>
          </Card>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-end space-x-3 pb-6">
        <Button variant="ghost">キャンセル</Button>
        <Button variant="secondary">保存</Button>
        <Button>保存して実行</Button>
      </div>
    </div>
  );
}
