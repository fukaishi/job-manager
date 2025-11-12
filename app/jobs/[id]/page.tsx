import { mockJobs } from '@/lib/mock-data';
import { JobDetailClient } from './JobDetailClient';

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];

  return <JobDetailClient job={job} />;
}
