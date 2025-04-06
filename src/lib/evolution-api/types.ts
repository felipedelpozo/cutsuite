export interface Instance {
  instanceName: string;
  instanceId: string;
  integration: string;
  webhookWaBusiness: string | null;
  accessTokenWaBusiness: string;
  status: string;
}

export interface Settings {
  rejectCall: boolean;
  msgCall: string;
  groupsIgnore: boolean;
  alwaysOnline: boolean;
  readMessages: boolean;
  readStatus: boolean;
  syncFullHistory: boolean;
  wavoipToken: string;
}

export interface Qrcode {
  pairingCode: string | null;
  code: string;
  base64: string;
  count: number;
}

export interface InstanceCreateResponse {
  instance: Instance;
  hash: string;
  webhook: Record<string, unknown>;
  websocket: Record<string, unknown>;
  rabbitmq: Record<string, unknown>;
  sqs: Record<string, unknown>;
  settings: Settings;
  qrcode: Qrcode;
}

export interface InstanceConnectionState {
  instanceName: string;
  state: string;
}

export interface InstanceConnectionResponse {
  instance: InstanceConnectionState;
}

export interface InstanceConnectResponse {
  pairingCode: string;
  code: string;
  count: number;
}
