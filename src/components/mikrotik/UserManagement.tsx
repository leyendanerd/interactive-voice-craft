
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Plus, Edit, Trash2, Shield, Key, Mail } from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@empresa.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-12-27 09:30:00',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      username: 'operador1',
      email: 'operador1@empresa.com',
      role: 'operator',
      status: 'active',
      lastLogin: '2024-12-26 16:45:00',
      createdAt: '2024-03-20'
    },
    {
      id: '3',
      username: 'viewer_soporte',
      email: 'soporte@empresa.com',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '2024-12-20 14:20:00',
      createdAt: '2024-06-10'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'viewer'
  });

  const handleCreateUser = () => {
    if (newUser.username && newUser.email && newUser.password) {
      const user: User = {
        id: Date.now().toString(),
        username: newUser.username,
        email: newUser.email,
        role: newUser.role as 'admin' | 'operator' | 'viewer',
        status: 'active',
        lastLogin: 'Nunca',
        createdAt: new Date().toLocaleDateString('es-ES')
      };
      setUsers([...users, user]);
      setNewUser({ username: '', email: '', password: '', role: 'viewer' });
      setShowForm(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'operator': return 'default';
      case 'viewer': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'operator': return 'Operador';
      case 'viewer': return 'Solo Lectura';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
          <p className="text-gray-600">Administrar usuarios y permisos de la plataforma</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nuevo Usuario</span>
        </Button>
      </div>

      {/* Formulario para nuevo usuario */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Usuario</CardTitle>
            <CardDescription>Agregar un nuevo usuario a la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  placeholder="usuario123"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="usuario@empresa.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label htmlFor="role">Rol</Label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="viewer">Solo Lectura</option>
                  <option value="operator">Operador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleCreateUser}>Crear Usuario</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios Registrados</CardTitle>
          <CardDescription>Lista de todos los usuarios de la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{user.username}</p>
                      <Badge variant={getRoleColor(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </span>
                      <span>Último acceso: {user.lastLogin}</span>
                      <span>Creado: {user.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Key className="h-4 w-4 mr-1" />
                    Cambiar Contraseña
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles y Permisos */}
      <Card>
        <CardHeader>
          <CardTitle>Roles y Permisos</CardTitle>
          <CardDescription>Información sobre los diferentes roles disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Administrador</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Acceso completo al sistema</li>
                <li>• Gestión de usuarios</li>
                <li>• Configuración de equipos</li>
                <li>• Gestión de backups</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Operador</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monitoreo de equipos</li>
                <li>• Gestión de VLANs</li>
                <li>• Crear backups</li>
                <li>• Ver alertas</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">Solo Lectura</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ver estado de equipos</li>
                <li>• Ver tráfico de interfaces</li>
                <li>• Ver alertas</li>
                <li>• Sin permisos de modificación</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
