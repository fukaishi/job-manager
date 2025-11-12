'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockJobs, mockExecutionHistory } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find((j) => j.id === params.id) || mockJobs[0];
  const [activeTab, setActiveTab] = useState('basic');

  const jobHistory = mockExecutionHistory.filter((h) => h.jobId === job.id);

  const tabs = [
    { id: 'basic', label: '基本情報' },
    { id: 'schedule', label: 'スケジュール' },
    { id: 'dependencies', label: '依存関係' },
    { id: 'history', label: '実行履歴' },
    { id: 'stats', label: '統計' },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー部 */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{job.name}</h1>
              <Badge variant={job.status === 'enabled' ? 'success' : 'default'}>
                {job.status === 'enabled' ? '有効' : '無効'}
              </Badge>
              <Badge variant={job.lastExecutionStatus === 'success' ? 'success' : job.lastExecutionStatus === 'failed' ? 'error' : 'warning'}>
                {job.lastExecutionStatus === 'success' ? '成功' : job.lastExecutionStatus === 'failed' ? '失敗' : '実行中'}
              </Badge>
            </div>
            <p className="text-gray-600 mb-3">{job.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center text-gray-500">
                <span className="mr-1">👥</span> {job.team}
              </span>
              <span className="flex items-center space-x-1">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="info">
                    {tag}
                  </Badge>
                ))}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button>今すぐ実行</Button>
            <Link href={`/jobs/${job.id}/edit`}>
              <Button variant="secondary">編集</Button>
            </Link>
            <Button variant="ghost">複製</Button>
            <Button variant="danger">削除</Button>
          </div>
        </div>
      </Card>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* タブコンテンツ */}
      {activeTab === 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="実行設定" />
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">実行タイプ</label>
                <p className="text-sm text-gray-900 mt-1">{job.executionType === 'python' ? 'Python' : 'Shell'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">スクリプトパス</label>
                <p className="text-sm text-gray-900 mt-1 font-mono bg-gray-50 p-2 rounded">
                  {job.scriptPath}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">作業ディレクトリ</label>
                <p className="text-sm text-gray-900 mt-1 font-mono bg-gray-50 p-2 rounded">/var/jobs</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">タイムアウト</label>
                  <p className="text-sm text-gray-900 mt-1">{job.timeout}分</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">リトライ回数</label>
                  <p className="text-sm text-gray-900 mt-1">{job.retryCount}回</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="環境変数" />
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-mono text-gray-700">DB_HOST</span>
                <span className="text-sm font-mono text-gray-900">localhost</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-mono text-gray-700">DB_PORT</span>
                <span className="text-sm font-mono text-gray-900">5432</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-mono text-gray-700">LOG_LEVEL</span>
                <span className="text-sm font-mono text-gray-900">INFO</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="通知設定" />
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" checked readOnly className="mr-2" />
                <span className="text-sm text-gray-700">失敗時にメール通知</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked readOnly className="mr-2" />
                <span className="text-sm text-gray-700">失敗時にSlack通知</span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">通知先</label>
                <p className="text-sm text-gray-900 mt-1">dev-team@example.com</p>
                <p className="text-sm text-gray-900">#alerts</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="スケジュール設定" />
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Cron式</label>
                <p className="text-lg font-mono text-gray-900 mt-2 p-3 bg-gray-50 rounded">{job.schedule}</p>
                <p className="text-sm text-gray-500 mt-2">毎日午前2時に実行</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">有効期間</label>
                <p className="text-sm text-gray-900 mt-1">開始: 2025-01-01</p>
                <p className="text-sm text-gray-900">終了: 未設定</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="次回実行予定" subtitle="今後5回分" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((day) => (
                <div key={day} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">第{day}回</span>
                  <span className="text-sm text-gray-900">2025-11-{12 + day} 02:00:00</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'dependencies' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="先行ジョブ" subtitle="このジョブの前に実行" />
            <div className="space-y-2">
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <p className="font-medium text-gray-900">データ取得ジョブ</p>
                <p className="text-sm text-gray-500">開発チーム</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="後続ジョブ" subtitle="このジョブの後に実行" />
            <div className="space-y-2">
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <p className="font-medium text-gray-900">レポート生成</p>
                <p className="text-sm text-gray-500">営業チーム</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <p className="font-medium text-gray-900">通知送信</p>
                <p className="text-sm text-gray-500">営業チーム</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader title="DAG図" subtitle="依存関係の可視化" />
            <div className="p-8 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">依存関係のビジュアル図がここに表示されます</p>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded">データ取得</div>
                <span className="text-2xl">→</span>
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded font-bold">{job.name}</div>
                <span className="text-2xl">→</span>
                <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded">レポート生成</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="実行履歴" subtitle="直近100件" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">実行ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">開始時刻</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">終了時刻</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">実行時間</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">実行者</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">アクション</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobHistory.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{history.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{history.startTime}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{history.endTime || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {history.duration > 0 ? `${Math.floor(history.duration / 60)}分${history.duration % 60}秒` : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={history.status === 'success' ? 'success' : history.status === 'failed' ? 'error' : 'warning'}>
                          {history.status === 'success' ? '成功' : history.status === 'failed' ? '失敗' : '実行中'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{history.executor}</td>
                      <td className="px-4 py-3">
                        <Link href={`/logs/${history.id}`}>
                          <Button size="sm" variant="ghost">ログ</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader title="成功率" />
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">過去7日</span>
                  <span className="text-lg font-bold text-green-600">95.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">過去30日</span>
                  <span className="text-lg font-bold text-green-600">93.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '93.8%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">全期間</span>
                  <span className="text-lg font-bold text-green-600">94.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.5%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="実行時間" />
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">平均実行時間</p>
                <p className="text-2xl font-bold text-gray-900">15分23秒</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">最長実行時間</p>
                <p className="text-lg text-gray-900">28分45秒</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">最短実行時間</p>
                <p className="text-lg text-gray-900">12分10秒</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="実行回数" />
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">過去7日</p>
                <p className="text-2xl font-bold text-gray-900">7回</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">過去30日</p>
                <p className="text-lg text-gray-900">30回</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">全期間</p>
                <p className="text-lg text-gray-900">365回</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
