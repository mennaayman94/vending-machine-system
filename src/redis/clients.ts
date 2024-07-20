import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));
export const connectRedis = async () => {
  await redisClient.connect();
  console.log("redis connected");
};
export default redisClient;
