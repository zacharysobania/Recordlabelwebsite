import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TrendingUp, DollarSign, Music, Users, Calendar, ArrowRight } from 'lucide-react'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Royalties',
      value: '$12,450.00',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Monthly Streams',
      value: '2.4M',
      change: '+8.2%',
      changeType: 'positive',
      icon: Music,
    },
    {
      title: 'Active Tracks',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Fan Reach',
      value: '156K',
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'royalty',
      title: 'Royalty Payment Processed',
      description: 'Payment of $2,450.00 for March 2024',
      date: '2024-03-15',
      amount: '$2,450.00',
    },
    {
      id: 2,
      type: 'stream',
      title: 'New Track Released',
      description: '"Midnight Dreams" is now live on all platforms',
      date: '2024-03-10',
      amount: null,
    },
    {
      id: 3,
      type: 'royalty',
      title: 'Royalty Payment Processed',
      description: 'Payment of $1,890.00 for February 2024',
      date: '2024-02-15',
      amount: '$1,890.00',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your music career today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="bg-primary-100 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/royalties"
                className="flex items-center justify-between p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">View Royalties</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link
                to="/profile"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Update Profile</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Link to="/royalties" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'royalty' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'royalty' ? (
                      <DollarSign className="h-4 w-4 text-green-600" />
                    ) : (
                      <Music className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{activity.amount}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Next Royalty Payment</p>
                  <p className="text-sm text-gray-600">April 15, 2024</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <Music className="h-5 w-5 text-secondary-600" />
                <div>
                  <p className="font-medium text-gray-900">New Release</p>
                  <p className="text-sm text-gray-600">April 20, 2024</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Fan Meet & Greet</p>
                  <p className="text-sm text-gray-600">May 5, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 