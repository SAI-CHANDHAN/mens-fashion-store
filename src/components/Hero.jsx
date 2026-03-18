import { useState } from 'react'
import clientConfig from '../config'

function Hero() {
  const [hasHeroImageError, setHasHeroImageError] = useState(false)
  const heroImagePosition = clientConfig.heroImagePosition || 'center'

  return (
    <section className="relative isolate w-full overflow-hidden bg-black">
      {!hasHeroImageError && (
        <img
          src={clientConfig.heroImage}
          alt={clientConfig.shopName}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: heroImagePosition }}
          loading="eager"
          decoding="async"
          onError={() => setHasHeroImageError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-black/34 to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,141,47,0.12),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[60vh] w-full max-w-[1200px] items-center justify-center px-4 py-16 text-center md:min-h-[72vh] md:px-6 md:py-24">
        <div className="max-w-3xl space-y-4 text-white md:space-y-6">
          <p className="mx-auto w-fit rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            Premium Fashion Edit
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            {clientConfig.shopName}
          </h1>
          <p className="text-base text-white/85 md:text-xl">{clientConfig.tagline}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero