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
    const [measureId, setSelectedMeasure] = useState("")
    const [compute, setCompute] = useState(false)
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
    async function fetchPatientEverything(id) {


        const url = `https://hapi.fhir.exf.health/fhir/Patient/${id}/$everything?_format=json&_pretty=true`;
        console.log(`Fetching available measures from: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch measures: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }
    async function LetsPlay() {
        setCompute(true)
        const measureId = "PCSBMIScreenAndFollowUpFHIR";
        const patientId = selectedPatient;
        const measurementPeriodStart = startDate;
        const measurementPeriodEnd = endDate;
        const calculationOptionsStr = ""
        const processData = false;
        if (
            !measureId ||
            !patientId ||
            !measurementPeriodStart ||
            !measurementPeriodEnd
        ) {

            return new Response(JSON.stringify({ error: "Missing required input", status: 400 }), {
                headers: { "Content-Type": "application/json" }
            });
        }

        let calculationOptions = {};
        if (calculationOptionsStr && typeof calculationOptionsStr === "string") {
            try {
                calculationOptions = JSON.parse(calculationOptionsStr);
            } catch (error) {
                calculationOptions = { error: "Invalid JSON" };
            }
        }

        const actionData = {
            measureId: measureId,
            patientId: patientId,
            measurementPeriodStart: measurementPeriodStart,
            measurementPeriodEnd: measurementPeriodEnd,
            calculationOptions,
        };


        const patientBundle = await fetchPatientEverything(actionData.patientId);
        console.log("HVVKH", patientBundle)

        const measureBundleFile = `${actionData.measureId}-bundle.json`;
        const payload = {
            measureBundleFile,
            patientBundles: [patientBundle],
            processData,
            calculationOptions: {
                measurementPeriodStart: actionData.measurementPeriodStart,
                measurementPeriodEnd: actionData.measurementPeriodEnd,

                calculateHTML: false,
                reportType: "individual",
                ...actionData.calculationOptions,
            },
        };

        async function callApi(endpoint, payload) {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(
                    `Error calling ${endpoint}: ${response.status} ${response.statusText} - ${errMsg}`
                );
            }
            return response.json();
        }


        try {

            let [
                individualCalculationResult,
                gapsResult,
            ] = await Promise.all([
                callApi("/api/calculate", payload),
                callApi("/api/calculateGapsInCare", payload),
            ]);
            console.log(gapsResult, "GAPS0");
            console.log(individualCalculationResult, "GAPS!")
            const populationResults = processData
                ? (individualCalculationResult.results[0]?.detailedResults[0] || { populationResults: [], statementResults: [] }).populationResults
                : individualCalculationResult.populationResults;

            const relevantStatements = processData
                ? (individualCalculationResult.results[0]?.detailedResults[0] || { statementResults: [] }).statementResults.filter(
                    (stmt) => stmt.relevance === "TRUE" && !stmt.isFunction
                )
                : individualCalculationResult.statementResults.filter(
                    (stmt) => stmt.relevance === "TRUE" && !stmt.isFunction
                );

            let relevantStatementsValue = relevantStatements.map((stmt) => ({
                [`${stmt.libraryName}.${stmt.statementName}`]: stmt.pretty,
            }));

            const summary = await generateSummary({
                populationResults: populationResults,
                relevantStatements: relevantStatementsValue,
            });


            const transformData = (data) => {

                return {
                    fullName: `${data.name[0].given[0].value} ${data.name[0].family.value}`,
                    gender: data.gender.value,
                    birthDate: data.birthDate.value
                };
            };
            if (processData) {
                individualCalculationResult = {
                    patientData: transformData(individualCalculationResult.results[0].patientObject),
                    populationResults: individualCalculationResult.results[0].detailedResults[0].populationResults,
                    statementResults: individualCalculationResult.results[0].detailedResults[0].statementResults
                }
            }
            const combinedResults = {
                individualCalculationResult,
                gapsResult,
                summary
            };

            setCompute(false)
            navigate('/singlemeasureResult', {
                state: combinedResults
            });
            return new Response(JSON.stringify(combinedResults), {
                headers: { "Content-Type": "application/json" }
            });
        } catch (error) {
            console.error("Error during calculation:", error);
            return new Response(JSON.stringify({ error: error.message, status: 500 }), {
                headers: { "Content-Type": "application/json" }
            });
        }
    }

    async function fetchMeasure() {
        const response = await fetch('http://localhost:3000/api/measure-bundles');
        const data = await response.json();
        setMeasureBundle(data)
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-8 space-y-6">
                <div>
                    <label className="block text-[15px] font-medium text-gray-700 mb-2">
                        Select Measure
                    </label>
                    <select className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200" value={measureId} onChange={(e) => setSelectedMeasure(e.target.value)}>
                        {measureBundle?.measureBundles?.map((bundle) => (
                            <option key={bundle.measureId} value={bundle.measureId}>
                                {bundle.fileName}
                            </option>

                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-[15px] font-medium text-gray-700 mb-2">
                        Select Patient
                    </label>

                    <div className="relative">
                        <select
                            name="patientId"
                            className="w-full bg-white px-4 py-3 text-gray-900 text-[15px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                        >
                            <option value="" className="text-gray-500">Select a patient</option>
                            {patients.map((patient) => {
                                const patientName = patient.name && patient.name.length > 0
                                    ? patient.name
                                        .map((n) => [n.given?.join(" "), n.family].filter(Boolean).join(" "))
                                        .join(", ") + " - " + patient.id
                                    : patient.id;

                                return (
                                    <option
                                        key={patient.id}
                                        value={patient.id}
                                        className="py-2 px-4 text-[14px] text-gray-700 hover:bg-gray-100"
                                    >
                                        {patientName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[15px] font-medium text-gray-700 mb-2">
                            Measurement Period Start
                        </label>
                        <input
                            type="date"
                            className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[15px] font-medium text-gray-700 mb-2">
                            Measurement Period End
                        </label>
                        <input
                            type="date"
                            className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[15px] font-medium text-gray-700 mb-2">
                        Additional Calculation Options (JSON)
                    </label>
                    <textarea
                        className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200"
                        rows={3}
                        value={calculationOptions}
                        onChange={(e) => setCalculationOptions(e.target.value)}
                    />
                </div>
                {
                    !compute && <button
                        className="w-full bg-purple-600 text-white py-3 px-4 text-[15px] rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        onClick={LetsPlay}
                    >
                        Compute Report
                    </button>
                }
                {compute &&
                    <button
                        className="w-full bg-purple-600 text-white py-3 px-4 text-[15px] rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        onClick={LetsPlay}
                    >

                        Processing…

                    </button>}
            </div>
        </div>
    );
}

export default SingleMeasureSinglePatient;