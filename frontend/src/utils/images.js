// ============================================================
// TravelLoop Image Library — curated direct Unsplash photo IDs
// source.unsplash.com is rate-limited; we use direct photo URLs.
// ============================================================

const FALLBACK_GRADIENT = 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)';

// ── Curated travel photo library ────────────────────────────
// Format: photoId → suitable-for categories
const PHOTO_LIBRARY = {
  // ── Heroes / Cinematic landscapes ──
  hero_mountain_lake:   'photo-1501854140801-50d01698950b', // Dolomites aerial
  hero_beach_sunset:    'photo-1507525428034-b723cf961d3e', // tropical beach
  hero_city_night:      'photo-1477959858617-67f85cf4f1df', // city skyline
  hero_forest_mist:     'photo-1448375240586-882707db888b', // misty forest
  hero_alpine:          'photo-1506905925346-21bda4d32df4', // Swiss Alps
  hero_desert:          'photo-1509316785289-025f5b846b35', // Sahara dunes
  hero_ocean_cliff:     'photo-1476514525535-07fb3b4ae5f1', // coastal cliff

  // ── City destinations ──
  paris:      'photo-1502602898657-3e91760cbb34', // Eiffel Tower
  london:     'photo-1513635269975-59663e0ac1ad', // Thames & bridge
  tokyo:      'photo-1540959733332-eab4deabeeaf', // Tokyo skyline
  kyoto:      'photo-1528360983277-13d401cdc186', // Kyoto street
  bali:       'photo-1537996194471-e657df975ab4', // Bali terraces
  dubai:      'photo-1512453979798-5ea266f8880c', // Dubai skyline
  amalfi:     'photo-1633321088355-d0f81134ca3b', // Positano coast
  new_york:   'photo-1490644658840-3f2e3f8c5625', // NYC skyline
  barcelona:  'photo-1583422409516-2895a77efded', // Barcelona
  rome:       'photo-1552832230-c0197dd311b5', // Rome Colosseum
  santorini:  'photo-1570077188670-e3a8d69ac5ff', // Santorini
  amsterdam:  'photo-1534351590666-13e3e96b5017', // Amsterdam canals
  prague:     'photo-1519677100203-a0e668c92439', // Prague
  lisbon:     'photo-1536746803623-cef87080bfc8', // Lisbon hills
  bangkok:    'photo-1563492065599-3520f775eeed', // Bangkok temple
  singapore:  'photo-1525625293386-3f8f99389edd', // Singapore
  iceland:    'photo-1476610182048-b716b8518aae', // Iceland aurora
  maldives:   'photo-1514282401047-d79a71a590e8', // Maldives overwater
  swiss_alps: 'photo-1506905925346-21bda4d32df4', // Swiss Alps
  interlaken: 'photo-1531366936337-7c912a4589a7', // Interlaken valley
  peru_machu: 'photo-1526392060635-9d6019884377', // Machu Picchu
  morocco:    'photo-1539020140153-e479b8c22e70', // Morocco medina
  vietnam:    'photo-1557750255-c76072a7aad1', // Vietnam bay
  new_zealand:'photo-1508739773434-c26b3d09e071', // New Zealand fjord
  cappadocia: 'photo-1641128324972-af3212f0f6bd', // Cappadocia balloons
  india_taj:  'photo-1548013146-72479768bada', // Taj Mahal

  // ── Nature & landscape ──
  mountains:  'photo-1464822759023-fed622ff2c3b', // mountain peak
  beach:      'photo-1507525428034-b723cf961d3e', // pristine beach
  jungle:     'photo-1448375240586-882707db888b', // jungle green
  desert:     'photo-1509316785289-025f5b846b35', // golden desert
  waterfall:  'photo-1518瀑-placeholder',
  lake:       'photo-1501854140801-50d01698950b', // mountain lake

  // ── Experiences / Activities ──
  food_tour:      'photo-1499856871958-5b9627545d1a', // Paris street food
  tea_ceremony:   'photo-1545048702-79362596cdc9', // Japanese tea
  hiking:         'photo-1474524955719-b9f87c50ce47', // hiking trail
  boat_tour:      'photo-1544551763-46a013bb70d5', // boat on water
  cooking_class:  'photo-1466637574441-749b8f19452f', // cooking
  wine_tasting:   'photo-1510812431401-41d2bd2722f3', // wine
  scuba_diving:   'photo-1544551763-46a013bb70d5', // underwater
  city_tour:      'photo-1477959858617-67f85cf4f1df', // city walking

  // ── Auth page panels ──
  panel_kyoto:    'photo-1528360983277-13d401cdc186', // Kyoto street
  panel_amalfi:   'photo-1533104816931-20fa691ff6ca', // Amalfi vertical
  panel_paris:    'photo-1499856871958-5b9627545d1a', // Paris bridge night
  panel_travel:   'photo-1469854523086-cc02fe5d8800', // travel road
};

/** Fallback gradient */
export const FALLBACK_BG = FALLBACK_GRADIENT;

/**
 * Get a reliable direct Unsplash image URL by semantic key.
 * @param {string} key     - one of the PHOTO_LIBRARY keys
 * @param {number} width   - image width (default 1200)
 * @param {number} quality - jpeg quality 1-100 (default 85)
 */
export function getPhotoUrl(key, width = 1200, quality = 85) {
  const id = PHOTO_LIBRARY[key] || PHOTO_LIBRARY.hero_mountain_lake;
  return `https://images.unsplash.com/${id}?w=${width}&q=${quality}&auto=format&fit=crop`;
}

/**
 * Get a destination image URL by destination name string.
 * Fuzzy-matches the destination to the closest library key.
 */
export function getDestinationImage(destinationName = '', width = 800) {
  const name = destinationName.toLowerCase();

  if (name.includes('paris') || name.includes('france'))     return getPhotoUrl('paris', width);
  if (name.includes('london') || name.includes('uk') || name.includes('england')) return getPhotoUrl('london', width);
  if (name.includes('tokyo') || name.includes('japan'))      return getPhotoUrl('tokyo', width);
  if (name.includes('kyoto'))                                return getPhotoUrl('kyoto', width);
  if (name.includes('bali') || name.includes('indonesia'))   return getPhotoUrl('bali', width);
  if (name.includes('dubai') || name.includes('uae'))        return getPhotoUrl('dubai', width);
  if (name.includes('amalfi') || name.includes('positano') || name.includes('italy')) return getPhotoUrl('amalfi', width);
  if (name.includes('new york') || name.includes('nyc'))     return getPhotoUrl('new_york', width);
  if (name.includes('barcelona') || name.includes('spain'))  return getPhotoUrl('barcelona', width);
  if (name.includes('rome') || name.includes('roma'))        return getPhotoUrl('rome', width);
  if (name.includes('santorini') || name.includes('greece')) return getPhotoUrl('santorini', width);
  if (name.includes('amsterdam') || name.includes('netherlands')) return getPhotoUrl('amsterdam', width);
  if (name.includes('prague') || name.includes('czech'))     return getPhotoUrl('prague', width);
  if (name.includes('lisbon') || name.includes('portugal'))  return getPhotoUrl('lisbon', width);
  if (name.includes('singapore'))                            return getPhotoUrl('singapore', width);
  if (name.includes('iceland'))                              return getPhotoUrl('iceland', width);
  if (name.includes('maldives'))                             return getPhotoUrl('maldives', width);
  if (name.includes('swiss') || name.includes('switzerland') || name.includes('interlaken')) return getPhotoUrl('swiss_alps', width);
  if (name.includes('morocco') || name.includes('marrakech')) return getPhotoUrl('morocco', width);
  if (name.includes('vietnam'))                              return getPhotoUrl('vietnam', width);
  if (name.includes('new zealand'))                          return getPhotoUrl('new_zealand', width);
  if (name.includes('cappadocia') || name.includes('turkey')) return getPhotoUrl('cappadocia', width);
  if (name.includes('peru') || name.includes('machu'))       return getPhotoUrl('peru_machu', width);
  if (name.includes('india') || name.includes('taj'))        return getPhotoUrl('india_taj', width);
  if (name.includes('bangkok') || name.includes('thailand')) return getPhotoUrl('bangkok', width);
  if (name.includes('beach') || name.includes('island'))     return getPhotoUrl('beach', width);
  if (name.includes('mountain') || name.includes('alp'))     return getPhotoUrl('mountains', width);
  if (name.includes('autumn') || name.includes('retreat'))   return getPhotoUrl('kyoto', width);

  // Default fallback — scenic mountain lake
  return getPhotoUrl('hero_mountain_lake', width);
}

/**
 * Get activity/experience image by type or name.
 */
export function getActivityImage(name = '', type = '', width = 600) {
  const n = (name + ' ' + type).toLowerCase();
  if (n.includes('tea') || n.includes('ceremony'))     return getPhotoUrl('tea_ceremony', width);
  if (n.includes('hike') || n.includes('trek') || n.includes('walk')) return getPhotoUrl('hiking', width);
  if (n.includes('food') || n.includes('culinary') || n.includes('ramen') || n.includes('cook')) return getPhotoUrl('food_tour', width);
  if (n.includes('boat') || n.includes('cruise') || n.includes('sail')) return getPhotoUrl('boat_tour', width);
  if (n.includes('wine'))   return getPhotoUrl('wine_tasting', width);
  if (n.includes('scuba') || n.includes('dive'))       return getPhotoUrl('scuba_diving', width);
  if (n.includes('beach') || n.includes('surf'))       return getPhotoUrl('beach', width);
  if (n.includes('mountain') || n.includes('alps'))    return getPhotoUrl('swiss_alps', width);
  if (n.includes('city') || n.includes('tour'))        return getPhotoUrl('city_tour', width);
  if (n.includes('temple') || n.includes('cultural'))  return getPhotoUrl('kyoto', width);
  return getPhotoUrl('hero_mountain_lake', width);
}

/**
 * Handles img onError — hides broken image and applies fallback gradient to parent.
 */
export function handleImgError(e) {
  e.target.style.display = 'none';
  const parent = e.target.parentElement;
  if (parent && !parent.dataset.fallback) {
    parent.dataset.fallback = 'true';
    parent.style.background = FALLBACK_GRADIENT;
  }
}

// Legacy shims (kept for import compatibility)
export const getDynamicTravelImage = (query, w = 800) => getDestinationImage(query, w);
export const getStableTravelImage  = (query, w = 800) => getDestinationImage(query, w);
