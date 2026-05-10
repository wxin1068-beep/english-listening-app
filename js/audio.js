const AudioManager = {
  synth: null,
  utterance: null,
  rate: 1,
  isPlaying: false,
  isPaused: false,
  onEnd: null,
  onTick: null,
  _timer: null,
  _duration: 0,
  _voice: null,

  init() {
    this.synth = window.speechSynthesis;
    this._loadVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this._loadVoice();
    }
  },

  _loadVoice() {
    const voices = this.synth.getVoices();
    this._voice = voices.find(v => v.lang.startsWith('en-GB'))
      || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'))
      || null;
  },

  speak(text, callback) {
    if (!this.synth) this.init();
    this.stop();

    if (!text) return;

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = 'en-US';
    this.utterance.rate = this.rate;
    this.utterance.pitch = 1;
    this.utterance.volume = 1;

    if (this._voice) this.utterance.voice = this._voice;

    this._duration = Math.max(text.length * 60 / (this.rate || 1), 500);
    this.isPlaying = true;
    this.isPaused = false;

    const startTime = Date.now();

    this.utterance.onstart = () => {
      this.isPlaying = true;
      this._startProgress(startTime);
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this._stopProgress();
      if (this.onEnd) this.onEnd();
      if (callback) callback();
    };

    this.utterance.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this._stopProgress();
      if (this.onEnd) this.onEnd();
      if (callback) callback();
    };

    try {
      this.synth.speak(this.utterance);
    } catch (e) {
      console.warn('TTS speak failed:', e);
      this.isPlaying = false;
      if (callback) callback();
    }
  },

  speakSentences(sentences, index, onSentenceEnd, onComplete) {
    if (index >= sentences.length) {
      if (onComplete) onComplete();
      return;
    }

    this.onEnd = () => {
      if (onSentenceEnd) onSentenceEnd(index);
      setTimeout(() => {
        this.speakSentences(sentences, index + 1, onSentenceEnd, onComplete);
      }, 300);
    };

    this.speak(sentences[index]);
  },

  speakSentenceBySentence(sentences, index, onSentenceStart, onSentenceEnd, onComplete) {
    if (index >= sentences.length) {
      if (onComplete) onComplete();
      return;
    }

    if (onSentenceStart) onSentenceStart(index);

    const delay = Math.max(800, sentences[index].length * 35);

    this.onEnd = () => {
      if (onSentenceEnd) onSentenceEnd(index);
    };

    this.speak(sentences[index]);
  },

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this._stopProgress();
    }
  },

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.isPlaying = true;
    }
  },

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this._stopProgress();
    this.utterance = null;
  },

  setRate(rate) {
    this.rate = rate;
  },

  _startProgress(startTime) {
    this._stopProgress();
    this._timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this._duration, 0.95);
      if (this.onTick) this.onTick(progress);
    }, 100);
  },

  _stopProgress() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
};