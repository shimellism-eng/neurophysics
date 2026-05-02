import katex from 'katex'
import 'katex/dist/katex.min.css'

const INLINE_MATH = /(\\\((.+?)\\\)|\$(.+?)\$)/g

function renderMath(source) {
  try {
    return katex.renderToString(source, {
      throwOnError: false,
      strict: false,
      output: 'html',
    })
  } catch {
    return source
  }
}

export default function PhysicsText({ children, as: Tag = 'span', className, style }) {
  const text = String(children ?? '')
  const parts = []
  let lastIndex = 0

  text.replace(INLINE_MATH, (match, _wrapped, parenMath, dollarMath, offset) => {
    if (offset > lastIndex) parts.push({ type: 'text', value: text.slice(lastIndex, offset) })
    parts.push({ type: 'math', value: parenMath || dollarMath })
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < text.length) parts.push({ type: 'text', value: text.slice(lastIndex) })

  return (
    <Tag className={className} style={style}>
      {parts.map((part, index) => (
        part.type === 'math'
          ? (
            <span
              key={index}
              className="physics-math"
              dangerouslySetInnerHTML={{ __html: renderMath(part.value) }}
            />
          )
          : <span key={index}>{part.value}</span>
      ))}
    </Tag>
  )
}
