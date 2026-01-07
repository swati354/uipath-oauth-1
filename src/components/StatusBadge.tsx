import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';
interface StatusBadgeProps {
  status: 'Available' | 'Running' | 'Failed' | 'Stopped' | 'Pending';
  className?: string;
}
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return {
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
          icon: 'text-green-600'
        };
      case 'running':
        return {
          variant: 'default' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
          icon: 'text-yellow-600'
        };
      case 'failed':
        return {
          variant: 'default' as const,
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
          icon: 'text-red-600'
        };
      case 'stopped':
        return {
          variant: 'default' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100',
          icon: 'text-gray-600'
        };
      case 'pending':
        return {
          variant: 'default' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100',
          icon: 'text-blue-600'
        };
      default:
        return {
          variant: 'default' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100',
          icon: 'text-gray-600'
        };
    }
  };
  const config = getStatusConfig(status);
  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${className} gap-1 font-medium`}
    >
      <Circle className={`h-2 w-2 fill-current ${config.icon}`} />
      {status}
    </Badge>
  );
}