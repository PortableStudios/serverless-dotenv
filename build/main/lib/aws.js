"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Either_1 = require("fp-ts/lib/Either");
function initCloudFormation(options) {
    const { profile, region } = options;
    const credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile });
    const config = {
        credentials,
        region
    };
    return new aws_sdk_1.default.CloudFormation(config);
}
async function fetchExports(options) {
    const cloudFormation = initCloudFormation(options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsNkNBQXVEO0FBS3ZELFNBQVMsa0JBQWtCLENBQUMsT0FBZ0I7SUFDMUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDcEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxpQkFBRyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNsRSxNQUFNLE1BQU0sR0FBRztRQUNiLFdBQVc7UUFDWCxNQUFNO0tBQ1AsQ0FBQztJQUVGLE9BQU8sSUFBSSxpQkFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRU0sS0FBSyxVQUFVLFlBQVksQ0FDaEMsT0FBZ0I7SUFFaEIsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkQsT0FBTyxjQUFjO1NBQ2xCLFdBQVcsRUFBRTtTQUNiLE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDOUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFWRCxvQ0FVQztBQUVELFNBQWdCLDRCQUE0QixDQUMxQyxRQUFvQixFQUNwQixPQUE2QztJQUU3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMzRCxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQztRQUUzRSxPQUFPLFdBQVc7WUFDaEIsQ0FBQyxpQ0FDTSxHQUFHLEtBQ04sQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFFekMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNO1FBQ2hFLENBQUMsQ0FBQyxjQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLGFBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQW5CRCxvRUFtQkMifQ==