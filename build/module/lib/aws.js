import AWS from 'aws-sdk';
import { left, right } from 'fp-ts/lib/Either';
function initCloudFormation(profile) {
    const credentials = new AWS.SharedIniFileCredentials({ profile });
    const region = 'ap-southeast-2';
    const config = {
        credentials,
        region
    };
    return new AWS.CloudFormation(config);
}
export async function fetchExports(options) {
    const { profile } = options;
    const cloudFormation = initCloudFormation(profile);
    return cloudFormation
        .listExports()
        .promise()
        .then(result => result.Exports)
        .catch(error => Promise.reject(error));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQzFCLE9BQU8sRUFBVSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFLdkQsU0FBUyxrQkFBa0IsQ0FBQyxPQUFlO0lBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNsRSxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztJQUVoQyxNQUFNLE1BQU0sR0FBRztRQUNiLFdBQVc7UUFDWCxNQUFNO0tBQ1AsQ0FBQztJQUNGLE9BQU8sSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FDaEMsT0FBZ0I7SUFFaEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUM1QixNQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVuRCxPQUFPLGNBQWM7U0FDbEIsV0FBVyxFQUFFO1NBQ2IsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUM5QixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELE1BQU0sVUFBVSw0QkFBNEIsQ0FDMUMsUUFBb0IsRUFDcEIsT0FBNkM7SUFFN0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDM0QsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFeEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUM7UUFFM0UsT0FBTyxXQUFXO1lBQ2hCLENBQUMsQ0FBQztnQkFDRSxHQUFHLEdBQUc7Z0JBQ04sQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7YUFDdEM7WUFDSCxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU07UUFDaEUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDIn0=