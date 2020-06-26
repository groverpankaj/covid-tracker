import Home from './Home';
import Country from './Country';
import World from './World';
import Compare from './Compare';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/world',
    component: World
  },
  {
    path: '/compare',
    component: Compare
  },
  {
    path: '/country/:id',
    component: Country,
    fetchInitialData : (path) =>  path.split('/').pop()
  },
  {
    path: '/country/',
    component: Country,
    fetchInitialData : (path) =>  'United States of America'
  }
]

export default routes;

