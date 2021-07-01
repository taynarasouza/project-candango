import produce from 'immer';

/*
{ circuit: Circuit, status: String }
*/
const INITIAL_STATE = {
  circuits: []
};

export default function circuits(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@circuits/START_CIRCUIT': {
        if (draft.circuits.length)
          draft.circuits = [...draft.circuits, action.payload.circuit];
        else
          draft.circuits = [action.payload.circuit];
        break;
      }

      case '@circuits/CONTINUE_CIRCUIT': {
        draft.circuits[action.payload.circuitIndex].status = "start";
        break;
      }
      
      case '@circuits/STOP_CIRCUIT': {
        draft.circuits[action.payload.circuitIndex].status = "stop";
        break;
      }

      default:
    }
  });
}
