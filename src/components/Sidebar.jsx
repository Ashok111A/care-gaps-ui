import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div
            className={`relative flex ${isCollapsed ? "w-16" : "w-64"}
            flex-col bg-gray p-4 text-gray-700 shadow-xl transition-all duration-300 ease-in-out overflow-hidden`}
            style={{ height: "auto", minHeight: "100%" }} >
            <div className="flex items-center justify-between mb-4">
                {!isCollapsed && (
                    <h5 className="text-xl font-semibold text-blue-gray-900">Sidebar</h5>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hover:bg-gray-100 transition-all" style={{ padding: 4 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>

            <nav className="mt-2 flex flex-col gap-2">
                {[
                    { name: "SingleMeasureSinglePatient", path: "/home" },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center p-3 rounded-lg bg-gray-100 transition-all duration-200"
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span
                            className={`ml-3 transition-all duration-200 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                                }`}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar