import { FileX, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'file' | 'inbox';
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
  const Icon = icon === 'file' ? FileX : Inbox;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
