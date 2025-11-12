'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockExecutionHistory, mockLogs } from '@/lib/mock-data';
import { useState } from 'react';

export default function LogDetailPage({ params }: { params: { id: string } }) {
  const execution = mockExecutionHistory.find((e) => e.id === params.id) || mockExecutionHistory[0];
  const [activeTab, setActiveTab] = useState('stdout');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* ヘッダー情報 */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">実行ID</p>
            <p className="text-lg font-mono font-bold text-gray-900">{execution.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">ジョブ名</p>
            <p className="text-lg font-semibold text-gray-900">{execution.jobName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">実行時間</p>
            <p className="text-lg text-gray-900">
              {execution.duration > 0
                ? `${Math.floor(execution.duration / 60)}分${execution.duration % 60}秒`
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">ステータス</p>
            <div className="mt-1">
              <Badge
                variant={
                  execution.status === 'success'
                    ? 'success'
                    : execution.status === 'failed'
                    ? 'error'
                    : 'warning'
                }
              >
                {execution.status === 'success' ? '成功' : execution.status === 'failed' ? '失敗' : '実行中'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">開始時刻</p>
            <p className="text-sm text-gray-900">{execution.startTime}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">終了時刻</p>
            <p className="text-sm text-gray-900">{execution.endTime || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">実行者</p>
            <p className="text-sm text-gray-900">{execution.executor}</p>
          </div>
        </div>
      </Card>

      {/* 検索バー */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="search"
            placeholder="ログを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button variant="secondary">ダウンロード</Button>
      </div>

      {/* ログ表示エリア */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('stdout')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stdout'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              標準出力
            </button>
            <button
              onClick={() => setActiveTab('stderr')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stderr'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              標準エラー出力
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'system'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              システムログ
            </button>
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'stdout' && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
              <pre>{mockLogs}</pre>
            </div>
          )}
          {activeTab === 'stderr' && (
            <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
              <pre>エラー出力はありません</pre>
            </div>
          )}
          {activeTab === 'system' && (
            <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
              <pre>{`[2025-11-12 02:00:00] SYSTEM: Job execution started
[2025-11-12 02:00:00] SYSTEM: Environment loaded
[2025-11-12 02:00:00] SYSTEM: Starting process
[2025-11-12 02:15:23] SYSTEM: Process completed with exit code 0`}</pre>
            </div>
          )}
        </div>
      </Card>

      {/* 関連情報 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="同じジョブの直近実行" />
          <div className="space-y-2">
            {mockExecutionHistory.slice(0, 3).map((history) => (
              <div
                key={history.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-mono text-gray-900">{history.id}</p>
                  <p className="text-xs text-gray-500">{history.startTime}</p>
                </div>
                <Badge
                  variant={
                    history.status === 'success'
                      ? 'success'
                      : history.status === 'failed'
                      ? 'error'
                      : 'warning'
                  }
                >
                  {history.status === 'success' ? '成功' : history.status === 'failed' ? '失敗' : '実行中'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="関連ジョブの実行状況" />
          <div className="space-y-2">
            <div className="p-3 border border-gray-200 rounded">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">データ取得ジョブ</p>
                <Badge variant="success">完了</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">先行ジョブ</p>
            </div>
            <div className="p-3 border border-gray-200 rounded">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">レポート生成</p>
                <Badge variant="warning">待機中</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">後続ジョブ</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
