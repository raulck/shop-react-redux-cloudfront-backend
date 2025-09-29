import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.AWS_REGION || "eu-north-1";
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || "products";
const STOCK_TABLE = process.env.STOCK_TABLE || "stock";

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: true,
  },
});

async function seed() {
  const { v4: uuidv4 } = await import("uuid");
  console.log("🌱 Starting to seed DynamoDB tables...");
  console.log(`📍 Region: ${REGION}`);
  console.log(`📦 Products table: ${PRODUCTS_TABLE}`);
  console.log(`📊 Stock table: ${STOCK_TABLE}`);

  const testProducts = [
    {
      id: uuidv4(),
      title: "Yamaha MT-07",
      description:
        "A lightweight, agile, and versatile naked sportbike that delivers an exciting riding experience.",
      price: 7699,
    },
    {
      id: uuidv4(),
      title: "Kawasaki Ninja ZX-10R",
      description:
        "A race-inspired supersport motorcycle with cutting-edge technology and unmatched performance.",
      price: 17399,
    },
    {
      id: uuidv4(),
      title: "Harley-Davidson Iron 883",
      description:
        "A classic cruiser with minimalistic style, iconic V-twin engine, and modern attitude.",
      price: 11499,
    },
  ];

  console.log(`\n📝 Adding ${testProducts.length} products...`);

  for (const product of testProducts) {
    try {
      // Products table
      await docClient.send(
        new PutCommand({
          TableName: PRODUCTS_TABLE,
          Item: product,
        })
      );

      const stockCount = Math.floor(Math.random() * 20) + 1;

      // Stock table
      await docClient.send(
        new PutCommand({
          TableName: STOCK_TABLE,
          Item: {
            product_id: product.id,
            count: stockCount,
          },
        })
      );

      console.log(`✅ ${product.title} - Stock: ${stockCount}`);
    } catch (error) {
      console.error(`❌ Failed to add product: ${product.title}`, error);
      throw error;
    }
  }

  console.log("\n🎉 Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("Failed adding data:", err);
  process.exit(1);
});
