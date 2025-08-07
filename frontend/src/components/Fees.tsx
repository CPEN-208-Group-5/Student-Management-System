import React from 'react';

type StatusType = 'PAID' | 'PARTIAL' | 'UNPAID';

interface Fee {
  semester: string;
  amount_due: number;
  amount_paid: number;
  status: StatusType;
}

export default function Fees() {
  const fees: Fee[] = [
    { semester: "2024/2025 - Semester 1", amount_due: 1500, amount_paid: 1000, status: "PARTIAL" },
    { semester: "2023/2024 - Semester 2", amount_due: 1500, amount_paid: 1500, status: "PAID" },
    { semester: "2023/2024 - Semester 1", amount_due: 1500, amount_paid: 0, status: "UNPAID" },
    { semester: "2022/2023 - Semester 2", amount_due: 1500, amount_paid: 1500, status: "PAID" },
  ];

  const statusStyles: Record<StatusType, string> = {
    PAID: "bg-green-100 text-green-800 border-green-200",
    PARTIAL: "bg-yellow-100 text-yellow-800 border-yellow-200",
    UNPAID: "bg-red-100 text-red-800 border-red-200",
  };

  const statusIcons: Record<StatusType, React.ReactElement> = {
    PAID: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    PARTIAL: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    UNPAID: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">Fee Status</h2>
          <p className="text-gray-600">Your payment history and dues</p>
        </div>
      </div>

      <div className="space-y-4">
        {fees.map((fee, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{fee.semester}</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[fee.status]}`}>
                {statusIcons[fee.status]}
                <span className="ml-1">{fee.status}</span>
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount Due</p>
                <p className="text-lg font-semibold text-gray-900">GH₵{fee.amount_due}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-lg font-semibold text-gray-900">GH₵{fee.amount_paid}</p>
              </div>
            </div>

            {fee.status === "PARTIAL" && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment Progress</span>
                  <span className="font-medium text-gray-900">
                    {Math.round((fee.amount_paid / fee.amount_due) * 100)}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(fee.amount_paid / fee.amount_due) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Due</p>
            <p className="text-xl font-bold text-gray-900">
              GH₵{fees.reduce((sum, fee) => sum + fee.amount_due, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Paid</p>
            <p className="text-xl font-bold text-gray-900">
              GH₵{fees.reduce((sum, fee) => sum + fee.amount_paid, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}