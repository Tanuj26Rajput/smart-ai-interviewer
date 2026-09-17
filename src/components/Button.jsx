const VARIANTS = {
  primary:
    'bg-[#00F0FF] text-[#050814] font-bold hover:bg-[#33F3FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]',
  secondary:
    'border border-white/20 text-white hover:border-[#00F0FF] hover:text-[#00F0FF]',
  ghost: 'text-secondary hover:text-white',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm tracking-wide transition-all duration-200 cursor-pointer ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
