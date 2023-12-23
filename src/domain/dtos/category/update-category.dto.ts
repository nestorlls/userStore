export class UpdateCategoryDto {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly available?: boolean
  ) {}

  get values() {
    const currentValues: { [key: string]: any } = {};
    if (this.name) currentValues.name = this.name;
    if (this.available) currentValues.available = this.available;
    return currentValues;
  }

  static create(obj: { [key: string]: any }): [string?, UpdateCategoryDto?] {
    const { id, name, available } = obj;

    if (!id) return ['Missing id'];

    return [undefined, new UpdateCategoryDto(id, name, available)];
  }
}
