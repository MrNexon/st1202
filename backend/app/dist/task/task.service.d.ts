import { ServerService } from '../server/server.service';
export declare class TaskService {
    private serverService;
    constructor(serverService: ServerService);
    handleCron(): Promise<void>;
}
