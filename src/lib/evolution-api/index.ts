import axios, { AxiosResponse } from 'axios';

import env from '@/lib/env';
import {
  InstanceConnectionResponse,
  InstanceConnectResponse,
  InstanceCreateResponse,
  InstanceLogoutResponse,
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
  instanceName: string,
  qrcode?: boolean
): Promise<AxiosResponse<InstanceCreateResponse>> => {
  return api.post<InstanceCreateResponse>('/instance/create', {
    instanceName,
    qrcode: qrcode ?? false,
    integration: 'WHATSAPP-BAILEYS',
  });
};

export const instanceConnect = async (
  name: string
): Promise<AxiosResponse<InstanceConnectResponse>> => {
  return api.get<InstanceConnectResponse>(`/instance/connect/${name}`);
};

export const instanceLogout = async (
  name: string
): Promise<AxiosResponse<InstanceLogoutResponse>> => {
  return api.delete<InstanceLogoutResponse>(`/instance/logout/${name}`);
};

export const sendText = async ({
  instanceName,
  number,
  text,
}: {
  instanceName: string;
  number: string;
  text: string;
}): Promise<AxiosResponse<unknown>> => {
  return api.post<unknown>(`/message/sendText/${instanceName}`, {
    number,
    text,
  });
};

export default api;
