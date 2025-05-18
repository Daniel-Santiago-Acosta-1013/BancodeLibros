import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import { UIContext } from '../context/UIContext';
import BookDetailsModal from '../components/BookDetailsModal';

const ProfilePage = () => {
  const { currentUser, notifications, markNotificationAsRead, userBorrowedBooks, userReservedBooks } = useContext(AuthContext);
  const { getUserBorrowedBooks, getUserReservedBooks } = useContext(BookContext);
  const { isModalOpen, currentBookId } = useContext(UIContext);
  
  const [activeTab, setActiveTab] = useState<'info' | 'activity'>('info');
  
  const borrowedBooks = getUserBorrowedBooks(userBorrowedBooks);
  const reservedBooks = getUserReservedBooks(userReservedBooks);
  
  // Mark notification as read when user clicks on it
  const handleNotificationClick = (id: number) => {
    markNotificationAsRead(id);
  };
  
  if (!currentUser) return null;
  
  return (
    <Layout title="Mi Perfil">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left sidebar with user info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <img 
              src={currentUser.avatar || "https://placehold.co/150x150/4B5563/FFFFFF?text=U"} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200 object-cover"
            />
            <h2 className="text-xl font-bold mt-4 text-gray-800">{currentUser.fullName}</h2>
            <p className="text-gray-600 mb-4">@{currentUser.username}</p>
            
            <div className="border-t border-gray-100 pt-4 mt-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Departamento:</span>
                <span className="font-medium text-gray-800">{currentUser.department}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Miembro desde:</span>
                <span className="font-medium text-gray-800">{currentUser.memberSince}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium text-gray-800">{currentUser.email}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href="mailto:support@bookbank.com" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-envelope mr-1"></i> Contactar Soporte
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md mt-6 overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h3 className="font-semibold">Actividad de Libros</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Préstamos Activos</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {borrowedBooks.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Reservas</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {reservedBooks.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Historial Total</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {borrowedBooks.length + 12}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`py-4 px-6 text-center text-md font-medium ${
                    activeTab === 'info'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="fas fa-user mr-2"></i>
                  Información Personal
                </button>
                
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-6 text-center text-md font-medium ${
                    activeTab === 'activity'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="fas fa-history mr-2"></i>
                  Actividad Reciente
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Personal Info Tab */}
              {activeTab === 'info' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalles de la Cuenta</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input 
                          type="text" 
                          value={currentUser.fullName} 
                          readOnly
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
                        <input 
                          type="text" 
                          value={currentUser.username} 
                          readOnly
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          value={currentUser.email} 
                          readOnly
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                        <input 
                          type="text" 
                          value={currentUser.department} 
                          readOnly
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Preferencias</h3>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input 
                          id="notification-email" 
                          type="checkbox" 
                          checked={true}
                          readOnly
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                        />
                        <label htmlFor="notification-email" className="ml-2 text-sm font-medium text-gray-700">
                          Recibir notificaciones por email
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          id="notification-reminder" 
                          type="checkbox" 
                          checked={true}
                          readOnly
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                        />
                        <label htmlFor="notification-reminder" className="ml-2 text-sm font-medium text-gray-700">
                          Recordatorios de devolución
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          id="notification-news" 
                          type="checkbox" 
                          checked={false}
                          readOnly
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                        />
                        <label htmlFor="notification-news" className="ml-2 text-sm font-medium text-gray-700">
                          Recibir boletín de nuevas adquisiciones
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Seguridad</h3>
                    
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50" disabled>
                      <i className="fas fa-lock mr-2"></i>Cambiar Contraseña
                    </button>
                  </div>
                </div>
              )}
              
              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
                  
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <i className="fas fa-bell text-4xl text-gray-300 mb-2"></i>
                      <p className="text-gray-500">No hay notificaciones recientes.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            notification.read 
                              ? 'bg-white border-gray-200' 
                              : 'bg-blue-50 border-blue-200'
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex items-center justify-between">
                            <p className={`${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tus Libros Actuales</h3>
                  
                  {borrowedBooks.length === 0 && reservedBooks.length === 0 ? (
                    <div className="text-center py-8">
                      <i className="fas fa-book text-4xl text-gray-300 mb-2"></i>
                      <p className="text-gray-500">No tienes libros prestados o reservados actualmente.</p>
                      <a 
                        href="/catalogo" 
                        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <i className="fas fa-search mr-2"></i>Explorar Catálogo
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {borrowedBooks.slice(0, 2).map(book => (
                        <BookCard key={book.id} book={book} />
                      ))}
                      {reservedBooks.slice(0, 2).map(book => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  )}
                  
                  {(borrowedBooks.length > 0 || reservedBooks.length > 0) && (
                    <div className="mt-4 text-center">
                      <a 
                        href="/mis-libros" 
                        className="inline-block px-4 py-2 text-blue-600 hover:text-blue-800"
                      >
                        Ver todos mis libros <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Details Modal */}
      {isModalOpen && currentBookId && <BookDetailsModal bookId={currentBookId} />}
    </Layout>
  );
};

export default ProfilePage;
