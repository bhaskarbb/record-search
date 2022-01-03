import { Config } from '../types';
import { logger } from '../utils';

/**
 * Helper method to extract env variables
 * Stops the server if required env variables are missing
 */
export function getConfig(requiredConfig: string[]) {
  const config: Config = {};

  for (const key of requiredConfig) {
    const value = process.env[key];

    if (value === undefined) {
      logger.fatal(`Config Missing: ${key}`);
      return process.exit(1);
    }
    config[key] = value;
  }
  return config;
}
