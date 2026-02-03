import { useState } from 'react';

const sections = [
  {
    id: 'foundation',
    title: 'Organizational Foundation',
    weight: 0.2,
    icon: '🏛️',
    questions: [
      { q: "How clearly defined are your organization's top 3 strategic priorities for the next 12 months?", options: ["Not defined", "Somewhat clear", "Very clear"] },
      { q: "Has your leadership team discussed AI as a potential tool?", options: ["No discussion", "Some curiosity", "Active interest"] },
      { q: "How would you describe your organization's comfort with trying new technologies?", options: ["Risk-averse", "Cautiously open", "Early adopter"] },
      { q: "How has your organization handled major technology changes in the past?", options: ["Struggled significantly", "Managed with challenges", "Adapted smoothly"] }
    ]
  },
  {
    id: 'data',
    title: 'Data Maturity',
    weight: 0.25,
    icon: '📊',
    questions: [
      { q: "Where does your organization store its most important data?", options: ["Paper/scattered files", "Spreadsheets", "Dedicated software/CRM"] },
      { q: "How confident are you in the accuracy and completeness of your data?", options: ["Not confident", "Somewhat confident", "Very confident"] },
      { q: "Could you export your key program data into a single file within a week?", options: ["No", "With significant effort", "Yes, easily"] },
      { q: "How many years of historical data do you have access to?", options: ["Less than 1 year", "1-3 years", "More than 3 years"] }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Infrastructure',
    weight: 0.15,
    icon: '⚙️',
    questions: [
      { q: "Are your core systems cloud-based?", options: ["No, mostly local", "Partially", "Yes, fully cloud"] },
      { q: "How easily can you move data between your systems?", options: ["Very difficult", "Some manual work", "Seamlessly integrated"] },
      { q: "Do you have documented security policies and regular backups?", options: ["No", "Informal practices", "Yes, documented"] },
      { q: "Who handles technical issues for your organization?", options: ["No dedicated support", "Part-time/volunteer", "Dedicated IT support"] }
    ]
  },
  {
    id: 'human',
    title: 'Human Capacity',
    weight: 0.2,
    icon: '👥',
    questions: [
      { q: "How comfortable is your team with using data to make decisions?", options: ["Not comfortable", "Somewhat comfortable", "Very comfortable"] },
      { q: "Does anyone on your team have experience with data analysis or automation tools?", options: ["No", "Basic experience", "Yes, skilled"] },
      { q: "How many hours per week could staff dedicate to learning new tools?", options: ["None", "1-3 hours", "4+ hours"] },
      { q: "Is there someone who would be excited to champion an AI initiative?", options: ["No one comes to mind", "Possibly", "Yes, definitely"] }
    ]
  },
  {
    id: 'usecase',
    title: 'Use Case Clarity',
    weight: 0.1,
    icon: '🎯',
    questions: [
      { q: "How well do you understand which tasks consume the most staff time?", options: ["Not clear", "General sense", "Well documented"] },
      { q: "Do you have processes that feel manual, repetitive, or error-prone?", options: ["Not sure", "A few", "Many identified"] },
      { q: "How do you currently measure and report your impact?", options: ["Minimal tracking", "Basic metrics", "Comprehensive M&E"] },
      { q: "Do you have a specific problem you think AI could help solve?", options: ["No idea", "Some thoughts", "Clear use case in mind"] }
    ]
  },
  {
    id: 'ethics',
    title: 'Ethical Readiness',
    weight: 0.1,
    icon: '⚖️',
    questions: [
      { q: "How familiar is your team with potential risks of AI (bias, privacy)?", options: ["Not familiar", "Somewhat aware", "Well informed"] },
      { q: "Do you serve vulnerable populations who could be affected by AI decisions?", options: ["Yes, very vulnerable", "Somewhat sensitive", "Low sensitivity"] },
      { q: "How important is it that you can explain AI-driven decisions to stakeholders?", options: ["Not considered", "Somewhat important", "Critical"] },
      { q: "Does your organization have any ethics review process for new initiatives?", options: ["No", "Informal", "Formal process"] }
    ]
  }
];

const levelDescriptions = {
  foundation: {
    title: "Foundation Building",
    color: "#C4745A",
    bgColor: "#FAF8F5",
    advice: "Focus on data basics and building organizational literacy before implementing AI. Start with simple automation tools. A discovery call can help you develop a practical roadmap."
  },
  explorer: {
    title: "Early Explorer",
    color: "#D4A84B",
    bgColor: "#FAF8F5",
    advice: "You're ready to pilot a low-risk AI use case. Invest in team training and identify a clear champion. Let's discuss how to structure your first initiative for success."
  },
  ready: {
    title: "Ready to Scale",
    color: "#2D4739",
    bgColor: "#FAF8F5",
    advice: "Your organization is well-positioned for strategic AI projects. Focus on governance and measuring impact. A strategy session could help you prioritize the highest-value opportunities."
  },
  mature: {
    title: "AI Ready",
    color: "#87A878",
    bgColor: "#FAF8F5",
    advice: "You have strong foundations. Consider ambitious AI initiatives and sharing your learnings with the sector. Let's explore how to accelerate your impact."
  }
};

export default function AIReadinessAssessment() {
  const [step, setStep] = useState('intro');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');

  const handleAnswer = (value) => {
    const key = `${sections[currentSection].id}-${currentQuestion}`;
    setAnswers({ ...answers, [key]: value });

    if (currentQuestion < sections[currentSection].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      setStep('results');
    }
  };

  const calcScores = () => {
    const sectionScores = sections.map(section => {
      let total = 0;
      section.questions.forEach((_, qIdx) => {
        const key = `${section.id}-${qIdx}`;
        total += (answers[key] || 0) + 1;
      });
      return { id: section.id, title: section.title, icon: section.icon, score: total / section.questions.length, weight: section.weight };
    });
    const overall = sectionScores.reduce((acc, s) => acc + (s.score * s.weight), 0);
    return { sectionScores, overall };
  };

  const getLevel = (score) => {
    if (score <= 1.5) return levelDescriptions.foundation;
    if (score <= 2.2) return levelDescriptions.explorer;
    if (score <= 2.7) return levelDescriptions.ready;
    return levelDescriptions.mature;
  };

  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Branding colors matching site
  const forestDeep = '#2D4739';
  const sage = '#87A878';
  const terracotta = '#C4745A';
  const morningGold = '#D4A84B';
  const softCream = '#FAF8F5';
  const warmStone = '#E8E0D5';
  const deepEarth = '#3D3D3D';

  const gradientBg = { background: `linear-gradient(135deg, ${forestDeep} 0%, ${sage} 100%)` };

  if (step === 'intro') {
    return (
      <div style={{ minHeight: '100vh', background: softCream, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%', padding: '2.5rem', border: `1px solid ${warmStone}` }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ ...gradientBg, width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>🤖</div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: forestDeep, marginBottom: '0.5rem', fontFamily: "'Fraunces', Georgia, serif" }}>AI Readiness Assessment</h1>
            <p style={{ color: terracotta, fontWeight: '600', fontSize: '0.95rem' }}>For Mission-Driven Organizations</p>
          </div>

          <div style={{ background: '#FAF8F5', borderLeft: `4px solid ${terracotta}`, borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.95rem', color: deepEarth, margin: 0, lineHeight: '1.6' }}>Discover where your organization stands on the AI journey and get personalized recommendations. Takes about 5 minutes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {sections.map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: deepEarth, fontSize: '0.85rem' }}>
                <span>{s.icon}</span><span style={{ fontWeight: '500' }}>{s.title}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Organization name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: `2px solid ${warmStone}`, borderRadius: '8px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
              onFocus={(e) => e.target.style.borderColor = forestDeep}
              onBlur={(e) => e.target.style.borderColor = warmStone}
            />
            <input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: `2px solid ${warmStone}`, borderRadius: '8px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
              onFocus={(e) => e.target.style.borderColor = forestDeep}
              onBlur={(e) => e.target.style.borderColor = warmStone}
            />
          </div>

          <button
            onClick={() => setStep('questions')}
            disabled={!email || !orgName}
            style={{
              ...gradientBg,
              width: '100%',
              color: softCream,
              padding: '1rem 2.5rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: email && orgName ? 'pointer' : 'not-allowed',
              opacity: email && orgName ? 1 : 0.5,
              transition: 'transform 0.3s, box-shadow 0.3s',
              fontFamily: "'Source Sans 3', system-ui, sans-serif"
            }}
            onMouseOver={(e) => { if(email && orgName) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 16px rgba(45, 71, 57, 0.2)'; }}}
            onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
          >
            Start Assessment →
          </button>

          <p style={{ fontSize: '0.75rem', color: deepEarth, textAlign: 'center', marginTop: '1rem', opacity: 0.6 }}>Your information is kept confidential and used only to send your results.</p>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const section = sections[currentSection];
    const question = section.questions[currentQuestion];

    return (
      <div style={{ minHeight: '100vh', background: softCream, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '550px', width: '100%', padding: '2.5rem', border: `1px solid ${warmStone}` }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: terracotta, fontWeight: '600' }}>{section.icon} {section.title}</span>
              <span style={{ fontSize: '0.85rem', color: deepEarth, opacity: 0.7 }}>{answeredQuestions + 1} of {totalQuestions}</span>
            </div>
            <div style={{ width: '100%', background: warmStone, borderRadius: '10px', height: '8px' }}>
              <div style={{ ...gradientBg, height: '8px', borderRadius: '10px', transition: 'width 0.3s', width: `${progress}%` }}></div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: forestDeep, marginBottom: '1.5rem', lineHeight: '1.5', fontFamily: "'Fraunces', Georgia, serif" }}>{question.q}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 1.25rem',
                  border: `2px solid ${warmStone}`,
                  borderRadius: '8px',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: '1rem'
                }}
                onMouseOver={(e) => { e.target.style.borderColor = forestDeep; e.target.style.background = '#FAF8F5'; }}
                onMouseOut={(e) => { e.target.style.borderColor = warmStone; e.target.style.background = 'white'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2px solid ${forestDeep}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '600', color: forestDeep, flexShrink: 0 }}>{idx + 1}</div>
                  <span style={{ color: deepEarth }}>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    const { sectionScores, overall } = calcScores();
    const level = getLevel(overall);

    return (
      <div style={{ minHeight: '100vh', background: softCream, padding: '2rem', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2.5rem', marginBottom: '1.5rem', border: `1px solid ${warmStone}` }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: forestDeep, marginBottom: '0.25rem', fontFamily: "'Fraunces', Georgia, serif" }}>Your AI Readiness Results</h1>
              <p style={{ color: deepEarth, opacity: 0.7 }}>{orgName}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="80" cy="80" r="70" stroke={warmStone} strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="70" stroke="url(#siteGradient)" strokeWidth="12" fill="none" strokeDasharray={`${(overall / 3) * 440} 440`} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="siteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={forestDeep} />
                      <stop offset="100%" stopColor={sage} />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '700', color: forestDeep }}>{overall.toFixed(1)}</span>
                  <span style={{ fontSize: '0.9rem', color: deepEarth, opacity: 0.7 }}>out of 3.0</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', background: level.bgColor, color: level.color, fontWeight: '600', border: `2px solid ${level.color}20` }}>
              {level.title}
            </div>

            <p style={{ color: deepEarth, textAlign: 'center', marginBottom: '2rem', lineHeight: '1.6', opacity: 0.8 }}>{level.advice}</p>

            <div>
              <h3 style={{ fontWeight: '600', color: forestDeep, marginBottom: '1rem', fontFamily: "'Fraunces', Georgia, serif" }}>Breakdown by Area</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sectionScores.map(s => (
                  <div key={s.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: deepEarth, opacity: 0.8 }}>{s.icon} {s.title}</span>
                      <span style={{ fontWeight: '600', color: forestDeep }}>{s.score.toFixed(1)}/3</span>
                    </div>
                    <div style={{ width: '100%', background: warmStone, borderRadius: '10px', height: '8px' }}>
                      <div style={{ ...gradientBg, height: '8px', borderRadius: '10px', width: `${(s.score / 3) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2.5rem', border: `1px solid ${warmStone}` }}>
            <h3 style={{ fontWeight: '600', color: forestDeep, marginBottom: '1rem', fontFamily: "'Fraunces', Georgia, serif" }}>🚀 Recommended Next Steps</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {sectionScores.filter(s => s.score < 2).slice(0, 3).map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: '#FAF8F5', borderRadius: '8px', borderLeft: `4px solid ${terracotta}` }}>
                  <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                  <div>
                    <span style={{ fontWeight: '600', color: forestDeep }}>Strengthen {s.title}</span>
                    <p style={{ fontSize: '0.9rem', color: deepEarth, margin: '0.25rem 0 0 0', opacity: 0.7 }}>This area needs attention before scaling AI initiatives.</p>
                  </div>
                </div>
              ))}
              {sectionScores.filter(s => s.score >= 2.5).slice(0, 2).map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: '#FAF8F5', borderRadius: '8px', borderLeft: `4px solid ${sage}` }}>
                  <span style={{ fontSize: '1.2rem' }}>✓</span>
                  <div>
                    <span style={{ fontWeight: '600', color: forestDeep }}>{s.title} is a strength</span>
                    <p style={{ fontSize: '0.9rem', color: deepEarth, margin: '0.25rem 0 0 0', opacity: 0.7 }}>Leverage this foundation as you move forward.</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${warmStone}`, paddingTop: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', color: forestDeep, marginBottom: '0.5rem', fontFamily: "'Fraunces', Georgia, serif" }}>Want personalized guidance?</h4>
              <p style={{ fontSize: '0.9rem', color: deepEarth, marginBottom: '1rem', lineHeight: '1.6', opacity: 0.8 }}>Book a consultation to discuss your results and explore how AI could amplify your mission.</p>
              <a
                href="https://app.cal.eu/z0l18qy88-mozmail.com/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...gradientBg,
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  color: softCream,
                  padding: '1rem 2.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: '1rem'
                }}
                onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 16px rgba(45, 71, 57, 0.2)'; }}
                onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
              >
                Book Discovery Call →
              </a>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: deepEarth, marginTop: '1.5rem', opacity: 0.6 }}>Results sent to {email}</p>
        </div>
      </div>
    );
  }
}
