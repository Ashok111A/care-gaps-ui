import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateSummary } from "../fetchData/generateSummary";

function SingleMeasureSinglePatient() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [calculationOptions, setCalculationOptions] = useState('{ "calculateHTML": false }');
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [measureBundle, setMeasureBundle] = useState(null);
    const [measureId, setSelectedMeasure] = useState("");
    const [compute, setCompute] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
        fetchMeasure();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch("https://hapi.fhir.exf.health/fhir/Patient?_format=json&_count=100");
            if (!response.ok) throw new Error("Failed to fetch patients");
            const data = await response.json();
            setPatients(data.entry?.map((entry) => entry.resource) || []);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    async function fetchMeasure() {
        const response = await fetch("http://localhost:3000/api/measure-bundles");
        const data = await response.json();
        setMeasureBundle(data);
    }

    const validateInputs = () => {
        let errors = {};

        if (!measureId) errors.measureId = "Please select a measure.";
        if (!selectedPatient) errors.selectedPatient = "Please select a patient.";
        if (new Date(startDate) > new Date(endDate)) errors.dateRange = "Start date cannot be later than end date.";

        try {
            JSON.parse(calculationOptions);
        } catch {
            errors.calculationOptions = "Invalid JSON format.";
        }

        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
    };

    async function LetsPlay() {
        if (!validateInputs()) return;

        setCompute(true);
        const measureId = "PCSBMIScreenAndFollowUpFHIR";
        const patientId = selectedPatient;

        const measurementPeriodStart = startDate;
        const measurementPeriodEnd = endDate;
        const processData = false;

        const patientBundle = await fetchPatientEverything(patientId);
        console.log("Patient Data:", patientBundle);

        const measureBundleFile = `${measureId}-bundle.json`;
        const payload = {
            measureBundleFile,
            patientBundles: [patientBundle],
            processData,
            calculationOptions: {
                measurementPeriodStart,
                measurementPeriodEnd,
                calculateHTML: false,
                reportType: "individual",
            },
        };

        try {
            let [individualCalculationResult, gapsResult] = await Promise.all([
                callApi("/api/calculate", payload),
                callApi("/api/calculateGapsInCare", payload),
            ]);

            console.log("Gaps Result:", gapsResult);
            console.log("Individual Calculation Result:", individualCalculationResult);

            const summary = await generateSummary({
                populationResults: individualCalculationResult.populationResults,
                relevantStatements: [],
            });

            const SummaryInsights = JSON.parse(summary).insights;

            const combinedResults = {
                individualCalculationResult,
                gapsResult,
                SummaryInsights,
            };

            setCompute(false);
            navigate("/singlemeasureResult", { state: combinedResults });
        } catch (error) {
            console.error("Error during calculation:", error);
            setErrorMessages({ api: "An error occurred while computing the report." });
            setCompute(false);
        }
    }

    async function fetchPatientEverything(id) {
        const url = `https://hapi.fhir.exf.health/fhir/Patient/${id}/$everything?_format=json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch patient data: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    async function callApi(endpoint, payload) {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(`Error calling ${endpoint}: ${response.status} ${response.statusText} - ${errMsg}`);
        }
        return response.json();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-8 space-y-6">

                <div>
                    <label className="block text-[15px] font-medium text-gray-700 mb-2">Select Measure</label>
                    <select
                        className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                        value={measureId}
                        onChange={(e) => {
                            setSelectedMeasure(e.target.value);
                            setErrorMessages((prev) => ({ ...prev, measureId: "" }));
                        }}
                    >
                        <option value="">Select a measure</option>
                        {measureBundle?.measureBundles?.map((bundle) => (
                            <option key={bundle.measureId} value={bundle.measureId}>
                                {bundle.fileName}
                            </option>
                        ))}
                    </select>
                    {errorMessages.measureId && <p className="text-red-500 text-sm mt-1">{errorMessages.measureId}</p>}
                </div>

                <div>
                    <label className="block text-[15px] font-medium text-gray-700 mb-2">Select Patient</label>
                    <select
                        className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-300"
                        value={selectedPatient}
                        onChange={(e) => {
                            setSelectedPatient(e.target.value);
                            setErrorMessages((prev) => ({ ...prev, selectedPatient: "" }));
                        }}
                    >
                        <option value="">Select a patient</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name?.[0]?.given?.join(" ") || "Unknown"} {patient.name?.[0]?.family || ""} - {patient.id}
                            </option>
                        ))}
                    </select>
                    {errorMessages.selectedPatient && <p className="text-red-500 text-sm mt-1">{errorMessages.selectedPatient}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[15px] font-medium text-gray-700 mb-2">Measurement Period Start</label>
                        <input type="date" className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                            value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[15px] font-medium text-gray-700 mb-2">Measurement Period End</label>
                        <input type="date" className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                            value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label className="block text-[15px] font-medium text-gray-700 mb-2">Additional Calculation Options (JSON)</label>
                    <textarea
                        className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                        rows={3}
                        value={calculationOptions}
                        onChange={(e) => {
                            setCalculationOptions(e.target.value);
                            try {
                                JSON.parse(e.target.value);
                                setErrorMessages((prev) => ({ ...prev, calculationOptions: "" }));
                            } catch {
                                setErrorMessages((prev) => ({ ...prev, calculationOptions: "Invalid JSON format." }));
                            }
                        }}
                    />
                    {errorMessages.calculationOptions && <p className="text-red-500 text-sm mt-1">{errorMessages.calculationOptions}</p>}
                </div>

                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700"
                    onClick={LetsPlay} disabled={compute}>
                    {compute ? "Processing…" : "Compute Report"}
                </button>
            </div>
        </div>
    );
}

export default SingleMeasureSinglePatient;
