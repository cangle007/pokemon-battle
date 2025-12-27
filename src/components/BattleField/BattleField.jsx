import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './BattleField.module.scss';

const BattleField = ({ pokemonPicked }) => {
  const { pokemonDetails } = useSelector((state) => state.main);

  return (
    <div className={styles.battleFieldContainer}>
      <div className={styles.statItem}>
        {pokemonDetails
          .filter((obj) => obj.name === pokemonPicked)
          .map((form) => {
            const hp = form.stats.find((s) => s.name === 'hp')?.baseStat ?? 0;
            const pkName = form.name[0].toUpperCase() + form.name.slice(1);

            return (
              <div key={form.name} className={styles.pokemonStat}>
                <span className={styles.pokemonName}>{pkName}</span>

                <div className={styles.statDetails}>
                  <div className={styles.hpBar}>
                    <div>HP:</div>
                    <div className={styles.hpDrain} />
                  </div>

                  <div className={styles.hpStat}>
                    {hp}/{hp}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className={styles.displayPokemon}>
        {pokemonDetails
          .filter((obj) => {
            return obj.name === pokemonPicked;
          })
          .map((form, i) => {
            return (
              <img
                className={styles.sprite}
                key={i}
                src={form.sprite}
                alt={form.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BattleField;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import cn from 'classnames';
// import styles from './BattleField.module.scss';

// const BattleField = ({ pokemonPicked }) => {
//   const { pokemonDetails } = useSelector((state) => state.main);

//   return (
//     <div className={styles.battleFieldContainer}>
//       <div>
//         {pokemonDetails
//           .filter((obj) => obj.name === pokemonPicked)
//           .map((form) => {
//             const hp = form.stats.find((s) => s.name === 'hp')?.baseStat ?? 0;
//             const pkName = form.name[0].toUpperCase() + form.name.slice(1);

//             return (
//               <div key={form.name} className={styles.pokemonStatItem}>
//                 <span className={styles.pokemonName}>{pkName}</span>

//                 <div className={styles.statDetails}>
//                   <div className={styles.hpBar}>
//                     <div>HP:</div>
//                     <div className={styles.hpDrain} />
//                   </div>

//                   <div className={styles.hpStat}>
//                     {hp}/{hp}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//       </div>

//       <div className={styles.displayPokemon}>
//         {pokemonDetails
//           .filter((obj) => {
//             return obj.name === pokemonPicked;
//           })
//           .map((form, i) => {
//             return (
//               <img
//                 className={styles.sprite}
//                 key={i}
//                 src={form.sprite}
//                 alt={form.name}
//               />
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default BattleField;
