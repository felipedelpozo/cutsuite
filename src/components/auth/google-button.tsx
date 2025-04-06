'use client';

import { useState } from 'react';
import { IconBrandGoogleFilled } from '@tabler/icons-react';

import { signIn } from '@/lib/auth/client';
import { fetchCallback } from '@/lib/auth/utils';
import { Button } from '@/components/ui/button';

export function GoogleButton(props: React.ComponentProps<'button'>) {
  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <Button
      variant="outline"
      className="w-full"
      {...props}
      disabled={isPending}
      onClick={async () => {
        await signIn.social(
          {
            provider: 'google',
            callbackURL: '/dashboard',
          },
          fetchCallback({ setIsPending })
        );
      }}
    >
      <IconBrandGoogleFilled />
      Login with Google
    </Button>
  );
}
