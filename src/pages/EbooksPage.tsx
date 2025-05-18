import { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import { BookContext } from '../context/BookContext';
import BookDetailsModal from '../components/BookDetailsModal';
import { UIContext } from '../context/UIContext';

const EbooksPage = () => {
  const { getEbooks, searchBooks } = useContext(BookContext);
  const { isModalOpen, currentBookId } = useContext(UIContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(getEbooks());
  
  // Available categories
  const categories = ['Tecnología', 'Literatura', 'Ciencia', 'Todos'];
  
  // Update filtered books when search criteria change
  useEffect(() => {
    if (selectedCategory === 'Todos' || selectedCategory === '') {
      setFilteredBooks(searchBooks(searchQuery, '', 'ebook'));
    } else {
      setFilteredBooks(searchBooks(searchQuery, selectedCategory, 'ebook'));
    }
  }, [searchQuery, selectedCategory, searchBooks]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'Todos' ? '' : category);
  };
  
  return (
    <Layout title="Biblioteca Digital">
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">Biblioteca Digital</h2>
        <p className="text-purple-700">
          Acceda instantáneamente a nuestra colección de libros electrónicos desde cualquier dispositivo, 
          en cualquier momento y lugar. Todos los E-Books están disponibles para descarga inmediata.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por título, autor o tema..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
          </div>
          
          {/* Category filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  (category === 'Todos' && selectedCategory === '') || selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <p className="text-gray-600 mb-4">
        Se encontraron {filteredBooks.length} e-books
        {selectedCategory && selectedCategory !== 'Todos' ? ` en la categoría ${selectedCategory}` : ''}
        {searchQuery ? ` para "${searchQuery}"` : ''}
      </p>
      
      {/* Books grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <i className="fas fa-tablet-alt text-5xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron e-books</h3>
          <p className="text-gray-600">
            Intente con diferentes términos de búsqueda o categorías.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      
      {/* Book Details Modal */}
      {isModalOpen && currentBookId && <BookDetailsModal bookId={currentBookId} />}
    </Layout>
  );
};

export default EbooksPage;
