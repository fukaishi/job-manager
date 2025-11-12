import { mockExecutionHistory } from '@/lib/mock-data';
import { LogDetailClient } from './LogDetailClient';

export function generateStaticParams() {
  return mockExecutionHistory.map((execution) => ({
    id: execution.id,
  }));
}

export default function LogDetailPage({ params }: { params: { id: string } }) {
  const execution = mockExecutionHistory.find((e) => e.id === params.id) || mockExecutionHistory[0];

  return <LogDetailClient execution={execution} />;
}
