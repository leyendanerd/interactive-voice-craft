
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, Save, RefreshCw, Calendar, HardDrive, AlertTriangle } from 'lucide-react';

interface Backup {
  id: string;
  name: string;
  device: string;
  date: string;
  size: string;
  type: 'manual' | 'automatic';
  status: 'success' | 'error' | 'processing';
}

interface BackupManagementProps {
  selectedDevice?: string | null;
}

const BackupManagement: React.FC<BackupManagementProps> = ({ selectedDevice }) => {
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      name: 'backup_router_principal_20241227',
      device: 'Router Principal',
      date: '2024-12-27 10:30:00',
      size: '2.3 MB',
      type: 'manual',
      status: 'success'
    },
    {
      id: '2',
      name: 'backup_auto_20241226',
      device: 'Router Principal',
      date: '2024-12-26 03:00:00',
      size: '2.1 MB',
      type: 'automatic',
      status: 'success'
    },
    {
      id: '3',
      name: 'backup_router_sucursal_20241225',
      device: 'Router Sucursal',
      date: '2024-12-25 15:45:00',
      size: '1.8 MB',
      type: 'manual',
      status: 'success'
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupName, setBackupName] = useState('');

  const handleCreateBackup = () => {
    if (!selectedDevice) {
      alert('Selecciona un equipo primero');
      return;
    }
    
    setIsCreatingBackup(true);
    
    // Simular creación de backup
    setTimeout(() => {
      const newBackup: Backup = {
        id: Date.now().toString(),
        name: backupName || `backup_${Date.now()}`,
        device: selectedDevice,
        date: new Date().toLocaleString('es-ES'),
        size: '2.5 MB',
        type: 'manual',
        status: 'success'
      };
      
      setBackups([newBackup, ...backups]);
      setIsCreatingBackup(false);
      setBackupName('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Backups</h2>
          <p className="text-gray-600">
            {selectedDevice ? `Equipo: ${selectedDevice}` : 'Gestionar backups de configuración'}
          </p>
        </div>
      </div>

      {/* Acciones de Backup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Save className="h-5 w-5" />
              <span>Crear Backup</span>
            </CardTitle>
            <CardDescription>Crear un backup manual de la configuración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="backupName">Nombre del backup (opcional)</Label>
                <Input
                  id="backupName"
                  value={backupName}
                  onChange={(e) => setBackupName(e.target.value)}
                  placeholder="backup_personalizado"
                />
              </div>
              <Button 
                onClick={handleCreateBackup}
                disabled={!selectedDevice || isCreatingBackup}
                className="w-full"
              >
                {isCreatingBackup ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creando backup...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Crear Backup
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Restaurar Backup</span>
            </CardTitle>
            <CardDescription>Cargar un archivo de backup desde tu computadora</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Arrastra un archivo .backup aquí o haz clic para seleccionar</p>
              </div>
              <div className="flex items-center space-x-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">⚠️ Esto sobrescribirá la configuración actual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Backups Disponibles</CardTitle>
          <CardDescription>Historial de backups creados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <HardDrive className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{backup.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{backup.date}</span>
                      </span>
                      <span>{backup.size}</span>
                      <span>{backup.device}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={backup.type === 'automatic' ? 'secondary' : 'default'}>
                    {backup.type === 'automatic' ? 'Automático' : 'Manual'}
                  </Badge>
                  <Badge variant={backup.status === 'success' ? 'default' : 'destructive'}>
                    {backup.status === 'success' ? 'Exitoso' : 'Error'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </Button>
                  <Button size="sm" variant="outline" className="text-amber-600">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Restaurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManagement;
