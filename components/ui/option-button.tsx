type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
};

export function OptionButton({
  label,
  selected,
  onClick,
  multiSelect = false,
}: OptionButtonProps) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-[24px] border px-5 py-4 text-left text-base leading-relaxed transition duration-200 ease-out ${
        selected
          ? "border-[var(--primary-light)] bg-[rgba(169,159,214,0.10)] text-[var(--primary-dark)] shadow-[0_14px_28px_rgba(75,63,141,0.08)]"
          : "border-[var(--border)] bg-white/84 text-[var(--text)] hover:border-[var(--primary-light)] hover:bg-white"
      }`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm ${
          selected
            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
            : "border-[var(--primary-light)] bg-[rgba(255,255,255,0.9)] text-transparent"
        }`}
      >
        {multiSelect ? "+" : "•"}
      </span>
      <span>{label}</span>
    </button>
  );
}
