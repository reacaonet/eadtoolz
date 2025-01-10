import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { ImageUpload } from '../components/profile/ImageUpload';

export function Profile() {
  const { user, userRole } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    bio: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setEditForm({
            name: data.name || '',
            phone: data.phone || '',
            bio: data.bio || ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;
    
    try {
      setSaving(true);
      const storageRef = ref(storage, `profile-images/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL
      });
      
      setUserData(prev => ({ ...prev, photoURL }));
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setError('Falha ao atualizar a foto de perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      await updateDoc(doc(db, 'users', user.uid), {
        name: editForm.name,
        phone: editForm.phone,
        bio: editForm.bio,
        updatedAt: new Date()
      });
      
      setUserData(prev => ({
        ...prev,
        ...editForm
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setError('Falha ao salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="animate-pulse text-gray-300">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg">
          {/* Cabeçalho */}
          <div className="bg-red-600 text-white p-6 rounded-t-lg flex justify-between items-center">
            <h1 className="text-2xl font-bold">Meu Perfil</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={saving}
            >
              {saving ? 'Salvando...' : isEditing ? 'Salvar' : 'Editar'}
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
                {error}
              </div>
            )}

            {/* Foto do Perfil */}
            <div className="mb-8">
              <ImageUpload
                currentImageUrl={userData?.photoURL}
                onImageSelect={handleImageUpload}
              />
            </div>

            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <p className="text-white mt-1">{userData?.email}</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-300">Nome</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full mt-1 bg-gray-600 text-white rounded-md p-2"
                  />
                ) : (
                  <p className="text-white mt-1">{userData?.name || 'Não definido'}</p>
                )}
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-300">Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full mt-1 bg-gray-600 text-white rounded-md p-2"
                  />
                ) : (
                  <p className="text-white mt-1">{userData?.phone || 'Não definido'}</p>
                )}
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-300">Função</label>
                <p className="text-white mt-1">
                  {userRole === 'admin' && 'Administrador'}
                  {userRole === 'teacher' && 'Professor'}
                  {userRole === 'student' && 'Aluno'}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-700 p-4 rounded-lg mb-8">
              <label className="text-sm font-medium text-gray-300">Sobre mim</label>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full mt-1 bg-gray-600 text-white rounded-md p-2 h-32"
                />
              ) : (
                <p className="text-white mt-1">{userData?.bio || 'Nenhuma informação adicional'}</p>
              )}
            </div>

            {/* Informações Específicas por Role */}
            <div className="border-t border-gray-600 pt-6">
              {userRole === 'admin' && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Informações do Administrador</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">Nível de Acesso: <span className="text-white">Total</span></p>
                    <p className="text-gray-300">Permissões: <span className="text-white">Gerenciamento Completo</span></p>
                  </div>
                </div>
              )}

              {userRole === 'teacher' && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Informações do Professor</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">Cursos Ministrados: <span className="text-white">{userData?.courses?.length || 0}</span></p>
                    <p className="text-gray-300">Status: <span className="text-green-400">Ativo</span></p>
                  </div>
                </div>
              )}

              {userRole === 'student' && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Informações do Aluno</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">Cursos Matriculados: <span className="text-white">{userData?.enrolledCourses?.length || 0}</span></p>
                    <p className="text-gray-300">Status da Matrícula: <span className="text-green-400">Ativo</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}