import Person from '@src/domain/person';

export default class PersonNotFoundError extends Error {
    constructor(person: Person) {
        super(`Person with name <${person.name.value}> and surname <${person.surname.value}> does not exist`);
    }
}
