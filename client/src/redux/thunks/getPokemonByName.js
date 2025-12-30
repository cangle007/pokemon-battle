import * as Pokedex from 'pokeapi-js-wrapper';

const P = new Pokedex.Pokedex({
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5_000,
});

const defaultPokemon = ['psyduck', 'snorlax', 'jolteon', 'gengar'];

const pickSprite = (pokemon) =>
  pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated
    ?.front_default ||
  pokemon.sprites?.other?.['official-artwork']?.front_default ||
  pokemon.sprites?.front_default ||
  '';

const pokemonStats = (pokemon) => {
  return pokemon.stats.map((item) => {
    return {
      name: item.stat.name,
      baseStat: item.base_stat,
    };
  });
};

const getPokemonByName = (names = defaultPokemon) => {
  return async (dispatch) => {
    try {
      const results = await Promise.all(
        names.map((name) => P.getPokemonByName(name))
      );

      console.log('results::::', results);

      const pokemons = results.map((p) => ({
        name: p.name,
        sprite: pickSprite(p),
        stats: pokemonStats(p),
      }));

      dispatch({ type: 'GET_POKEMON', pokemons });
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  };
};

export default getPokemonByName;
