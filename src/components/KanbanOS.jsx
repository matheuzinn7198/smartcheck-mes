import React from 'react';
import { Wrench, Clock, CheckCircle2, PlusCircle } from 'lucide-react';

export default function KanbanOS({ ordens, onNovaOS, onMudarStatusOS }) {
  const colunas = [
    { id: 'Aberto', titulo: 'Aberto', cor: 'border-amber-500 bg-amber-50/50', icone: Clock },
    { id: 'Em Atendimento', titulo: 'Em Atendimento', cor: 'border-blue-500 bg-blue-50/50', icone: Wrench },
    { id: 'Concluído', titulo: 'Concluído', cor: 'border-emerald-500 bg-emerald-50/50', icone: CheckCircle2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quadro Kanban de Manutenção</h2>
          <p className="text-sm text-slate-500">Gestão visual de chamados técnicos e Ordens de Serviço</p>
        </div>

        <button
          onClick={onNovaOS}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nova Ordem de Serviço</span>
        </button>
      </div>

      {/* Grid Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colunas.map((col) => {
          const IconeColuna = col.icone;
          const ordensColuna = ordens.filter((o) => o.status === col.id);

          return (
            <div key={col.id} className={`p-4 rounded-xl border-t-4 ${col.cor} bg-white shadow-sm flex flex-col min-h-[400px]`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <IconeColuna className="w-4 h-4 text-slate-600" />
                  <h3 className="font-bold text-slate-800 text-sm">{col.titulo}</h3>
                </div>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {ordensColuna.length}
                </span>
              </div>

              {/* Cards das O.S. */}
              <div className="space-y-3 flex-1">
                {ordensColuna.map((os) => (
                  <div key={os.id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono font-bold text-slate-500">{os.id}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          os.prioridade === 'Alta'
                            ? 'bg-red-100 text-red-700'
                            : os.prioridade === 'Média'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {os.prioridade}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-800 text-sm">{os.maquina}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{os.descricao}</p>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                      <span>Por: {os.solicitante}</span>
                      <span>{os.data}</span>
                    </div>

                    {/* Mudar Status rápido */}
                    <div className="pt-2 flex justify-end space-x-1">
                      {col.id !== 'Concluído' && (
                        <button
                          onClick={() => onMudarStatusOS(os.id, col.id === 'Aberto' ? 'Em Atendimento' : 'Concluído')}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Avançar Status →
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {ordensColuna.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    Nenhuma O.S. nesta coluna
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}