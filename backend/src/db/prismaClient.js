// Return a PrismaClient
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// Setup the raw database connection using the 'pg' driver
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Wrap it in Prisma's PostgreSQL adapter
const adapter = new PrismaPg(pool);

// Pass the adapter directly into the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

export default prisma;