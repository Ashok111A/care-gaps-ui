import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
const IndividualResults = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedImprovement, setExpandedImprovement] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [observedCareGaps, setobservedCareGaps] = useState("");
  const [improvements, setImprovements] = useState("");
  const individualResultsReport = useLocation().state;
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    extractSections(individualResultsReport.summary)
  })
  const extractSections = (text) => {
    const careGapsMatch = text.match(/## Care Gaps Observed([\s\S]*?)## Potential Areas for Improvement/);
    const potentialAreasMatch = text.match(/## Potential Areas for Improvement([\s\S]*)/);
    const careGaps = careGapsMatch ? careGapsMatch[1].trim() : null;
    const potentialAreas = potentialAreasMatch ? potentialAreasMatch[1].trim() : null;
    setobservedCareGaps(careGaps)
    setImprovements(potentialAreas)
  };
  return (
    <div className="flex flex-col " style={{ height: "auto", minHeight: "100%" }} >

      <div className="flex flex-col md:flex-row gap-6 p-6 ">

        <div className="d-flex flex-col">

          <div >
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md border border-gray-300 flex items-center gap-4">

              <img
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
                alt="Patient"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />

              <div>
                <h2 className="text-lg font-semibold">Patient Information</h2>
                <p className="text-sm mt-2"><strong>Name: </strong> {individualResultsReport.individualCalculationResult?.patientData?.fullName}</p>
                <p className="text-sm mt-2">
                  <strong>Date Of Birth: </strong> <span className="text-blue-600">{individualResultsReport.individualCalculationResult?.patientData?.birthDate}</span>
                </p>
                <p className="text-sm mt-1"><strong>Gender: </strong>{individualResultsReport.individualCalculationResult?.patientData?.gender}</p>
              </div>
            </div>

          </div>
        
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg ">
            <div class="p-4">
              <h5 class="mb-2 text-slate-800 text-xl font-semibold">
                Measure Report
              </h5>
              <p class="text-slate-600 leading-normal font-light">
                MeasureScore: 0
              </p>
              <p class="text-slate-600 leading-normal font-light">
                Detected Issue : BMI High
              </p>

            </div>
          </div>
        </div>


        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Clinical Quality Report</h2>
          <ul className="divide-y divide-gray-300">
            {individualResultsReport.individualCalculationResult.populationResults.map((item) => (
              <li key={item.populationType} className="p-3 flex justify-between items-center">
                <span className="text-gray-700">{item.criteriaExpression}:</span>
                <span className={`px-2 py-1 text-sm font-medium text-white rounded-lg ${item.result ? 'bg-green-500' : 'bg-red-500'}`}>
                  {item.result ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  )}
                </span>

              </li>
            ))}
          </ul>
          <div className="flex items-center p-4 bg-red-100 text-red-700 rounded-lg border border-red-400 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <svg className="h-5 w-5 mr-2 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.366-.773 1.42-.773 1.786 0l7.071 14.142c.37.738-.157 1.631-.893 1.631H2.786c-.736 0-1.262-.893-.893-1.631l7.07-14.142zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-1-3a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            <span>Significant care gaps observed. Click to expand.</span>
          </div>

          {expanded && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">Care Gaps Observed</h3>
              <p className="text-gray-700 mt-2">
                {observedCareGaps.split("- Specific demographic groups identified:")[0].trim()}
              </p>

              <h4 className="font-medium mt-2">Specific Demographic Groups Identified:</h4>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Not Hispanic or Latino</li>
                <li>Asian</li>
              </ul>

              <h4 className="font-medium mt-2">Gender Identified:</h4>
              <p className="text-gray-700">Female</p>
            </div>
          )}

          <div className="flex items-center p-4 bg-blue-100 text-blue-700 rounded-lg border border-blue-400 cursor-pointer mt-4" onClick={() => setExpandedImprovement(!expandedImprovement)}>
            <span>Potential Areas for Improvement. Click to expand.</span>
          </div>

          {expandedImprovement && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">Potential Areas for Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {improvements.split("- **").map((item, index) =>
                  item.trim() ? <li key={index} className="mt-2"><strong>{item.split(":")[0]}</strong>: {item.split(":").slice(1).join(":")}</li> : null
                )}
              </ul>
            </div>
          )}

        </div>

      </div>

      <div className="w-full">
        <div className="border-2 border-gray-400 rounded-lg bg-white" style={{ overflow: 'auto' }}>
          <button
            onClick={toggleExpand}
            className="w-full p-4 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">Statement Results</span>
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>

            )}
          </button>

          <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`} style={{ overflow: 'auto' }}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {individualResultsReport.individualCalculationResult.statementResults.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white text-gray-900 p-6 rounded-lg shadow-md border border-gray-300 transition-all duration-300"
                  >
                    <p className="text-sm mt-2">Library: {item.libraryName}</p>
                    <p className="text-sm mt-2">Statement: {item.statementName}</p>
                    <p className="text-sm mt-2">Result: {item.localId
                    }</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default IndividualResults