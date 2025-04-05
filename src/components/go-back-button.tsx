'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export type GoBackButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export default function GoBackButton(props: GoBackButtonProps) {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={(event) => {
        router.back();
        props.onClick?.(event);
      }}
    />
  );
}
