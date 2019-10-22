import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import api from '~/services/api';
import {
  registrationRequest,
  deleteRegistrationRequest,
} from '~/store/modules/registration/actions';
import {
  Container,
  Nav,
  SelectedDate,
  ButtonHandleDate,
  MeetupList,
  NoMeetups,
  NoMeetupsTxt,
} from './styles';

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [hasResponse, setHasReponse] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const userId = useSelector(state => state.user.profile.id);
  const registrations = useSelector(state => state.registrations.registrations);
  const dispatch = useDispatch();

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const meetupsWithRegistered = useMemo(
    () =>
      meetups.map(item =>
        registrations.findIndex(
          registration => registration.meetup_id === item.id
        ) >= 0
          ? { registered: true, ...item }
          : { registered: false, ...item }
      ),
    [meetups, registrations]
  );

  async function initalLoadMeetups(initialDate) {
    setRefreshing(true);
    setLastPage(true);
    setPage(1);

    const response = await api.get('meetups', {
      params: { date: initialDate },
    });

    setMeetups(response.data);

    setHasReponse(Object.keys(response.data).length > 0);
    setLastPage(Object.keys(response.data).length < 2);

    setRefreshing(false);
  }

  useEffect(() => {
    initalLoadMeetups(date);
  }, [date]);

  function handlePrevDay() {
    // console.tron.log('chamou prev day');
    setRefreshing(true);
    setLastPage(true);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    // console.tron.log('chamou next day');
    setRefreshing(true);
    setDate(addDays(date, 1));
  }

  async function nextPage() {
    // console.tron.log('chamou next page');
    if (!lastPage && !refreshing) {
      // console.tron.log('chamou next page depois do if');
      setRefreshing(true);

      const response = await api.get('meetups', {
        params: { date, page: page + 1 },
      });

      const responseLenght = Object.keys(response.data).length;

      if (responseLenght === 0) {
        setLastPage(true);
      } else {
        setPage(page + 1);
        setMeetups([...meetups, ...response.data]);
      }

      setRefreshing(false);
    }
  }

  function refreshList() {
    // console.tron.log('chamou refresh');
    setRefreshing(true);
    initalLoadMeetups(date);
  }

  async function handleRegistration(meetupId) {
    dispatch(registrationRequest(meetupId));
  }

  async function handleCancel(meetupId) {
    const registrationFiltered = registrations.filter(
      registration => registration.meetup_id === meetupId
    );
    const registrationId = registrationFiltered[0].id;

    dispatch(deleteRegistrationRequest(registrationId));
  }

  return (
    <Background>
      <Header />
      <Container>
        <Nav>
          <ButtonHandleDate onPress={handlePrevDay}>
            <Icon name="chevron-left" size={36} color="#fff" />
          </ButtonHandleDate>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <ButtonHandleDate onPress={handleNextDay}>
            <Icon name="chevron-right" size={36} color="#fff" />
          </ButtonHandleDate>
        </Nav>
        {hasResponse ? (
          <MeetupList
            onEndReachedThreshold={0}
            onEndReached={nextPage}
            onRefresh={refreshList}
            refreshing={refreshing}
            data={meetupsWithRegistered}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onRegistration={() => handleRegistration(item.id)}
                onCancel={() => handleCancel(item.id)}
                data={item}
                owner={userId === item.user_id}
                registered={item.registered}
                past={item.past}
              />
            )}
          />
        ) : (
          <NoMeetups>
            <Icon name="code-brackets" size={200} color="#f94d6a" />
            <NoMeetupsTxt>
              Ainda não há meetup criado para este dia.
            </NoMeetupsTxt>
          </NoMeetups>
        )}
        {refreshing && <ActivityIndicator color="#fff" />}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};
