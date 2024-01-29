import { mount } from 'authModule/AuthApp';
import React from 'react';
import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate = () => {} } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        console.log('nextPathname', nextPathname);
        console.log('pathname', pathname);
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });
    if (onParentNavigate && typeof onParentNavigate == 'function') {
      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref}></div>;
};
