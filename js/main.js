import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';

const photos = getPhotos();

renderThumbnails(photos);
