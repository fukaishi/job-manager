import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockJobs, mockExecutionHistory } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  const runningJobs = mockJobs.filter(j => j.lastExecutionStatus === 'running').length;
  const todaySuccess = mockExecutionHistory.filter(h => h.status === 'success').length;
  const todayFailed = mockExecutionHistory.filter(h => h.status === 'failed').length;
  const errorRate = todayFailed / (todaySuccess + todayFailed) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-gray-600 mt-1">ジョブ管理システムの概要</p>
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">実行中ジョブ</p>
              <p className="text-2xl font-bold text-gray-900">{runningJobs}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">本日の成功</p>
              <p className="text-2xl font-bold text-gray-900">{todaySuccess}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">本日の失敗</p>
              <p className="text-2xl font-bold text-gray-900">{todayFailed}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">エラー率</p>
              <p className="text-2xl font-bold text-gray-900">{errorRate.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 実行状況グラフ */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="実行状況トレンド" subtitle="過去7日間" />
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 72, 68, 85, 78, 90, 82].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col justify-end h-full space-y-1">
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div
                      className="w-full bg-red-500 rounded-t"
                      style={{ height: `${100 - height}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    11/{6 + i}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">成功</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">失敗</span>
              </div>
            </div>
          </Card>
        </div>

        {/* アラート・通知 */}
        <div>
          <Card>
            <CardHeader title="アラート・通知" />
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">🔴</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">実行失敗</p>
                    <p className="text-xs text-red-700 mt-1">バックアップジョブが失敗しました</p>
                    <p className="text-xs text-red-600 mt-1">2時間前</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900">長時間実行中</p>
                    <p className="text-xs text-yellow-700 mt-1">通知送信が予想より長く実行されています</p>
                    <p className="text-xs text-yellow-600 mt-1">30分前</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">ℹ️</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">スケジュール更新</p>
                    <p className="text-xs text-blue-700 mt-1">レポート生成のスケジュールが変更されました</p>
                    <p className="text-xs text-blue-600 mt-1">1日前</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* よく使うジョブ */}
      <Card>
        <CardHeader
          title="よく使うジョブ"
          subtitle="最近実行したジョブ"
          action={
            <Link href="/jobs">
              <Button variant="ghost" size="sm">すべて表示</Button>
            </Link>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockJobs.slice(0, 6).map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{job.name}</h4>
                <Badge variant={job.lastExecutionStatus === 'success' ? 'success' : job.lastExecutionStatus === 'failed' ? 'error' : 'warning'}>
                  {job.lastExecutionStatus === 'success' ? '成功' : job.lastExecutionStatus === 'failed' ? '失敗' : '実行中'}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">{job.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{job.team}</span>
                <Link href={`/jobs/${job.id}`}>
                  <Button size="sm" variant="primary">実行</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* チーム別実行数 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="チーム別実行数" subtitle="本日の実行数" />
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">開発チーム</span>
                <span className="text-sm font-bold text-gray-900">24</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">営業チーム</span>
                <span className="text-sm font-bold text-gray-900">18</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">インフラチーム</span>
                <span className="text-sm font-bold text-gray-900">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="次回実行予定" subtitle="今後24時間以内" />
          <div className="space-y-3">
            {mockJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{job.name}</p>
                  <p className="text-xs text-gray-500">{job.team}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">{job.nextExecutionTime}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
