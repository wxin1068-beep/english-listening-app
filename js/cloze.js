const ClozeMode = {
  currentLesson: null,
  blanks: [],
  userAnswers: [],
  submitted: false,

  render(lesson) {
    this.currentLesson = lesson;
    this.submitted = false;

    const difficulty = 'intermediate';
    const keywords = lesson.keywords[difficulty] || lesson.keywords.intermediate || lesson.keywords.beginner;

    this.blanks = [];
    const words = lesson.text.split(/(\s+)/);

    const html = words.map((part) => {
      const trimmed = part.trim();
      if (trimmed.length === 0) return part;
      const match = trimmed.match(/^([a-zA-Z']+)([^a-zA-Z']*)$/);
      if (!match) return part;
      const word = match[1].toLowerCase();
      const punct = match[2];
      if (keywords.includes(word)) {
        const index = this.blanks.length;
        this.blanks.push({ original: word, index });
        this.userAnswers[index] = '';
        return `<span class="cloze-blank"><input type="text" id="cloze-input-${index}" data-blank="${index}" autocomplete="off" placeholder="..."></span>${punct}`;
      }
      return part;
    }).join('');

    const container = document.getElementById('training-content');
    container.innerHTML = `
      <div class="training-header">
        <div class="lesson-info">
          <h2>填空听写 - ${lesson.title}</h2>
          <span>听音频，在空白处填入缺失的单词。</span>
        </div>
      </div>
      <div class="audio-controls">
        <button class="audio-btn" id="cloze-play-btn" onclick="ClozeMode.play()">&#x25B6;</button>
        <button class="audio-btn small" id="cloze-pause-btn" onclick="ClozeMode.pause()" disabled>&#x23F8;</button>
        <button class="audio-btn small" onclick="ClozeMode.stop()">&#x25A0;</button>
        <div class="audio-progress"><div class="progress-bar"><div class="progress-fill" id="cloze-progress"></div></div></div>
        <div class="speed-control">
          <label>语速</label>
          <select id="cloze-speed" onchange="ClozeMode.setSpeed(this.value)">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1" selected>1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>
      <div class="tip-box">
        <strong>&#x1F4A1; 提示：</strong> 先点击 &#x25B6; 听完整段内容，然后在空白框中填入你所听到的单词。可以反复听。
      </div>
      <div class="training-area">
        <div class="cloze-text" id="cloze-text">${html}</div>
        <div class="btn-group">
          <button class="btn btn-success" id="cloze-submit-btn" onclick="ClozeMode.submit()">提交检查</button>
          <button class="btn btn-outline" onclick="ClozeMode.reset()">重做</button>
        </div>
        <div id="cloze-result" class="dictation-result hidden"></div>
      </div>
    `;

    AudioManager.onTick = (progress) => {
      document.getElementById('cloze-progress').style.width = (progress * 100) + '%';
    };

    setTimeout(() => {
      const firstInput = document.querySelector('.cloze-blank input');
      if (firstInput) firstInput.focus();
    }, 100);
  },

  play() {
    AudioManager.setRate(parseFloat(document.getElementById('cloze-speed').value));
    AudioManager.onEnd = () => {
      document.getElementById('cloze-play-btn').innerHTML = '&#x25B6;';
      document.getElementById('cloze-pause-btn').disabled = true;
      document.getElementById('cloze-progress').style.width = '100%';
    };
    AudioManager.speak(this.currentLesson.text);
    document.getElementById('cloze-play-btn').innerHTML = '&#x25B6;';
    document.getElementById('cloze-pause-btn').disabled = false;
  },

  pause() {
    if (AudioManager.isPaused) {
      AudioManager.resume();
      document.getElementById('cloze-pause-btn').innerHTML = '&#x23F8;';
    } else {
      AudioManager.pause();
      document.getElementById('cloze-pause-btn').innerHTML = '&#x25B6;';
    }
  },

  stop() {
    AudioManager.stop();
    document.getElementById('cloze-play-btn').innerHTML = '&#x25B6;';
    document.getElementById('cloze-pause-btn').disabled = true;
    document.getElementById('cloze-progress').style.width = '0%';
  },

  setSpeed(val) {
    AudioManager.setRate(parseFloat(val));
  },

  submit() {
    let correct = 0;
    let total = this.blanks.length;

    this.blanks.forEach((blank, i) => {
      const input = document.getElementById(`cloze-input-${i}`);
      if (!input) return;

      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = blank.original.replace(/[^a-zA-Z']/g, '').toLowerCase();
      const isCorrect = userAnswer === correctAnswer;

      if (isCorrect) {
        correct++;
        input.className = 'correct';
      } else if (userAnswer) {
        input.className = 'wrong';
        const reveal = document.createElement('span');
        reveal.className = 'answer-reveal show';
        reveal.textContent = correctAnswer;
        input.parentNode.appendChild(reveal);
        input.value = userAnswer;
      } else {
        input.className = 'wrong';
        const reveal = document.createElement('span');
        reveal.className = 'answer-reveal show';
        reveal.textContent = correctAnswer;
        input.parentNode.appendChild(reveal);
      }

      input.disabled = true;
    });

    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    const resultDiv = document.getElementById('cloze-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <h4>检查结果</h4>
      <div class="score-display">
        <div class="score-item"><div class="value">${accuracy}%</div><div class="label">正确率</div></div>
        <div class="score-item" style="color:#27ae60;"><div class="value">${correct}</div><div class="label">正确</div></div>
        <div class="score-item" style="color:#e74c3c;"><div class="value">${total - correct}</div><div class="label">错误</div></div>
      </div>
    `;

    this.submitted = true;
    document.getElementById('cloze-submit-btn').disabled = true;

    App._saveProgress(this.currentLesson.id, 'cloze');
  },

  reset() {
    AudioManager.stop();
    this.render(this.currentLesson);
  }
};