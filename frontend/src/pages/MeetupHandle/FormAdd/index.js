import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
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

export default function FormAdd() {
  async function handleSubmit(e) {
    try {
      const newMeetup = { ...e };
      const response = await api.post('meetups/', newMeetup);

      const { id } = response.data;

      toast.success('Meetup criado com sucesso!');
      history.push(`/meetups/details/${id}`);
    } catch (err) {
      toast.error('Erro ao criar o meetup. Tente novamente.');
    }
  }
  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <CoverInput name="banner" />

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
        Salvar meetup
      </Button>
    </Form>
  );
}
