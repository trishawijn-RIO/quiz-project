type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="mb-7 space-y-3">
      <div className="flex items-center justify-between text-sm text-[var(--text-soft)]">
        <span>Stap {currentStep} van {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/72">
        <div
          className="h-full rounded-full bg-[rgba(242,140,0,0.78)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
