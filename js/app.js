const App = {
  state: {
    currentView: 'home',
    currentLesson: null,
    currentMode: null,
    progress: {}
  },

  init() {
    AudioManager.init();
    this._loadProgress();
    this._renderHome();
    this._bindEvents();
  },

  // === Navigation ===

  goHome() {
    AudioManager.stop();
    this.state.currentView = 'home';
    this._showView('home');
    this._renderHome();
  },

  goBackToMode() {
    AudioManager.stop();
    if (this.state.currentLesson) {
      this.state.currentView = 'mode';
      this._showView('mode');
      this._renderModeSelect();
    } else {
      this.goHome();
    }
  },

  selectLesson(lessonId) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;
    this.state.currentLesson = lesson;
    this.state.currentView = 'mode';
    this._showView('mode');
    this._renderModeSelect();
  },

  startTraining(mode) {
    if (!this.state.currentLesson) return;
    this.state.currentMode = mode;
    this.state.currentView = 'training';
    this._showView('training');
    this._renderTraining(mode);
  },

  _showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const viewMap = { home: 'view-home', mode: 'view-mode', training: 'view-training' };
    const el = document.getElementById(viewMap[viewId]);
    if (el) el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // === Home ===

  _renderHome(filter) {
    filter = filter || 'all';
    const grid = document.getElementById('lesson-grid');
    if (!grid) return;

    const lessons = filter === 'all'
      ? LESSONS
      : LESSONS.filter(l => l.level === filter);

    if (lessons.length === 0) {
      grid.innerHTML = '<p style="color:#888;text-align:center;padding:40px;">该级别暂无课程</p>';
      return;
    }

    grid.innerHTML = lessons.map(lesson => {
      const progress = this.state.progress[lesson.id] || {};
      const completed = Object.keys(progress).length;
      const totalModes = 4;
      const pct = Math.round((completed / totalModes) * 100);

      return `
        <div class="lesson-card" onclick="App.selectLesson(${lesson.id})">
          <div class="tags">
            <span class="tag tag-${lesson.level}">${this._levelLabel(lesson.level)}</span>
            <span class="tag tag-topic">${lesson.topic}</span>
          </div>
          <h3>${lesson.title}</h3>
          <p>${lesson.description}</p>
          ${completed > 0 ? `<div style="margin-top:10px;font-size:12px;color:#888;">已完成 ${completed}/${totalModes} 种模式 (${pct}%)</div>` : ''}
        </div>
      `;
    }).join('');
  },

  _levelLabel(level) {
    const map = { beginner: '初级', intermediate: '中级', advanced: '高级' };
    return map[level] || level;
  },

  // === Mode Select ===

  _renderModeSelect() {
    const lesson = this.state.currentLesson;
    if (!lesson) return;

    document.getElementById('breadcrumb-lesson').textContent = lesson.title;
    document.getElementById('mode-lesson-title').textContent = lesson.title;

    const progress = this.state.progress[lesson.id] || {};
    const completed = Object.keys(progress);
    document.getElementById('mode-lesson-desc').textContent =
      `${this._levelLabel(lesson.level)} · ${lesson.topic} · 已完成 ${completed.length}/4 种模式`;

    document.querySelectorAll('.mode-card').forEach(card => {
      const mode = card.dataset.mode;
      if (progress[mode]) {
        card.style.borderColor = '#27ae60';
        card.style.opacity = '0.85';
      } else {
        card.style.borderColor = 'transparent';
        card.style.opacity = '1';
      }
    });
  },

  // === Training Dispatch ===

  _renderTraining(mode) {
    const lesson = this.state.currentLesson;
    if (!lesson) return;

    const modeNames = { dictation: '听写训练', quiz: '选择题', shadowing: '影子跟读', cloze: '填空听写' };
    document.getElementById('training-breadcrumb-mode').textContent = modeNames[mode] || mode;

    switch (mode) {
      case 'dictation': DictationMode.render(lesson); break;
      case 'quiz': QuizMode.render(lesson); break;
      case 'shadowing': ShadowingMode.render(lesson); break;
      case 'cloze': ClozeMode.render(lesson); break;
    }
  },

  // === Progress ===

  _saveProgress(lessonId, mode) {
    if (!this.state.progress[lessonId]) {
      this.state.progress[lessonId] = {};
    }
    this.state.progress[lessonId][mode] = true;
    this._persistProgress();
  },

  _persistProgress() {
    try {
      localStorage.setItem('english-listening-progress', JSON.stringify(this.state.progress));
    } catch (e) {
      // localStorage not available
    }
  },

  _loadProgress() {
    try {
      const saved = localStorage.getItem('english-listening-progress');
      if (saved) {
        this.state.progress = JSON.parse(saved);
      }
    } catch (e) {
      // localStorage not available
    }
  },

  // === Events ===

  _bindEvents() {
    document.querySelectorAll('.level-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this._renderHome(tab.dataset.level);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.state.currentView === 'training') {
        const activeInput = document.querySelector('.cloze-blank input:focus');
        if (activeInput) {
          const allInputs = document.querySelectorAll('.cloze-blank input');
          const currentIdx = Array.from(allInputs).indexOf(activeInput);
          if (currentIdx < allInputs.length - 1) {
            e.preventDefault();
            allInputs[currentIdx + 1].focus();
          }
        }
      }
    });
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());