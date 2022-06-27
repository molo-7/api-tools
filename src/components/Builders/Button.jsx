/**
 * button builder
 * @param {object} props
 * @param {string} props.type - button type
 * @param {boolean} props.disabled - disabled state
 * @param {function} props.onClick - button onClick handler
 */
export default function Button({
  type,
  disabled,
  onClick,
  className,
  children,
}) {
  const styles = {
    primary:
      "text-white duration-150 text-white-900 bg-buttons-primary rounded-md hover:opacity-75",
    secondary:
      "text-gray-700 duration-100 text-white-900 bg-secondary border border-white-200 hover:opacity-75 hover:border-white-500 rounded-md",
    tertiary:
      "text-white duration-150 text-white-900 bg-buttons-tertiary rounded-md hover:opacity-75",
  };

  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 text-sm " +
        (styles[type] ?? "") +
        (disabled ? ` cursor-not-allowed` : "") +
        ` ${className}`
      }
    >
      {children}
    </button>
  );
}
