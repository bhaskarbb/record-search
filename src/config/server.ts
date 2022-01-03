import { getConfig } from '../utils';

const REQUIRED_CONFIG = ['PORT', 'BODY_LIMIT', 'CORS_ORIGIN', 'CORS_METHODS'];

export const SERVER_CONFIG = getConfig(REQUIRED_CONFIG);
