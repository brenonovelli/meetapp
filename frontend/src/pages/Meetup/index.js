import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEdit, MdDeleteForever, MdToday, MdMyLocation } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Button, MeetupContent } from './styles';

export default function Meetup({ match }) {
  const [meetup, setMeetup] = useState();
  const [loading, setLoading] = useState(false);
  const idMeetup = match.params.id;

  useEffect(() => {
    (async function loadMeetup() {
      setLoading(true);
      try {
        const response = await api.get(`meetups/${idMeetup}`);

        const dateMeetup = parseISO(response.data.meetup.date);

        const formattedDate = format(dateMeetup, "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        });

        setMeetup({ formattedDate, ...response.data.meetup });
      } catch (err) {
        toast.error(`Não conseguimos carregar seus meetups. Tente novamente.`);
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

                <Button type="button" onClick={() => handleDeleteMeetup()}>
                  <MdDeleteForever size={20} />
                  Cancelar
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
