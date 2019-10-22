import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import { Container } from './styles';

export default function MeetupAdd({ match }) {
  const idMeetup = match.params.id;

  return (
    <Container>
      <header>
        <nav>
          {idMeetup ? (
            <Link to={`/meetups/details/${idMeetup}`}>
              {'<'} voltar para o meetup
            </Link>
          ) : (
            <Link to="/dashboard/">{'<'} voltar para o dahboard</Link>
          )}
        </nav>
      </header>

      {idMeetup ? <FormEdit idMeetup={idMeetup} /> : <FormAdd />}
    </Container>
  );
}

MeetupAdd.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

MeetupAdd.defaultProps = {
  match: null,
};
