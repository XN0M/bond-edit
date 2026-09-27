import { useEffect, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react'

const CAMPAIGN_URL = 'https://www.epres.es/?ref=arogmdcc'

type ContainerProps = { children: ReactNode; className?: string; as?: 'div' | 'section' }

function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16 ${className}`}>{children}</Tag>
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.28em] ${light ? 'text-alabaster/65' : 'text-muted'}`}>
      <span className={`h-px w-8 md:w-12 ${light ? 'bg-alabaster/35' : 'bg-charcoal/35'}`} />
      <span>{children}</span>
    </div>
  )
}

function EditorialHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-5xl leading-[0.98] tracking-[-0.035em] md:text-7xl lg:text-[5.5rem] ${className}`}>{children}</h2>
}

function Button({ children, href = CAMPAIGN_URL, secondary = false, light = false }: { children: ReactNode; href?: string; secondary?: boolean; light?: boolean }) {
  const secondaryClasses = light
    ? 'border-alabaster/60 text-alabaster hover:bg-alabaster hover:text-charcoal'
    : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-alabaster'

  if (secondary) {
    return (
      <a href={href} className={`inline-flex min-h-12 items-center justify-center gap-3 border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${secondaryClasses}`}>
        {children}<ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </a>
    )
  }

  return (
    <a href={href} className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden bg-charcoal px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-alabaster shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-shadow duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2">
      <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-luxury group-hover:translate-x-0" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-3">{children}<ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></span>
    </a>
  )
}

function MediaFrame({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`group relative overflow-hidden bg-taupe shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(0,0,0,0.05)] ${className}`}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} width={1536} height={2048} className="h-full w-full object-cover grayscale transition-[filter,transform] duration-[1800ms] ease-luxury group-hover:scale-[1.035] group-hover:grayscale-0" />
    </div>
  )
}

function Divider({ light = false }: { light?: boolean }) {
  return <div className={`h-px w-full ${light ? 'bg-alabaster/15' : 'bg-charcoal/15'}`} aria-hidden="true" />
}

const faqItems = [
  { q: '¿Cómo se utiliza el tratamiento?', a: 'Vierte un vial de concentrado en el pulverizador, llena con agua hasta la línea indicada y agita. Aplica generosamente sobre el cabello seco y sin lavar, deja actuar al menos 10 minutos y después lava y peina como de costumbre.' },
  { q: '¿Con qué frecuencia debo usarlo?', a: 'Se recomienda utilizarlo una o dos veces por semana para reparar el cabello y, después, incorporarlo semanalmente para mantener los resultados.' },
  { q: '¿Es adecuado para todo tipo de cabello?', a: 'Sí. La tecnología está desarrollada para distintos tipos y texturas de cabello, incluido el cabello dañado por procesos químicos, calor, factores ambientales o desgaste mecánico.' },
  { q: '¿Qué hace diferente a BIODIFFUSION™?', a: 'Su tecnología patentada distribuye los activos de reparación a través de la fibra y continúa trabajando incluso después de que el cabello se seca, sin alterar el pH de otros servicios químicos.' },
]

function AccordionItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const panelId = `faq-panel-${index}`
  return (
    <div className={`border-t transition-colors duration-500 ${open ? 'border-gold' : 'border-charcoal/25'}`}>
      <button className="group flex min-h-20 w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}>
        <span className={`font-display text-2xl transition-colors duration-500 md:text-3xl ${open ? 'text-gold-dark' : 'group-hover:text-gold-dark'}`}>{question}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center border transition-all duration-500 ${open ? 'rotate-45 border-gold text-gold-dark' : 'border-charcoal/40'}`}><Plus size={16} strokeWidth={1.5} aria-hidden="true" /></span>
      </button>
      <div id={panelId} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden"><p className="max-w-2xl pb-8 pr-12 text-base leading-relaxed text-muted md:text-lg">{answer}</p></div>
      </div>
    </div>
  )
}

function GridLines() {
  return <div className="pointer-events-none fixed inset-0 z-40 hidden lg:block" aria-hidden="true"><div className="mx-auto grid h-full max-w-[1600px] grid-cols-12 px-16"><span className="col-start-1 w-px bg-charcoal/[0.08]" /><span className="col-start-5 w-px bg-charcoal/[0.08]" /><span className="col-start-9 w-px bg-charcoal/[0.08]" /><span className="col-start-12 ml-auto w-px bg-charcoal/[0.08]" /></div></div>
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <button type="button" onClick={() => document.getElementById('contenido')?.focus()} className="fixed left-4 top-4 z-[100] -translate-y-24 bg-charcoal px-5 py-3 text-xs uppercase tracking-widest text-alabaster transition-transform focus:translate-y-0">Saltar al contenido</button>
      <GridLines />
      <div className="paper-noise" aria-hidden="true" />

      <header className="relative z-50 bg-alabaster">
        <div className="bg-charcoal px-5 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-alabaster">Envío gratis para pedidos de más de 20€</div>
        <Container className="flex min-h-20 items-center justify-between border-b border-charcoal/15">
          <a href={CAMPAIGN_URL} className="font-display text-2xl tracking-[-0.045em] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold" aria-label="The Bond Edit, visitar epres">The Bond <em className="font-normal text-gold-dark">Edit</em></a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {['Innovación', 'Cómo funciona', 'Historia'].map((label) => <a key={label} href={CAMPAIGN_URL} className="text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 hover:text-gold-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold">{label}</a>)}
          </nav>
          <a href={CAMPAIGN_URL} className="group flex min-h-12 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"><span className="hidden sm:inline">Visitar epres</span><span className="grid h-9 w-9 place-items-center border border-charcoal transition-colors duration-500 group-hover:bg-charcoal group-hover:text-alabaster"><ArrowUpRight size={14} strokeWidth={1.5} /></span></a>
        </Container>
      </header>

      <main id="contenido" tabIndex={-1}>
        <section id="inicio" className="relative min-h-[calc(100svh-112px)] overflow-hidden pb-20 pt-14 md:pb-24 lg:pt-20">
          <Container className="grid grid-cols-1 items-end gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="relative z-10 lg:col-span-7 lg:pb-12" data-reveal>
              <SectionLabel>El futuro de la reparación capilar</SectionLabel>
              <h1 className="mt-10 font-display text-[clamp(4rem,10vw,9rem)] leading-[0.82] tracking-[-0.06em]">Repara lo que<br /><em className="font-normal text-gold-dark">no puedes</em> ver</h1>
              <div className="mt-10 grid gap-8 border-t border-charcoal/20 pt-8 md:grid-cols-2 lg:max-w-2xl">
                <p className="text-lg leading-relaxed text-muted">Tecnología molecular que reconstruye la estructura interna del cabello en un solo paso.</p>
                <div className="flex items-start md:justify-end"><Button>Descubrir el tratamiento</Button></div>
              </div>
            </div>
            <div className="relative lg:col-span-5" data-reveal>
              <span className="vertical-label absolute -left-8 bottom-0 z-10 hidden text-[10px] font-medium uppercase tracking-[0.3em] text-muted xl:block">Bond Repair / Vol. 01</span>
              <MediaFrame src="/assets/hero-hair.webp" alt="Cabello oscuro largo, sano y brillante en un retrato editorial" eager className="aspect-[3/4] lg:min-h-[620px]" />
              <div className="absolute -bottom-5 -left-5 grid h-24 w-24 place-items-center bg-charcoal text-center text-[9px] uppercase leading-relaxed tracking-[0.18em] text-alabaster md:h-28 md:w-28">Tecnología<br />patentada</div>
            </div>
          </Container>
          <Container className="mt-16 flex justify-between lg:mt-0"><span className="text-[10px] uppercase tracking-[0.25em] text-muted">Desplázate para descubrir</span><ArrowDown size={16} strokeWidth={1.25} className="animate-float" /></Container>
        </section>

        <section aria-label="Resultados clave" className="border-y border-charcoal/20">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {['1 paso', '10 minutos', 'Todo tipo de cabello', 'Resultados desde el primer uso'].map((item, index) => <div key={item} className={`flex min-h-32 items-end border-charcoal/15 p-5 md:min-h-40 md:p-8 ${index % 2 ? 'border-l' : ''} ${index > 1 ? 'border-t lg:border-t-0' : ''} ${index === 2 ? 'lg:border-l' : ''}`}><span className="font-display text-2xl md:text-3xl">{index < 2 && <sup className="mr-2 font-sans text-[9px] text-muted">0{index + 1}</sup>}{item}</span></div>)}
          </Container>
        </section>

        <section id="innovacion" className="scroll-mt-20 bg-charcoal py-24 text-alabaster md:py-32">
          <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5" data-reveal><SectionLabel light>Ciencia / Innovación</SectionLabel><EditorialHeading className="mt-10">La ciencia de una reparación <em className="font-normal text-gold">profunda</em></EditorialHeading></div>
            <div className="lg:col-span-7 lg:col-start-6" data-reveal><MediaFrame src="/assets/bond-science.webp" alt="Visualización artística de enlaces entre fibras capilares" className="aspect-[4/3]" /></div>
            <div className="lg:col-span-4 lg:col-start-2" data-reveal><p className="drop-cap text-lg leading-[1.75] text-alabaster/75">Los enlaces disulfuro forman la arquitectura interna de un cabello sano. El calor, el color, los procesos químicos y hasta el cepillado diario pueden debilitarlos.</p></div>
            <div className="space-y-8 lg:col-span-5 lg:col-start-7" data-reveal><h3 className="font-display text-4xl leading-tight md:text-5xl">BIODIFFUSION™ trabaja donde el daño comienza.</h3><p className="max-w-xl text-base leading-relaxed text-alabaster/65 md:text-lg">Su tecnología patentada distribuye los activos de reparación a través de la fibra y continúa actuando incluso después de que el cabello se seca. El resultado: una estructura más fuerte, suave y brillante.</p><a href={CAMPAIGN_URL} className="inline-flex items-center gap-3 border-b border-gold/70 pb-2 text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold">Explorar en epres <ArrowUpRight size={13} /></a></div>
          </Container>
        </section>

        <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12" data-reveal><div className="lg:col-span-4"><SectionLabel>Ritual / 10 minutos</SectionLabel></div><EditorialHeading className="lg:col-span-7 lg:col-start-6">Un ritual simple.<br />Una diferencia <em className="font-normal text-gold-dark">visible.</em></EditorialHeading></div>
            <div className="mt-20 grid lg:grid-cols-3">
              {[['01', 'Mezcla', 'Vierte un vial de concentrado en el pulverizador, completa con agua hasta la línea y agita bien.'], ['02', 'Satura', 'Pulveriza generosamente sobre el cabello seco y sin lavar, desde la raíz hasta las puntas.'], ['03', 'Deja actuar', 'Espera un mínimo de 10 minutos. Después, lava y peina tu cabello como de costumbre.']].map(([num, title, copy], index) => <article key={num} className={`group border-t border-charcoal px-0 py-10 transition-colors duration-700 hover:bg-taupe/35 lg:min-h-[360px] lg:px-10 ${index > 0 ? 'lg:border-l' : ''}`} data-reveal><div className="flex items-center justify-between"><span className="text-[10px] font-medium tracking-[0.25em] text-muted">PASO {num}</span><span className="h-2 w-2 bg-gold transition-transform duration-500 group-hover:scale-[1.6]" /></div><h3 className="mt-20 font-display text-4xl md:text-5xl">{title}</h3><p className="mt-6 max-w-sm leading-relaxed text-muted">{copy}</p></article>)}
            </div>
          </Container>
        </section>

        <section className="bg-taupe/70 py-24 md:py-32">
          <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="relative lg:col-span-6" data-reveal><span className="vertical-label absolute -right-8 top-0 z-10 hidden text-[10px] uppercase tracking-[0.3em] text-muted xl:block">El esencial / No. 01</span><MediaFrame src="/assets/bond-kit.webp" alt="Bodegón editorial de un tratamiento capilar con pulverizador y dos concentrados" className="aspect-[4/5]" /></div>
            <div className="lg:col-span-5 lg:col-start-8" data-reveal><SectionLabel>El tratamiento</SectionLabel><EditorialHeading className="mt-10">Bond Repair<br /><em className="font-normal text-gold-dark">Starter Kit</em></EditorialHeading><p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">Una fórmula concentrada y sin agua, diseñada para reparar el daño químico, térmico, mecánico y ambiental con una aplicación sencilla.</p><ul className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">{['Pulverizador reutilizable', 'Dos concentrados Bond Repair', 'Fórmula de cuatro ingredientes', 'Para todo tipo de cabello'].map((item) => <li key={item} className="flex items-center justify-between py-4 text-sm"><span>{item}</span><span className="h-1.5 w-1.5 bg-gold" /></li>)}</ul><div className="mt-10"><Button>Comprar ahora</Button></div><p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-muted">La compra se completa en la tienda oficial de epres España.</p></div>
          </Container>
        </section>

        <section id="historia" className="scroll-mt-20 py-24 md:py-32">
          <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4 lg:col-start-2" data-reveal><SectionLabel>Origen / Eric Pressly, Ph.D.</SectionLabel><div className="mt-12 text-[7rem] font-light leading-none text-charcoal/[0.08] md:text-[11rem]">100<span className="text-gold-dark">+</span></div><p className="-mt-5 text-[10px] uppercase tracking-[0.25em] text-muted">Patentes en tecnología bond-repair</p></div>
            <div className="lg:col-span-6 lg:col-start-7" data-reveal><EditorialHeading>Cuando la ciencia encuentra la <em className="font-normal text-gold-dark">creatividad.</em></EditorialHeading><div className="mt-12 grid gap-8 md:grid-cols-2"><p className="drop-cap leading-[1.75] text-muted">Eric Pressly descubrió su talento para la innovación mientras cursaba su doctorado en ciencia de materiales, trabajando desde productos farmacéuticos hasta la creación de la categoría bond-building en el cuidado capilar.</p><p className="leading-[1.75] text-muted">Con epres™, transforma esa experiencia en fórmulas profesionales, fáciles de usar y pensadas para lograr el máximo rendimiento con un impacto más consciente.</p></div><div className="mt-10"><Button secondary>Conoce la historia en epres</Button></div></div>
          </Container>
        </section>

        <section className="border-y border-charcoal/20">
          <Container className="grid grid-cols-2 md:grid-cols-5">
            {['Acid Free', 'Vegan', 'Cruelty Free', 'Biodegradable', 'Quat Free'].map((item, index) => <div key={item} className={`grid min-h-36 place-items-center p-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] ${index > 0 ? 'border-l border-charcoal/15' : ''} ${index === 4 ? 'col-span-2 border-l-0 border-t md:col-span-1 md:border-l md:border-t-0' : ''}`}><span>{item}</span></div>)}
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4" data-reveal><SectionLabel>FAQ / Lo esencial</SectionLabel><EditorialHeading className="mt-10">Preguntas,<br /><em className="font-normal text-gold-dark">resueltas.</em></EditorialHeading></div>
            <div className="lg:col-span-7 lg:col-start-6" data-reveal>{faqItems.map((item, index) => <AccordionItem key={item.q} question={item.q} answer={item.a} index={index} />)}</div>
          </Container>
        </section>

        <section className="bg-charcoal py-24 text-alabaster md:py-32">
          <Container className="grid items-end gap-14 lg:grid-cols-12" data-reveal><div className="lg:col-span-8"><SectionLabel light>Tu cabello / Nueva estructura</SectionLabel><h2 className="mt-10 font-display text-[clamp(3.8rem,8vw,8rem)] leading-[0.88] tracking-[-0.05em]">Más fuerte.<br />Más suave.<br /><em className="font-normal text-gold">Más tú.</em></h2></div><div className="lg:col-span-3 lg:col-start-10"><p className="mb-8 leading-relaxed text-alabaster/65">Descubre la reparación molecular que continúa trabajando mucho después de aplicarla.</p><Button secondary light>Comprar el tratamiento</Button></div></Container>
        </section>
      </main>

      <footer className="bg-charcoal pb-10 text-alabaster">
        <Container><Divider light /><div className="grid gap-12 py-12 md:grid-cols-12"><div className="md:col-span-5"><a href={CAMPAIGN_URL} className="font-display text-4xl tracking-[-0.045em]">The Bond <em className="font-normal text-gold">Edit</em></a><p className="mt-5 max-w-sm text-sm leading-relaxed text-alabaster/50">Un espacio editorial independiente dedicado a la ciencia de reparación capilar de epres™.</p></div><div className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8"><div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-alabaster/40">Descubrir</p><div className="space-y-3 text-sm"><a className="block hover:text-gold" href={CAMPAIGN_URL}>Innovación</a><a className="block hover:text-gold" href={CAMPAIGN_URL}>Cómo funciona</a><a className="block hover:text-gold" href={CAMPAIGN_URL}>Historia</a></div></div><div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-alabaster/40">Visitar epres</p><div className="space-y-3 text-sm"><a className="block hover:text-gold" href={CAMPAIGN_URL}>Tienda oficial</a><a className="block hover:text-gold" href={CAMPAIGN_URL}>Profesionales</a><a className="block hover:text-gold" href={CAMPAIGN_URL}>Web oficial</a></div></div></div></div><Divider light /><div className="flex flex-col gap-3 pt-7 text-[9px] uppercase tracking-[0.18em] text-alabaster/35 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} The Bond Edit — Micrositio editorial</span><span>Contenido inspirado en epres™</span></div></Container>
      </footer>
    </>
  )
}

export default App
