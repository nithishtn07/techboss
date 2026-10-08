import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-tech font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-7 py-3 rounded-xl gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#00e5ff] text-[#07090e] hover:bg-[#38bdf8] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] active:scale-[0.98]',
    secondary:
      'bg-white/10 text-white border border-white/15 hover:bg-white/15 hover:border-white/30 hover:shadow-lg active:scale-[0.98]',
    outline:
      'bg-transparent text-[#00e5ff] border border-[#00e5ff]/40 hover:bg-[#00e5ff]/10 hover:border-[#00e5ff] active:scale-[0.98]',
    purple:
      'bg-[#8b5cf6] text-white hover:bg-[#7c3aed] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}
