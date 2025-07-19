import { useAuth0 } from '@auth0/auth0-react'; // useAuth0 hook
import './App.css'; // Varsayılan stil dosyası

function App() {
  const { 
    loginWithRedirect, 
    logout, 
    isAuthenticated, 
    user, 
    isLoading,
    error // Hata durumlarını yakalamak için
  } = useAuth0();

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  if (error) {
    return <div>Authentication Error: {error.message}</div>;
  }

  return (
    <>
      <nav>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
        )}
      </nav>

      <main>
        {isAuthenticated ? (
          <div>
            <h2>Welcome, {user?.name || user?.email}!</h2>
            <p>You are logged in.</p>
            {/* İsteğe bağlı: Kullanıcı bilgilerini göster */}
            {user && (
              <pre>{JSON.stringify(user, null, 2)}</pre>
            )}
            {/* Burada API çağrıları için bir component ekleyebiliriz */}
          </div>
        ) : (
          <h2>Please log in to continue.</h2>
        )}
      </main>
    </>
  );
}

export default App;