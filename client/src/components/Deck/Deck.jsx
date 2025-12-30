import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './Deck.module.scss';

import getPokemonByName from '../../redux/thunks/getPokemonByName';

const Deck = ({ playerName, selectPokemon }) => {
  const { pokemonDetails } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  console.log('pokemonDetails~~~~~', pokemonDetails);

  useEffect(() => {
    dispatch(getPokemonByName());
  }, [dispatch]);

  return (
    <div className={styles.deckContainer}>
      <div className={styles.playerItem}>{playerName}</div>

      <div className={styles.deckItem}>
        {pokemonDetails.map((form, i) => (
          <img
            className={styles.pokemon}
            key={i}
            src={form.sprite}
            alt={form.name}
            onClick={() => {
              selectPokemon(form.name);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
