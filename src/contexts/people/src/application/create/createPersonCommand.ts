import Command from '@context/shared/domain/commandBus/command';

export type CreatePersonCommandParams = {
    name: string;
    surname: string;
    age: number;
    street?: string;
    country: string;
    city: string;
}

export default class CreatePersonCommand extends Command {
    readonly name: string;

    readonly surname: string;

    readonly age: number;

    readonly street?: string;

    readonly country: string;

    readonly city: string;

    constructor(params: CreatePersonCommandParams) {
        super();

        this.name = params.name;
        this.surname = params.surname;
        this.age = params.age;
        this.street = params.street;
        this.country = params.country;
        this.city = params.city;
    }
}
