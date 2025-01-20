import {CharacterField} from './CharacterField';
import {SimpleEntity} from './SimpleEntity';

export class CharacterSheet {
  character_id: number;
  fields: CharacterField[];
  user: SimpleEntity;

  constructor(character_id: number, fields: CharacterField[], user: SimpleEntity) {
    this.user = user;
    this.character_id = character_id;
    this.fields = fields;
  }
}
