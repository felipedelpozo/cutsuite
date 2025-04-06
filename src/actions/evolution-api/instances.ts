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
    const {
      data: { instance },
    } = await api.instanceConnectionState(name);

    if (instance.state === 'open') {
      return instance;
    }

    const { data } = await api.instanceConnect(name);
    return {
      instanceName: name,
      state: 'connecting',
      code: data.code,
    };
  } catch {
    try {
      const { data } = await api.instanceCreate(name, true);
      return {
        instanceName: data.instance.instanceName,
        state: data.instance.status,
        code: data.qrcode.code,
      };
    } catch (error) {
      console.log({ error });
    }
  }
};
