import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import route from 'ziggy-js';
import { Ziggy } from '@/ziggy';

// @ts-ignore
createServer((page) =>
  // @ts-ignore
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
      return pages[`./Pages/${name}.tsx`];
    },
    setup: ({ App, props }) => {
      // @ts-ignore
      global.route = (name, params, absolute, config = Ziggy) =>
        // @ts-ignore
        route(name, params, absolute, config);
      return <App {...props} />;
    },
  }),
);
