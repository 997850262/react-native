import AppWrapper from './myappjs/container/AppWrapper';
import Music from './myappjs/container/Music';
// import SearchMusic from './myappjs/container/SearchMusic';
// import UploadMusic from './myappjs/container/UploadMusic';
import {
  createStackNavigator,
} from 'react-navigation';

// const routeConfig = {
//   path: '/',
//   component: AppWrapper,
//   indexRoute: { component: Music },
//   childRoutes: [
//     { path: 'music', component: Music },
//     // { path: 'searchmusic', component: SearchMusic },
//     // { path: 'uploadmusic', component: UploadMusic }
//   ]
// };
const routeConfig = createStackNavigator({

  AppWrapper: { screen: AppWrapper },
  Music: { path: 'music', screen: Music },
}, {
  initialRouteName: 'Music',
});

export default routeConfig;
