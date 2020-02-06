# 🏭 serverless-dotenv

Auto-generate your dotenv configuration from serverless framework exports.

---

This CLI tool was created to assist when it came to deploying
applications using the serverless framework *and* attempting to
integrate it with a non-serverless based client-side application.

It means that you can:

- use the serverless framework to implement a multistack approach for
  your application
- get access to anything that you give a named export to in
  CloudFormation
- output that to a dotenv file that can be used when you build your
  client-side application

## Installation

Use yarn to either:

- add it to your projects
- install globally
- run via npx

```shell
# Install into local package.json
yarn add https://github.com/portablestudios/serverless-dotenv --dev

# Install globally
yarn global add https://github.com/portablestudios/serverless-dotenv

# Run via npx without installation
npx https://github.com/portablestudios/serverless-dotenv
```

## Usage

Create an `envMap.yml` file in your project that maps environment variables to the export names in your serverless stack. You can interpolate the stage value in these export names.

Example:

```yaml
USER_UPLOADS_S3_BUCKET: myapp-${stage}-user-uploads-bucket
COGNITO_USER_POOL: myapp-${stage}-cognito-user-pool
```

Run serverless-dotenv with the required options.

```shell
npx https://github.com/portablestudios/serverless-dotenv --stage {stage} --profile {profile} --region {region}
```

It will create a `dotenv` file suffixed with the stage which you can then use in your application build.

```env
USER_UPLOADS_S3_BUCKET: some-s3-bucket-name
COGNITO_USER_POOL: some-cognito-user-pool-arn
```

### Options

```shell
  --stage       The stage you have provided for your serverless deploy. [string] [required]
  --profile     Your AWS profile as stored in your AWS credentials. [string] [required]
  --region      The AWS region that you are deploying to. [string] [required]
  --envMapFile  This file should contain the mapping for ENV variables to CloudFormation exports that you wish to use. [string] [default: "envMap.yml"]
  --version     Show version number [boolean]
  --help        Show help [boolean]
```
