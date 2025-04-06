import axios, { AxiosResponse } from 'axios';

import env from '@/lib/env';
import {
  EvolutionApiResponse,
  InstanceConnectionResponse,
} from '@/lib/evolution-api/types';

const api = axios.create({
  baseURL: env.EVOLUTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    apikey: env.EVOLUTION_API_KEY,
  },
});

export const instanceConnectionState = async (
  name: string
): Promise<AxiosResponse<InstanceConnectionResponse>> => {
  return api.get<InstanceConnectionResponse>(
    `/instance/connectionState/${name}`
  );
};

export const instanceCreate = async (
  name: string,
  qrcode?: boolean
): Promise<AxiosResponse<EvolutionApiResponse>> => {
  return api.post<EvolutionApiResponse>('/instance/create', {
    name,
    qrcode: qrcode || false,
  });
};

export default api;
