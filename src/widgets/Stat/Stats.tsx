import React from 'react';
import styles from './Stats.module.css';
interface StatsProps {
  value: string;
  title: string;
}

const Stats: React.FC<StatsProps> = ({ value, title }) => {
  return (
    <div className={styles.statBox}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statTitle}>{title}</div>
    </div>
  );
};

export default Stats;
