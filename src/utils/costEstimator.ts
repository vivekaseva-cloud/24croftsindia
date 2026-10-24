export interface HostingTierEstimate {
  tierName: string;
  tierNameTe: string;
  scale: string;
  monthlyCostInr: string;
  monthlyCostUsd: string;
  breakdown: {
    item: string;
    itemTe: string;
    costInr: string;
    description: string;
  }[];
  securityFeatures: string[];
}

export const HOSTING_AND_MAINTENANCE_ESTIMATE: HostingTierEstimate[] = [
  {
    tierName: 'Startup / Production Launch (MVP)',
    tierNameTe: 'ప్రారంభ దశ (Launch & Prototyping)',
    scale: '1,000 - 10,000 Profiles & Visitors',
    monthlyCostInr: '₹6,500 - ₹12,000 / నెల',
    monthlyCostUsd: '$80 - $145 / mo',
    breakdown: [
      {
        item: 'Cloud Server (Google Cloud Run / AWS Lightsail 4GB RAM)',
        itemTe: 'క్లౌడ్ సర్వర్ హోస్టింగ్',
        costInr: '₹2,500',
        description: 'Autoscaling container server, 99.9% uptime SLA',
      },
      {
        item: 'Encrypted PostgreSQL DB (Cloud SQL / Supabase Pro)',
        itemTe: 'ఎన్‌క్రిప్టెడ్ డేటాబేస్ స్టోరేజ్',
        costInr: '₹2,200',
        description: 'AES-256 encryption at rest, automatic daily backups',
      },
      {
        item: 'Media Cloud Storage (S3 / GCS - 250 GB for 25 photos/user)',
        itemTe: 'మీడియా ఫొటోల నిల్వ (25 ఫొటోలు/యూజర్)',
        costInr: '₹1,200',
        description: 'Secure bucket storage with private pre-signed URLs',
      },
      {
        item: 'Cloudflare CDN & SSL Certificate',
        itemTe: 'గ్లోబల్ CDN & ఉచిత SSL సెక్యూరిటీ',
        costInr: '₹0 (Free Tier)',
        description: 'DDoS mitigation, web application firewall (WAF)',
      },
      {
        item: 'Transactional SMS & WhatsApp OTP Gateway',
        itemTe: 'SMS / వాట్సాప్ నోటిఫికేషన్లు (OTP)',
        costInr: '₹1,500',
        description: 'Mobile verification for production houses and artists',
      },
      {
        item: 'Monthly Server Maintenance & Patching',
        itemTe: 'సర్వర్ మెయింటెనెన్స్ & సెక్యూరిటీ అప్‌డేట్స్',
        costInr: '₹3,000',
        description: 'Regular DB index optimization, security audits, backups',
      },
    ],
    securityFeatures: [
      'AES-256 Bit Database Encryption at Rest & In-Transit (TLS 1.3)',
      'Strict Role-Based Access Control (RBAC) protecting talent contact numbers',
      'Aadhaar Masking (Displaying only last 4 digits publicly)',
      'Automated daily off-site database backups',
      'Cloudflare DDoS protection & rate limiting against web scraping',
    ],
  },
  {
    tierName: 'Industry Growth Stage',
    tierNameTe: 'సినిమా ఇండస్ట్రీ విస్తరణ దశ (Growth Stage)',
    scale: '25,000 - 100,000 Film Profiles & Production Houses',
    monthlyCostInr: '₹22,000 - ₹38,000 / నెల',
    monthlyCostUsd: '$260 - $460 / mo',
    breakdown: [
      {
        item: 'Managed Kubernetes / Cloud Run High Concurrency',
        itemTe: 'హై-కెపాసిటీ లోడ్ బ్యాలెన్స్‌డ్ సర్వర్స్',
        costInr: '₹8,500',
        description: 'High concurrency auto-scaling handling teaser trailers traffic',
      },
      {
        item: 'High Availability Multi-AZ Database with Read Replicas',
        itemTe: 'మల్టీ-AZ రెప్లికా డేటాబేస్',
        costInr: '₹7,500',
        description: 'Zero data loss failover, point-in-time recovery for 30 days',
      },
      {
        item: 'Object Storage 2TB + Fast Image Optimization Pipeline',
        itemTe: '2TB మీడియా స్టోరేజ్ & ఇమేజ్ కంప్రెషన్',
        costInr: '₹5,000',
        description: 'Automated WebP conversion for fast mobile loading',
      },
      {
        item: 'Enterprise CDN & Video Streaming Bandwidth',
        itemTe: 'ఎంటర్‌ప్రైజ్ వీడియో & ఇమేజ్ CDN',
        costInr: '₹4,000',
        description: 'Low-latency streaming across South India and pan-India',
      },
      {
        item: 'Dedicated DevOps & 24/7 Security Monitoring',
        itemTe: 'నిపుణుల మెయింటెనెన్స్ & సిస్టమ్ మానిటరింగ్',
        costInr: '₹8,000',
        description: 'Real-time threat monitoring, uptime tracking, monthly audit',
      },
    ],
    securityFeatures: [
      'End-to-End Encryption (E2EE) for contact transmission to approved production houses',
      'Watermarking on uploaded portfolios and audition clips',
      'Web Application Firewall with bot and crawler blocking',
      'SOC2 and ISO 27001 compliant cloud infrastructure (Google Cloud / AWS)',
    ],
  },
];
