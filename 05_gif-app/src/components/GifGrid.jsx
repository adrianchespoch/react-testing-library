import PropTypes from 'prop-types';

import { GifItem } from './GifItem';
import { useFetch } from '../hooks/useFetch';

export const GifGrid = ({ category }) => {
  const { images, isLoading } = useFetch(category);

  return (
    <>
      <h3>{category}</h3>

      <div className="card-grid">
        {isLoading && <p>Loading...</p>}

        {!isLoading &&
          images.map(image => <GifItem key={image.id} {...image} />)}
      </div>
    </>
  );
};

GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
};
