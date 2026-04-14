type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
};

const baseClasses =
  "inline-flex min-h-14 items-center justify-center rounded-full px-6 text-base font-semibold transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:ring-offset-2 focus:ring-offset-[var(--background)]";

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  disabled,
  fullWidth = true,
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-[var(--primary)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--primary-dark)] hover:shadow-[0_18px_36px_rgba(75,63,141,0.14)]"
      : "bg-white/82 text-[var(--primary-dark)] border border-[var(--border)] hover:border-[var(--primary-light)] hover:bg-white";

  const widthClass = fullWidth ? "w-full" : "";

  if (href) {
    return (
      <a className={`${baseClasses} ${variantClasses} ${widthClass}`} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${widthClass} disabled:cursor-not-allowed disabled:opacity-50`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
