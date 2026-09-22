export const MOCK_MAQUINAS = [
  'Laminadora L-01',
  'Corte Automático C-02',
  'Solda Robótica S-01',
  'Máquina V',
  'Estanqueidade E-03'
];

export const MOCK_CHECKLIST_ITEMS = [
  { id: 1, categoria: 'Segurança', item: 'Sensor da grade de proteção operando normalmente', status: null },
  { id: 2, categoria: 'Mecânica', item: 'Nível do óleo hidráulico do reservatório principal', status: null },
  { id: 3, categoria: 'Pneumática', item: 'Manômetro de pressão pneumática entre 6 e 8 bar', status: null },
  { id: 4, categoria: 'Elétrica', item: 'Botão de parada de emergência travando e resetando', status: null },
  { id: 5, categoria: 'Qualidade', item: 'Calibração do leitor óptico/gabarito de estanqueidade', status: null },
];

export const INITIAL_ORDENS_SERVICO = [
  {
    id: 'OS-2026-001',
    maquina: 'Laminadora L-01',
    descricao: 'Variação de pressão nos rolos de tração principal',
    prioridade: 'Alta',
    status: 'Em Atendimento',
    solicitante: 'Alexandre Silva',
    data: '11/09/2026 08:30'
  },
  {
    id: 'OS-2026-002',
    maquina: 'Corte Automático C-02',
    descricao: 'Ruído atípico no rolamento da mesa de elevação',
    prioridade: 'Média',
    status: 'Aberto',
    solicitante: 'Carlos Eduardo',
    data: '11/09/2026 10:15'
  },
  {
    id: 'OS-2026-003',
    maquina: 'Estanqueidade E-03',
    descricao: 'Substituição preventiva da junta de vedação pneumática',
    prioridade: 'Baixa',
    status: 'Concluído',
    solicitante: 'Roberto Mendes',
    data: '10/09/2026 14:00'
  }
];

export const MOCK_OEE_DATA = [
  { hora: '06:00', aprovadas: 80, refugos: 2, disponibilidade: 98 },
  { hora: '08:00', aprovadas: 95, refugos: 4, disponibilidade: 95 },
  { hora: '10:00', aprovadas: 110, refugos: 1, disponibilidade: 100 },
  { hora: '12:00', aprovadas: 70, refugos: 5, disponibilidade: 85 },
  { hora: '14:00', aprovadas: 105, refugos: 2, disponibilidade: 96 },
];