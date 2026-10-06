const s = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--doaide-text-secondary)',
  },
  input: {
    background: 'var(--doaide-bg-alt)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)',
    padding: '10px 12px',
    color: 'var(--doaide-text)',
    fontSize: 15,
    fontFamily: 'var(--doaide-font-mono)',
    outline: 'none',
    transition: 'border-color var(--doaide-transition)',
    width: '100%',
  },
  currencyWrap: {
    position: 'relative',
  },
  currencyPrefix: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--doaide-text-muted)',
    fontFamily: 'var(--doaide-font-mono)',
    fontSize: 15,
    pointerEvents: 'none',
  },
  select: {
    appearance: 'none',
    background: 'var(--doaide-bg-alt)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)',
    padding: '10px 32px 10px 12px',
    color: 'var(--doaide-text)',
    fontSize: 15,
    cursor: 'pointer',
    width: '100%',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239CA3AF' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
  },
  hint: {
    fontSize: 12,
    color: 'var(--doaide-text-muted)',
    marginTop: -2,
  },
}

export default function InputField({ label, type = 'number', value, onChange, options, hint, currency, placeholder, ...rest }) {
  if (type === 'select') {
    return (
      <div style={s.wrapper}>
        {label && <label style={s.label}>{label}</label>}
        <select style={s.select} value={value} onChange={e => onChange(e.target.value)} {...rest}>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {hint && <span style={s.hint}>{hint}</span>}
      </div>
    )
  }

  if (type === 'checkbox') {
    return (
      <label style={s.checkbox}>
        <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} {...rest} />
        <span style={{ fontSize: 14, color: 'var(--doaide-text)' }}>{label}</span>
      </label>
    )
  }

  if (currency) {
    return (
      <div style={s.wrapper}>
        {label && <label style={s.label}>{label}</label>}
        <div style={s.currencyWrap}>
          <span style={s.currencyPrefix}>₹</span>
          <input
            type="number"
            style={{ ...s.input, paddingLeft: 28 }}
            value={value}
            onChange={e => onChange(Number(e.target.value) || 0)}
            placeholder={placeholder || '0'}
            min={0}
            {...rest}
          />
        </div>
        {hint && <span style={s.hint}>{hint}</span>}
      </div>
    )
  }

  return (
    <div style={s.wrapper}>
      {label && <label style={s.label}>{label}</label>}
      <input
        type={type}
        style={s.input}
        value={value}
        onChange={e => onChange(type === 'number' ? (Number(e.target.value) || 0) : e.target.value)}
        placeholder={placeholder}
        {...rest}
      />
      {hint && <span style={s.hint}>{hint}</span>}
    </div>
  )
}
