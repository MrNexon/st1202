import {Server} from '../type/server.type';

export interface ServerPublicInterface
  extends Omit<Server, 'stat_url' | 'id'> {}
