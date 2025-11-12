'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockJobs } from '@/lib/mock-data';
import { useState } from 'react';

export default function SchedulePage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate] = useState(new Date('2025-11-12'));

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">スケジュール管理</h1>
          <p className="text-gray-600 mt-1">カレンダービューでスケジュールを確認</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={view === 'month' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setView('month')}
          >
            月
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setView('week')}
          >
            週
          </Button>
          <Button
            variant={view === 'day' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setView('day')}
          >
            日
          </Button>
        </div>
      </div>

      {/* カレンダーヘッダー */}
      <Card>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            ← 前へ
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">
            2025年11月 {view === 'week' && '第2週'} {view === 'day' && '12日'}
          </h2>
          <Button variant="ghost" size="sm">
            次へ →
          </Button>
        </div>
      </Card>

      {/* 週表示 */}
      {view === 'week' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-2 bg-gray-50 w-16"></th>
                  {[10, 11, 12, 13, 14, 15, 16].map((day) => (
                    <th key={day} className="border border-gray-200 p-2 bg-gray-50">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          {daysOfWeek[new Date(`2025-11-${day}`).getDay()]}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">{day}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 2, 9, 14].map((hour) => (
                  <tr key={hour}>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-xs text-gray-600 text-center">
                      {hour}:00
                    </td>
                    {[10, 11, 12, 13, 14, 15, 16].map((day, idx) => (
                      <td key={day} className="border border-gray-200 p-1 min-h-20 align-top">
                        {hour === 2 && idx === 2 && (
                          <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1">
                            <p className="font-medium">データ同期</p>
                            <p className="text-xs">開発</p>
                          </div>
                        )}
                        {hour === 0 && idx === 2 && (
                          <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded mb-1">
                            <p className="font-medium">バックアップ</p>
                            <p className="text-xs">インフラ</p>
                          </div>
                        )}
                        {hour === 9 && idx === 1 && (
                          <div className="bg-green-100 text-green-800 text-xs p-1 rounded mb-1">
                            <p className="font-medium">レポート生成</p>
                            <p className="text-xs">営業</p>
                          </div>
                        )}
                        {hour === 14 && idx === 2 && (
                          <div className="bg-yellow-100 text-yellow-800 text-xs p-1 rounded mb-1">
                            <p className="font-medium">通知送信</p>
                            <p className="text-xs">営業</p>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 日表示 - タイムライン */}
      {view === 'day' && (
        <Card>
          <CardHeader title="2025年11月12日のスケジュール" />
          <div className="space-y-2">
            {mockJobs.slice(0, 5).map((job, idx) => (
              <div
                key={job.id}
                className="relative pl-8 pb-4 border-l-2 border-gray-300 last:border-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-primary-500 border-2 border-white"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{job.name}</p>
                    <p className="text-sm text-gray-500">{job.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-gray-700">{job.schedule}</p>
                    <Badge variant="info" className="mt-1">
                      予定
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 月表示 */}
      {view === 'month' && (
        <Card>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {daysOfWeek.map((day) => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div key={day} className="bg-white p-2 min-h-24">
                <p className="text-sm font-medium text-gray-900 mb-1">{day}</p>
                {day === 12 && (
                  <>
                    <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1">
                      データ同期
                    </div>
                    <div className="text-xs bg-purple-100 text-purple-800 rounded px-1 py-0.5 mb-1">
                      バックアップ
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 rounded px-1 py-0.5">
                      通知送信
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* スケジュール統計 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="本日の予定" />
          <p className="text-3xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-500 mt-1">件のジョブが実行予定</p>
        </Card>
        <Card>
          <CardHeader title="今週の予定" />
          <p className="text-3xl font-bold text-gray-900">87</p>
          <p className="text-sm text-gray-500 mt-1">件のジョブが実行予定</p>
        </Card>
        <Card>
          <CardHeader title="スケジュール競合" />
          <p className="text-3xl font-bold text-red-600">2</p>
          <p className="text-sm text-gray-500 mt-1">件の競合を検出</p>
        </Card>
      </div>
    </div>
  );
}
