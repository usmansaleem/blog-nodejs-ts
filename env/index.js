let dotenv = require("dotenv");
const fs = require("fs");
const { COPYFILE_EXCL } = fs.constants; // cause failure if dest exists

// Set default to "development"
const nodeEnv = process.env.ENV_FILE || "development";

// Copy from .env.sample to .env if required
const envFile = `./env/${nodeEnv}.env`;
const sampleEnvFile = `${envFile}.sample`;
if (!fs.existsSync(envFile)) {
  try {
    fs.copyFileSync(sampleEnvFile, envFile, COPYFILE_EXCL);
  } catch (err) {
    console.log(err);
  }
}

// load .env file
const result2 = dotenv.config({
  path: envFile
});

if (result2.error) {
  throw result2.error;
}
