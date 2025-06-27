
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, TrendingUp, Phone, Clock, Users } from 'lucide-react';

const CallAnalytics = () => {
  // Sample data for charts
  const hourlyData = [
    { hour: '9AM', calls: 45, answered: 42, abandoned: 3 },
    { hour: '10AM', calls: 62, answered: 58, abandoned: 4 },
    { hour: '11AM', calls: 78, answered: 73, abandoned: 5 },
    { hour: '12PM', calls: 84, answered: 79, abandoned: 5 },
    { hour: '1PM', calls: 91, answered: 85, abandoned: 6 },
    { hour: '2PM', calls: 103, answered: 95, abandoned: 8 },
    { hour: '3PM', calls: 87, answered: 81, abandoned: 6 },
    { hour: '4PM', calls: 76, answered: 71, abandoned: 5 },
    { hour: '5PM', calls: 68, answered: 63, abandoned: 5 }
  ];

  const weeklyData = [
    { day: 'Mon', calls: 456, avgDuration: 180 },
    { day: 'Tue', calls: 523, avgDuration: 195 },
    { day: 'Wed', calls: 489, avgDuration: 172 },
    { day: 'Thu', calls: 612, avgDuration: 201 },
    { day: 'Fri', calls: 578, avgDuration: 188 },
    { day: 'Sat', calls: 234, avgDuration: 165 },
    { day: 'Sun', calls: 123, avgDuration: 142 }
  ];

  const menuUsageData = [
    { name: 'Sales (Press 1)', value: 45, color: '#3b82f6' },
    { name: 'Support (Press 2)', value: 30, color: '#10b981' },
    { name: 'Billing (Press 3)', value: 15, color: '#f59e0b' },
    { name: 'Other (Press 0)', value: 10, color: '#8b5cf6' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const exportReport = () => {
    // Generate CSV report
    const csvData = [
      ['Date', 'Total Calls', 'Answered', 'Abandoned', 'Avg Duration'],
      ['2024-01-15', '456', '423', '33', '3:42'],
      ['2024-01-16', '523', '489', '34', '4:01'],
      ['2024-01-17', '489', '458', '31', '3:28']
    ];

    const csvString = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'call_analytics_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Call Analytics</h2>
          <p className="text-slate-600">Comprehensive call performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Calls</p>
                <p className="text-3xl font-bold">3,247</p>
                <p className="text-blue-200 text-sm">+12% from last week</p>
              </div>
              <Phone className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Answer Rate</p>
                <p className="text-3xl font-bold">94.2%</p>
                <p className="text-green-200 text-sm">+2.1% from last week</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Duration</p>
                <p className="text-3xl font-bold">3:42</p>
                <p className="text-purple-200 text-sm">-0:18 from last week</p>
              </div>
              <Clock className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100">Peak Hour</p>
                <p className="text-3xl font-bold">2PM</p>
                <p className="text-amber-200 text-sm">103 calls/hour</p>
              </div>
              <Calendar className="h-12 w-12 text-amber-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Call Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Call Volume</CardTitle>
            <CardDescription>Calls answered vs abandoned by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="answered" fill="#10b981" name="Answered" />
                <Bar dataKey="abandoned" fill="#ef4444" name="Abandoned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Call Trends</CardTitle>
            <CardDescription>Daily call volume and average duration</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Total Calls"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="avgDuration" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Avg Duration (s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Selection Distribution</CardTitle>
            <CardDescription>Most popular IVR menu choices</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={menuUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {menuUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
            <CardDescription>How calls are resolved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Transferred to Agent</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-semibold">67%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Self-Service Complete</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-semibold">23%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium">Abandoned</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">First Call Resolution</span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm font-bold">4.2/5</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">System Uptime</span>
                <span className="text-sm font-bold">99.9%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallAnalytics;
