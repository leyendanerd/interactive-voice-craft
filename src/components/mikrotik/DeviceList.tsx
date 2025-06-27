
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Router, Wifi, WifiOff, Settings, Trash2 } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  ip: string;
  model: string;
  version: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  uptime: string;
  cpu: number;
  memory: number;
}

interface DeviceListProps {
  compact?: boolean;
  onDeviceSelect?: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ compact = false, onDeviceSelect }) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'RouterOS-Main',
      ip: '192.168.1.1',
      model: 'hEX S',
      version: '7.11.2',
      status: 'online',
      lastSeen: '2 min ago',
      uptime: '15d 3h 22m',
      cpu: 15,
      memory: 45
    },
    {
      id: '2',
      name: 'RouterOS-Branch',
      ip: '192.168.2.1',
      model: 'RB750Gr3',
      version: '7.10.1',
      status: 'online',
      lastSeen: '5 min ago',
      uptime: '8d 12h 45m',
      cpu: 8,
      memory: 32
    },
    {
      id: '3',
      name: 'RouterOS-Backup',
      ip: '192.168.3.1',
      model: 'CCR1009',
      version: '7.11.2',
      status: 'warning',
      lastSeen: '1h ago',
      uptime: '2d 8h 15m',
      cpu: 65,
      memory: 78
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">En línea</Badge>;
      case 'offline': return <Badge className="bg-red-100 text-red-800">Desconectado</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Advertencia</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Desconocido</Badge>;
    }
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {devices.slice(0, 3).map((device) => (
          <div 
            key={device.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => onDeviceSelect?.(device.id)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
              <div>
                <p className="font-medium">{device.name}</p>
                <p className="text-sm text-gray-500">{device.ip}</p>
              </div>
            </div>
            {getStatusBadge(device.status)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devices.map((device) => (
        <Card key={device.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Router className="h-5 w-5" />
                <span>{device.name}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {device.status === 'online' ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                {getStatusBadge(device.status)}
              </div>
            </div>
            <CardDescription>{device.model} - RouterOS {device.version}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">IP:</span>
                <span className="font-mono">{device.ip}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime:</span>
                <span>{device.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">CPU:</span>
                <span>{device.cpu}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Memoria:</span>
                <span>{device.memory}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Última vez visto:</span>
                <span>{device.lastSeen}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => onDeviceSelect?.(device.id)}
              >
                <Settings className="h-4 w-4 mr-1" />
                Gestionar
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DeviceList;
