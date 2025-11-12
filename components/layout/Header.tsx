'use client';

import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="search"
              placeholder="ジョブを検索..."
              className={cn(
                "w-full h-10 px-4 pl-10 pr-4 text-sm rounded-md border border-input bg-background",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "placeholder:text-muted-foreground"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-muted-foreground">🔍</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={cn(
            "relative p-2.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          )}>
            <span className="text-xl">🔔</span>
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-destructive ring-2 ring-background"></span>
          </button>
          <button className={cn(
            "p-2.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          )}>
            <span className="text-xl">❓</span>
          </button>
        </div>
      </div>
    </header>
  );
}
