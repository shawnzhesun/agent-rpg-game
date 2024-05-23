import { useRecoilValue } from 'recoil';
import RenderLevel from './components/level-layout/RenderLevel';
import RenderAgentSelect from './components/agent-select-layout/RenderAgentSelect';
import { CurrentSceneAtom } from './atoms/CurrentSceneAtom';
import './App.css';

function App() {
  const currentScene = useRecoilValue(CurrentSceneAtom);
  switch (currentScene.currentSceneId) {
    case 'work-level':
      return <RenderLevel />;
    case 'agent-selection-scene':
      return <RenderAgentSelect />;
    default:
      return <div>Unknown scene</div>;
  }
}

export default App;
