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
    q: 'u have just woekn up. what is the first thing u do?',
    options: [
      'excercise',
      'have a good breakfast',
      'chat with freinds',
      'shower and pick your outfit for the day',
      'read your favourite novel/book',
      'stare at the wall',
    ],
  },
  {
    q: 'time to eat! pick your option',
    options: [
      'a protein-packed power meal',
      'a full spread — pancakes, eggs, the works',
      'brunch with the whole squad',
      'something aesthetic and photogenic',
      'a cozy meal with a book in hand',
      "whatever's in the fridge, you'll figure it out",
    ],
  },
  {
    q: 'the afternoon is yours. what are you up to?',
    options: [
      'hitting the gym or going for a run',
      'trying out a new café or bakery',
      'hanging out with friends, no plan needed',
      'exploring the city and taking photos',
      'getting lost in a bookstore or library',
      'lying down and doing absolutely nothing',
    ],
  },
  {
    q: "you've got some free time. what sounds best?",
    options: [
      'a hike or outdoor adventure',
      'cooking a fancy meal from scratch',
      'a group game night',
      'curating your playlist or mood board',
      'writing in your journal or reading poetry',
      'staring at the ceiling, thinking about life',
    ],
  },
  {
    q: 'evening plans?',
    options: [
      'a workout session or evening jog',
      'dinner at a nice restaurant',
      'a party or gathering with friends',
      'dressing up and going somewhere beautiful',
      'a quiet night with a movie and snacks',
      'sitting alone, watching the sky change colors',
    ],
  },
  {
    q: 'how do you wind down before bed?',
    options: [
      'some light stretching or yoga',
      'a warm cup of tea and a snack',
      'a long phone call with a friend',
      'a skincare routine and self-care',
      'reading until you fall asleep',
      'just... existing, in the silence',
    ],
  },
  {
    q: 'your perfect day ends with...',
    options: [
      'a sense of accomplishment — you did a lot today',
      'a satisfied stomach and a happy heart',
      'memories made with people you love',
      'a beautiful moment you will remember forever',
      'a good story that stayed with you',
      'peace, quiet, and nothing in particular',
    ],
  },
]

const app = document.querySelector('#app')
let currentQ = 0
let scores = [0, 0, 0, 0, 0, 0]

function renderIntro() {
  app.innerHTML = `
    <div class="quiz-card">
      <h1 class="intro-title">today is your perfect day!</h1>
      <p class="intro-subtitle">answer the following questions so that we can judge u for that</p>
      <button class="btn btn-primary" id="start-btn">let's go</button>
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
  const progress = ((currentQ) / questions.length) * 100
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']

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
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `

  document.querySelectorAll('.option').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const opt = parseInt(e.currentTarget.dataset.opt, 10)
      scores[opt]++
      currentQ++
      if (currentQ < questions.length) {
        renderQuestion()
      } else {
        renderResult()
      }
    })
  })
}

function renderResult() {
  const max = Math.max(...scores)
  const winner = scores.indexOf(max)

  const chips = scores.map((count, i) =>
    `<span class="stat-chip ${i === winner ? 'winner' : ''}">${personalities[i].emoji} ${count}</span>`
  ).join('')

  app.innerHTML = `
    <div class="quiz-card">
      <div class="result">
        <div class="result-emoji">${personalities[winner].emoji}</div>
        <h1 class="result-type">${personalities[winner].name}</h1>
        <p class="result-tagline">${personalities[winner].tagline}</p>
        <p class="result-desc">${personalities[winner].desc}</p>
        <div class="result-stats">${chips}</div>
        <button class="btn btn-primary" id="restart-btn">take it again</button>
      </div>
    </div>
  `

  document.querySelector('#restart-btn').addEventListener('click', renderIntro)
}

renderIntro()

