import Promise from 'bluebird';
import { matchRoutesToLocation } from 'react-router-addons-routes';

import routeTasks from './routeTasks';

const runRouteTasks = ({ originalUrl, query }) => {
  const location = { pathname: originalUrl };
  const { matchedRoutes, params } = matchRoutesToLocation(routeTasks, location);

  const routesWithTasks = matchedRoutes
    .filter(route => route.tasks && route.tasks.length);

  const routeData = {};
  const runningTasks = [];

  routesWithTasks.forEach(({ pattern, tasks }) => {
    routeData[pattern] = {};

    tasks.forEach((runTask) => {
      const runningTask = Promise.resolve(runTask(params, query)).then((taskData) => {
        routeData[pattern] = {
          ...routeData[pattern],
          ...taskData,
        };
      });

      runningTasks.push(runningTask);
    });
  });

  return Promise.all(runningTasks).then(() => ({ routeData, params, query }));
};

export default runRouteTasks;
