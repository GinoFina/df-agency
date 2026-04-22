import { ExternalLink } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IG_URL = 'https://www.instagram.com/df_agency_scouting/';
const LI_URL = 'https://www.linkedin.com/company/df-agency-ltd';

// Instagram: shortcode is the part after /p/ in the post URL
const igPosts = [
  { shortcode: 'DWr_YhLkcEN' },
  { shortcode: 'DWr1n7PkW1c' },
  { shortcode: 'DWr1kvckZbu' },
];

// LinkedIn: activity ID from the post URL (after "activity-" and before the dash suffix)
const liPosts = [
  { activityId: '7448374390708432896' },
  { activityId: '7446928266478690304' },
  { activityId: '7366938259110748160' },
];

const content = {
  ES: {
    badge: 'Redes Sociales',
    heading: 'Seguinos en redes',
    subheading: 'Contenido sobre el mundo del fútbol, transferencias y detrás de escena de nuestra agencia.',
    igLabel: 'Instagram',
    liLabel: 'LinkedIn',
    igSection: 'Últimas publicaciones en Instagram',
    liSection: 'Últimas publicaciones en LinkedIn',
  },
  EN: {
    badge: 'Social Media',
    heading: 'Follow us online',
    subheading: 'Content about the football world, transfers and behind the scenes of our agency.',
    igLabel: 'Instagram',
    liLabel: 'LinkedIn',
    igSection: 'Latest Instagram posts',
    liSection: 'Latest LinkedIn posts',
  },
};

export default function SocialFeed({ lang }) {
  const t = content[lang];

  return (
    <section id="social" className="py-20 md:py-28 px-4 md:px-8 bg-brand-950">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-widest mb-3">{t.badge}</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">{t.heading}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.subheading}</p>

          {/* Social profile buttons */}
          <div className="flex justify-center gap-4 mt-7">
            <a
              href={IG_URL} target="_blank" rel="noreferrer"
              id="social-instagram-link"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-light text-sm font-semibold text-slate-300 hover:text-accent hover:border-accent/40 transition-all duration-300 border border-white/10"
            >
              <InstagramIcon size={16} />{t.igLabel}<ExternalLink size={12} className="opacity-50" />
            </a>
            <a
              href={LI_URL} target="_blank" rel="noreferrer"
              id="social-linkedin-link"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-light text-sm font-semibold text-slate-300 hover:text-accent hover:border-accent/40 transition-all duration-300 border border-white/10"
            >
              <LinkedinIcon size={16} />{t.liLabel}<ExternalLink size={12} className="opacity-50" />
            </a>
          </div>
        </div>

        {/* ── Instagram embeds ── */}
        <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
          <InstagramIcon size={14} />
          {t.igSection}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {igPosts.map((post) => (
            <div
              key={post.shortcode}
              className="rounded-2xl overflow-hidden bg-brand-900/60 border border-white/8"
              style={{ minHeight: '540px' }}
            >
              <iframe
                src={`https://www.instagram.com/p/${post.shortcode}/embed/`}
                width="100%"
                height="540"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                title={`Instagram post ${post.shortcode}`}
                className="w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* ── LinkedIn embeds ── */}
        <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
          <LinkedinIcon size={14} />
          {t.liSection}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {liPosts.map((post) => (
            <div
              key={post.activityId}
              className="rounded-2xl overflow-hidden bg-brand-900/60 border border-white/8"
              style={{ minHeight: '540px' }}
            >
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${post.activityId}`}
                width="100%"
                height="540"
                frameBorder="0"
                allowFullScreen
                title={`LinkedIn post ${post.activityId}`}
                className="w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
