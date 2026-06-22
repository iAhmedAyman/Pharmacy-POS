# Pharmacy Inventory & Sales Management System

This is a backend project I made to practice backend development,
database design, and building APIs using Node.js, Express, PostgreSQL,
and Prisma.

The system manages products, inventory batches, customers, and sales.
Inventory is tracked using batches with expiration dates, and FEFO
(First Expired First Out) is used when selecting which batches to sell
from.

## Features

-   JWT authentication
-   Role-based authorization (Admin and Pharmacist)
-   Product management
-   Batch management
-   Customer management
-   Sales management
-   FEFO inventory allocation
-   Request validation using Zod
-   PostgreSQL database with Prisma ORM

## Tech Stack

-   Node.js
-   Express.js
-   PostgreSQL
-   Prisma ORM
-   JWT
-   bcrypt
-   Zod

## Database

The main entities in the system are:

-   User
-   Customer
-   ProductCategory
-   Product
-   Batch
-   Sale
-   SaleItem

A product can have multiple batches with different expiration dates and
quantities.

When creating a sale, the system automatically selects available batches
using FEFO. If a single batch does not have enough quantity, the sale
can use multiple batches.

## Project Structure

    src/
    ├── controllers/
    ├── services/
    ├── routes/
    ├── middlewares/
    ├── db/
    └── utils/

    prisma/
    ├── schema.prisma
    └── migrations/

## Running the Project

Install dependencies:

``` bash
npm install
```

Create a `.env` file:

``` env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

Run migrations:

``` bash
npx prisma migrate deploy
```

Start the server:

``` bash
npm start
```

## Future Improvements

-   Barcode support
-   Supplier management
-   Reports and analytics
-   Receipt generation
-   Automated testing
-   Improving API workflows
