import React from 'react';
import PropTypes from 'prop-types';

function IgredientsAndValues(props) {
  const { detailsItem, typeFilter } = props;
  return (
    <div>
      {
        Object.entries(detailsItem)
          .filter((a) => a[0]
            .includes(typeFilter) && a[1] !== '' && a[1] !== null)
          .map((b, index) => (
            <p
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
