import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Meetup from '~/pages/Meetup';
import MeetupHandle from '~/pages/MeetupHandle';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/meetups/details/:id" component={Meetup} isPrivate />
      <Route path="/meetups/add/" component={MeetupHandle} isPrivate />
      <Route path="/meetups/edit/:id" component={MeetupHandle} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/" component={() => <h1>Erro 404</h1>} />
    </Switch>
  );
}
