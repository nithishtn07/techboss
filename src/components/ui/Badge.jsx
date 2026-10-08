import React from 'react';

export default function Badge({
  children,
  variant = 'cyan',
  size = 'sm',
  className = '',
  icon: Icon,
}) {
  const baseStyles = 'inline-flex items-center font-tech font-semibold uppercase tracking-wider rounded-md border';

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 gap-1',
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
  };

  const variantStyles = {
    cyan: 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30',
    purple: 'bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
