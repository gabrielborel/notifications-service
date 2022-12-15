import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications-use-case';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('[Count Recipient Notifications]', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-two' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: 'test-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
