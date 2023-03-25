type S3Config = {
    region?: string;
    endpoint?: string;
    accessKey?: string;
    accessSecretKey?: string;
    s3ForcePathStyle?: boolean;
    enableTracing?: boolean;
};

export default S3Config;
