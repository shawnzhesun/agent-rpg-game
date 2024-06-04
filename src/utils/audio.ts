export const playSound = (
  soundId: string,
  noOverlap: boolean = false
) => {
  const soundEl = (document.getElementById(soundId) as HTMLAudioElement);
  if (soundEl) {
    if (noOverlap) {
      soundEl.currentTime = 0;
    }
    soundEl.play();
  }
}
