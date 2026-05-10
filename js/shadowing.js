const ShadowingMode = {
  currentLesson: null,
  currentIndex: 0,
  isPlaying: false,

  render(lesson) {
    this.currentLesson = lesson;
    this.currentIndex = 0;
    this.isPlaying = false;

    const container = document.getElementById('training-content');
    container.innerHTML = `
      <div class="training-header">
        <div class="lesson-info">
          <h2>影子跟读 - ${lesson.title}</h2>
          <span>逐句播放，请跟着朗读。提升你的语感和发音。</span>
        </div>
      </div>
      <div class="audio-controls">
        <button class="audio-btn" id="shadow-play-btn" onclick="ShadowingMode.startPlayback()">&#x25B6;</button>
        <button class="audio-btn small" id="shadow-pause-btn" onclick="ShadowingMode.pause()" disabled>&#x23F8;</button>
        <button class="audio-btn small" onclick="ShadowingMode.stop()">&#x25A0;</button>
        <div class="audio-progress"><div class="progress-bar"><div class="progress-fill" id="shadow-progress"></div></div></div>
        <div class="speed-control">
          <label>语速</label>
          <select id="shadow-speed" onchange="ShadowingMode.setSpeed(this.value)">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1" selected>1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>
      <div class="tip-box">
        <strong>&#x1F4A1; 提示：</strong> 听每一句的发音，然后在停顿期间跟读。注意模仿语音语调和节奏。
      </div>
      <div class="training-area">
        <div class="shadowing-progress">
          句子 <span id="shadow-sentence-num">1</span> / ${lesson.sentences.length}
        </div>
        <div class="shadowing-sentence" id="shadow-sentence">
          <span class="eng">${lesson.sentences[0]}</span>
          <span class="cn">${lesson.translations[0]}</span>
        </div>
        <div class="shadowing-controls">
          <button class="btn btn-outline" onclick="ShadowingMode.prevSentence()">&#x25C0; 上一句</button>
          <button class="btn btn-primary" id="shadow-play-sentence-btn" onclick="ShadowingMode.playCurrentSentence()">播放本句</button>
          <button class="btn btn-outline" onclick="ShadowingMode.nextSentence()">下一句 &#x25B6;</button>
        </div>
        <div class="shadowing-controls">
          <button class="btn btn-outline" onclick="ShadowingMode.loopSentence()" id="shadow-loop-btn">&#x1F501; 循环本句</button>
          <button class="btn btn-outline" onclick="ShadowingMode.autoPlay()" id="shadow-auto-btn">&#x25B6;&#xFE0F; 连续播放</button>
        </div>
      </div>
    `;

    AudioManager.onTick = (progress) => {
      const el = document.getElementById('shadow-progress');
      if (el) el.style.width = (progress * 100) + '%';
    };
  },

  _updateDisplay(index) {
    if (index < 0 || index >= this.currentLesson.sentences.length) return;
    this.currentIndex = index;
    document.getElementById('shadow-sentence').innerHTML = `
      <span class="eng">${this.currentLesson.sentences[index]}</span>
      <span class="cn">${this.currentLesson.translations[index]}</span>
    `;
    document.getElementById('shadow-sentence-num').textContent = index + 1;
  },

  playCurrentSentence() {
    AudioManager.setRate(parseFloat(document.getElementById('shadow-speed').value));
    AudioManager.stop();
    AudioManager.onEnd = () => {
      document.getElementById('shadow-play-sentence-btn').textContent = '播放本句';
      document.getElementById('shadow-pause-btn').disabled = true;
    };
    AudioManager.speak(this.currentLesson.sentences[this.currentIndex]);
    document.getElementById('shadow-play-sentence-btn').textContent = '播放中...';
    document.getElementById('shadow-pause-btn').disabled = false;
  },

  startPlayback() {
    this.isPlaying = true;
    this._playSequential(0);
    document.getElementById('shadow-play-btn').disabled = true;
  },

  _playSequential(index) {
    if (!this.isPlaying || index >= this.currentLesson.sentences.length) {
      this.isPlaying = false;
      const btn = document.getElementById('shadow-play-btn');
      if (btn) btn.disabled = false;
      return;
    }

    this._updateDisplay(index);

    AudioManager.setRate(parseFloat(document.getElementById('shadow-speed').value));
    AudioManager.onEnd = () => {
      const pauseTime = Math.max(600, this.currentLesson.sentences[index].length * 50);
      setTimeout(() => {
        this._playSequential(index + 1);
      }, pauseTime);
    };

    AudioManager.speak(this.currentLesson.sentences[index]);
  },

  autoPlay() {
    const btn = document.getElementById('shadow-auto-btn');
    if (this.isPlaying) {
      this.isPlaying = false;
      AudioManager.stop();
      btn.textContent = '▶️ 连续播放';
      document.getElementById('shadow-play-btn').disabled = false;
      return;
    }
    btn.textContent = '⏹ 停止连续';
    this.startPlayback();
  },

  loopSentence() {
    const btn = document.getElementById('shadow-loop-btn');
    AudioManager.stop();

    const loop = () => {
      if (!this.isPlaying) return;
      AudioManager.onEnd = () => {
        if (this.isPlaying) {
          setTimeout(loop, 1000);
        }
      };
      AudioManager.speak(this.currentLesson.sentences[this.currentIndex]);
    };

    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      btn.textContent = '⏹ 停止循环';
      this.playCurrentSentence();
      AudioManager.onEnd = () => {
        if (this.isPlaying) {
          setTimeout(() => {
            if (this.isPlaying) this.playCurrentSentence();
          }, 1500);
        }
      };
    } else {
      AudioManager.stop();
      btn.textContent = '🔁 循环本句';
    }

    document.getElementById('shadow-play-btn').disabled = this.isPlaying;
  },

  prevSentence() {
    AudioManager.stop();
    if (this.currentIndex > 0) {
      this._updateDisplay(this.currentIndex - 1);
    }
  },

  nextSentence() {
    AudioManager.stop();
    if (this.currentIndex < this.currentLesson.sentences.length - 1) {
      this._updateDisplay(this.currentIndex + 1);
    }
  },

  pause() {
    if (AudioManager.isPaused) {
      AudioManager.resume();
      document.getElementById('shadow-pause-btn').innerHTML = '&#x23F8;';
    } else {
      AudioManager.pause();
      document.getElementById('shadow-pause-btn').innerHTML = '&#x25B6;';
    }
  },

  stop() {
    AudioManager.stop();
    this.isPlaying = false;
    document.getElementById('shadow-play-btn').disabled = false;
    document.getElementById('shadow-auto-btn').textContent = '▶️ 连续播放';
    document.getElementById('shadow-loop-btn').textContent = '🔁 循环本句';
    document.getElementById('shadow-pause-btn').disabled = true;
    document.getElementById('shadow-progress').style.width = '0%';
  },

  setSpeed(val) {
    AudioManager.setRate(parseFloat(val));
  }
};