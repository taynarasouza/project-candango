export function setMarkers(markers) {
  return {
    type: '@markers/SET_MARKERS',
    payload: { markers },
  };
}
