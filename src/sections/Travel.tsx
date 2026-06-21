import { useState, useRef, type CSSProperties } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Auto-collect all webp files under src/assets/travel/<cityId>/*.webp
// Adding photos: just drop .webp files into src/assets/travel/<cityId>/
const imageModules = import.meta.glob<{ default: string }>(
  '../assets/travel/*/*.webp',
  { eager: true }
);

const CITY_PHOTOS: Record<string, string[]> = {};
for (const [path, mod] of Object.entries(imageModules)) {
  const cityId = path.split('/').at(-2)!;
  if (!CITY_PHOTOS[cityId]) CITY_PHOTOS[cityId] = [];
  CITY_PHOTOS[cityId].push(mod.default);
}
// Sort alphabetically so order is deterministic (paris.webp, paris2.webp, ...)
for (const id in CITY_PHOTOS) CITY_PHOTOS[id].sort();

type Photo = { src: string } | { bg: string };

const FALLBACK: Photo[] = Array(6).fill({ bg: 'hsl(200 20% 55%)' });

function getPhotos(cityId: string): Photo[] {
  return CITY_PHOTOS[cityId]?.map(src => ({ src })) ?? FALLBACK;
}

function PhotoSlot({
  photo,
  className,
  style,
}: {
  photo: Photo;
  className?: string;
  style?: CSSProperties;
}) {
  if ('src' in photo) {
    return (
      <img
        src={photo.src}
        className={className}
        style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block', ...style }}
        alt=""
      />
    );
  }
  return <div className={className} style={{ background: photo.bg, ...style }} />;
}

const CITIES = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    date: '2022',
    coordinates: [2.3522, 48.8566] as [number, number],
    quote: { en: 'The city where I accidentally tried pigeon at a Michelin restaurant', ko: '미슐랭 레스토랑에서 비둘기 고기 먹은 썰 들어볼래?' },
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    date: '2023',
    coordinates: [151.2093, -33.8688] as [number, number],
    quote: { en: 'More stars than city lights. Need to acquire surfing skills before revisiting', ko: '별과 자연이 아름다운 시드니. 언젠간 서핑을 배워서 다시 도전해보기로!' },
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    date: '2024',
    coordinates: [139.6917, 35.6895] as [number, number],
    quote: { en: "Butterbeer: 10/10. Hogwarts would've been more fun with company.", ko: '버터맥주: ⭐️⭐️⭐️⭐️⭐️ 다음에는 친구랑 와야지' },
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'Korea',
    date: 'Always',
    coordinates: [126.978, 37.5665] as [number, number],
    quote: { en: 'Home since 2011.', ko: '2011년부터 오늘의 집' },
    hidePhotos: true,
  },
  {
    id: 'laos',
    name: 'Luang Prabang',
    country: 'Laos',
    date: '2017',
    coordinates: [102.1417, 19.8863] as [number, number],
    quote: { en: 'Family trip to Luang Prabang.', ko: '루앙프라방으로 가족 여행.' },
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    date: '2016',
    coordinates: [-74.006, 40.7128] as [number, number],
    quote: { en: 'Working in New York was a dream — always sunny in SunnySide, Queens.', ko: '뉴요커가 되는 꿈을 (잠시나마) 이루었다! 6개월 간의 여행' },
  },
  {
    id: 'jeju',
    name: 'Jeju',
    country: 'Korea',
    date: '2024',
    coordinates: [126.5312, 33.4996] as [number, number],
    quote: { en: 'Almost died on Hallasan, but the view was worth it.', ko: '한라산에서 눈보라에 죽을뻔했지만.. 재밌었잖아?' },
    labelY: 20,
  },
  {
    id: 'florida',
    name: 'Florida',
    country: 'USA',
    date: '2016',
    coordinates: [-81.5158, 27.6648] as [number, number],
    quote: { en: 'Came for Disney and Universal. Rollercoasters were fun, but the food was better.', ko: '동심으로 돌아간 디즈니와 유니버셜 여행' },
  },
];

type City = typeof CITIES[0];

export default function Travel({ lang = 'en' }: { lang?: 'en' | 'ko' }) {
  const [activeCity, setActiveCity] = useState<City>(CITIES[0]);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [viewMode, setViewMode] = useState<null | 'post' | 'all'>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  function handleMarkerClick(city: City, e: React.MouseEvent<SVGGElement>) {
    e.stopPropagation();
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) setPopoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (activeCity.id === city.id && popoverOpen) {
      setPopoverOpen(false);
    } else {
      setActiveCity(city);
      setPopoverOpen(true);
    }
  }

  function openPost(city: City) {
    setActiveCity(city);
    setPopoverOpen(false);
    setViewMode('post');
    setPhotoIndex(0);
  }

  function toggleAll() {
    setPopoverOpen(false);
    setViewMode(viewMode === 'all' ? null : 'all');
  }

  const activePhotos = getPhotos(activeCity.id);

  return (
    <section className="section" id="travel">
      <div className="container">
        <h2 className="section-title">Travel</h2>

        {/* Map */}
        <div className="map-panel" ref={mapRef} onClick={() => setPopoverOpen(false)}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 120, center: [20, 20] }}
            style={{ width: '100%', height: '100%' }}
            height={320}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: 'var(--soft)', stroke: 'var(--border)', strokeWidth: 0.5, outline: 'none' },
                      hover:   { fill: 'var(--soft)', stroke: 'var(--border)', strokeWidth: 0.5, outline: 'none' },
                      pressed: { fill: 'var(--soft)', stroke: 'var(--border)', strokeWidth: 0.5, outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {CITIES.map((city) => (
              <Marker
                key={city.id}
                coordinates={city.coordinates}
                onClick={(e) => handleMarkerClick(city, e)}
              >
                <circle
                  r={activeCity.id === city.id ? 7 : 5}
                  fill={activeCity.id === city.id ? 'var(--accent)' : 'var(--muted)'}
                  stroke="var(--bg)"
                  strokeWidth={2}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                />
                <text
                  textAnchor="middle"
                  y={city.labelY ?? -12}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fill: activeCity.id === city.id ? 'var(--accent)' : 'var(--muted)',
                    pointerEvents: 'none',
                    transition: 'fill 0.2s ease',
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            ))}
          </ComposableMap>

          <button className="map-view-all" onClick={toggleAll}>
            {viewMode === 'all' ? 'Close' : 'View all posts'}
          </button>

          {/* Desktop popover */}
          {popoverOpen && (
            <div
              className="map-popover"
              style={{ left: popoverPos.x, top: popoverPos.y }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="map-popover-header">
                <div>
                  <p className="map-popover-city">{activeCity.name}, {activeCity.country}</p>
                  {activeCity.date && <p className="map-popover-date">{activeCity.date}</p>}
                </div>
                <button className="map-popover-arrow" onClick={() => openPost(activeCity)}>
                  <ChevronRight size={16} />
                </button>
              </div>
              {!activeCity.hidePhotos && (
                <div className="map-popover-grid">
                  {getPhotos(activeCity.id).slice(0, 3).map((photo, i) => (
                    <PhotoSlot key={i} photo={photo} className="map-popover-photo" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop: single polaroid post */}
        {viewMode === 'post' && (
          <div className="travel-post-wrap">
            <div className="travel-post">
              {!activeCity.hidePhotos && (
                <>
                  <div className="travel-post-photo-row">
                    <button
                      className="travel-post-nav left"
                      onClick={() => setPhotoIndex(i => Math.max(0, i - 1))}
                      disabled={photoIndex === 0}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <PhotoSlot
                      photo={activePhotos[photoIndex]}
                      className="travel-post-photo"
                    />
                    <button
                      className="travel-post-nav right"
                      onClick={() => setPhotoIndex(i => Math.min(activePhotos.length - 1, i + 1))}
                      disabled={photoIndex === activePhotos.length - 1}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="travel-post-dots">
                    {activePhotos.map((_, i) => (
                      <button
                        key={i}
                        className={`travel-post-dot${i === photoIndex ? ' active' : ''}`}
                        onClick={() => setPhotoIndex(i)}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="travel-post-caption">
                {activeCity.date && <p className="travel-post-date">{activeCity.date}</p>}
                <p className="travel-post-quote">{activeCity.quote[lang]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Desktop: all cities list + gallery */}
        {viewMode === 'all' && (
          <div className="travel-desktop">
            <div>
              <p className="timeline-year" style={{ marginBottom: '1rem' }}>Visited Cities</p>
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  className={`travel-city-btn${activeCity.id === city.id ? ' active' : ''}`}
                  onClick={() => setActiveCity(city)}
                >
                  {city.name}
                  <span>{city.country}</span>
                </button>
              ))}
            </div>
            <div>
              {!activeCity.hidePhotos && (
                <div className="gallery-grid">
                  {getPhotos(activeCity.id).map((photo, i) => (
                    <PhotoSlot key={i} photo={photo} className="gallery-photo" />
                  ))}
                </div>
              )}
              <p className="travel-quote">{activeCity.quote[lang]}</p>
            </div>
          </div>
        )}

        {/* Mobile: accordion list */}
        <div className="travel-mobile">
          {CITIES.map((city) => {
            const photos = getPhotos(city.id);
            return (
              <div key={city.id} className="travel-list-item">
                <button
                  className="travel-list-btn"
                  onClick={() => setExpandedId(expandedId === city.id ? null : city.id)}
                >
                  <div className="travel-list-thumb" style={{ overflow: 'hidden' }}>
                    <PhotoSlot photo={photos[0]} style={{ width: 56, height: 56, borderRadius: 10 }} />
                  </div>
                  <div className="travel-list-info">
                    <p className="travel-list-name">{city.name}, {city.country}</p>
                    <p className="travel-list-date">{city.date || '—'}</p>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`travel-list-arrow${expandedId === city.id ? ' open' : ''}`}
                  />
                </button>
                {expandedId === city.id && (
                  <div className="travel-list-expanded">
                    {!city.hidePhotos && (
                      <div className="gallery-grid">
                        {photos.map((photo, i) => (
                          <PhotoSlot key={i} photo={photo} className="gallery-photo" />
                        ))}
                      </div>
                    )}
                    <p className="travel-quote">{city.quote[lang]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
