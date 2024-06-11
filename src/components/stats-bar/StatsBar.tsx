import styles from './StatsBar.module.css';

const StatsBar = (props: any) => {
  return (
    <div className={styles.statsBarContainer}>
      {props.data?.map((item: any, index: any) => (
        <div key={index} className={styles.statsBarRow}>
          <span className={styles.statsBarText}>{item.text}</span>
          <div className={styles.statsBarBars}>
            {[...Array(3)].map((_, barIndex) => (
              <div
                key={barIndex}
                className={`${styles.statsBar} ${barIndex < item.bars ? styles.solid : styles.outlined}`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
