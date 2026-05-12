import { useState } from 'react'
import { classifyAgent, CONTRACT_ADDRESS } from './genlayer'
import './App.css'

const ROLES = [
  { r: 'Molecule', c: '#eab308' }, { r: 'Mindbender', c: '#c4a484' },
  { r: 'Team', c: '#ef4444' }, { r: 'Discord Core', c: '#22d3ee' },
  { r: 'Synapse', c: '#3b82f6' }, { r: 'Neurocreative', c: '#4ade80' },
  { r: 'Global / Regional Moderator', c: '#f97316' }, { r: 'Brain', c: '#fc0fc0' },
  { r: 'Neurohost', c: '#fb7185' }, { r: 'Singularity', c: '#22c55e' },
  { r: 'Early Voyager', c: '#22c55e' }, { r: 'Neurobuilder', c: '#a5f3fc' },
  { r: 'Builders Core', c: '#d1d5db' }, { r: 'Builder Working Group', c: '#38bdf8' },
  { r: 'Certified Genfren', c: '#663399' }, { r: 'Validator', c: '#355e3b' },
  { r: 'Core', c: '#00a693' }, { r: 'Server Booster', c: '#c9a9f5' },
  { r: 'Nigerian', c: '#e5e7eb' }, { r: 'Chinese', c: '#e5e7eb' },
  { r: 'Indian', c: '#e5e7eb' }, { r: 'Latam', c: '#e5e7eb' },
]

const LEVEL_MAP = [
  { roles: ['Team'], lvl: 9, title: 'SUPREME OPERATOR', c: '#ef4444' },
  { roles: ['Discord Core'], lvl: 8, title: 'CORE AUTHORITY', c: '#22d3ee' },
  { roles: ['Global / Regional Moderator'], lvl: 7, title: 'NETWORK OVERSEER', c: '#f97316' },
  { roles: ['Singularity'], lvl: 6, title: 'PRIME ENTITY', c: '#22c55e' },
  { roles: ['Brain'], lvl: 5, title: 'STRATEGIC MIND', c: '#fc0fc0' },
  { roles: ['Neurocreative'], lvl: 4, title: 'VISION CRAFTER', c: '#4ade80' },
  { roles: ['Synapse'], lvl: 3, title: 'LOGIC NODE', c: '#3b82f6' },
  { roles: ['Molecule'], lvl: 2, title: 'RISING UNIT', c: '#eab308' },
]

function getLevel(roles: string[]) {
  for (const e of LEVEL_MAP) {
    if (e.roles.some(r => roles.includes(r))) return e
  }
  return { lvl: 1, title: 'ROGUE PROCESS', c: '#9B85FF' }
}

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function App() {
  const [handle, setHandle] = useState('')
  const [name, setName] = useState('')
  const [selRoles, setSelRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState<any>(null)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  const toggleRole = (r: string) => {
    setSelRoles(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  const classify = async () => {
    if (!handle) { setError('Please enter your X handle'); return }
    setError('')
    setLoading(true)
    setCard(null)
    try {
      const h = handle.startsWith('@') ? handle : '@' + handle
      const result = await classifyAgent(h, name || h, selRoles.join(', ') || 'none')
      setCard(result)
      setTxHash(result.txHash)
    } catch (e) {
      setError('Classification failed. Try again.')
    }
    setLoading(false)
  }

  const level = getLevel(selRoles)
  const hv = hashStr(handle.toLowerCase())
  const agentId = 'GL-' + Math.abs(hv).toString(16).toUpperCase().slice(0, 8).padStart(8, '0')

  return (
    <div style={{ minHeight: '100vh', background: '#06091F', color: '#F0F4FF', fontFamily: 'system-ui, sans-serif', padding: '1.5rem 1rem' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#22D3EE', marginBottom: 8, textTransform: 'uppercase' }}>GenLayer Oracle System</p>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', background: 'linear-gradient(135deg, #F0F4FF, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            You have been<br />classified.
          </h1>
          <p style={{ color: '#7B8BB8', fontSize: 14 }}>The Oracle evaluates your presence on GenLayer. Results are final.</p>
        </div>

        {/* Form */}
        {!card && (
          <div style={{ background: '#0B1235', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 20, padding: '1.5rem', marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.12em', color: '#22D3EE', marginBottom: 6, textTransform: 'uppercase' }}>X / Twitter Handle</label>
            <input value={handle} onChange={e => setHandle(e.target.value)} placeholder="@yourhandle"
              style={{ width: '100%', background: 'rgba(6,9,31,0.8)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 10, padding: '10px 14px', color: '#F0F4FF', fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box', fontFamily: 'monospace' }} />

            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.12em', color: '#22D3EE', marginBottom: 6, textTransform: 'uppercase' }}>Display Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name on X"
              style={{ width: '100%', background: 'rgba(6,9,31,0.8)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 10, padding: '10px 14px', color: '#F0F4FF', fontSize: 14, outline: 'none', marginBottom: 16, boxSizing: 'border-box', fontFamily: 'monospace' }} />

            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.12em', color: '#22D3EE', marginBottom: 8, textTransform: 'uppercase' }}>Discord Roles</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
              {ROLES.map(({ r, c }) => (
                <button key={r} onClick={() => toggleRole(r)}
                  style={{ padding: '4px 11px', borderRadius: 20, fontSize: 11, cursor: 'pointer', fontFamily: 'monospace', border: '1px solid', transition: 'all 0.15s',
                    background: selRoles.includes(r) ? `${c}22` : 'transparent',
                    borderColor: selRoles.includes(r) ? c : 'rgba(255,255,255,0.1)',
                    color: selRoles.includes(r) ? c : '#7B8BB8' }}>
                  {r}
                </button>
              ))}
            </div>

            {error && <p style={{ color: '#FF6B9D', fontSize: 12, fontFamily: 'monospace', marginBottom: 12 }}>{error}</p>}

            <button onClick={classify} disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: 100, background: '#22D3EE', color: '#06091F', border: 'none', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Consulting the Oracle...' : 'Consult the Oracle'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#3A4468', marginTop: 8, fontFamily: 'monospace' }}>Powered by GenLayer Intelligent Contracts</p>
          </div>
        )}

        {/* Card */}
        {card && (
          <div>
            <p style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.18em', color: '#22D3EE', marginBottom: 12, textTransform: 'uppercase', opacity: 0.7 }}>Oracle Classification Complete</p>

            <div id="agent-card" style={{ borderRadius: 26, background: 'linear-gradient(170deg, #0D1845 0%, #081130 40%, #060920 100%)', border: `2px solid ${level.c}44`, boxShadow: `0 0 50px ${level.c}44, 0 20px 60px rgba(0,0,0,0.6)`, padding: '1.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>

              {/* top strip */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${level.c}, #FF6B9D, #00E5CC)` }} />

              {/* identity */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem', marginTop: 8 }}>
                <img src={`https://unavatar.io/twitter/${handle.replace('@', '')}`}
                  onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || handle)}&background=${level.c.replace('#', '')}&color=fff&size=128` }}
                  style={{ width: 90, height: 90, borderRadius: '50%', border: `3px solid ${level.c}`, objectFit: 'cover', marginBottom: 12 }} />
                <p style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px', color: '#F0F4FF' }}>{name || handle}</p>
                <p style={{ fontSize: 13, fontFamily: 'monospace', color: level.c, margin: '0 0 10px' }}>{handle.startsWith('@') ? handle : '@' + handle}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 4 }}>
                  {selRoles.slice(0, 4).map(r => {
                    const def = ROLES.find(x => x.r === r)
                    const c = def?.c ?? '#9B85FF'
                    return <span key={r} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: `${c}22`, color: c, border: `1px solid ${c}44`, fontFamily: 'monospace' }}>{r}</span>
                  })}
                </div>
              </div>

              {/* role banner */}
              <div style={{ background: `${level.c}11`, border: `1px solid ${level.c}33`, borderRadius: 14, padding: '12px 16px', marginBottom: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.15em', color: level.c, marginBottom: 6, opacity: 0.8, textTransform: 'uppercase' }}>Assigned Role</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#F0F4FF', margin: 0 }}>{card.role}</p>
              </div>

              {/* panels */}
              {[
                { label: 'Power', val: card.power, color: '#22D3EE' },
                { label: 'Quirk', val: card.quirk, color: '#9B85FF' },
                { label: 'Lore Entry', val: card.lore, color: '#FF6B9D' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', marginBottom: 8 }}>
                  <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.12em', color, marginBottom: 4, textTransform: 'uppercase', opacity: 0.8 }}>{label}</p>
                  <p style={{ fontSize: 13, color: '#F0F4FF', margin: 0, lineHeight: 1.6, fontStyle: label === 'Lore Entry' ? 'italic' : 'normal' }}>{val}</p>
                </div>
              ))}

              {/* footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i < Math.round((level.lvl / 9) * 5) ? level.c : 'rgba(255,255,255,0.1)', boxShadow: i < Math.round((level.lvl / 9) * 5) ? `0 0 6px ${level.c}` : 'none' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: level.c, fontWeight: 700 }}>{level.title}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#3A4468', margin: 0 }}>{agentId}</p>
                  <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#3A4468', margin: 0, opacity: 0.4 }}>genlayer.com</p>
                </div>
              </div>
            </div>

            {/* tx hash */}
            {txHash && (
              <div style={{ background: '#0B1235', border: '1px solid rgba(34,211,238,0.1)', borderRadius: 12, padding: '10px 14px', marginBottom: 12 }}>
                <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#22D3EE', marginBottom: 4, letterSpacing: '0.1em' }}>ON-CHAIN TRANSACTION</p>
                <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#7B8BB8', margin: 0, wordBreak: 'break-all' }}>{txHash}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <button onClick={() => { const t = `The GenLayer Oracle just classified me as:\n\n"${card.role}"\nLevel: ${level.title}\n\nQuirk: ${card.quirk}\n\nGet yours → genlayer-oracle.vercel.app\n@genlayer #GenLayer`; window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(t), '_blank') }}
                style={{ padding: '12px', borderRadius: 100, background: level.c, color: '#06091F', border: 'none', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
                Post on X
              </button>
              <button onClick={() => { setCard(null); setHandle(''); setName(''); setSelRoles([]); setTxHash('') }}
                style={{ padding: '12px', borderRadius: 100, background: 'transparent', color: '#7B8BB8', border: '1px solid rgba(255,255,255,0.1)', fontSize: 14, cursor: 'pointer' }}>
                Try Another
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#3A4468', fontFamily: 'monospace' }}>
              Powered by GenLayer Intelligent Contract · {CONTRACT_ADDRESS.slice(0, 10)}...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
