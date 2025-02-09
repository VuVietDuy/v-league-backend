import { EventType } from '@prisma/client';

export class CreateEventDto {
  matchId: number;
  clubId?: any;
  playerId?: number;
  eventType: EventType;
  eventTime: number;
  assistId?: number;
}
