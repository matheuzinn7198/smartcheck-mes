//Topo corporativo com dados do usuário e linha

import React from 'react';
import { Activity, ClipboardCheck, Wrench, User, LogOut } from 'lucide-react';

export default function Navbar({ abaAtiva, setAbaAtiva, usuario, onLogout }) {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Marca */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white font-black text-xl">
              AEROWHEELS
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider text-slate-100">SmartCheck MES</span>
              <span className="block text-xs text-orange-400 font-semibold">Módulo Manutenção & TPM</span>
            </div>
          </div>

          {/* Menu de Navegação */}
          <nav className="hidden md:flex space-x-2">
            <button
              onClick={() => setAbaAtiva('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                abaAtiva === 'dashboard'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard OEE</span>
            </button>

            <button
              onClick={() => setAbaAtiva('checklist')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                abaAtiva === 'checklist'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Checklist TPM</span>
            </button>

            <button
              onClick={() => setAbaAtiva('kanban')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                abaAtiva === 'kanban'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Ordens de Serviço</span>
            </button>
          </nav>

          {/* Perfil do Usuário */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs text-white">
                {usuario.nome ? usuario.nome.charAt(0) : 'U'}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-200">{usuario.nome || 'Operador'}</p>
                <p className="text-slate-400">RE: {usuario.re || '1024'}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition"
              title="Sair do Sistema"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}