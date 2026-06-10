import { useRef, useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAI } from '../../hooks/useAI';
import { AI_CHIPS } from '../../lib/constants';
import s from './AiPanel.module.css';

export default function AiPanel({ open, onClose }) {
  const messages = useStore(st => st.messages);
  const loading  = useStore(st => st.aiLoading);
  const { ask }  = useAI();

  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function handleSend() {
    const t = text.trim();
    if (!t || loading) return;
    setText('');
    ask(t);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <aside className={`${s.panel} ${open ? s.panelOpen : ''}`}>
      <div className={s.header}>
        <div className={s.dot} />
        <span className={s.headerTitle}>AI-асистент</span>
        <small className={s.headerSub}>Groq · Llama 3.3</small>
        <button className={s.closeBtn} onClick={onClose} aria-label="Закрити AI-асистент">
          <i className="ti ti-x" />
        </button>
      </div>

      <div className={s.messages}>
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className={s.chips}>
        {AI_CHIPS.map(chip => (
          <button key={chip} className={s.chip} onClick={() => ask(chip)}>
            {chip}
          </button>
        ))}
      </div>

      <div className={s.inputRow}>
        <textarea
          className={s.textarea}
          placeholder="Запитати AI..."
          rows={1}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className={s.sendBtn} onClick={handleSend} disabled={loading}>
          <i className="ti ti-send" style={{ fontSize: 14 }} />
        </button>
      </div>
    </aside>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`${s.msg} ${isUser ? s.msgUser : ''}`}>
      <div className={s.bubble}>{msg.text}</div>
      <div className={s.time}>{msg.ts}</div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className={s.msg}>
      <div className={s.bubble}>
        <div className={s.typing}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
