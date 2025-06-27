
import React, { useState } from 'react';
import { Phone, Settings, BarChart3, PlayCircle, Users, Headphones, Router, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import CallFlowBuilder from '@/components/CallFlowBuilder';
import IVRSettings from '@/components/IVRSettings';
import CallAnalytics from '@/components/CallAnalytics';
import ActiveCalls from '@/components/ActiveCalls';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Panel de Administración</h1>
                <p className="text-sm text-slate-500">Sistema de Gestión Integrado</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/mikrotik">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Router className="h-4 w-4" />
                  <span>MikroTik Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Sistema Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-6 w-6 text-blue-600" />
                <span>Sistema IVR Asterisk</span>
              </CardTitle>
              <CardDescription>Gestión completa del sistema IVR con Python AGI</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Administra flujos de llamadas, configuraciones IVR, monitoreo de llamadas activas y análisis detallado.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AGI Server Activo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Puerto 4573</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link to="/mikrotik">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Router className="h-6 w-6 text-red-600" />
                  <span>Dashboard MikroTik</span>
                </CardTitle>
                <CardDescription>Administración completa de equipos MikroTik</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Monitorea tráfico de interfaces, gestiona VLANs, supervisa VPNs y recibe alertas en tiempo real.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>API Conectada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Multi-Equipo</span>
                  </div>
                </div>
                <Button className="w-full mt-4 flex items-center justify-center space-x-2">
                  <span>Acceder al Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-2/3">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="callflow" className="flex items-center space-x-2">
              <PlayCircle className="h-4 w-4" />
              <span>Call Flow</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex items-center space-x-2">
              <Headphones className="h-4 w-4" />
              <span>Active Calls</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Calls Today</p>
                      <p className="text-3xl font-bold">1,247</p>
                    </div>
                    <Phone className="h-12 w-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Calls</p>
                      <p className="text-3xl font-bold">23</p>
                    </div>
                    <Headphones className="h-12 w-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">IVR Menus</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <PlayCircle className="h-12 w-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100">Avg. Wait Time</p>
                      <p className="text-3xl font-bold">2.3m</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-amber-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AGI Server Status</CardTitle>
                  <CardDescription>Python AGI server monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">AGI Server</span>
                      <span className="text-green-600 font-semibold">Running</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Asterisk Connection</span>
                      <span className="text-green-600 font-semibold">Connected</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Port</span>
                      <span className="text-blue-600 font-semibold">4573</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Protocol</span>
                      <span className="text-blue-600 font-semibold">FastAGI</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common IVR management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Test IVR Menu
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Update Prompts
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    View Call Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="callflow">
            <CallFlowBuilder />
          </TabsContent>

          <TabsContent value="settings">
            <IVRSettings />
          </TabsContent>

          <TabsContent value="calls">
            <ActiveCalls />
          </TabsContent>

          <TabsContent value="analytics">
            <CallAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
