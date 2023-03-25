import NumberValueObject from '@context/shared/domain/numberValueObject';
import InvalidArgument from '@context/shared/domain/invalidArgument';

export default class PersonAge extends NumberValueObject {
    constructor(value: number) {
        // When the value must have more checks than the Value Object, we can add them here
        PersonAge.ensureAgeIsValid(value);

        super(value);
    }

    private static ensureAgeIsValid(value: number): void {
        if (value < 0) {
            throw new InvalidArgument('<PersonAge> does not allow negative values');
        }

        if (value > 120) {
            throw new InvalidArgument('<PersonAge> does not allow values greater than 120');
        }
    }
}
