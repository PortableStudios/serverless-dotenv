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
export async function fetchExports(options) {
    const cloudFormation = initCloudFormation(options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQzFCLE9BQU8sRUFBVSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFLdkQsU0FBUyxrQkFBa0IsQ0FBQyxPQUFnQjtJQUMxQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNwQyxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEUsTUFBTSxNQUFNLEdBQUc7UUFDYixXQUFXO1FBQ1gsTUFBTTtLQUNQLENBQUM7SUFFRixPQUFPLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxZQUFZLENBQ2hDLE9BQWdCO0lBRWhCLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5ELE9BQU8sY0FBYztTQUNsQixXQUFXLEVBQUU7U0FDYixPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsTUFBTSxVQUFVLDRCQUE0QixDQUMxQyxRQUFvQixFQUNwQixPQUE2QztJQUU3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMzRCxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQztRQUUzRSxPQUFPLFdBQVc7WUFDaEIsQ0FBQyxDQUFDO2dCQUNFLEdBQUcsR0FBRztnQkFDTixDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTthQUN0QztZQUNILENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtRQUNoRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUMifQ==