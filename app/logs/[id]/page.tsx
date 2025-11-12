import { mockExecutionHistory } from '@/lib/mock-data';
import { LogDetailClient } from './LogDetailClient';

export function generateStaticParams() {
  return mockExecutionHistory.map((execution) => ({
    id: execution.id,
  }));
}

export default async function LogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const execution = mockExecutionHistory.find((e) => e.id === id) || mockExecutionHistory[0];

  return <LogDetailClient execution={execution} />;
}
