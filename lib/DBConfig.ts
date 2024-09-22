import { prismaInstance } from "./prismaInstance";

export async function ConnectDB() {
  try {
    await prismaInstance.$connect();
  } catch (error) {
    console.log(`Something went wrong. Failed to Connect to DB: ${error}`);
  } finally {
    await prismaInstance.$disconnect();
  }
}
