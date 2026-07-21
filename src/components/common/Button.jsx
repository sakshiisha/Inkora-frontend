export default function Button({
  children,
  variant = 'primary', // 'primary' | 'ghost' | 'outline'
  className = '',
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    outline: 'btn-outline-orange',
  }[variant]

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}