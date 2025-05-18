import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { BookContext } from '../context/BookContext';
import { AuthContext } from '../context/AuthContext';
import { UIContext } from '../context/UIContext';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById } = useContext(BookContext);
  const { showToast } = useContext(UIContext);
  const { borrowBook, returnBook, reserveBook, cancelReservation, userBorrowedBooks, userReservedBooks } = useContext(AuthContext);
  
  const bookId = parseInt(id || '0');
  const book = getBookById(bookId);
  
  const isBorrowed = userBorrowedBooks.includes(bookId);
  const isReserved = userReservedBooks.includes(bookId);
  
  useEffect(() => {
    if (!book) {
      showToast('El libro no fue encontrado', 'error');
      navigate('/catalogo');
    }
  }, [book, navigate, showToast]);
  
  if (!book) return null;
  
  // Handle book actions
  const handleBorrow = () => {
    borrowBook(book.id);
    showToast(`Has tomado prestado "${book.title}"`, 'success');
  };
  
  const handleReturn = () => {
    returnBook(book.id);
    showToast(`Has devuelto "${book.title}"`, 'success');
  };
  
  const handleReserve = () => {
    reserveBook(book.id);
    showToast(`Has reservado "${book.title}"`, 'success');
  };
  
  const handleCancelReservation = () => {
    cancelReservation(book.id);
    showToast(`Has cancelado la reserva de "${book.title}"`, 'warning');
  };
  
  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Book cover (left side) */}
          <div className="w-full md:w-1/3 bg-gray-50 p-8 flex items-center justify-center">
            <img 
              src={book.cover} 
              alt={book.title} 
              className="w-auto max-h-96 object-contain rounded-lg shadow-md"
            />
          </div>
          
          {/* Book details (right side) */}
          <div className="w-full md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{book.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                ${book.type === 'physical' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                {book.type === 'physical' ? 'Libro Físico' : 'E-Book'}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {book.category}
              </span>
              {book.type === 'physical' && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {book.available ? 'Disponible' : 'No Disponible'}
                </span>
              )}
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-medium">{book.isbn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoría</p>
                  <p className="font-medium">{book.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium">{book.type === 'physical' ? 'Físico' : 'Digital'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <p className="font-medium">{book.available ? 'Disponible' : 'No Disponible'}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {book.type === 'physical' && (
                <>
                  {!isBorrowed && book.available && (
                    <button 
                      onClick={handleBorrow}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                    >
                      <i className="fas fa-hand-holding mr-1"></i> Tomar Prestado
                    </button>
                  )}
                  
                  {isBorrowed && (
                    <button 
                      onClick={handleReturn}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                      <i className="fas fa-undo mr-1"></i> Devolver Libro
                    </button>
                  )}
                  
                  {!isReserved && !isBorrowed && book.available && (
                    <button 
                      onClick={handleReserve}
                      className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-medium transition-colors"
                    >
                      <i className="fas fa-bookmark mr-1"></i> Reservar
                    </button>
                  )}
                  
                  {isReserved && (
                    <button 
                      onClick={handleCancelReservation}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                    >
                      <i className="fas fa-times mr-1"></i> Cancelar Reserva
                    </button>
                  )}
                </>
              )}
              
              {book.type === 'ebook' && (
                <button 
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                >
                  <i className="fas fa-download mr-1"></i> Descargar E-Book
                </button>
              )}
              
              <button 
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition-colors"
              >
                <i className="fas fa-arrow-left mr-1"></i> Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetailPage;
