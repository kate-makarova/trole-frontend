export class CharacterField{
  id: number|string;
  field_name: string;
  value: string;

  constructor(id: number|string, field_name: string, value: string) {
    this.id = id;
    this.field_name = field_name;
    this.value = value;
  }
}
