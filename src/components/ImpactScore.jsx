import { getImpactColor, getImpactBgColor } from '../utils/helpers'

export default function ImpactScore({ score, level, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl ${getImpactBgColor(level)} shadow-sm`}>
      <span className={`font-bold ${getImpactColor(level)} ${sizeClasses[size]}`}>
        {score}
      </span>
      <div className="flex flex-col">
        <span className="text-xs text-secondary font-medium">Impact</span>
        <span className={`text-xs font-bold ${getImpactColor(level)}`}>
          {level}
        </span>
      </div>
    </div>
  )
}
