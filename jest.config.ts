import { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	testEnvironment: "node",
	setupFiles: ["dotenv/config"],
};

export default config;
