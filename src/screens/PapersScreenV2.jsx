import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, ArrowLeft } from 'lucide-react'
import { getValidatedBoard, BOARDS } from '../utils/boardConfig'

// Visual-only redesign of a past-papers list.
// Pedagogy untouched — every "Start / Resume / Review" CTA routes to the
// existing /timed-paper generator, which reads np_board from localStorage.

const TOPIC_COLOR = {
  Energy:      { bg: 'rgba(255,132,0,0.14)',  fg: '#ffa94d' },
  Forces:      { bg: 'rgba(155,89,182,0.18)', fg: '#c792e7' },
  Waves:       { bg: 'rgba(0,212,255,0.14)',  fg: '#4ad0ff' },
  Electricity: { bg: 'rgba(233,30,140,0.14)', fg: '#ff6fb2' },
  Magnetism:   { bg: 'rgba(120,110,220,0.16)',fg: '#a49bff' },
  Particles:   { bg: 'rgba(103,212,142,0.12)',fg: '#8be3a9' },
  Space:       { bg: 'rgba(110,160,255,0.14)',fg: '#9ab8ff' },
  Atomic:      { bg: 'rgba(255,184,92,0.14)', fg: '#ffb85c' },
  Practicals:  { bg: 'rgba(180,180,180,0.14)',fg: '#d4d4d4' },
}

const PAPERS = [
  { key:'aqa-p1',    title:'AQA Paper 1',                board:'AQA GCSE Physics',                   boardId:'aqa',    tier:'Higher · 35 marks',  duration:'55 min', topics:['Energy','Particles','Atomic','Electricity'], status:{kind:'not-started'} },
  { key:'aqa-p2',    title:'AQA Paper 2',                board:'AQA GCSE Physics',                   boardId:'aqa',    tier:'Higher · 35 marks',  duration:'55 min', topics:['Forces','Waves','Magnetism','Space'],         status:{kind:'not-started'} },
  { key:'edx-p1',    title:'Edexcel Paper 1',            board:'Edexcel Physics (1PH0)',             boardId:'edexcel',tier:'Higher · 35 marks',  duration:'55 min', topics:['Energy','Particles','Atomic','Electricity'], status:{kind:'not-started'} },
  { key:'edx-p2',    title:'Edexcel Paper 2',            board:'Edexcel Physics (1PH0)',             boardId:'edexcel',tier:'Higher · 35 marks',  duration:'55 min', topics:['Forces','Waves','Magnetism','Space'],         status:{kind:'not-started'} },
  { key:'ocra-p1',   title:'OCR Gateway A · Paper 1',    board:'OCR Gateway Physics A (J249)',       boardId:'ocr-a',  tier:'Higher · 35 marks',  duration:'55 min', topics:['Energy','Particles','Atomic','Electricity'], status:{kind:'not-started'} },
  { key:'ocra-p2',   title:'OCR Gateway A · Paper 2',    board:'OCR Gateway Physics A (J249)',       boardId:'ocr-a',  tier:'Higher · 35 marks',  duration:'55 min', topics:['Forces','Waves','Magnetism','Space'],         status:{kind:'not-started'} },
  { key:'ocrb-p1',   title:'OCR 21st Century · Paper 1', board:'OCR Twenty First Century B (J259)',  boardId:'ocr-b',  tier:'Higher · 35 marks',  duration:'55 min', topics:['Energy','Electricity','Particles'],          status:{kind:'not-started'} },
  { key:'ocrb-p2',   title:'OCR 21st Century · Paper 2', board:'OCR Twenty First Century B (J259)',  boardId:'ocr-b',  tier:'Higher · 35 marks',  duration:'55 min', topics:['Waves','Forces','Space'],                    status:{kind:'not-started'} },
  { key:'wjec-u1',   title:'WJEC · Unit 1',              board:'WJEC / Eduqas Physics',              boardId:'wjec',   tier:'Higher · 35 marks',  duration:'55 min', topics:['Energy','Electricity'],                       status:{kind:'not-started'} },
  { key:'wjec-u2',   title:'WJEC · Unit 2',              board:'WJEC / Eduqas Physics',              boardId:'wjec',   tier:'Higher · 35 marks',  duration:'55 min', topics:['Waves','Forces','Space'],                    status:{kind:'not-started'} },
  { key:'wjec-u3',   title:'WJEC · Unit 3',              board:'WJEC / Eduqas Physics',              boardId:'wjec',   tier:'Practical assessment', duration:'55 min', topics:['Practicals'],                              status:{kind:'not-started'} },
  { key:'ccea-u1',   title:'CCEA · Unit 1',              board:'CCEA GCSE Physics',                  boardId:'ccea',   tier:'A*–G · 35 marks',    duration:'55 min', topics:['Forces','Energy','Waves'],                    status:{kind:'not-started'} },
  { key:'ccea-u2',   title:'CCEA · Unit 2',              board:'CCEA GCSE Physics',                  boardId:'ccea',   tier:'A*–G · 35 marks',    duration:'55 min', topics:['Electricity','Magnetism','Atomic','Space'],   status:{kind:'not-started'} },
]

const FILTERS = [
  { id:'mine',    label:'My board' },
  { id:'all',     label:'All' },
  { id:'aqa',     label:'AQA' },
  { id:'edexcel', label:'Edexcel' },
  { id:'ocr',     label:'OCR' },
  { id:'wjec',    label:'WJEC' },
  { id:'ccea',    label:'CCEA' },
]

function Chip({ label }) {
  const c = TOPIC_COLOR[label] || TOPIC_COLOR.Practicals
  return (
    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: c.bg, color: c.fg }}>{label}</span>
  )
}

function StatusDisplay({ status }) {
  if (status.kind === 'completed') return (
    <span className="flex items-center gap-1.5 text-[12px]" style={{ color:'#b6ffce' }}>
      <CheckCircle2 size={14} strokeWidth={2.25} /> Completed · {status.percent}%
    </span>
  )
  if (status.kind === 'in-progress') return (
    <span className="text-[12px]" style={{ color:'#00d4ff' }}>
      In progress · {status.percent}%
    </span>
  )
  return <span className="text-[12px]" style={{ color:'#9fa7bd' }}>Not attempted</span>
}

function ActionButton({ status, onClick }) {
  const isStart = status.kind === 'not-started'
  const label = isStart ? 'Start' : status.kind === 'in-progress' ? 'Resume' : 'Review'
  return (
    <button type="button" onClick={onClick}
      className="h-9 px-4 rounded-full text-[13px] font-semibold shrink-0 transition-opacity active:opacity-80 flex items-center"
      style={{
        background: isStart ? '#00d4ff' : 'rgba(255,255,255,0.06)',
        color:      isStart ? '#042031' : '#e6ecf8',
      }}>
      {label}
    </button>
  )
}

function PaperRow({ paper, onStart }) {
  return (
    <article className="rounded-[16px] border p-4 flex flex-col gap-3"
      style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px' }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold leading-tight" style={{ color:'#e6ecf8' }}>{paper.title}</h3>
          <div className="text-[12px] mt-1" style={{ color:'#9fa7bd' }}>{paper.board} · {paper.tier}</div>
        </div>
        <span className="flex items-center gap-1 px-2.5 h-7 rounded-full text-[11px] font-medium shrink-0"
          style={{ background:'rgba(255,255,255,0.06)', color:'#9fa7bd' }}>
          <Clock size={11} strokeWidth={2.25} /> {paper.duration}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {paper.topics.map(t => <Chip key={t} label={t} />)}
      </div>
      <div className="flex items-center justify-between gap-3">
        <StatusDisplay status={paper.status} />
        <ActionButton status={paper.status} onClick={() => onStart(paper)} />
      </div>
    </article>
  )
}

export default function PapersScreenV2() {
  const navigate = useNavigate()
  const myBoardId = getValidatedBoard()
  const myBoardName = BOARDS[myBoardId]?.name || ''
  const [filter, setFilter] = useState('mine')

  const visible = useMemo(() => {
    if (filter === 'all')  return PAPERS
    if (filter === 'mine') return PAPERS.filter(p => p.boardId === myBoardId)
    if (filter === 'ocr')  return PAPERS.filter(p => p.boardId === 'ocr-a' || p.boardId === 'ocr-b')
    return PAPERS.filter(p => p.boardId === filter)
  }, [filter, myBoardId])

  const handleStart = () => {
    // Pedagogy untouched: /timed-paper reads np_board from localStorage and
    // generates a 35-mark mini-paper for the current board.
    navigate('/timed-paper')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background:'#080f1e', color:'#e6ecf8' }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-20 px-5 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-3"
        style={{
          background: 'rgba(8,15,30,0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '0.75px solid rgba(255,255,255,0.06)',
        }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center active:opacity-80"
            style={{ background:'rgba(255,255,255,0.06)', border:'0.75px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[22px] font-semibold leading-tight">Past Papers</h1>
            <p className="text-[12px]" style={{ color:'#9fa7bd' }}>Generated 35-mark mini-papers · timed</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 flex flex-col gap-5"
        style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1">
          {FILTERS.map(f => {
            const active = filter === f.id
            const label = f.id === 'mine' ? `My board · ${myBoardName.split(' ')[0]}` : f.label
            return (
              <button key={f.id} type="button" onClick={() => setFilter(f.id)}
                className="px-4 h-9 rounded-full text-[13px] font-medium shrink-0 transition-colors"
                style={{
                  background: active ? '#00d4ff' : 'rgba(255,255,255,0.04)',
                  border: '0.75px solid ' + (active ? '#00d4ff' : 'rgba(255,255,255,0.08)'),
                  color: active ? '#042031' : '#e6ecf8',
                }}>
                {label}
              </button>
            )
          })}
        </div>

        {/* Paper list */}
        <div className="flex flex-col gap-3">
          {visible.map(p => <PaperRow key={p.key} paper={p} onStart={handleStart} />)}
          {visible.length === 0 && (
            <div className="rounded-[16px] border p-6 text-center text-[13px]"
              style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px', color:'#9fa7bd' }}>
              No papers for this board yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
