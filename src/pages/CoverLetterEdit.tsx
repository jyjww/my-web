import { useState, useEffect } from 'react';

const STORAGE_KEY = 'coverLetterData';

interface Entry {
  id: string;
  title: string;
  content: string;
}

interface CoverLetterData {
  company: string;
  department: string;
  entries: Entry[];
}

const DEFAULT_ENTRIES: Entry[] = [
  { id: '1', title: '성장과정', content: '' },
  { id: '2', title: '성격의 장단점', content: '' },
  { id: '3', title: '지원동기', content: '' },
  { id: '4', title: '입사 후 포부', content: '' },
];

const EMPTY: CoverLetterData = {
  company: '',
  department: '',
  entries: DEFAULT_ENTRIES,
};

export default function CoverLetterEdit() {
  const [form, setForm] = useState<CoverLetterData>(EMPTY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setForm(JSON.parse(stored));
      } catch (_) {}
    }
  }, []);

  const setField = (field: 'company' | 'department', value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const setEntry = (id: string, field: 'title' | 'content', value: string) => {
    setForm(prev => ({
      ...prev,
      entries: prev.entries.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
    setSaved(false);
  };

  const addEntry = () => {
    const newEntry: Entry = { id: Date.now().toString(), title: '항목 제목', content: '' };
    setForm(prev => ({ ...prev, entries: [...prev.entries, newEntry] }));
    setSaved(false);
  };

  const removeEntry = (id: string) => {
    setForm(prev => ({ ...prev, entries: prev.entries.filter(e => e.id !== id) }));
    setSaved(false);
  };

  const moveEntry = (id: string, dir: -1 | 1) => {
    setForm(prev => {
      const arr = [...prev.entries];
      const idx = arr.findIndex(e => e.id === id);
      const next = idx + dir;
      if (next < 0 || next >= arr.length) return prev;
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return { ...prev, entries: arr };
    });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
  };

  const handlePreview = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    window.open(`${import.meta.env.BASE_URL}cv.html`, '_blank');
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm(EMPTY);
    setSaved(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4f0', padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Private</p>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1b548a', marginBottom: '6px' }}>자기소개서 에디터</h1>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>항목별로 내용을 작성하고 출력용 자기소개서로 미리보기합니다.</p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px 28px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>지원 회사</label>
              <input
                style={inputStyle}
                placeholder="예: 카카오"
                value={form.company}
                onChange={e => setField('company', e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>지원 부서 / 직군</label>
              <input
                style={inputStyle}
                placeholder="예: 백엔드 엔지니어"
                value={form.department}
                onChange={e => setField('department', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {form.entries.map((entry, idx) => {
            const charCount = entry.content.replace(/\s/g, '').length;
            return (
              <div key={entry.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px 28px' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: '#1b548a', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <input
                    style={{ ...inputStyle, fontWeight: 700, fontSize: '13px', flex: 1 }}
                    value={entry.title}
                    onChange={e => setEntry(entry.id, 'title', e.target.value)}
                    placeholder="항목 제목"
                  />
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button onClick={() => moveEntry(entry.id, -1)} disabled={idx === 0} style={arrowBtn(idx === 0)} title="위로">▲</button>
                    <button onClick={() => moveEntry(entry.id, 1)} disabled={idx === form.entries.length - 1} style={arrowBtn(idx === form.entries.length - 1)} title="아래로">▼</button>
                    <button onClick={() => removeEntry(entry.id)} disabled={form.entries.length <= 1} style={deleteBtn(form.entries.length <= 1)} title="삭제">✕</button>
                  </div>
                </div>

                <textarea
                  style={{ ...inputStyle, height: '160px', resize: 'vertical', lineHeight: '1.8' }}
                  placeholder="내용을 입력하세요."
                  value={entry.content}
                  onChange={e => setEntry(entry.id, 'content', e.target.value)}
                />

                <div style={{ marginTop: '6px', textAlign: 'right', fontSize: '11px', color: charCount > 900 ? '#dc2626' : charCount > 700 ? '#d97706' : '#9ca3af' }}>
                  {charCount > 0 ? (
                    <>
                      <span style={{ fontWeight: 600 }}>{charCount.toLocaleString()}</span>자
                      {charCount > 900 && <span style={{ marginLeft: '6px' }}>· 1,000자 초과 주의</span>}
                      {charCount > 700 && charCount <= 900 && <span style={{ marginLeft: '6px' }}>· 1,000자 근접</span>}
                    </>
                  ) : (
                    <span>공백 제외 0자</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        <button onClick={addEntry} style={addEntryBtn}>
          + 항목 추가
        </button>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px 28px', marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={handleSave} style={btnPrimary}>
            {saved ? '저장됨 ✓' : '저장'}
          </button>
          <button onClick={handlePreview} style={btnAccent}>
            미리보기 &amp; 출력 →
          </button>
          <button onClick={handleClear} style={btnGhost}>
            초기화
          </button>
        </div>

        <p style={{ marginTop: '14px', fontSize: '11px', color: '#9ca3af', textAlign: 'center' }}>
          내용은 이 브라우저의 localStorage에만 저장됩니다.
        </p>

      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  color: '#374151',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  fontSize: '13px',
  color: '#111827',
  outline: 'none',
  fontFamily: 'inherit',
  background: '#fafafa',
  boxSizing: 'border-box',
};

const arrowBtn = (disabled: boolean): React.CSSProperties => ({
  width: '26px',
  height: '26px',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  background: disabled ? '#f9fafb' : '#fff',
  color: disabled ? '#d1d5db' : '#6b7280',
  fontSize: '10px',
  cursor: disabled ? 'default' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'inherit',
  padding: 0,
});

const deleteBtn = (disabled: boolean): React.CSSProperties => ({
  width: '26px',
  height: '26px',
  border: '1px solid #fecaca',
  borderRadius: '4px',
  background: disabled ? '#f9fafb' : '#fff5f5',
  color: disabled ? '#d1d5db' : '#dc2626',
  fontSize: '11px',
  cursor: disabled ? 'default' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'inherit',
  padding: 0,
});

const addEntryBtn: React.CSSProperties = {
  width: '100%',
  marginTop: '12px',
  padding: '12px',
  border: '1.5px dashed #93c5fd',
  borderRadius: '8px',
  background: '#eff6ff',
  color: '#1b548a',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  letterSpacing: '0.02em',
};

const btnPrimary: React.CSSProperties = {
  padding: '10px 20px',
  background: '#1b548a',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '13px',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const btnAccent: React.CSSProperties = {
  padding: '10px 20px',
  background: '#fff',
  color: '#1b548a',
  border: '1px solid #1b548a',
  borderRadius: '4px',
  fontSize: '13px',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const btnGhost: React.CSSProperties = {
  padding: '10px 20px',
  background: 'transparent',
  color: '#9ca3af',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  fontSize: '13px',
  cursor: 'pointer',
  fontFamily: 'inherit',
  marginLeft: 'auto',
};
