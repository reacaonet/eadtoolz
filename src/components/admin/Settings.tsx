import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FiSave, FiGlobe, FiMail, FiPhone, FiMapPin, FiFileText, FiImage } from 'react-icons/fi';

interface CompanySettings {
  name: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

interface PlatformSettings {
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  defaultUserRole: 'student' | 'teacher';
  maintenanceMode: boolean;
}

export function Settings() {
  const [activeTab, setActiveTab] = useState('company');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: '',
    logo: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    description: ''
  });

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    allowRegistration: true,
    requireEmailVerification: true,
    maxFileSize: 10, // MB
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.png'],
    defaultUserRole: 'student',
    maintenanceMode: false
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      
      // Carregar configurações da empresa
      const companyDoc = await getDoc(doc(db, 'settings', 'company'));
      if (companyDoc.exists()) {
        setCompanySettings(companyDoc.data() as CompanySettings);
      }

      // Carregar configurações da plataforma
      const platformDoc = await getDoc(doc(db, 'settings', 'platform'));
      if (platformDoc.exists()) {
        setPlatformSettings(platformDoc.data() as PlatformSettings);
      }

    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      setError('Erro ao carregar as configurações. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setPlatformSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileTypeChange = (type: string) => {
    setPlatformSettings(prev => ({
      ...prev,
      allowedFileTypes: prev.allowedFileTypes.includes(type)
        ? prev.allowedFileTypes.filter(t => t !== type)
        : [...prev.allowedFileTypes, type]
    }));
  };

  const saveSettings = async () => {
    try {
      setError('');
      setSuccess('');
      setIsSaving(true);

      // Salvar configurações da empresa
      await setDoc(doc(db, 'settings', 'company'), companySettings);

      // Salvar configurações da plataforma
      await setDoc(doc(db, 'settings', 'platform'), platformSettings);

      setSuccess('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setError('Erro ao salvar as configurações. Por favor, tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('company')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'company'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dados da Empresa
          </button>
          <button
            onClick={() => setActiveTab('platform')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'platform'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Configurações da Plataforma
          </button>
        </div>

        {/* Mensagens de Feedback */}
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            {success}
          </div>
        )}

        {/* Conteúdo das Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Empresa
                  </label>
                  <div className="relative">
                    <FiFileText className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={companySettings.name}
                      onChange={handleCompanyChange}
                      className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <FiGlobe className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      name="website"
                      value={companySettings.website}
                      onChange={handleCompanyChange}
                      className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={companySettings.email}
                      onChange={handleCompanyChange}
                      className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={companySettings.phone}
                      onChange={handleCompanyChange}
                      className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={companySettings.address}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Empresa
                </label>
                <textarea
                  name="description"
                  value={companySettings.description}
                  onChange={handleCompanyChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'platform' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="allowRegistration"
                      checked={platformSettings.allowRegistration}
                      onChange={handlePlatformChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Permitir Novos Registros
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="requireEmailVerification"
                      checked={platformSettings.requireEmailVerification}
                      onChange={handlePlatformChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Exigir Verificação de Email
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho Máximo de Arquivo (MB)
                  </label>
                  <input
                    type="number"
                    name="maxFileSize"
                    value={platformSettings.maxFileSize}
                    onChange={handlePlatformChange}
                    min="1"
                    max="100"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Papel Padrão do Usuário
                  </label>
                  <select
                    name="defaultUserRole"
                    value={platformSettings.defaultUserRole}
                    onChange={handlePlatformChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="student">Estudante</option>
                    <option value="teacher">Professor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipos de Arquivos Permitidos
                </label>
                <div className="flex flex-wrap gap-4">
                  {['.pdf', '.doc', '.docx', '.jpg', '.png', '.mp4', '.zip'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={platformSettings.allowedFileTypes.includes(type)}
                        onChange={() => handleFileTypeChange(type)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={platformSettings.maintenanceMode}
                    onChange={handlePlatformChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Modo de Manutenção
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={saveSettings}
              disabled={isSaving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <FiSave className="mr-2" />
              )}
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
