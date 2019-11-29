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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUWpFLE1BQU0sVUFBVSxJQUFJLENBQUMsT0FBMEI7SUFDN0MsTUFBTSxPQUFPLEdBQUcsS0FBSztTQUNsQixNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2YsWUFBWSxFQUFFLElBQUk7UUFDbEIsUUFBUSxFQUFFLHlEQUF5RDtRQUNuRSxXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUM7U0FDRCxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ2pCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFFBQVEsRUFBRSxxREFBcUQ7UUFDL0QsV0FBVyxFQUFFLElBQUk7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDZixDQUFDO1NBQ0QsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUNwQixPQUFPLEVBQUUsWUFBWTtRQUNyQixRQUFRLEVBQ04sd0dBQXdHO1FBQzFHLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQztTQUNELE9BQU8sRUFBRTtTQUNULElBQUksRUFBRTtTQUNOLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxPQUFnQjtJQUN4QyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQztRQUN0QjtZQUNFLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1QsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELEtBQUssRUFBRSwwQkFBMEI7U0FDbEM7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDVixNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsMkJBQTJCO2dCQUMzQixHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMxQixDQUFDO1lBQ0QsS0FBSyxFQUFFLHdDQUF3QztTQUNoRDtRQUNEO1lBQ0UsSUFBSSxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtnQkFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVDLDJCQUEyQjtnQkFDM0IsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEIsQ0FBQztZQUNELEtBQUssRUFBRSxtQ0FBbUM7U0FDM0M7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDVixNQUFNLHNCQUFzQixHQUFHLDRCQUE0QixDQUN6RCxHQUFHLENBQUMsUUFBUSxFQUNaLEdBQUcsQ0FBQyxPQUFPLENBQ1osQ0FBQztnQkFDRixRQUFRLHNCQUFzQixDQUFDLElBQUksRUFBRTtvQkFDbkMsS0FBSyxNQUFNO3dCQUNULE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckQsS0FBSyxPQUFPO3dCQUNWLE9BQU8sT0FBTyxDQUFDLE9BQU87d0JBQ3BCLDJCQUEyQjt3QkFDM0IsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQzVELENBQUM7aUJBQ0w7WUFDSCxDQUFDO1lBQ0QsS0FBSyxFQUFFLG1EQUFtRDtTQUMzRDtRQUNEO1lBQ0UsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUM7WUFDM0QsS0FBSyxFQUFFLDZCQUE2QjtTQUNyQztLQUNGLENBQUMsQ0FBQztJQUVILE9BQU8sS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLENBQUMifQ==