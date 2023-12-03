import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';

const PhotosCount = 25;

const photos = getPhotos(PhotosCount);
renderThumbnails(photos);
