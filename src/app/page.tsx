import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">{t('title')}</h1>
        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link href="/dashboard">{t('goDashboard')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
