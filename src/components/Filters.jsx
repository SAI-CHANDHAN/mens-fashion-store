function Filters({
  isOpen,
  onOpen,
  onClose,
  categories,
  sizeOptions,
  priceOptions,
  selectedCategory,
  selectedSizes,
  selectedPriceRange,
  onCategoryChange,
  onToggleSize,
  onPriceRangeChange,
  onApply,
  onClear,
  activeFiltersCount,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/75 shadow-soft transition hover:-translate-y-0.5 hover:bg-black/[0.04]"
      >
        Filters
        {activeFiltersCount > 0 && (
          <span className="rounded-full bg-obsidian px-2 py-0.5 text-[0.65rem] font-bold text-white">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px]"
          />

          <div className="fixed inset-x-0 bottom-0 z-[60] max-h-[85vh] overflow-y-auto rounded-t-3xl border border-black/10 bg-white p-5 shadow-[0_-16px_45px_rgba(0,0,0,0.22)] animate-rise md:absolute md:inset-auto md:right-0 md:top-[calc(100%+0.65rem)] md:max-h-[75vh] md:w-[380px] md:rounded-2xl md:border md:p-5 md:shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-xl text-obsidian">Filters</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-black/15 px-2.5 py-1 text-xs font-semibold text-black/65 transition hover:bg-black/[0.04]"
              >
                Close
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
                  Category
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/12 px-3 py-2 text-sm text-black/75 transition hover:bg-black/[0.03]"
                    >
                      <input
                        type="radio"
                        name="category-filter"
                        checked={selectedCategory === category}
                        onChange={() => onCategoryChange(category)}
                        className="h-3.5 w-3.5 accent-black"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => {
                    const isSelected = selectedSizes.includes(size)

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onToggleSize(size)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          isSelected
                            ? 'border-obsidian bg-obsidian text-white'
                            : 'border-black/20 bg-white text-black/70 hover:border-black/35 hover:bg-black/[0.04]'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
                  Price
                </p>
                <div className="space-y-2">
                  {priceOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/12 px-3 py-2 text-sm text-black/75 transition hover:bg-black/[0.03]"
                    >
                      <input
                        type="radio"
                        name="price-filter"
                        checked={selectedPriceRange === option.value}
                        onChange={() => onPriceRangeChange(option.value)}
                        className="h-3.5 w-3.5 accent-black"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-black/75 transition hover:bg-black/[0.04]"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={onApply}
                  className="rounded-xl bg-obsidian px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Filters