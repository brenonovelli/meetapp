import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { MdAddCircleOutline } from 'react-icons/md';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container, Button } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <header>
        <nav>
          <Link to="/dashboard">{'<'} voltar para o dashboard</Link>
        </nav>
      </header>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" type="text" />
        <Input name="email" placeholder="Seu endereço de e-mail" type="email" />

        <hr />

        <Input
          name="oldPassword"
          placeholder="Sua senha atual"
          type="password"
        />
        <Input name="password" placeholder="Nova senha" type="password" />
        <Input
          name="confirmPassword"
          placeholder="Confirme sua nova senha"
          type="password"
        />

        <Button type="submit">
          <MdAddCircleOutline size={20} />
          Salvar perfil
        </Button>
      </Form>
    </Container>
  );
}
