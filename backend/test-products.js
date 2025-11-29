#!/usr/bin/env node

/**
 * Quick Product API Test Script
 *
 * Usage: node test-products.js [action] [options]
 *
 * Actions:
 *   list              - List all products
 *   get <id>          - Get product by ID
 *   create <name>     - Create a new product
 *   update <id>       - Update a product
 *   delete <id>       - Delete a product
 *   totals            - Get product totals
 *
 * Example:
 *   node test-products.js list
 *   node test-products.js create "My Product"
 *   node test-products.js get 507f1f77bcf86cd799439011
 */

const http = require("http");
const { URL } = require("url");

const API_URL = "http://localhost:5000";
const USER_ID = "test-user-123";
const USER_EMAIL = "ininsico@gmail.com"; // Admin email

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        "Content-Type": "application/json",
        "user-id": USER_ID,
        "user-email": USER_EMAIL,
      },
    };

    const req = http.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on("error", reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function listProducts() {
  console.log("\n📦 Getting all products...\n");
  try {
    const result = await makeRequest("GET", "/api/products");
    console.log("Status:", result.status);
    console.log("Response:", JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function getProduct(id) {
  console.log(`\n📦 Getting product ${id}...\n`);
  try {
    const result = await makeRequest("GET", `/api/products/${id}`);
    console.log("Status:", result.status);
    console.log("Response:", JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function createProduct(name) {
  console.log(`\n➕ Creating product "${name}"...\n`);
  try {
    const productData = {
      name: name,
      description: `This is a ${name} product`,
      price: 99.99,
      stock: 10,
      category: "electronics",
      status: "active",
    };

    const result = await makeRequest("POST", "/api/products", productData);
    console.log("Status:", result.status);
    console.log("Response:", JSON.stringify(result.data, null, 2));

    if (result.status === 201 && result.data.data?.product?.id) {
      console.log(
        `\n✅ Product created with ID: ${result.data.data.product.id}`
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function updateProduct(id) {
  console.log(`\n✏️  Updating product ${id}...\n`);
  try {
    const updateData = {
      name: "Updated Product Name",
      price: 149.99,
      stock: 5,
      status: "active",
    };

    const result = await makeRequest("PUT", `/api/products/${id}`, updateData);
    console.log("Status:", result.status);
    console.log("Response:", JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function deleteProduct(id) {
  console.log(`\n🗑️  Deleting product ${id}...\n`);
  try {
    const result = await makeRequest("DELETE", `/api/products/${id}`);
    console.log("Status:", result.status);
    console.log("Response:", JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function getTotals() {
  console.log("\n📊 Getting product totals...\n");
  try {
    const result = await makeRequest("GET", "/api/products/totals");
    console.log("Status:", result.status);
    console.log("Response:", JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const action = args[0];

  if (!action) {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║           Product API Test Script                              ║
╚════════════════════════════════════════════════════════════════╝

Usage: node test-products.js [action] [options]

Actions:
  list                     - List all products
  get <id>                 - Get product by ID
  create <name>            - Create a new product
  update <id>              - Update a product
  delete <id>              - Delete a product
  totals                   - Get product totals

Examples:
  node test-products.js list
  node test-products.js create "Laptop Pro"
  node test-products.js get 507f1f77bcf86cd799439011
  node test-products.js update 507f1f77bcf86cd799439011
  node test-products.js delete 507f1f77bcf86cd799439011
  node test-products.js totals

Make sure:
  1. MongoDB is running
  2. Server is running on http://localhost:5000
  3. Admin user email is set to: ${USER_EMAIL}
    `);
    process.exit(0);
  }

  switch (action) {
    case "list":
      await listProducts();
      break;
    case "get":
      if (args[1]) {
        await getProduct(args[1]);
      } else {
        console.error("Error: Please provide a product ID");
        console.error("Usage: node test-products.js get <id>");
      }
      break;
    case "create":
      if (args[1]) {
        await createProduct(args[1]);
      } else {
        console.error("Error: Please provide a product name");
        console.error('Usage: node test-products.js create "Product Name"');
      }
      break;
    case "update":
      if (args[1]) {
        await updateProduct(args[1]);
      } else {
        console.error("Error: Please provide a product ID");
        console.error("Usage: node test-products.js update <id>");
      }
      break;
    case "delete":
      if (args[1]) {
        await deleteProduct(args[1]);
      } else {
        console.error("Error: Please provide a product ID");
        console.error("Usage: node test-products.js delete <id>");
      }
      break;
    case "totals":
      await getTotals();
      break;
    default:
      console.error(`Unknown action: ${action}`);
      console.error('Run "node test-products.js" for help');
  }
}

main().catch(console.error);
