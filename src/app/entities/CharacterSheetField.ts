import {SimpleEntity} from "./SimpleEntity";

export class CharacterSheetField {
    id: number;
    characterSheetId: number;
    fieldName: string;
    description: string;
    type: number;
    is_required: boolean;
    options: SimpleEntity[];

    constructor(id: number, characterSheetId: number, fieldName: string, description: string, type: number, is_required: boolean, options: SimpleEntity[]) {
        this.id = id;
        this.characterSheetId = characterSheetId;
        this.fieldName = fieldName;
        this.description = description;
        this.type = type;
        this.is_required = is_required;
        this.options = options;
    }
}