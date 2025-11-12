import { mockJobs } from '@/lib/mock-data';
import { EditJobClient } from './EditJobClient';

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}

export default function EditJobPage() {
  return <EditJobClient />;
}
