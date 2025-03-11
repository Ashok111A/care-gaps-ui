import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SingleMeasureSinglePatient() {
  const [startDate, setStartDate] = useState("2024-12-01");
  const [endDate, setEndDate] = useState("2025-03-01");
  const [jsonOptions, setJsonOptions] = useState('{ "calculateHTML": false }');
  const navigate=useNavigate();

  function LetsPlay(){
    navigate('/singlemeasure1')
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-8 space-y-6">
        {/* Select Measure */}
        <div>
          <label className="block text-[15px] font-medium text-gray-700 mb-2">
            Select Measure
          </label>
          <div className="relative">
            <select className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
              <option>PCSBMIScreenAndFollowUpFHIR</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Select Patient */}
        <div>
          <label className="block text-[15px] font-medium text-gray-700 mb-2">
            Select Patient
          </label>
          <div className="relative">
            <select className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
              <option>
                HTN130DeclinedNonPharm DENEXCEPPass - 0278fdf0-f067-46e8-aeb1-fb96dff3c947
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Measurement Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[15px] font-medium text-gray-700 mb-2">
              Measurement Period Start
            </label>
            <input
              type="date"
              className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
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
              className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Additional Calculation Options */}
        <div>
          <label className="block text-[15px] font-medium text-gray-700 mb-2">
            Additional Calculation Options (JSON)
          </label>
          <textarea
            className="w-full bg-white px-4 py-2.5 text-gray-900 text-[15px] rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            rows={3}
            value={jsonOptions}
            onChange={(e) => setJsonOptions(e.target.value)}
          />
        </div>

        {/* Button */}
        <button className="w-full bg-purple-600 text-white py-3 px-4 text-[15px] rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" onClick={()=>{
            LetsPlay()
        }}>
          Compute Report
        </button>
      </div>
    </div>
  );
}

export default SingleMeasureSinglePatient;