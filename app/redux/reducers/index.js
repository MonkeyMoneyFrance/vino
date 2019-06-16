import { combineReducers } from 'redux';
// import routes from './routes';
import user from './user';
import wines from './wines';
import wine from './wine';
import cellars from './cellars';
import cellar from './cellar';
// import medications from './medications';
// import treatPictures from './treatPictures'
// import notifications from './notifications'
export default combineReducers({
  // routes,
  wine,
  user,
  wines,
  cellars,
  cellar
  // medications,
  // treatPictures,
  // notifications
});
