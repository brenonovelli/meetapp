import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  MeetupList,
  Meetup,
  Pagination,
  PreviousButton,
  NextButton,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePagination = useCallback(async () => {
    const response = await api.get(`organization?page=${page + 1}`);

    if (response.data.length > 0) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
  }, [page]);

  useEffect(() => {
    (async function loadMeetups() {
      setLoading(true);
      try {
        const response = await api.get(`organization?page=${page}`);

        const data = response.data.map(meetup => {
          const dateMeetup = parseISO(meetup.date);
          const formattedDate = format(
            dateMeetup,
            "dd 'de' MMMM', às' H:mm'h'",
            {
              locale: pt,
            }
          );
          return {
            formattedDate,
            ...meetup,
          };
        });

        setMeetups(data);
      } catch (err) {
        toast.error(`Não conseguimos carregar seus meetups. Tente novamente.`);
      }
      handlePagination();
      setLoading(false);
    })();
  }, [handlePagination, page]);

  function handlePreviousPage() {
    setPage(page - 1);
  }
  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <aside>
          <nav>
            <Link to="/meetups/add/">
              <MdAddCircleOutline size={20} />
              Novo Meetup
            </Link>
          </nav>
        </aside>
      </header>
      {loading ? (
        <strong>Carregando</strong>
      ) : (
        <>
          {meetups.length > 0 ? (
            <>
              <MeetupList>
                {meetups.map(meetup => (
                  <Meetup key={meetup.id}>
                    <Link to={`/meetups/details/${meetup.id}`}>
                      <strong>{meetup.title}</strong>
                      <time>{meetup.formattedDate}</time>
                      <MdChevronRight size={20} />
                    </Link>
                  </Meetup>
                ))}
              </MeetupList>
              {(hasNextPage || page > 1) && (
                <Pagination>
                  {page > 1 && (
                    <PreviousButton>
                      <button type="button" onClick={handlePreviousPage}>
                        Página anterior
                      </button>
                    </PreviousButton>
                  )}
                  <strong>Página {page}</strong>
                  {hasNextPage && (
                    <NextButton>
                      <button type="button" onClick={handleNextPage}>
                        Próxima página
                      </button>
                    </NextButton>
                  )}
                </Pagination>
              )}
            </>
          ) : (
            <p>Você ainda não tem meetups. Crie um agora.</p>
          )}
        </>
      )}
    </Container>
  );
}
