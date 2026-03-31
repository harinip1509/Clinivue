import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-[#ef4444]" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-[#14b8a6] hover:bg-[#0f766e] text-white">
          Try Again
        </Button>
      )}
    </div>
  );
}
