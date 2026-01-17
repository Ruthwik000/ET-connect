export const getImpactLevel = (score) => {
  if (score <= 3) return 'Low'
  if (score <= 6) return 'Medium'
  return 'High'
}

export const getImpactColor = (level) => {
  switch (level) {
    case 'Low': return 'text-positive'
    case 'Medium': return 'text-warning'
    case 'High': return 'text-negative'
  }
}

export const getImpactBgColor = (level) => {
  switch (level) {
    case 'Low': return 'bg-positive/10'
    case 'Medium': return 'bg-warning/10'
    case 'High': return 'bg-negative/10'
  }
}
