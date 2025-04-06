'use server';

import * as api from '@/lib/evolution-api';

type FetchInstanceResponse = {
  instanceName: string;
  state: string;
  code?: string;
};

export const fetchInstance = async ({
  name,
}: {
  name: string;
}): Promise<FetchInstanceResponse> => {
  try {
    const { data } = await api.instanceConnectionState(name);
    return data.instance;
  } catch {
    const { data } = await api.instanceCreate(name);
    return {
      instanceName: data.instance.instanceName,
      state: data.instance.status,
      code: data.qrcode.code,
    };
  }
};
