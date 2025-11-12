'use client';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="max-w-lg">
            <div className="relative">
              <input
                type="search"
                placeholder="ジョブを検索..."
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <span className="text-xl">🔔</span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="text-xl">❓</span>
          </button>
        </div>
      </div>
    </header>
  );
}
