const personalities = [
  {
    name: 'The Go-Getter',
    emoji: '🔥',
    tagline: 'You move, therefore you are.',
    desc: "You're powered by momentum. Your perfect day is full of action, sweat, and the satisfying ache of having done something. Stillness makes you itchy — there's always another mountain, another rep, another goal. People admire your drive, even if they can barely keep up.",
  },
  {
    name: 'The Comfort Seeker',
    emoji: '🍯',
    tagline: 'Life is best served warm.',
    desc: "You believe a good day is built from small, delicious moments — a full plate, a warm drink, a cozy corner. You don't need adventure to feel alive; you need flavor, texture, and the quiet joy of being full. You're the friend who always knows the best spot to eat.",
  },
  {
    name: 'The Social Butterfly',
    emoji: '🦋',
    tagline: "Everything's better together.",
    desc: "Your perfect day has a cast of characters. You light up around people — the group chat, the brunch table, the spontaneous plan. You collect memories and friendships like others collect things, and you'd rather have a chaotic day with friends than a perfect one alone.",
  },
  {
    name: 'The Aesthetic Soul',
    emoji: '🌅',
    tagline: 'Beauty is not optional.',
    desc: "You experience the world through how it looks, sounds, and feels. Your ideal day has a color palette, a soundtrack, a mood. You notice the light hitting a wall, the way an outfit comes together, the perfect song for the moment. Life, to you, is something to be curated.",
  },
  {
    name: 'The Dreamer',
    emoji: '📖',
    tagline: 'Reality is overrated.',
    desc: "Your mind is always somewhere else — in a story, a what-if, a world you built in your head. Your perfect day has room to wander, to read, to imagine. You feel things deeply and quietly, and you'd take a good book over a good party any day. The inner life is the real one.",
  },
  {
    name: 'The Deep Thinker',
    emoji: '🌌',
    tagline: 'In stillness, everything.',
    desc: "You're comfortable in the quiet. While others rush, you sit with things — thoughts, feelings, the slow movement of the sky. Your perfect day doesn't need to be full; it needs to be honest. People don't always get you, but the ones who do know there's a whole universe behind those eyes.",
  },
]

const questions = [
  {
    q: 'You have just woken up. What is the first thing you do?',
    options: [
      'Exercise — get the blood flowing',
      'Have a good breakfast',
      'Chat with friends',
      'Shower and pick your outfit for the day',
      'Read your favourite novel or book',
      'Stare at the wall',
    ],
  },
  {
    q: 'Time to eat! Pick your option',
    options: [
      'A protein-packed power meal',
      'A full spread — pancakes, eggs, the works',
      'Brunch with the whole squad',
      'Something aesthetic and photogenic',
      'A cozy meal with a book in hand',
      "Whatever's in the fridge, you'll figure it out",
    ],
  },
  {
    q: 'The afternoon is yours. What are you up to?',
    options: [
      'Hitting the gym or going for a run',
      'Trying out a new café or bakery',
      'Hanging out with friends, no plan needed',
      'Exploring the city and taking photos',
      'Getting lost in a bookstore or library',
      'Lying down and doing absolutely nothing',
    ],
  },
  {
    q: "You've got some free time. What sounds best?",
    options: [
      'A hike or outdoor adventure',
      'Cooking a fancy meal from scratch',
      'A group game night',
      'Curating your playlist or mood board',
      'Writing in your journal or reading poetry',
      'Staring at the ceiling, thinking about life',
    ],
  },
  {
    q: 'Evening plans?',
    options: [
      'A workout session or evening jog',
      'Dinner at a nice restaurant',
      'A party or gathering with friends',
      'Dressing up and going somewhere beautiful',
      'A quiet night with a movie and snacks',
      'Sitting alone, watching the sky change colors',
    ],
  },
  {
    q: 'How do you wind down before bed?',
    options: [
      'Some light stretching or yoga',
      'A warm cup of tea and a snack',
      'A long phone call with a friend',
      'A skincare routine and self-care',
      'Reading until you fall asleep',
      'Just... existing, in the silence',
    ],
  },
  {
    q: 'Your perfect day ends with...',
    options: [
      'A sense of accomplishment — you did a lot today',
      'A satisfied stomach and a happy heart',
      'Memories made with people you love',
      'A beautiful moment you will remember forever',
      'A good story that stayed with you',
      'Peace, quiet, and nothing in particular',
    ],
  },
]

const app = document.querySelector('#app')
let currentQ = 0
let scores = [0, 0, 0, 0, 0, 0]
let selectedOption = null

function renderIntro() {
  app.innerHTML = `
    <div class="quiz-card">
      <div class="intro-emoji">🌅</div>
      <h1 class="intro-title">Your Perfect Day</h1>
      <p class="intro-subtitle">Answer seven questions and discover your personality type. There are no wrong answers — just honest ones.</p>
      <button class="btn btn-primary" id="start-btn">Let's go</button>
    </div>
  `
  document.querySelector('#start-btn').addEventListener('click', () => {
    currentQ = 0
    scores = [0, 0, 0, 0, 0, 0]
    renderQuestion()
  })
}

function renderQuestion() {
  const q = questions[currentQ]
  const progress = (currentQ / questions.length) * 100
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']
  selectedOption = null

  app.innerHTML = `
    <div class="quiz-card">
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        <span class="progress-label">${currentQ + 1} / ${questions.length}</span>
      </div>
      <div class="question">
        <h2 class="question-text">${q.q}</h2>
        <div class="options">
          ${q.options.map((opt, i) => `
            <button class="btn option" data-opt="${i}">
              <span class="opt-letter">${letters[i]}</span>
              <span class="opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `

  document.querySelectorAll('.option').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const opt = parseInt(e.currentTarget.dataset.opt, 10)

      document.querySelectorAll('.option').forEach((b) => b.classList.remove('selected'))
      e.currentTarget.classList.add('selected')
      selectedOption = opt

      setTimeout(() => {
        scores[opt]++
        currentQ++
        if (currentQ < questions.length) {
          renderQuestion()
        } else {
          renderResult()
        }
      }, 350)
    })
  })
}

function renderResult() {
  const max = Math.max(...scores)
  const winner = scores.indexOf(max)

  const chips = scores.map((count, i) =>
    `<span class="stat-chip ${i === winner ? 'winner' : ''}">${personalities[i].emoji} ${personalities[i].name.split(' ').pop()} · ${count}</span>`
  ).join('')

  app.innerHTML = `
    <div class="quiz-card">
      <div class="result">
        <div class="result-emoji">${personalities[winner].emoji}</div>
        <h1 class="result-type">${personalities[winner].name}</h1>
        <p class="result-tagline">${personalities[winner].tagline}</p>
        <p class="result-desc">${personalities[winner].desc}</p>
        <div class="result-stats">${chips}</div>
        <button class="btn btn-primary" id="restart-btn">Take it again</button>
      </div>
    </div>
  `

  document.querySelector('#restart-btn').addEventListener('click', renderIntro)
}

renderIntro()

