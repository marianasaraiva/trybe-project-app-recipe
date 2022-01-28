import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../services/LocalStorage';

function Profile() {
  const history = useHistory();

  const clearAndRedirect = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <div data-testid="profile-email">
        { JSON.parse(getLocalStorage('user')).email }
      </div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearAndRedirect }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
