class AudioPlayer {
    private audio!: HTMLAudioElement|null;
    constructor() {
        this.audio = null;
    }

    loadAudio(audioSrc:string) {
        if (this.audio) {
            this.audio.pause();
        }
        this.audio = new Audio(audioSrc);
    }

    play() {
        if (this.audio) {
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

export function triggerSoundEffect(audioSrc:string) {
    player.loadAudio(audioSrc);
    player.play();
}

export function stopSound() {
    player.stop();
}