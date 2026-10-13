(() => {
  'use strict';

  const icons = {
    all: '<path d="m12 3 2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1L12 3Z"/><path d="M19 16v5m-2.5-2.5h5"/>',
    phone: '<rect x="6.5" y="2.7" width="11" height="18.6" rx="2.1"/><path d="M10 5.5h4M11 18.3h2"/>',
    audio: '<path d="M4.5 13.5v-3a7.5 7.5 0 0 1 15 0v3"/><rect x="3.5" y="12" width="3.8" height="6" rx="1.4"/><rect x="16.7" y="12" width="3.8" height="6" rx="1.4"/><path d="M18 19c-.8 1-2 1.5-3.5 1.5"/>',
    watch: '<rect x="6.4" y="7.2" width="11.2" height="9.6" rx="2.6"/><path d="M9 2.8h6l.8 4.4H8.2L9 2.8ZM9 21.2h6l.8-4.4H8.2l.8 4.4Z"/><path d="m10 12 1.4 1.4 2.8-2.8"/>',
    fashion: '<path d="m8 5 4-2 4 2 4 3-2.4 3-2.1-1.4V21H8.5V9.6L6.4 11 4 8l4-3Z"/><path d="M9.5 4.3c.5 1 1.3 1.5 2.5 1.5s2-.5 2.5-1.5"/>',
    home: '<path d="m3 10.5 9-7 9 7"/><path d="M5 9.5V21h14V9.5M9 21v-7h6v7"/>',
    laptop: '<rect x="4" y="4" width="16" height="12" rx="1.5"/><path d="M2.5 20h19l-1-3H3.5l-1 3Z"/>',
    camera: '<path d="M4 7.5h3l1.4-2h7.2l1.4 2h3A1.5 1.5 0 0 1 21.5 9v10A1.5 1.5 0 0 1 20 20.5H4A1.5 1.5 0 0 1 2.5 19V9A1.5 1.5 0 0 1 4 7.5Z"/><circle cx="12" cy="13.5" r="3.4"/>',
    accessories: '<path d="M3 10h18l-1.6 9H4.6L3 10Z"/><path d="M7.5 10a4.5 4.5 0 0 1 9 0"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.7"/><path d="m16 16 4.1 4.1"/>',
    heart: '<path d="M20.4 8.7c0 5-8.4 10-8.4 10s-8.4-5-8.4-10a4.3 4.3 0 0 1 8.4-1.2 4.3 4.3 0 0 1 8.4 1.2Z"/>',
    bag: '<path d="M5 8.5h14l1 11H4l1-11Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    user: '<circle cx="12" cy="8" r="3.7"/><path d="M4.8 20c.5-3.5 3.3-5.5 7.2-5.5s6.7 2 7.2 5.5"/>',
    truck: '<path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="18" r="1.7"/><circle cx="17.5" cy="18" r="1.7"/>',
    shield: '<path d="M12 3 20 6v5.5c0 4.6-3.3 7.8-8 9.5-4.7-1.7-8-4.9-8-9.5V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    sparkle: '<path d="m12 3 2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h13m-5-5 5 5-5 5"/>',
    check: '<path d="m5 12.5 4.3 4.2L19 7"/>',
    star: '<path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 3Z"/>',
    lock: '<rect x="4.5" y="10" width="15" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',
    truckMini: '<path d="M2.8 7h11.4v9.5H2.8zM14.2 10.2h4.2l2.8 3v3.3h-7z"/><circle cx="6.5" cy="18" r="1.5"/><circle cx="17.5" cy="18" r="1.5"/>'
  };

  const icon = (name, size = 18, extraClass = '') => `<svg class="${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.sparkle}</svg>`;

  const categories = [
    { value: 'All', label: 'For you', icon: 'all' },
    { value: 'Mobiles', label: 'Mobiles', icon: 'phone' },
    { value: 'Audio', label: 'Audio', icon: 'audio' },
    { value: 'Wearables', label: 'Wearables', icon: 'watch' },
    { value: 'Fashion', label: 'Fashion', icon: 'fashion' },
    { value: 'Home', label: 'Home', icon: 'home' },
    { value: 'Computing', label: 'Computing', icon: 'laptop' },
    { value: 'Cameras', label: 'Cameras', icon: 'camera' },
    { value: 'Accessories', label: 'Accessories', icon: 'accessories' }
  ];

  const products = [
    {
      id: 'studio-one', brand: 'dayline audio', title: 'Studio One wireless headphones', category: 'Audio', price: 3499, mrp: 6999, rating: 4.7, reviews: '1.8k', image: 'assets/headphones.webp', tint: '#fff2b7',
      description: 'Sink into rich, balanced sound with soft over-ear cushions, easy-to-reach controls and a battery that keeps the playlist going.', ribbon: 'BEST SELLER', deal: true, rank: 1, stock: 18,
      specs: ['Up to 40 hrs playtime', 'Soft-touch ear cushions', 'Bluetooth 5.3', 'Fold-flat design']
    },
    {
      id: 'swift-buds', brand: 'dayline audio', title: 'SwiftPods true wireless earbuds', category: 'Audio', price: 1799, mrp: 3499, rating: 4.6, reviews: '2.4k', image: 'assets/earbuds.webp', tint: '#eef0fa',
      description: 'Small enough to take anywhere, with a snug fit, clear calls and a pocket-friendly charging case for all-day listening.', ribbon: 'FLASH PRICE', deal: true, rank: 2, stock: 32,
      specs: ['24 hrs with case', 'Touch controls', 'Clear-call microphones', 'USB-C charging case']
    },
    {
      id: 'pixelight-5g', brand: 'pixelight', title: 'Pixelight 5G smartphone · 128 GB', category: 'Mobiles', price: 18999, mrp: 24999, rating: 4.5, reviews: '3.2k', image: 'assets/phone.webp', tint: '#e6f2fa',
      description: 'A bright, roomy display, dependable all-day power and plenty of space for the photos, apps and everyday moments you want to keep.', ribbon: 'NEW & NOTED', deal: true, rank: 3, stock: 11,
      specs: ['6.6-inch Full HD+ display', '128 GB storage', '5000 mAh battery', '5G ready']
    },
    {
      id: 'pulse-watch', brand: 'dayline active', title: 'Pulse Active smart watch', category: 'Wearables', price: 2499, mrp: 4999, rating: 4.4, reviews: '980', image: 'assets/watch.webp', tint: '#ececf0',
      description: 'A clean everyday smartwatch with the essentials at a glance: movement, sleep, calls and notifications, all on your wrist.', ribbon: 'UP TO 50% OFF', deal: true, rank: 4, stock: 26,
      specs: ['1.8-inch colour display', 'Heart-rate & sleep tracking', 'IP68 splash resistant', 'Up to 7 days battery']
    },
    {
      id: 'streetflex-runner', brand: 'northway', title: 'Streetflex everyday runners', category: 'Fashion', price: 2699, mrp: 4499, rating: 4.5, reviews: '1.1k', image: 'assets/sneakers.webp', tint: '#f5e7e8',
      description: 'Light cushioning, a flexible sole and a pop of colour make these an easy pick for long walks, quick errands and wherever next.', ribbon: 'COMFY PICK', deal: true, rank: 5, stock: 14,
      specs: ['Lightweight knit upper', 'Cushioned foam midsole', 'Flexible rubber sole', 'True-to-size fit']
    },
    {
      id: 'pebble-beat', brand: 'dayline audio', title: 'Pebble Beat portable speaker', category: 'Audio', price: 2199, mrp: 3999, rating: 4.6, reviews: '764', image: 'assets/speaker.webp', tint: '#e8e6df',
      description: 'Big, room-filling sound in a grab-and-go shape. Take the good tunes from the kitchen to the balcony and everywhere between.', ribbon: 'LOVED FOR SOUND', deal: false, rank: 6, stock: 21,
      specs: ['12 hrs playtime', 'Water-resistant design', 'USB-C fast charge', 'Built-in mic for calls']
    },
    {
      id: 'metro-daypack', brand: 'roam goods', title: 'Metro Daypack · 22 litre', category: 'Fashion', price: 1799, mrp: 2799, rating: 4.3, reviews: '627', image: 'assets/backpack.webp', tint: '#eceeea',
      description: 'A neat, roomy daypack with thoughtful pockets, padded straps and a clean shape that works for commutes, campus and weekend plans.', ribbon: 'EVERYDAY ESSENTIAL', deal: false, rank: 7, stock: 36,
      specs: ['22 litre capacity', 'Padded 15-inch laptop sleeve', 'Water-resistant fabric', 'Two quick-access pockets']
    },
    {
      id: 'horizon-air', brand: 'horizon', title: 'Horizon Air laptop · 16 GB / 512 GB', category: 'Computing', price: 54990, mrp: 69990, rating: 4.6, reviews: '412', image: 'assets/laptop.webp', tint: '#e9edf3',
      description: 'A slim, capable everyday laptop for creative work, video calls and lots of open tabs, with the memory and storage to keep pace.', ribbon: 'SMART UPGRADE', deal: false, rank: 8, stock: 8,
      specs: ['16 GB memory', '512 GB SSD', 'Full HD anti-glare display', 'Backlit keyboard']
    },
    {
      id: 'slow-morning', brand: 'homekind', title: 'Slow Morning ceramic coffee mug set', category: 'Home', price: 1499, mrp: 2499, rating: 4.5, reviews: '258', image: 'assets/coffee.webp', tint: '#f4eee7',
      description: 'Make a little more room for a slow morning with a pair of feel-good ceramic mugs, made for that first quiet cup and every refill after.', ribbon: 'HOME FAVOURITE', deal: false, rank: 9, stock: 24,
      specs: ['Set of 2 ceramic mugs', '350 ml capacity each', 'Microwave safe', 'Dishwasher safe']
    },
    {
      id: 'frame-light', brand: 'sunday studio', title: 'Framelight everyday sunglasses', category: 'Accessories', price: 899, mrp: 1999, rating: 4.2, reviews: '540', image: 'assets/sunglasses.webp', tint: '#f4e8e6',
      description: 'A simple, easy-to-style frame with UV protection for bright commutes, sunny drives and all the little plans in between.', ribbon: 'UNDER ₹999', deal: false, rank: 10, stock: 42,
      specs: ['UV400 protection', 'Lightweight frame', 'Scratch-resistant lenses', 'Soft carry pouch included']
    },
    {
      id: 'snap-cam', brand: 'moment maker', title: 'Snap & Go digital camera', category: 'Cameras', price: 12999, mrp: 16999, rating: 4.4, reviews: '315', image: 'assets/camera.webp', tint: '#e9eef2',
      description: 'A fuss-free little camera for trips, get-togethers and the moments you want to keep off your phone roll.', ribbon: 'WEEKEND FIND', deal: false, rank: 11, stock: 12,
      specs: ['24 MP still photos', 'Full HD video', '3-inch preview screen', 'Rechargeable battery']
    }
  ];

  // Additional demo listings expand the storefront to a 100-item catalogue.
  // Replace this seed data with your product API when connecting a backend.
  const catalogueCopy = {
    Mobiles: {
      description: 'A dependable everyday smartphone with a bright screen, room for your apps and enough battery to keep up with the day.',
      specs: ['5G-ready connectivity', 'All-day battery', 'Bright HD+ display', 'Fast charging']
    },
    Audio: {
      description: 'Easy-to-love everyday audio with clear sound, handy controls and a comfortable fit for commutes, work and downtime.',
      specs: ['Clear, balanced sound', 'Easy device pairing', 'Comfort-first design', 'Warranty included']
    },
    Wearables: {
      description: 'A handy everyday wearable that keeps the essentials close, with a comfortable fit and a clean, easy-to-read display.',
      specs: ['Bright colour display', 'Activity tracking', 'Splash resistant', 'Everyday battery life']
    },
    Fashion: {
      description: 'A versatile everyday favourite with thoughtful details, a comfortable feel and a style that goes with more of your plans.',
      specs: ['Everyday-ready design', 'Comfortable fit', 'Easy-care materials', 'Made for daily use']
    },
    Home: {
      description: 'A feel-good home essential for slower mornings, shared cups and the small everyday rituals that make a place yours.',
      specs: ['Thoughtful everyday design', 'Easy to clean', 'Made for regular use', 'A lovely gift idea']
    },
    Computing: {
      description: 'A practical everyday tech upgrade for work, study and everything you like to keep within easy reach.',
      specs: ['Easy plug-and-play setup', 'Compact everyday design', 'Broad device compatibility', 'Warranty included']
    },
    Cameras: {
      description: 'A simple way to bring more of your favourite moments into focus, whether you are close to home or somewhere new.',
      specs: ['Easy-to-use controls', 'Sharp everyday photos', 'Compact carry design', 'Rechargeable battery']
    },
    Accessories: {
      description: 'A useful little everyday extra, designed to make your devices, commute or sunny plans that bit easier.',
      specs: ['Lightweight everyday design', 'Easy to carry', 'Made for daily use', 'Warranty included']
    }
  };

  const extraCatalogGroups = [
    {
      category: 'Mobiles', brand: 'Nova', image: 'assets/phone.webp', tint: '#e9f5ff', items: [
        ['nova-spark-n5', 'Spark N5 5G smartphone · 128 GB', 13999, 19999],
        ['nova-vista-pro', 'Vista Pro 5G smartphone · 256 GB', 24999, 31999],
        ['nova-lite-a9', 'Lite A9 smartphone · 128 GB', 9999, 14999],
        ['nova-maxview', 'MaxView 5G smartphone · 256 GB', 29999, 36999],
        ['nova-foldflex', 'FoldFlex 5G smartphone · 256 GB', 65999, 79999],
        ['nova-core-m8', 'Core M8 5G smartphone · 128 GB', 17999, 23999],
        ['nova-playone', 'PlayOne 5G gaming smartphone · 256 GB', 21999, 28999],
        ['nova-miniview', 'MiniView 4G smartphone · 64 GB', 7499, 10999]
      ]
    },
    {
      category: 'Mobiles', brand: 'Orbit', image: 'assets/phone.webp', tint: '#eef2ff', items: [
        ['orbit-air-5g', 'Air 5G smartphone · 128 GB', 15499, 20999],
        ['orbit-note-12', 'Note 12 5G smartphone · 256 GB', 19999, 26999],
        ['orbit-astro-lite', 'Astro Lite smartphone · 128 GB', 11999, 16999],
        ['orbit-edge-x', 'Edge X smartphone · 256 GB', 27999, 34999],
        ['orbit-xpro', 'XPro 5G smartphone · 256 GB', 32999, 41999],
        ['orbit-m7', 'M7 5G smartphone · 128 GB', 18499, 24999],
        ['orbit-go', 'Go everyday smartphone · 64 GB', 6999, 9999]
      ]
    },
    {
      category: 'Audio', brand: 'Dayline Audio', image: 'assets/headphones.webp', tint: '#fff2b7', items: [
        ['dayline-studio-max', 'Studio Max over-ear headphones', 4299, 7999],
        ['dayline-deep-tone', 'DeepTone wireless headphones', 2999, 5499],
        ['dayline-cloud-cans', 'CloudCans soft-cushion headphones', 2499, 4499],
        ['dayline-focus-anc', 'Focus ANC noise-cancelling headphones', 5999, 9999],
        ['dayline-travel-sound', 'TravelSound foldable headphones', 1999, 3499]
      ]
    },
    {
      category: 'Audio', brand: 'SwiftPods', image: 'assets/earbuds.webp', tint: '#eef0fa', items: [
        ['swiftpods-pro', 'SwiftPods Pro wireless earbuds', 2499, 4999],
        ['swiftpods-mini', 'SwiftPods Mini earbuds with case', 1199, 2499],
        ['swiftpods-clearcall', 'ClearCall ENC true wireless earbuds', 1899, 3499],
        ['swiftpods-sport', 'SportFit secure-fit earbuds', 1599, 2999],
        ['swiftpods-studio', 'Studio Buds with touch controls', 2799, 4999]
      ]
    },
    {
      category: 'Audio', brand: 'RoamSound', image: 'assets/speaker.webp', tint: '#e8e6df', items: [
        ['roamsound-pocket', 'PocketBoom portable Bluetooth speaker', 1499, 2799],
        ['roamsound-trail', 'TrailBeat water-resistant speaker', 2599, 4499],
        ['roamsound-room', 'RoomBoom 20 W wireless speaker', 3299, 5999],
        ['roamsound-neckband', 'BassGo wireless neckband', 999, 1999],
        ['roamsound-airloop', 'AirLoop all-day Bluetooth neckband', 1299, 2499]
      ]
    },
    {
      category: 'Wearables', brand: 'Pulse Active', image: 'assets/watch.webp', tint: '#ececf0', items: [
        ['pulse-move-2', 'Move 2 fitness smartwatch', 1999, 3999],
        ['pulse-colorfit', 'ColorFit AMOLED smartwatch', 3499, 6999],
        ['pulse-run-track', 'RunTrack GPS fitness watch', 4999, 7999],
        ['pulse-mini-round', 'Mini Round everyday smartwatch', 2299, 4499],
        ['pulse-kids-connect', 'Kids Connect calling smartwatch', 2799, 4999]
      ]
    },
    {
      category: 'Wearables', brand: 'Orbit Wear', image: 'assets/watch.webp', tint: '#f0eff6', items: [
        ['orbit-wear-active', 'Active Pro health-tracking watch', 3999, 6999],
        ['orbit-wear-classic', 'Classic dial smart watch', 2899, 5499],
        ['orbit-wear-slim', 'Slimline fitness band', 1499, 2999],
        ['orbit-wear-step', 'StepCount daily activity band', 999, 1999],
        ['orbit-wear-wave', 'Wave AMOLED smartwatch', 3199, 5999]
      ]
    },
    {
      category: 'Fashion', brand: 'Northway', image: 'assets/sneakers.webp', tint: '#f5e7e8', items: [
        ['northway-city-run', 'City Run lightweight sneakers', 2299, 3999],
        ['northway-daywalk', 'Daywalk everyday trainers', 1899, 3299],
        ['northway-trailform', 'Trailform cushioned running shoes', 3199, 5499],
        ['northway-easystride', 'EasyStride walking shoes', 2099, 3699],
        ['northway-driftflex', 'DriftFlex knit running shoes', 2799, 4999],
        ['northway-cloudwalk', 'Cloudwalk comfort slip-ons', 1699, 2999]
      ]
    },
    {
      category: 'Fashion', brand: 'Roam Goods', image: 'assets/backpack.webp', tint: '#eceeea', items: [
        ['roam-metro-crossbody', 'Metro crossbody day bag', 1199, 2199],
        ['roam-travellite', 'TravelLite commuter backpack', 1999, 3299],
        ['roam-city-tote', 'City Tote everyday carry bag', 999, 1799],
        ['roam-weekender', 'Weekender overnight duffel bag', 2499, 4299],
        ['roam-everyday-sling', 'Everyday Sling compact bag', 899, 1599],
        ['roam-mini-pack', 'Mini Pack casual backpack', 1399, 2399]
      ]
    },
    {
      category: 'Home', brand: 'Homekind', image: 'assets/coffee.webp', tint: '#f4eee7', items: [
        ['homekind-cup-set', 'Sunday ceramic coffee mug set · 2 pcs', 799, 1399],
        ['homekind-pour-over', 'Pour-over coffee dripper starter set', 1199, 1999],
        ['homekind-sipmate', 'SipMate insulated travel tumbler · 450 ml', 699, 1199],
        ['homekind-tea-pot', 'Slow Morning glass tea pot · 700 ml', 999, 1699],
        ['homekind-latte-glass', 'Latte art glass cup set · 2 pcs', 649, 1099],
        ['homekind-coffee-tin', 'Fresh Brew coffee storage canister', 549, 999],
        ['homekind-flask', 'Daybreak stainless coffee flask', 899, 1599]
      ]
    },
    {
      category: 'Home', brand: 'Brewline', image: 'assets/coffee.webp', tint: '#f7eee7', items: [
        ['brewline-filter-set', 'Reusable pour-over filter set', 399, 799],
        ['brewline-tea-box', 'Little Rituals loose-leaf tea sampler', 599, 999],
        ['brewline-espresso-cups', 'Espresso cup and saucer set · 4 pcs', 899, 1499],
        ['brewline-cold-brew', 'Cold brew glass coffee bottle · 600 ml', 749, 1299],
        ['brewline-french-press', 'French press coffee maker · 600 ml', 1299, 2199],
        ['brewline-coffee-gift', 'Good Morning coffee gift set', 1499, 2499]
      ]
    },
    {
      category: 'Computing', brand: 'Horizon', image: 'assets/laptop.webp', tint: '#e9edf3', items: [
        ['horizon-slimkey', 'SlimKey wireless keyboard', 1499, 2499],
        ['horizon-airclick', 'AirClick silent wireless mouse', 699, 1199],
        ['horizon-tunecam', 'TuneCam HD webcam with mic', 1799, 2999],
        ['horizon-foldstand', 'FoldStand adjustable laptop stand', 999, 1799],
        ['horizon-powerdock', 'PowerDock USB-C hub · 6-in-1', 2299, 3999]
      ]
    },
    {
      category: 'Computing', brand: 'Workday Tech', image: 'assets/laptop.webp', tint: '#eef1f5', items: [
        ['workday-skyview', 'SkyView 24-inch Full HD monitor', 8999, 12999],
        ['workday-laptop-sleeve', 'SoftShell 15-inch laptop sleeve', 899, 1599],
        ['workday-quiettype', 'QuietType mechanical keyboard', 3499, 5499]
      ]
    },
    {
      category: 'Cameras', brand: 'Moment Maker', image: 'assets/camera.webp', tint: '#e9eef2', items: [
        ['moment-clickmini', 'ClickMini point-and-shoot camera', 8999, 11999],
        ['moment-travelzoom', 'TravelZoom 4K digital camera', 16999, 21999],
        ['moment-clearshot', 'ClearShot mirrorless camera kit', 42999, 52999],
        ['moment-pocketfilm', 'PocketFilm instant print camera', 6499, 8999]
      ]
    },
    {
      category: 'Accessories', brand: 'Sunday Studio', image: 'assets/sunglasses.webp', tint: '#f4e8e6', items: [
        ['sunday-polarised', 'UrbanShade polarised sunglasses', 1099, 1999],
        ['sunday-blue-light', 'ClearView blue-light glasses', 799, 1499],
        ['sunday-sport-shade', 'MoveFit lightweight sport sunglasses', 1299, 2299],
        ['sunday-round-frame', 'Sunday round-frame UV sunglasses', 999, 1799]
      ]
    },
    {
      category: 'Accessories', brand: 'Loopline', image: 'assets/phone.webp', tint: '#e8f2f8', items: [
        ['loopline-powerbank-10k', 'PowerPop 10,000 mAh power bank', 1199, 1999],
        ['loopline-travel-adapter', 'FlexCharge universal travel adaptor', 899, 1599],
        ['loopline-usbc-braid', 'LoopLine braided USB-C cable · 2 m', 299, 599],
        ['loopline-phone-stand', 'MiniGrip foldable phone stand', 399, 799],
        ['loopline-phone-cover', 'SoftTouch clear phone case', 349, 699]
      ]
    },
    {
      category: 'Accessories', brand: 'Carrywell', image: 'assets/backpack.webp', tint: '#eceeea', items: [
        ['carrywell-laptop-pouch', 'Carrywell padded laptop sleeve', 999, 1799],
        ['carrywell-watch-band', 'Everyday soft-touch watch strap', 499, 899],
        ['carrywell-lens-kit', 'SnapOn clip-on phone lens kit', 1299, 2199]
      ]
    }
  ];

  const ribbonOptions = ['DAYLINE PICK', 'GOOD VALUE', 'DAILY DEAL', 'FRESH FIND'];
  let generatedIndex = 0;
  const extraProducts = extraCatalogGroups.flatMap(group => group.items.map(([id, title, price, mrp]) => {
    const catalogueIndex = products.length + generatedIndex++;
    return {
      id,
      brand: group.brand,
      title,
      category: group.category,
      price,
      mrp,
      rating: Number((4.2 + ((catalogueIndex + id.length) % 7) / 10).toFixed(1)),
      reviews: `${180 + ((catalogueIndex * 173) % 4200)}`,
      image: group.image,
      tint: group.tint,
      description: catalogueCopy[group.category].description,
      ribbon: ribbonOptions[catalogueIndex % ribbonOptions.length],
      deal: catalogueIndex % 7 === 0 || catalogueIndex % 13 === 0,
      rank: catalogueIndex + 1,
      stock: 6 + ((catalogueIndex * 7) % 37),
      specs: catalogueCopy[group.category].specs
    };
  }));
  products.push(...extraProducts);

  const heroSlides = [
    {
      theme: 'sunshine', eyebrow: 'THE DAYLINE DROP · LIVE NOW', title: 'Find your<br><em>happy sound.</em>', description: 'Big audio. Little prices. Meet the headphones and earbuds that make every day sound better.', image: 'assets/headphones.webp', alt: 'Black wireless headphones on a bright yellow background', tagTop: 'THE SOUND OF SAVING', tagText: 'Up to 60% off audio', caption: 'Your next favourite is closer than you think.', cta: 'Shop audio', category: 'Audio'
    },
    {
      theme: 'ocean', eyebrow: 'A FRESH TAKE ON EVERYDAY TECH', title: 'Better days,<br><em>in your pocket.</em>', description: 'A brighter screen, a bigger battery and the little upgrades that make your day flow.', image: 'assets/phone.webp', alt: 'Smartphone with a bright screen on a clean white desk', tagTop: 'A SMART LITTLE UPGRADE', tagText: 'Phones from ₹18,999', caption: 'Made for wherever today takes you.', cta: 'Shop mobiles', category: 'Mobiles'
    },
    {
      theme: 'peach', eyebrow: 'GOOD DAYS ARE MOVING DAYS', title: 'Make room for<br><em>more outside.</em>', description: 'Comfy everyday runners, feel-good prices. Your next little adventure starts here.', image: 'assets/sneakers.webp', alt: 'Bright red running sneaker in a studio setting', tagTop: 'STEP INTO A DEAL', tagText: 'Up to 40% off style', caption: 'A softer landing on every step.', cta: 'Shop fashion', category: 'Fashion'
    }
  ];

  const initialState = {
    category: 'All',
    query: '',
    sort: 'featured',
    showAll: false,
    drawerType: 'cart',
    selectedProduct: null,
    detailQty: 1,
    galleryView: 0,
    heroIndex: 0
  };
  const state = { ...initialState };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const moneyFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
  const formatPrice = value => `₹${moneyFormatter.format(value)}`;
  const discountFor = product => Math.max(0, Math.round((1 - product.price / product.mrp) * 100));
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const productById = id => products.find(product => product.id === id);
  const safeRead = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  };

  const restoredCart = safeRead('dayline_cart_v1', {});
  const cart = {};
  if (restoredCart && typeof restoredCart === 'object' && !Array.isArray(restoredCart)) {
    Object.entries(restoredCart).forEach(([id, quantity]) => {
      if (productById(id) && Number.isFinite(Number(quantity)) && Number(quantity) > 0) cart[id] = Math.min(99, Math.floor(Number(quantity)));
    });
  }
  const restoredWishlist = safeRead('dayline_wishlist_v1', []);
  const wishlist = new Set(Array.isArray(restoredWishlist) ? restoredWishlist.filter(id => productById(id)) : []);

  function persistState() {
    try {
      localStorage.setItem('dayline_cart_v1', JSON.stringify(cart));
      localStorage.setItem('dayline_wishlist_v1', JSON.stringify([...wishlist]));
    } catch { /* Private browsing or storage disabled: the cart still works for this visit. */ }
  }

  function renderCategories() {
    const nav = $('#categoryNav');
    const pills = $('#categoryPills');
    nav.innerHTML = categories.map(category => `
      <button type="button" class="nav-category ${state.category === category.value ? 'is-active' : ''}" data-action="set-category" data-category="${category.value}" aria-pressed="${state.category === category.value}">
        ${icon(category.icon, 15)}<span>${category.label}</span>
      </button>`).join('');
    pills.innerHTML = categories.map(category => `
      <button type="button" class="category-chip ${state.category === category.value ? 'is-active' : ''}" data-action="set-category" data-category="${category.value}" aria-pressed="${state.category === category.value}">
        <span class="category-chip-icon">${icon(category.icon, 17)}</span><span>${category.value === 'All' ? 'Everything' : category.label}</span>
      </button>`).join('');
  }

  function getFilteredProducts() {
    const query = state.query.trim().toLowerCase();
    let result = products.filter(product => {
      const inCategory = state.category === 'All' || product.category === state.category;
      const haystack = [product.title, product.category, product.brand, product.description, ...product.specs].join(' ').toLowerCase();
      return inCategory && (!query || haystack.includes(query));
    });
    if (state.sort === 'price-low') result = result.slice().sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-high') result = result.slice().sort((a, b) => b.price - a.price);
    else if (state.sort === 'rating') result = result.slice().sort((a, b) => b.rating - a.rating);
    else if (state.sort === 'discount') result = result.slice().sort((a, b) => discountFor(b) - discountFor(a));
    else result = result.slice().sort((a, b) => a.rank - b.rank);
    return result;
  }

  function renderActiveFilters() {
    const row = $('#activeFilterRow');
    const chips = [];
    if (state.category !== 'All') chips.push(`<span class="active-filter-chip">${escapeHtml(state.category)}<button type="button" data-action="clear-category" aria-label="Remove category filter">×</button></span>`);
    if (state.query) chips.push(`<span class="active-filter-chip">“${escapeHtml(state.query)}”<button type="button" data-action="clear-query" aria-label="Remove search filter">×</button></span>`);
    if (chips.length) {
      row.hidden = false;
      row.innerHTML = `${chips.join('')}<button class="clear-all-filters" type="button" data-action="clear-filters">Clear all</button>`;
    } else {
      row.hidden = true;
      row.innerHTML = '';
    }
  }

  function renderProducts() {
    const grid = $('#productGrid');
    const empty = $('#emptyState');
    const filtered = getFilteredProducts();
    const limit = state.showAll ? filtered.length : 8;
    const visibleProducts = filtered.slice(0, limit);
    $('#productCount').textContent = `${filtered.length} ${filtered.length === 1 ? 'good find' : 'good finds'}`;
    if (state.query) $('#productsSubtitle').textContent = `Showing the things that match “${state.query}”.`;
    else if (state.category !== 'All') $('#productsSubtitle').textContent = `A few good ${state.category.toLowerCase()} finds, picked for everyday.`;
    else $('#productsSubtitle').textContent = 'The useful little things you’ll be glad you found.';
    const heading = state.query ? 'Search results' : (state.category === 'All' ? 'Everyday upgrades' : escapeHtml(state.category));
    $('#productsTitle').innerHTML = `${heading}<span class="title-period">.</span>`;
    renderActiveFilters();
    if (!filtered.length) {
      grid.innerHTML = '';
      grid.hidden = true;
      empty.hidden = false;
      $('#loadMore').hidden = true;
      return;
    }
    grid.hidden = false;
    empty.hidden = true;
    grid.innerHTML = visibleProducts.map((product, index) => {
      const discount = discountFor(product);
      const saved = wishlist.has(product.id);
      return `
        <article class="product-card" style="--tile-bg:${product.tint};animation-delay:${Math.min(index * 35, 245)}ms">
          <div class="product-media">
            <span class="product-discount-tag">${discount}% OFF</span>
            <button class="product-wishlist ${saved ? 'is-saved' : ''}" type="button" data-action="toggle-wishlist" data-id="${product.id}" aria-label="${saved ? 'Remove' : 'Add'} ${escapeHtml(product.title)} ${saved ? 'from' : 'to'} wishlist" aria-pressed="${saved}">${icon('heart', 16)}</button>
            <button class="product-image-button" type="button" data-action="open-product" data-id="${product.id}" aria-label="View ${escapeHtml(product.title)}">
              <img class="product-image" src="${product.image}" alt="${escapeHtml(product.title)}" width="760" height="640" loading="lazy" decoding="async">
            </button>
          </div>
          <div class="product-info">
            <p class="product-brand">${escapeHtml(product.brand)}</p>
            <button class="product-title" type="button" data-action="open-product" data-id="${product.id}">${escapeHtml(product.title)}</button>
            <div class="product-meta-row"><span class="rating-pill">${product.rating.toFixed(1)} ${icon('star', 9)}</span><span class="rating-count">(${product.reviews})</span></div>
            <div class="product-price-row"><strong class="product-price">${formatPrice(product.price)}</strong><s class="product-mrp">${formatPrice(product.mrp)}</s><span class="product-save">${discount}% off</span></div>
            <div class="product-bottom-row"><span class="free-delivery">${icon('truck', 13)} Free delivery</span><button class="add-button" type="button" data-action="add-to-cart" data-id="${product.id}">${icon('plus', 13)} Add</button></div>
          </div>
        </article>`;
    }).join('');
    $('#loadMore').innerHTML = `Show all ${filtered.length} products ${icon('arrow', 14)}`;
    $('#loadMore').hidden = filtered.length <= 8 || state.showAll;
  }

  function renderDeals() {
    const dealProducts = products.filter(product => product.deal).slice(0, 5);
    $('#dealTrack').innerHTML = dealProducts.map(product => `
      <article class="deal-card" style="--deal-bg:${product.tint}" data-action="open-product" data-id="${product.id}" tabindex="0" role="button" aria-label="View ${escapeHtml(product.title)}">
        <div class="deal-card-image"><img src="${product.image}" width="760" height="640" loading="lazy" decoding="async" alt=""></div>
        <div class="deal-card-copy"><small>${escapeHtml(product.category)} · limited-time deal</small><strong>${escapeHtml(product.title)}</strong><div class="deal-price-row"><b>${formatPrice(product.price)}</b><s>${formatPrice(product.mrp)}</s></div><span class="deal-off">${discountFor(product)}% off · while it lasts</span></div>
      </article>`).join('');
  }

  function updateHeaderCounts() {
    const bagCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
    const cartCount = $('#cartCount');
    const wishlistCount = $('#wishlistCount');
    cartCount.textContent = String(bagCount);
    wishlistCount.textContent = String(wishlist.size);
    cartCount.hidden = bagCount === 0;
    wishlistCount.hidden = wishlist.size === 0;
    $('#cartButton').setAttribute('aria-label', `Open shopping bag${bagCount ? ` with ${bagCount} ${bagCount === 1 ? 'item' : 'items'}` : ''}`);
    $('#wishlistButton').setAttribute('aria-label', `Open wishlist${wishlist.size ? ` with ${wishlist.size} ${wishlist.size === 1 ? 'item' : 'items'}` : ''}`);
    if (!$('#drawerBackdrop').hidden && state.drawerType === 'cart') renderDrawer('cart');
  }

  function toast(message) {
    const toastElement = $('#toast');
    $('#toastMessage').textContent = message;
    toastElement.classList.add('is-visible');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => toastElement.classList.remove('is-visible'), 2600);
  }

  function addToCart(id, quantity = 1, notify = true) {
    if (!productById(id)) return;
    cart[id] = Math.min(99, (cart[id] || 0) + quantity);
    persistState();
    updateHeaderCounts();
    if (notify) toast('A good find, added to your bag.');
  }

  function toggleWishlist(id) {
    const product = productById(id);
    if (!product) return;
    const isSaved = wishlist.has(id);
    if (isSaved) wishlist.delete(id); else wishlist.add(id);
    persistState();
    updateHeaderCounts();
    renderProducts();
    if (!$('#drawerBackdrop').hidden && state.drawerType === 'wishlist') renderDrawer('wishlist');
    toast(isSaved ? 'Removed from your favourites.' : 'Saved to your favourites.');
  }

  function cartItems() {
    return Object.entries(cart).map(([id, quantity]) => ({ product: productById(id), quantity })).filter(entry => entry.product);
  }

  function renderDrawer(type = 'cart') {
    state.drawerType = type;
    const drawer = $('#sideDrawer');
    const title = $('#drawerTitle');
    const kicker = $('#drawerKicker');
    const content = $('#drawerContent');
    const count = $('#drawerCount');
    if (type === 'wishlist') {
      const items = [...wishlist].map(productById).filter(Boolean);
      drawer.setAttribute('aria-label', 'Your favourites');
      kicker.textContent = 'THE THINGS YOU LOVE';
      title.innerHTML = 'Your favourites <span id="drawerCount">(' + items.length + ')</span>';
      if (!items.length) {
        content.innerHTML = `<div class="drawer-empty"><span class="drawer-empty-icon">${icon('heart', 28)}</span><h3>Nothing saved just yet</h3><p>Tap the little heart on anything you love and it’ll be waiting here.</p><button class="button-primary" type="button" data-action="close-drawer">Find something good ${icon('arrow', 14)}</button></div>`;
        return;
      }
      content.innerHTML = `<p class="drawer-subtitle">A little list of the things you've got your eye on.</p><div class="drawer-items">${items.map(product => `
        <article class="drawer-item" style="--tile-bg:${product.tint}">
          <button class="drawer-item-image" type="button" data-action="open-product" data-id="${product.id}" aria-label="View ${escapeHtml(product.title)}"><img src="${product.image}" width="760" height="640" loading="lazy" alt=""></button>
          <div class="drawer-item-main"><small>${escapeHtml(product.category)}</small><strong>${escapeHtml(product.title)}</strong><div class="drawer-item-price">${formatPrice(product.price)} <s class="drawer-item-old">${formatPrice(product.mrp)}</s></div><div class="wishlist-item-actions"><button class="wishlist-add" type="button" data-action="wishlist-add" data-id="${product.id}">${icon('bag', 12)} Add to bag</button><button class="wishlist-remove" type="button" data-action="wishlist-remove" data-id="${product.id}">Remove</button></div></div>
          <div class="drawer-item-side"><span class="product-save">${discountFor(product)}% off</span></div>
        </article>`).join('')}</div><p class="drawer-footnote">Prices are shown in Indian Rupees (INR).</p>`;
      return;
    }

    const items = cartItems();
    const itemCount = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = items.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= 499 ? 0 : 49;
    const total = subtotal + shipping;
    drawer.setAttribute('aria-label', 'Shopping bag');
    kicker.textContent = 'A LITTLE SOMETHING GOOD';
    title.innerHTML = `Your bag <span id="drawerCount">(${itemCount})</span>`;
    if (!items.length) {
      content.innerHTML = `<div class="drawer-empty"><span class="drawer-empty-icon">${icon('bag', 29)}</span><h3>Your bag is having a quiet moment</h3><p>Find something lovely for your everyday. We’ll keep it safe right here.</p><button class="button-primary" type="button" data-action="close-drawer">Go find a good thing ${icon('arrow', 14)}</button></div>`;
      return;
    }
    content.innerHTML = `
      <div class="drawer-items">${items.map(({ product, quantity }) => `
        <article class="drawer-item" style="--tile-bg:${product.tint}">
          <button class="drawer-item-image" type="button" data-action="open-product" data-id="${product.id}" aria-label="View ${escapeHtml(product.title)}"><img src="${product.image}" width="760" height="640" loading="lazy" alt=""></button>
          <div class="drawer-item-main"><small>${escapeHtml(product.brand)}</small><strong>${escapeHtml(product.title)}</strong><div class="drawer-item-price">${formatPrice(product.price)} <s class="drawer-item-old">${formatPrice(product.mrp)}</s></div><div class="drawer-qty" aria-label="Quantity"><button type="button" data-action="cart-qty" data-id="${product.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${quantity}</span><button type="button" data-action="cart-qty" data-id="${product.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div>
          <div class="drawer-item-side"><button class="remove-item" type="button" data-action="remove-cart" data-id="${product.id}" aria-label="Remove ${escapeHtml(product.title)}">×</button><span class="product-save">${formatPrice(product.price * quantity)}</span></div>
        </article>`).join('')}</div>
      <div class="drawer-summary"><h3>Order summary</h3><div class="summary-row"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${shipping ? formatPrice(shipping) : 'FREE'}</strong></div><div class="summary-row total"><span>Total</span><strong>${formatPrice(total)}</strong></div><p class="free-shipping-note">${icon('truck', 14)} ${subtotal >= 499 ? 'Lovely — your delivery is on us.' : `Add ${formatPrice(499 - subtotal)} more for free delivery.`}</p><button class="checkout-button" type="button" data-action="checkout">Continue to checkout ${icon('arrow', 15)}</button><p class="drawer-footnote">Secure checkout · Taxes included in product prices</p></div>`;
  }

  function openDrawer(type = 'cart') {
    closeProfilePopover();
    renderDrawer(type);
    const backdrop = $('#drawerBackdrop');
    backdrop.hidden = false;
    document.body.classList.add('no-scroll');
    $('#sideDrawer').setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      backdrop.classList.add('is-visible');
      $('#sideDrawer').classList.add('is-open');
    });
    window.setTimeout(() => $('#sideDrawer').focus(), 80);
  }

  function closeDrawer() {
    const backdrop = $('#drawerBackdrop');
    $('#sideDrawer').classList.remove('is-open');
    $('#sideDrawer').setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!$('#sideDrawer').classList.contains('is-open')) backdrop.hidden = true;
      if ($('#modalBackdrop').hidden) document.body.classList.remove('no-scroll');
    }, 240);
  }

  const galleryPositions = ['50% 50%', '34% 50%', '68% 50%'];
  const galleryScales = [1, 1.18, 1.12];

  function applyGalleryView(index) {
    const product = productById(state.selectedProduct);
    if (!product) return;
    state.galleryView = index;
    const image = $('#detailImage');
    if (image) {
      image.style.objectPosition = galleryPositions[index] || '50% 50%';
      image.style.transform = `scale(${galleryScales[index] || 1})`;
    }
    $$('.gallery-thumb').forEach(button => {
      const active = Number(button.dataset.index) === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const label = $('.gallery-stage-label');
    if (label) label.textContent = `Product photo · ${index + 1} / 3`;
  }

  function renderModal(product) {
    const discount = discountFor(product);
    const savings = product.mrp - product.price;
    const galleryButtons = [0, 1, 2].map(index => `
      <button class="gallery-thumb ${index === 0 ? 'is-active' : ''}" type="button" data-action="gallery-view" data-index="${index}" aria-label="View product photo ${index + 1}" aria-pressed="${index === 0}"><img src="${product.image}" width="760" height="640" alt=""></button>`).join('');
    $('#modalContent').innerHTML = `
      <div class="modal-layout">
        <div class="detail-gallery" style="--tile-bg:${product.tint}">
          <div class="gallery-thumbnails" aria-label="Product photo thumbnails">${galleryButtons}</div>
          <div class="gallery-stage" style="--tile-bg:${product.tint}"><img id="detailImage" src="${product.image}" width="760" height="640" alt="${escapeHtml(product.title)}" decoding="async"><span class="gallery-stage-label">Product photo · 1 / 3</span></div>
        </div>
        <div class="modal-detail-copy">
          <div class="detail-category"><span class="detail-category-dot"></span>${escapeHtml(product.brand)} <span>·</span> ${escapeHtml(product.category)}</div>
          <h2 id="modalTitle">${escapeHtml(product.title)}</h2>
          <p class="detail-description">${escapeHtml(product.description)}</p>
          <div class="detail-ratings"><span class="rating-pill">${product.rating.toFixed(1)} ${icon('star', 9)}</span><span>${escapeHtml(product.reviews)} verified ratings</span><span>·</span><span>Popular pick</span></div>
          <div class="detail-price-card">
            <div class="detail-price-top"><strong class="detail-current-price">${formatPrice(product.price)}</strong><s class="detail-old-price">${formatPrice(product.mrp)}</s><span class="detail-discount">${discount}% OFF</span></div>
            <div class="tax-note">Inclusive of all taxes</div>
            <div class="price-breakdown"><div class="price-breakdown-row"><span>Market price</span><strong>${formatPrice(product.mrp)}</strong></div><div class="price-breakdown-row"><span>dayline deal</span><strong class="saved">− ${formatPrice(savings)}</strong></div><div class="price-breakdown-row"><span>Delivery</span><strong class="saved">FREE</strong></div><div class="price-breakdown-row"><span>Today's price</span><strong>${formatPrice(product.price)}</strong></div></div>
          </div>
          <div class="stock-row"><span class="stock-dot"></span><span>In stock</span><small>· Ready to ship in 24 hours</small></div>
          <ul class="detail-specs">${product.specs.map(spec => `<li>${escapeHtml(spec)}</li>`).join('')}</ul>
          <div class="detail-buy-row"><div class="detail-quantity" aria-label="Choose quantity"><button type="button" data-action="detail-qty" data-delta="-1" aria-label="Decrease quantity">−</button><span id="detailQty">${state.detailQty}</span><button type="button" data-action="detail-qty" data-delta="1" aria-label="Increase quantity">+</button></div><button class="detail-add-button" type="button" data-action="modal-add" data-id="${product.id}">${icon('bag', 14)} Add to bag</button><button class="detail-buy-button" type="button" data-action="buy-now" data-id="${product.id}">Buy now ${icon('arrow', 14)}</button></div>
          <div class="detail-footer-note">${icon('shield', 14)} Easy 7-day returns · Secure checkout · Free delivery</div>
        </div>
      </div>`;
    applyGalleryView(state.galleryView);
  }

  function openProduct(id) {
    const product = productById(id);
    if (!product) return;
    if (!$('#drawerBackdrop').hidden) closeDrawer();
    state.selectedProduct = id;
    state.detailQty = 1;
    state.galleryView = 0;
    renderModal(product);
    const backdrop = $('#modalBackdrop');
    backdrop.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => backdrop.classList.add('is-visible'));
    window.setTimeout(() => $('#productModal').focus(), 60);
  }

  function closeModal() {
    const backdrop = $('#modalBackdrop');
    backdrop.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!backdrop.classList.contains('is-visible')) backdrop.hidden = true;
      if ($('#drawerBackdrop').hidden) document.body.classList.remove('no-scroll');
    }, 220);
    state.selectedProduct = null;
  }

  function changeCartQuantity(id, delta) {
    if (!cart[id]) return;
    const next = cart[id] + delta;
    if (next <= 0) delete cart[id]; else cart[id] = Math.min(99, next);
    persistState();
    updateHeaderCounts();
    renderDrawer('cart');
  }

  function removeFromCart(id) {
    delete cart[id];
    persistState();
    updateHeaderCounts();
    renderDrawer('cart');
    toast('Removed from your bag.');
  }

  function closeProfilePopover() {
    const popover = $('#profilePopover');
    popover.hidden = true;
    $('#profileButton').setAttribute('aria-expanded', 'false');
  }

  function toggleProfilePopover() {
    const popover = $('#profilePopover');
    const willOpen = popover.hidden;
    popover.hidden = !willOpen;
    $('#profileButton').setAttribute('aria-expanded', String(willOpen));
  }

  function setCategory(category, shouldScroll = true) {
    if (!categories.some(entry => entry.value === category)) return;
    state.category = category;
    state.query = '';
    state.showAll = false;
    $('#searchInput').value = '';
    $('#searchClear').hidden = true;
    $('#searchSuggestions').hidden = true;
    $('#searchInput').setAttribute('aria-expanded', 'false');
    renderCategories();
    renderProducts();
    if (shouldScroll) $('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateSearchSuggestions(query) {
    const box = $('#searchSuggestions');
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      box.hidden = true;
      $('#searchInput').setAttribute('aria-expanded', 'false');
      return;
    }
    const matches = products.filter(product => `${product.title} ${product.category} ${product.brand}`.toLowerCase().includes(normalized)).slice(0, 4);
    box.innerHTML = `<div class="suggestion-heading">${matches.length ? 'Good things you might mean' : 'No exact match'}</div>${matches.length ? matches.map(product => `<button class="suggestion-item" type="button" role="option" data-action="choose-suggestion" data-id="${product.id}">${icon('search', 15)}<span>${escapeHtml(product.title)}</span><small>${escapeHtml(product.category)}</small></button>`).join('') : `<div class="suggestion-empty">Keep typing, or press enter to see all results.</div>`}`;
    box.hidden = false;
    $('#searchInput').setAttribute('aria-expanded', 'true');
  }

  function submitSearch() {
    state.query = $('#searchInput').value.trim();
    state.category = 'All';
    state.showAll = false;
    $('#searchSuggestions').hidden = true;
    $('#searchInput').setAttribute('aria-expanded', 'false');
    $('#searchClear').hidden = !state.query;
    renderCategories();
    renderProducts();
    $('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (state.query) {
      const count = getFilteredProducts().length;
      toast(`${count} ${count === 1 ? 'find' : 'finds'} for “${state.query}”.`);
    }
  }

  function updateDetailQuantity(delta) {
    state.detailQty = Math.max(1, Math.min(99, state.detailQty + delta));
    const qty = $('#detailQty');
    if (qty) qty.textContent = String(state.detailQty);
  }

  function buyNow(id) {
    addToCart(id, state.detailQty, false);
    closeModal();
    openDrawer('cart');
    toast('Ready when you are — your bag is waiting.');
  }

  let activeHeroIndex = 0;
  function renderHeroDots() {
    $('#heroDots').innerHTML = heroSlides.map((_, index) => `<button type="button" class="hero-dot ${index === activeHeroIndex ? 'is-active' : ''}" data-action="hero-go" data-index="${index}" aria-label="Show promotion ${index + 1}" aria-pressed="${index === activeHeroIndex}"></button>`).join('');
  }

  function showHero(index) {
    activeHeroIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[activeHeroIndex];
    const image = $('#heroImage');
    image.classList.add('is-switching');
    $('#heroShell').dataset.theme = slide.theme;
    $('#heroEyebrow').textContent = slide.eyebrow;
    $('#heroTitle').innerHTML = slide.title;
    $('#heroDescription').textContent = slide.description;
    $('#heroTagTop').textContent = slide.tagTop;
    $('#heroTagText').textContent = slide.tagText;
    $('#heroCaption').textContent = slide.caption;
    $('#heroCta').innerHTML = `${escapeHtml(slide.cta)} ${icon('arrow', 17)}`;
    $('#heroCta').dataset.category = slide.category;
    $('#heroIndex').textContent = String(activeHeroIndex + 1).padStart(2, '0');
    image.alt = slide.alt;
    image.onload = () => image.classList.remove('is-switching');
    image.src = slide.image;
    if (image.complete) window.setTimeout(() => image.classList.remove('is-switching'), 50);
    renderHeroDots();
  }

  const timerEnd = new Date();
  timerEnd.setHours(23, 59, 59, 999);
  if (timerEnd.getTime() <= Date.now()) timerEnd.setDate(timerEnd.getDate() + 1);
  function updateCountdown() {
    let remaining = Math.max(0, timerEnd.getTime() - Date.now());
    if (remaining <= 0) remaining = 24 * 60 * 60 * 1000;
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    $('#countHours').textContent = String(hours).padStart(2, '0');
    $('#countMinutes').textContent = String(minutes).padStart(2, '0');
    $('#countSeconds').textContent = String(seconds).padStart(2, '0');
  }

  function handleAction(button) {
    const { action, id, category } = button.dataset;
    switch (action) {
      case 'set-category': setCategory(category); break;
      case 'open-product': openProduct(id); break;
      case 'toggle-wishlist': toggleWishlist(id); break;
      case 'add-to-cart': addToCart(id); break;
      case 'open-cart': openDrawer('cart'); break;
      case 'open-wishlist': openDrawer('wishlist'); break;
      case 'close-drawer': closeDrawer(); break;
      case 'close-modal': closeModal(); break;
      case 'clear-filters':
        state.category = 'All'; state.query = ''; state.showAll = false; $('#searchInput').value = ''; $('#searchClear').hidden = true; renderCategories(); renderProducts();
        break;
      case 'clear-category': setCategory('All', false); break;
      case 'clear-query': state.query = ''; $('#searchInput').value = ''; $('#searchClear').hidden = true; renderProducts(); break;
      case 'load-more': state.showAll = true; renderProducts(); break;
      case 'cart-qty': changeCartQuantity(id, Number(button.dataset.delta)); break;
      case 'remove-cart': removeFromCart(id); break;
      case 'wishlist-add': addToCart(id); break;
      case 'wishlist-remove':
        wishlist.delete(id); persistState(); updateHeaderCounts(); renderProducts(); renderDrawer('wishlist'); toast('Removed from your favourites.');
        break;
      case 'gallery-view': applyGalleryView(Number(button.dataset.index)); break;
      case 'detail-qty': updateDetailQuantity(Number(button.dataset.delta)); break;
      case 'modal-add': addToCart(id, state.detailQty); break;
      case 'buy-now': buyNow(id); break;
      case 'checkout': toast('Checkout is ready to connect to your payment provider.'); break;
      case 'sign-in': closeProfilePopover(); toast('Your sign-in flow can connect to your account service.'); break;
      case 'hero-prev': showHero(activeHeroIndex - 1); break;
      case 'hero-next': showHero(activeHeroIndex + 1); break;
      case 'hero-go': showHero(Number(button.dataset.index)); break;
      case 'scroll-deals': {
        const track = $('#dealTrack');
        track.scrollBy({ left: Number(button.dataset.direction) * Math.max(250, track.clientWidth * .72), behavior: 'smooth' });
        break;
      }
      case 'choose-suggestion': {
        const product = productById(id);
        if (product) {
          $('#searchInput').value = product.title;
          $('#searchClear').hidden = false;
          state.category = 'All'; state.query = product.title; state.showAll = false;
          $('#searchSuggestions').hidden = true;
          $('#searchInput').setAttribute('aria-expanded', 'false');
          renderCategories(); renderProducts();
          $('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        break;
      }
      default: break;
    }
  }

  function init() {
    renderCategories();
    renderProducts();
    renderDeals();
    updateHeaderCounts();
    showHero(0);
    updateCountdown();
    $('#currentYear').textContent = String(new Date().getFullYear());

    $('#cartButton').addEventListener('click', () => openDrawer('cart'));
    $('#wishlistButton').addEventListener('click', () => openDrawer('wishlist'));
    $('#profileButton').addEventListener('click', event => { event.stopPropagation(); toggleProfilePopover(); });

    $('#searchForm').addEventListener('submit', event => { event.preventDefault(); submitSearch(); });
    $('#searchInput').addEventListener('input', event => {
      const query = event.currentTarget.value;
      state.query = query.trim();
      if (state.query) state.category = 'All';
      $('#searchClear').hidden = !query;
      renderCategories();
      renderProducts();
      updateSearchSuggestions(query);
    });
    $('#searchInput').addEventListener('keydown', event => {
      if (event.key === 'Escape') { $('#searchSuggestions').hidden = true; $('#searchInput').setAttribute('aria-expanded', 'false'); }
    });
    $('#searchClear').addEventListener('click', () => {
      $('#searchInput').value = '';
      $('#searchClear').hidden = true;
      state.query = '';
      renderProducts();
      $('#searchInput').focus();
      updateSearchSuggestions('');
    });
    $('#sortSelect').addEventListener('change', event => { state.sort = event.target.value; state.showAll = false; renderProducts(); });
    $('#heroCta').addEventListener('click', () => setCategory($('#heroCta').dataset.category));
    $('#heroSecondary').addEventListener('click', () => $('#flashSale').scrollIntoView({ behavior: 'smooth', block: 'start' }));
    $('#newsletterForm').addEventListener('submit', event => {
      event.preventDefault();
      $('#newsletterEmail').value = '';
      toast('Thanks — this sign-up is ready to connect to your mailing list.');
    });
    $('#drawerBackdrop').addEventListener('click', closeDrawer);
    $('#modalBackdrop').addEventListener('click', event => { if (event.target === $('#modalBackdrop')) closeModal(); });
    document.addEventListener('click', event => {
      const actionButton = event.target.closest('[data-action]');
      if (actionButton) {
        if (actionButton.matches('.deal-card')) {
          handleAction(actionButton);
        } else {
          handleAction(actionButton);
        }
      }
      if (!event.target.closest('.profile-wrap') && !event.target.closest('#profilePopover')) closeProfilePopover();
      if (!event.target.closest('#searchForm') && !$('#searchSuggestions').hidden) {
        $('#searchSuggestions').hidden = true;
        $('#searchInput').setAttribute('aria-expanded', 'false');
      }
      if (event.target.closest('[data-profile-link]')) closeProfilePopover();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (!$('#modalBackdrop').hidden) closeModal();
        else if (!$('#drawerBackdrop').hidden) closeDrawer();
        closeProfilePopover();
        $('#searchSuggestions').hidden = true;
        $('#searchInput').setAttribute('aria-expanded', 'false');
      }
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.deal-card')) {
        event.preventDefault(); openProduct(event.target.dataset.id);
      }
    });

    window.setInterval(updateCountdown, 1000);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setInterval(() => {
        if (document.visibilityState === 'visible' && $('#modalBackdrop').hidden) showHero(activeHeroIndex + 1);
      }, 6800);
    }
  }

  init();
})();
