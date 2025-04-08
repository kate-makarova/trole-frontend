import {SimpleUser} from "./SimpleUser";

export class Invitation {
    key: string;
    sender: SimpleUser;
    expirationDate: Date;
    accepted: boolean;
    receiverEmail: string;

    constructor(
        key: string,
        sender: SimpleUser,
        expirationDate: Date,
        accepted: boolean,
        receiverEmail: string
    ) {
        this.key = key;
        this.expirationDate = expirationDate;
        this.receiverEmail = receiverEmail;
        this.accepted = accepted;
        this.sender = sender;
    }
}