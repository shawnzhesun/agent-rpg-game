import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './RenderMap.module.css';
import MapBackgroundTile from './MapBackgroundTile';
import MapPlacement from './MapPlacement';
import { MapState, IMapState } from '../../classes/MapState';
import { AgentsAtom } from '../../atoms/AgentsAtom';


const RenderMap = () => {
  const [map, setMap] = useState<IMapState | null>(null);
  const agentList = useRecoilValue(AgentsAtom).agents;

  useEffect(() => {
    const mapState = new MapState(agentList, (newState: IMapState) => {
      setMap(newState);
    });

    setMap(mapState.getState());

    return () => {
      mapState.destroy();
    };
  }, [agentList]);

  if (!map) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.fullScreenContainer} style={{ background: '#222222' }}>
      <div className={styles.gameScreen}>
        <MapBackgroundTile map={map} />
        <MapPlacement placements={map.gameObjects} />
      </div>
    </div>
  );
};

export default RenderMap;
