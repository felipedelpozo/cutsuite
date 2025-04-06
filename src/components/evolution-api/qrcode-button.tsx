'use client';

import { useState } from 'react';
import { fetchInstance } from '@/actions/evolution-api/instances';
import { QRCodeSVG } from 'qrcode.react';

import { useSession } from '@/lib/auth/client';
import { Dialog, DialogContent } from '@/components/ui//dialog';
import { Button } from '@/components/ui/button';

export function EvolutionApiQrbuttonButton(
  props: React.ComponentProps<'button'>
) {
  const { data: session } = useSession();
  const [isPending, setIsPending] = useState<boolean>(session ? true : false);
  const [code, setCode] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    setIsPending(true);
    try {
      const result = await fetchInstance({
        name: 'Bussiness2',
      });

      setCode(result.code ?? undefined);
      return result;
    } catch (error) {
      console.error('Error creating instance:', error);
    }
  };

  return (
    <>
      <Dialog open={!!code}>
        <DialogContent className="sm:max-w-md">
          <QRCodeSVG value={code!} />
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
