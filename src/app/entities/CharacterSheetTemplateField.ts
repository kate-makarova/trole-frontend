import {SimpleEntity} from "./SimpleEntity";

export class CharacterSheetTemplateField {
    id: number|string;
    characterSheetId: number;
    field_name: string;
    description: string;
    type: number;
    is_required: boolean;
    options: SimpleEntity[] = [];

    constructor(id: number, characterSheetId: number, fieldName: string, description: string, type: number, is_required: boolean, options: SimpleEntity[] = []) {
        this.id = id;
        this.characterSheetId = characterSheetId;
        this.field_name = fieldName;
        this.description = description;
        this.type = type;
        this.is_required = is_required;
        this.options = options;
    }
}
