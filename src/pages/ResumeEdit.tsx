import { useState, useEffect } from 'react';

const STORAGE_KEY = 'resumeExtra';

interface ResumeExtra {
  company: string;
  department: string;
  letter: string;
}

const EMPTY: ResumeExtra = { company: '', department: '', letter: '' };

export default function ResumeEdit() {
  const [form, setForm] = useState<ResumeExtra>(EMPTY);
  const [saved, setSaved] = useState(false);

  const charCount = form.letter.replace(/\s/g, '').length;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setForm(JSON.parse(stored));
  }, []);

  const handleChange = (field: keyof ResumeExtra, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm(EMPTY);
    setSaved(false);
  };

  const handlePreview = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    window.open('/resume.html', '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4f0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Private</p>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1b548a', marginBottom: '6px' }}>Resume Editor</h1>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>회사별 맞춤 내용을 입력하고 이력서에 자동 반영합니다.</p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={labelStyle}>지원 회사</label>
            <input
              style={inputStyle}
              placeholder="예: 카카오"
              value={form.company}
              onChange={e => handleChange('company', e.target.value)}
            />
          </div>

          <div>
            <label style={labelStyle}>지원 부서 / 직군</label>
            <input
              style={inputStyle}
              placeholder="예: 서버 개발 · 백엔드 엔지니어"
              value={form.department}
              onChange={e => handleChange('department', e.target.value)}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>자기소개 / 지원동기</label>
              <span style={{ fontSize: '11px', color: charCount > 680 ? '#dc2626' : charCount > 380 ? '#d97706' : '#9ca3af' }}>
                {charCount}자
                {charCount <= 380 && <span style={{ color: '#9ca3af' }}> / 380 이하 권장</span>}
                {charCount > 380 && charCount <= 680 && <span style={{ color: '#d97706' }}> · 학력 사이드바 자동 이동</span>}
                {charCount > 680 && <span style={{ color: '#dc2626' }}> · 2페이지 초과 가능</span>}
              </span>
            </div>
            <textarea
              style={{ ...inputStyle, height: '180px', resize: 'vertical', lineHeight: '1.7' }}
              placeholder="이 회사에 지원하는 이유, 강조하고 싶은 내용 등을 자유롭게 작성하세요."
              value={form.letter}
              onChange={e => handleChange('letter', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
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

        </div>

        <p style={{ marginTop: '16px', fontSize: '11px', color: '#9ca3af', textAlign: 'center' }}>
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
