export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  company: string;
  bio: string;
  postsCount: number;
  likesReceived: number;
  followers: number;
  following: number;
  communities: number;
  badges: Badge[];
  interests: string[];
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  type: 'dica' | 'relato' | 'pergunta' | 'aviso' | 'educativo' | 'enquete' | 'video' | 'material';
  tags: string[];
  likes: number;
  comments: number;
  reposts: number;
  saves: number;
  liked: boolean;
  saved: boolean;
  reposted: boolean;
  createdAt: string;
  image?: string;
  poll?: Poll;
  pinned?: boolean;
  sensitive?: boolean;
}

export interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  voted?: number;
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
  percentage: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  liked: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  moderators: string[];
  icon: string;
  color: string;
  postsThisWeek: number;
  joined: boolean;
  highlight?: string;
  rules: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'repost' | 'community' | 'highlight' | 'moderation';
  actor: User;
  content: string;
  read: boolean;
  createdAt: string;
  postId?: string;
}

export const badges: Badge[] = [
  { id: '1', name: 'Colaborador Ativo', icon: '⚡', color: 'bg-warning' },
  { id: '2', name: 'Voz da Comunidade', icon: '📢', color: 'bg-primary' },
  { id: '3', name: 'Líder Colaborativo', icon: '🤝', color: 'bg-accent' },
  { id: '4', name: 'Moderador', icon: '🛡️', color: 'bg-destructive' },
  { id: '5', name: 'Especialista em Bem-Estar', icon: '🌿', color: 'bg-success' },
  { id: '6', name: 'Mentor da Comunidade', icon: '🎓', color: 'bg-primary' },
  { id: '7', name: 'Contribuidor Frequente', icon: '✍️', color: 'bg-accent' },
];

export const users: User[] = [
  {
    id: '1', name: 'Ana Beatriz Costa', username: 'anabcosta', avatar: '',
    role: 'Diretora de RH', company: 'TechCorp Brasil',
    bio: 'Apaixonada por pessoas e cultura organizacional. 15 anos transformando ambientes de trabalho.',
    postsCount: 142, likesReceived: 2840, followers: 1256, following: 320, communities: 8,
    badges: [badges[1], badges[2], badges[5]],
    interests: ['liderança', 'bem-estar', 'cultura organizacional', 'NR-01'],
    joinedAt: '2024-01-15',
  },
  {
    id: '2', name: 'Carlos Eduardo Silva', username: 'carlosesilva', avatar: '',
    role: 'Engenheiro de Segurança do Trabalho', company: 'Construtech S.A.',
    bio: 'SST na prática. Prevenção é investimento, não custo.',
    postsCount: 98, likesReceived: 1920, followers: 834, following: 215, communities: 6,
    badges: [badges[0], badges[4]],
    interests: ['SST', 'NR-01', 'saúde mental', 'prevenção'],
    joinedAt: '2024-02-10',
  },
  {
    id: '3', name: 'Mariana Oliveira', username: 'marioliv', avatar: '',
    role: 'Líder de Equipe', company: 'InovaSoft',
    bio: 'Liderança humanizada é possível. Compartilho o que aprendo no dia a dia.',
    postsCount: 76, likesReceived: 1540, followers: 623, following: 180, communities: 5,
    badges: [badges[0], badges[2]],
    interests: ['liderança saudável', 'feedback', 'comunicação', 'produtividade'],
    joinedAt: '2024-03-05',
  },
  {
    id: '4', name: 'Rafael Mendes', username: 'rafaelmendes', avatar: '',
    role: 'Psicólogo Organizacional', company: 'MindWork Consultoria',
    bio: 'Cuidar da saúde emocional no trabalho é cuidar de resultados sustentáveis.',
    postsCount: 203, likesReceived: 4120, followers: 2105, following: 410, communities: 10,
    badges: [badges[1], badges[4], badges[5], badges[6]],
    interests: ['saúde mental', 'burnout', 'apoio emocional', 'segurança psicológica'],
    joinedAt: '2023-11-20',
  },
  {
    id: '5', name: 'Juliana Ferreira', username: 'juferreira', avatar: '',
    role: 'Coordenadora de SST', company: 'LogiPlan',
    bio: 'Conectando segurança do trabalho com bem-estar real das equipes.',
    postsCount: 64, likesReceived: 980, followers: 412, following: 165, communities: 4,
    badges: [badges[0], badges[3]],
    interests: ['SST', 'NR-01', 'gestão de riscos', 'clima organizacional'],
    joinedAt: '2024-04-12',
  },
  {
    id: '6', name: 'Pedro Almeida', username: 'pedroalmeida', avatar: '',
    role: 'Gerente de Pessoas', company: 'EcoIndustria',
    bio: 'Gestão de pessoas com propósito. Cada conversa conta.',
    postsCount: 55, likesReceived: 870, followers: 345, following: 140, communities: 5,
    badges: [badges[6]],
    interests: ['gestão de pessoas', 'feedback', 'diversidade', 'bem-estar'],
    joinedAt: '2024-05-01',
  },
];

export const currentUser = users[0];

export const posts: Post[] = [
  {
    id: '1', author: users[3], type: 'dica',
    content: 'Uma rotina simples de check-in semanal reduziu muito o ruído entre líderes e equipe. Bastou perguntar: "Como você está se sentindo em relação às demandas da semana?" — a qualidade das conversas mudou completamente.',
    tags: ['check-in', 'liderança', 'bem-estar'],
    likes: 234, comments: 42, reposts: 18, saves: 56,
    liked: false, saved: false, reposted: false,
    createdAt: '2h',
  },
  {
    id: '2', author: users[2], type: 'relato',
    content: 'O que mais ajuda no clima da equipe é clareza de prioridade. Quando o time sabe exatamente o que importa mais, a ansiedade diminui e a colaboração aumenta naturalmente. Implementamos um quadro de prioridades semanal e o impacto foi imediato.',
    tags: ['clima-organizacional', 'produtividade', 'prioridades'],
    likes: 189, comments: 31, reposts: 12, saves: 44,
    liked: true, saved: false, reposted: false,
    createdAt: '4h',
  },
  {
    id: '3', author: users[1], type: 'pergunta',
    content: 'Como vocês lidam com sobrecarga sem perder a qualidade? Na minha experiência em SST, percebo que muitas equipes estão no limite. Quais estratégias têm funcionado para vocês?',
    tags: ['sobrecarga', 'SST', 'gestão-de-carga'],
    likes: 156, comments: 67, reposts: 8, saves: 32,
    liked: false, saved: true, reposted: false,
    createdAt: '6h',
  },
  {
    id: '4', author: users[0], type: 'educativo',
    content: 'Compartilhei um modelo de conversa de feedback que funcionou bem na nossa empresa. O segredo: começar pelo reconhecimento genuíno, depois abordar o ponto de desenvolvimento com exemplos concretos, e terminar com um plano de ação conjunto.',
    tags: ['feedback', 'desenvolvimento', 'liderança'],
    likes: 312, comments: 54, reposts: 45, saves: 128,
    liked: false, saved: false, reposted: false,
    createdAt: '8h',
    pinned: true,
  },
  {
    id: '5', author: users[4], type: 'aviso',
    content: '⚠️ Lembrete importante: A atualização da NR-01 sobre riscos psicossociais entra em vigor em breve. Sua empresa já está mapeando os fatores de risco? Compartilhe como está sendo o processo na sua organização.',
    tags: ['NR-01', 'riscos-psicossociais', 'compliance'],
    likes: 445, comments: 89, reposts: 67, saves: 210,
    liked: false, saved: false, reposted: false,
    createdAt: '12h',
  },
  {
    id: '6', author: users[5], type: 'enquete',
    content: 'Quero entender melhor a realidade de vocês. Participem!',
    tags: ['enquete', 'gestão', 'desafios'],
    likes: 78, comments: 23, reposts: 5, saves: 12,
    liked: false, saved: false, reposted: false,
    createdAt: '1d',
    poll: {
      question: 'Qual é o maior desafio da sua equipe hoje?',
      totalVotes: 847,
      voted: undefined,
      options: [
        { id: 0, text: 'Sobrecarga de trabalho', votes: 312, percentage: 37 },
        { id: 1, text: 'Comunicação entre áreas', votes: 245, percentage: 29 },
        { id: 2, text: 'Falta de reconhecimento', votes: 178, percentage: 21 },
        { id: 3, text: 'Saúde mental da equipe', votes: 112, percentage: 13 },
      ],
    },
  },
  {
    id: '7', author: users[3], type: 'dica',
    content: 'Apoio entre liderança e equipe faz muita diferença nos períodos de pressão. Um gesto simples como "posso ajudar com algo?" já muda o clima. Liderança não é sobre ter todas as respostas, é sobre estar presente.',
    tags: ['liderança', 'apoio', 'pressão'],
    likes: 267, comments: 38, reposts: 22, saves: 71,
    liked: false, saved: false, reposted: false,
    createdAt: '1d',
  },
  {
    id: '8', author: users[1], type: 'educativo',
    content: 'Segurança psicológica não é "ser legal o tempo todo". É criar um ambiente onde as pessoas possam discordar, errar e aprender sem medo de punição. A NR-01 reforça isso ao incluir riscos psicossociais como fator de atenção obrigatória.',
    tags: ['segurança-psicológica', 'NR-01', 'cultura'],
    likes: 398, comments: 71, reposts: 55, saves: 165,
    liked: true, saved: true, reposted: false,
    createdAt: '2d',
  },
];

export const communities: Community[] = [
  {
    id: '1', name: 'Liderança', description: 'Espaço para líderes compartilharem experiências, desafios e boas práticas de gestão humanizada.',
    members: 3420, moderators: ['Ana Beatriz Costa'], icon: '👑', color: 'bg-primary',
    postsThisWeek: 34, joined: true,
    highlight: 'Webinar: Liderança em tempos de mudança - Quinta às 15h',
    rules: ['Manter tom profissional', 'Compartilhar experiências reais', 'Respeitar diferentes estilos de liderança'],
  },
  {
    id: '2', name: 'RH Estratégico', description: 'Profissionais de RH discutindo tendências, políticas e transformação cultural.',
    members: 2180, moderators: ['Pedro Almeida'], icon: '🎯', color: 'bg-accent',
    postsThisWeek: 28, joined: true,
    highlight: 'Série: Implementando a NR-01 na prática',
    rules: ['Foco em soluções práticas', 'Dados e evidências são bem-vindos', 'Sem autopromoção'],
  },
  {
    id: '3', name: 'SST / Segurança do Trabalho', description: 'Tudo sobre segurança e saúde no trabalho, normas regulamentadoras e prevenção.',
    members: 4510, moderators: ['Carlos Eduardo Silva', 'Juliana Ferreira'], icon: '🛡️', color: 'bg-warning',
    postsThisWeek: 45, joined: false,
    highlight: 'NR-01 Atualizada: O que muda na prática?',
    rules: ['Informações técnicas precisas', 'Citar fontes quando possível', 'Perguntas são sempre bem-vindas'],
  },
  {
    id: '4', name: 'Saúde Mental e Bem-Estar', description: 'Conversas sobre saúde emocional, prevenção de burnout e qualidade de vida no trabalho.',
    members: 5230, moderators: ['Rafael Mendes'], icon: '🌿', color: 'bg-success',
    postsThisWeek: 52, joined: true,
    highlight: 'Desafio: 21 dias de autocuidado no trabalho',
    rules: ['Acolhimento sempre', 'Sem julgamentos', 'Recomendar profissionais quando necessário', 'Conteúdo sensível deve ser sinalizado'],
  },
  {
    id: '5', name: 'Comunicação e Feedback', description: 'Técnicas, modelos e experiências de comunicação efetiva entre equipes.',
    members: 1890, moderators: ['Mariana Oliveira'], icon: '💬', color: 'bg-primary',
    postsThisWeek: 19, joined: false,
    rules: ['Compartilhar modelos e templates', 'Exemplos práticos são essenciais', 'Feedback construtivo sempre'],
  },
  {
    id: '6', name: 'Cultura Organizacional', description: 'Discussões sobre valores, propósito e como construir uma cultura forte e saudável.',
    members: 2760, moderators: ['Ana Beatriz Costa', 'Pedro Almeida'], icon: '🏛️', color: 'bg-accent',
    postsThisWeek: 22, joined: false,
    rules: ['Diversidade de perspectivas', 'Cases reais são valorizados', 'Manter o foco em práticas aplicáveis'],
  },
  {
    id: '7', name: 'Gestão de Carga de Trabalho', description: 'Como equilibrar demandas, priorizar tarefas e evitar sobrecarga nas equipes.',
    members: 1540, moderators: ['Mariana Oliveira'], icon: '⚖️', color: 'bg-warning',
    postsThisWeek: 15, joined: true,
    rules: ['Soluções práticas', 'Ferramentas e métodos são bem-vindos', 'Respeitar o contexto de cada empresa'],
  },
  {
    id: '8', name: 'Colaboradores', description: 'Espaço aberto para todos os colaboradores compartilharem experiências e apoiarem uns aos outros.',
    members: 6120, moderators: ['Rafael Mendes', 'Pedro Almeida'], icon: '🤝', color: 'bg-success',
    postsThisWeek: 61, joined: true,
    highlight: 'Mural de reconhecimento: Quem te inspirou essa semana?',
    rules: ['Respeito mútuo', 'Apoio genuíno', 'Sem hierarquias aqui', 'Celebrar conquistas'],
  },
];

export const trendingTopics = [
  { tag: '#NR01', posts: 1240, trending: true },
  { tag: '#BemEstarNoTrabalho', posts: 890, trending: true },
  { tag: '#LiderançaSaudável', posts: 756, trending: true },
  { tag: '#PrevençãoDeBurnout', posts: 623, trending: false },
  { tag: '#ClimaOrganizacional', posts: 589, trending: false },
  { tag: '#FeedbackEfetivo', posts: 445, trending: true },
  { tag: '#SegurançaPsicológica', posts: 412, trending: false },
  { tag: '#SaúdeMentalNoTrabalho', posts: 378, trending: true },
  { tag: '#CulturaOrganizacional', posts: 334, trending: false },
  { tag: '#ProdutividadeSustentável', posts: 298, trending: false },
];

export const mockComments: Comment[] = [
  {
    id: 'c1', author: users[2],
    content: 'Excelente ponto! Implementamos algo parecido e o resultado foi surpreendente. O segredo é a consistência.',
    likes: 23, liked: false, createdAt: '1h',
    replies: [
      { id: 'c1r1', author: users[3], content: 'Concordo! Consistência é tudo. Quanto tempo levou para ver resultados?', likes: 8, liked: false, createdAt: '45min' },
      { id: 'c1r2', author: users[2], content: 'Cerca de 3 semanas. No início parece forçado, mas depois vira natural.', likes: 12, liked: true, createdAt: '30min' },
    ],
  },
  {
    id: 'c2', author: users[4],
    content: 'Na nossa empresa começamos com check-ins quinzenais e foi um divisor de águas. Agora fazemos semanalmente.',
    likes: 15, liked: false, createdAt: '2h',
  },
  {
    id: 'c3', author: users[5],
    content: 'Adorei a abordagem! Vou propor isso na próxima reunião de gestão. Alguém tem um template?',
    likes: 7, liked: false, createdAt: '3h',
    replies: [
      { id: 'c3r1', author: users[0], content: 'Tenho sim! Vou compartilhar em um post separado com o modelo completo. 📋', likes: 19, liked: false, createdAt: '2h' },
    ],
  },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'like', actor: users[3], content: 'curtiu seu post sobre feedback', read: false, createdAt: '5min', postId: '4' },
  { id: 'n2', type: 'comment', actor: users[2], content: 'comentou no seu post', read: false, createdAt: '15min', postId: '4' },
  { id: 'n3', type: 'follow', actor: users[5], content: 'começou a te seguir', read: false, createdAt: '1h' },
  { id: 'n4', type: 'mention', actor: users[1], content: 'mencionou você em um comentário', read: true, createdAt: '2h', postId: '5' },
  { id: 'n5', type: 'repost', actor: users[4], content: 'repostou seu conteúdo sobre NR-01', read: true, createdAt: '3h', postId: '4' },
  { id: 'n6', type: 'community', actor: users[3], content: 'publicou na comunidade Saúde Mental e Bem-Estar', read: true, createdAt: '5h' },
  { id: 'n7', type: 'highlight', actor: users[0], content: 'Seu post foi destaque da semana!', read: true, createdAt: '1d' },
  { id: 'n8', type: 'like', actor: users[1], content: 'curtiu seu comentário', read: true, createdAt: '1d' },
];

export const postTypeLabels: Record<string, { label: string; color: string }> = {
  dica: { label: '💡 Dica', color: 'bg-warning/10 text-warning-foreground' },
  relato: { label: '📖 Relato', color: 'bg-primary/10 text-primary' },
  pergunta: { label: '❓ Pergunta', color: 'bg-accent/10 text-accent' },
  aviso: { label: '⚠️ Aviso', color: 'bg-destructive/10 text-destructive' },
  educativo: { label: '🎓 Educativo', color: 'bg-success/10 text-success' },
  enquete: { label: '📊 Enquete', color: 'bg-primary/10 text-primary' },
  video: { label: '🎬 Vídeo', color: 'bg-accent/10 text-accent' },
  material: { label: '📄 Material', color: 'bg-muted text-muted-foreground' },
};
