export function formatDateBR(value) {
  if (!value) return '—'

  if (value instanceof Date) {
    return value.toLocaleDateString('pt-BR')
  }

  if (typeof value === 'string') {
    const onlyDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (onlyDateMatch) {
      const [, year, month, day] = onlyDateMatch
      return `${day}/${month}/${year}`
    }

    const isoSplit = value.split('T')[0]
    const isoMatch = isoSplit?.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (isoMatch) {
      const [, year, month, day] = isoMatch
      return `${day}/${month}/${year}`
    }
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('pt-BR')
}

export function formatTimeHM(value) {
  if (!value && value !== 0) return '—'

  if (typeof value === 'string') {
    const match = value.match(/^(\d{2}):(\d{2})/)
    if (match) {
      return `${match[1]}:${match[2]}`
    }
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
