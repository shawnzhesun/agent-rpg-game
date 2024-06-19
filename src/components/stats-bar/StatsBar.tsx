import { IModelStats } from '../agent-stats/AgentStatsComponent';
import styles from './StatsBar.module.css';

interface StatsBarProps {
  modelStats: IModelStats[] | undefined;
}

const StatsBar = (props: StatsBarProps) => {
  return (
    <div className={styles.statsBarContainer}>
      {props.modelStats?.map((item: IModelStats, index: number) => (
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
