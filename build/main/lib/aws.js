"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Either_1 = require("fp-ts/lib/Either");
function initCloudFormation(profile) {
    const credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile });
    const region = 'ap-southeast-2';
    const config = {
        credentials,
        region
    };
    return new aws_sdk_1.default.CloudFormation(config);
}
async function fetchExports(options) {
    const { profile } = options;
    const cloudFormation = initCloudFormation(profile);
    return cloudFormation
        .listExports()
        .promise()
        .then(result => result.Exports)
        .catch(error => Promise.reject(error));
}
exports.fetchExports = fetchExports;
function replaceExportNamesWithValues(mappings, exports) {
    const result = Object.entries(mappings).reduce((acc, elem) => {
        const [primaryKey, primaryValue] = elem;
        const foundExport = exports.find(element => element.Name === primaryValue);
        return foundExport
            ? Object.assign(Object.assign({}, acc), { [primaryKey]: foundExport.Value || '' }) : acc;
    }, {});
    return Object.keys(mappings).length === Object.keys(result).length
        ? Either_1.right(result)
        : Either_1.left(new Error('Not all keys could be found in CloudFormation exports.'));
}
exports.replaceExportNamesWithValues = replaceExportNamesWithValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsNkNBQXVEO0FBS3ZELFNBQVMsa0JBQWtCLENBQUMsT0FBZTtJQUN6QyxNQUFNLFdBQVcsR0FBRyxJQUFJLGlCQUFHLENBQUMsd0JBQXdCLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDO0lBRWhDLE1BQU0sTUFBTSxHQUFHO1FBQ2IsV0FBVztRQUNYLE1BQU07S0FDUCxDQUFDO0lBQ0YsT0FBTyxJQUFJLGlCQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFTSxLQUFLLFVBQVUsWUFBWSxDQUNoQyxPQUFnQjtJQUVoQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQzVCLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5ELE9BQU8sY0FBYztTQUNsQixXQUFXLEVBQUU7U0FDYixPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBWEQsb0NBV0M7QUFFRCxTQUFnQiw0QkFBNEIsQ0FDMUMsUUFBb0IsRUFDcEIsT0FBNkM7SUFFN0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDM0QsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFeEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUM7UUFFM0UsT0FBTyxXQUFXO1lBQ2hCLENBQUMsaUNBQ00sR0FBRyxLQUNOLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFLElBRXpDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtRQUNoRSxDQUFDLENBQUMsY0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNmLENBQUMsQ0FBQyxhQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFwQkQsb0VBb0JDIn0=