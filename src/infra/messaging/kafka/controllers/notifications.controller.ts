import { SendNotificationUseCase } from '@app/use-cases/send-notification-use-case';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() payload: SendNotificationPayload) {
    const { category, content, recipientId } = payload;

    await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
  }
}
