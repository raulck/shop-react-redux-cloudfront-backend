"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const products_1 = require("../mocks/products");
const handler = async (_event) => {
    try {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow all origins
                // "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allowed HTTP methods
                // "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
            },
            body: JSON.stringify(products_1.mockProducts),
        };
    }
    catch (err) {
        console.error("Error in getProductsList:", err);
        return {
            statusCode: 500,
            // headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFBaUQ7QUFFMUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixNQUE0QixFQUNJLEVBQUU7SUFDbEMsSUFBSSxDQUFDO1FBQ0gsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxvQkFBb0I7Z0JBQ3hELGdGQUFnRjtnQkFDaEYsb0ZBQW9GO2FBQ3JGO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQVksQ0FBQztTQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLG1EQUFtRDtZQUNuRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1NBQzNELENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBdEJXLFFBQUEsT0FBTyxXQXNCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHsgbW9ja1Byb2R1Y3RzIH0gZnJvbSBcIi4uL21vY2tzL3Byb2R1Y3RzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChcclxuICBfZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50XHJcbik6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLCAvLyBBbGxvdyBhbGwgb3JpZ2luc1xyXG4gICAgICAgIC8vIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiOiBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiLCAvLyBBbGxvd2VkIEhUVFAgbWV0aG9kc1xyXG4gICAgICAgIC8vIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIkNvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvblwiLCAvLyBBbGxvd2VkIGhlYWRlcnNcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobW9ja1Byb2R1Y3RzKSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZ2V0UHJvZHVjdHNMaXN0OlwiLCBlcnIpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICAvLyBoZWFkZXJzOiB7IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KSxcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG4iXX0=