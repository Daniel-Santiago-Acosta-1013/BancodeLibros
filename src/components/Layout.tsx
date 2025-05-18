import { ReactNode, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UIContext } from '../context/UIContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const { currentUser, logout, notifications } = useContext(AuthContext);
  const { showToast } = useContext(UIContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    showToast('Sesión cerrada exitosamente', 'success');
    navigate('/');
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserDropdownOpen(false);
    setIsNotificationsOpen(false);
  };
  
  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsNotificationsOpen(false);
  };
  
  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsUserDropdownOpen(false);
  };

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Close dropdowns when clicking outside
  const handleClickOutside = () => {
    setIsUserDropdownOpen(false);
    setIsNotificationsOpen(false);
  };

  // Check if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md z-50 fixed w-full top-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-blue-600 flex items-center">
                <i className="fas fa-book-open mr-2"></i>
                <span className="hidden sm:inline">BookBank</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link 
                to="/dashboard" 
                className={`nav-link px-3 py-2 rounded-md text-md font-medium ${
                  isActive('/dashboard') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <i className="fas fa-tachometer-alt mr-1"></i>Panel
              </Link>
              <Link 
                to="/catalogo" 
                className={`nav-link px-3 py-2 rounded-md text-md font-medium ${
                  isActive('/catalogo') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <i className="fas fa-search mr-1"></i>Catálogo
              </Link>
              <Link 
                to="/ebooks" 
                className={`nav-link px-3 py-2 rounded-md text-md font-medium ${
                  isActive('/ebooks') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <i className="fas fa-tablet-alt mr-1"></i>E-Books
              </Link>
              <Link 
                to="/mis-libros" 
                className={`nav-link px-3 py-2 rounded-md text-md font-medium ${
                  isActive('/mis-libros') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <i className="fas fa-book-bookmark mr-1"></i>Mis Libros
              </Link>
            </nav>
            
            {/* User menu and notifications */}
            <div className="flex items-center">
              <div className="relative mr-4">
                <button 
                  onClick={toggleNotifications}
                  className="text-gray-500 hover:text-blue-600 focus:outline-none"
                >
                  <i className="fas fa-bell text-xl"></i>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl overflow-hidden z-20 py-1">
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Notificaciones</h3>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 text-sm p-4 text-center">No hay notificaciones nuevas.</p>
                      ) : (
                        notifications.map(notification => (
                          <Link
                            key={notification.id}
                            to="#"
                            className={`block px-4 py-3 text-sm hover:bg-gray-100 ${
                              notification.read ? 'text-gray-500' : 'text-gray-800 font-medium'
                            }`}
                          >
                            <p className="truncate">{notification.message}</p>
                            <p className="text-xs text-gray-400">{notification.timestamp}</p>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* User profile menu */}
              <div className="relative">
                <button 
                  onClick={toggleUserDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img 
                    src={currentUser?.avatar || "https://placehold.co/150x150/4B5563/FFFFFF?text=U"}
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="ml-2 font-semibold text-gray-700 hidden md:inline">
                    {currentUser?.username || 'Usuario'}
                  </span>
                </button>
                
                {/* User dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden z-20 py-1">
                    <Link 
                      to="/perfil" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      <i className="fas fa-user-circle mr-2"></i>Mi Perfil
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden flex items-center ml-4">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-gray-600 hover:text-blue-600 focus:outline-none"
                >
                  <i className="fas fa-bars text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <Link 
              to="/dashboard" 
              className={`block px-4 py-3 text-md font-medium ${
                isActive('/dashboard') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-tachometer-alt mr-2"></i>Panel
            </Link>
            <Link 
              to="/catalogo" 
              className={`block px-4 py-3 text-md font-medium ${
                isActive('/catalogo') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-search mr-2"></i>Catálogo
            </Link>
            <Link 
              to="/ebooks" 
              className={`block px-4 py-3 text-md font-medium ${
                isActive('/ebooks') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-tablet-alt mr-2"></i>E-Books
            </Link>
            <Link 
              to="/mis-libros" 
              className={`block px-4 py-3 text-md font-medium ${
                isActive('/mis-libros') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-book-bookmark mr-2"></i>Mis Libros
            </Link>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-20 flex-grow">
        {title && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          </div>
        )}
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p>&copy; {new Date().getFullYear()} Banco de Libros. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
