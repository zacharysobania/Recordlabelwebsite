import React, { useState } from 'react'
import { DollarSign, Calendar, TrendingUp, Download, Filter } from 'lucide-react'

const RoyaltiesPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  // Mock royalty data
  const royaltyData = [
    {
      id: 1,
      track: 'Midnight Dreams',
      platform: 'Spotify',
      streams: 1250000,
      downloads: 4500,
      revenue: 2850.00,
      date: '2024-03',
      status: 'paid'
    },
    {
      id: 2,
      track: 'Ocean Waves',
      platform: 'Apple Music',
      streams: 890000,
      downloads: 3200,
      revenue: 2100.00,
      date: '2024-03',
      status: 'paid'
    },
    {
      id: 3,
      track: 'City Lights',
      platform: 'YouTube Music',
      streams: 650000,
      downloads: 1800,
      revenue: 1650.00,
      date: '2024-03',
      status: 'paid'
    },
    {
      id: 4,
      track: 'Midnight Dreams',
      platform: 'Amazon Music',
      streams: 420000,
      downloads: 1200,
      revenue: 980.00,
      date: '2024-03',
      status: 'paid'
    },
    {
      id: 5,
      track: 'Ocean Waves',
      platform: 'Tidal',
      streams: 280000,
      downloads: 800,
      revenue: 720.00,
      date: '2024-03',
      status: 'paid'
    }
  ]

  const paymentHistory = [
    {
      id: 1,
      period: 'March 2024',
      amount: 8300.00,
      status: 'paid',
      date: '2024-03-15',
      method: 'Direct Deposit'
    },
    {
      id: 2,
      period: 'February 2024',
      amount: 7200.00,
      status: 'paid',
      date: '2024-02-15',
      method: 'Direct Deposit'
    },
    {
      id: 3,
      period: 'January 2024',
      amount: 6800.00,
      status: 'paid',
      date: '2024-01-15',
      method: 'Direct Deposit'
    }
  ]

  const totalRevenue = royaltyData.reduce((sum, item) => sum + item.revenue, 0)
  const totalStreams = royaltyData.reduce((sum, item) => sum + item.streams, 0)
  const totalDownloads = royaltyData.reduce((sum, item) => sum + item.downloads, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Royalties & Payments</h1>
          <p className="text-gray-600 mt-2">
            Track your earnings and payment history across all platforms.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+15.2% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Streams</p>
                <p className="text-3xl font-bold text-gray-900">{(totalStreams / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600 mt-1">+8.7% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-3xl font-bold text-gray-900">{totalDownloads.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+12.3% from last month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field max-w-xs"
            >
              <option value="all">All Periods</option>
              <option value="2024-03">March 2024</option>
              <option value="2024-02">February 2024</option>
              <option value="2024-01">January 2024</option>
            </select>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="input-field max-w-xs"
            >
              <option value="all">All Platforms</option>
              <option value="spotify">Spotify</option>
              <option value="apple">Apple Music</option>
              <option value="youtube">YouTube Music</option>
              <option value="amazon">Amazon Music</option>
              <option value="tidal">Tidal</option>
            </select>
          </div>
        </div>

        {/* Royalty Details Table */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Royalty Details</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Track</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Streams</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Downloads</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {royaltyData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{item.track}</td>
                    <td className="py-4 px-4 text-gray-600">{item.platform}</td>
                    <td className="py-4 px-4 text-gray-600">{item.streams.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">{item.downloads.toLocaleString()}</td>
                    <td className="py-4 px-4 font-semibold text-green-600">${item.revenue.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">{item.date}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h2>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.period}</p>
                    <p className="text-sm text-gray-600">{payment.method} • {payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">${payment.amount.toLocaleString()}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoyaltiesPage 