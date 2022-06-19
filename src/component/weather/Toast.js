import React from 'react'

export default function Toast() {
  return (
    <>
        <div className="flex items-center justify-between max-w-xs p-4 bg-gray-700 border rounded-md shadow-sm shadow-orange-600">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm font-bold text-orange-600">Lütfen doğru API Key girdiğinizden emin olun! </p>
            </div>
            <span className="inline-flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    </>
  )
}
