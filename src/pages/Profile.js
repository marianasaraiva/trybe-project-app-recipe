import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ email }) {
  const history = useHistory();
  return (
    <div>
      <Header title="Profile" />
      <div data-testid="profile-email">{ email }</div>
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
        onClick={ () => history.push('/') }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Profile;
