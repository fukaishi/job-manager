'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockExecutionHistory } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

export default function HistoryPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');

  const filteredHistory = mockExecutionHistory.filter((history) => {
    if (filterStatus !== 'all' && history.status !== filterStatus) return false;
    if (filterTeam !== 'all' && history.team !== filterTeam) return false;
    return true;
  });

  const teams = Array.from(new Set(mockExecutionHistory.map((h) => h.team)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">実行履歴</h1>
        <p className="text-gray-600 mt-1">全ジョブの実行履歴を確認</p>
      </div>

      {/* フィルタ */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">期間</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">チーム</label>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">すべてのチーム</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">すべて</option>
              <option value="success">成功</option>
              <option value="failed">失敗</option>
              <option value="running">実行中</option>
              <option value="cancelled">キャンセル</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ジョブ名</label>
            <input
              type="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="検索..."
            />
          </div>
        </div>
      </Card>

      {/* 履歴テーブル */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  実行ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ジョブ名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  チーム
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  開始時刻
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  終了時刻
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  実行時間
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  実行者
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((history) => (
                <tr key={history.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-mono text-gray-900">{history.id}</td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/jobs/${history.jobId}`}
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      {history.jobName}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{history.team}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{history.startTime}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{history.endTime || '-'}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {history.duration > 0
                      ? `${Math.floor(history.duration / 60)}分${history.duration % 60}秒`
                      : '-'}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        history.status === 'success'
                          ? 'success'
                          : history.status === 'failed'
                          ? 'error'
                          : history.status === 'running'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {history.status === 'success'
                        ? '成功'
                        : history.status === 'failed'
                        ? '失敗'
                        : history.status === 'running'
                        ? '実行中'
                        : 'キャンセル'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{history.executor}</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <Link href={`/logs/${history.id}`}>
                        <Button size="sm" variant="ghost">
                          ログ
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost">
                        再実行
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">全{filteredHistory.length}件の実行履歴</p>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            前へ
          </Button>
          <Button variant="ghost" size="sm">
            次へ
          </Button>
        </div>
      </div>
    </div>
  );
}
