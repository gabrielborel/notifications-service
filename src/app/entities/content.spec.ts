import { Content } from './content';

describe('[Notification Content]', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Testando...');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 chars length', () => {
    expect(() => new Content('Tes')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 chars length', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
