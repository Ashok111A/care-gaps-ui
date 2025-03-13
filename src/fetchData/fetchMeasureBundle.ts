// fetchMeasureBundle.ts
import fetch from "node-fetch";
import { config } from "../config/config";

export async function fetchMeasureBundle(measureId: string): Promise<any> {
	if (!config.ecqmConnectApiUrl) {
		throw new Error("ECQM_CONNECT_API_URL environment variable must be set.");
	}

	// Encode the measure title to safely include it in the URL
	const encodedId = encodeURIComponent(measureId);

	// Construct the URL using the measure title and desired query parameters
	const url = `${config.ecqmConnectApiUrl}/api/measure-bundles/${encodedId}`;
	console.log(`Fetching measure bundle from: ${url}`);

	// Fetch the measure bundle
	const response = await fetch(url);
	console.log("RESPONSE",response)
	if (!response.ok) {
		throw new Error(`Failed to fetch measure bundle: ${response.status} ${response.statusText}`);
	}

	const bundle = await response.json();
	return bundle;
}
