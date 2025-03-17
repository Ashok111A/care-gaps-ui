import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, User, Calendar, Users,ClipboardPlus } from 'lucide-react';
const IndividualResults = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedImprovement, setExpandedImprovement] = useState(false);
  const [isStatementResultsExpanded, setStatementResultsExpanded] = useState(false);
  const [observedCareGaps, setobservedCareGaps] = useState("");
  const [improvements, setImprovements] = useState("");
  const [isIssueDetected, setIssueDetected] = useState("");
  const [isCareGapDetected, setIsCareGapDetected] = useState(false);
  const individualResultsReport = useLocation().state;
  const aisummary=useLocation().state.SummaryInsights;

  const patient =individualResultsReport.individualCalculationResult.patientData
  
  const detectedIssues = Object.keys( individualResultsReport.gapsResult.results).length>0
  ? individualResultsReport.gapsResult.results.entry
      .filter(e => e?.resource?.resourceType === "DetectedIssue")
      .map(e => e.resource)
  : [];
  const toggleExpand = () => {
    setStatementResultsExpanded(!isStatementResultsExpanded);
  };


  function isCareGapsObserved(){
    
  }
  return (
    <div className="flex flex-col " style={{ height: "auto", minHeight: "100%" }} >

      <div className="flex flex-col md:flex-row gap-6 p-6 ">

        <div className="d-flex flex-col">

          <div >
    

<div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <User className="h-6 w-6 text-black" />
            <p className='text-black' style={{fontSize:'20px'}}>  Patient Information</p>
            </h2>
          </div>

          <div className="p-6">
            {patient ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <Users className="h-5 w-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-black font-medium">Full Name</div>
                    <div className="text-gray-900">
                      {patient.fullName
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <Calendar className="h-5 w-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-black font-medium">Birth Date</div>
                    <div className="text-gray-900">{patient.birthDate}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <User className="h-5 w-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-black font-medium">Gender</div>
                    <div className="text-gray-900 capitalize">{patient.gender}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No patient data available</p>
              </div>
            )}
          </div>
        </div>
            </div>

          

         
  
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-3" >
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {/* <AlertTriangle className="h-6 w-6 text-red-500" /> */}
<p className="text-black" style={{fontSize:'20px'}}>Gaps in Care Assessment</p>

            </h2>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Issues List */}
            <div className="mb-6">
              {/* <h3 className="text-lg font-semibold text-gray-800 mb-3">Detected Issues</h3> */}
              {detectedIssues.length > 0 ? (
                <ul className="space-y-2">
                  {detectedIssues.map((issue, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 bg-red-50 text-red-700 p-3 rounded-lg"
                    >
                      <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>{issue.code?.coding?.[0]?.display || "Unknown Issue"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-medium">No detected issues</p>
                </div>
              )}
            </div>

            {/* AI Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Detected Issue</h3>
              <p className="text-gray-700 leading-relaxed">
                {aisummary.DetectedIssue}
              </p>
            </div>
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
                {aisummary.CareGapsObserved}
              </p>
            </div>
          )}

          <div className="flex items-center p-4 bg-blue-100 text-blue-700 rounded-lg border border-blue-400 cursor-pointer mt-4" onClick={() => setExpandedImprovement(!expandedImprovement)}>
            <span>Potential Areas for Improvement. Click to expand.</span>
          </div>

          {expandedImprovement && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">Potential Areas for Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {aisummary.PIA}
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
            {isStatementResultsExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>

            )}
          </button>

          <div className={`transition-all duration-300 ease-in-out ${isStatementResultsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
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
                    <p className="text-sm mt-2">Result: {item.pretty

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
