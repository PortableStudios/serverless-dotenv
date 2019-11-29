export function interpolateValue(dictionary, key, value) {
    return Object.entries(dictionary).reduce((acc, elem) => {
        const [primaryKey, primaryValue] = elem;
        return {
            ...acc,
            [primaryKey]: primaryValue.replace('${' + key + '}', value)
        };
    }, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGljdGlvbmFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLFVBQXNCLEVBQ3RCLEdBQVcsRUFDWCxLQUFhO0lBRWIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNyRCxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QyxPQUFPO1lBQ0wsR0FBRyxHQUFHO1lBQ04sQ0FBQyxVQUFVLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQztTQUM1RCxDQUFDO0lBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyJ9