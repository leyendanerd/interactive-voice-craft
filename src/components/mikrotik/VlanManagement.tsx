
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, Settings, Edit, Trash2 } from 'lucide-react';

interface Vlan {
  id: string;
  vlanId: number;
  name: string;
  interface: string;
  status: 'active' | 'inactive';
  ports: string[];
  description: string;
}

interface VlanManagementProps {
  selectedDevice?: string | null;
}

const VlanManagement: React.FC<VlanManagementProps> = ({ selectedDevice }) => {
  const [vlans, setVlans] = useState<Vlan[]>([
    {
      id: '1',
      vlanId: 10,
      name: 'VLAN_ADMIN',
      interface: 'bridge',
      status: 'active',
      ports: ['ether2', 'ether3'],
      description: 'Red de administración'
    },
    {
      id: '2',
      vlanId: 20,
      name: 'VLAN_USERS',
      interface: 'bridge',
      status: 'active',
      ports: ['ether4', 'ether5', 'wlan1'],
      description: 'Red de usuarios'
    },
    {
      id: '3',
      vlanId: 30,
      name: 'VLAN_GUEST',
      interface: 'bridge',
      status: 'active',
      ports: ['wlan1'],
      description: 'Red de invitados'
    },
    {
      id: '4',
      vlanId: 100,
      name: 'VLAN_SERVERS',
      interface: 'bridge',
      status: 'inactive',
      ports: ['ether6'],
      description: 'Red de servidores'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">VLANs Configuradas</h2>
          <p className="text-gray-600">
            {selectedDevice ? `Equipo: ${selectedDevice}` : 'Selecciona un equipo para ver sus VLANs'}
          </p>
        </div>
      </div>

      {/* Lista de VLANs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vlans.map((vlan) => (
          <Card key={vlan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>VLAN {vlan.vlanId}</span>
                </CardTitle>
                <Badge variant={vlan.status === 'active' ? 'default' : 'secondary'}>
                  {vlan.status === 'active' ? 'Activa' : 'Inactiva'}
                </Badge>
              </div>
              <CardDescription>{vlan.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Interface:</p>
                  <p className="font-mono text-sm">{vlan.interface}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Puertos asignados:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vlan.ports.length > 0 ? (
                      vlan.ports.map((port, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {port}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Sin puertos asignados</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Descripción:</p>
                  <p className="text-sm">{vlan.description || 'Sin descripción'}</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vlans.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Network className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron VLANs configuradas en este equipo</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VlanManagement;
