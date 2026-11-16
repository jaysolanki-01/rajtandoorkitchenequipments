import { contact } from '../../config/site';

export function MapSection() {
  if (!contact.mapEmbedUrl) return null;

  return (
    <section className="map-section" aria-label="Our location">
      <div className="map-section__header container">
        <p className="eyebrow">Find Us</p>
        <h2 className="section-title">Visit Our Showroom</h2>
        <p className="section-subtitle">
          Come see our tandoors and kitchen equipment in person.
          {('mapShareUrl' in contact && contact.mapShareUrl) && (
            <>
              {' '}
              <a
                href={(contact as { mapShareUrl: string }).mapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-section__directions-link"
              >
                Get directions →
              </a>
            </>
          )}
        </p>
      </div>

      <div className="map-section__embed">
        <iframe
          src={contact.mapEmbedUrl}
          title="Raj Tandoor & Kitchen Equipment — showroom location"
          className="map-section__iframe"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
