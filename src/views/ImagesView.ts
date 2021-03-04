import Image from '../app/models/Images';

export default {
  render(image: Image) {
    return image.url;
  },
};
