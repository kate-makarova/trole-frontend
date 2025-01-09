import {CharacterSheetTemplateField} from "./CharacterSheetTemplateField";

export class CharacterSheetTemplate {
    id: number;
    game_id: number;
    fields: CharacterSheetTemplateField[];

    constructor(id: number, gameId: number, fields: CharacterSheetTemplateField[]) {
        this.id = id;
        this.game_id = gameId;
        this.fields = fields;
    }
}
