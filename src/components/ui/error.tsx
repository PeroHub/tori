interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
      <p className="text-red-500 mb-4">{message}</p>
      {retry && (
        <button onClick={retry} className="text-primary hover:text-primary/80">
          Try Again
        </button>
      )}
    </div>
  );
}
