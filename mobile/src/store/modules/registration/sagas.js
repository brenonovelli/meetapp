import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import {
  populateRegistrationsRequest,
  populateRegistrationsSuccess,
} from './actions';

export function* populateRegistrations() {
  try {
    const response = yield call(api.get, 'registrations');
    yield put(populateRegistrationsSuccess(response.data));
  } catch (err) {
    yield put(populateRegistrationsSuccess([]));
  }
}

export function* registration({ payload }) {
  const id = payload.data;

  try {
    yield call(api.post, `meetups/${id}/registration`);
    Alert.alert('Sucesso.', 'Inscrição feita com sucesso');
    yield put(populateRegistrationsRequest());
  } catch (err) {
    Alert.alert(
      'Falha na inscrição.',
      'Houve um erro na inscrição. Tente novamente.'
    );
  }
}

export function* deleteRegistration({ payload }) {
  const id = payload.data;

  try {
    yield call(api.delete, `registrations/${id}`);
    Alert.alert('Sucesso.', 'Inscrição cancelada com sucesso');
    yield put(populateRegistrationsRequest());
  } catch (err) {
    Alert.alert(
      'Falha no cancelamento.',
      'Houve um erro no cancelamento. Tente novamente.'
    );
  }
}

export default all([
  takeLatest('persist/REHYDRATE', populateRegistrations),
  takeLatest(
    '@registrations/POPULATE_REGISTRATIONS_REQUEST',
    populateRegistrations
  ),
  takeLatest('@registrations/REGISTRATION', registration),
  takeLatest('@registrations/DELETE_REGISTRATION', deleteRegistration),
]);
