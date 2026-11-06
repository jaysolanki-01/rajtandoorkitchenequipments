import { chapters, type ChapterContent } from '../config/content';
import { HeroCTA } from './HeroCTA';

function Heading({ chapter, level }: { chapter: ChapterContent; level: 1 | 2 }) {
  const lines = chapter.heading.split('\n');
  const content = lines.map((line, i) => (
    <span key={line} className="chapter__heading-line">
      {line}
      {i < lines.length - 1 && ' '}
    </span>
  ));
  return level === 1 ? <h1 className="chapter__heading chapter__heading--hero">{content}</h1> : <h2 className="chapter__heading">{content}</h2>;
}

/**
 * The copy for each chapter of the scroll story. All chapters are real HTML text
 * (crawlable, screen-reader friendly); the timeline only fades them in and out.
 */
export function ScrollStory({ registerChapter }: { registerChapter: (i: number, el: HTMLElement | null) => void }) {
  return (
    <div className="hero__copy">
      {chapters.map((chapter, i) => (
        <article
          key={chapter.id}
          ref={(el) => registerChapter(i, el)}
          className={`chapter chapter--${chapter.id}`}
          aria-labelledby={`chapter-${chapter.id}-title`}
        >
          {chapter.eyebrow && <p className="eyebrow">{chapter.eyebrow}</p>}
          <div id={`chapter-${chapter.id}-title`}>
            <Heading chapter={chapter} level={i === 0 ? 1 : 2} />
          </div>
          <p className="chapter__body">
            <span className="chapter__body-full">{chapter.body}</span>
            {chapter.mobileBody && <span className="chapter__body-short">{chapter.mobileBody}</span>}
          </p>
          {chapter.features && (
            <ul className="chapter__features">
              {chapter.features.map((f) => (
                <li key={f.id}>
                  {f.index && <span className="chapter__feature-index">{f.index}</span>}
                  {f.label}
                </li>
              ))}
            </ul>
          )}
          {chapter.tag && (
            <p className="chapter__tag">
              <span className="chapter__tag-dot" aria-hidden="true" />
              {chapter.tag}
            </p>
          )}
          {chapter.ctas && <HeroCTA ctas={chapter.ctas} />}
        </article>
      ))}
    </div>
  );
}
