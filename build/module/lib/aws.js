// tslint:disable:readonly-array
import AWS from 'aws-sdk';
import { left, right } from 'fp-ts/lib/Either';
function initCloudFormation(options) {
    const { profile, region } = options;
    const credentials = new AWS.SharedIniFileCredentials({ profile });
    const config = {
        credentials,
        region
    };
    return new AWS.CloudFormation(config);
}
export async function fetchExports(options, token, results = []) {
    const cloudFormation = initCloudFormation(options);
    const params = token ? { NextToken: token } : {};
    const listExportsResult = await cloudFormation
        .listExports(params)
        .promise()
        .then(result => result)
        .catch(error => Promise.reject(error));
    const nextToken = listExportsResult.NextToken;
    const exports = listExportsResult.Exports;
    const updatedResults = results.concat(exports);
    return (nextToken) ?
        fetchExports(options, nextToken, updatedResults) :
        new Promise((resolve) => resolve(updatedResults));
}
export function replaceExportNamesWithValues(mappings, exports) {
    const result = Object.entries(mappings).reduce((acc, elem) => {
        const [primaryKey, primaryValue] = elem;
        const foundExport = exports.find(element => element.Name === primaryValue);
        return foundExport
            ? {
                ...acc,
                [primaryKey]: foundExport.Value || ''
            }
            : acc;
    }, {});
    return Object.keys(mappings).length === Object.keys(result).length
        ? right(result)
        : left(new Error('Not all keys could be found in CloudFormation exports.'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0NBQWdDO0FBRWhDLE9BQU8sR0FBRyxNQUFNLFNBQVMsQ0FBQztBQUMxQixPQUFPLEVBQVUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS3ZELFNBQVMsa0JBQWtCLENBQUMsT0FBZ0I7SUFDMUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDcEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsd0JBQXdCLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsV0FBVztRQUNYLE1BQU07S0FDUCxDQUFDO0lBRUYsT0FBTyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUNoQyxPQUFnQixFQUFFLEtBQXFCLEVBQUUsVUFBaUIsRUFBRTtJQUU1RCxNQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNsRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFaEQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGNBQWM7U0FDM0MsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNuQixPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBRXhDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQTtJQUM3QyxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUE7SUFFekMsTUFBTSxjQUFjLEdBQVUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVyRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsQixZQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtBQUNyRCxDQUFDO0FBRUQsTUFBTSxVQUFVLDRCQUE0QixDQUMxQyxRQUFvQixFQUNwQixPQUE2QztJQUU3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMzRCxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQztRQUUzRSxPQUFPLFdBQVc7WUFDaEIsQ0FBQyxDQUFDO2dCQUNFLEdBQUcsR0FBRztnQkFDTixDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTthQUN0QztZQUNILENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtRQUNoRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUMifQ==