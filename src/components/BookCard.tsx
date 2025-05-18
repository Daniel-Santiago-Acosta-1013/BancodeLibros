import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types/book';
import { UIContext } from '../context/UIContext';
import { AuthContext } from '../context/AuthContext';

interface BookCardProps {
  book: Book;
  showActions?: boolean;
}

const BookCard = ({ book, showActions = true }: BookCardProps) => {
  const { openModal } = useContext(UIContext);
  const { userBorrowedBooks, userReservedBooks, borrowBook, reserveBook } = useContext(AuthContext);
  
  const isBorrowed = userBorrowedBooks.includes(book.id);
  const isReserved = userReservedBooks.includes(book.id);
  
  // Handle quick borrow or reserve actions
  const handleBorrow = (e: React.MouseEvent) => {
    e.preventDefault();
    borrowBook(book.id);
  };
  
  const handleReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    reserveBook(book.id);
  };
  
  // Handle click to open modal
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(book.id);
  };
  
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Book type badge */}
      <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full 
        ${book.type === 'physical' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
        {book.type === 'physical' ? 'Físico' : 'E-Book'}
      </div>
      
      {/* Book cover */}
      <Link 
        to={`/libro/${book.id}`} 
        className="block" 
        onClick={handleClick}
      >
        <img 
          src={book.cover} 
          alt={book.title} 
          className="w-full h-60 object-cover"
        />
      </Link>
      
      {/* Book info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate">
          <Link 
            to={`/libro/${book.id}`} 
            className="hover:text-blue-600"
            onClick={handleClick}
          >
            {book.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <p className="text-xs text-gray-500 mb-3">{book.category}</p>
        
        {/* Availability badge */}
        {book.type === 'physical' && (
          <div className={`inline-block px-2 py-1 rounded-md text-xs font-semibold 
            ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {book.available ? 'Disponible' : 'No Disponible'}
          </div>
        )}
        
        {/* Action buttons */}
        {showActions && (
          <div className="mt-3 flex flex-col gap-2">
            <button 
              className="w-full py-2 px-3 text-sm font-semibold rounded-md border transition-colors
                btn-primary"
              onClick={handleClick}
            >
              <i className="fas fa-eye mr-1"></i> Ver Detalles
            </button>
            
            {book.type === 'physical' && book.available && (
              <>
                {!isBorrowed && (
                  <button 
                    className="w-full py-2 px-3 text-sm font-semibold rounded-md border border-green-500 
                      bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                    onClick={handleBorrow}
                  >
                    <i className="fas fa-hand-holding mr-1"></i> Tomar Prestado
                  </button>
                )}
                
                {!isReserved && !isBorrowed && (
                  <button 
                    className="w-full py-2 px-3 text-sm font-semibold rounded-md border border-yellow-500 
                      bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                    onClick={handleReserve}
                  >
                    <i className="fas fa-bookmark mr-1"></i> Reservar
                  </button>
                )}
              </>
            )}
            
            {book.type === 'ebook' && (
              <button 
                className="w-full py-2 px-3 text-sm font-semibold rounded-md border border-purple-500 
                  bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <i className="fas fa-download mr-1"></i> Descargar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
