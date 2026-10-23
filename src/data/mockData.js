export const INITIAL_DATA = {
  stats: {
    players: 4,
    professionalTeams: 3,
    totalFollowers: 3680,
    tournamentWins: 6,
    staff: 8,
    creators: 12,
    onlineViewers: 14200,
    streamHours: 850
  },

  sponsors: [
    {
      _id: "sp-1",
      name: "Wix Studio",
      sponsorName: "Wix",
      logo: "https://static.parastorage.com/services/cookie-consent-policy-client/1.983.0/headlessApp.bundle.min.js",
      svgName: "WIX",
      url: "https://www.wix.com",
      isActive: true
    },
    {
      _id: "sp-2",
      name: "Arcadian Computers",
      sponsorName: "Arcadian Computers",
      logo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      svgName: "ARCADIAN COMPUTERS",
      url: "https://arcadiancomputers.com",
      isActive: true
    },
    {
      _id: "sp-3",
      name: "Zenni Optical",
      sponsorName: "Zenni",
      logo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      svgName: "ZENNI",
      url: "https://www.zennioptical.com",
      isActive: true
    },
    {
      _id: "sp-4",
      name: "Logitech G",
      sponsorName: "Logitech G",
      logo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      svgName: "LOGITECH G",
      url: "https://www.logitechg.com",
      isActive: true
    },
    {
      _id: "sp-5",
      name: "Fourthwall",
      sponsorName: "Fourthwall",
      logo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      svgName: "FOURTHWALL",
      url: "https://fourthwall.com",
      isActive: true
    },
    {
      _id: "sp-6",
      name: "Blacklyte",
      sponsorName: "Blacklyte",
      logo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      svgName: "BLACKLYTE",
      url: "https://blacklyte.com",
      isActive: true
    }
  ],

  teams: [
    {
      _id: "team-1",
      teamName: "Eternals Apex Legends",
      gameName: "Apex Legends",
      teamDescription: "Our premier ALGS pro division competing across Global Series Majors and regional championships.",
      region: "North America",
      wins: 28,
      losses: 9,
      teamLogo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      socialMediaLink: "https://twitter.com/eternalsgg",
      achievements: "ALGS Year 4 Pro League Qualifier #1, Champions Showcase Winner"
    },
    {
      _id: "team-2",
      teamName: "Eternals Warzone",
      gameName: "Call of Duty: Warzone",
      teamDescription: "World Series of Warzone contenders known for blistering kill records and unmatched tactical rotations.",
      region: "North America",
      wins: 34,
      losses: 12,
      teamLogo: "https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png",
      socialMediaLink: "https://twitter.com/eternalsgg",
      achievements: "WSOW 2025 Top 5 Finalist, CodMania Invitational Champions"
    },
    {
      _id: "team-3",
      teamName: "Eternals Marvel Rivals",
      gameName: "Marvel Rivals",
      teamDescription: "Top seeded squad pushing the competitive meta with explosive hero synergies and flawless execution.",
      region: "Global",
      wins: 19,
      losses: 5,
      teamLogo: "https://static.wixstatic.com/media/66d70e_4aa6bce5818e432aba3309a63fd8a2d9~mv2.webp",
      socialMediaLink: "https://twitter.com/eternalsgg",
      achievements: "Marvel Rivals Alpha Showcase Gold, Rivals Winter Brawl Champions"
    }
  ],

  players: [
    {
      _id: "player-1",
      slug: "vortex",
      playerName: "Marcus Vance",
      playerTag: "VORTEX",
      role: "ALGS IGL",
      division: "Apex Legends",
      region: "NA-CENTRAL",
      teamName: "Eternals Apex Legends",
      earnings: "$142,500 EARNED",
      kdaRatio: "3.84",
      profilePicture: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80",
      bio: "Championship IGL leading Eternals ALGS squad. Precision shotcaller, macro-rotation master, and clutch specialist in final storm circles.",
      hardware: "Logitech G Pro X Superlight 2 • Wooting 60HE • 360Hz Alienware",
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      xUrl: "https://x.com",
      instagramUrl: "https://instagram.com",
      twitchFollowers: 14200,
      youtubeSubscribers: 8600,
      xFollowers: 9400,
      instagramFollowers: 6200
    },
    {
      _id: "player-2",
      slug: "shadow",
      playerName: "Tyler Cole",
      playerTag: "SHADOW",
      role: "ALGS FRAGGER",
      division: "Apex Legends",
      region: "NA-CENTRAL",
      teamName: "Eternals Apex Legends",
      earnings: "$98,400 EARNED",
      kdaRatio: "4.12",
      profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
      bio: "Top entry fragger in ALGS Pro League. Blistering mechanical aim and lethal close-quarters engagements across international majors.",
      hardware: "Razer DeathAdder V3 Pro • Artisan Hayate Otsu • 240Hz Zowie",
      twitchUrl: "https://twitch.tv",
      kickUrl: "https://kick.com",
      xUrl: "https://x.com",
      twitchFollowers: 9800,
      kickFollowers: 4200,
      xFollowers: 6100
    },
    {
      _id: "player-3",
      slug: "reaper",
      playerName: "Damian Cruz",
      playerTag: "REAPER",
      role: "WARZONE CAPTAIN",
      division: "Warzone",
      region: "NORTH AMERICA",
      teamName: "Eternals Warzone",
      earnings: "$165,000 EARNED",
      kdaRatio: "4.65",
      profilePicture: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
      bio: "World Series of Warzone champion. Holds regional kill records and tactical high-ground dominion in high-stakes lobbies.",
      hardware: "Scuf Envision Pro • Astro A50X • 280Hz ASUS ROG",
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      xUrl: "https://x.com",
      twitchFollowers: 18500,
      youtubeSubscribers: 11000,
      xFollowers: 13000
    },
    {
      _id: "player-4",
      slug: "chrono",
      playerName: "Nathan Drake",
      playerTag: "CHRONO",
      role: "RIVALS ANCHOR",
      division: "Marvel Rivals",
      region: "GLOBAL",
      teamName: "Eternals Marvel Rivals",
      earnings: "$75,000 EARNED",
      kdaRatio: "3.48",
      profilePicture: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
      bio: "Alpha Showcase champion vanguard. Flawless hero synergy and frontline crowd control specialist in competitive 6v6 play.",
      hardware: "Logitech G502X Plus • SteelSeries Apex Pro TKL • 240Hz BenQ",
      youtubeUrl: "https://youtube.com",
      xUrl: "https://x.com",
      rumbleUrl: "https://rumble.com",
      youtubeSubscribers: 7500,
      xFollowers: 5400,
      rumbleFollowers: 2100
    },
    {
      _id: "player-5",
      slug: "avivv",
      playerName: "7VEN Avivv",
      playerTag: "AVIVV",
      role: "FNCS PRO // GLOBAL",
      division: "Fortnite & Apex",
      region: "NA-CENTRAL",
      teamName: "Eternals Apex Legends",
      earnings: "$226,860 EARNED",
      kdaRatio: "4.82",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bio: "Championship powerhouse dominating NA-Central leaderboards. Pinnacle clutch specialist in end-game championship circles.",
      hardware: "Finalmouse UltralightX • Artisan Zero Soft • 540Hz ROG Swift",
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      xUrl: "https://x.com",
      twitchFollowers: 32000,
      youtubeSubscribers: 18500,
      xFollowers: 21000
    },
    {
      _id: "player-6",
      slug: "zephyr",
      playerName: "Alex Mercer",
      playerTag: "ZEPHYR",
      role: "WARZONE FRAGGER",
      division: "Warzone",
      region: "EUROPE",
      teamName: "Eternals Warzone",
      earnings: "$54,400 EARNED",
      kdaRatio: "4.20",
      profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      bio: "High-tempo movement fragger and aggressive point-man with unmatched map awareness and high-kill tournament performances.",
      hardware: "DualSense Edge • Beyerdynamic DT 990 Pro • 360Hz BenQ",
      twitchUrl: "https://twitch.tv",
      xUrl: "https://x.com",
      twitchFollowers: 8500,
      xFollowers: 6200
    },
    {
      _id: "player-7",
      slug: "nova",
      playerName: "Samantha Reyes",
      playerTag: "NOVA",
      role: "CREATOR HEADLINER",
      division: "Content Creators",
      region: "NORTH AMERICA",
      teamName: "Creators Network",
      earnings: "$85,000 EARNED",
      kdaRatio: "3.90",
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      bio: "Tactical shooter specialist, variety streamer, and content powerhouse delivering tournament casting and high-rank gameplay.",
      hardware: "Shure SM7B • Elgato Stream Deck XL • Sony A7 IV Camera",
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      xUrl: "https://x.com",
      twitchFollowers: 24000,
      youtubeSubscribers: 19500,
      xFollowers: 14000
    },
    {
      _id: "player-8",
      slug: "null",
      playerName: "Steven O’Connor",
      playerTag: "NULL",
      role: "FOUNDER & RULER",
      division: "Leadership",
      region: "EXECUTIVE",
      teamName: "Executive Staff",
      earnings: "$450,000 PURSE",
      kdaRatio: "5.00",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      bio: "Visionary founder of EternalsGGs. Forging the next era of sovereign esports, digital entertainment, and competitive excellence.",
      hardware: "Custom Falcon Northwest Rig • Herman Miller Embody • Dual 4K OLED",
      twitchUrl: "https://twitch.tv",
      xUrl: "https://x.com",
      youtubeUrl: "https://youtube.com",
      twitchFollowers: 12000,
      youtubeSubscribers: 15000,
      xFollowers: 28000
    }
  ],


  featuredCreator: {
    _id: "creator-featured",
    creatorName: "Aiden 'Volt' Mercer",
    bio: "Headliner creator for EternalsGGs. High-energy FPS entertainer, competitive tournament caster, and community leader streaming daily to thousands.",
    featuredCreator: true,
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    twitchFollowers: 1450,
    youtubeSubscribers: 1200,
    kickFollowers: 480,
    rumbleFollowers: 150,
    instagramFollowers: 820,
    xFollowers: 980,
    twitchUrl: "https://twitch.tv/eternalsgg",
    youtubeUrl: "https://youtube.com/@eternalsgg",
    kickUrl: "https://kick.com",
    rumbleUrl: "https://rumble.com",
    instagramUrl: "https://instagram.com/eternalsgg",
    x: "https://x.com/eternalsgg",
    highlightReelUrl: "https://youtube.com"
  },

  creators: [
    {
      _id: "creator-1",
      creatorName: "Samantha 'Nova' Reyes",
      bio: "Tactical shooter specialist, variety streamer, and content powerhouse showcasing high-rank gameplay.",
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      twitchFollowers: 1240,
      youtubeSubscribers: 890,
      xFollowers: 640,
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      x: "https://x.com",
      highlightReelUrl: "https://youtube.com"
    },
    {
      _id: "creator-2",
      creatorName: "Leo 'Kyro' Vance",
      bio: "Apex Predator & Warzone maestro delivering highlight reels, movement guides, and tournament breakdowns.",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      twitchFollowers: 950,
      youtubeSubscribers: 1120,
      kickFollowers: 320,
      xFollowers: 580,
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      kickUrl: "https://kick.com",
      x: "https://x.com",
      highlightReelUrl: "https://youtube.com"
    },
    {
      _id: "creator-3",
      creatorName: "Chloe 'Pixel' Zhang",
      bio: "Speedrunner and competitive arena shooter streamer bringing high energy and community tournaments.",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      twitchFollowers: 820,
      youtubeSubscribers: 610,
      instagramFollowers: 940,
      xFollowers: 490,
      twitchUrl: "https://twitch.tv",
      youtubeUrl: "https://youtube.com",
      instagramUrl: "https://instagram.com",
      x: "https://x.com",
      highlightReelUrl: "https://youtube.com"
    }
  ],

  staff: [
    {
      _id: "staff-1",
      name: "Steven O’Connor",
      role: "Founder & Chief Executive Officer",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      twitchFollowers: 420,
      youtubeSubscribers: 650,
      xFollowers: 1200,
      xUrl: "https://x.com",
      youtubeUrl: "https://youtube.com"
    },
    {
      _id: "staff-2",
      name: "Elena Rostova",
      role: "Head of Esports Operations",
      profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      twitchFollowers: 310,
      xFollowers: 840,
      xUrl: "https://x.com"
    },
    {
      _id: "staff-3",
      name: "Jason 'Strat' Miller",
      role: "Lead Performance Coach",
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      youtubeSubscribers: 480,
      xFollowers: 620,
      youtubeUrl: "https://youtube.com",
      xUrl: "https://x.com"
    },
    {
      _id: "staff-4",
      name: "Maya Patel",
      role: "Director of Media & Partnerships",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      instagramFollowers: 720,
      xFollowers: 910,
      instagramUrl: "https://instagram.com",
      xUrl: "https://x.com"
    }
  ],

  tournaments: [
    {
      _id: "tourn-1",
      tournamentName: "Marvel Rivals Winter Showdown",
      gamePlayed: "Marvel Rivals",
      gameId: "marvel-rivals",
      description: "Join the premier Marvel Rivals community clash. Top squads battle across payload and convergence maps for ultimate glory.",
      tournamentStartDate: "2026-11-15T18:00:00Z",
      signupEndDate: "2026-11-10T23:59:59Z",
      registrationDeadline: "2026-11-10T23:59:59Z",
      prizePool: "$15,000 USD",
      maxTeams: 32,
      registeredTeamsCount: 24,
      entryFee: "Free",
      format: "Double Elimination Bracket",
      bannerImage: "https://static.wixstatic.com/media/66d70e_4aa6bce5818e432aba3309a63fd8a2d9~mv2.webp",
      signupLink: "#register"
    },
    {
      _id: "tourn-2",
      tournamentName: "Eternals Rocket League Open 2026",
      gamePlayed: "Rocket League",
      gameId: "rocket-league",
      description: "The ultimate 3v3 Rocket League showdown with aerial dominance and thrilling overtime clutch matches.",
      tournamentStartDate: "2026-11-22T19:00:00Z",
      signupEndDate: "2026-11-18T23:59:59Z",
      registrationDeadline: "2026-11-18T23:59:59Z",
      prizePool: "$10,000 USD",
      maxTeams: 16,
      registeredTeamsCount: 14,
      entryFee: "Free",
      format: "Single Elimination, Best of 5",
      bannerImage: "https://static.wixstatic.com/media/66d70e_47ac5676d0e54ef48b2ddc862ad7433e~mv2.webp",
      signupLink: "#register"
    },
    {
      _id: "tourn-3",
      tournamentName: "The Finals Cashout Clash",
      gamePlayed: "The Finals",
      gameId: "the-finals",
      description: "Destruction, speed, and tactical vaults. Squads clash in hyper-kinetic arena combat for the championship prize.",
      tournamentStartDate: "2026-12-05T20:00:00Z",
      signupEndDate: "2026-11-30T23:59:59Z",
      registrationDeadline: "2026-11-30T23:59:59Z",
      prizePool: "$8,000 USD",
      maxTeams: 24,
      registeredTeamsCount: 18,
      entryFee: "Free",
      format: "Tournament Cashout Bracket",
      bannerImage: "https://static.wixstatic.com/media/66d70e_2927ea49ff0b4712b76ddd593b1d4cc9~mv2.webp",
      signupLink: "#register"
    }
  ],

  bracketMatches: [
    {
      _id: "match-b1",
      tournamentName: "Marvel Rivals Winter Showdown",
      round: "Quarterfinals",
      team1Name: "Eternals GGs",
      team2Name: "Sentinels Rift",
      team1Score: 3,
      team2Score: 1,
      winnerTeamName: "Eternals GGs",
      status: "Completed",
      matchDate: "2026-10-20"
    },
    {
      _id: "match-b2",
      tournamentName: "Marvel Rivals Winter Showdown",
      round: "Quarterfinals",
      team1Name: "Nova Prime",
      team2Name: "Apex Dynasty",
      team1Score: 3,
      team2Score: 2,
      winnerTeamName: "Nova Prime",
      status: "Completed",
      matchDate: "2026-10-20"
    },
    {
      _id: "match-b3",
      tournamentName: "Marvel Rivals Winter Showdown",
      round: "Semifinals",
      team1Name: "Eternals GGs",
      team2Name: "Nova Prime",
      team1Score: 3,
      team2Score: 0,
      winnerTeamName: "Eternals GGs",
      status: "Completed",
      matchDate: "2026-10-22"
    },
    {
      _id: "match-b4",
      tournamentName: "Marvel Rivals Winter Showdown",
      round: "Grand Finals",
      team1Name: "Eternals GGs",
      team2Name: "Vanguard Syndicate",
      team1Score: 0,
      team2Score: 0,
      winnerTeamName: null,
      status: "Scheduled",
      matchDate: "2026-11-15"
    }
  ],

  matchHistory: [
    {
      _id: "hist-1",
      matchTitle: "ALGS Pro Circuit Regional Finals",
      tournamentId: "tourn-algs",
      teamOneName: "Eternals Apex",
      teamTwoName: "Cloud9 Esports",
      teamOneScore: 3,
      teamTwoScore: 1,
      winnerTeamName: "Eternals Apex",
      matchDate: "2026-10-18T19:00:00Z",
      matchRecapUrl: "https://youtube.com"
    },
    {
      _id: "hist-2",
      matchTitle: "WSOW North America Gauntlet",
      tournamentId: "tourn-wsow",
      teamOneName: "Eternals Warzone",
      teamTwoName: "FaZe Clan",
      teamOneScore: 4,
      teamTwoScore: 2,
      winnerTeamName: "Eternals Warzone",
      matchDate: "2026-10-12T21:00:00Z",
      matchRecapUrl: "https://youtube.com"
    },
    {
      _id: "hist-3",
      matchTitle: "Marvel Rivals Alpha Invitational",
      tournamentId: "tourn-1",
      teamOneName: "Eternals GGs",
      teamTwoName: "OpTic Gaming",
      teamOneScore: 3,
      teamTwoScore: 0,
      winnerTeamName: "Eternals GGs",
      matchDate: "2026-10-05T18:30:00Z",
      matchRecapUrl: "https://youtube.com"
    }
  ],

  podcasts: [
    {
      _id: "pod-1",
      episodeNumber: 14,
      title: "Dominating the ALGS Split: Inside the Eternals Boot Camp",
      description: "Vortex and Reaper join the studio to break down high-pressure zone reads, competitive mindset shifts, and what it takes to climb to #1.",
      publicationDate: "2026-10-21T14:00:00Z",
      duration: "54:20",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      _id: "pod-2",
      episodeNumber: 13,
      title: "Hero Shooters Reborn: The Rapid Rise of Marvel Rivals",
      description: "Analyzing the emerging esports ecosystem, third-person mechanical depth, and why hero abilities are reshaping tournament stages.",
      publicationDate: "2026-10-14T14:00:00Z",
      duration: "48:15",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      _id: "pod-3",
      episodeNumber: 12,
      title: "Building an Esports Legacy from Grassroots to Stadiums",
      description: "CEO Steven O'Connor sits down to discuss team acquisitions, sponsor relationships, and building sustainable gaming communities.",
      publicationDate: "2026-10-07T14:00:00Z",
      duration: "1:02:10",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ],

  mediaContent: [
    {
      _id: "media-1",
      title: "ETERNALS 2026 Season Hype Anthem & Roster Reveal",
      contentType: "Video",
      description: "Experience the adrenaline-fueled official cinematic anthem kicking off our 2026 competitive campaign.",
      publishDate: "2026-10-22",
      duration: "3:45",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      mediaUrl: "https://youtube.com"
    },
    {
      _id: "media-2",
      title: "Eternals Warzone Squad Drops 64-Kill World Record Showcase",
      contentType: "Highlight",
      description: "Uncut point-of-view highlights from Reaper, Vortex, and Shadow clearing out the Superstore in high-stakes lobbies.",
      publishDate: "2026-10-19",
      duration: "14:20",
      thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      mediaUrl: "https://youtube.com"
    },
    {
      _id: "media-3",
      title: "Partnership Announcement: Logitech G & Zenni Join Eternals Family",
      contentType: "News",
      description: "Equipping our players with custom peripherals, blue-light eyewear, and state of the art performance technology.",
      publishDate: "2026-10-15",
      duration: "4 min read",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      mediaUrl: "https://eternalsgg.com/news"
    }
  ],

  merchCategories: [
    { _id: "cat-all", name: "All Items", key: "all", count: 8 },
    { _id: "cat-pro", name: "Pro Gear", key: "pro-gear", count: 3 },
    { _id: "cat-hoodies", name: "Hoodies & Sweatshirts", key: "hoodies", count: 2 },
    { _id: "cat-tees", name: "T-Shirts", key: "tees", count: 2 },
    { _id: "cat-acc", name: "Accessories", key: "accessories", count: 2 },
    { _id: "cat-col", name: "Collectibles", key: "collectibles", count: 1 }
  ],

  merchProducts: [
    {
      _id: "prod-1",
      title: "Official Pro Jersey 2026 Championship Edition",
      category: "tees",
      price: 69.99,
      itemImage: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      designShowcaseImage1: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      designShowcaseImage2: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      description: "Authentic match-day jersey engineered with lightweight moisture-wicking aerodynamic fabric and reflective cyan trims.",
      sizes: ["S", "M", "L", "XL", "2XL"],
      inStock: true,
      isExclusive: true
    },
    {
      _id: "prod-2",
      title: "Cyber Void Stealth Pullover Hoodie",
      category: "hoodies",
      price: 79.99,
      itemImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      designShowcaseImage1: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
      description: "Ultra-heavyweight 450GSM cotton fleece with neon purple embroidery, hidden headphone grommets, and kangaroo pocket.",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      isExclusive: false
    },
    {
      _id: "prod-3",
      title: "ETERNALS Custom Mechanical Esports Keyboard",
      category: "pro-gear",
      price: 149.99,
      itemImage: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
      designShowcaseImage1: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      description: "Hot-swappable rapid trigger magnetic switches, CNC anodized aluminum chassis, per-key RGB backlighting and 8000Hz polling rate.",
      sizes: ["Linear Switches", "Tactile Switches"],
      inStock: true,
      isExclusive: true
    },
    {
      _id: "prod-4",
      title: "Ultralight Wireless Gaming Mouse (49g)",
      category: "pro-gear",
      price: 99.99,
      itemImage: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      designShowcaseImage1: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
      description: "PAW3395 26,000 DPI optical sensor, pure PTFE glides, zero smoothing, and 80 hours of high-performance wireless battery.",
      sizes: ["Matte Black", "Cyan Glow"],
      inStock: true,
      isExclusive: true
    },
    {
      _id: "prod-5",
      title: "Deskmat XXL Speed Edition (900x400mm)",
      category: "accessories",
      price: 39.99,
      itemImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      designShowcaseImage1: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=800&q=80",
      description: "Micro-woven textured cloth surface with stitched anti-fray borders and non-slip rubber grip base.",
      sizes: ["XXL (900x400)"],
      inStock: true,
      isExclusive: false
    },
    {
      _id: "prod-6",
      title: "ETERNALS Holographic Snapback Cap",
      category: "accessories",
      price: 34.99,
      itemImage: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      description: "Structured high-profile 6-panel cap featuring 3D holographic embroidery and breathable eyelets.",
      sizes: ["One Size Fits All"],
      inStock: true,
      isExclusive: false
    },
    {
      _id: "prod-7",
      title: "Championship Ring 2025 Collector’s Item",
      category: "collectibles",
      price: 89.99,
      itemImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      description: "Heavy alloy commemorative championship ring with cyan gemstone and engraved tournament stats box.",
      sizes: ["Collector Edition"],
      inStock: true,
      isExclusive: true
    },
    {
      _id: "prod-8",
      title: "Classic Icon Heavyweight Tee",
      category: "tees",
      price: 38.00,
      itemImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      description: "100% carded organic cotton with vintage mineral wash and minimalist chest logo print.",
      sizes: ["S", "M", "L", "XL", "2XL"],
      inStock: true,
      isExclusive: false
    }
  ]
};
