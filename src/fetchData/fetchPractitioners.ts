import fetch from "node-fetch";

export async function fetchPractitioners(): Promise<any> {
	const fhirServerUrl = process.env.FHIR_SERVER_URL;
	if (!fhirServerUrl) {
		throw new Error("FHIR_SERVER_URL environment variable must be set.");
	}

	// Build URL to fetch the Practitioner list in JSON format
	const practitionersUrl = `${fhirServerUrl}/Practitioner?_format=json`;
	console.log(`Fetching practitioners from: ${practitionersUrl}`);

	const response = await fetch(practitionersUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch practitioners: ${response.status} ${response.statusText}`);
	}

	const practitionersBundle = await response.json();
	return practitionersBundle;
}
