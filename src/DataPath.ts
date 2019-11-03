import { logger } from "@shared";
import path from "path";

// Resolve and export data path
const dataFile = path.resolve(process.env.DATA_PATH || "../data/data.json");
logger.info("Data File Path: " + dataFile);

export default dataFile;
