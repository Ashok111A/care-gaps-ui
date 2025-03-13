import fetch from "node-fetch";
import { config } from "../config/config";

export async function fetchMeasures(): Promise<any> {
	console.log(config.ecqmConnectApiUrl)
	if (!config.ecqmConnectApiUrl) {
		throw new Error("ECQM_CONNECT_API_URL environment variable must be set.");
	}

	// Build URL to fetch the Patient list in JSON format
	const measuresUrl = `${config.ecqmConnectApiUrl}/api/measure-bundles`;
	console.log(`Fetching available measures from: ${measuresUrl}`);

	const response = await fetch(measuresUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch measures: ${response.status} ${response.statusText}`);
	}

	return await response.json();
}
