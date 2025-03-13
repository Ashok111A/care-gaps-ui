import fetch from "node-fetch";

export async function fetchPatients(): Promise<any> {
	const fhirServerUrl = process.env.FHIR_SERVER_URL;
	if (!fhirServerUrl) {
		throw new Error("FHIR_SERVER_URL environment variable must be set.");
	}

	// Build URL to fetch the Patient list in JSON format
	const patientsUrl = `${fhirServerUrl}/Patient?_format=json&_count=100`;
	console.log(`Fetching patients from: ${patientsUrl}`);

	const response = await fetch(patientsUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch patients: ${response.status} ${response.statusText}`);
	}

	const patientsBundle = await response.json();
	return patientsBundle;
}
