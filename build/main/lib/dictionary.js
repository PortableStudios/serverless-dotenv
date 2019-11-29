"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function interpolateValue(dictionary, key, value) {
    return Object.entries(dictionary).reduce((acc, elem) => {
        const [primaryKey, primaryValue] = elem;
        return Object.assign(Object.assign({}, acc), { [primaryKey]: primaryValue.replace('${' + key + '}', value) });
    }, {});
}
exports.interpolateValue = interpolateValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGljdGlvbmFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLFNBQWdCLGdCQUFnQixDQUM5QixVQUFzQixFQUN0QixHQUFXLEVBQ1gsS0FBYTtJQUViLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDckQsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEMsdUNBQ0ssR0FBRyxLQUNOLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFDM0Q7SUFDSixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBWkQsNENBWUMifQ==