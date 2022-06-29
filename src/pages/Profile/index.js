import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles.scss';

function Profile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('user');
    setUser(JSON.parse(email));
  }, []);

  const history = useHistory();

  const clearStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  console.log(user);

  return (
    <div id="profile-page">
      <Header title="Profile" search={ false } />

      <form>
        <div data-testid="profile-email">
          {user && user.email}
        </div>

        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ clearStorage }
        >
          Logout
        </button>

      </form>
      <Footer />
    </div>
  );
}

export default Profile;
