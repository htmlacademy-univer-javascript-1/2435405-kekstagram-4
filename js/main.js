import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {initEditPopup} from './form.js';

renderThumbnails(getPhotos());
initEditPopup();
