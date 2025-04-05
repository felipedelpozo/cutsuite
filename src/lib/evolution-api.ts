import EvolutionAPI from 'evolution-api-client';
import { Config } from 'evolution-api-client/config';

import env from '@/lib/env';

const config = new Config(env.EVOLUTION_API_URL, env.EVOLUTION_API_KEY);
export const api = new EvolutionAPI(config);
