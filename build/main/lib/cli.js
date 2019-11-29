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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsa0RBQTBCO0FBRTFCLCtCQUFtRTtBQUNuRSxxQ0FBaUU7QUFRakUsU0FBZ0IsSUFBSSxDQUFDLE9BQTBCO0lBQzdDLE1BQU0sT0FBTyxHQUFHLGVBQUs7U0FDbEIsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNmLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFFBQVEsRUFBRSx5REFBeUQ7UUFDbkUsV0FBVyxFQUFFLElBQUk7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDZixDQUFDO1NBQ0QsTUFBTSxDQUFDLFNBQVMsRUFBRTtRQUNqQixZQUFZLEVBQUUsSUFBSTtRQUNsQixRQUFRLEVBQUUscURBQXFEO1FBQy9ELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQztTQUNELE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDcEIsT0FBTyxFQUFFLFlBQVk7UUFDckIsUUFBUSxFQUNOLHdHQUF3RztRQUMxRyxXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUM7U0FDRCxPQUFPLEVBQUU7U0FDVCxJQUFJLEVBQUU7U0FDTixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQTFCRCxvQkEwQkM7QUFFRCxTQUFnQixTQUFTLENBQUMsT0FBZ0I7SUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUM7UUFDdEI7WUFDRSxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUNULE9BQU8saUJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsS0FBSyxFQUFFLDBCQUEwQjtTQUNsQztRQUNEO1lBQ0UsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLE1BQU0sUUFBUSxHQUFHLHlCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQywyQkFBMkI7Z0JBQzNCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzFCLENBQUM7WUFDRCxLQUFLLEVBQUUsd0NBQXdDO1NBQ2hEO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUNoQixNQUFNLE9BQU8sR0FBRyxNQUFNLGtCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVDLDJCQUEyQjtnQkFDM0IsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEIsQ0FBQztZQUNELEtBQUssRUFBRSxtQ0FBbUM7U0FDM0M7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDVixNQUFNLHNCQUFzQixHQUFHLGtDQUE0QixDQUN6RCxHQUFHLENBQUMsUUFBUSxFQUNaLEdBQUcsQ0FBQyxPQUFPLENBQ1osQ0FBQztnQkFDRixRQUFRLHNCQUFzQixDQUFDLElBQUksRUFBRTtvQkFDbkMsS0FBSyxNQUFNO3dCQUNULE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckQsS0FBSyxPQUFPO3dCQUNWLE9BQU8sT0FBTyxDQUFDLE9BQU87d0JBQ3BCLDJCQUEyQjt3QkFDM0IsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQzVELENBQUM7aUJBQ0w7WUFDSCxDQUFDO1lBQ0QsS0FBSyxFQUFFLG1EQUFtRDtTQUMzRDtRQUNEO1lBQ0UsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDO1lBQzNELEtBQUssRUFBRSw2QkFBNkI7U0FDckM7S0FDRixDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBakRELDhCQWlEQyJ9