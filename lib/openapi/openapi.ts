export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Product Service API",
    version: "1.0.0",
    description: "OpenAPI documentation for Product Service - A motorcycle shop backend API",
  },
  servers: [{ url: "/" }],
  paths: {
    "/products": {
      get: {
        summary: "Get all available products with stock",
        operationId: "getAvailableProducts",
        description: "Returns all products with their current stock counts",
        responses: {
          "200": {
            description: "List of products with stock information",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ProductWithStock" },
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        summary: "Create a new product",
        operationId: "createProduct",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NewProduct" },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Product created successfully",
                    },
                    id: {
                      type: "string",
                      example: "19ba3d6a-f8ed-491b-a192-0a33b71b38c4",
                    },
                  },
                  required: ["message", "id"],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/products/{productId}": {
      get: {
        summary: "Get product by ID",
        operationId: "getProductById",
        description: "Returns a specific product with its stock count",
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            description: "The ID of the product to retrieve",
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        responses: {
          "200": {
            description: "Product found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductWithStock" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/openapi.json": {
      get: {
        summary: "Get OpenAPI specification",
        operationId: "getOpenApiSpec",
        description: "Returns the OpenAPI 3.0 specification for this API",
        responses: {
          "200": {
            description: "OpenAPI specification",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description: "OpenAPI 3.0 specification",
                },
              },
            },
          },
        },
      },
    },
    "/swagger": {
      get: {
        summary: "Get Swagger UI",
        operationId: "getSwaggerUI",
        description: "Returns the Swagger UI HTML page for interactive API documentation",
        responses: {
          "200": {
            description: "Swagger UI HTML page",
            content: {
              "text/html": {
                schema: {
                  type: "string",
                  description: "HTML content for Swagger UI",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ProductWithStock: {
        type: "object",
        required: ["id", "title", "price", "description", "count"],
        properties: {
          id: { 
            type: "string", 
            description: "Unique product identifier",
            example: "123e4567-e89b-12d3-a456-426614174000" 
          },
          title: { 
            type: "string", 
            description: "Product name",
            example: "Yamaha MT-07" 
          },
          description: {
            type: "string",
            description: "Product description",
            example: "A lightweight, agile, and versatile naked sportbike that delivers an exciting riding experience.",
          },
          price: { 
            type: "number", 
            description: "Product price in USD",
            example: 7699,
            minimum: 0 
          },
          count: { 
            type: "integer", 
            description: "Available stock count",
            example: 15,
            minimum: 0 
          },
        },
      },
      NewProduct: {
        type: "object",
        description: "Data required to create a new product",
        properties: {
          title: { 
            type: "string", 
            description: "Product name",
            example: "Kawasaki Ninja ZX-10R",
            minLength: 1,
            maxLength: 100 
          },
          description: { 
            type: "string", 
            description: "Product description",
            example: "A race-inspired supersport motorcycle with cutting-edge technology.",
            minLength: 1,
            maxLength: 500 
          },
          price: { 
            type: "number", 
            description: "Product price in USD",
            example: 17399,
            minimum: 0 
          },
          count: { 
            type: "integer", 
            description: "Initial stock count",
            example: 5,
            minimum: 0 
          },
        },
        required: ["title", "description", "price", "count"],
      },
    },
    responses: {
      BadRequest: {
        description: "Bad request - Invalid input data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { 
                  type: "string",
                  example: "title, price, count, description are required" 
                },
              },
              required: ["message"],
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
                message: { 
                  type: "string",
                  example: "Product not found: 123e4567-e89b-12d3-a456-426614174000" 
                },
              },
              required: ["message"],
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
                message: { 
                  type: "string",
                  example: "Internal Server Error" 
                },
              },
              required: ["message"],
            },
          },
        },
      },
    },
  },
} as const;
