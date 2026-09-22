import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import DashboardOEE from './components/DashboardOEE';
import ChecklistTab from './components/ChecklistTab';
import KanbanOS from './components/KanbanOS';
import NovaOSModal from './components/NovaOSModal';
import { INITIAL_ORDENS_SERVICO } from './data/mockData';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('dashboard');

  const [ordens, setOrdens] = useState(INITIAL_ORDENS_SERVICO);
  const [modalAberta, setModalAberta] = useState(false);
  const [dadosOSInicial, setDadosOSInicial] = useState(null);

  // Carrega a sessão do usuário caso exista no localStorage
  useEffect(() => {
    const sessaoSalva = localStorage.getItem('smartcheck_usuario_v1');
    if (sessaoSalva) {
      setUsuario(JSON.parse(sessaoSalva));
    }
  }, []);

  const handleLogin = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem('smartcheck_usuario_v1', JSON.stringify(dadosUsuario));
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('smartcheck_usuario_v1');
  };

  const handleAbrirOSComFalha = (dadosFalha) => {
    setDadosOSInicial(dadosFalha);
    setModalAberta(true);
  };

  const handleSalvarNovaOS = (novaOSDados) => {
    const novaOS = {
      id: `OS-2026-00${ordens.length + 1}`,
      maquina: novaOSDados.maquina,
      descricao: novaOSDados.descricao,
      prioridade: novaOSDados.prioridade,
      status: 'Aberto',
      solicitante: usuario?.nome || 'Operador',
      data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setOrdens([novaOS, ...ordens]);
    setAbaAtiva('kanban');
  };

  const handleMudarStatusOS = (id, novoStatus) => {
    setOrdens((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: novoStatus } : o))
    );
  };

  // Se o usuário não estiver logado, exibe a tela de login
  if (!usuario) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <Navbar
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        usuario={usuario}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {abaAtiva === 'dashboard' && <DashboardOEE cargo={usuario.cargo} />}
        
        {abaAtiva === 'checklist' && (
           /* Operador Chefe não preenche checklist, só visualiza */
           usuario.cargo === 'Operador Chefe do Setor' ? (
             <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 text-center text-amber-800 font-bold">
                ⚠️ Você tem permissão apenas para acompanhar o Turno Anterior. O preenchimento do checklist diário é feito pelo Operador de Linha.
             </div>
           ) : (
             <ChecklistTab onAbrirOSComFalha={handleAbrirOSComFalha} />
           )
        )}
        
        {abaAtiva === 'kanban' && (
          <KanbanOS
            ordens={ordens}
            cargo={usuario.cargo} /* <- Passe o cargo se quiser bloquear arrastar cards */
            onNovaOS={() => {
              setDadosOSInicial(null);
              setModalAberta(true);
            }}
            onMudarStatusOS={handleMudarStatusOS}
          />
        )}
      </main>

      <NovaOSModal
        isOpen={modalAberta}
        onClose={() => setModalAberta(false)}
        onSalvarOS={handleSalvarNovaOS}
        dadosIniciais={dadosOSInicial}
      />

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2026 SmartCheck MES — AeroWheels Industrial Global
      </footer>
    </div>
  );
}