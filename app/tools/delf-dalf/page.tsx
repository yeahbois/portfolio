'use client'

import { useState } from 'react'
import TabSystem from '@/components/tools/TabSystem'
import Tooltip from '@/components/tools/Tooltip'

// Sample data for B2/C1
const VOCAB_DATA = {
  B2: [
    { word: 'Cependant', definition: 'Nevertheless, however.', pos: 'Adverb', phonetic: 'sə.pɑ̃.dɑ̃' },
    { word: 'Améliorer', definition: 'To improve or make better.', pos: 'Verb', phonetic: 'a.me.ljo.re' },
    { word: 'Quotidien', definition: 'Daily or everyday life.', pos: 'Adjective', phonetic: 'ko.ti.djɛ̃' },
  ],
  C1: [
    { word: 'Nonobstant', definition: 'Notwithstanding, despite.', pos: 'Preposition', phonetic: 'nɔ.nɔp.stɑ̃' },
    { word: 'Épistémologie', definition: 'The theory of knowledge.', pos: 'Noun', phonetic: 'e.pis.te.mɔ.lɔ.ʒi' },
    { word: 'Paradoxe', definition: 'A self-contradictory statement.', pos: 'Noun', phonetic: 'pa.ʁa.dɔks' },
  ]
}

function VocabView() {
  const [level, setLevel] = useState<'B2' | 'C1'>('B2')

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setLevel('B2')}
          className={`px-4 py-2 border ${level === 'B2' ? 'border-primary text-primary' : 'border-outline/30 text-foreground/50'}`}
        >
          LEVEL_B2
        </button>
        <button
          onClick={() => setLevel('C1')}
          className={`px-4 py-2 border ${level === 'C1' ? 'border-primary text-primary' : 'border-outline/30 text-foreground/50'}`}
        >
          LEVEL_C1
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VOCAB_DATA[level].map((item, i) => (
          <div key={i} className="ascii-border p-4 bg-surface/50">
            <Tooltip
              word={item.word}
              definition={item.definition}
              partOfSpeech={item.pos}
              phonetic={item.phonetic}
            >
              <span className="text-lg font-bold text-primary">{item.word}</span>
            </Tooltip>
            <div className="text-xs opacity-50 mt-1">[{item.phonetic}] • {item.pos}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-surface border border-outline/20">
        <h3 className="text-sm font-bold mb-4 text-primary">CONTEXTUAL_VIEWPORT</h3>
        <p className="leading-relaxed">
          Lors de l&apos;examen, il est essentiel d&apos;{' '}
          <Tooltip word="améliorer" definition="To improve" partOfSpeech="Verb" phonetic="a.me.ljo.re">
            améliorer
          </Tooltip>{' '}
          votre expression écrite. {' '}
          <Tooltip word="Cependant" definition="However" partOfSpeech="Adverb" phonetic="sə.pɑ̃.dɑ̃">
            Cependant
          </Tooltip>
          , le jury attend une analyse plus profonde, un véritable {' '}
          <Tooltip word="paradoxe" definition="Paradox" partOfSpeech="Noun" phonetic="pa.ʁa.dɔks">
            paradoxe
          </Tooltip>{' '}
          dans la structure argumentative.
        </p>
      </div>
    </div>
  )
}

function QuizView() {
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const quizWords = [
    { word: 'Cependant', answer: 'However' },
    { word: 'Améliorer', answer: 'To improve' },
    { word: 'Quotidien', answer: 'Daily' }
  ];

  if (step >= quizWords.length) {
    return (
      <div className="ascii-border p-12 text-center bg-surface/30">
        <div className="text-primary text-xl mb-4 font-bold">SESSION_COMPLETE</div>
        <p className="opacity-60 mb-8">All nodes processed successfully.</p>
        <button onClick={() => setStep(0)} className="bg-primary text-on-primary px-8 py-3 hover:opacity-90">
          RESTART_MODULE
        </button>
      </div>
    );
  }

  return (
    <div className="ascii-border p-12 text-center bg-surface/30 max-w-2xl mx-auto">
      <div className="text-[10px] opacity-50 mb-4">FLASHCARD_NODE [{step + 1}/{quizWords.length}]</div>
      <div className="text-4xl font-bold mb-8">{quizWords[step].word}</div>

      {showAnswer ? (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="text-primary text-xl mb-8 border-t border-primary/20 pt-8">
            {quizWords[step].answer}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => { setStep(step + 1); setShowAnswer(false); }}
              className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10"
            >
              AGAIN (RECALL_FAIL)
            </button>
            <button
              onClick={() => { setStep(step + 1); setShowAnswer(false); }}
              className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500/10"
            >
              GOOD (RECALL_SUCCESS)
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAnswer(true)}
          className="bg-primary text-on-primary px-8 py-3 hover:opacity-90"
        >
          SHOW_DECRYPTION
        </button>
      )}
    </div>
  )
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="ascii-border p-4">
          <div className="text-[10px] opacity-50">WORDS_MASTERED</div>
          <div className="text-2xl font-bold text-primary">124 / 850</div>
        </div>
        <div className="ascii-border p-4">
          <div className="text-[10px] opacity-50">QUIZ_ACCURACY</div>
          <div className="text-2xl font-bold text-primary">88.5%</div>
        </div>
        <div className="ascii-border p-4">
          <div className="text-[10px] opacity-50">STREAK_DAYS</div>
          <div className="text-2xl font-bold text-primary">12_DAYS</div>
        </div>
      </div>
      <div className="ascii-border p-6 h-48 flex items-end gap-2 px-8">
        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
          <div key={i} className="flex-1 bg-primary/30 border-t border-primary" style={{ height: `${h}%` }}></div>
        ))}
      </div>
    </div>
  )
}

export default function DelfDalfTool() {
  const tabs = [
    { id: 'vocab', label: 'Vocabularies', component: <VocabView /> },
    { id: 'quizzes', label: 'Quizzes', component: <QuizView /> },
    { id: 'analytics', label: 'Analytics', component: <AnalyticsView /> }
  ]

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto font-mono">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center">
          <span className="mr-4">/</span> DELF_DALF.STUDY_TOOL
        </h1>
        <p className="opacity-50 text-sm">Targeting CEFR B2 & C1 Proficiency Bands</p>
      </div>

      <TabSystem tabs={tabs} />
    </div>
  )
}
