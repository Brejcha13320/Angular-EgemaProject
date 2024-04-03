const { writeFileSync, mkdirSync } = require("fs");
require("dotenv").config();

const envDirectory = "./src/environments";
const targetDevPath = `${envDirectory}/environment.ts`;

const envConfigFile = ` export const environment = {
  apiBaseUrl: "${process.env.API_BASE_URL}"
}
`;

mkdirSync(`${envDirectory}`, { recursive: true });

writeFileSync(targetDevPath, envConfigFile);
