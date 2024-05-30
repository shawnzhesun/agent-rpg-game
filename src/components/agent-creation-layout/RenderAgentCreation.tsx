import { useState } from 'react';
import AgentCreationBackground from './AgentCreationBackground';
import styles from './RenderAgentCreation.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import Sprite from '../object-graphics/Sprite';
import SpriteButton from '../object-graphics/SpriteButton';
import { CurrentSceneAtom } from '../../atoms/CurrentSceneAtom';

const RenderAgentCreation = () => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [, setSelectedSkills] = useState<string[]>([]);
  const [, setCurrentScene] = useRecoilState(CurrentSceneAtom);
  const agents = ['Agent1', 'Agent2', 'Agent3', 'Agent4', 'Agent5', 'Agent6']; // Example agent data
  const skills = [
    'Skill1', 'Skill2', 'Skill3', 'Skill4',
    'Skill5', 'Skill6', 'Skill7', 'Skill8',
    'Skill9', 'Skill10', 'Skill11', 'Skill12'
  ]; // Example skills data

  const handlePreviousAgent = () => {
    setCurrentAgentIndex((prevIndex) => (prevIndex - 1 + agents.length) % agents.length);
  };

  const handleNextAgent = () => {
    setCurrentAgentIndex((prevIndex) => (prevIndex + 1) % agents.length);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleCreationConfirmation = () => {
    setCurrentScene((prev) => ({ ...prev, currentSceneId: 'agent-selection-scene' }));
  }

  const handleGoBack = () => {
    setCurrentScene((prev) => ({ ...prev, currentSceneId: 'agent-selection-scene' }));
  }

  return (
    <div className={styles.fullScreenContainer} style={{ background: '#222222' }}>
      <div className={styles.gameScreen}>
        <AgentCreationBackground />
        <div className={styles.overlay}>
          <div className={styles.agentCreationContainer}>
            <div className={styles.leftPanel}>
              <input
                type="text"
                placeholder="Agent Name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
              <div className={styles.agentSelection}>
                <SpriteButton
                  normalFrameCoordinate='8x0'
                  hoverFrameCoordinate='9x0'
                  activeFrameCoordinate='10x0'
                  image={SpriteImage.buttonImage!}
                  size={32}
                  onClick={handlePreviousAgent}
                />
                <div className={styles.agentPortrait}>
                  <Sprite frameCoordinate={`${currentAgentIndex}x0`} image={SpriteImage.portraitImage!} size={192} />
                </div>
                <SpriteButton
                  normalFrameCoordinate='11x0'
                  hoverFrameCoordinate='12x0'
                  activeFrameCoordinate='13x0'
                  image={SpriteImage.buttonImage!}
                  size={32}
                  onClick={handleNextAgent}
                />
              </div>
              <div className={styles.agentConfirmation}>
                <SpriteButton
                  normalFrameCoordinate='5x0'
                  hoverFrameCoordinate='6x0'
                  activeFrameCoordinate='7x0'
                  image={SpriteImage.buttonImage!}
                  size={32}
                  onClick={handleGoBack}
                />
                <SpriteButton
                  normalFrameCoordinate='2x0'
                  hoverFrameCoordinate='3x0'
                  activeFrameCoordinate='4x0'
                  image={SpriteImage.buttonImage!}
                  size={32}
                  onClick={handleCreationConfirmation}
                />
              </div>
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.agentDetails}>
                <textarea
                  placeholder="Agent Description"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                />
              </div>
              <div className={styles.agentSkills}>
                {skills.map((skill, index) => (
                  <div key={skill} className={styles.skillItem}>
                    <SpriteButton
                      normalFrameCoordinate={`${14+index}x0`}
                      hoverFrameCoordinate={`${14+index}x0`}
                      activeFrameCoordinate={`${14+index}x0`}
                      image={SpriteImage.buttonImage!}
                      size={32}
                      onClick={() => handleSkillToggle(skill)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderAgentCreation;
