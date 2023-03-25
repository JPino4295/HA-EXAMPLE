import { captureAWSClient } from 'aws-xray-sdk';
import { Credentials } from 'aws-sdk/lib/core';
import S3 from 'aws-sdk/clients/s3';
import { Nullable } from '@src/domain/nullable';
import S3Config from '@src/infrastructure/persistence/s3/s3Config';

export default class S3ClientFactory {
    private static clients: { [key: string]: S3 } = {};

    static createClient(contextName: string, config: S3Config): S3 {
        let client = S3ClientFactory.getClient(contextName);

        if (!client) {
            client = S3ClientFactory.create(config);

            S3ClientFactory.registerClient(client, contextName);
        }

        return client;
    }

    private static getClient(contextName: string): Nullable<S3> {
        return S3ClientFactory.clients[contextName];
    }

    private static create(config: S3Config): S3 {
        const awsConfig = this.extractClientConfig(config),
            client = new S3(awsConfig);

        if (config.enableTracing) {
            captureAWSClient(client);
        }

        return client;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static extractClientConfig(config: S3Config): any {
        const {
                region, endpoint, accessKey, accessSecretKey, s3ForcePathStyle
            } = config,
            clientConfig = {};

        if (region) {
            Object.assign(clientConfig, { region });
        }

        if (endpoint) {
            Object.assign(clientConfig, { endpoint });
        }

        if (accessKey && accessSecretKey) {
            Object.assign(clientConfig, {
                credentials: new Credentials(accessKey, accessSecretKey)
            });
        }

        if (s3ForcePathStyle !== undefined) {
            Object.assign(clientConfig, { s3ForcePathStyle });
        }

        return Object.keys(clientConfig).length > 0 ? clientConfig : undefined;
    }

    private static registerClient(client: S3, contextName: string): void {
        S3ClientFactory.clients[contextName] = client;
    }
}
