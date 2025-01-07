import { planService } from '../services/planService';

const initialPlans = [
  {
    name: 'Essential',
    description: 'Tudo que você precisa para começar sua plataforma de ensino online',
    price: 299,
    maxUsers: 50,
    billingPeriod: 'monthly',
    trialDays: 14,
    isPopular: true,
    features: [
      'Plataforma EAD no estilo "Netflix"',
      'Até 50 usuários',
      'Criação de cursos ilimitada',
      'Carrinho de compras',
      'Checkout transparente',
      'Sem taxas por venda',
      'Integração com Stripe',
      'Integração com Pagar.me',
      'Integração com Vimeo e YouTube',
      'FAQ, tutoriais e tours guiados',
      'Suporte via chatbot',
      'Plugin Growth PRO',
      'Plugin Gamificação',
      'Plugin Custom PRO',
      'Plugin Acadêmico PRO',
      'Plugin Conteúdo PRO',
      'Plugin Toolzz Live',
      'Acesso ao Toolzz Academy',
      'Suporte humanizado',
      'Customer success'
    ]
  },
  {
    name: 'Professional',
    description: 'Para escolas e instituições que precisam de mais recursos',
    price: 599,
    maxUsers: 200,
    billingPeriod: 'monthly',
    trialDays: 14,
    isPopular: false,
    features: [
      'Todas as features do Essential',
      'Até 200 usuários',
      'Domínio personalizado',
      'API de integração',
      'Relatórios avançados',
      'Suporte prioritário',
      'Onboarding personalizado',
      'Treinamento da equipe',
      'Backup diário',
      'Certificados personalizados'
    ]
  }
];

export async function seedPlans() {
  try {
    for (const plan of initialPlans) {
      await planService.createPlan(plan);
    }
    console.log('Planos criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar planos:', error);
  }
}
