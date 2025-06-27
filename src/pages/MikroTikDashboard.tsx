
import React, { useState } from 'react';
import { Router, Wifi, Shield, AlertTriangle, Network, Plus, Mail, HardDrive, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeviceList from '@/components/mikrotik/DeviceList';
import InterfaceTraffic from '@/components/mikrotik/InterfaceTraffic';
import VlanManagement from '@/components/mikrotik/VlanManagement';
import VpnStatus from '@/components/mikrotik/VpnStatus';
import AlertsPanel from '@/components/mikrotik/AlertsPanel';
import DeviceForm from '@/components/mikrotik/DeviceForm';
import EmailAlertConfig from '@/components/mikrotik/EmailAlertConfig';
import BackupManagement from '@/components/mikrotik/BackupManagement';
import UserManagement from '@/components/mikrotik/UserManagement';

const MikroTikDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Router className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">MikroTik Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Gestión de Equipos de Red</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowDeviceForm(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Agregar Equipo</span>
              </Button>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">API Conectada</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 lg:w-full">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Router className="h-4 w-4" />
              <span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center space-x-2">
              <Network className="h-4 w-4" />
              <span>Equipos</span>
            </TabsTrigger>
            <TabsTrigger value="traffic" className="flex items-center space-x-2">
              <Wifi className="h-4 w-4" />
              <span>Tráfico</span>
            </TabsTrigger>
            <TabsTrigger value="vlans" className="flex items-center space-x-2">
              <Network className="h-4 w-4" />
              <span>VLANs</span>
            </TabsTrigger>
            <TabsTrigger value="vpn" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>VPN</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Alertas</span>
            </TabsTrigger>
            <TabsTrigger value="email-config" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="backups" className="flex items-center space-x-2">
              <HardDrive className="h-4 w-4" />
              <span>Backups</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Usuarios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Equipos Activos</p>
                      <p className="text-3xl font-bold">5</p>
                    </div>
                    <Router className="h-12 w-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Interfaces UP</p>
                      <p className="text-3xl font-bold">23</p>
                    </div>
                    <Wifi className="h-12 w-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">VPNs Activas</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <Shield className="h-12 w-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100">Alertas</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <AlertTriangle className="h-12 w-12 text-amber-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estado de Equipos</CardTitle>
                  <CardDescription>Resumen del estado de los routers MikroTik</CardDescription>
                </CardHeader>
                <CardContent>
                  <DeviceList compact={true} onDeviceSelect={setSelectedDevice} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertas Recientes</CardTitle>
                  <CardDescription>Últimas alertas del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertsPanel compact={true} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices">
            <DeviceList onDeviceSelect={setSelectedDevice} />
          </TabsContent>

          <TabsContent value="traffic">
            <InterfaceTraffic selectedDevice={selectedDevice} />
          </TabsContent>

          <TabsContent value="vlans">
            <VlanManagement selectedDevice={selectedDevice} />
          </TabsContent>

          <TabsContent value="vpn">
            <VpnStatus selectedDevice={selectedDevice} />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>

          <TabsContent value="email-config">
            <EmailAlertConfig />
          </TabsContent>

          <TabsContent value="backups">
            <BackupManagement selectedDevice={selectedDevice} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>

        {showDeviceForm && (
          <DeviceForm 
            onClose={() => setShowDeviceForm(false)}
            onDeviceAdded={() => {
              setShowDeviceForm(false);
              // Refresh device list
            }}
          />
        )}
      </main>
    </div>
  );
};

export default MikroTikDashboard;
