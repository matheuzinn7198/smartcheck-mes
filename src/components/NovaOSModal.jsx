import React, { useState } from 'react';
import { MOCK_MAQUINAS } from '../data/mockData';
import { X, Wrench, MessageSquareWarning } from 'lucide-react';

const PROBLEMAS_COMUNS = [
  "Vazamento de Óleo/Fluidos",
  "Falha no Sensor / Leitor Óptico",
  "Desgaste / Quebra de Ferramenta",
  "Ruído ou Vibração Anormal",
  "Painel Elétrico Inoperante",
  "Outro"
];

export default function NovaOSModal({ isOpen, onClose, onSalvarOS, dadosIniciais }) {
  const [maquina, setMaquina] = useState(dadosIniciais?.maquina || MOCK_MAQUINAS[0]);
  const [problemaSelecionado, setProblemaSelecionado] = useState(PROBLEMAS_COMUNS[0]);
  const [descricaoOutro, setDescricaoOutro] = useState(dadosIniciais?.descricao || '');
  const [prioridade, setPrioridade] = useState('Média');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Se escolheu 'Outro', a descrição é o texto dele. Se não, a descrição é o problema comum.
    const descricaoFinal = problemaSelecionado === 'Outro' ? descricaoOutro : problemaSelecionado;

    if (problemaSelecionado === 'Outro' && !descricaoFinal.trim()) {
      alert("Por favor, descreva o problema.");
      return;
    }

    onSalvarOS({
      maquina,
      descricao: descricaoFinal,
      prioridade
    });

    setDescricaoOutro('');
    setProblemaSelecionado(PROBLEMAS_COMUNS[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border-t-4 border-blue-600 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquareWarning className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Relatar Problema / Nova O.S.</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Equipamento:</label>
            <select
              value={maquina} onChange={(e) => setMaquina(e.target.value)}
              className="w-full p-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
            >
              {MOCK_MAQUINAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Problemas Comuns (Selecione):</label>
            <select
              value={problemaSelecionado} onChange={(e) => setProblemaSelecionado(e.target.value)}
              className="w-full p-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 font-medium"
            >
              {PROBLEMAS_COMUNS.map(prob => <option key={prob} value={prob}>{prob}</option>)}
            </select>
          </div>

          {/* SÓ MOSTRA O CAMPO DE TEXTO SE ESCOLHER "OUTRO" */}
          {problemaSelecionado === 'Outro' && (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Descreva com suas palavras:</label>
              <textarea
                rows="3"
                value={descricaoOutro}
                onChange={(e) => setDescricaoOutro(e.target.value)}
                placeholder="Explique o que aconteceu com o equipamento fora do normal..."
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Nível de Urgência:</label>
            <select
              value={prioridade} onChange={(e) => setPrioridade(e.target.value)}
              className="w-full p-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="Baixa">Baixa (Pode aguardar)</option>
              <option value="Média">Média (Ajuste / Afeta Qualidade)</option>
              <option value="Alta">Alta (Emergência / Máquina Parada)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition">Abrir Solicitação</button>
          </div>
        </form>
      </div>
    </div>
  );
}