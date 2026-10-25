/**
 * Hostinger Database Service Layer
 * 
 * Provides database integration for Hostinger MySQL/MariaDB instances.
 * Includes schema definitions, connection configuration, SQL export for phpMyAdmin,
 * and reactive local caching with asynchronous database synchronization.
 */

// Default or loaded Hostinger Database configuration
const HOSTINGER_CONFIG_KEY = 'eternals_hostinger_db_config';

export const getHostingerDbConfig = () => {
  try {
    const saved = localStorage.getItem(HOSTINGER_CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Failed to parse Hostinger DB config:', err);
  }

  return {
    host: import.meta.env.VITE_HOSTINGER_DB_HOST || 'sql.freedb.tech',
    port: import.meta.env.VITE_HOSTINGER_DB_PORT || '3306',
    database: import.meta.env.VITE_HOSTINGER_DB_NAME || 'u123456789_eternals_db',
    username: import.meta.env.VITE_HOSTINGER_DB_USER || 'u123456789_eternals_admin',
    password: import.meta.env.VITE_HOSTINGER_DB_PASSWORD || '',
    ssl: true,
    apiEndpoint: import.meta.env.VITE_HOSTINGER_API_ENDPOINT || '',
    isConnected: false,
    lastTested: null
  };
};

export const saveHostingerDbConfig = (config) => {
  try {
    localStorage.setItem(HOSTINGER_CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save Hostinger DB config:', err);
  }
};

/**
 * Hostinger MySQL / MariaDB SQL Schema Definition
 * Can be executed in Hostinger phpMyAdmin or MySQL client
 */
export const HOSTINGER_SQL_SCHEMA = `
-- ============================================================================
-- ETERNALS GGS ESPORTS & ENTERTAINMENT - HOSTINGER DATABASE SCHEMA
-- Compatible with MySQL 8.0+ and MariaDB 10.5+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS \`eternals_esports_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`eternals_esports_db\`;

-- 1. Users & Clerk Auth Identity Mapping
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`clerk_id\` VARCHAR(128) UNIQUE NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`display_name\` VARCHAR(128) NOT NULL,
  \`role\` ENUM('admin', 'athlete', 'referee', 'player') DEFAULT 'player',
  \`avatar_url\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Athlete Profiles & Social Dossier Aggregation
CREATE TABLE IF NOT EXISTS \`athlete_dossiers\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`user_id\` VARCHAR(64),
  \`player_tag\` VARCHAR(64) NOT NULL,
  \`full_name\` VARCHAR(128) NOT NULL,
  \`signature_role\` VARCHAR(64) NOT NULL,
  \`division\` VARCHAR(64) NOT NULL,
  \`region\` VARCHAR(64) DEFAULT 'North America',
  \`kda_ratio\` DECIMAL(4,2) DEFAULT 0.00,
  \`career_earnings\` DECIMAL(12,2) DEFAULT 0.00,
  \`operational_bio\` TEXT,
  \`hardware_rig\` TEXT,
  \`twitch_handle\` VARCHAR(128),
  \`twitch_followers\` INT UNSIGNED DEFAULT 0,
  \`youtube_handle\` VARCHAR(128),
  \`youtube_subscribers\` INT UNSIGNED DEFAULT 0,
  \`x_handle\` VARCHAR(128),
  \`x_followers\` INT UNSIGNED DEFAULT 0,
  \`kick_handle\` VARCHAR(128),
  \`kick_followers\` INT UNSIGNED DEFAULT 0,
  \`instagram_handle\` VARCHAR(128),
  \`instagram_followers\` INT UNSIGNED DEFAULT 0,
  \`tiktok_handle\` VARCHAR(128),
  \`tiktok_followers\` INT UNSIGNED DEFAULT 0,
  \`discord_tag\` VARCHAR(128),
  \`calculated_total_followers\` BIGINT UNSIGNED DEFAULT 0,
  \`last_synced_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 3. Tournament Admins & Referee Duty Tracking
CREATE TABLE IF NOT EXISTS \`referee_duty_logs\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`referee_id\` VARCHAR(64) NOT NULL,
  \`referee_name\` VARCHAR(128) NOT NULL,
  \`tournament_id\` VARCHAR(64) NOT NULL,
  \`tournament_name\` VARCHAR(128) NOT NULL,
  \`shift_status\` ENUM('active', 'paused', 'completed') DEFAULT 'active',
  \`shift_started_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`shift_ended_at\` TIMESTAMP NULL DEFAULT NULL,
  \`total_active_seconds\` INT UNSIGNED DEFAULT 0,
  \`matches_officiated\` INT UNSIGNED DEFAULT 0,
  \`disputes_resolved\` INT UNSIGNED DEFAULT 0,
  \`notes\` TEXT,
  INDEX \`idx_referee\` (\`referee_id\`),
  INDEX \`idx_tournament\` (\`tournament_id\`)
) ENGINE=InnoDB;

-- 4. Tournament Registrations & Player Hub
CREATE TABLE IF NOT EXISTS \`tournament_registrations\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`tournament_id\` VARCHAR(64) NOT NULL,
  \`tournament_name\` VARCHAR(128) NOT NULL,
  \`team_name\` VARCHAR(128) NOT NULL,
  \`captain_name\` VARCHAR(128) NOT NULL,
  \`captain_email\` VARCHAR(255) NOT NULL,
  \`captain_discord\` VARCHAR(128) NOT NULL,
  \`roster_members_json\` JSON NOT NULL,
  \`check_in_status\` ENUM('pending', 'checked_in', 'disqualified') DEFAULT 'pending',
  \`check_in_time\` TIMESTAMP NULL DEFAULT NULL,
  \`reported_score_team\` INT DEFAULT NULL,
  \`reported_score_opponent\` INT DEFAULT NULL,
  \`proof_screenshot_url\` TEXT,
  \`dispute_flag\` BOOLEAN DEFAULT FALSE,
  \`registered_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Direct Revenue & In-House Apparel Production Accounting
CREATE TABLE IF NOT EXISTS \`direct_revenue_orders\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`order_number\` VARCHAR(64) UNIQUE NOT NULL,
  \`item_title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(64) NOT NULL,
  \`quantity\` INT UNSIGNED DEFAULT 1,
  \`retail_price_unit\` DECIMAL(10,2) NOT NULL,
  \`production_cost_unit\` DECIMAL(10,2) NOT NULL,
  \`gross_revenue\` DECIMAL(10,2) NOT NULL,
  \`total_production_cost\` DECIMAL(10,2) NOT NULL,
  \`net_direct_profit\` DECIMAL(10,2) NOT NULL,
  \`direct_margin_pct\` DECIMAL(5,2) NOT NULL,
  \`printify_pod_estimated_profit\` DECIMAL(10,2) NOT NULL,
  \`direct_advantage_delta\` DECIMAL(10,2) NOT NULL,
  \`order_status\` ENUM('paid', 'producing', 'dispatched', 'delivered') DEFAULT 'paid',
  \`customer_name\` VARCHAR(128),
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

/**
 * Direct Apparel Economics Seed Data
 * Demonstrates the direct in-house revenue model vs Printify / 3rd-party POD revenue splits
 */
export const INITIAL_DIRECT_REVENUE_METRICS = {
  totalGrossRevenue: 18450.00,
  totalProductionCost: 4980.00,
  totalNetDirectRevenue: 13470.00, // 73% margin retained directly
  printifyPodEstimatedRevenue: 4612.50, // Only 25% if split with Printify
  directAdvantageRetained: 8857.50, // Extra profit kept by producing directly
  orders: [
    {
      id: "ord-101",
      orderNumber: "ETRN-8842",
      itemTitle: "Pro Championship Jersey 2026",
      category: "Apparel",
      quantity: 42,
      retailPriceUnit: 70.00,
      productionCostUnit: 17.50, // Garment + sublimated print
      grossRevenue: 2940.00,
      totalProductionCost: 735.00,
      netDirectProfit: 2205.00, // 75% direct profit retained
      printifyEquivalentProfit: 735.00, // Printify typically splits ~75%
      status: "Dispatched",
      date: "2026-10-24"
    },
    {
      id: "ord-102",
      orderNumber: "ETRN-8843",
      itemTitle: "Eternals Heavyweight Cyber Hoodie",
      category: "Apparel",
      quantity: 65,
      retailPriceUnit: 85.00,
      productionCostUnit: 24.00, // 450gsm blank + puff embroidery
      grossRevenue: 5525.00,
      totalProductionCost: 1560.00,
      netDirectProfit: 3965.00,
      printifyEquivalentProfit: 1380.00,
      status: "Producing",
      date: "2026-10-23"
    },
    {
      id: "ord-103",
      orderNumber: "ETRN-8844",
      itemTitle: "Oversized Stealth Scrim Tee",
      category: "Apparel",
      quantity: 90,
      retailPriceUnit: 45.00,
      productionCostUnit: 11.20,
      grossRevenue: 4050.00,
      totalProductionCost: 1008.00,
      netDirectProfit: 3042.00,
      printifyEquivalentProfit: 1012.50,
      status: "Dispatched",
      date: "2026-10-22"
    },
    {
      id: "ord-104",
      orderNumber: "ETRN-8845",
      itemTitle: "Tournament Speedpad XXL",
      category: "Peripherals",
      quantity: 50,
      retailPriceUnit: 48.00,
      productionCostUnit: 12.00,
      grossRevenue: 2400.00,
      totalProductionCost: 600.00,
      netDirectProfit: 1800.00,
      printifyEquivalentProfit: 600.00,
      status: "Paid",
      date: "2026-10-21"
    },
    {
      id: "ord-105",
      orderNumber: "ETRN-8846",
      itemTitle: "Sovereign Snapback Hat",
      category: "Accessories",
      quantity: 75,
      retailPriceUnit: 35.00,
      productionCostUnit: 9.50,
      grossRevenue: 2625.00,
      totalProductionCost: 712.50,
      netDirectProfit: 1912.50,
      printifyEquivalentProfit: 656.25,
      status: "Dispatched",
      date: "2026-10-20"
    }
  ]
};

/**
 * Initial Referee Shifts & Live Duty Roster
 */
export const INITIAL_REFEREE_DATA = [
  {
    id: "ref-1",
    refereeId: "usr-ref-01",
    refereeName: "Jordan 'Vance' Reed",
    email: "jordan.ref@eternalsggs.com",
    tournamentId: "tourn-1",
    tournamentName: "Marvel Rivals Winter Showdown",
    isShiftActive: true,
    shiftStartedAt: Date.now() - (2 * 3600 * 1000 + 44 * 60 * 1000), // 2h 44m ago
    accumulatedSeconds: 9840,
    matchesOfficiated: 6,
    disputesResolved: 2,
    status: "Active on Duty",
    assignedStage: "Semifinals Bracket A"
  },
  {
    id: "ref-2",
    refereeId: "usr-ref-02",
    refereeName: "Christian 'Kolt' Miller",
    email: "christian.ref@eternalsggs.com",
    tournamentId: "tourn-2",
    tournamentName: "Eternals Rocket League Open 2026",
    isShiftActive: false,
    shiftStartedAt: null,
    accumulatedSeconds: 15400, // 4h 16m logged
    matchesOfficiated: 11,
    disputesResolved: 1,
    status: "Off Duty (Ready)",
    assignedStage: "Grand Finals"
  },
  {
    id: "ref-3",
    refereeId: "usr-ref-03",
    refereeName: "Taylor 'Aura' Santos",
    email: "taylor.ref@eternalsggs.com",
    tournamentId: "tourn-3",
    tournamentName: "The Finals Cashout Clash",
    isShiftActive: true,
    shiftStartedAt: Date.now() - (1 * 3600 * 1000 + 12 * 60 * 1000), // 1h 12m ago
    accumulatedSeconds: 4320,
    matchesOfficiated: 4,
    disputesResolved: 0,
    status: "Active on Duty",
    assignedStage: "Quarterfinals Round 2"
  }
];

/**
 * Initial Tournament Registered Squads
 */
export const INITIAL_REGISTERED_SQUADS = [
  {
    id: "reg-1",
    tournamentId: "tourn-1",
    tournamentName: "Marvel Rivals Winter Showdown",
    teamName: "Eternals GGs",
    captainName: "Damian Cruz",
    captainEmail: "reaper@eternalsggs.com",
    captainDiscord: "Reaper#0001",
    roster: ["Damian Cruz (Reaper)", "Nathan Drake (Chrono)", "Marcus Vance (Vortex)", "Alex Mercer (Zephyr)", "Sub: Tyler Cole"],
    checkInStatus: "Checked In",
    checkInTime: "2026-10-25 15:45",
    reportedScore: { team: 3, opponent: 1, proofUrl: "https://twitch.tv/clip/eternals-finals" },
    dispute: null
  },
  {
    id: "reg-2",
    tournamentId: "tourn-1",
    tournamentName: "Marvel Rivals Winter Showdown",
    teamName: "Vanguard Syndicate",
    captainName: "Jaxson Briggs",
    captainEmail: "jaxson@vanguardsyn.gg",
    captainDiscord: "Jax#7777",
    roster: ["Jaxson Briggs", "Kaelen Voss", "Darek Stone", "Ryder Vance", "Sub: Liam Cross"],
    checkInStatus: "Checked In",
    checkInTime: "2026-10-25 15:50",
    reportedScore: { team: 1, opponent: 3, proofUrl: "https://youtube.com/watch?v=scrim-record" },
    dispute: null
  },
  {
    id: "reg-3",
    tournamentId: "tourn-1",
    tournamentName: "Marvel Rivals Winter Showdown",
    teamName: "Sentinels Rift",
    captainName: "Marcus Holt",
    captainEmail: "mholt@sentinelsrift.com",
    captainDiscord: "Holt#2341",
    roster: ["Marcus Holt", "Elijah Cross", "Bryan Knight", "Leo Stark"],
    checkInStatus: "Pending Check-In",
    checkInTime: null,
    reportedScore: null,
    dispute: null
  },
  {
    id: "reg-4",
    tournamentId: "tourn-2",
    tournamentName: "Eternals Rocket League Open 2026",
    teamName: "Velocity Apex",
    captainName: "Lucas Silva",
    captainEmail: "lucas@velocityapex.gg",
    captainDiscord: "Velocity#9912",
    roster: ["Lucas Silva", "Mateo Rossi", "Nico Becker"],
    checkInStatus: "Checked In",
    checkInTime: "2026-10-25 14:30",
    reportedScore: null,
    dispute: null
  }
];
