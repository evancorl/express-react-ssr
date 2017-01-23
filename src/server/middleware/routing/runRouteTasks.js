import Promise from 'bluebird';
import { matchRoutesToLocation } from 'react-router-addons-routes';

import routeConfig from './config';

const runRouteTasks = ({ originalUrl, query }) => {
  const location = { pathname: originalUrl };
  const { matchedRoutes, params } = matchRoutesToLocation(routeConfig, location);

  const routesWithTasks = matchedRoutes
    .filter(route => route.tasks && route.tasks.length);

  const routeData = {};
  const runningTasks = [];

  routesWithTasks.forEach(({ pattern, tasks }) => {
    routeData[pattern] = { params, query };

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

  return Promise.all(runningTasks).then(() => routeData);
};

export default runRouteTasks;
