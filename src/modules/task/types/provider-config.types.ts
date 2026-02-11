import { Task } from '../entities/task.entity';

export type ProviderConfigMasked = {
  hasSecrets: boolean;
  masked: Record<string, string>;
};

export type TaskWithProviderMask = Task & {
  provider_config?: Record<string, unknown>;
  provider_config_masked?: ProviderConfigMasked;
};
