import { Server } from '@prisma/client';

export interface ServerPublicInterface
  extends Omit<Server, 'stat_url' | 'id'> {}
