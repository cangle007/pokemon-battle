import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './MainContainer.module.scss';

import createVoice from '../redux/thunks/createVoice';

import Deck from '../components/Deck/Deck';
import BattleField from '../components/BattleField/BattleField';

const defaultVoiceText = [
  { name: 'gengar', text: '“Alright—Gengar, I choose you.”' },
  { name: 'jolteon', text: '“Jolteon, let’s light it up.”' },
  { name: 'snorlax', text: '“Snorlax, you’re up.”' },
  { name: 'psyduck', text: '“Psyduck… okay. We’re doing this.”' },
];

const MainContainer = () => {
  const [pokemonPicked, setPokemonPicked] = useState('');
  const { pokemonDetails } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const selectPokemon = (p) => {
    setPokemonPicked(p);
    handlePlay(p);
  };

  const handlePlay = async (pkPicked) => {
    try {
      const selectedVoice = defaultVoiceText.find(
        (obj) => obj.name === pkPicked
      )?.text;
      await dispatch(createVoice(selectedVoice));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.deckContainer}>
      <Deck playerName={'Player Red'} selectPokemon={selectPokemon} />
      <BattleField pokemonPicked={pokemonPicked} />
      <span>Choose a Pokemon for battle</span>
    </div>
  );
};

export default MainContainer;
