
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Network, Plus, Edit, Trash2, Settings } from 'lucide-react';

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

  const [showForm, setShowForm] = useState(false);
  const [newVlan, setNewVlan] = useState({
    vlanId: '',
    name: '',
    interface: 'bridge',
    description: ''
  });

  const handleCreateVlan = () => {
    if (newVlan.vlanId && newVlan.name) {
      const vlan: Vlan = {
        id: Date.now().toString(),
        vlanId: parseInt(newVlan.vlanId),
        name: newVlan.name,
        interface: newVlan.interface,
        status: 'active',
        ports: [],
        description: newVlan.description
      };
      setVlans([...vlans, vlan]);
      setNewVlan({ vlanId: '', name: '', interface: 'bridge', description: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de VLANs</h2>
          <p className="text-gray-600">
            {selectedDevice ? `Equipo: ${selectedDevice}` : 'Gestionar VLANs en todos los equipos'}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nueva VLAN</span>
        </Button>
      </div>

      {/* Formulario para nueva VLAN */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Crear Nueva VLAN</CardTitle>
            <CardDescription>Configurar una nueva VLAN en el equipo seleccionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vlanId">ID de VLAN</Label>
                <Input
                  id="vlanId"
                  type="number"
                  value={newVlan.vlanId}
                  onChange={(e) => setNewVlan({...newVlan, vlanId: e.target.value})}
                  placeholder="Ej: 40"
                />
              </div>
              <div>
                <Label htmlFor="vlanName">Nombre</Label>
                <Input
                  id="vlanName"
                  value={newVlan.name}
                  onChange={(e) => setNewVlan({...newVlan, name: e.target.value})}
                  placeholder="VLAN_NAME"
                />
              </div>
              <div>
                <Label htmlFor="interface">Interface</Label>
                <Input
                  id="interface"
                  value={newVlan.interface}
                  onChange={(e) => setNewVlan({...newVlan, interface: e.target.value})}
                  placeholder="bridge"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newVlan.description}
                  onChange={(e) => setNewVlan({...newVlan, description: e.target.value})}
                  placeholder="Descripción de la VLAN"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleCreateVlan}>Crear VLAN</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

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
    </div>
  );
};

export default VlanManagement;
