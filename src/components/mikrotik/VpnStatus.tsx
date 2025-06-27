
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Key, Globe, Plus, Settings } from 'lucide-react';

interface VpnConnection {
  id: string;
  name: string;
  type: 'pptp' | 'l2tp' | 'ovpn' | 'ipsec';
  status: 'connected' | 'disconnected' | 'connecting';
  user: string;
  remoteIp: string;
  localIp: string;
  uptime: string;
  rxBytes: number;
  txBytes: number;
}

interface VpnServer {
  id: string;
  name: string;
  type: 'pptp' | 'l2tp' | 'ovpn' | 'ipsec';
  enabled: boolean;
  port: number;
  activeConnections: number;
  maxConnections: number;
}

interface VpnStatusProps {
  selectedDevice?: string | null;
}

const VpnStatus: React.FC<VpnStatusProps> = ({ selectedDevice }) => {
  const [vpnServers, setVpnServers] = useState<VpnServer[]>([
    {
      id: '1',
      name: 'PPTP Server',
      type: 'pptp',
      enabled: true,
      port: 1723,
      activeConnections: 3,
      maxConnections: 10
    },
    {
      id: '2',
      name: 'L2TP Server',
      type: 'l2tp',
      enabled: true,
      port: 1701,
      activeConnections: 2,
      maxConnections: 20
    },
    {
      id: '3',
      name: 'OpenVPN Server',
      type: 'ovpn',
      enabled: false,
      port: 1194,
      activeConnections: 0,
      maxConnections: 50
    }
  ]);

  const [vpnConnections, setVpnConnections] = useState<VpnConnection[]>([
    {
      id: '1',
      name: 'VPN-User-01',
      type: 'pptp',
      status: 'connected',
      user: 'admin',
      remoteIp: '203.0.113.45',
      localIp: '10.0.0.2',
      uptime: '2h 35m',
      rxBytes: 15728640,
      txBytes: 8388608
    },
    {
      id: '2',
      name: 'VPN-Branch-Office',
      type: 'l2tp',
      status: 'connected',
      user: 'branch_user',
      remoteIp: '198.51.100.23',
      localIp: '10.0.0.3',
      uptime: '1d 5h 12m',
      rxBytes: 104857600,
      txBytes: 52428800
    },
    {
      id: '3',
      name: 'VPN-Mobile-01',
      type: 'pptp',
      status: 'disconnected',
      user: 'mobile_user',
      remoteIp: '192.0.2.156',
      localIp: '10.0.0.4',
      uptime: '0',
      rxBytes: 0,
      txBytes: 0
    }
  ]);

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected': return <Badge className="bg-green-100 text-green-800">Conectado</Badge>;
      case 'disconnected': return <Badge className="bg-red-100 text-red-800">Desconectado</Badge>;
      case 'connecting': return <Badge className="bg-yellow-100 text-yellow-800">Conectando</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Desconocido</Badge>;
    }
  };

  const getVpnTypeIcon = (type: string) => {
    switch (type) {
      case 'pptp': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'l2tp': return <Key className="h-4 w-4 text-green-500" />;
      case 'ovpn': return <Globe className="h-4 w-4 text-purple-500" />;
      case 'ipsec': return <Shield className="h-4 w-4 text-red-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Estado de VPN</h2>
          <p className="text-gray-600">
            {selectedDevice ? `Equipo: ${selectedDevice}` : 'Monitoreo de conexiones VPN'}
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nueva Conexión</span>
        </Button>
      </div>

      {/* Servidores VPN */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Servidores VPN</span>
          </CardTitle>
          <CardDescription>Estado de los servidores VPN configurados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vpnServers.map((server) => (
              <div key={server.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getVpnTypeIcon(server.type)}
                    <h3 className="font-semibold">{server.name}</h3>
                  </div>
                  <Badge variant={server.enabled ? 'default' : 'secondary'}>
                    {server.enabled ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Puerto:</span>
                    <span className="font-mono">{server.port}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Conexiones:</span>
                    <span>{server.activeConnections}/{server.maxConnections}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conexiones Activas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Conexiones VPN</span>
          </CardTitle>
          <CardDescription>Lista de conexiones VPN activas y recientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vpnConnections.map((connection) => (
              <div key={connection.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getVpnTypeIcon(connection.type)}
                    <div>
                      <h3 className="font-semibold">{connection.name}</h3>
                      <p className="text-sm text-gray-500">Usuario: {connection.user}</p>
                    </div>
                  </div>
                  {getStatusBadge(connection.status)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">IP Remota</p>
                    <p className="font-mono">{connection.remoteIp}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">IP Local</p>
                    <p className="font-mono">{connection.localIp}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tiempo Activo</p>
                    <p>{connection.uptime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Transferencia</p>
                    <p>↓ {formatBytes(connection.rxBytes)}</p>
                    <p>↑ {formatBytes(connection.txBytes)}</p>
                  </div>
                </div>

                {connection.status === 'connected' && (
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      Desconectar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VpnStatus;
