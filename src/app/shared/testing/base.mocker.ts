export abstract class BaseMocker {

  static generateBoolean(): boolean {
    return Math.random() > .5;
  }

  static generateInt(max = 1000): number {
    return Math.floor(Math.random() * max) + 1;
  }

  static generateFloat(max = 1000): number {
    return (Math.random() * max) + 1;
  }

  static generateUrl(): string {
    const path = Math.random().toString(36).substring(7);
    return `${path}.fake`;
  }
}
