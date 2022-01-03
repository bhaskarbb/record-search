import { getConfig } from '../utils';

const REQUIRED_CONFIG = ['MONGO_URI'];

export const MONGO_CONFIG = getConfig(REQUIRED_CONFIG);
