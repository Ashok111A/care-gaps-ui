// config.tsx
import dotenv from "dotenv";

// For development, load variables from .env file.
// if (import.meta.env.NODE_ENV !== "production") {

// 	dotenv.config();
// }

interface AppConfig {
	fhirServerUrl: string;
	vsApiKey: string;
	ecqmConnectApiUrl: string;
	nodeEnv: string;
	openaiApiKey: string;
}

// Production defaults (you may update these as needed)
const productionConfig: AppConfig = {
	fhirServerUrl: import.meta.env.FHIR_SERVER_URL ?? "https://production.fhir.server/fhir",
	vsApiKey: import.meta.env.VS_API_KEY ?? "prod-vs-api-key",
	ecqmConnectApiUrl: import.meta.env.ECQM_CONNECT_API_URL ?? "https://api.ecqmconnect.com",
	openaiApiKey: import.meta.env.OPENAI_API_KEY?? "",
	nodeEnv: "production",
};

// Development defaults
const developmentConfig: AppConfig = {
	fhirServerUrl: import.meta.env.FHIR_SERVER_URL ?? "http://localhost:8080/fhir",
	vsApiKey: import.meta.env.VS_API_KEY ?? "dev-vs-api-key",
	ecqmConnectApiUrl: import.meta.env.ECQM_CONNECT_API_URL ?? "http://localhost:3000",
	openaiApiKey: import.meta.env.OPENAI_API_KEY ?? "",
	nodeEnv: "development",
};

// Export the appropriate config based on NODE_ENV.
export const config: AppConfig =
	import.meta.env.NODE_ENV === "production" ? productionConfig : developmentConfig;

/**
 * Helper function to expose a subset of environment variables to the client.
 * (Do NOT expose sensitive values such as API keys.)
 */
export function getClientEnv() {
	return {
		FHIR_SERVER_URL: config.fhirServerUrl,
		ECQM_CONNECT_API_URL: config.ecqmConnectApiUrl,
		NODE_ENV: config.nodeEnv,
	};
}
