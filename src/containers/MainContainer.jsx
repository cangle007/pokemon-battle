import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './MainContainer.module.scss';

import Deck from '../components/Deck/Deck';
import BattleField from '../components/BattleField/BattleField';

const MainContainer = () => {
  const [pokemonPicked, setPokemonPicked] = useState('');
  const { pokemonDetails } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const selectPokemon = (p) => {
    setPokemonPicked(p);
  };

  console.log('pokemonDetails~~~~~', pokemonDetails);
  console.log('pokemonPicked~~~~~', pokemonPicked);

  return (
    <div className={styles.deckContainer}>
      <Deck playerName={'Player Red'} selectPokemon={selectPokemon} />
      <BattleField pokemonPicked={pokemonPicked} />
    </div>
  );
};

export default MainContainer;
