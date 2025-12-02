export const workouts = [
  {
    slug: 'costas-biceps',
    title: 'Costas & Bíceps',
    meta: '8 exercícios | 1h30 | 380 cal',
    focus: 'Força e definição dos dorsais',
    cover: '/desportista-em-um-treinamento-de-sportswear-em-uma-academia.jpg',
    calories: '380 kcal',
    duration: '1h30',
    intensity: 'Alta',
    level: 'Intermediário',
    equipment: 'Máquinas e pesos livres',
    warmup: {
      title: 'Ativação escápula + mobilidade torácica',
      duration: '12min',
      tags: ['Costas', 'Bíceps']
    },
    overview:
      'Bloco puxado do Figma focado em costas e bíceps com ênfase em controle excêntrico e estabilidade escapular.',
    exercises: [
      { name: 'Puxada aberta na frente', volume: '4 x 12', note: 'Cadência 3-1-2' },
      { name: 'Remada curvada', volume: '4 x 10', note: 'Pegada pronada' },
      { name: 'Barra guiada pull-down', volume: '3 x 12', note: 'Pausa no pico' },
      { name: 'Rosca direta', volume: '4 x 12', note: 'Barra W' },
      { name: 'Rosca alternada sentado', volume: '3 x 14', note: 'Supinate no topo' },
      { name: 'Face pull', volume: '3 x 15', note: 'Foco em escápula' },
      { name: 'Rosca martelo corda', volume: '3 x 12', note: 'Descanso curto' },
      { name: 'Prancha + remada', volume: '3 x 30s', note: 'Core ativo' }
    ],
    finisher: {
      title: 'Farmer walk',
      volume: '3 x 40m',
      tip: 'Respiração nasal para controlar o ritmo'
    }
  },
  {
    slug: 'pernas-completo',
    title: 'Pernas Completo',
    meta: '7 exercícios | 1h25 | 410 cal',
    focus: 'Glúteo e posteriores',
    cover: '/vista-de-angulo-baixo-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma-barra-em-um-clube-de-saude.jpg',
    calories: '410 kcal',
    duration: '1h25',
    intensity: 'Média/Alta',
    level: 'Intermediário',
    equipment: 'Máquinas, halteres e elásticos',
    warmup: {
      title: 'Aquecimento + ativação glúteo',
      duration: '15min',
      tags: ['Glúteo', 'Posteriores']
    },
    overview:
      'Sequência construída para dar volume às pernas enquanto mantém o coração trabalhando em zona 2-leve alta.',
    exercises: [
      { name: 'Agachamento sumô', volume: '4 x 15', note: 'Tempo 3-1-1' },
      { name: 'Elevação pélvica', volume: '4 x 12', note: 'Topo com isometria' },
      { name: 'Afundo búlgaro', volume: '3 x 12', note: 'Segurar halteres' },
      { name: 'Stiff com barra', volume: '4 x 10', note: 'Coluna neutra' },
      { name: 'Cadeira abdutora drop-set', volume: '3 x 15 + drop', note: 'Sem descanso' },
      { name: 'Leg press 45°', volume: '4 x 12', note: 'Pés altos' },
      { name: 'Panturrilha sentado', volume: '4 x 15', note: 'Pausa na extensão' }
    ],
    finisher: {
      title: 'Bike intensa',
      volume: '5 x 40s ON / 20s OFF',
      tip: 'Cadência acima de 100 rpm'
    }
  },
  {
    slug: 'cardio-abdomen',
    title: 'Cardio & Abdômen',
    meta: '6 exercícios | 1h10 | 320 cal',
    focus: 'Condicionamento + core',
    cover: '/mulheres-jovens-participando-da-aula-de-spinning(1).jpg',
    calories: '320 kcal',
    duration: '1h10',
    intensity: 'Média',
    level: 'Todos os níveis',
    equipment: 'Cordas, bike e peso corporal',
    warmup: {
      title: 'Mobilidade quadril + skipping',
      duration: '10min',
      tags: ['Cardio', 'Core']
    },
    overview:
      'Bloco híbrido misturando protocolos HIIT curtos com estabilidade profunda abdominal e lombar.',
    exercises: [
      { name: 'Bike indoor', volume: '4 x 3min', note: 'Zona 4' },
      { name: 'Prancha com toques', volume: '4 x 30s', note: 'Quadril estável' },
      { name: 'Mountain climber', volume: '3 x 45s', note: 'Ritmo constante' },
      { name: 'Ab-wheel', volume: '4 x 10', note: 'Alinhar lombar' },
      { name: 'Cordas pesadas', volume: '6 x 20s', note: 'Explosivo' },
      { name: 'Hollow hold', volume: '4 x 25s', note: 'Respiração curta' }
    ],
    finisher: {
      title: 'Respiração box',
      volume: '4 min',
      tip: '4s inspirar · 4s segurar · 4s soltar'
    }
  },
  {
    slug: 'peito-ombro',
    title: 'Peito & Ombro',
    meta: '7 exercícios | 1h05 | 300 cal',
    focus: 'Estabilidade e hipertrofia',
    cover: '/bodybuilder-training-arm-with-resistance-band.jpg',
    calories: '300 kcal',
    duration: '1h05',
    intensity: 'Média',
    level: 'Intermediário',
    equipment: 'Máquinas, halteres e elásticos',
    warmup: {
      title: 'Mobilidade torácica + elástico',
      duration: '12min',
      tags: ['Peito', 'Ombro']
    },
    overview:
      'Treino pensado para fortalecer a cintura escapular e dar volume ao peitoral, alternando planos horizontal e inclinado.',
    exercises: [
      { name: 'Supino inclinado halteres', volume: '4 x 10', note: '2s descida' },
      { name: 'Supino reto máquina', volume: '3 x 12', note: 'Pausa no meio' },
      { name: 'Crucifixo cabo alto', volume: '3 x 15', note: 'Amplitude máxima' },
      { name: 'Desenvolvimento militar', volume: '4 x 10', note: 'Core travado' },
      { name: 'Elevação lateral', volume: '4 x 14', note: 'Drop set final' },
      { name: 'Face pull', volume: '3 x 15', note: 'Postura alta' },
      { name: 'Flexão diamante', volume: '3 x 12', note: 'Até falha' }
    ],
    finisher: {
      title: 'Isometria parede',
      volume: '3 x 40s',
      tip: 'Pressionar braços contra parede'
    }
  }
]

export function getWorkoutBySlug(slug) {
  if (!slug) return undefined
  return workouts.find((workout) => workout.slug === slug)
}
