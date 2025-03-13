import fetch from "node-fetch";

export async function fetchPatientEverything(patientId: string): Promise<any> {
	const fhirServerUrl = process.env.FHIR_SERVER_URL;
	if (!fhirServerUrl) {
		throw new Error("FHIR_SERVER_URL environment variable must be set.");
	}

	// Construct the URL using the $everything operation
	const url = `${fhirServerUrl}/Patient/${patientId}/$everything?_format=json&_pretty=true`;
	console.log(`Fetching everything for patient ${patientId} from: ${url}`);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch data for patient ${patientId}: ${response.status} ${response.statusText}`);
	}

	const patientBundle = await response.json();
	return patientBundle;
}

export async function fetchPatientBundles(patientIds: string[]): Promise<any[]> {
	// Using Promise.all to fetch bundles concurrently for each patient
	const bundles = await Promise.all(
		patientIds.map(async (id) => {
			try {
				return await fetchPatientEverything(id);
			} catch (error) {
				console.error(`Error fetching bundle for patient ${id}:`, error);
				return null;
			}
		})
	);

	// Filter out any null results if a fetch failed
	return bundles.filter((bundle) => bundle !== null);
}
