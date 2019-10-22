export function populateRegistrationsRequest() {
  return {
    type: '@registrations/POPULATE_REGISTRATIONS_REQUEST',
  };
}

export function populateRegistrationsSuccess(data) {
  return {
    type: '@registrations/POPULATE_REGISTRATIONS_SUCCESS',
    payload: { data },
  };
}

export function registrationRequest(data) {
  return {
    type: '@registrations/REGISTRATION',
    payload: { data },
  };
}

export function deleteRegistrationRequest(data) {
  return {
    type: '@registrations/DELETE_REGISTRATION',
    payload: { data },
  };
}
