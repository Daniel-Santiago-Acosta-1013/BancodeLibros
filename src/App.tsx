import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { UIProvider } from './context/UIContext';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CatalogPage from './pages/CatalogPage';
import MyBooksPage from './pages/MyBooksPage';
import EbooksPage from './pages/EbooksPage';
import ProfilePage from './pages/ProfilePage';
import BookDetailPage from './pages/BookDetailPage';

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// App Provider to wrap the context providers
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <BookProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </BookProvider>
    </AuthProvider>
  );
};

// Main App Component
function AppWithProviders() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/catalogo" 
        element={
          <ProtectedRoute>
            <CatalogPage />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/mis-libros" 
        element={
          <ProtectedRoute>
            <MyBooksPage />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/ebooks" 
        element={
          <ProtectedRoute>
            <EbooksPage />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/libro/:id" 
        element={
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        }
      />
      
      {/* Redirect any other route to dashboard if logged in, or login if not */}
      <Route 
        path="*" 
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

// Main App export with providers
export default function App() {
  return (
    <AppProviders>
      <AppWithProviders />
    </AppProviders>
  );
}
