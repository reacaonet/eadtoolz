import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div>
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Progresso Total</h3>
            <span className="text-2xl font-bold text-blue-600">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Cursos Ativos</h3>
            <span className="text-2xl font-bold text-green-600">4</span>
          </div>
          <p className="text-gray-600">2 cursos em andamento</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Certificados</h3>
            <span className="text-2xl font-bold text-purple-600">3</span>
          </div>
          <p className="text-gray-600">1 certificado pendente</p>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Cursos Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((course) => (
            <div key={course} className="border rounded-lg overflow-hidden">
              <img 
                src={`https://placehold.co/400x200?text=Curso+${course}`}
                alt={`Curso ${course}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Curso de Exemplo {course}</h3>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Progresso: 60%</div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
