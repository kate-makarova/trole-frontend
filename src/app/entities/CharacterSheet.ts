import {CharacterSheetField} from "./CharacterSheetField";

export class CharacterSheet {
    id: number;
    gameId: number;
    fields: CharacterSheetField[];

    constructor(id: number, gameId: number, fields: CharacterSheetField[]) {
        this.id = id;
        this.gameId = gameId;
        this.fields = fields;
    }
}