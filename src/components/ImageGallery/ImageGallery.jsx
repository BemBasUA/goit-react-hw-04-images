import './ImageGallery.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ data, onClick }) => {
  return (
    <ul className="ImageGallery">
      {data.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={onClick}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
