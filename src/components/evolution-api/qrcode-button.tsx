'use client';

import { useState } from 'react';
import { fetchInstance } from '@/actions/evolution-api/instances';
import { QRCodeSVG } from 'qrcode.react';
import { useInterval } from 'usehooks-ts';

import { useSession } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function EvolutionApiQrbuttonButton(
  props: React.ComponentProps<'button'>
) {
  const { data: session } = useSession();
  const [isPending, setIsPending] = useState<boolean>(session ? true : false);
  const [code, setCode] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    setIsPending(true);
    const result = await fetchInstance({
      name: 'Bussiness2',
    });

    setCode(result.state !== 'open' && result.code ? result.code : undefined);
  };

  useInterval(() => handleClick(), code !== undefined ? 10000 : null);

  return (
    <>
      <Dialog open={!!code}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Qr</DialogTitle>
          </DialogHeader>
          <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
            <QRCodeSVG value={code!} size={256} />
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        className="w-full"
        {...props}
        disabled={isPending}
        onClick={handleClick}
      >
        Qr code
      </Button>
    </>
  );
}
