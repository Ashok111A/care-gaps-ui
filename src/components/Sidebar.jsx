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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                </svg>
                
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
            {!isCollapsed && (
            <nav className="mt-2 flex flex-col gap-2">
                {[
                    { name: "SMSP", path: "/singlemeasure" },
                ].map((item) => (
                    
                    <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center p-3 rounded-lg bg-gray-100 transition-all duration-200"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
</svg>

                        <span
                            className={`ml-3 transition-all duration-200 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                                }`}
                                style={{color:'black',fontWeight:'bold'}}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
            )}
        </div>
    )
}

export default Sidebar