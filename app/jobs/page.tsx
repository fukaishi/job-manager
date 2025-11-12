'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockJobs } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

export default function JobsPage() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = mockJobs.filter((job) => {
    if (filterTeam !== 'all' && job.team !== filterTeam) return false;
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (searchQuery && !job.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleAllJobs = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map((job) => job.id));
    }
  };

  const teams = Array.from(new Set(mockJobs.map((job) => job.team)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ジョブ一覧</h1>
          <p className="text-gray-600 mt-1">すべてのジョブを管理</p>
        </div>
        <Link href="/jobs/new">
          <Button>+ 新規登録</Button>
        </Link>
      </div>

      {/* フィルタ・検索バー */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="search"
              placeholder="ジョブ名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">すべてのステータス</option>
              <option value="enabled">有効</option>
              <option value="disabled">無効</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 一括操作バー */}
      {selectedJobs.length > 0 && (
        <Card className="bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-primary-900">
              {selectedJobs.length} 件選択中
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary">
                有効化
              </Button>
              <Button size="sm" variant="secondary">
                無効化
              </Button>
              <Button size="sm" variant="danger">
                削除
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* ジョブリストテーブル */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                    onChange={toggleAllJobs}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ジョブ名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  チーム
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  スケジュール
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最終実行
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  結果
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  次回実行
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleJobSelection(job.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/jobs/${job.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                      {job.name}
                    </Link>
                    <p className="text-sm text-gray-500">{job.description}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{job.team}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 font-mono">{job.schedule}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{job.lastExecutionTime}</td>
                  <td className="px-4 py-4">
                    {job.lastExecutionStatus === 'success' && (
                      <span className="text-green-600">✅</span>
                    )}
                    {job.lastExecutionStatus === 'failed' && (
                      <span className="text-red-600">❌</span>
                    )}
                    {job.lastExecutionStatus === 'running' && (
                      <span className="text-blue-600">🔄</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{job.nextExecutionTime}</td>
                  <td className="px-4 py-4">
                    <Badge variant={job.status === 'enabled' ? 'success' : 'default'}>
                      {job.status === 'enabled' ? '有効' : '無効'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="primary">
                        実行
                      </Button>
                      <Link href={`/jobs/${job.id}/edit`}>
                        <Button size="sm" variant="ghost">
                          編集
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          全{filteredJobs.length}件のジョブ
        </p>
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
