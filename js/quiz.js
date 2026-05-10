const QuizMode = {
  currentLesson: null,
  currentQuestion: 0,
  answers: [],
  answered: false,
  score: 0,

  render(lesson) {
    this.currentLesson = lesson;
    this.currentQuestion = 0;
    this.answers = lesson.questions.map(() => null);
    this.score = 0;

    const container = document.getElementById('training-content');
    container.innerHTML = `
      <div class="training-header">
        <div class="lesson-info">
          <h2>阅读理解 - ${lesson.title}</h2>
          <span>播放音频后回答以下问题。</span>
        </div>
      </div>
      <div class="audio-controls">
        <button class="audio-btn" id="quiz-play-btn" onclick="QuizMode.play()">&#x25B6;</button>
        <button class="audio-btn small" id="quiz-pause-btn" onclick="QuizMode.pause()" disabled>&#x23F8;</button>
        <button class="audio-btn small" onclick="QuizMode.stop()">&#x25A0;</button>
        <div class="audio-progress"><div class="progress-bar"><div class="progress-fill" id="quiz-progress"></div></div></div>
        <div class="speed-control">
          <label>语速</label>
          <select id="quiz-speed" onchange="QuizMode.setSpeed(this.value)">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1" selected>1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>
      <div class="tip-box">
        <strong>&#x1F4A1; 提示：</strong> 先点击 &#x25B6; 播放按钮听完整段内容，然后回答下面的问题。
      </div>
      <div class="training-area" id="quiz-area"></div>
    `;

    AudioManager.onTick = (progress) => {
      document.getElementById('quiz-progress').style.width = (progress * 100) + '%';
    };

    this._renderQuestion();
  },

  _renderQuestion() {
    const area = document.getElementById('quiz-area');
    const questions = this.currentLesson.questions;

    if (this.currentQuestion >= questions.length) {
      this._renderResult();
      return;
    }

    const q = questions[this.currentQuestion];
    const labels = ['A', 'B', 'C', 'D'];

    let dotsHtml = '';
    questions.forEach((_, i) => {
      const cls = i === this.currentQuestion ? 'active'
        : this.answers[i] !== null ? (this.answers[i].correct ? 'correct' : 'wrong')
        : '';
      dotsHtml += `<div class="quiz-dot ${cls}"></div>`;
    });

    area.innerHTML = `
      <div class="quiz-progress">${dotsHtml}</div>
      <div class="quiz-question">
        <div class="q-text">${this.currentQuestion + 1}. ${q.question}</div>
        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, i) => `
            <div class="quiz-option" data-index="${i}" onclick="QuizMode.select(${i})">
              <span class="option-label">${labels[i]}</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" id="quiz-next-btn" onclick="QuizMode.next()" disabled>下一题</button>
        <button class="btn btn-outline" onclick="QuizMode.reset()">重新开始</button>
      </div>
    `;
  },

  select(index) {
    if (this.answered) return;

    const q = this.currentLesson.questions[this.currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (i === q.answer) opt.classList.add('correct');
      if (i === index && index !== q.answer) opt.classList.add('wrong');
      if (i === index) opt.classList.add('selected');
    });

    const isCorrect = index === q.answer;
    this.answers[this.currentQuestion] = { selected: index, correct: isCorrect };
    if (isCorrect) this.score++;
    this.answered = true;

    const feedback = document.getElementById('quiz-feedback');
    feedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
    feedback.textContent = isCorrect ? '&#x2705; 回答正确！' : `&#x274C; 正确答案是: ${q.options[q.answer]}`;

    document.getElementById('quiz-next-btn').disabled = false;
  },

  next() {
    this.currentQuestion++;
    this.answered = false;
    this._renderQuestion();
  },

  _renderResult() {
    const total = this.currentLesson.questions.length;
    const pct = Math.round((this.score / total) * 100);
    const stars = pct >= 80 ? '&#x2B50;&#x2B50;&#x2B50;' : pct >= 50 ? '&#x2B50;&#x2B50;' : '&#x2B50;';

    document.getElementById('quiz-area').innerHTML = `
      <div class="quiz-result">
        <div class="big-score">${this.score}/${total}</div>
        <div class="sub-text">${stars} 正确率 ${pct}%</div>
        <div class="btn-group" style="justify-content:center;">
          <button class="btn btn-primary" onclick="QuizMode.startOver()">再做一次</button>
          <button class="btn btn-outline" onclick="App.goBackToMode()">选择其他模式</button>
        </div>
      </div>
    `;

    App._saveProgress(this.currentLesson.id, 'quiz');
  },

  play() {
    AudioManager.setRate(parseFloat(document.getElementById('quiz-speed').value));
    AudioManager.onEnd = () => {
      document.getElementById('quiz-play-btn').innerHTML = '&#x25B6;';
      document.getElementById('quiz-pause-btn').disabled = true;
      document.getElementById('quiz-progress').style.width = '100%';
    };
    AudioManager.speak(this.currentLesson.text);
    document.getElementById('quiz-pause-btn').disabled = false;
  },

  pause() {
    if (AudioManager.isPaused) {
      AudioManager.resume();
      document.getElementById('quiz-pause-btn').innerHTML = '&#x23F8;';
    } else {
      AudioManager.pause();
      document.getElementById('quiz-pause-btn').innerHTML = '&#x25B6;';
    }
  },

  stop() {
    AudioManager.stop();
    document.getElementById('quiz-play-btn').innerHTML = '&#x25B6;';
    document.getElementById('quiz-pause-btn').disabled = true;
    document.getElementById('quiz-progress').style.width = '0%';
  },

  setSpeed(val) {
    AudioManager.setRate(parseFloat(val));
  },

  startOver() {
    this.render(this.currentLesson);
  },

  reset() {
    AudioManager.stop();
    this.render(this.currentLesson);
  }
};