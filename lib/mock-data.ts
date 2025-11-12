export interface Job {
  id: string;
  name: string;
  description: string;
  team: string;
  tags: string[];
  schedule: string;
  lastExecutionTime: string;
  lastExecutionStatus: 'success' | 'failed' | 'running' | 'pending';
  nextExecutionTime: string;
  status: 'enabled' | 'disabled';
  executionType: 'python' | 'shell';
  scriptPath: string;
  timeout: number;
  retryCount: number;
}

export interface ExecutionHistory {
  id: string;
  jobId: string;
  jobName: string;
  team: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'success' | 'failed' | 'running' | 'cancelled';
  executor: string;
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
  jobCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'engineer' | 'sales';
  team: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    name: 'データ同期ジョブ',
    description: '日次でデータベースを同期',
    team: '開発チーム',
    tags: ['データ', '日次'],
    schedule: '0 2 * * *',
    lastExecutionTime: '2025-11-12 02:00:00',
    lastExecutionStatus: 'success',
    nextExecutionTime: '2025-11-13 02:00:00',
    status: 'enabled',
    executionType: 'python',
    scriptPath: '/scripts/sync_data.py',
    timeout: 60,
    retryCount: 3,
  },
  {
    id: '2',
    name: 'レポート生成',
    description: '週次売上レポートを生成',
    team: '営業チーム',
    tags: ['レポート', '週次'],
    schedule: '0 9 * * 1',
    lastExecutionTime: '2025-11-11 09:00:00',
    lastExecutionStatus: 'success',
    nextExecutionTime: '2025-11-18 09:00:00',
    status: 'enabled',
    executionType: 'python',
    scriptPath: '/scripts/generate_report.py',
    timeout: 30,
    retryCount: 2,
  },
  {
    id: '3',
    name: 'バックアップジョブ',
    description: 'データベースのバックアップ',
    team: 'インフラチーム',
    tags: ['バックアップ', '日次'],
    schedule: '0 0 * * *',
    lastExecutionTime: '2025-11-12 00:00:00',
    lastExecutionStatus: 'failed',
    nextExecutionTime: '2025-11-13 00:00:00',
    status: 'enabled',
    executionType: 'shell',
    scriptPath: '/scripts/backup.sh',
    timeout: 120,
    retryCount: 3,
  },
  {
    id: '4',
    name: 'データクリーニング',
    description: '古いデータを削除',
    team: '開発チーム',
    tags: ['クリーニング', '週次'],
    schedule: '0 3 * * 0',
    lastExecutionTime: '2025-11-10 03:00:00',
    lastExecutionStatus: 'success',
    nextExecutionTime: '2025-11-17 03:00:00',
    status: 'enabled',
    executionType: 'python',
    scriptPath: '/scripts/clean_data.py',
    timeout: 45,
    retryCount: 2,
  },
  {
    id: '5',
    name: '通知送信',
    description: 'ユーザーに通知を送信',
    team: '営業チーム',
    tags: ['通知', '時間毎'],
    schedule: '0 * * * *',
    lastExecutionTime: '2025-11-12 14:00:00',
    lastExecutionStatus: 'running',
    nextExecutionTime: '2025-11-12 15:00:00',
    status: 'enabled',
    executionType: 'python',
    scriptPath: '/scripts/send_notifications.py',
    timeout: 15,
    retryCount: 1,
  },
];

export const mockExecutionHistory: ExecutionHistory[] = [
  {
    id: 'exec-1',
    jobId: '1',
    jobName: 'データ同期ジョブ',
    team: '開発チーム',
    startTime: '2025-11-12 02:00:00',
    endTime: '2025-11-12 02:15:23',
    duration: 923,
    status: 'success',
    executor: '自動',
  },
  {
    id: 'exec-2',
    jobId: '2',
    jobName: 'レポート生成',
    team: '営業チーム',
    startTime: '2025-11-11 09:00:00',
    endTime: '2025-11-11 09:12:45',
    duration: 765,
    status: 'success',
    executor: '自動',
  },
  {
    id: 'exec-3',
    jobId: '3',
    jobName: 'バックアップジョブ',
    team: 'インフラチーム',
    startTime: '2025-11-12 00:00:00',
    endTime: '2025-11-12 00:45:12',
    duration: 2712,
    status: 'failed',
    executor: '自動',
  },
  {
    id: 'exec-4',
    jobId: '1',
    jobName: 'データ同期ジョブ',
    team: '開発チーム',
    startTime: '2025-11-11 02:00:00',
    endTime: '2025-11-11 02:14:56',
    duration: 896,
    status: 'success',
    executor: '自動',
  },
  {
    id: 'exec-5',
    jobId: '5',
    jobName: '通知送信',
    team: '営業チーム',
    startTime: '2025-11-12 14:00:00',
    endTime: '',
    duration: 0,
    status: 'running',
    executor: '自動',
  },
];

export const mockTeams: Team[] = [
  { id: '1', name: '開発チーム', memberCount: 12, jobCount: 25 },
  { id: '2', name: '営業チーム', memberCount: 8, jobCount: 15 },
  { id: '3', name: 'インフラチーム', memberCount: 5, jobCount: 18 },
  { id: '4', name: 'マーケティングチーム', memberCount: 6, jobCount: 10 },
];

export const mockCurrentUser: User = {
  id: 'user-1',
  name: '山田太郎',
  email: 'yamada@example.com',
  role: 'engineer',
  team: '開発チーム',
};

export const mockLogs = `[2025-11-12 02:00:00] INFO: Starting data sync job
[2025-11-12 02:00:01] INFO: Connecting to database...
[2025-11-12 02:00:02] INFO: Connection established
[2025-11-12 02:00:03] INFO: Fetching records...
[2025-11-12 02:00:15] INFO: Retrieved 10,523 records
[2025-11-12 02:00:16] INFO: Processing records...
[2025-11-12 02:05:23] INFO: Processed 5,000 records
[2025-11-12 02:10:45] INFO: Processed 10,000 records
[2025-11-12 02:15:12] INFO: All records processed successfully
[2025-11-12 02:15:20] INFO: Syncing with target database...
[2025-11-12 02:15:23] INFO: Sync completed successfully
[2025-11-12 02:15:23] INFO: Job completed`;
