import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {NgForOf} from "@angular/common";
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleEntity} from "../../entities/SimpleEntity";
import {UserService} from "../../services/user/user.service";
import {SingleSocketChatService} from "../../services/single-socket-chat/single-socket-chat.service";

@Component({
  selector: 'app-chat-form',
    imports: [
        AutocompleteLibModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.css'
})
export class ChatFormComponent {
    private formBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        name: ['', Validators.required],
        participants: this.formBuilder.array([]),
    });
    @Output('close') closeEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output('submit') submitEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor(private singleSocketChatService: SingleSocketChatService,
                private userService: UserService) {
    }

    get users() {
        return this.form.get('participants') as FormArray;
    }

    addUser() {
        this.users.push(this.formBuilder.control(''));
    }

    keywordUser = 'name';
    dataUser: SimpleEntity[] = [];

    selectUserEvent(event: any) {
        // @ts-ignore
        let users = this.form.getRawValue().users.filter((f) => f !== null && f !== undefined && f.id !== undefined);
        users.push(event);
    }

    onChangeUserSearch(val: string) {
        if (val.length < 3) return;
        this.userService.userAutocomplete(val).subscribe(data => {
            this.dataUser = data;
        })
    }

    onSubmit() {
        this.singleSocketChatService.create(this.form.value)
    }

    cancel() {
        this.closeEmitter.emit(true)
    }
}
