'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
    <div className="w-64 border-r bg-card flex flex-col h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          ジョブ管理ツール
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Job Management System</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t bg-muted/50">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
            山
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">山田太郎</p>
            <p className="text-xs text-muted-foreground">エンジニア</p>
          </div>
        </div>
      </div>
    </div>
  );
}
