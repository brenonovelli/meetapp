import produce from 'immer';

const INITIAL_STATE = {
  registrations: null,
};

export default function registrations(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registrations/POPULATE_REGISTRATIONS_SUCCESS': {
        draft.registrations = action.payload.data;
        break;
      }
      default:
    }
  });
}
