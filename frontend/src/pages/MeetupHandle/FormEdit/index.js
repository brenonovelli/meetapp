import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { MdAddCircleOutline } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import CoverInput from '../CoverInput';
import DatePicker from '../DatePicker';

import { Button } from '../styles';

const schema = Yup.object().shape({
  banner: Yup.number().required('O banner é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string()
    .max(255, 'Descrições não podem ter mais de 255 caracteres.')
    .required('A descrição é obrigatória'),
  date: Yup.date()
    .required('A data é obrigatória')
    .min(new Date(), 'Meetups só podem ser criados para datas futuras'),
  local: Yup.string().required('O local é obrigatório'),
});

export default function FormEdit({ idMeetup }) {
  const [meetup, setMeetup] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (idMeetup) {
      (async function loadMeetup() {
        setLoading(true);
        try {
          const response = await api.get(`meetups/${idMeetup}`);

          setMeetup({ ...response.data.meetup });
        } catch (err) {
          toast.error(
            `Não foi possível carregar o meetup selecionado. Tente novamente.`
          );
        }
        setLoading(false);
      })();
    }
  }, [idMeetup]);

  async function handleSubmit(e) {
    try {
      const meetupUpdated = { id: meetup.id, ...e };

      await api.put('meetups/', meetupUpdated);

      toast.success('Meetup alterado com sucesso!');
      history.push(`/meetups/details/${meetup.id}`);
    } catch (err) {
      toast.error('Erro ao atualizar o meetup. Tente novamente.');
    }
  }

  return (
    <>
      {loading && <strong>Carregando...</strong>}
      {meetup && (
        <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
          <CoverInput name="banner" bannerId={meetup.banner} />

          <Input name="title" placeholder="Título do meetup" type="text" />

          <Input
            name="description"
            placeholder="Descrição completa"
            type="text"
            multiline
          />

          <DatePicker name="date" />

          <Input name="local" placeholder="Localização" type="text" />

          <Button type="submit">
            <MdAddCircleOutline size={20} />
            Atualizar meetup
          </Button>
        </Form>
      )}
    </>
  );
}

FormEdit.propTypes = {
  idMeetup: PropTypes.string.isRequired,
};
