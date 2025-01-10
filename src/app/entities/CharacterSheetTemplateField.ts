import {SimpleEntity} from "./SimpleEntity";

export class CharacterSheetTemplateField {
    id: number|string;
    characterSheetId: number;
    field_name: string;
    description: string;
    type: number;
    is_required: boolean;
    order: number;
    is_active: boolean;
    options: SimpleEntity[] = [];

    constructor(id: number, characterSheetId: number, fieldName: string, description: string, is_active: boolean = true,
                type: number, is_required: boolean, options: SimpleEntity[] = [], order: number) {
        this.id = id;
        this.characterSheetId = characterSheetId;
        this.field_name = fieldName;
        this.description = description;
        this.type = type;
        this.is_required = is_required;
        this.options = options;
        this.order = order;
        this.is_active = is_active;
    }
}
