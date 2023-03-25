/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import { DynamoDBStreamEvent, DynamoDBRecord, AttributeValue } from 'aws-lambda';
import { Converter } from 'aws-sdk/clients/dynamodb';

export default abstract class DynamodbStreamDeserializer {
    protected abstract getSerializedData(record: DynamoDBRecord): Record<string, AttributeValue> | undefined;

    protected deserialize(attributes: Record<string, AttributeValue>): Record<string, any> {
        return Converter.unmarshall(attributes);
    }

    run(event: DynamoDBStreamEvent) {
        return event.Records.reduce((acc, record) => {
            // eslint-disable-next-line one-var
            const dataToDeserialize = this.getSerializedData(record) ?? {},
                data = this.deserialize(dataToDeserialize);

            acc.push(data);

            return acc;
        }, [] as Array<Record<string, any>>);
    }
}
