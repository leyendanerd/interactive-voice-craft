
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Play, Save, Trash2, ArrowRight, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MenuOption {
  id: string;
  key: string;
  label: string;
  action: 'menu' | 'extension' | 'hangup' | 'queue';
  target?: string;
}

interface IVRMenu {
  id: string;
  name: string;
  greeting: string;
  timeout: number;
  maxRetries: number;
  options: MenuOption[];
}

const CallFlowBuilder = () => {
  const [menus, setMenus] = useState<IVRMenu[]>([
    {
      id: '1',
      name: 'Main Menu',
      greeting: 'Welcome to our company. Press 1 for sales, 2 for support, or 0 for operator.',
      timeout: 10,
      maxRetries: 3,
      options: [
        { id: '1', key: '1', label: 'Sales', action: 'extension', target: '1001' },
        { id: '2', key: '2', label: 'Support', action: 'queue', target: 'support' },
        { id: '3', key: '0', label: 'Operator', action: 'extension', target: '1000' },
      ]
    }
  ]);
  
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const [isEditing, setIsEditing] = useState(false);

  const currentMenu = menus.find(m => m.id === selectedMenu);

  const addNewMenu = () => {
    const newMenu: IVRMenu = {
      id: Date.now().toString(),
      name: 'New Menu',
      greeting: 'Please make your selection.',
      timeout: 10,
      maxRetries: 3,
      options: []
    };
    setMenus([...menus, newMenu]);
    setSelectedMenu(newMenu.id);
    setIsEditing(true);
  };

  const addOption = () => {
    if (!currentMenu) return;
    
    const newOption: MenuOption = {
      id: Date.now().toString(),
      key: '',
      label: 'New Option',
      action: 'extension',
      target: ''
    };
    
    const updatedMenus = menus.map(menu =>
      menu.id === selectedMenu
        ? { ...menu, options: [...menu.options, newOption] }
        : menu
    );
    setMenus(updatedMenus);
  };

  const removeOption = (optionId: string) => {
    const updatedMenus = menus.map(menu =>
      menu.id === selectedMenu
        ? { ...menu, options: menu.options.filter(opt => opt.id !== optionId) }
        : menu
    );
    setMenus(updatedMenus);
  };

  const generateAGIScript = () => {
    const script = `#!/usr/bin/env python3
"""
Asterisk AGI IVR Script
Generated automatically from IVR Manager
"""

import sys
import re
from asterisk.agi import AGI

class IVRHandler:
    def __init__(self):
        self.agi = AGI()
        self.menus = ${JSON.stringify(menus, null, 8)}
        
    def play_menu(self, menu_id='1'):
        menu = next((m for m in self.menus if m['id'] == menu_id), None)
        if not menu:
            self.agi.verbose("Menu not found: " + menu_id)
            return
            
        retries = 0
        while retries < menu['maxRetries']:
            # Play greeting
            self.agi.stream_file(f"custom/{menu['name'].lower().replace(' ', '_')}")
            
            # Get user input
            result = self.agi.wait_for_digit(menu['timeout'] * 1000)
            digit = chr(result) if result > 0 else ''
            
            # Find matching option
            option = next((opt for opt in menu['options'] if opt['key'] == digit), None)
            
            if option:
                self.handle_option(option)
                return
            else:
                retries += 1
                if retries < menu['maxRetries']:
                    self.agi.stream_file("invalid")
                    
        # Max retries reached
        self.agi.stream_file("goodbye")
        self.agi.hangup()
        
    def handle_option(self, option):
        if option['action'] == 'extension':
            self.agi.exec_cmd('Dial', f"SIP/{option['target']}")
        elif option['action'] == 'queue':
            self.agi.exec_cmd('Queue', option['target'])
        elif option['action'] == 'menu':
            self.play_menu(option['target'])
        elif option['action'] == 'hangup':
            self.agi.hangup()
            
    def run(self):
        self.agi.verbose("Starting IVR")
        self.agi.answer()
        self.play_menu()

if __name__ == '__main__':
    handler = IVRHandler()
    handler.run()
`;

    // Create downloadable file
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ivr_handler.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Call Flow Builder</h2>
          <p className="text-slate-600">Design and manage your IVR menu structure</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={generateAGIScript} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Export AGI Script
          </Button>
          <Button onClick={addNewMenu}>
            <Plus className="mr-2 h-4 w-4" />
            Add Menu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu List */}
        <Card>
          <CardHeader>
            <CardTitle>IVR Menus</CardTitle>
            <CardDescription>Select a menu to edit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMenu === menu.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
                onClick={() => {
                  setSelectedMenu(menu.id);
                  setIsEditing(false);
                }}
              >
                <div className="font-medium">{menu.name}</div>
                <div className="text-sm text-slate-500">
                  {menu.options.length} options
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Menu Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {isEditing ? 'Edit Menu' : currentMenu?.name || 'Select Menu'}
                </CardTitle>
                <CardDescription>Configure menu settings and options</CardDescription>
              </div>
              {currentMenu && (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                >
                  {isEditing ? 'View' : 'Edit'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentMenu ? (
              <div className="space-y-6">
                {/* Menu Settings */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="menuName">Menu Name</Label>
                    <Input
                      id="menuName"
                      value={currentMenu.name}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-slate-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="greeting">Greeting Message</Label>
                    <Textarea
                      id="greeting"
                      value={currentMenu.greeting}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-slate-50' : ''}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <Input
                        id="timeout"
                        type="number"
                        value={currentMenu.timeout}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-slate-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxRetries">Max Retries</Label>
                      <Input
                        id="maxRetries"
                        type="number"
                        value={currentMenu.maxRetries}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-slate-50' : ''}
                      />
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">Menu Options</h4>
                    {isEditing && (
                      <Button onClick={addOption} size="sm">
                        <Plus className="mr-1 h-3 w-3" />
                        Add Option
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {currentMenu.options.map((option, index) => (
                      <div key={option.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <Badge variant="outline">{option.key || '?'}</Badge>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-slate-500">
                            {option.action}: {option.target || 'Not set'}
                          </div>
                        </div>
                        {option.action === 'menu' && (
                          <ArrowRight className="h-4 w-4 text-slate-400" />
                        )}
                        {isEditing && (
                          <Button
                            onClick={() => removeOption(option.id)}
                            size="sm"
                            variant="ghost"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call Flow Visualization */}
                <div>
                  <h4 className="font-semibold mb-4">Call Flow Preview</h4>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-center">
                      <div className="inline-block bg-white p-3 rounded-lg shadow-sm">
                        <Play className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-medium">{currentMenu.name}</div>
                      </div>
                      {currentMenu.options.length > 0 && (
                        <>
                          <ArrowDown className="h-6 w-6 text-slate-400 mx-auto my-2" />
                          <div className="flex justify-center space-x-2 flex-wrap">
                            {currentMenu.options.map((option) => (
                              <div key={option.id} className="bg-white p-2 rounded shadow-sm m-1">
                                <Badge className="mb-1">{option.key}</Badge>
                                <div className="text-xs">{option.label}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                Select a menu from the list to start editing
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallFlowBuilder;
