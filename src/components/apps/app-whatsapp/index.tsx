'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  fetchInstance,
  fetchInstanceStatus,
  instanceLogout,
} from '@/actions/evolution-api/instances';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { QRCodeSVG } from 'qrcode.react';
import { useInterval, useIsMounted } from 'usehooks-ts';

import { useOrganization } from '@/hooks/use-organization';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AppCard, { AppStatus } from '@/components/apps/app-card';

export const StatusMapping: Record<string, AppStatus> = {
  open: AppStatus.CONNECTED,
  close: AppStatus.CONNECT,
  connecting: AppStatus.CONNECT,
  error: AppStatus.CONNECT,
};

const AppWhatsApp = () => {
  const organization = useOrganization();
  const [status, setStatus] = useState<AppStatus>(AppStatus.LOADING);
  const [code, setCode] = useState<string | undefined>(undefined);
  const isMounted = useIsMounted();

  const handleCheck = useCallback(async () => {
    setCode(undefined);
    setStatus(AppStatus.LOADING);

    const result = await fetchInstanceStatus({
      name: String(organization?.id),
    });

    setStatus(StatusMapping[result.state]);
  }, [organization?.id]);

  useEffect(() => {
    if (isMounted() && organization) handleCheck();
  }, [handleCheck, isMounted, organization]);

  const handleClick = async () => {
    setStatus(AppStatus.LOADING);
    setCode(undefined);

    switch (status) {
      case AppStatus.CONNECT:
        const result = await fetchInstance({
          name: String(organization?.id),
        });

        setCode(
          result.state !== 'open' && result.code ? result.code : undefined
        );
        setStatus(StatusMapping[result.state]);
        break;
      case AppStatus.CONNECTED:
        const { status, error } = await instanceLogout({
          name: String(organization?.id),
        });
        setStatus(
          status === 'SUCCESS' && !error
            ? AppStatus.CONNECT
            : AppStatus.DISCONNECTED
        );
    }
  };

  useInterval(() => handleClick(), code !== undefined ? 10000 : null);

  return (
    <>
      <Sheet open={!!code} onOpenChange={handleCheck}>
        <SheetContent>
          <div className="mx-auto w-full max-w-sm">
            <SheetHeader>
              <SheetTitle>WhatsApp</SheetTitle>
              <SheetDescription>
                Escanea el código con tu teléfono para iniciar sesión
              </SheetDescription>
            </SheetHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <QRCodeSVG
                  value={code!}
                  size={256}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <AppCard
        name="WhatsApp"
        logo={<IconBrandWhatsapp />}
        desc="Easily integrate WhatsApp for direct messaging."
        onClick={handleClick}
        status={status}
      />
    </>
  );
};

export default AppWhatsApp;
