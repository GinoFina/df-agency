function SocialFeed() {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold text-brand-950 md:text-4xl">Social Feed</h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Espacio reservado para integrar publicaciones de Instagram y LinkedIn mediante iframes.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500"
            >
              Placeholder Embed #{item}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialFeed
