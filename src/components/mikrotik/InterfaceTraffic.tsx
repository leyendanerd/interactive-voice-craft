
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Download, Upload, Wifi, RefreshCw } from 'lucide-react';

interface Interface {
  id: string;
  name: string;
  type: string;
  status: 'up' | 'down';
  rxBytes: number;
  txBytes: number;
  rxRate: number;
  txRate: number;
  rxPackets: number;
  txPackets: number;
}

interface TrafficData {
  time: string;
  rx: number;
  tx: number;
}

interface InterfaceTrafficProps {
  selectedDevice?: string | null;
}

const InterfaceTraffic: React.FC<InterfaceTrafficProps> = ({ selectedDevice }) => {
  const [interfaces, setInterfaces] = useState<Interface[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const chartConfig = {
    rx: {
      label: "Descarga",
      color: "hsl(var(--chart-1))",
    },
    tx: {
      label: "Subida",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tráfico de Interfaces</h2>
          <p className="text-gray-600">
            {selectedDevice ? `Equipo seleccionado: ${selectedDevice}` : 'Selecciona un equipo para ver detalles específicos'}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Gráfico de Tráfico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Tráfico en Tiempo Real (Mbps)</span>
          </CardTitle>
          <CardDescription>Monitoreo del tráfico de red en las últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          {trafficData.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sin datos de tráfico</h3>
              <p className="text-gray-500">
                Los gráficos de tráfico aparecerán aquí una vez que se conecte un equipo MikroTik.
              </p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={trafficData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="rx" 
                  stroke="var(--color-rx)" 
                  strokeWidth={2}
                  name="Descarga"
                />
                <Line 
                  type="monotone" 
                  dataKey="tx" 
                  stroke="var(--color-tx)" 
                  strokeWidth={2}
                  name="Subida"
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Lista de Interfaces */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Interfaces</CardTitle>
          <CardDescription>Información detallada de cada interfaz de red</CardDescription>
        </CardHeader>
        <CardContent>
          {interfaces.length === 0 ? (
            <div className="text-center py-8">
              <Wifi className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay interfaces disponibles</p>
              <p className="text-sm text-gray-400 mt-1">
                Las interfaces aparecerán cuando se conecte un equipo MikroTik
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {interfaces.map((iface) => (
                <div key={iface.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Wifi className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{iface.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{iface.type}</p>
                      </div>
                    </div>
                    <Badge variant={iface.status === 'up' ? 'default' : 'destructive'}>
                      {iface.status === 'up' ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-gray-500">RX Rate</p>
                        <p className="font-semibold">{iface.rxRate} Mbps</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Upload className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-gray-500">TX Rate</p>
                        <p className="font-semibold">{iface.txRate} Mbps</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">RX Total</p>
                      <p className="font-semibold">{formatBytes(iface.rxBytes)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">TX Total</p>
                      <p className="font-semibold">{formatBytes(iface.txBytes)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterfaceTraffic;
