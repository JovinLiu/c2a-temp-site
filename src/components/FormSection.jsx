export default function FormSection({ title, children, open = false }) {
  return (
    <details className="form-section" open={open}>
      <summary>{title}</summary>
      <div className="form-section__body">{children}</div>
    </details>
  );
}
