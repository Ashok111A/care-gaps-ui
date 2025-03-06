import React, { useState } from 'react'

const SingleMeasureSinglePatient = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedImprovement, setExpandedImprovement] = useState(false);
  return (
    <div className="flex flex-col" style={{ height: "auto", minHeight: "100%" }} >
      <div className="flex flex-col md:flex-row gap-6 p-6 border">
        {/* Patient Card */}
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
                <p className="text-sm mt-2"><strong>Name:</strong> Jhon</p>
                <p className="text-sm mt-2">
                  <strong>Date Of Birth:</strong> <span className="text-blue-600">30/04/2000</span>
                </p>
                <p className="text-sm mt-1"><strong>Value:</strong> F, Female</p>
              </div>
            </div>

          </div>
          <table class="min-w-full divide-y  border border-radius  p-3 divide-gray-200 " style={{ marginTop: 60 }}>
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Population Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criteria Expression
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  initial-population
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Initial Population
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  No
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  denominator
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Denominator
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  No
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  denominator-exclusion
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Denominator Exclusions
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  No
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  numerator
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Numerator
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  No
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  denominator-exception
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Denominator Exceptions
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  No
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        {/* Clinical Quality Report */}

        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Clinical Quality Report</h2>
          <ul className="divide-y divide-gray-300">
            {["Initial Population", "Denominator", "Denominator Exclusions", "Numerator", "Denominator Exceptions"].map((item) => (
              <li key={item} className="p-3 flex justify-between items-center">
                <span className="text-gray-700">{item}:</span>
                <span className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-lg">Not Met</span>
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
              <p className="text-gray-700 mt-2">No patients were identified in any of the key population categories, indicating a lack of eligible patients for the measure.</p>
              <p className="text-gray-700 mt-2">Relevant statements show that there are no recorded instances of patients meeting the criteria, particularly for specific demographic groups (e.g., Not Hispanic or Latino, Asian).</p>
            </div>
          )}

          <div className="flex items-center p-4 bg-blue-100 text-blue-700 rounded-lg border border-blue-400 cursor-pointer mt-4" onClick={() => setExpandedImprovement(!expandedImprovement)}>
            <span>Potential Areas for Improvement. Click to expand.</span>
          </div>

          {expandedImprovement && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">Potential Areas for Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li><strong>Patient Identification:</strong> Enhance outreach and identification processes to capture eligible patients for the measure.</li>
                <li><strong>Data Collection:</strong> Review and improve data collection practices to ensure accurate demographic reporting and compliance with measure requirements.</li>
                <li><strong>Engagement with Population Groups:</strong> Develop targeted strategies to engage with underrepresented populations identified in the relevant statements.</li>
              </ul>
            </div>
          )}
        </div>

      </div>
      <div className="mt-6 w-full mb-3" style={{ height: 'auto' }}>
        <div className="border-2 border-gray-400 rounded-lg p-6 w-full bg-white">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white text-gray-900 p-6 rounded-lg shadow-md border border-gray-300">
                <h2 className="text-lg font-semibold">Library</h2>
                <p className="text-sm mt-2">SupplementalDataElements</p>
              </div>
            ))}
            {[...Array(3)].map((_, i) => (
              <div key={i + 3} className="bg-white text-gray-900 p-6 rounded-lg shadow-md border border-gray-300">
                <h2 className="text-lg font-semibold">Statement</h2>
                <p className="text-sm mt-2">SDE Sex</p>
                <h3 className="text-lg font-semibold mt-4">Result</h3>
                <p className="text-sm mt-2">
                  <strong>CODE:</strong> <span className="text-blue-600">http://hl7.org/fhir/administrative-gender</span>
                </p>
                <p className="text-sm mt-1"><strong>Value:</strong> F, Female</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleMeasureSinglePatient