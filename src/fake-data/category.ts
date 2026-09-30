export interface Game {
  id: string;
  title: string;
  image: string;
  provider: string;
  rating?: number;
  isHot?: boolean;
  isNew?: boolean;
  isFreeTrial?: boolean;
}

export interface GameCategoryData {
  id: string;
  title: string;
  moreHref: string;
  rows?: 1 | 2;
  games: Game[];
}

export const CATEGORY_GAMES_DATA: GameCategoryData[] = [
  /* -------------------------------------------------------------------------- */
  /* 0. HOT GAMES (15 Items)                                                    */
  /* -------------------------------------------------------------------------- */
  {
    id: "hot-games",
    title: "Hot Games",
    moreHref: "/games/hot-games",
    rows: 2,
    games: [
      { id: "hg-1", title: "Gates of Olympus", image: "/images/games/gates-of-olympus.webp", provider: "Pragmatic Play", rating: 4.9, isHot: true, isFreeTrial: true },
      { id: "hg-2", title: "Crazy Time", image: "/images/games/crazy-time.webp", provider: "Evolution", rating: 4.9, isHot: true, isFreeTrial: false },
      { id: "hg-3", title: "Sweet Bonanza", image: "/images/games/sweet-bonanza.webp", provider: "Pragmatic Play", rating: 4.8, isHot: true, isFreeTrial: true },
      { id: "hg-4", title: "Mega Wheel", image: "/images/games/mega-wheel.webp", provider: "Pragmatic Play Live", rating: 4.7, isHot: true, isFreeTrial: false },
      { id: "hg-5", title: "Aviator", image: "/images/games/aviator.webp", provider: "Spribe", rating: 4.9, isHot: true, isFreeTrial: true },
      { id: "hg-6", title: "Lightning Roulette", image: "/images/games/lightning-roulette.webp", provider: "Evolution", rating: 4.8, isHot: true, isFreeTrial: false },
      { id: "hg-7", title: "Fortune Tiger", image: "/images/games/fortune-tiger.webp", provider: "PG Soft", rating: 4.7, isHot: true, isFreeTrial: true },
      { id: "hg-8", title: "Monopoly Live", image: "/images/games/monopoly-live.webp", provider: "Evolution", rating: 4.8, isHot: true, isFreeTrial: false },
      { id: "hg-9", title: "Mahjong Ways 2", image: "/images/games/mahjong-ways-2.webp", provider: "PG Soft", rating: 4.9, isHot: true, isFreeTrial: true },
      { id: "hg-10", title: "Speed Baccarat A", image: "/images/games/speed-baccarat.webp", provider: "Evolution", rating: 4.6, isHot: true, isFreeTrial: false },
      { id: "hg-11", title: "Sugar Rush", image: "/images/games/sugar-rush.webp", provider: "Pragmatic Play", rating: 4.8, isHot: true, isFreeTrial: true },
      { id: "hg-12", title: "Dragon Tiger", image: "/images/games/dragon-tiger.webp", provider: "Ezugi", rating: 4.5, isHot: true, isFreeTrial: false },
      { id: "hg-13", title: "Space XY", image: "/images/games/space-xy.webp", provider: "BGaming", rating: 4.7, isHot: true, isFreeTrial: true },
      { id: "hg-14", title: "Funky Time", image: "/images/games/funky-time.webp", provider: "Evolution", rating: 4.8, isHot: true, isFreeTrial: false },
      { id: "hg-15", title: "Super Ace", image: "/images/games/super-ace.webp", provider: "JILI", rating: 4.9, isHot: true, isFreeTrial: true },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 1. SLOTS (15 Items)                                                        */
  /* -------------------------------------------------------------------------- */
  {
    id: "slots",
    title: "Slots",
    moreHref: "/games/slots",
    rows: 2,
    games: [
      { id: "sl-1", title: "Starlight Princess", image: "/images/games/starlight-princess.webp", provider: "Pragmatic Play", rating: 4.8, isNew: true, isFreeTrial: true },
      { id: "sl-2", title: "Fortune Ox", image: "/images/games/fortune-ox.webp", provider: "PG Soft", rating: 4.7, isFreeTrial: true },
      { id: "sl-3", title: "Money Train 3", image: "/images/games/money-train-3.webp", provider: "Relax Gaming", rating: 4.9, isFreeTrial: true },
      { id: "sl-4", title: "Roma X", image: "/images/games/roma-x.webp", provider: "JILI", rating: 4.6, isFreeTrial: true },
      { id: "sl-5", title: "Wild Bandito", image: "/images/games/wild-bandito.webp", provider: "PG Soft", rating: 4.8, isFreeTrial: true },
      { id: "sl-6", title: "Book of Dead", image: "/images/games/book-of-dead.webp", provider: "Play'n GO", rating: 4.7, isFreeTrial: true },
      { id: "sl-7", title: "Gonzo's Quest", image: "/images/games/gonzos-quest.webp", provider: "NetEnt", rating: 4.6, isFreeTrial: true },
      { id: "sl-8", title: "Golden Empire", image: "/images/games/golden-empire.webp", provider: "JILI", rating: 4.8, isFreeTrial: true },
      { id: "sl-9", title: "Big Bass Bonanza", image: "/images/games/big-bass-bonanza.webp", provider: "Pragmatic Play", rating: 4.7, isFreeTrial: true },
      { id: "sl-10", title: "Lucky Neko", image: "/images/games/lucky-neko.webp", provider: "PG Soft", rating: 4.9, isFreeTrial: true },
      { id: "sl-11", title: "Boxing King", image: "/images/games/boxing-king.webp", provider: "JILI", rating: 4.5, isFreeTrial: true },
      { id: "sl-12", title: "Fruit Party", image: "/images/games/fruit-party.webp", provider: "Pragmatic Play", rating: 4.6, isFreeTrial: true },
      { id: "sl-13", title: "Treasures of Aztec", image: "/images/games/treasures-of-aztec.webp", provider: "PG Soft", rating: 4.8, isFreeTrial: true },
      { id: "sl-14", title: "Starburst", image: "/images/games/starburst.webp", provider: "NetEnt", rating: 4.5, isFreeTrial: true },
      { id: "sl-15", title: "Ganesha Gold", image: "/images/games/ganesha-gold.webp", provider: "PG Soft", rating: 4.7, isFreeTrial: true },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 2. LIVE CASINO (15 Items)                                                  */
  /* -------------------------------------------------------------------------- */
  {
    id: "live",
    title: "Live",
    moreHref: "/games/live",
    rows: 2,
    games: [
      { id: "lc-1", title: "Lightning Baccarat", image: "/images/games/lightning-baccarat.webp", provider: "Evolution", rating: 4.9, isFreeTrial: false },
      { id: "lc-2", title: "Mega Ball", image: "/images/games/mega-ball.webp", provider: "Evolution", rating: 4.8, isFreeTrial: false },
      { id: "lc-3", title: "Immersive Roulette", image: "/images/games/immersive-roulette.webp", provider: "Evolution", rating: 4.9, isFreeTrial: false },
      { id: "lc-4", title: "Sexy Baccarat", image: "/images/games/sexy-baccarat.webp", provider: "AE Sex", rating: 4.7, isFreeTrial: false },
      { id: "lc-5", title: "Infinite Blackjack", image: "/images/games/infinite-blackjack.webp", provider: "Evolution", rating: 4.8, isFreeTrial: false },
      { id: "lc-6", title: "Andar Bahar Live", image: "/images/games/andar-bahar.webp", provider: "Ezugi", rating: 4.6, isFreeTrial: false },
      { id: "lc-7", title: "Dream Catcher", image: "/images/games/dream-catcher.webp", provider: "Evolution", rating: 4.7, isFreeTrial: false },
      { id: "lc-8", title: "Pragmatic Roulette Azure", image: "/images/games/roulette-azure.webp", provider: "Pragmatic Play Live", rating: 4.8, isFreeTrial: false },
      { id: "lc-9", title: "Teen Patti Live", image: "/images/games/teen-patti.webp", provider: "Ezugi", rating: 4.6, isFreeTrial: false },
      { id: "lc-10", title: "Bac Bo", image: "/images/games/bac-bo.webp", provider: "Evolution", rating: 4.8, isFreeTrial: false },
      { id: "lc-11", title: "Sic Bo Live", image: "/images/games/sic-bo.webp", provider: "Pragmatic Play Live", rating: 4.5, isFreeTrial: false },
      { id: "lc-12", title: "Vegas Ball Bonanza", image: "/images/games/vegas-ball.webp", provider: "Pragmatic Play Live", rating: 4.7, isFreeTrial: false },
      { id: "lc-13", title: "Casino Hold'em", image: "/images/games/casino-holdem.webp", provider: "Evolution", rating: 4.6, isFreeTrial: false },
      { id: "lc-14", title: "Speed Auto Roulette", image: "/images/games/speed-auto-roulette.webp", provider: "Evolution", rating: 4.7, isFreeTrial: false },
      { id: "lc-15", title: "Football Studio", image: "/images/games/football-studio.webp", provider: "Evolution", rating: 4.5, isFreeTrial: false },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 3. POKER & CARD GAMES (15 Items)                                           */
  /* -------------------------------------------------------------------------- */
  {
    id: "poker",
    title: "Poker",
    moreHref: "/games/poker",
    rows: 2,
    games: [
      { id: "pk-1", title: "Texas Hold'em Poker", image: "/images/games/texas-holdem.webp", provider: "KM Table", rating: 4.8, isFreeTrial: true },
      { id: "pk-2", title: "Card Matka", image: "/images/games/card-matka.webp", provider: "KingMaker", rating: 4.6, isFreeTrial: true },
      { id: "pk-3", title: "In Between Poker", image: "/images/games/in-between-poker.webp", provider: "JILI", rating: 4.7, isFreeTrial: true },
      { id: "pk-4", title: "3 Card Poker", image: "/images/games/3-card-poker.webp", provider: "KingMaker", rating: 4.7, isFreeTrial: true },
      { id: "pk-5", title: "7 Up 7 Down", image: "/images/games/7-up-7-down.webp", provider: "JILI", rating: 4.5, isFreeTrial: true },
      { id: "pk-6", title: "Jacks or Better", image: "/images/games/jacks-or-better.webp", provider: "Red Rake", rating: 4.6, isFreeTrial: true },
      { id: "pk-7", title: "Pai Gow Poker", image: "/images/games/pai-gow.webp", provider: "KM Table", rating: 4.5, isFreeTrial: true },
      { id: "pk-8", title: "Ludo Quick", image: "/images/games/ludo-quick.webp", provider: "KingMaker", rating: 4.9, isFreeTrial: true },
      { id: "pk-9", title: "Deuces Wild", image: "/images/games/deuces-wild.webp", provider: "BGaming", rating: 4.6, isFreeTrial: true },
      { id: "pk-10", title: "Russian Poker", image: "/images/games/russian-poker.webp", provider: "Evoplay", rating: 4.7, isFreeTrial: true },
      { id: "pk-11", title: "Omaha Hold'em", image: "/images/games/omaha-holdem.webp", provider: "KM Table", rating: 4.8, isFreeTrial: true },
      { id: "pk-12", title: "Hi-Lo Switch", image: "/images/games/hilo-switch.webp", provider: "KingMaker", rating: 4.4, isFreeTrial: true },
      { id: "pk-13", title: "Caribbean Stud", image: "/images/games/caribbean-stud.webp", provider: "Red Rake", rating: 4.6, isFreeTrial: true },
      { id: "pk-14", title: "Fan Tan", image: "/images/games/fan-tan.webp", provider: "KingMaker", rating: 4.5, isFreeTrial: true },
      { id: "pk-15", title: "Baccarat Table", image: "/images/games/baccarat-table.webp", provider: "JILI", rating: 4.7, isFreeTrial: true },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 4. FISHING GAMES (15 Items)                                                */
  /* -------------------------------------------------------------------------- */
  {
    id: "fish",
    title: "Fish",
    moreHref: "/games/fish",
    rows: 2,
    games: [
      { id: "fs-1", title: "Mega Fishing", image: "/images/games/mega-fishing.webp", provider: "JILI", rating: 4.9, isFreeTrial: true },
      { id: "fs-2", title: "Jackpot Fishing", image: "/images/games/jackpot-fishing.webp", provider: "JILI", rating: 4.8, isFreeTrial: true },
      { id: "fs-3", title: "Bombing Fishing", image: "/images/games/bombing-fishing.webp", provider: "JILI", rating: 4.7, isFreeTrial: true },
      { id: "fs-4", title: "Royal Fishing", image: "/images/games/royal-fishing.webp", provider: "JILI", rating: 4.8, isFreeTrial: true },
      { id: "fs-5", title: "Happy Fishing", image: "/images/games/happy-fishing.webp", provider: "JILI", rating: 4.6, isFreeTrial: true },
      { id: "fs-6", title: "All-star Fishing", image: "/images/games/allstar-fishing.webp", provider: "JILI", rating: 4.9, isFreeTrial: true },
      { id: "fs-7", title: "Dinosaur Tycoon II", image: "/images/games/dinosaur-tycoon.webp", provider: "JILI", rating: 4.8, isFreeTrial: true },
      { id: "fs-8", title: "Dragon Fishing", image: "/images/games/dragon-fishing.webp", provider: "CQ9", rating: 4.6, isFreeTrial: true },
      { id: "fs-9", title: "Hero Fishing", image: "/images/games/hero-fishing.webp", provider: "FA Chai", rating: 4.7, isFreeTrial: true },
      { id: "fs-10", title: "Ocean King 3", image: "/images/games/ocean-king-3.webp", provider: "JDB", rating: 4.8, isFreeTrial: true },
      { id: "fs-11", title: "Star Hunter", image: "/images/games/star-hunter.webp", provider: "CQ9", rating: 4.5, isFreeTrial: true },
      { id: "fs-12", title: "Fishing Yilufa", image: "/images/games/fishing-yilufa.webp", provider: "FA Chai", rating: 4.6, isFreeTrial: true },
      { id: "fs-13", title: "Cai Shen Fishing", image: "/images/games/cai-shen-fishing.webp", provider: "JDB", rating: 4.7, isFreeTrial: true },
      { id: "fs-14", title: "Bao Chuan Fishing", image: "/images/games/bao-chuan-fishing.webp", provider: "FA Chai", rating: 4.6, isFreeTrial: true },
      { id: "fs-15", title: "Paradise Fishing", image: "/images/games/paradise-fishing.webp", provider: "CQ9", rating: 4.5, isFreeTrial: true },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 5. SPORTSBOOK (15 Items)                                                   */
  /* -------------------------------------------------------------------------- */
  {
    id: "sports",
    title: "Sports",
    moreHref: "/games/sports",
    rows: 2,
    games: [
      { id: "sp-1", title: "ICC Cricket World Cup", image: "/images/games/icc-cricket.webp", provider: "SBO Sports", rating: 4.9, isFreeTrial: false },
      { id: "sp-2", title: "English Premier League", image: "/images/games/epl-football.webp", provider: "CMD368", rating: 4.9, isFreeTrial: false },
      { id: "sp-3", title: "UEFA Champions League", image: "/images/games/uefa-cl.webp", provider: "SBO Sports", rating: 4.8, isFreeTrial: false },
      { id: "sp-4", title: "IPL Cricket Betting", image: "/images/games/ipl-cricket.webp", provider: "BTI Sports", rating: 4.9, isFreeTrial: false },
      { id: "sp-5", title: "NBA Basketball", image: "/images/games/nba-basketball.webp", provider: "CMD368", rating: 4.7, isFreeTrial: false },
      { id: "sp-6", title: "ATP Tennis Open", image: "/images/games/atp-tennis.webp", provider: "BTI Sports", rating: 4.6, isFreeTrial: false },
      { id: "sp-7", title: "Pro Kabaddi League", image: "/images/games/pro-kabaddi.webp", provider: "SBO Sports", rating: 4.8, isFreeTrial: false },
      { id: "sp-8", title: "Virtual Soccer League", image: "/images/games/virtual-soccer.webp", provider: "Betradar", rating: 4.7, isFreeTrial: true },
      { id: "sp-9", title: "Formula 1 Grand Prix", image: "/images/games/formula-1.webp", provider: "CMD368", rating: 4.8, isFreeTrial: false },
      { id: "sp-10", title: "UFC Mixed Martial Arts", image: "/images/games/ufc-mma.webp", provider: "BTI Sports", rating: 4.8, isFreeTrial: false },
      { id: "sp-11", title: "Virtual Cricket World", image: "/images/games/virtual-cricket.webp", provider: "Betradar", rating: 4.6, isFreeTrial: true },
      { id: "sp-12", title: "MLB Baseball", image: "/images/games/mlb-baseball.webp", provider: "SBO Sports", rating: 4.5, isFreeTrial: false },
      { id: "sp-13", title: "Table Tennis Cup", image: "/images/games/table-tennis.webp", provider: "CMD368", rating: 4.6, isFreeTrial: false },
      { id: "sp-14", title: "Golf PGA Tour", image: "/images/games/pga-golf.webp", provider: "BTI Sports", rating: 4.5, isFreeTrial: false },
      { id: "sp-15", title: "Virtual Horse Racing", image: "/images/games/virtual-horse.webp", provider: "Betradar", rating: 4.7, isFreeTrial: true },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 6. E-SPORTS (15 Items)                                                     */
  /* -------------------------------------------------------------------------- */
  {
    id: "e-sports",
    title: "E-Sports",
    moreHref: "/games/e-sports",
    rows: 2,
    games: [
      { id: "es-1", title: "Dota 2 - The International", image: "/images/games/dota-2.webp", provider: "TF Gaming", rating: 4.9, isFreeTrial: false },
      { id: "es-2", title: "CS:GO Major Championship", image: "/images/games/csgo.webp", provider: "IM Esports", rating: 4.9, isFreeTrial: false },
      { id: "es-3", title: "League of Legends Worlds", image: "/images/games/lol-worlds.webp", provider: "TF Gaming", rating: 4.8, isFreeTrial: false },
      { id: "es-4", title: "Valorant Champions Tour", image: "/images/games/valorant.webp", provider: "IM Esports", rating: 4.9, isFreeTrial: false },
      { id: "es-5", title: "PUBG Mobile Global", image: "/images/games/pubg-mobile.webp", provider: "TF Gaming", rating: 4.8, isFreeTrial: false },
      { id: "es-6", title: "Mobile Legends: Bang Bang", image: "/images/games/mlbb.webp", provider: "IM Esports", rating: 4.9, isFreeTrial: false },
      { id: "es-7", title: "Overwatch League", image: "/images/games/overwatch.webp", provider: "TF Gaming", rating: 4.6, isFreeTrial: false },
      { id: "es-8", title: "StarCraft II Masters", image: "/images/games/starcraft-2.webp", provider: "IM Esports", rating: 4.5, isFreeTrial: false },
      { id: "es-9", title: "Arena of Valor International", image: "/images/games/aov.webp", provider: "TF Gaming", rating: 4.7, isFreeTrial: false },
      { id: "es-10", title: "King of Glory Pro League", image: "/images/games/kog.webp", provider: "IM Esports", rating: 4.8, isFreeTrial: false },
      { id: "es-11", title: "Rainbow Six Siege Pro", image: "/images/games/r6-siege.webp", provider: "TF Gaming", rating: 4.6, isFreeTrial: false },
      { id: "es-12", title: "Apex Legends Global", image: "/images/games/apex-legends.webp", provider: "IM Esports", rating: 4.7, isFreeTrial: false },
      { id: "es-13", title: "Call of Duty League", image: "/images/games/cod-league.webp", provider: "TF Gaming", rating: 4.7, isFreeTrial: false },
      { id: "es-14", title: "Rocket League Championship", image: "/images/games/rocket-league.webp", provider: "IM Esports", rating: 4.5, isFreeTrial: false },
      { id: "es-15", title: "FIFA eWorld Cup", image: "/images/games/fifa-eworld.webp", provider: "TF Gaming", rating: 4.8, isFreeTrial: false },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 7. LOTTERY & KENO (15 Items)                                              */
  /* -------------------------------------------------------------------------- */
  {
    id: "lottery",
    title: "Lottery",
    moreHref: "/games/lottery",
    rows: 2,
    games: [
      { id: "lt-1", title: "Classic Keno 24/7", image: "/images/games/classic-keno.webp", provider: "TCG Lottery", rating: 4.8, isFreeTrial: true },
      { id: "lt-2", title: "PK10 Speed Racing", image: "/images/games/pk10.webp", provider: "VR Lottery", rating: 4.9, isFreeTrial: true },
      { id: "lt-3", title: "1 Min Fast 3", image: "/images/games/fast-3.webp", provider: "TCG Lottery", rating: 4.7, isFreeTrial: true },
      { id: "lt-4", title: "5D Lottery Draw", image: "/images/games/5d-lottery.webp", provider: "VR Lottery", rating: 4.6, isFreeTrial: true },
      { id: "lt-5", title: "Mark Six Official", image: "/images/games/mark-six.webp", provider: "TCG Lottery", rating: 4.8, isFreeTrial: true },
      { id: "lt-6", title: "Lucky Wheel 3D", image: "/images/games/lucky-wheel-3d.webp", provider: "KingMaker", rating: 4.7, isFreeTrial: true },
      { id: "lt-7", title: "VN 3 Minute Lotto", image: "/images/games/vn-lotto.webp", provider: "TCG Lottery", rating: 4.6, isFreeTrial: true },
      { id: "lt-8", title: "Sode Fast Lottery", image: "/images/games/sode-lotto.webp", provider: "VR Lottery", rating: 4.5, isFreeTrial: true },
      { id: "lt-9", title: "Color Prediction 1M", image: "/images/games/color-prediction.webp", provider: "KingMaker", rating: 4.9, isFreeTrial: true },
      { id: "lt-10", title: "Bingo Roll", image: "/images/games/bingo-roll.webp", provider: "JILI", rating: 4.8, isFreeTrial: true },
      { id: "lt-11", title: "Thai Stock Lottery", image: "/images/games/thai-stock.webp", provider: "TCG Lottery", rating: 4.6, isFreeTrial: true },
      { id: "lt-12", title: "Lotto Racing 3D", image: "/images/games/lotto-racing.webp", provider: "VR Lottery", rating: 4.7, isFreeTrial: true },
      { id: "lt-13", title: "Happy 8 Keno", image: "/images/games/happy-8.webp", provider: "TCG Lottery", rating: 4.5, isFreeTrial: true },
      { id: "lt-14", title: "Super Bingo 75", image: "/images/games/super-bingo.webp", provider: "JILI", rating: 4.7, isFreeTrial: true },
      { id: "lt-15", title: "Number Wheel", image: "/images/games/number-wheel.webp", provider: "KingMaker", rating: 4.6, isFreeTrial: true },
    ],
  },
];