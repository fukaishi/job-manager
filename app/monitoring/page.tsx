'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockJobs } from '@/lib/mock-data';
import { useState } from 'react';

export default function MonitoringPage() {
  const runningJobs = mockJobs.filter((j) => j.lastExecutionStatus === 'running');
  const [updateInterval, setUpdateInterval] = useState('10');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">実行中ジョブ監視</h1>
          <p className="text-gray-600 mt-1">リアルタイムでジョブを監視</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">自動更新間隔:</span>
          <select
            value={updateInterval}
            onChange={(e) => setUpdateInterval(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="5">5秒</option>
            <option value="10">10秒</option>
            <option value="30">30秒</option>
            <option value="manual">手動</option>
          </select>
          <Button size="sm" variant="secondary">
            🔄 更新
          </Button>
        </div>
      </div>

      {/* 実行中ジョブカード */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {runningJobs.map((job) => (
          <Card key={job.id} className="border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{job.name}</h3>
                <p className="text-sm text-gray-500">{job.team}</p>
              </div>
              <Badge variant="warning">実行中</Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">開始時刻</span>
                  <span className="font-medium text-gray-900">{job.lastExecutionTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">経過時間</span>
                  <span className="font-medium text-gray-900">5分23秒</span>
                </div>
              </div>

              {/* プログレスバー */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">進捗状況</span>
                  <span className="text-gray-900">34%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: '34%' }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">予想残り時間: 10分</p>
              </div>

              {/* リソース使用状況 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">CPU使用率</p>
                  <p className="text-lg font-bold text-gray-900">45%</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">メモリ使用</p>
                  <p className="text-lg font-bold text-gray-900">2.1GB</p>
                </div>
              </div>

              {/* ライブログ */}
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">最新ログ</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs overflow-hidden">
                  <p>[14:05:23] Processing record 5,234...</p>
                  <p>[14:05:24] Processing record 5,235...</p>
                  <p>[14:05:25] Processing record 5,236...</p>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="ghost" className="flex-1">
                  ライブログ表示
                </Button>
                <Button size="sm" variant="danger" className="flex-1">
                  キャンセル
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {runningJobs.length === 0 && (
          <div className="lg:col-span-2 text-center py-12">
            <p className="text-gray-500 text-lg">現在実行中のジョブはありません</p>
          </div>
        )}
      </div>

      {/* 待機中ジョブ */}
      <Card>
        <CardHeader title="待機中ジョブ" subtitle="依存関係またはリソース制限により待機中" />
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">データクリーニング</p>
              <p className="text-sm text-gray-500">開発チーム • 依存ジョブ待機中</p>
            </div>
            <Badge variant="default">待機中</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">レポート生成</p>
              <p className="text-sm text-gray-500">営業チーム • リソース制限</p>
            </div>
            <Badge variant="default">待機中</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
