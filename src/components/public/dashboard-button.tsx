import { headers } from 'next/headers';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export type GoBackButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export default async function DashboardButton(props: GoBackButtonProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const t = await getTranslations('HomePage');

  return (
    <Button asChild {...props}>
      <>
        {session && <Link href="/dashboard">{t('goDashboard')}</Link>}
        {!session && <Link href="/login">{t('goSignIn')}</Link>}
      </>
    </Button>
  );
}
