import React, { useState } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {
  Container,
  Cover,
  Info,
  Title,
  TitleText,
  Details,
  DetailIntro,
  DetailIntroText,
  Detail,
  DetailText,
  ButtonRegistration,
} from './styles';

export default function Meetup({
  data,
  onRegistration,
  onCancel,
  owner,
  registered,
  past,
}) {
  const [opened, setOpened] = useState(false);

  const { date, title, description, cover, local, User } = data;

  const dateParsed = format(parseISO(date), "dd 'de' MMMM', às' H:mm'h'", {
    locale: pt,
  });

  return (
    <Container>
      <Cover resizeMode="cover" source={{ uri: cover.url }} />
      <Info>
        <Title onPress={() => setOpened(!opened)}>
          <TitleText>{title}</TitleText>
        </Title>
        <Details>
          <DetailIntro opened={opened}>
            <DetailIntroText>{description}</DetailIntroText>
          </DetailIntro>
          <Detail>
            <Icon name="calendar" size={16} color="#999" />
            <DetailText>{dateParsed}</DetailText>
          </Detail>
          <Detail>
            <Icon name="map-marker" size={16} color="#999" />
            <DetailText>{local}</DetailText>
          </Detail>
          <Detail>
            <Icon name="account" size={16} color="#999" />
            <DetailText>{User.name}</DetailText>
          </Detail>
        </Details>
        {registered && (
          <ButtonRegistration registered onPress={onCancel}>
            Cancelar inscrição
          </ButtonRegistration>
        )}
        {owner && (
          <ButtonRegistration registered onPress={() => {}} disabled>
            Esse meetup é seu.
          </ButtonRegistration>
        )}
        {past && (
          <ButtonRegistration registered onPress={() => {}} disabled>
            Esse meetup já aconteceu.
          </ButtonRegistration>
        )}
        {!owner && !registered && !past && (
          <ButtonRegistration registered={registered} onPress={onRegistration}>
            Realizar inscrição
          </ButtonRegistration>
        )}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    local: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onRegistration: PropTypes.func,
  onCancel: PropTypes.func,
  owner: PropTypes.bool,
  registered: PropTypes.bool,
  past: PropTypes.bool,
};

Meetup.defaultProps = {
  onRegistration: null,
  onCancel: null,
  owner: false,
  registered: false,
  past: false,
};
