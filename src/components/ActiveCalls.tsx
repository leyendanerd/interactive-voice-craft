
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, PhoneOff, Volume2, VolumeX, Clock, User } from 'lucide-react';

interface Call {
  id: string;
  callerNumber: string;
  callerName?: string;
  startTime: Date;
  currentMenu: string;
  status: 'active' | 'on-hold' | 'ringing' | 'transferred';
  channel: string;
  duration: number;
}

const ActiveCalls = () => {
  const [calls, setCalls] = useState<Call[]>([
    {
      id: '1',
      callerNumber: '555-0123',
      callerName: 'John Smith',
      startTime: new Date(Date.now() - 180000), // 3 minutes ago
      currentMenu: 'Main Menu',
      status: 'active',
      channel: 'SIP/1001-0000001',
      duration: 180
    },
    {
      id: '2',
      callerNumber: '555-0456',
      callerName: 'Sarah Johnson',
      startTime: new Date(Date.now() - 45000), // 45 seconds ago
      currentMenu: 'Support Menu',
      status: 'on-hold',
      channel: 'SIP/1002-0000002',
      duration: 45
    },
    {
      id: '3',
      callerNumber: '555-0789',
      startTime: new Date(Date.now() - 15000), // 15 seconds ago
      currentMenu: 'Main Menu',
      status: 'ringing',
      channel: 'SIP/1003-0000003',
      duration: 15
    }
  ]);

  // Update call durations every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prevCalls => 
        prevCalls.map(call => ({
          ...call,
          duration: Math.floor((Date.now() - call.startTime.getTime()) / 1000)
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'ringing': return 'bg-blue-500';
      case 'transferred': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const hangupCall = (callId: string) => {
    setCalls(calls.filter(call => call.id !== callId));
  };

  const transferCall = (callId: string) => {
    setCalls(calls.map(call => 
      call.id === callId 
        ? { ...call, status: 'transferred' as const }
        : call
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active Calls</h2>
          <p className="text-slate-600">Monitor and manage live calls</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
            <div className={`w-2 h-2 ${getStatusColor('active')} rounded-full animate-pulse`}></div>
            <span className="text-sm font-medium text-green-700">
              {calls.filter(call => call.status === 'active').length} Active
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
            <div className={`w-2 h-2 ${getStatusColor('on-hold')} rounded-full`}></div>
            <span className="text-sm font-medium text-yellow-700">
              {calls.filter(call => call.status === 'on-hold').length} On Hold
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {calls.map((call) => (
          <Card key={call.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(call.status)}`}></div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {call.callerName || 'Unknown Caller'}
                    </CardTitle>
                    <CardDescription>{call.callerNumber}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`capitalize ${
                    call.status === 'active' ? 'border-green-200 text-green-700' :
                    call.status === 'on-hold' ? 'border-yellow-200 text-yellow-700' :
                    call.status === 'ringing' ? 'border-blue-200 text-blue-700' :
                    'border-purple-200 text-purple-700'
                  }`}
                >
                  {call.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Duration</div>
                  <div className="font-mono font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDuration(call.duration)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Current Menu</div>
                  <div className="font-medium">{call.currentMenu}</div>
                </div>
              </div>
              
              <div>
                <div className="text-slate-500 text-sm">Channel</div>
                <div className="font-mono text-xs text-slate-600">{call.channel}</div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => transferCall(call.id)}
                  className="flex-1"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Transfer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => hangupCall(call.id)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <PhoneOff className="h-3 w-3 mr-1" />
                  Hangup
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {calls.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Phone className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Calls</h3>
            <p className="text-slate-500">
              All lines are currently free. Active calls will appear here when incoming.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Call Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Calls Today</p>
                <p className="text-2xl font-bold">247</p>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Avg Call Duration</p>
                <p className="text-2xl font-bold">3:42</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Peak Hour</p>
                <p className="text-2xl font-bold">2PM</p>
              </div>
              <Volume2 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Success Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Badge className="bg-green-500">
                <User className="h-4 w-4" />
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveCalls;
