import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, DollarSign, Users } from "lucide-react";
import React, { useState } from "react";
import SalesLog from "./SalesLog";

export const SalesReports = ({ salesLog = [] }) => {
  const [tab, setTab] = useState("sales-log");

  const salesData = [
    { date: "2024-06-01", gross: 1245, discounts: 125, tips: 180, tax: 99, net: 1399 },
    { date: "2024-06-02", gross: 2847, discounts: 234, tips: 310, tax: 228, net: 3151 },
    { date: "2024-05-31", gross: 1876, discounts: 187, tips: 220, tax: 150, net: 2059 },
    { date: "2024-05-30", gross: 2156, discounts: 156, tips: 275, tax: 172, net: 2447 }
  ];

  const paymentMethods = [
    { method: "Credit Card", amount: 1850, percentage: 65 },
    { method: "Cash", amount: 540, percentage: 19 },
    { method: "Online", amount: 320, percentage: 11 },
    { method: "Gift Card", amount: 137, percentage: 5 }
  ];

  const topServices = [
    { service: "Hair Cut", revenue: 720, bookings: 12 },
    { service: "Hair Color", revenue: 960, bookings: 8 },
    { service: "Manicure", revenue: 360, bookings: 6 },
    { service: "Pedicure", revenue: 270, bookings: 4 }
  ];

  const teamPerformance = [
    { name: "Emma Rodriguez", sales: 1200, clients: 15, rating: 4.9 },
    { name: "Alex Thompson", sales: 890, clients: 12, rating: 4.8 },
    { name: "Sofia Martinez", sales: 650, clients: 18, rating: 4.7 },
    { name: "David Kim", sales: 560, clients: 8, rating: 5.0 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reporting and analytics</h1>
      </div>
      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "sales-log" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setTab("sales-log")}
        >
          Sales Log
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "finance-summary" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setTab("finance-summary")}
        >
          Finance Summary
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "yearly-sales" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setTab("yearly-sales")}
        >
          Yearly Sales
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "tips-summary" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setTab("tips-summary")}
        >
          Tips Summary
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "clients" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setTab("clients")}
        >
          Clients
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "inventory" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setTab("inventory")}
        >
          Inventory
        </button>
      </div>
      {/* Tab Content */}
      {tab === "sales-log" && <SalesLog salesLog={salesLog} />}
      {tab === "finance-summary" && (
        <div>Finance Summary content here</div>
      )}
      {tab === "yearly-sales" && (
        <div>Yearly Sales content here</div>
      )}
      {tab === "tips-summary" && (
        <TipsSummary salesLog={salesLog} />
      )}
      {tab === "clients" && (
        <div>Clients content here</div>
      )}
      {tab === "inventory" && (
        <div>Inventory content here</div>
      )}
    </div>
  );
};

function TipsSummary({ salesLog }) {
  // Unique team members
  const allMembers = Array.from(new Set(salesLog.map(e => e.teamMember).filter(Boolean)));
  const [selectedMember, setSelectedMember] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [drillMember, setDrillMember] = useState(null);

  // Filtering
  const filteredLog = salesLog.filter(entry => {
    if (selectedMember && entry.teamMember !== selectedMember) return false;
    if (dateFrom && new Date(entry.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(entry.date) > new Date(dateTo)) return false;
    return true;
  });

  // Aggregate tips by team member
  const tipsByMember = {};
  let totalTips = 0;
  filteredLog.forEach(entry => {
    if (entry.tip && entry.teamMember) {
      if (!tipsByMember[entry.teamMember]) tipsByMember[entry.teamMember] = 0;
      tipsByMember[entry.teamMember] += entry.tip;
      totalTips += entry.tip;
    }
  });
  const rows = Object.entries(tipsByMember).map(([member, tip]) => ({
    member,
    tip: tip,
    refunded: 0,
    total: tip,
  }));

  // Export CSV
  const exportCSV = () => {
    const header = ['Team member','Tips collected','Tips refunded','Total tips'];
    const csvRows = [header.join(',')];
    csvRows.push([`Total`, totalTips.toFixed(2), '0.00', totalTips.toFixed(2)].join(','));
    rows.forEach(row => {
      csvRows.push([
        row.member,
        Number(row.tip).toFixed(2),
        '0.00',
        Number(row.total).toFixed(2)
      ].join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tips-summary.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Drill-down data
  const drillData = drillMember ? filteredLog.filter(e => e.teamMember === drillMember && e.tip) : [];

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-2xl font-bold">Tips summary</h1>
        <span className="text-gray-500">Analysis of gratuity income.</span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)} className="border rounded-full px-4 py-2 text-sm font-medium">
          <option value="">Team member</option>
          {allMembers.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border rounded px-2 py-1 text-sm" />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border rounded px-2 py-1 text-sm" />
        <button onClick={exportCSV} className="border rounded-full px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700">Export CSV</button>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 font-semibold text-left text-xs text-gray-600 uppercase tracking-wider border-b">Team member</th>
              <th className="px-4 py-3 font-semibold text-left text-xs text-gray-600 uppercase tracking-wider border-b">Tips collected</th>
              <th className="px-4 py-3 font-semibold text-left text-xs text-gray-600 uppercase tracking-wider border-b">Tips refunded</th>
              <th className="px-4 py-3 font-semibold text-left text-xs text-gray-600 uppercase tracking-wider border-b">Total tips</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-bold bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap">Total</td>
              <td className="px-4 py-2 whitespace-nowrap">AED {totalTips.toFixed(2)}</td>
              <td className="px-4 py-2 whitespace-nowrap">AED 0.00</td>
              <td className="px-4 py-2 whitespace-nowrap">AED {totalTips.toFixed(2)}</td>
            </tr>
            {rows.map((row, idx) => (
              <tr key={row.member}>
                <td className="px-4 py-2 whitespace-nowrap text-purple-700 hover:underline cursor-pointer" onClick={() => setDrillMember(row.member)}>{row.member}</td>
                <td className="px-4 py-2 whitespace-nowrap">AED {Number(row.tip).toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap">AED 0.00</td>
                <td className="px-4 py-2 whitespace-nowrap">AED {Number(row.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Drill-down modal */}
      {drillMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] max-h-[80vh] overflow-auto relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setDrillMember(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Tips for {drillMember}</h2>
            <table className="min-w-full text-sm mb-4">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left">Date</th>
                  <th className="px-2 py-1 text-left">Service</th>
                  <th className="px-2 py-1 text-left">Client</th>
                  <th className="px-2 py-1 text-left">Tip</th>
                </tr>
              </thead>
              <tbody>
                {drillData.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-4 text-gray-400">No tips found.</td></tr>
                ) : (
                  drillData.map((entry, i) => (
                    <tr key={String(entry.date) + '-' + String(entry.item ?? '') + '-' + String(entry.client ?? '') + '-' + i}>
                      <td className="px-2 py-1 whitespace-nowrap">{new Date(entry.date).toLocaleDateString()}</td>
                      <td className="px-2 py-1 whitespace-nowrap">{entry.item}</td>
                      <td className="px-2 py-1 whitespace-nowrap">{entry.client}</td>
                      <td className="px-2 py-1 whitespace-nowrap">AED {Number(entry.tip).toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="text-right font-semibold">Total: AED {drillData.reduce((acc, e) => acc + (e.tip || 0), 0).toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export { TipsSummary };

export default SalesReports;
