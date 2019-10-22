import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { deleteRegistrationRequest } from '~/store/modules/registration/actions';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, MeetupList, NoMeetups, NoMeetupsTxt } from './styles';

export default function Registrations() {
  const registrations = useSelector(state => state.registrations.registrations);
  const dispatch = useDispatch();

  async function handleCancel(meetupId) {
    dispatch(deleteRegistrationRequest(meetupId));
  }

  return (
    <Background>
      <Header />
      <Container>
        {registrations.length > 0 ? (
          <MeetupList
            data={registrations}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item.Meetup}
                registered
                onCancel={() => handleCancel(item.id)}
              />
            )}
          />
        ) : (
          <NoMeetups>
            <Icon name="code-brackets" size={200} color="#f94d6a" />
            <NoMeetupsTxt>
              Você ainda não se registrou em nenhum Meetup.
            </NoMeetupsTxt>
          </NoMeetups>
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="tag" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Registrations.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};
