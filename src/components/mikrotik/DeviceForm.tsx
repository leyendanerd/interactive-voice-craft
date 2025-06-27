
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Router, TestTube } from 'lucide-react';

interface DeviceFormProps {
  onClose: () => void;
  onDeviceAdded: () => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onClose, onDeviceAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    username: '',
    password: '',
    port: '8728',
    model: '',
    location: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular guardado
    setTimeout(() => {
      console.log('Equipo agregado:', formData);
      setIsLoading(false);
      onDeviceAdded();
    }, 1000);
  };

  const testConnection = async () => {
    setTestStatus('testing');
    
    // Simular prueba de conexión
    setTimeout(() => {
      if (formData.ip && formData.username && formData.password) {
        setTestStatus('success');
      } else {
        setTestStatus('error');
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Router className="h-5 w-5" />
              <span>Agregar Equipo MikroTik</span>
            </CardTitle>
            <CardDescription>
              Configurar conexión con un nuevo router MikroTik
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre del Equipo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="RouterOS-Principal"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ip">Dirección IP</Label>
                <Input
                  id="ip"
                  value={formData.ip}
                  onChange={(e) => setFormData({...formData, ip: e.target.value})}
                  placeholder="192.168.1.1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="port">Puerto API</Label>
                <Input
                  id="port"
                  value={formData.port}
                  onChange={(e) => setFormData({...formData, port: e.target.value})}
                  placeholder="8728"
                />
              </div>
              <div>
                <Label htmlFor="model">Modelo</Label>
                <Select value={formData.model} onValueChange={(value) => setFormData({...formData, model: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hEX">hEX</SelectItem>
                    <SelectItem value="hEX S">hEX S</SelectItem>
                    <SelectItem value="RB750Gr3">RB750Gr3</SelectItem>
                    <SelectItem value="CCR1009">CCR1009</SelectItem>
                    <SelectItem value="CCR1036">CCR1036</SelectItem>
                    <SelectItem value="CRS328">CRS328</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Oficina Principal, Rack A"
              />
            </div>

            {/* Test Connection */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Probar Conexión</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={testConnection}
                  disabled={testStatus === 'testing'}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {testStatus === 'testing' ? 'Probando...' : 'Probar'}
                </Button>
              </div>
              
              {testStatus === 'success' && (
                <p className="text-sm text-green-600">✓ Conexión exitosa con el equipo MikroTik</p>
              )}
              {testStatus === 'error' && (
                <p className="text-sm text-red-600">✗ Error al conectar. Verifica las credenciales.</p>
              )}
              {testStatus === 'idle' && (
                <p className="text-sm text-gray-500">Prueba la conexión antes de guardar</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Guardando...' : 'Agregar Equipo'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceForm;
