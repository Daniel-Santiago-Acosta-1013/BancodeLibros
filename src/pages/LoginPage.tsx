import { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UIContext } from '../context/UIContext';

const LoginPage = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(UIContext);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    if (login(username, password)) {
      showToast('Iniciaste sesión correctamente', 'success');
      navigate('/dashboard');
    } else {
      showToast('Usuario o contraseña incorrectos', 'error');
    }
  };

  // Handle register form submission (demo only)
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    showToast('Registro no implementado en esta demo. Use testuser/password123', 'info');
    setIsRegisterForm(false);
  };

  // Toggle between login and register forms
  const toggleAuthForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600">
      <div 
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 ease-in-out"
        style={{animation: 'scaleUp 0.5s ease-out forwards'}}
      >
        {!isRegisterForm ? (
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-3">Bienvenido al Banco de Libros</h2>
            <p className="text-center text-gray-500 mb-8">Accede a tu cuenta para descubrir un mundo de conocimiento.</p>
            
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="loginUsername" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                <input
                  type="text"
                  id="loginUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="ej: lectorPro"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Ingresar
              </button>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-600">
              ¿No tienes cuenta? 
              <button 
                onClick={toggleAuthForm}
                className="ml-1 font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-3">Crea tu Cuenta</h2>
            <p className="text-center text-gray-500 mb-8">Únete a nuestra comunidad de lectores.</p>
            
            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="registerFullName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    id="registerFullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="form-input w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Tu Nombre Completo"
                  />
                </div>
                <div>
                  <label htmlFor="registerUsername" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="registerUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Elige un usuario"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  id="registerEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  id="registerPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Elige una contraseña segura"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg"
              >
                <i className="fas fa-user-plus mr-2"></i>Crear Cuenta
              </button>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta? 
              <button 
                onClick={toggleAuthForm}
                className="ml-1 font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
