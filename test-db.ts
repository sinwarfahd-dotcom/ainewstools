import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing connection...');
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Connection successful:', result);
    
    const count = await prisma.tool.count();
    console.log('Tool count:', count);
  } catch (error) {
    console.error('Connection failed:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
