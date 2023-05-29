import dotenv from "dotenv";

dotenv.config();

export const config = {
    SQL_URL: process.env.SQL_URL as string
}

const incompleteEntry = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (incompleteEntry.length > 0) {
  throw new Error(`Missing Configuration: ${incompleteEntry.join(", ")}`);
}