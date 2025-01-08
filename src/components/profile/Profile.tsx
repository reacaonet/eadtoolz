import { useState, useRef, useEffect } from 'react';
import { auth, storage, db } from '../../config/firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  phone: string;
  occupation: string;
  company: string;
  location: string;
}

export function Profile() {
  const { currentUser, userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<UserProfile>({
    displayName: userData?.name || '',
    email: userData?.email || '',
    bio: '',
    phone: '',
    occupation: '',
    company: '',
    location: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Carregar dados do usuário do Firestore
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData(prev => ({
            ...prev,
            displayName: userData.name || prev.displayName,
            email: userData.email || prev.email,
            bio: userData.bio || '',
            phone: userData.phone || '',
            occupation: userData.occupation || '',
            company: userData.company || '',
            location: userData.location || ''
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [currentUser]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUser) return;

    try {
      setIsUploading(true);
      setError('');

      // Criar referência no Storage
      const storageRef = ref(storage, `profile_photos/${currentUser.uid}`);
      
      // Upload da imagem
      await uploadBytes(storageRef, file);
      
      // Obter URL da imagem
      const photoURL = await getDownloadURL(storageRef);
      
      // Atualizar perfil do usuário
      await updateProfile(currentUser, {
        photoURL: photoURL
      });

      // Atualizar no Firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        photoURL: photoURL
      }, { merge: true });

      setSuccess('Foto atualizada com sucesso!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!currentUser) throw new Error('Usuário não encontrado');

      // Atualizar perfil básico no Firebase Auth
      await updateProfile(currentUser, {
        displayName: formData.displayName,
      });

      // Atualizar email se foi alterado
      if (formData.email !== currentUser.email) {
        await updateEmail(currentUser, formData.email);
      }

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        name: formData.displayName,
        email: formData.email,
        bio: formData.bio,
        phone: formData.phone,
        occupation: formData.occupation,
        company: formData.company,
        location: formData.location,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message);
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
        {/* Cabeçalho do Perfil */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
              <div 
                onClick={handleImageClick}
                className="relative cursor-pointer group"
              >
                <img
                  src={currentUser?.photoURL || "https://placehold.co/120x120?text=👤"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-opacity group-hover:opacity-75"
                />
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all">
                    <svg 
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{formData.displayName || 'Usuário'}</h1>
              <p className="text-gray-600">{formData.occupation}</p>
              <p className="text-gray-500 text-sm">{formData.location}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'profile'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'security'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Segurança
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
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ocupação
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biografia
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Salvar Alterações
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={async (e) => {
              e.preventDefault();
              setError('');
              setSuccess('');

              const form = e.target as HTMLFormElement;
              const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
              const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

              try {
                if (!currentUser) throw new Error('Usuário não encontrado');

                if (newPassword !== confirmPassword) {
                  throw new Error('As senhas não coincidem');
                }

                await updatePassword(currentUser, newPassword);
                setSuccess('Senha atualizada com sucesso!');
                form.reset();
              } catch (error: any) {
                setError(error.message);
              }
            }} 
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Atualizar Senha
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}
