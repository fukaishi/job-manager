import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold leading-none tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
