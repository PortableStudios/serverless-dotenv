"use strict";
// tslint:disable:readonly-array
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
async function fetchExports(options, token, results = []) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdDQUFnQzs7Ozs7QUFFaEMsc0RBQTBCO0FBQzFCLDZDQUF1RDtBQUt2RCxTQUFTLGtCQUFrQixDQUFDLE9BQWdCO0lBQzFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEUsTUFBTSxNQUFNLEdBQUc7UUFDYixXQUFXO1FBQ1gsTUFBTTtLQUNQLENBQUM7SUFFRixPQUFPLElBQUksaUJBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVNLEtBQUssVUFBVSxZQUFZLENBQ2hDLE9BQWdCLEVBQUUsS0FBcUIsRUFBRSxVQUFpQixFQUFFO0lBRTVELE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVoRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sY0FBYztTQUMzQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ25CLE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFFeEMsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFBO0lBQzdDLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQTtJQUV6QyxNQUFNLGNBQWMsR0FBVSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXJELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO0FBQ3JELENBQUM7QUFwQkQsb0NBb0JDO0FBRUQsU0FBZ0IsNEJBQTRCLENBQzFDLFFBQW9CLEVBQ3BCLE9BQTZDO0lBRTdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzNELE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDO1FBRTNFLE9BQU8sV0FBVztZQUNoQixDQUFDLGlDQUNNLEdBQUcsS0FDTixDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRSxJQUV6QyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU07UUFDaEUsQ0FBQyxDQUFDLGNBQUssQ0FBQyxNQUFNLENBQUM7UUFDZixDQUFDLENBQUMsYUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBbkJELG9FQW1CQyJ9