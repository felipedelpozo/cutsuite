import { useEffect, useState } from 'react';
import { fetchOrganization } from '@/actions/organizations';
import { useIsMounted } from 'usehooks-ts';

import { Organization } from '@/lib/db/schema/organizations';

export function useOrganization(): Organization | undefined {
  const isMounted = useIsMounted();

  const [data, setData] = useState<Organization | undefined>(undefined);

  useEffect(() => {
    if (isMounted()) handleCheck();
  }, [isMounted]);

  const handleCheck = async () => {
    const result = await fetchOrganization();
    setData(result);
  };

  return data;
}
