import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { ErrorPage } from '@/components/error-page';
import GoBackButton from '@/components/go-back-button';

export default async function NotFound() {
  const t = await getTranslations('ErrorPage');

  return (
    <ErrorPage
      code="404"
      message={t('404.title')}
      description={t('404.description')}
    >
      <GoBackButton variant="outline">{t('goBack')}</GoBackButton>
      <Button asChild>
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </ErrorPage>
  );
}
