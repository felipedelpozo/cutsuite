import { MouseEvent } from 'react';
import { CircleX, Loader2, Unplug } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export enum AppStatus {
  CONNECT = 'CONNECT',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  LOADING = 'LOADING',
}

export type AppCardProps = {
  name: string;
  desc: string;
  logo: React.ReactNode;
  status: keyof typeof AppStatus;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const AppCard: React.FC<AppCardProps> = ({
  name,
  logo,
  desc,
  status,
  onClick,
}) => {
  const t = useTranslations('Dashboard.Apps');

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div
          className={`bg-muted flex size-10 items-center justify-center rounded-lg p-2`}
        >
          {logo}
        </div>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            status === AppStatus.CONNECT &&
              'border border-blue-300 bg-blue-50 text-blue-900 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50 dark:hover:bg-blue-900',
            status === AppStatus.CONNECTED &&
              'border border-red-300 bg-red-50 text-red-900 hover:bg-red-100 dark:border-red-700 dark:bg-red-950 dark:text-red-50 dark:hover:bg-red-900',
            status === AppStatus.DISCONNECTED &&
              'border border-red-300 bg-red-300 text-red-900 hover:bg-red-100 dark:border-red-300/90 dark:bg-red-950 dark:text-red-50 dark:hover:bg-red-900'
          )}
          disabled={status === AppStatus.LOADING}
          onClick={onClick}
        >
          {status === AppStatus.LOADING && <Loader2 className="animate-spin" />}
          {status === AppStatus.CONNECTED && <CircleX />}
          {status === AppStatus.DISCONNECTED && <Unplug />}
          {t(`AppStatus.${status}`)}
        </Button>
      </div>
      <div>
        <h2 className="mb-1 font-semibold">{name}</h2>
        <p className="line-clamp-2 text-gray-500">{desc}</p>
      </div>
    </>
  );
};

export default AppCard;
