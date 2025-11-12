'use client';

import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockTeams } from '@/lib/mock-data';
import { useState } from 'react';

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">チーム管理</h1>
          <p className="text-gray-600 mt-1">チームとメンバーを管理</p>
        </div>
        <Button>+ 新規チーム</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* チーム一覧 */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="チーム一覧" />
            <div className="space-y-2">
              {mockTeams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTeam.id === team.id
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{team.name}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>👥 {team.memberCount}人</span>
                    <span>📋 {team.jobCount}ジョブ</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* チーム詳細 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTeam.name}</h2>
                <p className="text-gray-600">チームID: {selectedTeam.id}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  編集
                </Button>
                <Button variant="danger" size="sm">
                  削除
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">メンバー数</p>
                <p className="text-3xl font-bold text-blue-900">{selectedTeam.memberCount}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">管理ジョブ数</p>
                <p className="text-3xl font-bold text-green-900">{selectedTeam.jobCount}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">実行中</p>
                <p className="text-3xl font-bold text-purple-900">2</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="メンバー一覧"
              action={
                <Button size="sm" variant="secondary">
                  + メンバー追加
                </Button>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      名前
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      メールアドレス
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      権限
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      アクション
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      name: '山田太郎',
                      email: 'yamada@example.com',
                      role: 'エンジニア',
                    },
                    {
                      name: '佐藤花子',
                      email: 'sato@example.com',
                      role: 'エンジニア',
                    },
                    {
                      name: '鈴木一郎',
                      email: 'suzuki@example.com',
                      role: '管理者',
                    },
                  ].map((member, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{member.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{member.role}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            編集
                          </Button>
                          <Button size="sm" variant="ghost">
                            削除
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader title="権限設定" />
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">エンジニア</h4>
                <div className="space-y-2 pl-4">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-700">ジョブの作成・編集・削除</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-700">ジョブの実行</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-700">ログの閲覧</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">営業</h4>
                <div className="space-y-2 pl-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">ジョブの作成・編集・削除</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-700">ジョブの実行</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-700">ログの閲覧</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="通知設定" />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slackチャンネル
                </label>
                <input
                  type="text"
                  defaultValue="#dev-alerts"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メール通知先
                </label>
                <input
                  type="email"
                  defaultValue="dev-team@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">ジョブ失敗時に通知</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">ジョブ成功時に通知</span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
