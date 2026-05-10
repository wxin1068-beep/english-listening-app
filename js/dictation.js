const DictationMode = {
  currentLesson: null,
  userInput: '',
  submitted: false,

  render(lesson) {
    this.currentLesson = lesson;
    this.userInput = '';
    this.submitted = false;

    const container = document.getElementById('training-content');
    container.innerHTML = `
      <div class="training-header">
        <div class="lesson-info">
          <h2>听写训练 - ${lesson.title}</h2>
          <span>播放音频，写下你听到的内容。点击"提交"检查你的答案。</span>
        </div>
      </div>
      <div class="audio-controls">
        <button class="audio-btn" id="dict-play-btn" onclick="DictationMode.play()">&#x25B6;</button>
        <button class="audio-btn small" id="dict-pause-btn" onclick="DictationMode.pause()" disabled>&#x23F8;</button>
        <button class="audio-btn small" onclick="DictationMode.stop()">&#x25A0;</button>
        <div class="audio-progress"><div class="progress-bar"><div class="progress-fill" id="dict-progress"></div></div></div>
        <div class="speed-control">
          <label>语速</label>
          <select id="dict-speed" onchange="DictationMode.setSpeed(this.value)">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1" selected>1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>
      <div class="tip-box">
        <strong>&#x1F4A1; 提示：</strong> 先点击 &#x25B6; 播放按钮听完整内容，然后在下方写下你听到的文字。你可以反复播放。
      </div>
      <div class="training-area">
        <textarea class="dictation-input" id="dictation-input" placeholder="在这里写下你听到的内容..." rows="6"></textarea>
        <div class="btn-group">
          <button class="btn btn-success" id="dict-submit-btn" onclick="DictationMode.submit()">提交检查</button>
          <button class="btn btn-outline" onclick="DictationMode.reset()">重做</button>
        </div>
        <div id="dictation-result" class="dictation-result hidden"></div>
      </div>
    `;

    AudioManager.onTick = (progress) => {
      document.getElementById('dict-progress').style.width = (progress * 100) + '%';
    };
  },

  play() {
    AudioManager.setRate(parseFloat(document.getElementById('dict-speed').value));
    AudioManager.onEnd = () => {
      document.getElementById('dict-play-btn').innerHTML = '&#x25B6;';
      document.getElementById('dict-pause-btn').disabled = true;
      document.getElementById('dict-progress').style.width = '100%';
    };
    AudioManager.speak(this.currentLesson.text, () => {
      document.getElementById('dict-play-btn').innerHTML = '&#x25B6;';
      document.getElementById('dict-pause-btn').disabled = true;
      document.getElementById('dict-progress').style.width = '100%';
    });
    document.getElementById('dict-play-btn').innerHTML = '&#x25B6;';
    document.getElementById('dict-pause-btn').disabled = false;
  },

  pause() {
    if (AudioManager.isPaused) {
      AudioManager.resume();
      document.getElementById('dict-pause-btn').innerHTML = '&#x23F8;';
    } else {
      AudioManager.pause();
      document.getElementById('dict-pause-btn').innerHTML = '&#x25B6;';
    }
  },

  stop() {
    AudioManager.stop();
    document.getElementById('dict-play-btn').innerHTML = '&#x25B6;';
    document.getElementById('dict-pause-btn').disabled = true;
    document.getElementById('dict-progress').style.width = '0%';
  },

  setSpeed(val) {
    AudioManager.setRate(parseFloat(val));
  },

  submit() {
    const input = document.getElementById('dictation-input').value.trim();
    if (!input) return;

    const original = this.currentLesson.text;
    const result = this._compareTexts(original, input);

    const resultDiv = document.getElementById('dictation-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <h4>检查结果</h4>
      <div class="score-display">
        <div class="score-item"><div class="value">${result.accuracy}%</div><div class="label">准确率</div></div>
        <div class="score-item" style="color:#27ae60;"><div class="value">${result.correctWords}</div><div class="label">正确词数</div></div>
        <div class="score-item" style="color:#e74c3c;"><div class="value">${result.wrongWords + result.missedWords}</div><div class="label">错误词数</div></div>
      </div>
      <div class="word-comparison">${result.html}</div>
    `;

    this.submitted = true;
    document.getElementById('dict-submit-btn').disabled = true;

    App._saveProgress(this.currentLesson.id, 'dictation');
  },

  _compareTexts(original, input) {
    const origWords = original.toLowerCase().match(/[a-z0-9']+/g) || [];
    const inputWords = input.toLowerCase().match(/[a-z0-9']+/g) || [];

    let correctCount = 0;
    let wrongCount = 0;
    let missedCount = 0;
    let extraCount = 0;

    const maxLen = Math.max(origWords.length, inputWords.length);
    let html = '';
    let usedInput = [];

    for (let i = 0; i < origWords.length; i++) {
      const ow = origWords[i];
      const iw = inputWords[i];

      if (iw === undefined) {
        html += `<span class="word-missed">${ow}</span> `;
        missedCount++;
      } else if (ow === iw) {
        html += `<span class="word-correct">${ow}</span> `;
        correctCount++;
        usedInput.push(i);
      } else {
        html += `<span class="word-wrong">${iw}</span><span class="word-suggestion">${ow}</span> `;
        wrongCount++;
        usedInput.push(i);
      }
    }

    for (let i = origWords.length; i < inputWords.length; i++) {
      html += `<span class="word-extra">${inputWords[i]}</span> `;
      extraCount++;
    }

    const total = origWords.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      accuracy,
      correctWords: correctCount,
      wrongWords: wrongCount,
      missedWords: missedCount,
      extraWords: extraCount,
      html
    };
  },

  reset() {
    this.stop();
    this.render(this.currentLesson);
    document.getElementById('dictation-input').focus();
  }
};