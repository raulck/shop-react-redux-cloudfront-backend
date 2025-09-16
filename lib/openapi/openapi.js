"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openapi = void 0;
exports.openapi = {
    openapi: "3.0.3",
    info: {
        title: "Product Service API",
        version: "1.0.0",
        description: "OpenAPI documentation for Product Service",
    },
    servers: [{ url: "/" }],
    paths: {
        "/products": {
            get: {
                summary: "Get all products",
                operationId: "getProducts",
                responses: {
                    "200": {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Product" },
                                },
                            },
                        },
                    },
                    "500": { $ref: "#/components/responses/InternalError" },
                },
            },
        },
        "/products/{productId}": {
            get: {
                summary: "Get product by ID",
                operationId: "getProductById",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Product found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Product" },
                            },
                        },
                    },
                    "400": { $ref: "#/components/responses/BadRequest" },
                    "404": { $ref: "#/components/responses/NotFound" },
                    "500": { $ref: "#/components/responses/InternalError" },
                },
            },
        },
    },
    components: {
        schemas: {
            Product: {
                type: "object",
                required: ["id", "title", "price", "description"],
                properties: {
                    id: { type: "string", example: "2" },
                    price: { type: "number", example: 55999 },
                    title: { type: "string", example: "Ford Mustang" },
                    description: {
                        type: "string",
                        example: "An iconic American muscle car with powerful performance and a sleek design.",
                    },
                },
            },
        },
        responses: {
            BadRequest: {
                description: "Bad request",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                            },
                        },
                    },
                },
            },
            NotFound: {
                description: "Product not found",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                            },
                        },
                    },
                },
            },
            InternalError: {
                description: "Internal server error",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9wZW5hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxPQUFPLEdBQUc7SUFDckIsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixPQUFPLEVBQUUsT0FBTztRQUNoQixXQUFXLEVBQUUsMkNBQTJDO0tBQ3pEO0lBQ0QsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDdkIsS0FBSyxFQUFFO1FBQ0wsV0FBVyxFQUFFO1lBQ1gsR0FBRyxFQUFFO2dCQUNILE9BQU8sRUFBRSxrQkFBa0I7Z0JBQzNCLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixTQUFTLEVBQUU7b0JBQ1QsS0FBSyxFQUFFO3dCQUNMLFdBQVcsRUFBRSxrQkFBa0I7d0JBQy9CLE9BQU8sRUFBRTs0QkFDUCxrQkFBa0IsRUFBRTtnQ0FDbEIsTUFBTSxFQUFFO29DQUNOLElBQUksRUFBRSxPQUFPO29DQUNiLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRTtpQ0FDaEQ7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLHNDQUFzQyxFQUFFO2lCQUN4RDthQUNGO1NBQ0Y7UUFDRCx1QkFBdUIsRUFBRTtZQUN2QixHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsVUFBVSxFQUFFO29CQUNWO3dCQUNFLElBQUksRUFBRSxXQUFXO3dCQUNqQixFQUFFLEVBQUUsTUFBTTt3QkFDVixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO3FCQUMzQjtpQkFDRjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsS0FBSyxFQUFFO3dCQUNMLFdBQVcsRUFBRSxlQUFlO3dCQUM1QixPQUFPLEVBQUU7NEJBQ1Asa0JBQWtCLEVBQUU7Z0NBQ2xCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRTs2QkFDakQ7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG1DQUFtQyxFQUFFO29CQUNwRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7b0JBQ2xELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxzQ0FBc0MsRUFBRTtpQkFDeEQ7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO2dCQUNqRCxVQUFVLEVBQUU7b0JBQ1YsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNwQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7b0JBQ3pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRTtvQkFDbEQsV0FBVyxFQUFFO3dCQUNYLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFDTCw2RUFBNkU7cUJBQ2hGO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELFNBQVMsRUFBRTtZQUNULFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNQLGtCQUFrQixFQUFFO3dCQUNsQixNQUFNLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7NEJBQ2QsVUFBVSxFQUFFO2dDQUNWLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7NkJBQzVCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLG1CQUFtQjtnQkFDaEMsT0FBTyxFQUFFO29CQUNQLGtCQUFrQixFQUFFO3dCQUNsQixNQUFNLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7NEJBQ2QsVUFBVSxFQUFFO2dDQUNWLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7NkJBQzVCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsT0FBTyxFQUFFO29CQUNQLGtCQUFrQixFQUFFO3dCQUNsQixNQUFNLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7NEJBQ2QsVUFBVSxFQUFFO2dDQUNWLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7NkJBQzVCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ08sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBvcGVuYXBpID0ge1xyXG4gIG9wZW5hcGk6IFwiMy4wLjNcIixcclxuICBpbmZvOiB7XHJcbiAgICB0aXRsZTogXCJQcm9kdWN0IFNlcnZpY2UgQVBJXCIsXHJcbiAgICB2ZXJzaW9uOiBcIjEuMC4wXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPcGVuQVBJIGRvY3VtZW50YXRpb24gZm9yIFByb2R1Y3QgU2VydmljZVwiLFxyXG4gIH0sXHJcbiAgc2VydmVyczogW3sgdXJsOiBcIi9cIiB9XSxcclxuICBwYXRoczoge1xyXG4gICAgXCIvcHJvZHVjdHNcIjoge1xyXG4gICAgICBnZXQ6IHtcclxuICAgICAgICBzdW1tYXJ5OiBcIkdldCBhbGwgcHJvZHVjdHNcIixcclxuICAgICAgICBvcGVyYXRpb25JZDogXCJnZXRQcm9kdWN0c1wiLFxyXG4gICAgICAgIHJlc3BvbnNlczoge1xyXG4gICAgICAgICAgXCIyMDBcIjoge1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMaXN0IG9mIHByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcclxuICAgICAgICAgICAgICAgICAgaXRlbXM6IHsgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Qcm9kdWN0XCIgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIjUwMFwiOiB7ICRyZWY6IFwiIy9jb21wb25lbnRzL3Jlc3BvbnNlcy9JbnRlcm5hbEVycm9yXCIgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIFwiL3Byb2R1Y3RzL3twcm9kdWN0SWR9XCI6IHtcclxuICAgICAgZ2V0OiB7XHJcbiAgICAgICAgc3VtbWFyeTogXCJHZXQgcHJvZHVjdCBieSBJRFwiLFxyXG4gICAgICAgIG9wZXJhdGlvbklkOiBcImdldFByb2R1Y3RCeUlkXCIsXHJcbiAgICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RJZFwiLFxyXG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBzY2hlbWE6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJlc3BvbnNlczoge1xyXG4gICAgICAgICAgXCIyMDBcIjoge1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9kdWN0IGZvdW5kXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7ICRyZWY6IFwiIy9jb21wb25lbnRzL3NjaGVtYXMvUHJvZHVjdFwiIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIjQwMFwiOiB7ICRyZWY6IFwiIy9jb21wb25lbnRzL3Jlc3BvbnNlcy9CYWRSZXF1ZXN0XCIgfSxcclxuICAgICAgICAgIFwiNDA0XCI6IHsgJHJlZjogXCIjL2NvbXBvbmVudHMvcmVzcG9uc2VzL05vdEZvdW5kXCIgfSxcclxuICAgICAgICAgIFwiNTAwXCI6IHsgJHJlZjogXCIjL2NvbXBvbmVudHMvcmVzcG9uc2VzL0ludGVybmFsRXJyb3JcIiB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgc2NoZW1hczoge1xyXG4gICAgICBQcm9kdWN0OiB7XHJcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcclxuICAgICAgICByZXF1aXJlZDogW1wiaWRcIiwgXCJ0aXRsZVwiLCBcInByaWNlXCIsIFwiZGVzY3JpcHRpb25cIl0sXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiwgZXhhbXBsZTogXCIyXCIgfSxcclxuICAgICAgICAgIHByaWNlOiB7IHR5cGU6IFwibnVtYmVyXCIsIGV4YW1wbGU6IDU1OTk5IH0sXHJcbiAgICAgICAgICB0aXRsZTogeyB0eXBlOiBcInN0cmluZ1wiLCBleGFtcGxlOiBcIkZvcmQgTXVzdGFuZ1wiIH0sXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICBleGFtcGxlOlxyXG4gICAgICAgICAgICAgIFwiQW4gaWNvbmljIEFtZXJpY2FuIG11c2NsZSBjYXIgd2l0aCBwb3dlcmZ1bCBwZXJmb3JtYW5jZSBhbmQgYSBzbGVlayBkZXNpZ24uXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzcG9uc2VzOiB7XHJcbiAgICAgIEJhZFJlcXVlc3Q6IHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJCYWQgcmVxdWVzdFwiLFxyXG4gICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XHJcbiAgICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgTm90Rm91bmQ6IHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9kdWN0IG5vdCBmb3VuZFwiLFxyXG4gICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XHJcbiAgICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgSW50ZXJuYWxFcnJvcjoge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiLFxyXG4gICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XHJcbiAgICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSBhcyBjb25zdDtcclxuIl19