'use client'

import { useState } from 'react'
import TabSystem from '@/components/tools/TabSystem'
import Tooltip from '@/components/tools/Tooltip'

// Sample data for HSK 1-4
const HSK_DATA = {
  HSK1: [
    { hanzi: '我', pinyin: 'wǒ', translation: 'I, me' },
    { hanzi: '你', pinyin: 'nǐ', translation: 'You' },
    { hanzi: '好', pinyin: 'hǎo', translation: 'Good, well' },
  ],
  HSK2: [
    { hanzi: '报纸', pinyin: 'bàozhǐ', translation: 'Newspaper' },
    { hanzi: '公共汽车', pinyin: 'gōnggòngqìchē', translation: 'Bus' },
  ],
  HSK3: [
    { hanzi: '办法', pinyin: 'bànfǎ', translation: 'Method, way' },
    { hanzi: '其实', pinyin: 'qíshí', translation: 'Actually, in fact' },
  ],
  HSK4: [
    { hanzi: '偶尔', pinyin: 'ǒu\'ěr', translation: 'Occasionally' },
    { hanzi: '恐怕', pinyin: 'kǒngpà', translation: 'I am afraid that...' },
  ]
}

function HskVocabView() {
  const [level, setLevel] = useState<'HSK1' | 'HSK2' | 'HSK3' | 'HSK4'>('HSK1')

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {['HSK1', 'HSK2', 'HSK3', 'HSK4'].map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l as 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4')}
            className={`px-4 py-2 border text-xs ${level === l ? 'border-primary text-primary' : 'border-outline/30 text-foreground/50'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {HSK_DATA[level].map((item, i) => (
          <div key={i} className="ascii-border p-4 bg-surface/50 text-center">
            <Tooltip
              word={item.hanzi}
              definition={item.translation}
              partOfSpeech="HSK Word"
              phonetic={item.pinyin}
            >
              <div className="text-3xl mb-2">{item.hanzi}</div>
            </Tooltip>
            <div className="text-xs text-primary">{item.pinyin}</div>
            <div className="text-[10px] opacity-50 mt-1">{item.translation}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-surface border border-outline/20">
        <h3 className="text-sm font-bold mb-4 text-primary">SENTENCE_ANALYZER_3.0</h3>
        <p className="text-xl leading-loose">
          <Tooltip word="我" definition="I, me" phonetic="wǒ">我</Tooltip>
          <Tooltip word="其实" definition="actually" phonetic="qíshí">其实</Tooltip>
          <Tooltip word="好" definition="good" phonetic="hǎo">好</Tooltip>
          。
        </p>
      </div>
    </div>
  )
}

function HskQuizView() {
  return (
    <div className="ascii-border p-12 text-center bg-surface/30">
      <div className="text-primary text-xl mb-4 font-bold">HSK_ADAPTIVE_TESTING</div>
      <p className="opacity-60 mb-8 font-chinese">准备好了吗？(Ready?)</p>
      <button className="bg-primary text-on-primary px-8 py-3 hover:opacity-90">
        START_ASSESSMENT
      </button>
    </div>
  )
}

function HskAnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="ascii-border p-4">
          <div className="text-[10px] opacity-50 uppercase">Character Mastery</div>
          <div className="flex items-center gap-4 mt-2">
            <div className="text-3xl font-bold text-primary">452</div>
            <div className="flex-grow bg-outline/20 h-2">
              <div className="bg-primary h-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
        <div className="ascii-border p-4">
          <div className="text-[10px] opacity-50 uppercase">Pinyin Precision</div>
          <div className="text-3xl font-bold text-primary">92%</div>
        </div>
      </div>
      <div className="ascii-border p-4 bg-red-500/5 border-red-500/20">
        <div className="text-[10px] text-red-500 font-bold mb-2">FAILURE_QUEUE (RECENT_ERRORS)</div>
        <div className="flex gap-4 flex-wrap">
          {['恐怕', '偶尔', '其实'].map(w => (
            <span key={w} className="px-2 py-1 bg-red-500/20 text-red-500 text-xs border border-red-500/30">{w}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HskCscaTool() {
  const tabs = [
    { id: 'vocab', label: 'Vocabularies', component: <HskVocabView /> },
    { id: 'quizzes', label: 'Quizzes', component: <HskQuizView /> },
    { id: 'analytics', label: 'Analytics', component: <HskAnalyticsView /> }
  ]

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto font-mono">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center">
          <span className="mr-4">/</span> HSK_3.0_CSCA.STUDY_TOOL
        </h1>
        <p className="opacity-50 text-sm">HSK Bands 1-4 • Hanzi + Pinyin + Translation</p>
      </div>

      <TabSystem tabs={tabs} />
    </div>
  )
}
