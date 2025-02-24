import {CharacterField} from './CharacterField';
import {SimpleEntity} from './SimpleEntity';

export class CharacterSheet {
  character_id: number;
  fields: CharacterField[];
  user: SimpleEntity;
  can_edit: boolean;
  can_moderate: boolean;

  constructor(character_id: number, fields: CharacterField[], user: SimpleEntity,
              can_edit: boolean = false, can_moderate: boolean = false) {
    this.user = user;
    this.character_id = character_id;
    this.fields = fields;
    this.can_moderate = can_moderate;
    this.can_edit = can_edit;
  }
}
