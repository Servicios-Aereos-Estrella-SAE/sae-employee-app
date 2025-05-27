export class ActiveVO {
  constructor(private readonly active: number) {}

  value(): boolean {
    return this.active === 1
  }
}
