'use client';

import { useState } from 'react';

import { api } from '@/lib/evolution-api';
import { Button } from '@/components/ui/button';

export function EvolutionApiQrbuttonButton(
  props: React.ComponentProps<'button'>
) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleClick = async () => {
    setIsPending(true);
    try {
      const result = await api.createInstance({
        instanceName: 'my-instance',
        qrcode: true,
      });
      console.log('Instance created:', result);
      return result;
    } catch (error) {
      console.error('Error creating instance:', error);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      {...props}
      disabled={isPending}
      onClick={handleClick}
    >
      Qr code
    </Button>
  );
}
