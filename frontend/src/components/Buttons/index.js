import React from 'react';

import { MdAddCircleOutline, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Button } from './styles';

export function ButtonAdd() {
  return (
    <Button type="button">
      <MdAddCircleOutline size={20} />
      Novo Mettup
    </Button>
  );
}

export function ButtonEdit() {
  return (
    <Button type="button">
      <MdEdit size={20} />
      Editar
    </Button>
  );
}

export function ButtonDelete() {
  return (
    <Button type="button">
      <MdDeleteForever size={20} />
      Cancelar
    </Button>
  );
}
