import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ServerService } from '../server/server.service';
const { MinecraftServerListPing } = require('minecraft-status');

@Injectable()
export class TaskService {
  constructor(private serverService: ServerService) {}

  @Cron('30 * * * * *')
  async handleCron() {
    const servers = await this.serverService.servers({});

    for (const server of servers) {
      const [ip, port] = server.stat_url.split(':');
      try {
        const response = await MinecraftServerListPing.ping(4, ip, port, 3000);
        if (response.players.max && response.players.online) {
          server.online = response.players.online;
          server.slots = response.players.max;
        }
      } catch (e) {
        server.online = 0;
        server.slots = 0;

        console.log(server);
        console.log(e);
      }

      await this.serverService.update(server);
    }
  }
}
