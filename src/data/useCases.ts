import { UseCase } from '../types/app';

export const demoUseCases: UseCase[] = [
  {
    id: 'uc1',
    title: 'Mobile Repair Shop Location Strategy',
    description: 'Used SEIFA + Census + CABEE to identify high-income, tech-savvy areas with low competition. Found Brunswick East had perfect demographics (young professionals, high income) with only 12 existing repair shops.',
    datasetsUsed: ['seifa-2021', 'census-2021', 'cabee-2024'],
    outcome: 'Sales +18% in first 3 months vs projections',
    industry: 'Retail'
  },
  {
    id: 'uc2', 
    title: 'Property Investment Near Station',
    description: 'Combined RPPI trends with Building Approvals pipeline and Census demographics around Coburg Station. Identified 2-year development lag creating opportunity window before supply increase.',
    datasetsUsed: ['rppi-2024', 'building-approvals-2024', 'census-2021', 'gtfs-vic'],
    outcome: 'Purchased at 15% below projected market peak',
    industry: 'Property'
  },
  {
    id: 'uc3',
    title: 'School Catchment Analysis',
    description: 'Used MySchool ICSEA data with Census demographics to identify best government schools supporting EAL/D students. Cross-referenced with GTFS for public transport accessibility.',
    datasetsUsed: ['myschool-2024', 'census-2021', 'gtfs-vic'],
    outcome: 'Found perfect school match within 20min PT commute',
    industry: 'Education'
  },
  {
    id: 'uc4',
    title: 'Franchise Location Expansion',
    description: 'Analyzed JTW data to understand daytime vs nighttime population flows. Combined with SEIFA to target areas with high worker influx during business hours.',
    datasetsUsed: ['jtw-2021', 'seifa-2021', 'cabee-2024'],
    outcome: 'Identified 3 high-potential locations with 40% higher foot traffic',
    industry: 'Food & Beverage'
  },
  {
    id: 'uc5',
    title: 'Apartment Development Timing',
    description: 'Used Building Approvals to assess development pipeline pressure. RPPI data showed market momentum. Census revealed target demographic concentration.',
    datasetsUsed: ['building-approvals-2024', 'rppi-2024', 'census-2021'],
    outcome: 'Delayed project 18 months, avoided market oversupply',
    industry: 'Development'
  }
];