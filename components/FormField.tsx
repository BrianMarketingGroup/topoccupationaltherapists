import { clsx } from "clsx";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  required,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold-dark ml-1" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600" role="alert">{error}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy placeholder-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal";

const inputVariant = (error?: string) =>
  error ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-pearl-dark hover:border-teal/50";

export function Input({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      aria-invalid={!!error}
      className={clsx(inputBase, inputVariant(error), className)}
      {...props}
    />
  );
}

export function Textarea({
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      aria-invalid={!!error}
      rows={4}
      className={clsx(inputBase, inputVariant(error), "resize-none", className)}
      {...props}
    />
  );
}

export function Select({
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <select
      aria-invalid={!!error}
      className={clsx(inputBase, inputVariant(error), "cursor-pointer", className)}
      {...props}
    >
      {children}
    </select>
  );
}
