import Listr from 'listr';
import yargs from 'yargs';
import { fetchExports, replaceExportNamesWithValues } from './aws';
import { findFile, parseEnvMappings, writeFile } from './envMap';
export function args(cliArgs) {
    const options = yargs
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
export function createEnv(options) {
    const tasks = new Listr([
        {
            task: () => {
                return findFile(options);
            },
            title: 'Searching for envMap.yml'
        },
        {
            task: ctx => {
                const mappings = parseEnvMappings(options);
                // tslint:disable-next-line
                ctx.mappings = mappings;
            },
            title: 'Parsing ENV to CloudFormation mappings'
        },
        {
            task: async (ctx) => {
                const exports = await fetchExports(options);
                // tslint:disable-next-line
                ctx.exports = exports;
            },
            title: 'Fetch exports from CloudFormation'
        },
        {
            task: ctx => {
                const cloudFormationMappings = replaceExportNamesWithValues(ctx.mappings, ctx.exports);
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
            task: ctx => writeFile(ctx.cloudFormationMappings, options),
            title: 'Writing .env file for stage'
        }
    ]);
    return tasks.run();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBU2pFLE1BQU0sVUFBVSxJQUFJLENBQUMsT0FBMEI7SUFDN0MsTUFBTSxPQUFPLEdBQUcsS0FBSztTQUNsQixNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2YsWUFBWSxFQUFFLElBQUk7UUFDbEIsUUFBUSxFQUFFLHlEQUF5RDtRQUNuRSxXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUM7U0FDRCxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ2pCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFFBQVEsRUFBRSxxREFBcUQ7UUFDL0QsV0FBVyxFQUFFLElBQUk7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDZixDQUFDO1NBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNoQixZQUFZLEVBQUUsSUFBSTtRQUNsQixRQUFRLEVBQUUsMkNBQTJDO1FBQ3JELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQztTQUNELE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDcEIsT0FBTyxFQUFFLFlBQVk7UUFDckIsUUFBUSxFQUNOLHdHQUF3RztRQUMxRyxXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUM7U0FDRCxPQUFPLEVBQUU7U0FDVCxJQUFJLEVBQUU7U0FDTixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsT0FBZ0I7SUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUM7UUFDdEI7WUFDRSxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUNULE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxLQUFLLEVBQUUsMEJBQTBCO1NBQ2xDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLDJCQUEyQjtnQkFDM0IsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDMUIsQ0FBQztZQUNELEtBQUssRUFBRSx3Q0FBd0M7U0FDaEQ7UUFDRDtZQUNFLElBQUksRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQ2hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QywyQkFBMkI7Z0JBQzNCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxLQUFLLEVBQUUsbUNBQW1DO1NBQzNDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxzQkFBc0IsR0FBRyw0QkFBNEIsQ0FDekQsR0FBRyxDQUFDLFFBQVEsRUFDWixHQUFHLENBQUMsT0FBTyxDQUNaLENBQUM7Z0JBQ0YsUUFBUSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUU7b0JBQ25DLEtBQUssTUFBTTt3QkFDVCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JELEtBQUssT0FBTzt3QkFDVixPQUFPLE9BQU8sQ0FBQyxPQUFPO3dCQUNwQiwyQkFBMkI7d0JBQzNCLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUM1RCxDQUFDO2lCQUNMO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxtREFBbUQ7U0FDM0Q7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDO1lBQzNELEtBQUssRUFBRSw2QkFBNkI7U0FDckM7S0FDRixDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQixDQUFDIn0=