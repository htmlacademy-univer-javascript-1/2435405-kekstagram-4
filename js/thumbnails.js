import {renderBigPicture} from './view-popup.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
let photos = null;

const onThumbnailsContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');

  if (targetElement) {
    const id = targetElement.dataset.pictureId;
    const [thumbnail] = photos.filter((photo) => photo.id === +id);
    renderBigPicture(thumbnail);
  }
};

const createThumbnail = (photo) => {
  const picture = template.cloneNode(true);
  picture.dataset.pictureId = photo.id;
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__img').alt = photo.description;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  return picture;
};

const renderThumbnails = (data) => {
  photos = data.slice();
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });
  picturesContainer.appendChild(fragment);
  picturesContainer.addEventListener('click', onThumbnailsContainerClick);
};

export {renderThumbnails};
