import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification-use-case';

describe('[Send Notification]', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      category: 'Social',
      content: 'Voce tem uma solicitacao de amizade',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
