import React from 'react';
import styles from './Home.module.css';
import Stats from '../../widgets/Stat/Stats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.greetPill}>
        <FontAwesomeIcon icon={faHandshake} />
        Community that helps
      </span>
      <div className={styles.homeTitle}>
        <h1>You lost something?</h1>
        <h1>Or found something?</h1>
        <h5>Help Community to reunite lost items with their owners.</h5>
        <div className={styles.searchInput}></div>
        <div className={styles.stats}>
          <Stats value="10,000+" title="Users"></Stats>
          <Stats value="5,000+" title="Items Found"></Stats>
          <Stats value="1,200+" title="Items Reported"></Stats>
        </div>
      </div>
    </div>
  );
};

export default Home;
