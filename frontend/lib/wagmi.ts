// lib/wagmi.ts
import { config } from './config';
import { getPublicClient } from 'wagmi/actions';

export const publicClient = getPublicClient(config);
