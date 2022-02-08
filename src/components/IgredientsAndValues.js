import React from 'react';
import PropTypes from 'prop-types';
import './components.css/IngredientAndValues.css';

function IgredientsAndValues(props) {
  const { detailsItem, typeFilter } = props;

  return (
    <div className="itens">
      {
        Object.entries(detailsItem)
          .filter((a) => a[0]
            .includes(typeFilter) && a[1] !== '' && a[1] !== null && a[1] !== ' ')
          .map((b, index) => (
            <p
              className="iten-text"
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {b[1]}
            </p>))
      }
    </div>
  );
}

IgredientsAndValues.propTypes = {
  detailsItem: PropTypes.object,
  typeFilter: PropTypes.string,
}.isRequired;

export default IgredientsAndValues;
