import React, { useState } from 'react';
import { MOCK_MAQUINAS, MOCK_CHECKLIST_ITEMS } from '../data/mockData';
import { CheckCircle2, XCircle, AlertTriangle, Send } from 'lucide-react';

export default function ChecklistTab({ onAbrirOSComFalha }) {
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(MOCK_MAQUINAS[0]);
  const [items, setItems] = useState(MOCK_CHECKLIST_ITEMS);
  const [checklistEnviado, setChecklistEnviado] = useState(false);

  const handleStatusChange = (id, status) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleFinalizarChecklist = () => {
    const pendentes = items.filter((i) => i.status === null);
    if (pendentes.length > 0) {
      alert(`Ainda restam ${pendentes.length} itens sem inspeção no checklist!`);
      return;
    }

    const falhas = items.filter((i) => i.status === 'NOK');
    setChecklistEnviado(true);

    if (falhas.length > 0) {
      // Abre a Ordem de Serviço com os dados do item reprovado
      onAbrirOSComFalha({
        maquina: maquinaSelecionada,
        descricao: `Falha detectada no checklist TPM: ${falhas.map((f) => f.item).join('; ')}`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Checklist Diário de Partida (TPM)</h2>
          <p className="text-sm text-slate-500">Inspeção pré-operacional diária antes do início do turno</p>
        </div>

        {/* Seletor de Máquina */}
        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <label htmlFor="select-maquina" className="text-xs font-bold text-slate-600 uppercase">
            Equipamento:
          </label>
          <select
            id="select-maquina"
            value={maquinaSelecionada}
            onChange={(e) => {
              setMaquinaSelecionada(e.target.value);
              setChecklistEnviado(false);
              setItems(MOCK_CHECKLIST_ITEMS.map((i) => ({ ...i, status: null })));
            }}
            className="text-sm font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            {MOCK_MAQUINAS.map((maq) => (
              <option key={maq} value={maq}>
                {maq}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Verificação */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-slate-500">Itens de Inspeção</span>
          <span className="text-xs font-semibold text-slate-500">
            {items.filter((i) => i.status !== null).length} de {items.length} verificados
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                item.status === 'OK'
                  ? 'bg-emerald-50/40'
                  : item.status === 'NOK'
                  ? 'bg-red-50/40'
                  : ''
              }`}
            >
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-700 uppercase">
                  {item.categoria}
                </span>
                <p className="text-sm font-medium text-slate-800">{item.item}</p>
              </div>

              {/* Botões de Inspeção */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.id, 'OK')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                    item.status === 'OK'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Conforme (OK)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(item.id, 'NOK')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                    item.status === 'NOK'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-700'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Não Conforme (NOK)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do Form de Checklist */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          {items.some((i) => i.status === 'NOK') && (
            <div className="flex items-center space-x-2 text-xs font-bold text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Atenção: Itens reprovados gerarão abertura automática de O.S.</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleFinalizarChecklist}
            disabled={checklistEnviado}
            className="ml-auto flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{checklistEnviado ? 'Checklist Registrado' : 'Finalizar Inspeção'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}