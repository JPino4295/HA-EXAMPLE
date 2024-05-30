import { Nullable } from '@context/shared/domain/nullable';
import Person from '@src/domain/person';

// Since the domain needs to be independent of the infrastructure, we use interfaces to define the repositories methods
interface PersonRepository {
    save(person: Person): Promise<void>;
    find(person: Person): Promise<Nullable<Person>>
}

export default PersonRepository;
