import { GetRecipientNotificationsUseCase } from './get-recipient-notifications-use-case';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('[Get Recipient Notifications]', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id' }),
    );

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: 'test-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'test-recipient-id' }),
        expect.objectContaining({ recipientId: 'test-recipient-id' }),
      ]),
    );
  });
});
