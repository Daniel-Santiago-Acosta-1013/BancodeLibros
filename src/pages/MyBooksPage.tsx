import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import { AuthContext } from '../context/AuthContext';
import { BookContext } from '../context/BookContext';
import BookDetailsModal from '../components/BookDetailsModal';
import { UIContext } from '../context/UIContext';

const MyBooksPage = () => {
  const { userBorrowedBooks, userReservedBooks } = useContext(AuthContext);
  const { getUserBorrowedBooks, getUserReservedBooks } = useContext(BookContext);
  const { isModalOpen, currentBookId } = useContext(UIContext);
  
  const [activeTab, setActiveTab] = useState<'borrowed' | 'reserved'>('borrowed');
  
  const borrowedBooks = getUserBorrowedBooks(userBorrowedBooks);
  const reservedBooks = getUserReservedBooks(userReservedBooks);
  
  return (
    <Layout title="Mis Libros">
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('borrowed')}
              className={`py-4 px-6 text-center text-md font-medium ${
                activeTab === 'borrowed'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="fas fa-book mr-2"></i>
              Préstamos
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {borrowedBooks.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('reserved')}
              className={`py-4 px-6 text-center text-md font-medium ${
                activeTab === 'reserved'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="fas fa-bookmark mr-2"></i>
              Reservas
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {reservedBooks.length}
              </span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Borrowed books section */}
      {activeTab === 'borrowed' && (
        <>
          {borrowedBooks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <i className="fas fa-book text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes libros prestados</h3>
              <p className="text-gray-600 mb-4">
                Explora nuestro catálogo y toma prestado algún libro que te interese.
              </p>
              <a 
                href="/catalogo" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-search mr-2"></i>Explorar Catálogo
              </a>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Libros que tienes prestados</h2>
                <p className="text-sm text-gray-600">Total: {borrowedBooks.length}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {borrowedBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Reserved books section */}
      {activeTab === 'reserved' && (
        <>
          {reservedBooks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <i className="fas fa-bookmark text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes reservas activas</h3>
              <p className="text-gray-600 mb-4">
                Puedes reservar libros que estén próximamente disponibles para asegurarlos.
              </p>
              <a 
                href="/catalogo" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-search mr-2"></i>Explorar Catálogo
              </a>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Libros que tienes reservados</h2>
                <p className="text-sm text-gray-600">Total: {reservedBooks.length}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {reservedBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Book Details Modal */}
      {isModalOpen && currentBookId && <BookDetailsModal bookId={currentBookId} />}
    </Layout>
  );
};

export default MyBooksPage;
