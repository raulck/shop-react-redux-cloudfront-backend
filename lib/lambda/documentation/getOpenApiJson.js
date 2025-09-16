"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const openapi_1 = require("../../openapi/openapi");
const handler = async (_event) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow all origins
        },
        body: JSON.stringify(openapi_1.openapi),
    };
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3BlbkFwaUpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRPcGVuQXBpSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtREFBZ0Q7QUFFekMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixNQUE0QixFQUNJLEVBQUU7SUFDbEMsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsb0JBQW9CO1NBQ3pEO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQU8sQ0FBQztLQUM5QixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBWFcsUUFBQSxPQUFPLFdBV2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7IG9wZW5hcGkgfSBmcm9tIFwiLi4vLi4vb3BlbmFwaS9vcGVuYXBpXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChcclxuICBfZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50XHJcbik6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLCAvLyBBbGxvdyBhbGwgb3JpZ2luc1xyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wZW5hcGkpLFxyXG4gIH07XHJcbn07XHJcbiJdfQ==