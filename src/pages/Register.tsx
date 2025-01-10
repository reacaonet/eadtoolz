import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Lock, Mail, User } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });

      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        email: email,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('Usuário registrado com sucesso');
      navigate('/dashboard/student');
    } catch (err) {
      console.error('Erro no registro:', err);
      setError('Falha no registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Image */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="Learning"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Comece sua jornada na EadToolZ
            </h1>
            <p className="text-xl text-gray-300">
              Junte-se a nossa comunidade de aprendizado. Crie sua conta e comece a explorar cursos incríveis.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Register Form */}
      <div className="flex-1 flex items-center justify-center bg-black p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-8">
              <div className="flex items-center justify-center">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-red-600 transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                    E
                  </div>
                </div>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">
              Criar nova conta
            </h2>
            <p className="text-gray-400">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-red-500 hover:text-red-400">
                Entrar
              </Link>
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-500/10 p-4">
                <div className="text-sm text-red-400">{error}</div>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nome completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-10 px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Mínimo de 6 caracteres
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Ao se registrar, você concorda com nossos{' '}
            <Link to="/terms" className="text-red-500 hover:text-red-400">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link to="/privacy" className="text-red-500 hover:text-red-400">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
