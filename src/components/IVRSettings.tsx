
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, Server, Database, Volume2, Clock } from 'lucide-react';
import { toast } from 'sonner';

const IVRSettings = () => {
  const [settings, setSettings] = useState({
    asterisk: {
      host: 'localhost',
      port: '5038',
      username: 'admin',
      secret: 'amp111',
      context: 'from-internal'
    },
    agi: {
      port: '4573',
      host: '0.0.0.0',
      maxConnections: '10',
      timeout: '30'
    },
    audio: {
      format: 'wav',
      sampleRate: '8000',
      channels: '1',
      volume: '80'
    },
    database: {
      type: 'sqlite',
      host: 'localhost',
      port: '3306',
      name: 'ivr_data',
      username: 'root',
      password: ''
    },
    features: {
      callRecording: true,
      dtmfDetection: true,
      backgroundMusic: false,
      voicemail: true,
      callQueue: true,
      callback: false
    }
  });

  const saveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', settings);
    toast.success('Settings saved successfully!');
  };

  const generateAsteriskConfig = () => {
    const config = `; Asterisk Manager Interface Configuration
[general]
enabled = yes
port = ${settings.asterisk.port}
bindaddr = 0.0.0.0

[${settings.asterisk.username}]
secret = ${settings.asterisk.secret}
deny = 0.0.0.0/0.0.0.0
permit = 127.0.0.1/255.255.255.0
read = system,call,log,verbose,command,agent,user,config,command,dtmf,reporting,cdr,dialplan
write = system,call,log,verbose,command,agent,user,config,command,dtmf,reporting,cdr,dialplan

; FastAGI Configuration
[${settings.asterisk.context}]
exten => _X.,1,AGI(agi://localhost:${settings.agi.port}/ivr_handler.py)
exten => _X.,n,Hangup()
`;

    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manager.conf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">IVR Settings</h2>
          <p className="text-slate-600">Configure your Asterisk AGI system</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={generateAsteriskConfig} variant="outline">
            <Server className="mr-2 h-4 w-4" />
            Export Config
          </Button>
          <Button onClick={saveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asterisk Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              Asterisk Connection
            </CardTitle>
            <CardDescription>Configure connection to Asterisk server</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="asteriskHost">Host</Label>
                <Input
                  id="asteriskHost"
                  value={settings.asterisk.host}
                  onChange={(e) => setSettings({
                    ...settings,
                    asterisk: { ...settings.asterisk, host: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="asteriskPort">Port</Label>
                <Input
                  id="asteriskPort"
                  value={settings.asterisk.port}
                  onChange={(e) => setSettings({
                    ...settings,
                    asterisk: { ...settings.asterisk, port: e.target.value }
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="asteriskUsername">Manager Username</Label>
              <Input
                id="asteriskUsername"
                value={settings.asterisk.username}
                onChange={(e) => setSettings({
                  ...settings,
                  asterisk: { ...settings.asterisk, username: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="asteriskSecret">Manager Secret</Label>
              <Input
                id="asteriskSecret"
                type="password"
                value={settings.asterisk.secret}
                onChange={(e) => setSettings({
                  ...settings,
                  asterisk: { ...settings.asterisk, secret: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="asteriskContext">Context</Label>
              <Input
                id="asteriskContext"
                value={settings.asterisk.context}
                onChange={(e) => setSettings({
                  ...settings,
                  asterisk: { ...settings.asterisk, context: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* AGI Server Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              AGI Server
            </CardTitle>
            <CardDescription>Python AGI server settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agiHost">Bind Host</Label>
                <Input
                  id="agiHost"
                  value={settings.agi.host}
                  onChange={(e) => setSettings({
                    ...settings,
                    agi: { ...settings.agi, host: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="agiPort">Port</Label>
                <Input
                  id="agiPort"
                  value={settings.agi.port}
                  onChange={(e) => setSettings({
                    ...settings,
                    agi: { ...settings.agi, port: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxConnections">Max Connections</Label>
                <Input
                  id="maxConnections"
                  type="number"
                  value={settings.agi.maxConnections}
                  onChange={(e) => setSettings({
                    ...settings,
                    agi: { ...settings.agi, maxConnections: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="agiTimeout">Timeout (seconds)</Label>
                <Input
                  id="agiTimeout"
                  type="number"
                  value={settings.agi.timeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    agi: { ...settings.agi, timeout: e.target.value }
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volume2 className="mr-2 h-5 w-5" />
              Audio Settings
            </CardTitle>
            <CardDescription>Configure audio format and quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="audioFormat">Audio Format</Label>
              <Select value={settings.audio.format}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wav">WAV</SelectItem>
                  <SelectItem value="gsm">GSM</SelectItem>
                  <SelectItem value="ulaw">µ-law</SelectItem>
                  <SelectItem value="alaw">A-law</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sampleRate">Sample Rate (Hz)</Label>
                <Select value={settings.audio.sampleRate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8000">8000</SelectItem>
                    <SelectItem value="16000">16000</SelectItem>
                    <SelectItem value="44100">44100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="channels">Channels</Label>
                <Select value={settings.audio.channels}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mono</SelectItem>
                    <SelectItem value="2">Stereo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="volume">Volume (%)</Label>
              <Input
                id="volume"
                type="range"
                min="0"
                max="100"
                value={settings.audio.volume}
                onChange={(e) => setSettings({
                  ...settings,
                  audio: { ...settings.audio, volume: e.target.value }
                })}
              />
              <div className="text-center text-sm text-slate-500 mt-1">
                {settings.audio.volume}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Features
            </CardTitle>
            <CardDescription>Enable or disable IVR features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(settings.features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    features: { ...settings.features, [key]: checked }
                  })}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Python AGI Server Code */}
      <Card>
        <CardHeader>
          <CardTitle>Python AGI Server Template</CardTitle>
          <CardDescription>Complete Python server implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            className="font-mono text-sm h-64"
            value={`#!/usr/bin/env python3
"""
Asterisk Python AGI Server
A complete FastAGI server implementation for IVR systems
"""

import socket
import threading
import logging
from asterisk.agi import AGI

class AGIServer:
    def __init__(self, host='${settings.agi.host}', port=${settings.agi.port}):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
    def start(self):
        """Start the AGI server"""
        self.sock.bind((self.host, self.port))
        self.sock.listen(5)
        self.logger.info(f"AGI Server listening on {self.host}:{self.port}")
        
        while True:
            try:
                conn, addr = self.sock.accept()
                self.logger.info(f"Connection from {addr}")
                
                # Handle each connection in a separate thread
                thread = threading.Thread(
                    target=self.handle_connection, 
                    args=(conn, addr)
                )
                thread.daemon = True
                thread.start()
                
            except Exception as e:
                self.logger.error(f"Server error: {e}")
                
    def handle_connection(self, conn, addr):
        """Handle incoming AGI connection"""
        try:
            # Create AGI instance with socket
            agi = AGI(conn.makefile('rw'))
            
            # Initialize IVR handler
            ivr = IVRHandler(agi)
            ivr.run()
            
        except Exception as e:
            self.logger.error(f"Connection error: {e}")
        finally:
            conn.close()

if __name__ == '__main__':
    server = AGIServer()
    server.start()`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default IVRSettings;
