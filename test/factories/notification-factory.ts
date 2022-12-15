import { Content } from '../../src/app/entities/content';
import { Notification } from '../../src/app/entities/notification';

type Override = Partial<Notification>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Test category',
    content: new Content('Test content'),
    recipientId: '1',
    ...override,
  });
}
