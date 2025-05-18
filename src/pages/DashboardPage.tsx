import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { BookContext } from '../context/BookContext';

const DashboardPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { getPhysicalBooks, getEbooks } = useContext(BookContext);
  
  const physicalBooks = getPhysicalBooks();
  const ebooks = getEbooks();
  
  return (
    <Layout title={`Bienvenido, ${currentUser?.fullName.split(' ')[0] || 'Usuario'}`}>
      <div className="dashboard">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <i className="fas fa-book text-2xl text-blue-500"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Libros Físicos</h3>
                <p className="text-xl font-bold text-gray-900">{physicalBooks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <i className="fas fa-tablet-alt text-2xl text-purple-500"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">E-Books</h3>
                <p className="text-xl font-bold text-gray-900">{ebooks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <i className="fas fa-users text-2xl text-green-500"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Departamentos</h3>
                <p className="text-xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <i className="fas fa-bookmark text-2xl text-yellow-500"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Categorías</h3>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/catalogo" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-search text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Catálogo de Libros</h3>
              <p className="text-gray-600 mb-4">
                Explore nuestra colección de libros físicos disponibles para préstamo.
              </p>
              <span className="btn-primary py-2 px-4 inline-flex items-center">
                <i className="fas fa-arrow-right mr-2"></i>
                Explorar Catálogo
              </span>
            </div>
          </Link>
          
          <Link 
            to="/ebooks" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tablet-alt text-4xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">E-Books</h3>
              <p className="text-gray-600 mb-4">
                Acceda a nuestra biblioteca digital para descarga inmediata.
              </p>
              <span className="btn-primary py-2 px-4 inline-flex items-center">
                <i className="fas fa-arrow-right mr-2"></i>
                Ver Biblioteca Digital
              </span>
            </div>
          </Link>
          
          <Link 
            to="/mis-libros" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-book-bookmark text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mis Libros</h3>
              <p className="text-gray-600 mb-4">
                Gestione sus préstamos, reservas y descargas en un solo lugar.
              </p>
              <span className="btn-primary py-2 px-4 inline-flex items-center">
                <i className="fas fa-arrow-right mr-2"></i>
                Gestionar Mis Libros
              </span>
            </div>
          </Link>
        </div>
        
        {/* Feature Highlights Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destacados del Sistema</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="text-blue-500 mr-4">
                <i className="fas fa-clock text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Préstamos Rápidos</h3>
                <p className="text-gray-600">
                  Solicite libros y recíbalos en su departamento en menos de 24 horas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="text-green-500 mr-4">
                <i className="fas fa-mobile-alt text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Acceso Digital</h3>
                <p className="text-gray-600">
                  Acceda a nuestra colección digital desde cualquier dispositivo, en cualquier momento.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="text-purple-500 mr-4">
                <i className="fas fa-bell text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Notificaciones</h3>
                <p className="text-gray-600">
                  Reciba recordatorios sobre fechas de devolución y disponibilidad de títulos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="text-yellow-500 mr-4">
                <i className="fas fa-star text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Recomendaciones</h3>
                <p className="text-gray-600">
                  Descubra nuevos títulos basados en sus intereses y préstamos anteriores.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="text-red-500 mr-4">
                <i className="fas fa-search text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Búsqueda Avanzada</h3>
                <p className="text-gray-600">
                  Encuentre exactamente lo que busca con nuestros filtros especializados.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="text-indigo-500 mr-4">
                <i className="fas fa-history text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Historial</h3>
                <p className="text-gray-600">
                  Vea su historial completo de préstamos y gestione sus interacciones pasadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
