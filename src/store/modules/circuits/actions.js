export function startCircuit(circuit) {
  return {
    type: '@circuits/START_CIRCUIT',
    payload: { 
      circuit
    }
  }
}

export function continueCircuit(circuitIndex) {
  return {
    type: '@circuits/CONTINUE_CIRCUIT',
    payload: {
      circuitIndex
    }
  }
}

export function stopCircuit(circuitIndex) {
  return {
    type: '@circuits/STOP_CIRCUIT',
    payload: { circuitIndex }
  }
}

export function visitCircuitAttraction({circuitIndex, attractionIndex}) {
  return {
    type: '@circuits/VISIT_CIRCUIT_ATTRACTION',
    payload: { 
      circuitIndex,
      attractionIndex
    }
  }
}