import { mockJobs } from '@/lib/mock-data';
import { JobDetailClient } from './JobDetailClient';

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find((j) => j.id === params.id) || mockJobs[0];

  return <JobDetailClient job={job} />;
}
