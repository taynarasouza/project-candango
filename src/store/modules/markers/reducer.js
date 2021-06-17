import produce from 'immer';

const INITIAL_STATE = {
  markers: []
};

export default function markers(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@markers/SET_MARKERS': {
        draft.markers = action.payload.markers;
        break;
      }

      default:
        return state;
    }
  });
}
