/* eslint-disable no-underscore-dangle */
import S3 from 'aws-sdk/clients/s3';
import EnvironmentArranger from '@src/shared/infrastructure/arranger/environmentArranger';
import S3BucketConfig from '@src/shared/infrastructure/persistence/s3/s3BucketConfig';

export default class S3EnvironmentArranger extends EnvironmentArranger {
    private _client: S3;

    private config: S3BucketConfig;

    constructor(client: S3, config: S3BucketConfig) {
        super();

        this._client = client;
        this.config = config;
    }

    async arrange(): Promise<void> {
        await this.ensureBucketExists();
        await this.cleanBucket();
    }

    private async ensureBucketExists(): Promise<void> {
        if (await this.doesBucketExist()) {
            return;
        }

        const params = {
            Bucket: this.bucketname()
        };

        await this._client.createBucket(params).promise();
    }

    private async doesBucketExist(): Promise<boolean> {
        const response = await this._client.listBuckets().promise();

        return response.Buckets?.map(({ Name }) => Name).includes(this.bucketname()) || false;
    }

    protected async cleanBucket(): Promise<void> {
        const client = this.client(),
            params: S3.Types.ListObjectsV2Request = {
                Bucket: this.bucketname()
            };

        let response;

        do {
            if (response && response.NextContinuationToken) {
                params.ContinuationToken = response.NextContinuationToken;
            }

            // eslint-disable-next-line no-await-in-loop
            response = await client.listObjectsV2(params).promise();

            if (response.Contents?.length) {
                // eslint-disable-next-line no-await-in-loop
                await Promise.all(
                    response.Contents.map(({ Key }) => {
                        const delParams = {
                            Bucket: this.bucketname(),
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            Key: Key!
                        };

                        return client.deleteObject(delParams).promise();
                    })
                );
            }
        } while (response && response.NextContinuationToken);
    }

    protected client(): S3 {
        return this._client;
    }

    protected bucketname(): string {
        return this.config.bucketname;
    }

    async close(): Promise<void> {
        await this.cleanBucket();
    }
}
