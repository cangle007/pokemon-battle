export default function reducer(
  currentState = {
    pokemonDetails: [],
  },
  action
) {
  switch (action.type) {
    case 'GET_POKEMON':
      return { ...currentState, pokemonDetails: action.pokemons };

    default:
      return currentState;
  }
}
