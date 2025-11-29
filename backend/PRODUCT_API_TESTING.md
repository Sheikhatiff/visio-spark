# Product API Testing Guide

All product-related code has been integrated into `server.js`. This guide shows how to test the product endpoints.

## Setup

1. Ensure MongoDB is running
2. Create a `public/productImg` directory for image uploads:
   ```bash
   mkdir -p public/productImg
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Authentication

For all product operations, you need to authenticate with headers:

- `user-id`: Your Clerk user ID
- `user-email`: Your email address

For **create/update/delete** operations, the user must have **admin role** (email must be `ininsico@gmail.com`)

## Product API Endpoints

### 1. Create Product (Admin Only)

**POST** `/api/products`

- **Auth**: Required (Admin only)
- **Content-Type**: `multipart/form-data`

**Request Body:**

```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200,
  "stock": 5,
  "category": "electronics",
  "status": "active"
}
```

**File Upload:**

```
image: (binary file)
```

**Example cURL:**

```bash
curl -X POST http://localhost:5000/api/products \
  -H "user-id: your-clerk-id" \
  -H "user-email: ininsico@gmail.com" \
  -F "name=Laptop" \
  -F "description=High-performance laptop" \
  -F "price=1200" \
  -F "stock=5" \
  -F "category=electronics" \
  -F "status=active" \
  -F "image=@/path/to/image.jpg"
```

**Success Response (201):**

```json
{
  "status": "success",
  "message": "Product inserted successfully",
  "data": {
    "product": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "image": "/productImg/product-1234567890.jpg",
      "description": "High-performance laptop",
      "price": 1200,
      "stock": 5,
      "category": "electronics",
      "status": "active",
      "createdAt": "2025-11-29T10:00:00.000Z"
    }
  }
}
```

---

### 2. Get All Products

**GET** `/api/products`

- **Auth**: Optional
- **No Request Body**

**Example cURL:**

```bash
curl http://localhost:5000/api/products
```

**Success Response (200):**

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "products": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Laptop",
        "image": "/productImg/product-1234567890.jpg",
        "description": "High-performance laptop",
        "price": 1200,
        "stock": 5,
        "category": "electronics",
        "status": "active",
        "createdAt": "2025-11-29T10:00:00.000Z",
        "updatedAt": "2025-11-29T10:00:00.000Z"
      }
    ],
    "totals": {
      "totalProducts": 1,
      "totalStockUnits": 5,
      "totalInventoryValue": 6000
    }
  }
}
```

---

### 3. Get Product by ID

**GET** `/api/products/:id`

- **Auth**: Optional
- **No Request Body**

**Example cURL:**

```bash
curl http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

**Success Response (200):**

```json
{
  "status": "success",
  "data": {
    "product": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "image": "/productImg/product-1234567890.jpg",
      "description": "High-performance laptop",
      "price": 1200,
      "stock": 5,
      "category": "electronics",
      "status": "active",
      "createdAt": "2025-11-29T10:00:00.000Z",
      "updatedAt": "2025-11-29T10:00:00.000Z"
    }
  }
}
```

---

### 4. Update Product (Admin Only)

**PUT** `/api/products/:id`

- **Auth**: Required (Admin only)
- **Content-Type**: `multipart/form-data` (if uploading image)

**Request Body (all fields optional):**

```json
{
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop",
  "price": 1500,
  "stock": 3,
  "category": "electronics",
  "status": "active"
}
```

**Example cURL (without image):**

```bash
curl -X PUT http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "user-id: your-clerk-id" \
  -H "user-email: ininsico@gmail.com" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Laptop",
    "price": 1500,
    "stock": 3
  }'
```

**Example cURL (with image):**

```bash
curl -X PUT http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "user-id: your-clerk-id" \
  -H "user-email: ininsico@gmail.com" \
  -F "name=Gaming Laptop" \
  -F "price=1500" \
  -F "stock=3" \
  -F "image=@/path/to/new-image.jpg"
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "product": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Gaming Laptop",
      "image": "/productImg/product-1234567891.jpg",
      "description": "High-performance gaming laptop",
      "price": 1500,
      "stock": 3,
      "category": "electronics",
      "status": "active",
      "createdAt": "2025-11-29T10:00:00.000Z",
      "updatedAt": "2025-11-29T10:05:00.000Z"
    }
  }
}
```

---

### 5. Delete Product (Admin Only)

**DELETE** `/api/products/:id`

- **Auth**: Required (Admin only)
- **No Request Body**

**Example cURL:**

```bash
curl -X DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "user-id: your-clerk-id" \
  -H "user-email: ininsico@gmail.com"
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Product deleted successfully",
  "data": {
    "deletedProduct": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Gaming Laptop"
    }
  }
}
```

---

### 6. Get Product Totals

**GET** `/api/products/totals`

- **Auth**: Optional
- **No Request Body**

**Example cURL:**

```bash
curl http://localhost:5000/api/products/totals
```

**Success Response (200):**

```json
{
  "status": "success",
  "data": {
    "totals": {
      "totalProducts": 1,
      "totalStockUnits": 3,
      "totalInventoryValue": 4500,
      "averageProductPrice": 1500
    }
  }
}
```

---

## Valid Categories

When creating or updating products, use one of these categories:

- `electronics`
- `clothing`
- `food`
- `books`
- `furniture`
- `other`

## Valid Status Values

- `active` (product is available for purchase)
- `out of stock` (product is not available)

## Error Responses

### 400 Bad Request

```json
{
  "error": "Valid product name is required"
}
```

### 401 Unauthorized

```json
{
  "error": "User ID and Email required"
}
```

### 403 Forbidden

```json
{
  "error": "Admin access required"
}
```

### 404 Not Found

```json
{
  "error": "Product not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error message"
}
```

---

## Testing with Postman

1. Create a new request
2. Set the method and URL
3. Go to **Headers** tab and add:
   ```
   user-id: your-clerk-id
   user-email: ininsico@gmail.com
   ```
4. For POST/PUT with images:
   - Set Content-Type to `multipart/form-data`
   - Use the **Body** → **form-data** option
   - Upload the image file
5. Send the request

---

## Notes

- All timestamps are in UTC (ISO 8601 format)
- Product images are stored in `public/productImg/`
- Image URLs are relative paths starting with `/productImg/`
- Image file size limit: 5MB
- Only image files are accepted (jpg, png, gif, webp, etc.)
- Stock must be a non-negative integer
- Price must be a non-negative number
- Name max length: 100 characters
- Description max length: 500 characters
