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
  base64?: string;
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

export type InstanceConnectResponse = Qrcode;

export type InstanceLogoutResponse = {
  status: string;
  error: boolean;
  response: {
    message: string;
  };
};

export interface WebhookPayload {
  event: 'messages.upsert';
  instance: 'Business';
  data: {
    key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
    };
    pushName: string;
    status: string;
    message: {
      messageContextInfo: {
        deviceListMetadata: {
          senderKeyHash: string;
          senderTimestamp: string;
          recipientKeyHash: string;
          recipientTimestamp: string;
        };
        deviceListMetadataVersion: number;
        messageSecret: string;
      };
      conversation: string;
    };
    contextInfo: {
      expiration: number;
      ephemeralSettingTimestamp: string;
      entryPointConversionSource: string;
      entryPointConversionApp: string;
      entryPointConversionDelaySeconds: number;
      disappearingMode: {
        initiator: string;
        trigger: string;
      };
    };
    messageType: string;
    messageTimestamp: number;
    instanceId: string;
    source: string;
  };
  destination: string;
  date_time: string;
  sender: string;
  server_url: string;
  apikey: string;
}
