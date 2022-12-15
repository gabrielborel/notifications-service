import { UnreadNotificationUseCase } from './unread-notification-use-case';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('[Unread Notification]', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();
    notification.read();

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(
      async () =>
        await unreadNotificationUseCase.execute({
          notificationId: 'fake-notification-id',
        }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
