import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {renderUploadForm} from './form.js';

renderThumbnails(getPhotos());
renderUploadForm();

