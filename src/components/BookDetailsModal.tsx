import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { UIContext } from '../context/UIContext';
import { AuthContext } from '../context/AuthContext';

interface BookDetailsModalProps {
  bookId: number;
}

const BookDetailsModal = ({ bookId }: BookDetailsModalProps) => {
  const { getBookById } = useContext(BookContext);
  const { closeModal, isModalOpen } = useContext(UIContext);
  const { borrowBook, returnBook, reserveBook, cancelReservation, userBorrowedBooks, userReservedBooks } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const book = getBookById(bookId);
  const isBorrowed = userBorrowedBooks.includes(bookId);
  const isReserved = userReservedBooks.includes(bookId);
  
  // Update the URL to reflect the book being viewed
  useEffect(() => {
    if (isModalOpen && book) {
      window.history.replaceState({}, '', `/libro/${book.id}`);
    }
    
    return () => {
      // Restore URL when modal closes (if we're not navigating)
      if (window.location.pathname.includes('/libro/')) {
        window.history.replaceState({}, '', window.location.pathname.split('/libro/')[0] || '/dashboard');
      }
    };
  }, [isModalOpen, book]);
  
  // Handle book actions
  const handleBorrow = () => {
    if (book) {
      borrowBook(book.id);
      closeModal();
    }
  };
  
  const handleReturn = () => {
    if (book) {
      returnBook(book.id);
      closeModal();
    }
  };
  
  const handleReserve = () => {
    if (book) {
      reserveBook(book.id);
      closeModal();
    }
  };
  
  const handleCancelReservation = () => {
    if (book) {
      cancelReservation(book.id);
      closeModal();
    }
  };
  
  // Handle modal backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  if (!book) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal active"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl">
        {/* Book cover (left side) */}
        <div className="w-full md:w-2/5 bg-gray-100 p-6 flex items-center justify-center">
          <img 
            src={book.cover} 
            alt={book.title} 
            className="max-h-[400px] object-contain rounded-lg shadow-md"
          />
        </div>
        
        {/* Book details (right side) */}
        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{book.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{book.author}</p>
            </div>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
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
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ISBN</p>
                <p className="font-medium">{book.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Categoría</p>
                <p className="font-medium">{book.category}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
            <p className="text-gray-600">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
