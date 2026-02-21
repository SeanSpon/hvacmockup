import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
console.log("Connecting to:", connectionString.substring(0, 40) + "...");
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ============================================================
// HELPERS
// ============================================================

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: readonly T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function dateAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(randomBetween(7, 17), randomBetween(0, 59), 0, 0);
  return d;
}

function dateFuture(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(randomBetween(7, 17), randomBetween(0, 59), 0, 0);
  return d;
}

function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function tomorrow(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function louisvilleLat(): number {
  return randomFloat(38.20, 38.30, 4);
}

function louisvilleLng(): number {
  return randomFloat(-85.81, -85.71, 4);
}

function generateSerial(): string {
  const prefix = pick(["SN", "WC", "AH", "CU", "RU"]);
  const year = randomBetween(10, 24);
  const num = randomBetween(100000, 999999);
  return `${prefix}${year}${num}`;
}

// ============================================================
// DATA CONSTANTS
// ============================================================

const SKILLS = ["HVAC", "Refrigeration", "Ice Machines", "Electrical", "Controls"];
const CERTIFICATIONS = [
  "EPA 608 Universal",
  "EPA 608 Type I",
  "EPA 608 Type II",
  "EPA 608 Type III",
  "NATE Certified",
  "R-410A Safety Certified",
  "OSHA 10",
  "OSHA 30",
  "First Aid/CPR",
  "Carrier Factory Authorized",
  "Trane Comfort Specialist",
  "York Certified",
  "Daikin D1 Certified",
  "Journeyman HVAC License",
  "Master HVAC License",
  "CFC Handling Certified",
  "BPI Building Analyst",
];

const BRANDS_AC = ["Carrier", "Trane", "Lennox", "Daikin", "York", "Rheem", "Bryant", "Goodman"];
const BRANDS_REFRIGERATION = ["Hoshizaki", "Manitowoc", "True", "Turbo Air", "Traulsen", "Bohn", "Larkin", "Hussmann"];
const REFRIGERANTS = ["R-410A", "R-22", "R-134a", "R-404A", "R-407C", "R-448A"];
const FILTER_SIZES = ["16x20x1", "16x25x1", "20x20x1", "20x25x1", "24x24x2", "16x20x4", "20x25x4", "24x24x4"];

const LOUISVILLE_ZIPS = [
  "40202", "40203", "40204", "40205", "40206", "40207", "40208", "40209",
  "40210", "40211", "40212", "40213", "40214", "40215", "40216", "40217",
  "40218", "40219", "40220", "40222", "40223", "40241", "40242", "40243",
  "40245", "40258", "40259", "40272", "40291", "40299",
];

const TIME_SLOTS = [
  { start: "07:00", end: "09:00" },
  { start: "08:00", end: "10:00" },
  { start: "08:30", end: "10:30" },
  { start: "09:00", end: "11:00" },
  { start: "09:30", end: "11:30" },
  { start: "10:00", end: "12:00" },
  { start: "11:00", end: "13:00" },
  { start: "12:00", end: "14:00" },
  { start: "13:00", end: "15:00" },
  { start: "13:30", end: "15:30" },
  { start: "14:00", end: "16:00" },
  { start: "15:00", end: "17:00" },
];

// ============================================================
// SEED DATA DEFINITIONS
// ============================================================

const technicians = [
  { name: "James Carter", email: "james.carter@fdpierce.com", phone: "(502) 555-0101" },
  { name: "Marcus Williams", email: "marcus.williams@fdpierce.com", phone: "(502) 555-0102" },
  { name: "David Thompson", email: "david.thompson@fdpierce.com", phone: "(502) 555-0103" },
  { name: "Robert Miller", email: "robert.miller@fdpierce.com", phone: "(502) 555-0104" },
  { name: "Michael Davis", email: "michael.davis@fdpierce.com", phone: "(502) 555-0105" },
  { name: "Chris Johnson", email: "chris.johnson@fdpierce.com", phone: "(502) 555-0106" },
  { name: "Kyle Anderson", email: "kyle.anderson@fdpierce.com", phone: "(502) 555-0107" },
  { name: "Brandon Moore", email: "brandon.moore@fdpierce.com", phone: "(502) 555-0108" },
  { name: "Tyler Jackson", email: "tyler.jackson@fdpierce.com", phone: "(502) 555-0109" },
  { name: "Derek White", email: "derek.white@fdpierce.com", phone: "(502) 555-0110" },
  { name: "Nathan Harris", email: "nathan.harris@fdpierce.com", phone: "(502) 555-0111" },
  { name: "Travis Martin", email: "travis.martin@fdpierce.com", phone: "(502) 555-0112" },
  { name: "Sean Garcia", email: "sean.garcia@fdpierce.com", phone: "(502) 555-0113" },
  { name: "Patrick Brown", email: "patrick.brown@fdpierce.com", phone: "(502) 555-0114" },
  { name: "Corey Taylor", email: "corey.taylor@fdpierce.com", phone: "(502) 555-0115" },
  { name: "Ryan Clark", email: "ryan.clark@fdpierce.com", phone: "(502) 555-0116" },
];

const customers = [
  { name: "Mark Sullivan", email: "mark@sullivanssteakhouse.com", phone: "(502) 555-0201", business: "Sullivan's Steakhouse" },
  { name: "Linda Chen", email: "linda@brownhotel.com", phone: "(502) 555-0202", business: "The Brown Hotel" },
  { name: "Tom Whitfield", email: "tom@whitfieldlaw.com", phone: "(502) 555-0203", business: "Whitfield & Associates Law" },
  { name: "Dr. Rachel Foster", email: "rachel@bluegrassmed.com", phone: "(502) 555-0204", business: "Bluegrass Medical Center" },
  { name: "Karen Mitchell", email: "karen@stxaviers.edu", phone: "(502) 555-0205", business: "St. Xavier High School" },
  { name: "Greg Hawkins", email: "greg@hawkinslogistics.com", phone: "(502) 555-0206", business: "Hawkins Logistics" },
  { name: "Maria Gonzalez", email: "maria@lafiestaky.com", phone: "(502) 555-0207", business: "La Fiesta Mexican Grill" },
  { name: "Steve Parker", email: "steve@parkerretail.com", phone: "(502) 555-0208", business: "Parker Retail Group" },
  { name: "Janet Coleman", email: "janet@colemanplaza.com", phone: "(502) 555-0209", business: "Coleman Office Plaza" },
  { name: "Robert Yates", email: "robert@yatesauto.com", phone: "(502) 555-0210", business: "Yates Automotive Center" },
];

const properties = [
  { name: "Sullivan's Steakhouse - Main", address: "101 W Market St", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 0 },
  { name: "Sullivan's Steakhouse - Kitchen", address: "101 W Market St (Kitchen Wing)", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 0 },
  { name: "The Brown Hotel - Main Building", address: "335 W Broadway", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 1 },
  { name: "The Brown Hotel - Conference Center", address: "337 W Broadway", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 1 },
  { name: "Whitfield & Associates - Office Suite", address: "500 W Jefferson St, Suite 400", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 2 },
  { name: "Bluegrass Medical Center", address: "1780 Bardstown Rd", zip: "40205", type: "COMMERCIAL" as const, customerIdx: 3 },
  { name: "Bluegrass Medical - Annex", address: "1782 Bardstown Rd", zip: "40205", type: "COMMERCIAL" as const, customerIdx: 3 },
  { name: "St. Xavier High School - Main", address: "1609 Poplar Level Rd", zip: "40217", type: "COMMERCIAL" as const, customerIdx: 4 },
  { name: "St. Xavier High School - Gymnasium", address: "1609 Poplar Level Rd (Gym)", zip: "40217", type: "COMMERCIAL" as const, customerIdx: 4 },
  { name: "Hawkins Logistics Warehouse", address: "4400 Robards Ln", zip: "40218", type: "INDUSTRIAL" as const, customerIdx: 5 },
  { name: "Hawkins Logistics - Office Wing", address: "4402 Robards Ln", zip: "40218", type: "COMMERCIAL" as const, customerIdx: 5 },
  { name: "La Fiesta Mexican Grill", address: "2235 Bardstown Rd", zip: "40204", type: "COMMERCIAL" as const, customerIdx: 6 },
  { name: "Parker Retail - Oxmoor Center", address: "7900 Shelbyville Rd", zip: "40222", type: "COMMERCIAL" as const, customerIdx: 7 },
  { name: "Parker Retail - Mall St. Matthews", address: "5000 Shelbyville Rd", zip: "40207", type: "COMMERCIAL" as const, customerIdx: 7 },
  { name: "Coleman Office Plaza - Tower A", address: "600 W Main St, Tower A", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 8 },
  { name: "Coleman Office Plaza - Tower B", address: "600 W Main St, Tower B", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 8 },
  { name: "Yates Automotive Center", address: "3100 Bardstown Rd", zip: "40205", type: "COMMERCIAL" as const, customerIdx: 9 },
  { name: "Louisville Convention Center", address: "221 S Fourth St", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 1 },
  { name: "Bluegrass Industrial Cold Storage", address: "5200 Grade Ln", zip: "40213", type: "INDUSTRIAL" as const, customerIdx: 5 },
  { name: "Parker Retail - Springhurst", address: "3939 Dutchmans Ln", zip: "40207", type: "COMMERCIAL" as const, customerIdx: 7 },
  { name: "Whitfield & Associates - Downtown Annex", address: "510 W Jefferson St", zip: "40202", type: "COMMERCIAL" as const, customerIdx: 2 },
  { name: "Louisville Free Public Library - Main", address: "301 York St", zip: "40203", type: "COMMERCIAL" as const, customerIdx: 4 },
];

const unitTemplates = [
  // Sullivan's Steakhouse - Main (idx 0)
  { propIdx: 0, type: "ROOFTOP_UNIT" as const, brand: "Carrier", model: "48TC-D16", tonnage: 15, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 0, type: "ROOFTOP_UNIT" as const, brand: "Carrier", model: "48TC-D08", tonnage: 7.5, refrigerant: "R-410A", filter: "20x25x4", condition: "GOOD" as const },
  // Sullivan's Kitchen (idx 1)
  { propIdx: 1, type: "WALK_IN_COOLER" as const, brand: "True", model: "TWT-48SD", tonnage: 3, refrigerant: "R-404A", filter: null, condition: "FAIR" as const },
  { propIdx: 1, type: "WALK_IN_FREEZER" as const, brand: "True", model: "TWT-27F", tonnage: 2, refrigerant: "R-404A", filter: null, condition: "GOOD" as const },
  { propIdx: 1, type: "ICE_MACHINE" as const, brand: "Hoshizaki", model: "KM-1601SRJ3", tonnage: null, refrigerant: "R-404A", filter: null, condition: "EXCELLENT" as const },
  { propIdx: 1, type: "EXHAUST_FAN" as const, brand: "Carrier", model: "EF-3600", tonnage: null, refrigerant: null, filter: null, condition: "GOOD" as const },
  // Brown Hotel Main (idx 2)
  { propIdx: 2, type: "ROOFTOP_UNIT" as const, brand: "Trane", model: "YCD240E3", tonnage: 20, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 2, type: "SPLIT_SYSTEM" as const, brand: "Trane", model: "4TWR6048", tonnage: 4, refrigerant: "R-410A", filter: "16x25x1", condition: "EXCELLENT" as const },
  { propIdx: 2, type: "FURNACE" as const, brand: "Trane", model: "S9V2-VS", tonnage: null, refrigerant: null, filter: "20x25x4", condition: "GOOD" as const },
  // Brown Hotel Conference (idx 3)
  { propIdx: 3, type: "PACKAGE_UNIT" as const, brand: "Trane", model: "YCZ060E3", tonnage: 5, refrigerant: "R-410A", filter: "20x20x1", condition: "FAIR" as const },
  { propIdx: 3, type: "MAKE_UP_AIR" as const, brand: "Lennox", model: "MUA-2400", tonnage: null, refrigerant: null, filter: "20x25x1", condition: "GOOD" as const },
  // Whitfield Law (idx 4)
  { propIdx: 4, type: "SPLIT_SYSTEM" as const, brand: "Daikin", model: "DZ18TC0601", tonnage: 5, refrigerant: "R-410A", filter: "16x20x1", condition: "EXCELLENT" as const },
  { propIdx: 4, type: "FURNACE" as const, brand: "Daikin", model: "DM97MC0803", tonnage: null, refrigerant: null, filter: "16x20x1", condition: "EXCELLENT" as const },
  // Bluegrass Medical (idx 5)
  { propIdx: 5, type: "ROOFTOP_UNIT" as const, brand: "York", model: "ZR120C00D4B", tonnage: 10, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 5, type: "SPLIT_SYSTEM" as const, brand: "York", model: "YZF48B21S", tonnage: 4, refrigerant: "R-410A", filter: "20x25x1", condition: "GOOD" as const },
  { propIdx: 5, type: "REFRIGERATION" as const, brand: "True", model: "T-49-HC", tonnage: 1, refrigerant: "R-134a", filter: null, condition: "FAIR" as const },
  // Bluegrass Medical Annex (idx 6)
  { propIdx: 6, type: "HEAT_PUMP" as const, brand: "Carrier", model: "25HPA660A003", tonnage: 5, refrigerant: "R-410A", filter: "20x25x4", condition: "GOOD" as const },
  // St. Xavier Main (idx 7)
  { propIdx: 7, type: "ROOFTOP_UNIT" as const, brand: "Lennox", model: "LGH120H4", tonnage: 10, refrigerant: "R-410A", filter: "24x24x4", condition: "FAIR" as const },
  { propIdx: 7, type: "ROOFTOP_UNIT" as const, brand: "Lennox", model: "LGH060H4", tonnage: 5, refrigerant: "R-410A", filter: "20x25x4", condition: "POOR" as const },
  { propIdx: 7, type: "FURNACE" as const, brand: "Lennox", model: "SL297NV", tonnage: null, refrigerant: null, filter: "20x25x1", condition: "GOOD" as const },
  // St. Xavier Gym (idx 8)
  { propIdx: 8, type: "ROOFTOP_UNIT" as const, brand: "Rheem", model: "RLNL-C120DL", tonnage: 10, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 8, type: "MAKE_UP_AIR" as const, brand: "Rheem", model: "MUA-1800R", tonnage: null, refrigerant: null, filter: "20x25x1", condition: "FAIR" as const },
  // Hawkins Warehouse (idx 9)
  { propIdx: 9, type: "ROOFTOP_UNIT" as const, brand: "Carrier", model: "50XCA06A2A5", tonnage: 25, refrigerant: "R-410A", filter: "24x24x4", condition: "FAIR" as const },
  { propIdx: 9, type: "EXHAUST_FAN" as const, brand: "York", model: "EXH-4800", tonnage: null, refrigerant: null, filter: null, condition: "GOOD" as const },
  // Hawkins Office (idx 10)
  { propIdx: 10, type: "SPLIT_SYSTEM" as const, brand: "Carrier", model: "24ACC636A003", tonnage: 3, refrigerant: "R-410A", filter: "16x20x1", condition: "GOOD" as const },
  // La Fiesta (idx 11)
  { propIdx: 11, type: "ROOFTOP_UNIT" as const, brand: "Rheem", model: "RLNL-C075DL", tonnage: 7.5, refrigerant: "R-410A", filter: "20x25x4", condition: "GOOD" as const },
  { propIdx: 11, type: "WALK_IN_COOLER" as const, brand: "Turbo Air", model: "TWR-72SD", tonnage: 2, refrigerant: "R-404A", filter: null, condition: "GOOD" as const },
  { propIdx: 11, type: "WALK_IN_FREEZER" as const, brand: "Turbo Air", model: "TWF-48SD", tonnage: 2, refrigerant: "R-404A", filter: null, condition: "FAIR" as const },
  { propIdx: 11, type: "ICE_MACHINE" as const, brand: "Manitowoc", model: "IYT0900A", tonnage: null, refrigerant: "R-404A", filter: null, condition: "GOOD" as const },
  { propIdx: 11, type: "EXHAUST_FAN" as const, brand: "Lennox", model: "EF-2400", tonnage: null, refrigerant: null, filter: null, condition: "EXCELLENT" as const },
  // Parker Retail Oxmoor (idx 12)
  { propIdx: 12, type: "ROOFTOP_UNIT" as const, brand: "Daikin", model: "DPS180D", tonnage: 15, refrigerant: "R-410A", filter: "24x24x4", condition: "EXCELLENT" as const },
  { propIdx: 12, type: "SPLIT_SYSTEM" as const, brand: "Daikin", model: "DZ14SA0603", tonnage: 5, refrigerant: "R-410A", filter: "20x25x1", condition: "GOOD" as const },
  // Parker Retail Mall (idx 13)
  { propIdx: 13, type: "PACKAGE_UNIT" as const, brand: "York", model: "ZR060C00D2B", tonnage: 5, refrigerant: "R-410A", filter: "20x20x1", condition: "GOOD" as const },
  // Coleman Tower A (idx 14)
  { propIdx: 14, type: "ROOFTOP_UNIT" as const, brand: "Trane", model: "YCD360F3", tonnage: 30, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 14, type: "AC" as const, brand: "Trane", model: "XR15-048", tonnage: 4, refrigerant: "R-410A", filter: "20x25x1", condition: "EXCELLENT" as const },
  // Coleman Tower B (idx 15)
  { propIdx: 15, type: "ROOFTOP_UNIT" as const, brand: "Trane", model: "YCD300E3", tonnage: 25, refrigerant: "R-410A", filter: "24x24x4", condition: "FAIR" as const },
  // Yates Automotive (idx 16)
  { propIdx: 16, type: "ROOFTOP_UNIT" as const, brand: "Goodman", model: "GPC1460H41", tonnage: 5, refrigerant: "R-410A", filter: "20x25x4", condition: "GOOD" as const },
  { propIdx: 16, type: "MAKE_UP_AIR" as const, brand: "Goodman", model: "MUA-3600G", tonnage: null, refrigerant: null, filter: "24x24x4", condition: "FAIR" as const },
  // Convention Center (idx 17)
  { propIdx: 17, type: "ROOFTOP_UNIT" as const, brand: "Carrier", model: "50XCA12A3B", tonnage: 40, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 17, type: "ROOFTOP_UNIT" as const, brand: "Carrier", model: "50XCA12A3B", tonnage: 40, refrigerant: "R-410A", filter: "24x24x4", condition: "GOOD" as const },
  { propIdx: 17, type: "MAKE_UP_AIR" as const, brand: "Carrier", model: "MUA-6000C", tonnage: null, refrigerant: null, filter: "24x24x4", condition: "EXCELLENT" as const },
  // Cold Storage (idx 18)
  { propIdx: 18, type: "WALK_IN_COOLER" as const, brand: "Hussmann", model: "RLN-5075", tonnage: 8, refrigerant: "R-404A", filter: null, condition: "GOOD" as const },
  { propIdx: 18, type: "WALK_IN_FREEZER" as const, brand: "Hussmann", model: "FLN-4060", tonnage: 6, refrigerant: "R-404A", filter: null, condition: "FAIR" as const },
  { propIdx: 18, type: "REFRIGERATION" as const, brand: "Bohn", model: "BHL3A", tonnage: 3, refrigerant: "R-404A", filter: null, condition: "GOOD" as const },
  // Parker Springhurst (idx 19)
  { propIdx: 19, type: "SPLIT_SYSTEM" as const, brand: "Bryant", model: "186BNA048", tonnage: 4, refrigerant: "R-410A", filter: "20x20x1", condition: "GOOD" as const },
  { propIdx: 19, type: "REACH_IN_COOLER" as const, brand: "True", model: "T-49G-HC", tonnage: 1, refrigerant: "R-134a", filter: null, condition: "EXCELLENT" as const },
];

const jobDescriptions: Record<string, string[]> = {
  REPAIR: [
    "Compressor not engaging - unit blowing warm air",
    "Refrigerant leak detected, system losing charge",
    "Condenser fan motor failed, unit shutting down on high pressure",
    "Thermostat malfunction - not maintaining set temperature",
    "Evaporator coil freezing up intermittently",
    "Blower motor bearings failing - excessive noise",
    "Control board relay stuck - unit short cycling",
    "Walk-in cooler not reaching temperature",
    "Ice machine not producing ice, water valve issue",
    "Condensate drain clogged causing water damage",
    "Belt slipping on rooftop unit - squealing noise",
    "Heat exchanger crack detected - CO concern",
    "Expansion valve stuck open - poor cooling",
    "Contactor pitting causing intermittent operation",
    "VFD fault on supply fan motor",
  ],
  MAINTENANCE: [
    "Quarterly preventive maintenance - filter change and coil cleaning",
    "Annual maintenance inspection - full system checkout",
    "Semi-annual PM - refrigerant check and electrical tightening",
    "Seasonal startup - cooling season preparation",
    "Seasonal shutdown - winterization procedure",
    "Filter replacement and belt inspection",
    "Condenser coil chemical cleaning",
    "Evaporator coil cleaning and drain treatment",
  ],
  INSPECTION: [
    "Annual kitchen hood and exhaust inspection",
    "Pre-purchase equipment inspection",
    "Insurance compliance inspection",
    "Health department refrigeration inspection follow-up",
  ],
  EMERGENCY: [
    "No heat - pipes at risk of freezing, tenant complaints",
    "Total AC failure during heat advisory",
    "Walk-in freezer alarm - temperature rising above 0F",
    "Kitchen exhaust fan failed during dinner service",
    "Gas smell near furnace - evacuated area",
  ],
  INSTALLATION: [
    "New rooftop unit installation - replacing end-of-life unit",
    "Ice machine replacement and water line hookup",
    "New walk-in cooler compressor rack installation",
    "Mini-split installation for server room cooling",
  ],
  WARRANTY: [
    "Warranty compressor replacement - unit under manufacturer warranty",
    "Warranty control board replacement",
  ],
  CALLBACK: [
    "Customer reports same issue recurring after previous repair",
    "Follow-up on refrigerant leak repair - verify charge holding",
  ],
  ESTIMATE: [
    "Estimate for full system replacement - 15-ton rooftop unit",
    "Estimate for new walk-in cooler construction",
    "Estimate for building-wide controls upgrade",
  ],
};

// ============================================================
// MAIN SEED FUNCTION
// ============================================================

async function main() {
  console.log("========================================");
  console.log("  FD Pierce Company - Database Seed");
  console.log("========================================\n");

  // ---- CLEAR ALL TABLES ----
  console.log("Clearing existing data...");
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.dailyMetric.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.installProject.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.jobPhoto.deleteMany();
  await prisma.job.deleteMany();
  await prisma.maintenanceRecord.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.techProfile.deleteMany();
  await prisma.user.deleteMany();
  console.log("  All tables cleared.\n");

  // ---- HASH PASSWORD ----
  const passwordHash = await bcrypt.hash("password123", 10);

  // ============================================================
  // 1. USERS
  // ============================================================
  console.log("Seeding users...");

  // Admin
  const admin = await prisma.user.create({
    data: {
      name: "Sarah Mann",
      email: "sarah@fdpierce.com",
      phone: "(502) 555-0001",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`  Admin: ${admin.name}`);

  // Dispatchers
  const dispatcher1 = await prisma.user.create({
    data: {
      name: "Jennifer Wright",
      email: "jennifer.wright@fdpierce.com",
      phone: "(502) 555-0010",
      passwordHash,
      role: "DISPATCHER",
    },
  });
  const dispatcher2 = await prisma.user.create({
    data: {
      name: "Anthony Reed",
      email: "anthony.reed@fdpierce.com",
      phone: "(502) 555-0011",
      passwordHash,
      role: "DISPATCHER",
    },
  });
  console.log(`  Dispatchers: ${dispatcher1.name}, ${dispatcher2.name}`);

  // Technicians
  const techUsers = [];
  for (const t of technicians) {
    const user = await prisma.user.create({
      data: {
        name: t.name,
        email: t.email,
        phone: t.phone,
        passwordHash,
        role: "TECHNICIAN",
      },
    });
    techUsers.push(user);
  }
  console.log(`  Technicians: ${techUsers.length} created`);

  // Customers
  const customerUsers = [];
  for (const c of customers) {
    const user = await prisma.user.create({
      data: {
        name: c.name,
        email: c.email,
        phone: c.phone,
        passwordHash,
        role: "CUSTOMER",
      },
    });
    customerUsers.push(user);
  }
  console.log(`  Customers: ${customerUsers.length} created`);
  console.log(`  Total users: ${3 + techUsers.length + customerUsers.length}\n`);

  // ============================================================
  // 2. TECH PROFILES
  // ============================================================
  console.log("Seeding tech profiles...");

  const techProfiles = [];
  for (let i = 0; i < techUsers.length; i++) {
    const yearsExp = randomBetween(1, 15);
    const hireDate = new Date();
    hireDate.setFullYear(hireDate.getFullYear() - yearsExp);
    hireDate.setMonth(randomBetween(0, 11));

    const numSkills = randomBetween(2, 5);
    const skills = pickN(SKILLS, numSkills);

    const numCerts = randomBetween(2, 6);
    const certifications = pickN(CERTIFICATIONS, numCerts);
    // Everyone gets EPA 608
    if (!certifications.includes("EPA 608 Universal")) {
      certifications[0] = "EPA 608 Universal";
    }

    const jobsCompleted = Math.round(yearsExp * randomBetween(40, 65));
    const avgTicket = randomFloat(350, 800);

    const profile = await prisma.techProfile.create({
      data: {
        userId: techUsers[i].id,
        skills,
        certifications,
        hireDate,
        truckNumber: `T-${String(i + 1).padStart(2, "0")}`,
        currentLat: louisvilleLat(),
        currentLng: louisvilleLng(),
        isAvailable: i < 12, // 12 available, 4 off
        avgRating: randomFloat(4.2, 5.0, 1),
        jobsCompleted,
        revenueGenerated: Math.round(jobsCompleted * avgTicket),
      },
    });
    techProfiles.push(profile);
  }
  console.log(`  Tech profiles: ${techProfiles.length} created\n`);

  // ============================================================
  // 3. PROPERTIES
  // ============================================================
  console.log("Seeding properties...");

  const createdProperties = [];
  for (const p of properties) {
    const prop = await prisma.property.create({
      data: {
        customerId: customerUsers[p.customerIdx].id,
        name: p.name,
        address: p.address,
        city: "Louisville",
        state: "KY",
        zip: p.zip,
        lat: louisvilleLat(),
        lng: louisvilleLng(),
        propertyType: p.type,
        notes: null,
      },
    });
    createdProperties.push(prop);
  }
  console.log(`  Properties: ${createdProperties.length} created\n`);

  // ============================================================
  // 4. UNITS
  // ============================================================
  console.log("Seeding units...");

  const createdUnits: any[] = [];
  for (const u of unitTemplates) {
    const installYear = randomBetween(2010, 2024);
    const installDate = new Date(installYear, randomBetween(0, 11), randomBetween(1, 28));
    const warrantyEnd = new Date(installDate);
    warrantyEnd.setFullYear(warrantyEnd.getFullYear() + 5);

    const unit = await prisma.unit.create({
      data: {
        propertyId: createdProperties[u.propIdx].id,
        unitType: u.type,
        brand: u.brand,
        model: u.model,
        serialNumber: generateSerial(),
        installDate,
        warrantyEnd,
        filterSize: u.filter,
        refrigerant: u.refrigerant,
        tonnage: u.tonnage,
        lastService: dateAgo(randomBetween(7, 180)),
        condition: u.condition,
        notes: null,
        photos: [],
      },
    });
    createdUnits.push(unit);
  }
  console.log(`  Units: ${createdUnits.length} created\n`);

  // ============================================================
  // 5. JOBS
  // ============================================================
  console.log("Seeding jobs...");

  const createdJobs = [];
  let jobCounter = 1;

  // Helper to build a job number
  function jobNum(year: number, num: number): string {
    return `FDP-${year}-${String(num).padStart(3, "0")}`;
  }

  // Helper: get a random unit for a property
  function getUnitsForProperty(propId: string) {
    return createdUnits.filter((u) => u.propertyId === propId);
  }

  const jobTypes = ["REPAIR", "MAINTENANCE", "INSPECTION", "EMERGENCY", "INSTALLATION", "WARRANTY", "CALLBACK", "ESTIMATE"] as const;
  const priorities = ["LOW", "NORMAL", "HIGH", "URGENT", "EMERGENCY"] as const;
  const statuses = ["COMPLETED", "SCHEDULED", "EN_ROUTE", "IN_PROGRESS", "PENDING"] as const;

  // --- COMPLETED JOBS (past) - 35 jobs ---
  for (let i = 0; i < 35; i++) {
    const propIdx = randomBetween(0, createdProperties.length - 1);
    const prop = createdProperties[propIdx];
    const propUnits = getUnitsForProperty(prop.id);
    const unit = propUnits.length > 0 ? pick(propUnits) : null;
    const tech = pick(techUsers);
    const customer = customerUsers.find((c) => c.id === prop.customerId)!;
    const jobType = pick(jobTypes.filter((t) => t !== "ESTIMATE"));
    const descs = jobDescriptions[jobType] || jobDescriptions["REPAIR"];
    const desc = pick(descs);
    const daysAgo = randomBetween(5, 365);
    const scheduledDate = dateAgo(daysAgo);
    const completedDate = new Date(scheduledDate);
    completedDate.setHours(completedDate.getHours() + randomBetween(1, 6));
    const estimatedCost = randomFloat(150, 8000);
    const actualCost = estimatedCost * randomFloat(0.8, 1.3, 2);
    const laborHours = randomFloat(0.5, 8.0, 1);
    const slot = pick(TIME_SLOTS);
    const year = scheduledDate.getFullYear();

    const partsUsed = pickN([
      "Compressor - Copeland ZR61K3",
      "Condenser Fan Motor 1/3 HP",
      "Contactor 40A 2-Pole",
      "Capacitor 45/5 MFD 440V",
      "TXV Valve R-410A",
      "Filter Drier 3/8\" SAE",
      "R-410A Refrigerant (5 lbs)",
      "R-404A Refrigerant (8 lbs)",
      "Belts A-68",
      "Thermostat Honeywell T6 Pro",
      "Control Board ICM2805A",
      "Blower Motor 1/2 HP ECM",
      "Evaporator Coil",
      "Condensate Pump",
      "Gas Valve Honeywell VR8204A",
      "Igniter Silicon Nitride",
      "Flame Sensor",
      "Pressure Switch",
      "Transformer 40VA 24V",
    ], randomBetween(0, 4));

    const techNotes = pick([
      "Replaced failed component, tested operation. System running within spec.",
      "Found issue during inspection. Replaced part and verified operation for 30 minutes.",
      "Cleaned coils, checked refrigerant charge. Added 2 lbs R-410A. Superheat and subcooling within range.",
      "Motor bearings seized. Replaced motor. Checked amp draw - within nameplate.",
      "Completed full PM service. All readings nominal. Recommended filter change at next visit.",
      "Repaired refrigerant leak at service valve. Pressurized with nitrogen, held overnight. Recharged system.",
      "Replaced contactor and capacitor. Unit cycling normally. Customer satisfied.",
      "Thermostat was not communicating with control board. Replaced thermostat wiring. Programmed new schedule.",
      "Found cracked heat exchanger on inspection. Shut down unit and tagged out. Quoted replacement to customer.",
      "Ice machine cleaned and sanitized. Replaced water inlet valve. Production rate back to normal.",
    ]);

    const diagnosisNotes = pick([
      "Electrical failure - capacitor and contactor showing signs of wear",
      "Mechanical wear - fan motor bearings past service life",
      "Refrigerant system - leak at schrader valve, low charge",
      "Controls issue - thermostat communication failure",
      "Airflow restriction - dirty coils and clogged filter",
      "Normal wear and tear - PM completed, no major issues found",
      "Age-related failure - unit approaching end of service life",
      "Installation defect - improper refrigerant charge from previous service",
      null,
    ]);

    const job = await prisma.job.create({
      data: {
        jobNumber: jobNum(year, jobCounter++),
        customerId: customer.id,
        technicianId: tech.id,
        propertyId: prop.id,
        unitId: unit?.id || null,
        title: desc.split(" - ")[0].substring(0, 60),
        description: desc,
        jobType: jobType as any,
        priority: pick(priorities) as any,
        status: "COMPLETED",
        scheduledDate,
        scheduledStart: slot.start,
        scheduledEnd: slot.end,
        actualStart: scheduledDate,
        actualEnd: completedDate,
        estimatedCost: Math.round(estimatedCost * 100) / 100,
        actualCost: Math.round(actualCost * 100) / 100,
        laborHours,
        notes: null,
        techNotes,
        diagnosisNotes,
        partsUsed,
        urgencyScore: randomBetween(1, 10),
        completedAt: completedDate,
      },
    });
    createdJobs.push(job);
  }

  // --- TODAY & TOMORROW JOBS (dispatch board) - 15 jobs ---
  const todayDate = today();
  const tomorrowDate = tomorrow();

  for (let i = 0; i < 15; i++) {
    const isToday = i < 10; // 10 today, 5 tomorrow
    const scheduledDate = isToday ? todayDate : tomorrowDate;
    const propIdx = randomBetween(0, createdProperties.length - 1);
    const prop = createdProperties[propIdx];
    const propUnits = getUnitsForProperty(prop.id);
    const unit = propUnits.length > 0 ? pick(propUnits) : null;
    const tech = techUsers[i % techUsers.length]; // spread across techs
    const customer = customerUsers.find((c) => c.id === prop.customerId)!;
    const jobType = pick(["REPAIR", "MAINTENANCE", "EMERGENCY", "INSPECTION"] as const);
    const descs = jobDescriptions[jobType] || jobDescriptions["REPAIR"];
    const desc = pick(descs);
    const slot = TIME_SLOTS[i % TIME_SLOTS.length];
    const estimatedCost = randomFloat(200, 5000);

    const statusForActive = isToday
      ? pick(["SCHEDULED", "EN_ROUTE", "IN_PROGRESS"] as const)
      : "SCHEDULED";
    const priority = jobType === "EMERGENCY" ? "EMERGENCY" as const : pick(["NORMAL", "HIGH", "URGENT"] as const);

    const job = await prisma.job.create({
      data: {
        jobNumber: jobNum(2026, jobCounter++),
        customerId: customer.id,
        technicianId: tech.id,
        propertyId: prop.id,
        unitId: unit?.id || null,
        title: desc.split(" - ")[0].substring(0, 60),
        description: desc,
        jobType: jobType as any,
        priority: priority as any,
        status: statusForActive as any,
        scheduledDate,
        scheduledStart: slot.start,
        scheduledEnd: slot.end,
        estimatedCost: Math.round(estimatedCost * 100) / 100,
        laborHours: null,
        notes: null,
        techNotes: statusForActive === "IN_PROGRESS" ? "On site, diagnosing issue." : null,
        partsUsed: [],
        urgencyScore: randomBetween(3, 10),
      },
    });
    createdJobs.push(job);
  }

  // --- FUTURE SCHEDULED JOBS - 10 jobs ---
  for (let i = 0; i < 10; i++) {
    const daysOut = randomBetween(2, 30);
    const scheduledDate = dateFuture(daysOut);
    const propIdx = randomBetween(0, createdProperties.length - 1);
    const prop = createdProperties[propIdx];
    const propUnits = getUnitsForProperty(prop.id);
    const unit = propUnits.length > 0 ? pick(propUnits) : null;
    const tech = pick(techUsers);
    const customer = customerUsers.find((c) => c.id === prop.customerId)!;
    const jobType = pick(["MAINTENANCE", "INSPECTION", "ESTIMATE", "INSTALLATION"] as const);
    const descs = jobDescriptions[jobType] || jobDescriptions["MAINTENANCE"];
    const desc = pick(descs);
    const slot = pick(TIME_SLOTS);
    const estimatedCost = randomFloat(300, 15000);

    const job = await prisma.job.create({
      data: {
        jobNumber: jobNum(2026, jobCounter++),
        customerId: customer.id,
        technicianId: tech.id,
        propertyId: prop.id,
        unitId: unit?.id || null,
        title: desc.split(" - ")[0].substring(0, 60),
        description: desc,
        jobType: jobType as any,
        priority: "NORMAL",
        status: "SCHEDULED",
        scheduledDate,
        scheduledStart: slot.start,
        scheduledEnd: slot.end,
        estimatedCost: Math.round(estimatedCost * 100) / 100,
        partsUsed: [],
        urgencyScore: randomBetween(1, 5),
      },
    });
    createdJobs.push(job);
  }

  // --- PENDING JOBS (unscheduled) - 5 jobs ---
  for (let i = 0; i < 5; i++) {
    const propIdx = randomBetween(0, createdProperties.length - 1);
    const prop = createdProperties[propIdx];
    const customer = customerUsers.find((c) => c.id === prop.customerId)!;
    const desc = pick(jobDescriptions["REPAIR"]);

    const job = await prisma.job.create({
      data: {
        jobNumber: jobNum(2026, jobCounter++),
        customerId: customer.id,
        propertyId: prop.id,
        title: desc.split(" - ")[0].substring(0, 60),
        description: desc,
        jobType: "REPAIR",
        priority: pick(["NORMAL", "HIGH"] as const),
        status: "PENDING",
        estimatedCost: randomFloat(200, 3000),
        partsUsed: [],
        urgencyScore: randomBetween(2, 7),
      },
    });
    createdJobs.push(job);
  }

  console.log(`  Jobs: ${createdJobs.length} created (35 completed, 15 today/tomorrow, 10 future, 5 pending)\n`);

  // ============================================================
  // 6. INVOICES
  // ============================================================
  console.log("Seeding invoices...");

  const completedJobs = createdJobs.filter((j) => j.status === "COMPLETED");
  const createdInvoices = [];
  let invoiceCounter = 1;

  for (let i = 0; i < Math.min(32, completedJobs.length); i++) {
    const job = completedJobs[i];
    const laborRate = 125;
    const laborAmount = Math.round((job.laborHours || 2) * laborRate * 100) / 100;
    const partsTotal = randomFloat(50, 2000);
    const miscCharges = pick([0, 0, 0, 25, 35, 50, 75]);

    const lineItems = [
      {
        description: `Labor - ${job.laborHours || 2} hours @ $${laborRate}/hr`,
        qty: 1,
        rate: laborAmount,
        amount: laborAmount,
      },
    ];

    if (job.partsUsed && job.partsUsed.length > 0) {
      for (const part of job.partsUsed) {
        const partCost = randomFloat(25, 800);
        lineItems.push({
          description: part,
          qty: 1,
          rate: partCost,
          amount: partCost,
        });
      }
    } else {
      lineItems.push({
        description: "Service call / diagnostic fee",
        qty: 1,
        rate: 89,
        amount: 89,
      });
    }

    if (miscCharges > 0) {
      lineItems.push({
        description: "Materials / supplies",
        qty: 1,
        rate: miscCharges,
        amount: miscCharges,
      });
    }

    const subtotal = Math.round(lineItems.reduce((sum, li) => sum + li.amount, 0) * 100) / 100;
    const tax = Math.round(subtotal * 0.06 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    const statusOptions = ["PAID", "PAID", "PAID", "SENT", "OVERDUE"] as const;
    const invoiceStatus = pick(statusOptions);
    const createdDate = job.completedAt || dateAgo(30);
    const dueDate = new Date(createdDate);
    dueDate.setDate(dueDate.getDate() + 30);

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${String(invoiceCounter++).padStart(4, "0")}`,
        jobId: job.id,
        customerId: job.customerId,
        subtotal,
        tax,
        total,
        discount: 0,
        status: invoiceStatus,
        dueDate,
        paidAt: invoiceStatus === "PAID" ? dateAgo(randomBetween(1, 60)) : null,
        paymentMethod: invoiceStatus === "PAID" ? pick(["check", "credit_card", "ach", "cash"]) : null,
        lineItems: lineItems as any,
        notes: invoiceStatus === "OVERDUE" ? "Payment reminder sent" : null,
      },
    });
    createdInvoices.push(invoice);
  }
  console.log(`  Invoices: ${createdInvoices.length} created\n`);

  // ============================================================
  // 7. MEMBERSHIPS
  // ============================================================
  console.log("Seeding memberships...");

  const membershipPlans = [
    { plan: "BRONZE" as const, rate: 29, visitsPerYear: 2, discount: 10 },
    { plan: "SILVER" as const, rate: 49, visitsPerYear: 4, discount: 15 },
    { plan: "GOLD" as const, rate: 79, visitsPerYear: 6, discount: 20 },
    { plan: "PLATINUM" as const, rate: 129, visitsPerYear: 12, discount: 25 },
  ];

  const membershipData = [
    { custIdx: 0, planIdx: 2 },
    { custIdx: 1, planIdx: 3 },
    { custIdx: 2, planIdx: 1 },
    { custIdx: 3, planIdx: 3 },
    { custIdx: 4, planIdx: 2 },
    { custIdx: 5, planIdx: 1 },
    { custIdx: 6, planIdx: 0 },
    { custIdx: 7, planIdx: 2 },
    { custIdx: 8, planIdx: 3 },
    { custIdx: 9, planIdx: 0 },
    { custIdx: 0, planIdx: 1 }, // second property membership
    { custIdx: 1, planIdx: 2 },
    { custIdx: 3, planIdx: 2 },
    { custIdx: 5, planIdx: 0 },
    { custIdx: 7, planIdx: 1 },
    { custIdx: 8, planIdx: 2 },
  ];

  const createdMemberships = [];
  for (const m of membershipData) {
    const plan = membershipPlans[m.planIdx];
    const startDate = dateAgo(randomBetween(30, 365));
    const renewalDate = new Date(startDate);
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    const statusOptions = ["ACTIVE", "ACTIVE", "ACTIVE", "ACTIVE", "EXPIRED", "CANCELLED"] as const;

    const membership = await prisma.membership.create({
      data: {
        customerId: customerUsers[m.custIdx].id,
        plan: plan.plan,
        status: pick(statusOptions),
        startDate,
        renewalDate,
        monthlyRate: plan.rate,
        visitsPerYear: plan.visitsPerYear,
        visitsUsed: randomBetween(0, plan.visitsPerYear),
        discount: plan.discount,
        priority: plan.plan !== "BRONZE",
        notes: null,
      },
    });
    createdMemberships.push(membership);
  }
  console.log(`  Memberships: ${createdMemberships.length} created\n`);

  // ============================================================
  // 8. LEADS
  // ============================================================
  console.log("Seeding leads...");

  const leadSources = ["WEBSITE", "PHONE", "REFERRAL", "GOOGLE_ADS", "FACEBOOK", "YELP", "BBB", "WALK_IN", "REPEAT"] as const;
  const leadStatuses = ["NEW", "CONTACTED", "QUALIFIED", "ESTIMATE_SENT", "FOLLOW_UP", "WON", "LOST"] as const;

  const leadsData = [
    { name: "Louisville Marriott Downtown", phone: "(502) 555-0301", service: "Full HVAC system replacement for conference rooms", value: 45000 },
    { name: "Bearno's Pizza - Bardstown", phone: "(502) 555-0302", service: "Walk-in cooler repair and maintenance contract", value: 3500 },
    { name: "Kentucky Science Center", phone: "(502) 555-0303", service: "Annual maintenance agreement - 8 rooftop units", value: 12000 },
    { name: "Fourth Street Live!", phone: "(502) 555-0304", service: "Emergency AC repair for entertainment venue", value: 2800 },
    { name: "Hilton Garden Inn Airport", phone: "(502) 555-0305", service: "Chiller replacement and building automation upgrade", value: 50000 },
    { name: "Norton Healthcare - East", phone: "(502) 555-0306", service: "Server room cooling installation", value: 8500 },
    { name: "Louisville Slugger Museum", phone: "(502) 555-0307", service: "Humidity control system for artifact preservation", value: 22000 },
    { name: "Thorntons Corporate Office", phone: "(502) 555-0308", service: "RTU replacement - 5-ton unit", value: 6800 },
    { name: "Churchill Downs Stable Area", phone: "(502) 555-0309", service: "Ventilation system for new barn", value: 35000 },
    { name: "Texas Roadhouse HQ", phone: "(502) 555-0310", service: "Kitchen exhaust and make-up air system", value: 15000 },
    { name: "UofL Health - Downtown", phone: "(502) 555-0311", service: "Operating room HVAC upgrade", value: 42000 },
    { name: "Jeff Ruby's Steakhouse", phone: "(502) 555-0312", service: "Ice machine replacement and bar refrigeration", value: 4200 },
    { name: "Kindred Healthcare", phone: "(502) 555-0313", service: "Annual maintenance contract - 12 units", value: 18000 },
    { name: "Brown-Forman Corporation", phone: "(502) 555-0314", service: "Warehouse climate control system", value: 38000 },
    { name: "Galt House Hotel", phone: "(502) 555-0315", service: "Ballroom HVAC renovation", value: 28000 },
    { name: "Falls City Brewing", phone: "(502) 555-0316", service: "Glycol chiller system for brewery", value: 25000 },
    { name: "Humana Building - 4th Floor", phone: "(502) 555-0317", service: "Zone controls upgrade", value: 9500 },
    { name: "Papa John's International", phone: "(502) 555-0318", service: "Test kitchen refrigeration overhaul", value: 11000 },
    { name: "Louisville Zoo - Reptile House", phone: "(502) 555-0319", service: "Climate control for reptile exhibits", value: 32000 },
    { name: "Waterfront Botanical Gardens", phone: "(502) 555-0320", service: "Greenhouse HVAC installation", value: 19000 },
    { name: "Baptist Health Floyd", phone: "(502) 555-0321", service: "Pharmacy cold storage unit", value: 5500 },
    { name: "Against the Grain Brewery", phone: "(502) 555-0322", service: "Walk-in cooler expansion", value: 7200 },
    { name: "Muhammad Ali Center", phone: "(502) 555-0323", service: "Museum gallery humidity control", value: 16000 },
    { name: "Frankfort Ave Beer Depot", phone: "(502) 555-0324", service: "Cooler display case repair", value: 1800 },
    { name: "Frazier History Museum", phone: "(502) 555-0325", service: "Archive room climate control", value: 14000 },
    { name: "KFC Yum! Center", phone: "(502) 555-0326", service: "Arena concourse RTU maintenance", value: 24000 },
    { name: "Speed Art Museum", phone: "(502) 555-0327", service: "Gallery environmental monitoring upgrade", value: 20000 },
  ];

  const createdLeads = [];
  for (const l of leadsData) {
    const source = pick(leadSources);
    const status = pick(leadStatuses);
    const daysOld = randomBetween(1, 90);
    const createdAt = dateAgo(daysOld);
    const followUp = status === "FOLLOW_UP" || status === "CONTACTED" ? dateFuture(randomBetween(1, 14)) : null;
    const convertedAt = status === "WON" ? dateAgo(randomBetween(1, daysOld)) : null;

    // Optionally link to existing customer
    const linkedCustomer = Math.random() > 0.7 ? pick(customerUsers) : null;

    const lead = await prisma.lead.create({
      data: {
        customerId: linkedCustomer?.id || null,
        name: l.name,
        email: l.name.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 15) + "@email.com",
        phone: l.phone,
        address: `${randomBetween(100, 9999)} ${pick(["Main St", "Bardstown Rd", "Shelbyville Rd", "Brownsboro Rd", "Dixie Hwy", "Preston Hwy", "Broadway", "River Rd", "Frankfort Ave", "Baxter Ave"])}, Louisville, KY ${pick(LOUISVILLE_ZIPS)}`,
        source,
        status,
        serviceNeeded: l.service,
        description: l.service + ". Customer requested quote.",
        urgency: randomBetween(1, 10),
        estimatedValue: l.value,
        actualValue: status === "WON" ? l.value * randomFloat(0.85, 1.1) : null,
        assignedTo: pick([admin.name, dispatcher1.name, dispatcher2.name]),
        followUpDate: followUp,
        notes: status === "LOST" ? pick(["Went with competitor", "Budget constraints", "Project postponed", "No response after 3 attempts"]) : null,
        convertedAt,
      },
    });
    createdLeads.push(lead);
  }
  console.log(`  Leads: ${createdLeads.length} created\n`);

  // ============================================================
  // 9. REVIEWS
  // ============================================================
  console.log("Seeding reviews...");

  const reviewTexts = [
    { rating: 5, title: "Excellent commercial service", content: "FD Pierce has been maintaining our restaurant HVAC systems for over 5 years. Their technicians are always professional and knowledgeable. They understand the urgency when our kitchen refrigeration goes down." },
    { rating: 5, title: "Fast emergency response", content: "Our walk-in freezer went down on a Friday night during a busy service. FD Pierce had a tech on site within 45 minutes. Saved us thousands in spoiled inventory. Cannot recommend them enough." },
    { rating: 5, title: "Top-notch preventive maintenance", content: "We switched to FD Pierce for our building's HVAC maintenance last year. Their quarterly PM program has significantly reduced our emergency calls and extended the life of our equipment." },
    { rating: 4, title: "Great service, fair pricing", content: "They replaced two rooftop units for our office building. The work was done on time and on budget. Only minor scheduling hiccup at the start, but the end result was excellent." },
    { rating: 5, title: "Best HVAC company in Louisville", content: "As a property manager, I've worked with many HVAC companies. FD Pierce is head and shoulders above the rest. Their dispatchers are responsive, their techs are skilled, and their pricing is transparent." },
    { rating: 4, title: "Reliable and honest", content: "Had them inspect a used rooftop unit we were considering purchasing. Their tech gave us an honest assessment that saved us from buying a lemon. We hired them for the replacement install instead." },
    { rating: 5, title: "Saved our medical equipment", content: "When our server room AC failed, our medical imaging equipment was at risk. FD Pierce diagnosed and fixed the issue same day. Their tech even stayed late to make sure temps were stable. Exceptional service." },
    { rating: 5, title: "Commercial refrigeration experts", content: "Our walk-in cooler and ice machines are critical for our restaurant. FD Pierce keeps everything running perfectly. Their techs know commercial refrigeration inside and out." },
    { rating: 4, title: "Professional team", content: "Replaced our aging furnace system. The crew was professional, cleaned up after themselves, and the new system works great. Would have given 5 stars but the project took one day longer than quoted." },
    { rating: 5, title: "Outstanding maintenance program", content: "The Gold membership plan has paid for itself multiple times over. Priority scheduling, discounted parts, and the quarterly check-ups catch small issues before they become expensive problems." },
    { rating: 5, title: "Trustworthy and competent", content: "We manage several commercial properties in Louisville and use FD Pierce exclusively. They handle everything from rooftop units to kitchen exhaust systems. Always reliable." },
    { rating: 4, title: "Good work on school HVAC", content: "FD Pierce maintains the HVAC systems at our school. They work around our schedule and are always mindful of student safety. Solid, dependable service." },
    { rating: 5, title: "Emergency call - above and beyond", content: "Pipe burst near our furnace on the coldest night of the year. FD Pierce tech was at our warehouse by 11 PM. Had temporary heat running within an hour. True professionals." },
    { rating: 5, title: "Warehouse climate control done right", content: "FD Pierce designed and installed the climate control system for our temperature-sensitive warehouse. The system has been flawless for two years. Their engineering team really knows their stuff." },
    { rating: 4, title: "Responsive and knowledgeable", content: "Called about a strange noise from our rooftop unit. Tech came out next day, identified a failing bearing, and had the repair done by afternoon. Fair price for quality work." },
    { rating: 5, title: "Long-time customer, always satisfied", content: "We've been with FD Pierce for over 10 years. They've replaced multiple systems, maintained dozens of units, and handled every emergency we've had. Wouldn't trust our HVAC to anyone else." },
    { rating: 5, title: "Ice machine specialists", content: "Our Hoshizaki ice machine was producing less ice than normal. FD Pierce tech diagnosed a water valve issue, had the part on the truck, and fixed it in under an hour. These guys know ice machines." },
  ];

  const createdReviews = [];
  for (let i = 0; i < reviewTexts.length; i++) {
    const r = reviewTexts[i];
    const review = await prisma.review.create({
      data: {
        customerId: customerUsers[i % customerUsers.length].id,
        rating: r.rating,
        title: r.title,
        content: r.content,
        source: pick(["google", "google", "google", "yelp", "website", "bbb"]),
        isPublished: true,
        response: Math.random() > 0.4
          ? "Thank you for your kind words! We appreciate your business and look forward to continuing to serve you."
          : null,
        createdAt: dateAgo(randomBetween(5, 365)),
      },
    });
    createdReviews.push(review);
  }
  console.log(`  Reviews: ${createdReviews.length} created\n`);

  // ============================================================
  // 10. DAILY METRICS (90 days)
  // ============================================================
  console.log("Seeding daily metrics (90 days)...");

  const metricsData = [];
  for (let i = 0; i < 90; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    d.setHours(0, 0, 0, 0);

    const dayOfWeek = d.getDay(); // 0 = Sunday
    const month = d.getMonth(); // 0 = Jan
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Seasonal multiplier: busier in summer (Jun-Aug) and winter (Dec-Feb)
    let seasonalMultiplier = 1.0;
    if (month >= 5 && month <= 7) seasonalMultiplier = 1.4; // Summer
    else if (month === 11 || month === 0 || month === 1) seasonalMultiplier = 1.25; // Winter
    else if (month >= 2 && month <= 4) seasonalMultiplier = 0.85; // Spring (slower)
    else seasonalMultiplier = 1.1; // Fall

    const baseRevenue = isWeekend ? randomFloat(3000, 8000) : randomFloat(8000, 25000);
    const revenue = Math.round(baseRevenue * seasonalMultiplier);
    const jobsCompleted = isWeekend ? randomBetween(2, 6) : randomBetween(8, 20);
    const jobsScheduled = jobsCompleted + randomBetween(0, 5);
    const leadsReceived = randomBetween(2, 8);
    const leadsConverted = Math.min(leadsReceived, randomBetween(0, 4));
    const avgTicket = revenue / Math.max(jobsCompleted, 1);
    const techUtilization = isWeekend ? randomFloat(20, 50) : randomFloat(65, 95);
    const serviceRevenue = revenue * randomFloat(0.6, 0.8);
    const installRevenue = revenue - serviceRevenue;

    metricsData.push({
      date: new Date(d),
      revenue,
      jobsCompleted,
      jobsScheduled,
      leadsReceived,
      leadsConverted,
      missedCalls: randomBetween(0, 4),
      avgTicket: Math.round(avgTicket * 100) / 100,
      techUtilization: Math.round(techUtilization * 10) / 10,
      membershipSales: randomBetween(0, 2),
      installRevenue: Math.round(installRevenue),
      serviceRevenue: Math.round(serviceRevenue),
    });
  }

  await prisma.dailyMetric.createMany({ data: metricsData });
  console.log(`  Daily metrics: ${metricsData.length} days created\n`);

  // ============================================================
  // 11. INSTALL PROJECTS
  // ============================================================
  console.log("Seeding install projects...");

  const installProjects = [
    {
      projectNumber: "INST-2025-001",
      customerName: "The Brown Hotel",
      customerPhone: "(502) 555-0202",
      customerEmail: "linda@brownhotel.com",
      propertyAddress: "335 W Broadway, Louisville, KY 40202",
      equipmentOrdered: "Trane YCD360F3 - 30 Ton Rooftop Unit with Economizer",
      equipmentStatus: "delivered",
      permitNumber: "MEP-2025-4421",
      permitStatus: "approved",
      scheduledDate: dateAgo(10),
      estimatedDays: 3,
      totalCost: 68000,
      depositPaid: 34000,
      balanceDue: 34000,
      status: "COMPLETE" as const,
      notes: "Crane rental coordinated for rooftop placement. Old unit recycled.",
      timeline: [
        { date: "2025-10-01", event: "Contract signed", status: "complete" },
        { date: "2025-10-15", event: "Equipment ordered", status: "complete" },
        { date: "2025-11-20", event: "Equipment delivered", status: "complete" },
        { date: "2025-12-01", event: "Permit approved", status: "complete" },
        { date: "2025-12-10", event: "Installation complete", status: "complete" },
        { date: "2025-12-12", event: "Inspection passed", status: "complete" },
      ],
    },
    {
      projectNumber: "INST-2025-002",
      customerName: "Hawkins Logistics",
      customerPhone: "(502) 555-0206",
      customerEmail: "greg@hawkinslogistics.com",
      propertyAddress: "4400 Robards Ln, Louisville, KY 40218",
      equipmentOrdered: "Carrier 50XCA12A3B - 40 Ton RTU x2",
      equipmentStatus: "delivered",
      permitNumber: "MEP-2025-4567",
      permitStatus: "approved",
      scheduledDate: dateAgo(5),
      estimatedDays: 5,
      totalCost: 85000,
      depositPaid: 42500,
      balanceDue: 42500,
      status: "IN_PROGRESS" as const,
      notes: "Phase 1 of warehouse HVAC upgrade. Ductwork modifications required.",
      timeline: [
        { date: "2025-09-15", event: "Contract signed", status: "complete" },
        { date: "2025-10-01", event: "Equipment ordered", status: "complete" },
        { date: "2025-11-15", event: "Equipment delivered", status: "complete" },
        { date: "2025-12-01", event: "Permit approved", status: "complete" },
        { date: "2025-12-15", event: "Installation started", status: "in_progress" },
      ],
    },
    {
      projectNumber: "INST-2026-001",
      customerName: "Coleman Office Plaza",
      customerPhone: "(502) 555-0209",
      customerEmail: "janet@colemanplaza.com",
      propertyAddress: "600 W Main St, Tower A, Louisville, KY 40202",
      equipmentOrdered: "Daikin DPS240D - 20 Ton Rooftop Unit",
      equipmentStatus: "in_transit",
      permitNumber: "MEP-2026-0102",
      permitStatus: "approved",
      scheduledDate: dateFuture(14),
      estimatedDays: 2,
      totalCost: 42000,
      depositPaid: 21000,
      balanceDue: 21000,
      status: "SCHEDULED" as const,
      notes: "Weekend installation to minimize tenant disruption.",
      timeline: [
        { date: "2026-01-10", event: "Contract signed", status: "complete" },
        { date: "2026-01-20", event: "Equipment ordered", status: "complete" },
        { date: "2026-02-10", event: "Permit approved", status: "complete" },
        { date: "2026-02-28", event: "Equipment delivery ETA", status: "pending" },
        { date: "2026-03-07", event: "Installation scheduled", status: "pending" },
      ],
    },
    {
      projectNumber: "INST-2026-002",
      customerName: "Bluegrass Medical Center",
      customerPhone: "(502) 555-0204",
      customerEmail: "rachel@bluegrassmed.com",
      propertyAddress: "1780 Bardstown Rd, Louisville, KY 40205",
      equipmentOrdered: "York ZR120C00D4B - 10 Ton RTU + BACnet Controls",
      equipmentStatus: "ordered",
      permitNumber: null,
      permitStatus: "submitted",
      scheduledDate: dateFuture(30),
      estimatedDays: 3,
      totalCost: 38000,
      depositPaid: 19000,
      balanceDue: 19000,
      status: "PERMIT_PENDING" as const,
      notes: "Medical facility - installation must maintain backup cooling at all times.",
      timeline: [
        { date: "2026-02-01", event: "Contract signed", status: "complete" },
        { date: "2026-02-05", event: "Equipment ordered", status: "complete" },
        { date: "2026-02-10", event: "Permit submitted", status: "in_progress" },
      ],
    },
    {
      projectNumber: "INST-2026-003",
      customerName: "Sullivan's Steakhouse",
      customerPhone: "(502) 555-0201",
      customerEmail: "mark@sullivanssteakhouse.com",
      propertyAddress: "101 W Market St, Louisville, KY 40202",
      equipmentOrdered: "Hoshizaki KM-1601SRJ3 Ice Machine + True TWT-48SD Walk-in",
      equipmentStatus: "pending",
      permitNumber: null,
      permitStatus: "not_submitted",
      scheduledDate: null,
      estimatedDays: 2,
      totalCost: 18000,
      depositPaid: 5000,
      balanceDue: 13000,
      status: "EQUIPMENT_ORDERED" as const,
      notes: "Replacing aging ice machine and walk-in cooler in kitchen wing.",
      timeline: [
        { date: "2026-02-15", event: "Contract signed", status: "complete" },
        { date: "2026-02-18", event: "Equipment ordered", status: "in_progress" },
      ],
    },
    {
      projectNumber: "INST-2026-004",
      customerName: "St. Xavier High School",
      customerPhone: "(502) 555-0205",
      customerEmail: "karen@stxaviers.edu",
      propertyAddress: "1609 Poplar Level Rd, Louisville, KY 40217",
      equipmentOrdered: "Lennox LGH120H4 - 10 Ton RTU (replace aging unit)",
      equipmentStatus: "pending",
      permitNumber: null,
      permitStatus: "not_submitted",
      scheduledDate: null,
      estimatedDays: 2,
      totalCost: 28000,
      depositPaid: 0,
      balanceDue: 28000,
      status: "PLANNING" as const,
      notes: "Summer break installation preferred. Coordinating with school administration.",
      timeline: [
        { date: "2026-02-12", event: "Site survey completed", status: "complete" },
        { date: "2026-02-20", event: "Proposal sent", status: "complete" },
      ],
    },
    {
      projectNumber: "INST-2026-005",
      customerName: "Yates Automotive Center",
      customerPhone: "(502) 555-0210",
      customerEmail: "robert@yatesauto.com",
      propertyAddress: "3100 Bardstown Rd, Louisville, KY 40205",
      equipmentOrdered: "Carrier 48TC-D08 - 7.5 Ton RTU + MUA System",
      equipmentStatus: "pending",
      permitNumber: null,
      permitStatus: "not_submitted",
      scheduledDate: null,
      estimatedDays: 3,
      totalCost: 32000,
      depositPaid: 0,
      balanceDue: 32000,
      status: "PLANNING" as const,
      notes: "Service bay ventilation upgrade. Need to maintain operations during install.",
      timeline: [
        { date: "2026-02-18", event: "Initial consultation", status: "complete" },
      ],
    },
    {
      projectNumber: "INST-2025-003",
      customerName: "La Fiesta Mexican Grill",
      customerPhone: "(502) 555-0207",
      customerEmail: "maria@lafiestaky.com",
      propertyAddress: "2235 Bardstown Rd, Louisville, KY 40204",
      equipmentOrdered: "Manitowoc IYT1200A Ice Machine + Turbo Air Walk-in Expansion",
      equipmentStatus: "delivered",
      permitNumber: "MEP-2025-4890",
      permitStatus: "approved",
      scheduledDate: dateAgo(45),
      estimatedDays: 2,
      totalCost: 15000,
      depositPaid: 15000,
      balanceDue: 0,
      status: "COMPLETE" as const,
      notes: "Kitchen expansion project. Ice machine and walk-in cooler upgrade.",
      timeline: [
        { date: "2025-09-01", event: "Contract signed", status: "complete" },
        { date: "2025-09-10", event: "Equipment ordered", status: "complete" },
        { date: "2025-10-15", event: "Equipment delivered", status: "complete" },
        { date: "2025-10-20", event: "Permit approved", status: "complete" },
        { date: "2025-11-01", event: "Installation complete", status: "complete" },
        { date: "2025-11-03", event: "Inspection passed", status: "complete" },
      ],
    },
  ];

  for (const proj of installProjects) {
    await prisma.installProject.create({ data: proj as any });
  }
  console.log(`  Install projects: ${installProjects.length} created\n`);

  // ============================================================
  // 12. SERVICE REQUESTS
  // ============================================================
  console.log("Seeding service requests...");

  const serviceRequests = [
    { name: "Mike Patterson", email: "mike.patterson@gmail.com", phone: "(502) 555-0401", address: "450 S 4th St, Louisville, KY 40202", serviceType: "repair", urgency: "emergency", description: "Walk-in cooler temperature alarm going off. Temp reading 52F, should be 36F. Restaurant opens at 11am.", preferredDate: null, preferredTime: null },
    { name: "Diana Ross", email: "diana.ross@outlook.com", phone: "(502) 555-0402", address: "8100 Shelbyville Rd, Louisville, KY 40222", serviceType: "maintenance", urgency: "normal", description: "Need to schedule quarterly PM for our 3 rooftop units. Last service was 4 months ago.", preferredDate: "2026-03-01", preferredTime: "morning" },
    { name: "Carlos Rivera", email: "carlos@rivierarestaurant.com", phone: "(502) 555-0403", address: "1450 Bardstown Rd, Louisville, KY 40204", serviceType: "repair", urgency: "high", description: "Ice machine stopped making ice yesterday. Water seems to flow but no ice production. Hoshizaki KM-1000.", preferredDate: null, preferredTime: "anytime" },
    { name: "Lisa Wong", email: "lwong@wongenterprises.com", phone: "(502) 555-0404", address: "200 W Broadway, Suite 500, Louisville, KY 40202", serviceType: "estimate", urgency: "normal", description: "Looking for quotes on replacing our 20-year-old split system. Office is approximately 4,000 sq ft.", preferredDate: "2026-03-05", preferredTime: "afternoon" },
    { name: "James O'Brien", email: "jobrien@obrienhotel.com", phone: "(502) 555-0405", address: "700 W Main St, Louisville, KY 40202", serviceType: "repair", urgency: "high", description: "Multiple guest rooms reporting no heat. Boiler seems to be cycling on and off. 80-room hotel.", preferredDate: null, preferredTime: null },
    { name: "Nancy Taylor", email: "ntaylor@taylorschool.org", phone: "(502) 555-0406", address: "3500 Goldsmith Ln, Louisville, KY 40220", serviceType: "maintenance", urgency: "low", description: "Want to schedule summer HVAC maintenance for our school building. 6 units total. Needs to be done during break.", preferredDate: "2026-06-15", preferredTime: "morning" },
    { name: "Ahmed Hassan", email: "ahmed@hassanfoods.com", phone: "(502) 555-0407", address: "5600 National Turnpike, Louisville, KY 40214", serviceType: "installation", urgency: "normal", description: "New restaurant opening. Need walk-in cooler, walk-in freezer, and ice machine installed. Space is ready.", preferredDate: "2026-04-01", preferredTime: "anytime" },
    { name: "Betty Crawford", email: "bcrawford@crawfordlaw.com", phone: "(502) 555-0408", address: "400 W Market St, Suite 3200, Louisville, KY 40202", serviceType: "repair", urgency: "normal", description: "Thermostat not responding to changes. Set to 70 but office feels like 80+. Daikin system installed 2019.", preferredDate: "2026-02-23", preferredTime: "morning" },
    { name: "Robert Kim", email: "rkim@kimpharmacy.com", phone: "(502) 555-0409", address: "2800 Brownsboro Rd, Louisville, KY 40206", serviceType: "repair", urgency: "emergency", description: "Pharmacy refrigeration unit alarm. Medications at risk. Need immediate service.", preferredDate: null, preferredTime: null },
    { name: "Stephanie Green", email: "sgreen@greensproperties.com", phone: "(502) 555-0410", address: "1200 Story Ave, Louisville, KY 40206", serviceType: "estimate", urgency: "low", description: "Managing 3 commercial properties, interested in annual maintenance contracts. Want to discuss options and pricing.", preferredDate: "2026-03-10", preferredTime: "afternoon" },
  ];

  for (let i = 0; i < serviceRequests.length; i++) {
    const sr = serviceRequests[i];
    await prisma.serviceRequest.create({
      data: {
        ...sr,
        status: i < 3 ? "new" : i < 6 ? "contacted" : "new",
        createdAt: dateAgo(randomBetween(0, 7)),
      },
    });
  }
  console.log(`  Service requests: ${serviceRequests.length} created\n`);

  // ============================================================
  // 13. NOTIFICATIONS
  // ============================================================
  console.log("Seeding notifications...");

  const allStaff = [admin, dispatcher1, dispatcher2, ...techUsers];
  const notificationTemplates = [
    { type: "job_update", title: "Job Completed", message: "Job FDP-2026-036 has been marked as completed by James Carter.", link: "/jobs/FDP-2026-036" },
    { type: "job_update", title: "New Job Assigned", message: "You have been assigned to Job FDP-2026-042 at Sullivan's Steakhouse.", link: "/jobs/FDP-2026-042" },
    { type: "job_update", title: "Job Status Changed", message: "Job FDP-2026-038 status changed to IN_PROGRESS.", link: "/jobs/FDP-2026-038" },
    { type: "payment", title: "Payment Received", message: "Payment of $2,450.00 received for Invoice INV-0012 from The Brown Hotel.", link: "/invoices/INV-0012" },
    { type: "payment", title: "Invoice Overdue", message: "Invoice INV-0018 for Hawkins Logistics is 15 days overdue. Amount: $3,200.00.", link: "/invoices/INV-0018" },
    { type: "payment", title: "Payment Received", message: "Payment of $890.00 received for Invoice INV-0005 from Whitfield & Associates.", link: "/invoices/INV-0005" },
    { type: "reminder", title: "Maintenance Due", message: "Quarterly PM due for The Brown Hotel - Conference Center. Last service: 3 months ago.", link: "/properties" },
    { type: "reminder", title: "Filter Change Reminder", message: "Filters due for replacement at Coleman Office Plaza - Tower A. 90-day cycle.", link: "/properties" },
    { type: "reminder", title: "Warranty Expiring", message: "Warranty for Carrier 50XCA06A2A5 at Hawkins Warehouse expires in 30 days.", link: "/units" },
    { type: "alert", title: "Emergency Service Request", message: "New emergency service request from Robert Kim - Pharmacy refrigeration failure.", link: "/service-requests" },
    { type: "alert", title: "Temperature Alert", message: "Walk-in cooler at Sullivan's Kitchen reporting high temp alarm - 48F.", link: "/properties" },
    { type: "alert", title: "Technician GPS Alert", message: "Tyler Jackson's truck GPS signal lost for 30+ minutes.", link: "/dispatch" },
    { type: "job_update", title: "Parts Ordered", message: "Parts for Job FDP-2026-040 have been ordered. Estimated delivery: 2 business days.", link: "/jobs/FDP-2026-040" },
    { type: "reminder", title: "Lead Follow-up Due", message: "Follow-up due today for Louisville Marriott Downtown lead. Estimated value: $45,000.", link: "/leads" },
    { type: "payment", title: "Membership Payment", message: "Monthly membership payment of $79.00 processed for Bluegrass Medical Center.", link: "/memberships" },
    { type: "alert", title: "New Review", message: "New 5-star Google review from Mark Sullivan: 'Excellent commercial service'.", link: "/reviews" },
    { type: "job_update", title: "Job Rescheduled", message: "Job FDP-2026-044 rescheduled from Feb 22 to Feb 25 per customer request.", link: "/jobs/FDP-2026-044" },
    { type: "reminder", title: "Certification Expiring", message: "Nathan Harris's NATE certification expires in 45 days. Schedule renewal.", link: "/team" },
    { type: "alert", title: "Dispatch Board Update", message: "3 unassigned jobs for tomorrow. Please review the dispatch board.", link: "/dispatch" },
    { type: "payment", title: "Large Invoice Sent", message: "Invoice INV-0028 for $12,500.00 sent to Hawkins Logistics for warehouse RTU install.", link: "/invoices/INV-0028" },
    { type: "job_update", title: "Callback Requested", message: "Customer callback requested for Job FDP-2026-035. Original issue may be recurring.", link: "/jobs/FDP-2026-035" },
    { type: "reminder", title: "Weekly Report Ready", message: "Weekly performance report is ready for review. Revenue up 12% vs last week.", link: "/analytics" },
  ];

  for (let i = 0; i < notificationTemplates.length; i++) {
    const n = notificationTemplates[i];
    await prisma.notification.create({
      data: {
        userId: pick(allStaff).id,
        title: n.title,
        message: n.message,
        type: n.type,
        isRead: Math.random() > 0.4,
        link: n.link,
        createdAt: dateAgo(randomBetween(0, 14)),
      },
    });
  }
  console.log(`  Notifications: ${notificationTemplates.length} created\n`);

  // ============================================================
  // 14. MESSAGES
  // ============================================================
  console.log("Seeding messages...");

  const dispatchers = [dispatcher1, dispatcher2];
  const messageTemplates = [
    { content: "Hey, can you swing by Sullivan's after your current job? They called about the walk-in cooler again.", isRead: true },
    { content: "On my way there now. Should be done at this location in about 30 minutes.", isRead: true },
    { content: "Parts for the Brown Hotel compressor just came in. Can you pick them up from the shop?", isRead: true },
    { content: "Got the parts. Heading to the Brown Hotel now. ETA 20 minutes.", isRead: true },
    { content: "The customer at Coleman Plaza wants to know if we can come earlier tomorrow. Their server room is getting warm.", isRead: false },
    { content: "I can be there first thing at 7:30 AM. Tell them I'll call when I'm on my way.", isRead: true },
    { content: "Emergency call from Kim Pharmacy - refrigeration unit down. Can you redirect the closest available tech?", isRead: true },
    { content: "I'm only 10 minutes away. Finishing up filter changes at Whitfield. I can head there next.", isRead: true },
    { content: "Just finished at La Fiesta. Ice machine is back up and running. Heading to the next job on my board.", isRead: true },
    { content: "Great work. Your next job is at St. Xavier - routine maintenance on the gym RTU. No rush, scheduled for this afternoon.", isRead: false },
    { content: "Need a second opinion on this heat exchanger at Yates Auto. Can someone come take a look?", isRead: true },
    { content: "I'll send Patrick over. He's got the most experience with those Goodman units. He should be free after lunch.", isRead: true },
    { content: "Truck T-07 needs an oil change. Check engine light came on this morning. Can I stop by the shop?", isRead: true },
    { content: "Yes, bring it in before 4 PM. We have a loaner truck available if the service takes longer.", isRead: false },
    { content: "Reminder: safety meeting tomorrow at 7 AM at the shop. Mandatory for all techs.", isRead: false },
    { content: "Customer at the Convention Center is very happy with the install. They want to discuss a maintenance contract.", isRead: true },
    { content: "That's great news! I'll have Sarah reach out to them about our membership plans.", isRead: true },
  ];

  for (let i = 0; i < messageTemplates.length; i++) {
    const m = messageTemplates[i];
    // Alternate between dispatcher->tech and tech->dispatcher
    const isDispatcherSending = i % 2 === 0;
    const sender = isDispatcherSending ? pick(dispatchers) : techUsers[i % techUsers.length];
    const receiver = isDispatcherSending ? techUsers[i % techUsers.length] : pick(dispatchers);

    await prisma.message.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        content: m.content,
        isRead: m.isRead,
        createdAt: dateAgo(randomBetween(0, 7)),
      },
    });
  }
  console.log(`  Messages: ${messageTemplates.length} created\n`);

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log("========================================");
  console.log("  Seed Complete!");
  console.log("========================================");
  console.log(`  Users:            ${3 + techUsers.length + customerUsers.length}`);
  console.log(`  Tech Profiles:    ${techProfiles.length}`);
  console.log(`  Properties:       ${createdProperties.length}`);
  console.log(`  Units:            ${createdUnits.length}`);
  console.log(`  Jobs:             ${createdJobs.length}`);
  console.log(`  Invoices:         ${createdInvoices.length}`);
  console.log(`  Memberships:      ${createdMemberships.length}`);
  console.log(`  Leads:            ${createdLeads.length}`);
  console.log(`  Reviews:          ${createdReviews.length}`);
  console.log(`  Daily Metrics:    ${metricsData.length}`);
  console.log(`  Install Projects: ${installProjects.length}`);
  console.log(`  Service Requests: ${serviceRequests.length}`);
  console.log(`  Notifications:    ${notificationTemplates.length}`);
  console.log(`  Messages:         ${messageTemplates.length}`);
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
