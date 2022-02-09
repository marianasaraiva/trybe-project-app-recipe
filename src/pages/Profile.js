import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../services/LocalStorage';
import './pages.css/Profile.css';

function Profile() {
  const history = useHistory();

  const clearAndRedirect = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <div className="Profile">
        <Header title="Profile" />
      </div>
      <div
        className="text-center font"
        data-testid="profile-email"
      >
        { getLocalStorage('user') && JSON.parse(getLocalStorage('user')).email }
      </div>
      <div className="grid">
        <button
          className="margin-btn "
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="margin-btn "
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="margin-btn "
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearAndRedirect }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
