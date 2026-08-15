import { Link } from "react-router-dom"

function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300"

  const variants = {
    primary:
      "bg-[#9f5845] text-white hover:bg-[#844737] hover:-translate-y-0.5",

    secondary:
      "border border-[#4a3528] text-[#4a3528] hover:bg-[#4a3528] hover:text-white",

    soft:
      "bg-[#efe7da] text-[#4a3528] hover:bg-[#e5d8c8]",
  }

  const styles = `${baseStyles} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={styles}>
      {children}
    </button>
  )
}

export default Button