"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listr_1 = __importDefault(require("listr"));
const yargs_1 = __importDefault(require("yargs"));
const aws_1 = require("./aws");
const envMap_1 = require("./envMap");
function args(cliArgs) {
    const options = yargs_1.default
        .option('stage', {
        demandOption: true,
        describe: 'The stage you have provided for your serverless deploy.',
        requiresArg: true,
        type: 'string'
    })
        .option('profile', {
        demandOption: true,
        describe: 'Your AWS profile as stored in your AWS credentials.',
        requiresArg: true,
        type: 'string'
    })
        .option('region', {
        demandOption: true,
        describe: 'The AWS region that you are deploying to.',
        requiresArg: true,
        type: 'string'
    })
        .option('envMapFile', {
        default: 'envMap.yml',
        describe: 'This file should contain the mapping for ENV variables to CloudFormation exports that you wish to use.',
        requiresArg: true,
        type: 'string'
    })
        .version()
        .help()
        .parse(cliArgs);
    return options;
}
exports.args = args;
function createEnv(options) {
    const tasks = new listr_1.default([
        {
            task: () => {
                return envMap_1.findFile(options);
            },
            title: 'Searching for envMap.yml'
        },
        {
            task: ctx => {
                const mappings = envMap_1.parseEnvMappings(options);
                // tslint:disable-next-line
                ctx.mappings = mappings;
            },
            title: 'Parsing ENV to CloudFormation mappings'
        },
        {
            task: async (ctx) => {
                const exports = await aws_1.fetchExports(options);
                // tslint:disable-next-line
                ctx.exports = exports;
            },
            title: 'Fetch exports from CloudFormation'
        },
        {
            task: ctx => {
                const cloudFormationMappings = aws_1.replaceExportNamesWithValues(ctx.mappings, ctx.exports);
                switch (cloudFormationMappings._tag) {
                    case 'Left':
                        return Promise.reject(cloudFormationMappings.left);
                    case 'Right':
                        return Promise.resolve(
                        // tslint:disable-next-line
                        (ctx.cloudFormationMappings = cloudFormationMappings.right));
                }
            },
            title: 'Replace mapping values with CloudFormation values'
        },
        {
            task: ctx => envMap_1.writeFile(ctx.cloudFormationMappings, options),
            title: 'Writing .env file for stage'
        }
    ]);
    return tasks.run();
}
exports.createEnv = createEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsa0RBQTBCO0FBRTFCLCtCQUFtRTtBQUNuRSxxQ0FBaUU7QUFTakUsU0FBZ0IsSUFBSSxDQUFDLE9BQTBCO0lBQzdDLE1BQU0sT0FBTyxHQUFHLGVBQUs7U0FDbEIsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNmLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFFBQVEsRUFBRSx5REFBeUQ7UUFDbkUsV0FBVyxFQUFFLElBQUk7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDZixDQUFDO1NBQ0QsTUFBTSxDQUFDLFNBQVMsRUFBRTtRQUNqQixZQUFZLEVBQUUsSUFBSTtRQUNsQixRQUFRLEVBQUUscURBQXFEO1FBQy9ELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQztTQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsUUFBUSxFQUFFLDJDQUEyQztRQUNyRCxXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUM7U0FDRCxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3BCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFFBQVEsRUFDTix3R0FBd0c7UUFDMUcsV0FBVyxFQUFFLElBQUk7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDZixDQUFDO1NBQ0QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxFQUFFO1NBQ04sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWxCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFoQ0Qsb0JBZ0NDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE9BQWdCO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDO1FBQ3RCO1lBQ0UsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxPQUFPLGlCQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELEtBQUssRUFBRSwwQkFBMEI7U0FDbEM7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDVixNQUFNLFFBQVEsR0FBRyx5QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsMkJBQTJCO2dCQUMzQixHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMxQixDQUFDO1lBQ0QsS0FBSyxFQUFFLHdDQUF3QztTQUNoRDtRQUNEO1lBQ0UsSUFBSSxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtnQkFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QywyQkFBMkI7Z0JBQzNCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxLQUFLLEVBQUUsbUNBQW1DO1NBQzNDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxzQkFBc0IsR0FBRyxrQ0FBNEIsQ0FDekQsR0FBRyxDQUFDLFFBQVEsRUFDWixHQUFHLENBQUMsT0FBTyxDQUNaLENBQUM7Z0JBQ0YsUUFBUSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUU7b0JBQ25DLEtBQUssTUFBTTt3QkFDVCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JELEtBQUssT0FBTzt3QkFDVixPQUFPLE9BQU8sQ0FBQyxPQUFPO3dCQUNwQiwyQkFBMkI7d0JBQzNCLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUM1RCxDQUFDO2lCQUNMO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxtREFBbUQ7U0FDM0Q7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQztZQUMzRCxLQUFLLEVBQUUsNkJBQTZCO1NBQ3JDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQWpERCw4QkFpREMifQ==