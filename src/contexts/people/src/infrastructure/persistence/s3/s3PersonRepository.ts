import PersonRepository from '@src/domain/personRepository';
import Person from '@src/domain/person';
// eslint-disable-next-line import/no-extraneous-dependencies
import S3 from 'aws-sdk/clients/s3';

export default class S3PersonRepository implements PersonRepository {
    readonly client: S3;

    readonly config: S3Config;

    constructor(client: S3, config: S3Config) {
        this.client = client;
        this.config = config;
    }

    save(person: Person): Promise<void> {
        await this.client.putObject({
            Body: JSON.stringify(person.toPrimitives()),
            Bucket: this.config.bucketName
        }).promise();
    }
}
