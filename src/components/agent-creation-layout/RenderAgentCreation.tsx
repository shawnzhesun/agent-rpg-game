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
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [, setCurrentScene] = useRecoilState(CurrentSceneAtom);
  const agents = ['Agent1', 'Agent2', 'Agent3']; // Example agent data
  const skills = ['Skill1', 'Skill2', 'Skill3', 'Skill4']; // Example skills data

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
                  normalFrameCoordinate='2x0'
                  hoverFrameCoordinate='3x0'
                  activeFrameCoordinate='4x0'
                  image={SpriteImage.buttonImage!}
                  size={32}
                  onClick={handleCreationConfirmation}
                />
                <SpriteButton
                  normalFrameCoordinate='5x0'
                  hoverFrameCoordinate='6x0'
                  activeFrameCoordinate='7x0'
                  image={SpriteImage.buttonImage!}
                  size={32}
                  onClick={handleGoBack}
                />
              </div>
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.agentDetails}>
                <input
                  type="text"
                  placeholder="Agent Name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
                <textarea
                  placeholder="Agent Description"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                />
              </div>
              <div className={styles.agentSkills}>
                {skills.map((skill) => (
                  <div key={skill} className={styles.skillItem}>
                    <input
                      type="checkbox"
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={skill}>{skill}</label>
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
