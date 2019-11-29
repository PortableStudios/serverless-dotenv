"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const dictionary_1 = require("./dictionary");
function findFile(options) {
    const { envMapFile } = options;
    return fs_1.default.existsSync(envMapFile)
        ? Promise.resolve(true)
        : Promise.reject(new Error(`Cannot find ${envMapFile}. Please use option --envMapFile to provide the correct YAML file.`));
}
exports.findFile = findFile;
function writeFile(mappings, options) {
    const { stage } = options;
    const envFile = `.env.${stage}`;
    const data = Object.entries(mappings)
        .map(value => `${value[0]}=${value[1]}`)
        .join('\n');
    return fs_1.default.writeFileSync(envFile, data);
}
exports.writeFile = writeFile;
function parseEnvMappings(options) {
    const { envMapFile, stage } = options;
    const yaml = parseFile(envMapFile);
    const processedYaml = dictionary_1.interpolateValue(yaml, 'stage', stage);
    return processedYaml;
}
exports.parseEnvMappings = parseEnvMappings;
function parseFile(filePath) {
    const fileContents = fs_1.default.readFileSync(filePath, 'utf8');
    return yaml_1.default.parse(fileContents);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52TWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbnZNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBR3hCLDZDQUE0RDtBQUU1RCxTQUFnQixRQUFRLENBQUMsT0FBZ0I7SUFDdkMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUUvQixPQUFPLFlBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDWixJQUFJLEtBQUssQ0FDUCxlQUFlLFVBQVUsb0VBQW9FLENBQzlGLENBQ0YsQ0FBQztBQUNSLENBQUM7QUFWRCw0QkFVQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxRQUFvQixFQUFFLE9BQWdCO0lBQzlELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDMUIsTUFBTSxPQUFPLEdBQUcsUUFBUSxLQUFLLEVBQUUsQ0FBQztJQUVoQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUNsQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxPQUFPLFlBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFURCw4QkFTQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLE9BQWdCO0lBQy9DLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRXRDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxNQUFNLGFBQWEsR0FBRyw2QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTdELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFQRCw0Q0FPQztBQUVELFNBQVMsU0FBUyxDQUFDLFFBQWdCO0lBQ2pDLE1BQU0sWUFBWSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXZELE9BQU8sY0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=