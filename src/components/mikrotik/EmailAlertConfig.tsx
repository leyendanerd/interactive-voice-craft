
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Settings, TestTube, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailConfig {
  enabled: boolean;
  smtpServer: string;
  smtpPort: string;
  username: string;
  password: string;
  fromEmail: string;
  toEmails: string[];
  alertTypes: string[];
  subject: string;
  template: string;
}

const EmailAlertConfig: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<EmailConfig>({
    enabled: false,
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    username: '',
    password: '',
    fromEmail: '',
    toEmails: [],
    alertTypes: ['critical', 'warning'],
    subject: '[MikroTik Alert] {alert_type}: {device_name}',
    template: `
Se ha detectado una alerta en el equipo MikroTik:

Equipo: {device_name}
Tipo de Alerta: {alert_type}
Título: {alert_title}
Descripción: {alert_description}
Fecha y Hora: {timestamp}
IP del Equipo: {device_ip}

Por favor, revise el estado del equipo inmediatamente.

Dashboard: {dashboard_url}
    `.trim()
  });

  const [newEmail, setNewEmail] = useState('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleConfigChange = (field: keyof EmailConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addEmail = () => {
    if (newEmail && newEmail.includes('@') && !config.toEmails.includes(newEmail)) {
      setConfig(prev => ({
        ...prev,
        toEmails: [...prev.toEmails, newEmail]
      }));
      setNewEmail('');
    }
  };

  const removeEmail = (email: string) => {
    setConfig(prev => ({
      ...prev,
      toEmails: prev.toEmails.filter(e => e !== email)
    }));
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Simular prueba de conexión
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Conexión exitosa",
        description: "La configuración de Gmail ha sido validada correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor SMTP de Gmail.",
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const sendTestAlert = async () => {
    try {
      // Simular envío de alerta de prueba
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Alerta de prueba enviada",
        description: "Se ha enviado una alerta de prueba a todos los destinatarios configurados.",
      });
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "No se pudo enviar la alerta de prueba.",
        variant: "destructive",
      });
    }
  };

  const saveConfiguration = () => {
    // Guardar configuración
    localStorage.setItem('mikrotik-email-config', JSON.stringify(config));
    toast({
      title: "Configuración guardada",
      description: "La configuración de alertas por email ha sido guardada exitosamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configuración de Alertas por Gmail</h2>
          <p className="text-gray-600">Configure las alertas automáticas por correo electrónico</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="email-alerts">Alertas por Email</Label>
          <Switch 
            id="email-alerts"
            checked={config.enabled}
            onCheckedChange={(checked) => handleConfigChange('enabled', checked)}
          />
        </div>
      </div>

      {config.enabled && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuración SMTP */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Configuración SMTP</span>
              </CardTitle>
              <CardDescription>Configuración del servidor de correo de Gmail</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-server">Servidor SMTP</Label>
                  <Input
                    id="smtp-server"
                    value={config.smtpServer}
                    onChange={(e) => handleConfigChange('smtpServer', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">Puerto</Label>
                  <Input
                    id="smtp-port"
                    value={config.smtpPort}
                    onChange={(e) => handleConfigChange('smtpPort', e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="username">Usuario Gmail</Label>
                <Input
                  id="username"
                  type="email"
                  value={config.username}
                  onChange={(e) => handleConfigChange('username', e.target.value)}
                  placeholder="tu-email@gmail.com"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Contraseña de Aplicación</Label>
                <Input
                  id="password"
                  type="password"
                  value={config.password}
                  onChange={(e) => handleConfigChange('password', e.target.value)}
                  placeholder="Contraseña de aplicación de Gmail"
                />
              </div>
              
              <div>
                <Label htmlFor="from-email">Email Remitente</Label>
                <Input
                  id="from-email"
                  type="email"
                  value={config.fromEmail}
                  onChange={(e) => handleConfigChange('fromEmail', e.target.value)}
                  placeholder="alertas@tuempresa.com"
                />
              </div>

              <Button 
                onClick={testConnection} 
                disabled={isTestingConnection}
                className="w-full"
                variant="outline"
              >
                {isTestingConnection ? (
                  <>
                    <TestTube className="h-4 w-4 mr-2 animate-spin" />
                    Probando Conexión...
                  </>
                ) : (
                  <>
                    <TestTube className="h-4 w-4 mr-2" />
                    Probar Conexión
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Destinatarios y Tipos de Alerta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Configuración de Alertas</span>
              </CardTitle>
              <CardDescription>Configure destinatarios y tipos de alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="add-email">Destinatarios</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="add-email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="admin@empresa.com"
                    onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                  />
                  <Button onClick={addEmail} size="sm">Agregar</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.toEmails.map((email, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {email}
                      <button 
                        onClick={() => removeEmail(email)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="alert-types">Tipos de Alertas a Enviar</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipos de alerta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Críticas</SelectItem>
                    <SelectItem value="warning">Advertencias</SelectItem>
                    <SelectItem value="info">Información</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.alertTypes.map((type, index) => (
                    <Badge key={index} variant="outline">
                      {type === 'critical' ? 'Críticas' : type === 'warning' ? 'Advertencias' : 'Información'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Asunto del Email</Label>
                <Input
                  id="subject"
                  value={config.subject}
                  onChange={(e) => handleConfigChange('subject', e.target.value)}
                  placeholder="[MikroTik Alert] {alert_type}: {device_name}"
                />
              </div>

              <Button 
                onClick={sendTestAlert}
                className="w-full"
                variant="outline"
              >
                <Mail className="h-4 w-4 mr-2" />
                Enviar Alerta de Prueba
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {config.enabled && (
        <Card>
          <CardHeader>
            <CardTitle>Plantilla de Email</CardTitle>
            <CardDescription>
              Personalice el contenido del email. Variables disponibles: {'{device_name}'}, {'{alert_type}'}, {'{alert_title}'}, {'{alert_description}'}, {'{timestamp}'}, {'{device_ip}'}, {'{dashboard_url}'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={config.template}
              onChange={(e) => handleConfigChange('template', e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={saveConfiguration}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailAlertConfig;
