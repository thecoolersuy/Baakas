interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorMessage({
  message = "Somethinhg went horribly wrong",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <p className="text-sm text-[#666666]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-[#11111] underline underline-offset-4 hover:text-[#666666] transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
