import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification-use-case';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
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
}
