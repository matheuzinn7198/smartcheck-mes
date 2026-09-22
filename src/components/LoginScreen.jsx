import React, { useState } from 'react';
import { MOCK_MAQUINAS } from '../data/mockData';
import { Lock, User, ShieldCheck, Factory } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [nome, setNome] = useState('');
  const [re, setRe] = useState('');
  const [cargo, setCargo] = useState('Operador de Linha');
  const [estacao, setEstacao] = useState(MOCK_MAQUINAS[0]);
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    if (re.length < 4 || re.length > 7) {
      setErro('O RE deve conter entre 4 e 7 dígitos.');
      return;
    }

    const eMaster = cargo === 'Líder';
    const pinValido = eMaster ? '1000' : '1001';

    if (pin !== pinValido) {
      setErro(`PIN incorreto. (Dica: Operadores = 1001 | Líder = 1000)`);
      return;
    }

    onLogin({
      nome,
      re,
      cargo,
      estacao: eMaster ? 'Visão Global (Líder)' : estacao,
      eMaster
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-between p-4 font-sans">
      <header className="max-w-7xl w-full mx-auto flex justify-between items-center py-2">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 px-3 py-1.5 rounded-lg text-white font-black text-xl tracking-wider">
            AEROWHEELS
          </div>
          <span className="text-sm font-semibold text-slate-300 hidden sm:inline-block">
            Industrial Shared Services
          </span>
        </div>
      </header>

      <div className="max-w-md w-full mx-auto my-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-orange-500">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex p-3 bg-slate-100 text-blue-600 rounded-full mb-2">
              <Factory className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">SmartCheck MES</h2>
            <p className="text-xs text-slate-500">Acesso ao Terminal de Produção</p>
          </div>

          {erro && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded">
              ⚠️ {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nome Completo</label>
              <div className="relative">
                <input
                  type="text" required placeholder="Ex: Alexandre Silva"
                  value={nome} onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-orange-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">RE</label>
              <input
                type="text" required maxLength="7" placeholder="Ex: 1024"
                value={re} onChange={(e) => setRe(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nível de Usuário</label>
                <select
                  value={cargo} onChange={(e) => setCargo(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="Operador de Linha">Operador de Linha</option>
                  <option value="Operador Chefe do Setor">Operador Chefe do Setor</option>
                  <option value="Líder">Líder (Gestão Master)</option>
                </select>
              </div>

              {cargo !== 'Líder' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Estação</label>
                  <select
                    value={estacao} onChange={(e) => setEstacao(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-orange-500 bg-white"
                  >
                    {MOCK_MAQUINAS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">PIN de Acesso</label>
              <div className="relative">
                <input
                  type="password" required placeholder="Digite seu PIN"
                  value={pin} onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-orange-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition flex items-center justify-center space-x-2 text-sm mt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Acessar Sistema</span>
            </button>
          </form>
        </div>
      </div>
      <footer className="text-center py-2 text-xs text-slate-500">© 2026 AeroWheels Industrial</footer>
    </div>
  );
}