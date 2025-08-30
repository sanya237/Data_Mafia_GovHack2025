export type Dataset = {
  id: string;
  title: string;
  source: 'ABS' | 'ACARA' | 'GTFS';
  absLink?: string;
  lastUpdatedText: string;
  tags: string[];
  geographyLevels: string[];
  previewRows: Record<string, string | number | boolean>[];
  sampleChart: {
    type: 'bar' | 'line' | 'pie';
    xKey: string;
    yKey: string;
    data: any[];
  };
  codeSnippets: {
    python?: string;
    javascript?: string;
    sql?: string;
  };
  joinKeys: string[];
  howToJoin: string;
};

export const datasetRegistry: Dataset[] = [
  {
    id: 'seifa-2021',
    title: 'Socio-Economic Indexes for Areas (SEIFA), Australia, 2021',
    source: 'ABS',
    absLink: 'https://www.abs.gov.au/statistics/people/people-and-communities/socio-economic-indexes-areas-seifa-australia/latest-release',
    lastUpdatedText: 'March 2023',
    tags: ['demographics', 'sa2', 'socioeconomic', 'advantage', 'disadvantage'],
    geographyLevels: ['SA1', 'SA2', 'SA3', 'SA4', 'LGA', 'STATE'],
    previewRows: [
      { SA2_CODE_2021: '206011148', SA2_NAME: 'Brunswick East', IRSAD_SCORE: 1089, IRSAD_DECILE: 9, STATE: 'VIC' },
      { SA2_CODE_2021: '206011149', SA2_NAME: 'Brunswick West', IRSAD_SCORE: 1045, IRSAD_DECILE: 8, STATE: 'VIC' },
      { SA2_CODE_2021: '206011150', SA2_NAME: 'Coburg', IRSAD_SCORE: 987, IRSAD_DECILE: 6, STATE: 'VIC' },
      { SA2_CODE_2021: '206011151', SA2_NAME: 'Coburg North', IRSAD_SCORE: 954, IRSAD_DECILE: 5, STATE: 'VIC' },
      { SA2_CODE_2021: '206011152', SA2_NAME: 'Pascoe Vale', IRSAD_SCORE: 1012, IRSAD_DECILE: 7, STATE: 'VIC' },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'SA2_NAME',
      yKey: 'IRSAD_DECILE',
      data: [
        { SA2_NAME: 'Brunswick East', IRSAD_DECILE: 9 },
        { SA2_NAME: 'Brunswick West', IRSAD_DECILE: 8 },
        { SA2_NAME: 'Coburg', IRSAD_DECILE: 6 },
        { SA2_NAME: 'Coburg North', IRSAD_DECILE: 5 },
        { SA2_NAME: 'Pascoe Vale', IRSAD_DECILE: 7 },
      ]
    },
    codeSnippets: {
      python: `import requests
import pandas as pd

# Download SEIFA data
response = requests.get('https://www.abs.gov.au/statistics/people/people-and-communities/socio-economic-indexes-areas-seifa-australia/latest-release')
seifa_df = pd.read_csv('seifa_2021_sa2.csv')

# Join with your data by SA2_CODE_2021
merged = your_df.merge(seifa_df, on='SA2_CODE_2021', how='left')`,
      javascript: `// Fetch SEIFA data
const response = await fetch('/api/seifa-2021');
const seifahData = await response.json();

// Merge with your data by SA2_CODE_2021
const merged = yourData.map(row => ({
  ...row,
  ...seifahData.find(s => s.SA2_CODE_2021 === row.SA2_CODE_2021)
}));`,
      sql: `-- Join SEIFA with your data
SELECT 
  y.*,
  s.IRSAD_SCORE,
  s.IRSAD_DECILE
FROM your_table y
LEFT JOIN seifa_2021 s ON y.SA2_CODE_2021 = s.SA2_CODE_2021`
    },
    joinKeys: ['SA2_CODE_2021'],
    howToJoin: 'Join to SEIFA by SA2_CODE_2021 to overlay socio-economic advantage/disadvantage scores'
  },
  {
    id: 'census-2021',
    title: 'Census 2021 - QuickStats / Demographics',
    source: 'ABS',
    absLink: 'https://www.abs.gov.au/census/find-census-data',
    lastUpdatedText: 'June 2022',
    tags: ['demographics', 'sa2', 'population', 'age', 'income', 'households', 'language'],
    geographyLevels: ['SA1', 'SA2', 'SA3', 'LGA', 'STATE'],
    previewRows: [
      { SA2_CODE_2021: '206011148', SA2_NAME: 'Brunswick East', TOTAL_POP: 15234, MEDIAN_AGE: 32, MEDIAN_INCOME: 65000, PCT_HOUSEHOLDS_WITH_CHILDREN: 28.5, TOP_LANGUAGE_1: 'English', TOP_LANGUAGE_2: 'Arabic', TOP_LANGUAGE_3: 'Italian' },
      { SA2_CODE_2021: '206011149', SA2_NAME: 'Brunswick West', TOTAL_POP: 12876, MEDIAN_AGE: 29, MEDIAN_INCOME: 58000, PCT_HOUSEHOLDS_WITH_CHILDREN: 32.1, TOP_LANGUAGE_1: 'English', TOP_LANGUAGE_2: 'Vietnamese', TOP_LANGUAGE_3: 'Greek' },
      { SA2_CODE_2021: '206011150', SA2_NAME: 'Coburg', TOTAL_POP: 18543, MEDIAN_AGE: 35, MEDIAN_INCOME: 52000, PCT_HOUSEHOLDS_WITH_CHILDREN: 38.7, TOP_LANGUAGE_1: 'English', TOP_LANGUAGE_2: 'Arabic', TOP_LANGUAGE_3: 'Turkish' },
      { SA2_CODE_2021: '206011151', SA2_NAME: 'Coburg North', TOTAL_POP: 9876, MEDIAN_AGE: 38, MEDIAN_INCOME: 48000, PCT_HOUSEHOLDS_WITH_CHILDREN: 41.2, TOP_LANGUAGE_1: 'English', TOP_LANGUAGE_2: 'Italian', TOP_LANGUAGE_3: 'Greek' },
      { SA2_CODE_2021: '206011152', SA2_NAME: 'Pascoe Vale', TOTAL_POP: 14321, MEDIAN_AGE: 33, MEDIAN_INCOME: 55000, PCT_HOUSEHOLDS_WITH_CHILDREN: 35.8, TOP_LANGUAGE_1: 'English', TOP_LANGUAGE_2: 'Arabic', TOP_LANGUAGE_3: 'Assyrian' },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'SA2_NAME',
      yKey: 'MEDIAN_AGE',
      data: [
        { SA2_NAME: 'Brunswick East', MEDIAN_AGE: 32 },
        { SA2_NAME: 'Brunswick West', MEDIAN_AGE: 29 },
        { SA2_NAME: 'Coburg', MEDIAN_AGE: 35 },
        { SA2_NAME: 'Coburg North', MEDIAN_AGE: 38 },
        { SA2_NAME: 'Pascoe Vale', MEDIAN_AGE: 33 },
      ]
    },
    codeSnippets: {
      python: `import requests
import pandas as pd

# Download Census data
census_df = pd.read_csv('census_2021_quickstats.csv')

# Join with SEIFA for combined demographics + socioeconomic
merged = census_df.merge(seifa_df, on='SA2_CODE_2021', how='left')`,
      javascript: `// Fetch Census QuickStats
const census = await fetch('/api/census-2021').then(r => r.json());

// Combine with SEIFA data
const enriched = census.map(row => ({
  ...row,
  socioeconomic: seifahData.find(s => s.SA2_CODE_2021 === row.SA2_CODE_2021)
}));`,
      sql: `-- Comprehensive demographics + socioeconomic view
SELECT 
  c.*,
  s.IRSAD_DECILE
FROM census_2021 c
LEFT JOIN seifa_2021 s ON c.SA2_CODE_2021 = s.SA2_CODE_2021
WHERE c.SA2_CODE_2021 IN ('206011148', '206011149')`
    },
    joinKeys: ['SA2_CODE_2021'],
    howToJoin: 'Join Census to SEIFA via SA2_CODE_2021 for demographics overlay with socio-economic context'
  },
  {
    id: 'cabee-2024',
    title: 'Counts of Australian Businesses, including Entries and Exits (CABEE)',
    source: 'ABS',
    absLink: 'https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release',
    lastUpdatedText: 'September 2024',
    tags: ['business', 'competition', 'sa2', 'anzsic', 'industry'],
    geographyLevels: ['SA2', 'SA3', 'SA4', 'LGA', 'STATE'],
    previewRows: [
      { SA2_CODE_2021: '206011148', ANZSIC_CODE: 'S9429', ANZSIC_DESC: 'Other Electronic Equipment Repair and Maintenance Services', ACTIVE_BUSINESSES: 12, ENTRIES_FY24: 3, EXITS_FY24: 1 },
      { SA2_CODE_2021: '206011148', ANZSIC_CODE: 'G4213', ANZSIC_DESC: 'Telecommunication Equipment Retailing', ACTIVE_BUSINESSES: 8, ENTRIES_FY24: 2, EXITS_FY24: 0 },
      { SA2_CODE_2021: '206011149', ANZSIC_CODE: 'S9429', ANZSIC_DESC: 'Other Electronic Equipment Repair and Maintenance Services', ACTIVE_BUSINESSES: 15, ENTRIES_FY24: 4, EXITS_FY24: 2 },
      { SA2_CODE_2021: '206011150', ANZSIC_CODE: 'S9429', ANZSIC_DESC: 'Other Electronic Equipment Repair and Maintenance Services', ACTIVE_BUSINESSES: 23, ENTRIES_FY24: 5, EXITS_FY24: 3 },
      { SA2_CODE_2021: '206011150', ANZSIC_CODE: 'G4213', ANZSIC_DESC: 'Telecommunication Equipment Retailing', ACTIVE_BUSINESSES: 18, ENTRIES_FY24: 6, EXITS_FY24: 1 },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'SA2_NAME',
      yKey: 'ACTIVE_BUSINESSES',
      data: [
        { SA2_NAME: 'Brunswick East', ACTIVE_BUSINESSES: 20 },
        { SA2_NAME: 'Brunswick West', ACTIVE_BUSINESSES: 15 },
        { SA2_NAME: 'Coburg', ACTIVE_BUSINESSES: 41 },
        { SA2_NAME: 'Coburg North', ACTIVE_BUSINESSES: 8 },
        { SA2_NAME: 'Pascoe Vale', ACTIVE_BUSINESSES: 25 },
      ]
    },
    codeSnippets: {
      python: `# Competition analysis for mobile repair/accessories
import pandas as pd

cabee_df = pd.read_csv('cabee_2024.csv')

# Filter for electronic repair & telecom retail
relevant_anzsic = ['S9429', 'G4213']
competition = cabee_df[cabee_df['ANZSIC_CODE'].isin(relevant_anzsic)]

# Aggregate by SA2 for competitive density
density = competition.groupby('SA2_CODE_2021')['ACTIVE_BUSINESSES'].sum()`,
      javascript: `// Analyze competitive landscape
const cabee = await fetch('/api/cabee-2024').then(r => r.json());

// Filter for relevant industries
const competition = cabee.filter(row => 
  ['S9429', 'G4213'].includes(row.ANZSIC_CODE)
);

// Calculate competitive density per SA2
const density = competition.reduce((acc, row) => {
  acc[row.SA2_CODE_2021] = (acc[row.SA2_CODE_2021] || 0) + row.ACTIVE_BUSINESSES;
  return acc;
}, {});`,
      sql: `-- Competitive analysis for repair/retail business
SELECT 
  SA2_CODE_2021,
  ANZSIC_DESC,
  SUM(ACTIVE_BUSINESSES) as total_competitors,
  AVG(ENTRIES_FY24) as avg_new_entries
FROM cabee_2024 
WHERE ANZSIC_CODE IN ('S9429', 'G4213')
GROUP BY SA2_CODE_2021, ANZSIC_CODE
ORDER BY total_competitors DESC`
    },
    joinKeys: ['SA2_CODE_2021'],
    howToJoin: 'Join CABEE by SA2_CODE_2021 and filter ANZSIC codes for competitive density analysis'
  },
  {
    id: 'building-approvals-2024',
    title: 'Building Approvals, Australia',
    source: 'ABS',
    absLink: 'https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/latest-release',
    lastUpdatedText: 'November 2024',
    tags: ['housing', 'construction', 'pipeline', 'sa2', 'development'],
    geographyLevels: ['SA2', 'SA3', 'LGA', 'STATE'],
    previewRows: [
      { SA2_CODE_2021: '206011148', FY: 'FY2024', DWELLINGS_APPROVED: 78, VALUE_000S: 52000, TYPE: 'Houses' },
      { SA2_CODE_2021: '206011148', FY: 'FY2024', DWELLINGS_APPROVED: 156, VALUE_000S: 89000, TYPE: 'Other residential' },
      { SA2_CODE_2021: '206011149', FY: 'FY2024', DWELLINGS_APPROVED: 45, VALUE_000S: 31000, TYPE: 'Houses' },
      { SA2_CODE_2021: '206011150', FY: 'FY2024', DWELLINGS_APPROVED: 234, VALUE_000S: 167000, TYPE: 'Other residential' },
      { SA2_CODE_2021: '206011151', FY: 'FY2024', DWELLINGS_APPROVED: 23, VALUE_000S: 18000, TYPE: 'Houses' },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'SA2_NAME',
      yKey: 'DWELLINGS_APPROVED',
      data: [
        { SA2_NAME: 'Brunswick East', DWELLINGS_APPROVED: 234 },
        { SA2_NAME: 'Brunswick West', DWELLINGS_APPROVED: 45 },
        { SA2_NAME: 'Coburg', DWELLINGS_APPROVED: 234 },
        { SA2_NAME: 'Coburg North', DWELLINGS_APPROVED: 23 },
        { SA2_NAME: 'Pascoe Vale', DWELLINGS_APPROVED: 89 },
      ]
    },
    codeSnippets: {
      python: `# Housing pipeline analysis
import pandas as pd

approvals = pd.read_csv('building_approvals_2024.csv')

# Calculate development pressure by SA2
pipeline = approvals.groupby('SA2_CODE_2021').agg({
    'DWELLINGS_APPROVED': 'sum',
    'VALUE_000S': 'sum'
}).reset_index()

# Join with existing housing stock for supply pressure ratio
pressure_ratio = pipeline['DWELLINGS_APPROVED'] / existing_stock['DWELLINGS_TOTAL']`,
      javascript: `// Development pipeline tracking
const approvals = await fetch('/api/building-approvals-2024').then(r => r.json());

// Aggregate by area for supply insights
const pipeline = approvals.reduce((acc, row) => {
  if (!acc[row.SA2_CODE_2021]) acc[row.SA2_CODE_2021] = { dwellings: 0, value: 0 };
  acc[row.SA2_CODE_2021].dwellings += row.DWELLINGS_APPROVED;
  acc[row.SA2_CODE_2021].value += row.VALUE_000S;
  return acc;
}, {});`,
      sql: `-- Pipeline pressure analysis
SELECT 
  b.SA2_CODE_2021,
  SUM(b.DWELLINGS_APPROVED) as pipeline_dwellings,
  SUM(b.VALUE_000S) as pipeline_value_k,
  c.TOTAL_POP / SUM(b.DWELLINGS_APPROVED) as people_per_approval
FROM building_approvals_2024 b
LEFT JOIN census_2021 c ON b.SA2_CODE_2021 = c.SA2_CODE_2021
GROUP BY b.SA2_CODE_2021, c.TOTAL_POP`
    },
    joinKeys: ['SA2_CODE_2021'],
    howToJoin: 'Join Building Approvals by SA2_CODE_2021 to assess upcoming supply and development timing'
  },
  {
    id: 'rppi-2024',
    title: 'Residential Property Price Indexes (RPPI)',
    source: 'ABS',
    absLink: 'https://data.gov.au/data/dataset/activity/residential-property-price-indexes-all-series-by-gccsa',
    lastUpdatedText: 'October 2024',
    tags: ['property', 'prices', 'gccsa', 'trends', 'market'],
    geographyLevels: ['GCCSA', 'STATE'],
    previewRows: [
      { GCCSA_CODE: '2GMEL', GCCSA_NAME: 'Greater Melbourne', QUARTER: '2024Q3', RPPI_HOUSES: 189.4, RPPI_UNITS: 178.2, YOY_CHANGE_HOUSES: 4.2, YOY_CHANGE_UNITS: 2.8 },
      { GCCSA_CODE: '2GMEL', GCCSA_NAME: 'Greater Melbourne', QUARTER: '2024Q2', RPPI_HOUSES: 186.1, RPPI_UNITS: 175.1, YOY_CHANGE_HOUSES: 3.8, YOY_CHANGE_UNITS: 2.1 },
      { GCCSA_CODE: '2GMEL', GCCSA_NAME: 'Greater Melbourne', QUARTER: '2024Q1', RPPI_HOUSES: 183.7, RPPI_UNITS: 173.4, YOY_CHANGE_HOUSES: 2.9, YOY_CHANGE_UNITS: 1.8 },
      { GCCSA_CODE: '2GMEL', GCCSA_NAME: 'Greater Melbourne', QUARTER: '2023Q4', RPPI_HOUSES: 181.9, RPPI_UNITS: 171.8, YOY_CHANGE_HOUSES: 2.1, YOY_CHANGE_UNITS: 1.2 },
      { GCCSA_CODE: '2GMEL', GCCSA_NAME: 'Greater Melbourne', QUARTER: '2023Q3', RPPI_HOUSES: 179.8, RPPI_UNITS: 169.9, YOY_CHANGE_HOUSES: 1.8, YOY_CHANGE_UNITS: 0.9 },
    ],
    sampleChart: {
      type: 'line',
      xKey: 'QUARTER',
      yKey: 'RPPI_HOUSES',
      data: [
        { QUARTER: '2023Q3', RPPI_HOUSES: 179.8 },
        { QUARTER: '2023Q4', RPPI_HOUSES: 181.9 },
        { QUARTER: '2024Q1', RPPI_HOUSES: 183.7 },
        { QUARTER: '2024Q2', RPPI_HOUSES: 186.1 },
        { QUARTER: '2024Q3', RPPI_HOUSES: 189.4 },
      ]
    },
    codeSnippets: {
      python: `# Property market context analysis
import pandas as pd
import matplotlib.pyplot as plt

rppi = pd.read_csv('rppi_2024.csv')

# Trend analysis for market context
melbourne = rppi[rppi['GCCSA_CODE'] == '2GMEL']
recent_trend = melbourne.tail(8)  # Last 2 years quarterly

# Calculate momentum
recent_trend['momentum'] = recent_trend['YOY_CHANGE_HOUSES'].rolling(4).mean()`,
      javascript: `// Market context for property decisions
const rppi = await fetch('/api/rppi-2024').then(r => r.json());

// Get Melbourne trends for context
const melbourne = rppi.filter(row => row.GCCSA_CODE === '2GMEL');
const latestTrend = melbourne.slice(-8);  // Last 2 years

// Calculate average growth rate
const avgGrowth = latestTrend.reduce((sum, row) => 
  sum + row.YOY_CHANGE_HOUSES, 0) / latestTrend.length;`,
      sql: `-- Market context analysis
SELECT 
  QUARTER,
  RPPI_HOUSES,
  YOY_CHANGE_HOUSES,
  AVG(YOY_CHANGE_HOUSES) OVER (
    ORDER BY QUARTER 
    ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
  ) as rolling_avg_growth
FROM rppi_2024 
WHERE GCCSA_CODE = '2GMEL'
ORDER BY QUARTER DESC
LIMIT 12`
    },
    joinKeys: ['GCCSA_CODE'],
    howToJoin: 'Use RPPI for city-level market context; SA2s map to GCCSA for broader trend analysis'
  },
  {
    id: 'jtw-2021',
    title: 'Journey to Work / Place of Work vs Place of Residence',
    source: 'ABS',
    absLink: 'https://www.abs.gov.au/ausstats/abs%40.nsf/Lookup/by%20Subject/2071.0.55.001~2016~Main%20Features~Interactive%20Maps%20-%20Journey%20to%20Work~50',
    lastUpdatedText: 'August 2022',
    tags: ['commuting', 'workers', 'sa2', 'daytime', 'workforce'],
    geographyLevels: ['SA2', 'SA3', 'LGA'],
    previewRows: [
      { SA2_CODE_2021: '206011148', SA2_NAME: 'Brunswick East', RESIDENT_WORKERS: 8542, DAYTIME_WORKERS: 12876, NET_WORKER_FLOW: 4334, PCT_LOCAL_JOBS: 23.4 },
      { SA2_CODE_2021: '206011149', SA2_NAME: 'Brunswick West', RESIDENT_WORKERS: 6123, DAYTIME_WORKERS: 4567, NET_WORKER_FLOW: -1556, PCT_LOCAL_JOBS: 18.7 },
      { SA2_CODE_2021: '206011150', SA2_NAME: 'Coburg', RESIDENT_WORKERS: 9876, DAYTIME_WORKERS: 7234, NET_WORKER_FLOW: -2642, PCT_LOCAL_JOBS: 15.2 },
      { SA2_CODE_2021: '206011151', SA2_NAME: 'Coburg North', RESIDENT_WORKERS: 4532, DAYTIME_WORKERS: 2198, NET_WORKER_FLOW: -2334, PCT_LOCAL_JOBS: 12.1 },
      { SA2_CODE_2021: '206011152', SA2_NAME: 'Pascoe Vale', RESIDENT_WORKERS: 7654, DAYTIME_WORKERS: 5432, NET_WORKER_FLOW: -2222, PCT_LOCAL_JOBS: 14.8 },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'SA2_NAME',
      yKey: 'NET_WORKER_FLOW',
      data: [
        { SA2_NAME: 'Brunswick East', NET_WORKER_FLOW: 4334 },
        { SA2_NAME: 'Brunswick West', NET_WORKER_FLOW: -1556 },
        { SA2_NAME: 'Coburg', NET_WORKER_FLOW: -2642 },
        { SA2_NAME: 'Coburg North', NET_WORKER_FLOW: -2334 },
        { SA2_NAME: 'Pascoe Vale', NET_WORKER_FLOW: -2222 },
      ]
    },
    codeSnippets: {
      python: `# Daytime vs nighttime demand analysis
import pandas as pd

jtw = pd.read_csv('jtw_2021.csv')

# Calculate retail demand multipliers
jtw['total_demand_population'] = jtw['RESIDENT_WORKERS'] + jtw['DAYTIME_WORKERS'] 
jtw['weekday_demand_ratio'] = jtw['DAYTIME_WORKERS'] / jtw['RESIDENT_WORKERS']

# Identify high foot-traffic areas
high_foot_traffic = jtw[jtw['NET_WORKER_FLOW'] > 2000]`,
      javascript: `// Foot traffic insights for retail location
const jtw = await fetch('/api/jtw-2021').then(r => r.json());

// Calculate demand patterns
const demandAnalysis = jtw.map(area => ({
  ...area,
  totalDemand: area.RESIDENT_WORKERS + area.DAYTIME_WORKERS,
  weekdayMultiplier: area.DAYTIME_WORKERS / area.RESIDENT_WORKERS,
  trafficType: area.NET_WORKER_FLOW > 0 ? 'employment_hub' : 'residential'
}));`,
      sql: `-- Retail demand timing analysis
SELECT 
  j.*,
  CASE 
    WHEN NET_WORKER_FLOW > 2000 THEN 'High foot traffic'
    WHEN NET_WORKER_FLOW > 0 THEN 'Employment hub'
    ELSE 'Residential area'
  END as retail_opportunity,
  DAYTIME_WORKERS::float / RESIDENT_WORKERS as weekday_multiplier
FROM jtw_2021 j
ORDER BY NET_WORKER_FLOW DESC`
    },
    joinKeys: ['SA2_CODE_2021'],
    howToJoin: 'Join JTW by SA2_CODE_2021 to understand day vs night demand patterns for retail planning'
  },
  {
    id: 'gtfs-vic',
    title: 'GTFS Victoria Transit Data',
    source: 'GTFS',
    absLink: 'https://data.gov.au/data/dataset/gtfs-realtime',
    lastUpdatedText: 'Live/Daily updates',
    tags: ['transport', 'transit', 'stations', 'headways', 'accessibility'],
    geographyLevels: ['Station', 'Route', 'Stop'],
    previewRows: [
      { STOP_ID: 'bruneast', STOP_NAME: 'Brunswick East Station', ROUTE_TYPE: 'Train', PEAK_HEADWAY_MINS: 6, OFF_PEAK_HEADWAY_MINS: 10, CBD_TRAVEL_TIME_MINS: 18, WHEELCHAIR_ACCESSIBLE: true },
      { STOP_ID: 'brunswest', STOP_NAME: 'Brunswick West Station', ROUTE_TYPE: 'Tram', PEAK_HEADWAY_MINS: 4, OFF_PEAK_HEADWAY_MINS: 8, CBD_TRAVEL_TIME_MINS: 25, WHEELCHAIR_ACCESSIBLE: true },
      { STOP_ID: 'coburg', STOP_NAME: 'Coburg Station', ROUTE_TYPE: 'Train', PEAK_HEADWAY_MINS: 8, OFF_PEAK_HEADWAY_MINS: 15, CBD_TRAVEL_TIME_MINS: 22, WHEELCHAIR_ACCESSIBLE: true },
      { STOP_ID: 'pascoe', STOP_NAME: 'Pascoe Vale Station', ROUTE_TYPE: 'Train', PEAK_HEADWAY_MINS: 10, OFF_PEAK_HEADWAY_MINS: 20, CBD_TRAVEL_TIME_MINS: 28, WHEELCHAIR_ACCESSIBLE: false },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'STOP_NAME',
      yKey: 'CBD_TRAVEL_TIME_MINS',
      data: [
        { STOP_NAME: 'Brunswick East', CBD_TRAVEL_TIME_MINS: 18 },
        { STOP_NAME: 'Brunswick West', CBD_TRAVEL_TIME_MINS: 25 },
        { STOP_NAME: 'Coburg', CBD_TRAVEL_TIME_MINS: 22 },
        { STOP_NAME: 'Pascoe Vale', CBD_TRAVEL_TIME_MINS: 28 },
      ]
    },
    codeSnippets: {
      python: `# Transit accessibility analysis (External Open Data)
import requests

# Note: GTFS data requires external API access
gtfs_response = requests.get('https://api.ptv.vic.gov.au/v3/...')

# Calculate catchment accessibility scores
def calculate_accessibility_score(station_data):
    return {
        'frequency_score': 60 / station_data['PEAK_HEADWAY_MINS'],
        'cbd_access_score': 60 / station_data['CBD_TRAVEL_TIME_MINS'],
        'accessibility_bonus': 1.2 if station_data['WHEELCHAIR_ACCESSIBLE'] else 1.0
    }`,
      javascript: `// Transit integration (External Open Data)
// Note: Requires PTV API key and proper CORS setup
const ptv = await fetch('https://api.ptv.vic.gov.au/v3/stops/location/...', {
  headers: { 'Authorization': 'Bearer YOUR_PTV_API_KEY' }
});

// Calculate walkability scores
const walkabilityScore = (station) => {
  const frequencyScore = 60 / station.PEAK_HEADWAY_MINS;
  const accessScore = 60 / station.CBD_TRAVEL_TIME_MINS;
  return (frequencyScore + accessScore) / 2;
};`,
      sql: `-- Transit accessibility scoring
-- Note: This would integrate with real GTFS database
SELECT 
  stop_name,
  60.0 / peak_headway_mins as frequency_score,
  60.0 / cbd_travel_time_mins as access_score,
  CASE 
    WHEN wheelchair_accessible THEN 1.2 
    ELSE 1.0 
  END as accessibility_multiplier
FROM gtfs_stops 
WHERE route_type IN ('Train', 'Tram')
ORDER BY (frequency_score + access_score) DESC`
    },
    joinKeys: ['STOP_ID', 'STOP_NAME'],
    howToJoin: 'Link stations to SA2s via geospatial proximity for catchment analysis (External Open Data)'
  },
  {
    id: 'myschool-2024',
    title: 'My School / ACARA School Profiles',
    source: 'ACARA',
    absLink: 'https://myschool.edu.au/',
    lastUpdatedText: 'Annually updated',
    tags: ['education', 'schools', 'icsea', 'lbote', 'performance'],
    geographyLevels: ['School', 'Suburb', 'LGA'],
    previewRows: [
      { SCHOOL_ID: 'VIC001', SCHOOL_NAME: 'Brunswick East Primary', SECTOR: 'Government', ICSEA: 1087, PCT_LBOTE: 45.2, ENROLMENTS: 456, STUDENT_TEACHER_RATIO: 14.2, SUPPORTS_EAL: true, SUPPORTS_ASD: false },
      { SCHOOL_ID: 'VIC002', SCHOOL_NAME: 'Brunswick West Secondary', SECTOR: 'Government', ICSEA: 1034, PCT_LBOTE: 52.8, ENROLMENTS: 1234, STUDENT_TEACHER_RATIO: 15.8, SUPPORTS_EAL: true, SUPPORTS_ASD: true },
      { SCHOOL_ID: 'VIC003', SCHOOL_NAME: 'St Josephs Coburg', SECTOR: 'Catholic', ICSEA: 956, PCT_LBOTE: 68.4, ENROLMENTS: 234, STUDENT_TEACHER_RATIO: 13.1, SUPPORTS_EAL: true, SUPPORTS_ASD: false },
      { SCHOOL_ID: 'VIC004', SCHOOL_NAME: 'Pascoe Vale Grammar', SECTOR: 'Independent', ICSEA: 1156, PCT_LBOTE: 28.7, ENROLMENTS: 567, STUDENT_TEACHER_RATIO: 12.4, SUPPORTS_EAL: false, SUPPORTS_ASD: true },
    ],
    sampleChart: {
      type: 'bar',
      xKey: 'SCHOOL_NAME',
      yKey: 'ICSEA',
      data: [
        { SCHOOL_NAME: 'Brunswick East Primary', ICSEA: 1087 },
        { SCHOOL_NAME: 'Brunswick West Secondary', ICSEA: 1034 },
        { SCHOOL_NAME: 'St Josephs Coburg', ICSEA: 956 },
        { SCHOOL_NAME: 'Pascoe Vale Grammar', ICSEA: 1156 },
      ]
    },
    codeSnippets: {
      python: `# School selection analysis (External Open Data)
import pandas as pd

# Note: ACARA data requires proper data access agreements
schools = pd.read_csv('myschool_data.csv')

# Filter by support needs and sector preference
def filter_schools(support_needs=['EAL'], sector_pref='Government'):
    filtered = schools[schools['SECTOR'] == sector_pref]
    
    if 'EAL' in support_needs:
        filtered = filtered[filtered['SUPPORTS_EAL'] == True]
    if 'ASD' in support_needs:
        filtered = filtered[filtered['SUPPORTS_ASD'] == True]
    
    return filtered.sort_values('ICSEA', ascending=False)`,
      javascript: `// School matching system (External Open Data)
// Note: Requires ACARA data access or scraping (check terms)
const schools = await fetch('/api/myschool-data').then(r => r.json());

const matchSchools = (criteria) => {
  return schools
    .filter(school => {
      if (criteria.sector && school.SECTOR !== criteria.sector) return false;
      if (criteria.eal && !school.SUPPORTS_EAL) return false;
      if (criteria.asd && !school.SUPPORTS_ASD) return false;
      return true;
    })
    .sort((a, b) => b.ICSEA - a.ICSEA);
};`,
      sql: `-- School recommendation system
-- Note: Requires ACARA database access
SELECT 
  *,
  CASE 
    WHEN ICSEA > 1100 THEN 'High performing'
    WHEN ICSEA > 1000 THEN 'Above average'
    ELSE 'Average'
  END as performance_band
FROM myschool_schools 
WHERE 
  SECTOR = 'Government' 
  AND SUPPORTS_EAL = true
  AND ENROLMENTS BETWEEN 200 AND 800
ORDER BY ICSEA DESC`
    },
    joinKeys: ['SCHOOL_ID', 'SUBURB'],
    howToJoin: 'Match schools by suburb proximity and filter by support needs + sector preferences (External Open Data)'
  }
];

export const getDatasetById = (id: string): Dataset | undefined => {
  return datasetRegistry.find(dataset => dataset.id === id);
};

export const searchDatasets = (tags: string[]): Dataset[] => {
  return datasetRegistry.filter(dataset => 
    tags.some(tag => dataset.tags.includes(tag))
  ).sort((a, b) => {
    const aMatches = tags.filter(tag => a.tags.includes(tag)).length;
    const bMatches = tags.filter(tag => b.tags.includes(tag)).length;
    return bMatches - aMatches;
  });
};