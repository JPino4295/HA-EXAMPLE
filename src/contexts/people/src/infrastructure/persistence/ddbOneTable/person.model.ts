import { OneModel } from 'dynamodb-onetable';

const model = {
    pk: { type: String, value: '${name}:${surname}' },
    sk: { type: String, value: 'Person' },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    street: { type: String, required: false },
    country: { type: String, required: true },
    city: { type: String, required: true }
} as OneModel;

export default model;
