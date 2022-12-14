import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification-use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async create(@Body() data: CreateNotificationDTO) {
    const { category, content, recipientId } = data;

    const { notification } = await this.sendNotificationUseCase.execute({
      category,
      content,
      recipientId,
    });

    return { notification };
  }
}
