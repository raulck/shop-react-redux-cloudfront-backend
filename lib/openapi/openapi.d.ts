export declare const openapi: {
    readonly openapi: "3.0.3";
    readonly info: {
        readonly title: "Product Service API";
        readonly version: "1.0.0";
        readonly description: "OpenAPI documentation for Product Service";
    };
    readonly servers: readonly [{
        readonly url: "/";
    }];
    readonly paths: {
        readonly "/products": {
            readonly get: {
                readonly summary: "Get all products";
                readonly operationId: "getProducts";
                readonly responses: {
                    readonly "200": {
                        readonly description: "List of products";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly $ref: "#/components/schemas/Product";
                                    };
                                };
                            };
                        };
                    };
                    readonly "500": {
                        readonly $ref: "#/components/responses/InternalError";
                    };
                };
            };
        };
        readonly "/products/{productId}": {
            readonly get: {
                readonly summary: "Get product by ID";
                readonly operationId: "getProductById";
                readonly parameters: readonly [{
                    readonly name: "productId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly "200": {
                        readonly description: "Product found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/Product";
                                };
                            };
                        };
                    };
                    readonly "400": {
                        readonly $ref: "#/components/responses/BadRequest";
                    };
                    readonly "404": {
                        readonly $ref: "#/components/responses/NotFound";
                    };
                    readonly "500": {
                        readonly $ref: "#/components/responses/InternalError";
                    };
                };
            };
        };
    };
    readonly components: {
        readonly schemas: {
            readonly Product: {
                readonly type: "object";
                readonly required: readonly ["id", "title", "price", "description"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly example: "2";
                    };
                    readonly price: {
                        readonly type: "number";
                        readonly example: 55999;
                    };
                    readonly title: {
                        readonly type: "string";
                        readonly example: "Ford Mustang";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly example: "An iconic American muscle car with powerful performance and a sleek design.";
                    };
                };
            };
        };
        readonly responses: {
            readonly BadRequest: {
                readonly description: "Bad request";
                readonly content: {
                    readonly "application/json": {
                        readonly schema: {
                            readonly type: "object";
                            readonly properties: {
                                readonly message: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly NotFound: {
                readonly description: "Product not found";
                readonly content: {
                    readonly "application/json": {
                        readonly schema: {
                            readonly type: "object";
                            readonly properties: {
                                readonly message: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly InternalError: {
                readonly description: "Internal server error";
                readonly content: {
                    readonly "application/json": {
                        readonly schema: {
                            readonly type: "object";
                            readonly properties: {
                                readonly message: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
