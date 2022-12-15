import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications-use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification-use-case';
import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification-use-case';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
