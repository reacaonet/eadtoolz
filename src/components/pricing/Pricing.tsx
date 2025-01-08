import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';
import { planService } from '../../services/planService';
import { Plan } from '../../types/plan';
import { Spinner } from '../shared/Spinner';
import { PublicLayout } from '../layout/PublicLayout';

export function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const fetchedPlans = await planService.getPlans();
      setPlans(fetchedPlans);
    } catch (err) {
      setError('Erro ao carregar os planos. Por favor, tente novamente.');
      console.error('Error loading plans:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium text-red-600 mb-2">{error}</h3>
            <button
              onClick={loadPlans}
              className="text-blue-600 hover:text-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
              Planos e Preços
            </h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">
              Comece sua jornada de ensino online com nossa plataforma completa
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:max-w-7xl lg:mx-auto xl:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border ${
                  plan.isPopular ? 'border-blue-200 ring-2 ring-blue-600' : 'border-gray-200'
                } rounded-lg shadow-sm divide-y divide-gray-200 bg-white`}
              >
                <div className="p-6">
                  {plan.isPopular && (
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 mb-4">
                      Mais Popular
                    </span>
                  )}
                  <h2 className="text-2xl leading-6 font-semibold text-gray-900">
                    {plan.name}
                  </h2>
                  <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      R$ {plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /{plan.billingPeriod === 'monthly' ? 'mês' : 'ano'}
                    </span>
                  </p>
                  <Link
                    to="/login"
                    className={`mt-8 block w-full rounded-md py-3 px-6 text-center font-medium ${
                      plan.isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    Começar agora
                  </Link>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                    O que está incluído
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Perguntas Frequentes
            </h2>
            <dl className="space-y-6 divide-y divide-gray-200">
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Como funciona o período de teste?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Oferecemos {plans[0]?.trialDays || 14} dias de teste grátis em todos os planos,
                  sem compromisso. Você pode cancelar a qualquer momento durante este período.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Preciso de cartão de crédito para começar?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Não é necessário cartão de crédito para iniciar o período de teste.
                  Você só precisará informar seus dados de pagamento quando decidir
                  continuar usando a plataforma.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Posso mudar de plano depois?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer
                  momento. As alterações serão refletidas na sua próxima fatura.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Como funciona o suporte?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Oferecemos suporte humanizado via chat, email e tutoriais em vídeo.
                  Nossa equipe está disponível em horário comercial para ajudar você.
                </dd>
              </div>
            </dl>
          </div>

          {/* CTA Section */}
          <div className="mt-24 bg-blue-50 rounded-2xl">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-blue-900 text-center">
                Pronto para transformar sua forma de ensinar?
              </h2>
              <p className="mt-4 text-lg text-blue-600 text-center">
                Comece agora e aproveite {plans[0]?.trialDays || 14} dias grátis de
                todas as funcionalidades.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Começar gratuitamente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
