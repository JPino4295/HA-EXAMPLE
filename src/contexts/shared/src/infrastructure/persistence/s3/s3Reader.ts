/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import S3 from 'aws-sdk/clients/s3';
import { Nullable } from '@src/shared/domain/nullable';
import S3BucketConfig from '@src/shared/infrastructure/persistence/s3/s3BucketConfig';
import { Readable } from 'stream';

export default class S3Reader {
    private client: S3;

    protected readonly config: S3BucketConfig;

    constructor(client: S3, config: S3BucketConfig) {
        this.client = client;
        this.config = config;
    }

    getReadstream(url: string): Readable {
        const params = S3Reader.parseS3Url(url);

        return this.client.getObject(params).createReadStream();
    }

    async byUrl(url: string): Promise<Nullable<{ body: Buffer; metadata?: Record<string, string> }>> {
        const metadata = await this.getMetadata(url);

        if (!metadata) {
            return null;
        }

        // eslint-disable-next-line one-var
        const body = await this.getBodyAsBuffer(url);

        return { body, metadata: Object.keys(metadata).length > 0 ? metadata : undefined };
    }

    async getMetadata(url: string): Promise<Nullable<Record<string, string>>> {
        try {
            const params = S3Reader.parseS3Url(url),
                { Metadata } = await this.client.headObject(params).promise();

            return S3Reader.toCamelcase(Metadata) || {};
        } catch (e: any) {
            if (e.code === 'NotFound') {
                return null;
            }

            throw e;
        }
    }

    private static toCamelcase(metadata?: Record<string, string>): Record<string, string> | undefined {
        if (!metadata) {
            return undefined;
        }

        const camelcase: any = {};

        Object.entries(metadata).forEach(([key, value]) => {
            const camelcaseKey = key.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

            camelcase[camelcaseKey] = value;
        });

        return camelcase;
    }

    private async getBodyAsBuffer(url: string): Promise<Buffer> {
        const params = S3Reader.parseS3Url(url),
            { Body } = await this.client.getObject(params).promise();

        return Buffer.from(Body as any);
    }

    private static parseS3Url(url: string): { Bucket: string; Key: string } {
        const { hostname, pathname } = new URL(url);

        return { Bucket: hostname, Key: pathname.substring(1) };
    }
}
