'use server';

import { getOrganization } from '@/lib/db/queries';
import { Organization } from '@/lib/db/schema/organizations';

export const fetchOrganization = async (): Promise<
  Organization | undefined
> => {
  return await getOrganization();
};
