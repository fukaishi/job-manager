import { mockJobs } from '@/lib/mock-data';

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}

export default function EditJobPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">ジョブ編集</h1>
      <p className="text-gray-600 mt-2">新規登録画面と同様のフォームがここに表示されます</p>
    </div>
  );
}
