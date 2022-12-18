import { SendNotificationUseCase } from '@app/use-cases/send-notification-use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotificationUseCase],
  controllers: [NotificationsController],
})
export class MessagingModule {}
