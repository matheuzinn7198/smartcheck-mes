import React, { useState } from 'react';
import { MOCK_OEE_DATA } from '../data/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CheckCircle2, AlertTriangle, Clock, Activity, Edit3 } from 'lucide-react';

export default function DashboardOEE({ cargo }) {
  // Estados editáveis pelo Líder
  const [kpis, setKpis] = useState({
    aprovadas: 460,
    refugos: 14,
    disponibilidade: 92.0,
    oee: 86.4
  });

  const ehLider = cargo === 'Líder';
  const ehChefe = cargo === 'Operador Chefe do Setor';

  const handleEditar = (campo, valorAtual) => {
    if (!ehLider) return;
    const novoValor = prompt(`Editar ${campo}:`, valorAtual);
    if (novoValor && !isNaN(novoValor)) {
      setKpis(prev => ({ ...prev, [campo]: Number(novoValor) }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Monitoramento de Peças e Produção</h2>
          {ehChefe && <p className="text-sm font-bold text-orange-600">Modo Leitura: Visualizando dados do Turno Anterior</p>}
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-300">
          🟢 Linha: Operação Normal
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI OEE */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group">
          {ehLider && <button onClick={() => handleEditar('oee', kpis.oee)} className="absolute top-3 right-3 text-slate-300 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">OEE Geral</p>
              <p className="text-2xl font-black text-slate-900">{kpis.oee}%</p>
            </div>
          </div>
        </div>

        {/* KPI Aprovadas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
          {ehLider && <button onClick={() => handleEditar('aprovadas', kpis.aprovadas)} className="absolute top-3 right-3 text-slate-300 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Peças Aprovadas</p>
              <p className="text-2xl font-black text-slate-900">{kpis.aprovadas} un.</p>
            </div>
          </div>
        </div>

        {/* KPI Refugos */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
          {ehLider && <button onClick={() => handleEditar('refugos', kpis.refugos)} className="absolute top-3 right-3 text-slate-300 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Refugos / Retrabalho</p>
              <p className="text-2xl font-black text-slate-900">{kpis.refugos} un.</p>
            </div>
          </div>
        </div>

        {/* KPI Disponibilidade */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
          {ehLider && <button onClick={() => handleEditar('disponibilidade', kpis.disponibilidade)} className="absolute top-3 right-3 text-slate-300 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Disponibilidade</p>
              <p className="text-2xl font-black text-slate-900">{kpis.disponibilidade}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Gráfico de Produção - Histórico</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_OEE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hora" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area type="monotone" dataKey="aprovadas" name="Peças Aprovadas" stroke="#00549f" fill="#00549f" fillOpacity={0.15} />
              <Area type="monotone" dataKey="refugos" name="Refugos" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}