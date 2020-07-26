import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import isAuthorized from './isAuthorized';
import StoryList from './views/Story/list';
import StoryCreate from './views/Story/create';
import AppHeader from './components/AppHeader';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.user);

  return (
    <main className="bg-grey-lighter">
      {user.is_authenticated ? <AppHeader /> : null}
      <div className="p-4">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/story/list" component={isAuthorized(StoryList)} exact />
          <Route path="/story/create" component={isAuthorized(StoryCreate)} exact />
          <Route path='*' component={Login} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
