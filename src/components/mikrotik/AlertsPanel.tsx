
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Clock, Bell, Settings } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  device: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  category: 'connectivity' | 'performance' | 'security' | 'configuration';
}

interface AlertsPanelProps {
  compact?: boolean;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ compact = false }) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Interfaz ether1 desconectada',
      description: 'La interfaz principal ether1 se encuentra desconectada desde hace 5 minutos',
      device: 'RouterOS-Main',
      timestamp: '2024-01-15 14:30:25',
      status: 'active',
      category: 'connectivity'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Uso alto de CPU',
      description: 'El CPU del router está al 85% de uso durante los últimos 15 minutos',
      device: 'RouterOS-Branch',
      timestamp: '2024-01-15 14:25:10',
      status: 'acknowledged',
      category: 'performance'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Conexión VPN inestable',
      description: 'La conexión VPN con la sucursal se ha desconectado 3 veces en la última hora',
      device: 'RouterOS-Main',
      timestamp: '2024-01-15 13:45:33',
      status: 'active',
      category: 'connectivity'
    },
    {
      id: '4',
      type: 'info',
      title: 'Actualización disponible',
      description: 'RouterOS 7.12 está disponible para descarga',
      device: 'RouterOS-Backup',
      timestamp: '2024-01-15 12:00:00',
      status: 'active',
      category: 'configuration'
    },
    {
      id: '5',
      type: 'critical',
      title: 'Intento de acceso no autorizado',
      description: 'Se detectaron múltiples intentos de login fallidos desde 203.0.113.45',
      device: 'RouterOS-Main',
      timestamp: '2024-01-15 11:15:22',
      status: 'resolved',
      category: 'security'
    }
  ]);

  const getAlertIcon = (type: string, status: string) => {
    if (status === 'resolved') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Bell className="h-5 w-5 text-blue-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadge = (type: string, status: string) => {
    if (status === 'resolved') {
      return <Badge className="bg-green-100 text-green-800">Resuelto</Badge>;
    }
    if (status === 'acknowledged') {
      return <Badge className="bg-blue-100 text-blue-800">Reconocido</Badge>;
    }
    
    switch (type) {
      case 'critical': return <Badge className="bg-red-100 text-red-800">Crítico</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Advertencia</Badge>;
      case 'info': return <Badge className="bg-blue-100 text-blue-800">Información</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Desconocido</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'connectivity': return <Badge variant="outline">Conectividad</Badge>;
      case 'performance': return <Badge variant="outline">Rendimiento</Badge>;
      case 'security': return <Badge variant="outline">Seguridad</Badge>;
      case 'configuration': return <Badge variant="outline">Configuración</Badge>;
      default: return <Badge variant="outline">General</Badge>;
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' as const }
        : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  if (compact) {
    const activeAlerts = alerts.filter(alert => alert.status === 'active').slice(0, 3);
    return (
      <div className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p>No hay alertas activas</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getAlertIcon(alert.type, alert.status)}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{alert.title}</p>
                <p className="text-xs text-gray-500">{alert.device}</p>
              </div>
              {getAlertBadge(alert.type, alert.status)}
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Centro de Alertas</h2>
          <p className="text-gray-600">Monitoreo y gestión de alertas del sistema</p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Alertas
        </Button>
      </div>

      {/* Resumen de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-sm text-red-600">Críticas</p>
                <p className="text-2xl font-bold text-red-700">
                  {alerts.filter(a => a.type === 'critical' && a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="text-sm text-yellow-600">Advertencias</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {alerts.filter(a => a.type === 'warning' && a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Información</p>
                <p className="text-2xl font-bold text-blue-700">
                  {alerts.filter(a => a.type === 'info' && a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-sm text-green-600">Resueltas</p>
                <p className="text-2xl font-bold text-green-700">
                  {alerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recientes</CardTitle>
          <CardDescription>Lista completa de alertas ordenadas por fecha</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type, alert.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Equipo: {alert.device}</span>
                        <span>Fecha: {alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {getAlertBadge(alert.type, alert.status)}
                    {getCategoryBadge(alert.category)}
                  </div>
                </div>
                
                {alert.status === 'active' && (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Reconocer
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      Resolver
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

export default AlertsPanel;
