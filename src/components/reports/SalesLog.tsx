import React, { useState } from 'react';

const columns = [
  'Date', 'Service ID', 'Location', 'Type', 'Item', 'Category', 'Client', 'Team member', 'Channel',
  'Gross sales', 'Item discounts', 'Cart discounts', 'Total discounts', 'Refunds', 'Net sales', 'Taxes on net sales', 'Total sales', 'Payment type'
];

export const SalesLog = ({ salesLog }) => {
  const [search, setSearch] = useState('');

  const filteredLog = salesLog.filter(entry =>
    columns.some(col => (entry[col.replace(/\s/g, '').toLowerCase()] || '').toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-2xl font-bold">Sales log detail</h1>
        <span className="text-gray-500">In-depth view into each sale transaction.</span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by any field"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-80 text-sm"
        />
        {/* Add filter buttons or dropdowns here if needed */}
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map(col => (
                <th key={col} className="px-4 py-3 font-semibold text-left text-xs text-gray-600 uppercase tracking-wider border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLog.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-400">No sales found.</td>
              </tr>
            ) : (
              filteredLog.map((entry, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">{new Date(entry.date).toLocaleString()}</td>
                  <td className="px-4 py-2 text-purple-700 font-mono whitespace-nowrap">{entry.serviceId}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.location}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.type}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.item}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.category}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.client}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.teamMember}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.channel}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.grossSales?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.itemDiscounts?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.cartDiscounts?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.totalDiscounts?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.refunds?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.netSales?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.taxes?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">AED {entry.totalSales?.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.paymentType}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesLog; 