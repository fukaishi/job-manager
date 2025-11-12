'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: '📊' },
  { name: 'ジョブ一覧', href: '/jobs', icon: '📋' },
  { name: '実行履歴', href: '/history', icon: '📜' },
  { name: '実行中ジョブ', href: '/monitoring', icon: '🔄' },
  { name: 'スケジュール', href: '/schedule', icon: '📅' },
  { name: 'チーム管理', href: '/teams', icon: '👥' },
  { name: '設定', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-600">ジョブ管理ツール</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
            山
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">山田太郎</p>
            <p className="text-xs text-gray-500">エンジニア</p>
          </div>
        </div>
      </div>
    </div>
  );
}
