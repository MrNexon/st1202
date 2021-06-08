import { server } from '@prisma/client';

export interface ServerPublicInterface
  extends Omit<server, 'stat_url' | 'id'> {}
