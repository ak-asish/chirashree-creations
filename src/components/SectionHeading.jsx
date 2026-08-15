function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}) {
  return (
    <div
      className={`max-w-2xl ${
        centered ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9684f]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl leading-none tracking-[-0.02em] text-[#4a3528] sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-6 text-[#765c4a] sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading