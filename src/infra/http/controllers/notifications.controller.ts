import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CountRecipientNotificationsUseCase } from './../../../app/use-cases/count-recipient-notifications-use-case';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification-use-case';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification-use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications-use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() data: CreateNotificationDTO) {
    const { category, content, recipientId } = data;

    const { notification } = await this.sendNotificationUseCase.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') id: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId: id,
    });

    return { count };
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') id: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId: id,
      });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }
}
