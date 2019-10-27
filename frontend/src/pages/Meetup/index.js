import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEdit, MdDeleteForever, MdToday, MdMyLocation } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  Button,
  MeetupContent,
  SubscribersList,
  SubscribersListTitle,
} from './styles';

export default function Meetup({ match }) {
  const [meetup, setMeetup] = useState();
  const [subscribers, setSubscribers] = useState();
  const [loading, setLoading] = useState(false);
  const idMeetup = match.params.id;

  useEffect(() => {
    (async function loadMeetup() {
      setLoading(true);
      try {
        const meetupsResponse = await api.get(`meetups/${idMeetup}`);
        const subscribersResponse = await api.get(`subscribers/${idMeetup}`);
        setSubscribers(subscribersResponse.data);

        const dateMeetup = parseISO(meetupsResponse.data.meetup.date);

        const formattedDate = format(dateMeetup, "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        });

        setMeetup({ formattedDate, ...meetupsResponse.data.meetup });
      } catch (err) {
        history.push('/dasboard');
        toast.error(`Não foi possível carregar o meetup. Tente novamente.`);
      }
      setLoading(false);
    })();
  }, [idMeetup]);

  async function handleDeleteMeetup() {
    try {
      await api.delete(`meetups/${idMeetup}`);

      toast.success('Meetup deletado com com sucesso!');

      history.push('/dasboard');
    } catch (err) {
      toast.error('Erro ao deletar meetup. Tente novamente.');
    }
  }

  return (
    <Container>
      <header>
        <nav>
          <Link to="/dashboard">{'<'} voltar para o dashboard</Link>
        </nav>
      </header>
      {loading && <strong>Carregando...</strong>}
      {meetup && (
        <MeetupContent>
          <header>
            <h1>{meetup.title}</h1>
            <aside>
              <nav>
                <Link to={`/meetups/edit/${idMeetup}`}>
                  <MdEdit size={20} />
                  Editar
                </Link>

                <Button
                  type="button"
                  disabled={meetup.past}
                  onClick={() => handleDeleteMeetup()}
                >
                  <MdDeleteForever size={20} />
                  {meetup.past ? 'Evento passado' : 'Cancelar'}
                </Button>
              </nav>
            </aside>
          </header>
          {meetup.cover ? (
            <img src={meetup.cover.url} alt={meetup.title} />
          ) : (
            'Imagem não encontrada.'
          )}
          <div>
            <p>{meetup.description}</p>
          </div>
          <footer>
            <time>
              <MdToday size={18} />
              {meetup.formattedDate}
            </time>
            <address>
              <MdMyLocation size={18} />
              {meetup.local}
            </address>
          </footer>
          {subscribers.length > 0 ? (
            <SubscribersList>
              <SubscribersListTitle length={subscribers.length}>
                Inscritos
              </SubscribersListTitle>
              <ul>
                {subscribers.map(subscriber => (
                  <li key={subscriber.id}>{subscriber.User.name}</li>
                ))}
              </ul>
            </SubscribersList>
          ) : null}
        </MeetupContent>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
