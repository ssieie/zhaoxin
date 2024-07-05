class AudioPlayer {
  private audio!: HTMLAudioElement | null;
  private mute: string;

  constructor() {
    this.audio = null;
    this.mute = window.localStorage.getItem("isItSilent") || "no";
  }

  loadAudio(audioSrc: string) {
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(audioSrc);
  }

  changeMute(val = "no") {
    this.mute = val;
    window.localStorage.setItem("isItSilent", val);
  }

  play(mutePass: boolean) {
    if (this.audio) {
      this.audio.muted = !(this.mute === "no" || mutePass);
      this.audio.currentTime = 0;
      this.audio.play().then(() => {});
    } else {
      console.error("未加载音频。使用loadAudio（audioSrc）方法加载音频文件。");
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}

const player = new AudioPlayer();

export function triggerSoundEffect(audioSrc: string, mutePass = false) {
  player.loadAudio(audioSrc);
  player.play(mutePass);
}

export function changeMute(val: string) {
  player.changeMute(val);
}

export function stopSound() {
    player.stop();
}