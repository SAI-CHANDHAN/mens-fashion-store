function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  if (!Array.isArray(sizes) || sizes.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
        Available Sizes
      </p>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isActive = selectedSize === size

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-obsidian bg-obsidian text-white shadow-soft'
                  : 'border-black/20 bg-white text-black/70 hover:border-black/35 hover:bg-black/[0.04]'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default SizeSelector