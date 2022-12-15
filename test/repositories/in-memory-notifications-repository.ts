import { Notification } from 'src/app/entities/notification';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    return this.notifications.find((n) => n.id === notificationId) ?? null;
  }

  async save(notification: Notification): Promise<void> {
    this.notifications.map((n) =>
      n.id === notification.id ? notification : n,
    );
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }
}
