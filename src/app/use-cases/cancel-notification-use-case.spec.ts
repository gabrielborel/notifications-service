import { CancelNotificationUseCase } from './cancel-notification-use-case';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('[Cancel Notification]', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(
      async () =>
        await cancelNotificationUseCase.execute({
          notificationId: 'fake-notification-id',
        }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
