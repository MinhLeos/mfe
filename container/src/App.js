import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Progress from './components/Progress';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container',
});

const history = createBrowserHistory();

export default () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    const useLogin = getCookie('user');
    if (useLogin) {
      setIsSignIn(true);
    }
    setIsStart(false);
  }, []);

  function getCookie(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null; // Return null if the cookie is not found
  }

  const onSignIn = () => {
    document.cookie =
      'user=MinhLe; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/';
    setIsSignIn(true);
    history.push('/dashboard');
  };
  const onSignOut = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsSignIn(false);
  };
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignIn={isSignIn} onSignOut={onSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy isSignIn={isSignIn} onSignIn={onSignIn} />
              </Route>
              <Route path="/dashboard">
                {!isStart && !isSignIn && <Redirect to="/" />}
                <DashboardAppLazy />
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
