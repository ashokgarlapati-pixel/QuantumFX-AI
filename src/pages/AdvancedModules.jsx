import React, { useState } from 'react';
import { 
  Cpu, 
  Clock, 
  Globe, 
  Landmark, 
  AlertTriangle, 
  Wallet, 
  Target, 
  Shield, 
  Link, 
  CloudRain, 
  DollarSign, 
  BarChart2, 
  Compass, 
  Activity, 
  Users, 
  GitBranch, 
  Leaf, 
  Bot,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { ADVANCED_MODULES_LIST } from '../data/mockData';

// Icon Map for all 18 Modules + All-Combined Suite
const ICON_MAP = {
  all: Sparkles,
  digitaltwin: Cpu,
  timemachine: Clock,
  globalshock: Globe,
  centralbankai: Landmark,
  blackswan: AlertTriangle,
  budgetstabilizer: Wallet,
  risksentinel: Target,
  shockabsorber: Shield,
  economicchain: Link,
  agriweather: CloudRain,
  moneyflow: DollarSign,
  policyoptimizer: BarChart2,
  digitaleconomy: Compass,
  sentimentanalyzer: Activity,
  inflationimpact: Users,
  reformgenerator: GitBranch,
  greenstability: Leaf,
  governmentai: Bot
};

// Complete Analysis Data Generator for all 18 Modules matching ACSB exact structure
const ACSB_MODULE_REPORTS = {
  all: {
    badge: 'MASTER SOVEREIGN AI SUITE (OPTIMAL - 88.5/100)',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Repo: 6.5%', change: '+6.8% GDP Expansion', text: '18-Module Multi-Vector' },
    rationale: 'Master AI synthesis across all 18 modules (Central Bank AI, Digital Twin, Money Flow, Agri-Weather, Shock Absorber, etc.) confirms robust sovereign resilience with well-anchored inflation, $640B foreign exchange reserves, and expanding digital GDP.',
    stance: 'Unified Sovereign Policy Alignment Stance',
    problems: [
      'Cross-module check: Imported energy cost transmission to domestic logistics transport.',
      'Cross-module check: FII capital flow volatility during global interest rate adjustment cycles.',
      'Cross-module check: Agricultural yield variance dependent on monsoonal rainfall distribution.'
    ],
    forwardGuidance: 'The unified 18-module AI steering committee recommends maintaining benchmark repo rate stability while accelerating Union Budget capital expenditure (₹11.1 Lakh Cr) and UPI cross-border trade links.',
    assessment: {
      inflation: 'Combined monetary-agri simulation projects CPI well-anchored at 4.2%, mitigating food and fuel price volatility.',
      growth: 'Multi-sector GDP growth acceleration model forecasts strong +6.8% annual expansion supported by manufacturing & digital services.',
      employment: 'Surge in high-skilled job creation across fintech, renewable energy, and industrial manufacturing floor payrolls.'
    },
    risks: [
      'External geopolitical trade friction impacting global shipping routes and commodity futures.',
      'Unhedged foreign currency debt obligations among small and medium-sized corporate borrowers.',
      'Short-term market volatility during global central bank policy rate announcements.'
    ],
    actions: [
      'Master Action 1: Maintain RBI benchmark repo rate at 6.5% with neutral stance to support Rupee exchange stability.',
      'Master Action 2: Deploy $10 Billion FX reserve liquidity buffers if USD/INR spot volatility exceeds 1.5% daily variance.',
      'Master Action 3: Expand UPI and Reserve Bank e-Rupee (CBDC) cross-border trade settlement gateways.',
      'Master Action 4: Fast-track GST tax credit refunds and single-window industrial clearances for export manufacturers.'
    ]
  },
  centralbankai: {
    badge: 'Hold Benchmark Rate',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    metrics: { current: '6.5%', change: '0%', text: 'Status Quo Hold' },
    rationale: 'Given the current balance of risks, maintaining the status quo is essential to allow past cumulative rate hikes to transmit through the economy fully while anchoring inflation expectations.',
    stance: 'Withdrawal of accommodation',
    problems: [
      'Discussion on the durability of core inflation moderation.',
      'Assessment of global slowdown impact on domestic manufacturing exports.',
      'Evaluation of daily liquidity conditions in the banking system.'
    ],
    forwardGuidance: 'We remain committed to ensuring that inflation progressively aligns with the 4.0% target while supporting sustainable growth, keeping all policy options open contingent on incoming data.',
    assessment: {
      inflation: 'Inflation is trending toward the upper bound of our target range, driven by persistent food price volatility and rising energy costs, necessitating a cautious monitoring approach.',
      growth: 'GDP growth is projected to remain resilient at 6.5%, supported by robust domestic consumption and a steady recovery in the manufacturing sector.',
      employment: 'The labor market continues to show tightness, with unemployment levels reaching record lows and wage growth exhibiting moderate upward pressure.'
    },
    risks: [
      'Sudden capital flight from emerging market assets if global Fed interest rates remain higher for longer.',
      'Imported price inflation spikes driven by geopolitical supply disruptions in oil and gas.',
      'Tightening credit availability for small and medium-sized enterprises (SMEs).'
    ],
    actions: [
      'Conduct fine-tuning variable rate repo operations to ensure banking system liquidity remains balanced.',
      'Maintain the current stance of withdrawal of accommodation until inflation stabilizes permanently below 4.0%.',
      'Provide clear, transparent forward guidance in central bank communications to prevent market speculation.',
      'Establish liquidity buffers to cushion domestic bond yields against global Treasury market volatility.'
    ]
  },

  globalshock: {
    badge: 'High Stress Alert',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    metrics: { current: 'Shock Index: 78.4', change: '+14.2%', text: 'Global Supply Disruption' },
    rationale: 'External geopolitical trade blockades and oil supply reductions require immediate sovereign reserve deployment to protect domestic currency purchasing power.',
    stance: 'Emergency Macro Protection',
    problems: [
      'Sudden jump in crude oil import prices threatening domestic current account deficit.',
      'Port congestion and supply chain bottlenecks delaying industrial raw material imports.',
      'Currency volatility spike across foreign exchange desks.'
    ],
    forwardGuidance: 'Central bank will utilize foreign currency reserves to buffer exchange rate volatility without altering long-term fundamental equilibrium exchange rates.',
    assessment: {
      inflation: 'Imported inflation risk is elevated to 5.4% due to energy futures price spikes.',
      growth: 'GDP growth expected to decelerate by -0.8% over the next two quarters without policy offset.',
      employment: 'Supply-side slowdown impacting manufacturing production schedules.'
    },
    risks: [
      'Rapid widening of the sovereign trade deficit.',
      'Foreign exchange market speculative attacks on domestic currency.',
      'Secondary price shocks in food, transport, and electricity tariffs.'
    ],
    actions: [
      'Deploy $10 Billion from foreign exchange reserves to supply dollar liquidity to key energy importers.',
      'Reduce import tariffs on essential agricultural commodities to lower domestic food inflation.',
      'Open bilateral currency swap lines with regional trading partners to settle trade in domestic currencies.',
      'Offer emergency working capital credit lines for critical supply chain importers.'
    ]
  },

  digitaltwin: {
    badge: 'Optimal Macro Model',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Digital Model: 94.2%', change: '+2.1%', text: 'Growth Projection' },
    rationale: 'The digital shadow twin indicates that targeted tax credits and digital infrastructure investments will yield a 1.4x multiplier on GDP over a 12-month horizon.',
    stance: 'Expansionary Productivity Boost',
    problems: [
      'Digital payment infrastructure adoption lagging in rural agricultural hubs.',
      'Skill gap in high-tech manufacturing sector limiting industrial expansion.',
      'High logistics cost relative to regional trading competitors.'
    ],
    forwardGuidance: 'Fiscal policy will prioritize capital expenditure over operational spending to maximize long-term productive economic capacity.',
    assessment: {
      inflation: 'Inflation projected at 3.1%, staying safely within the 2.0% - 4.0% target band.',
      growth: 'GDP growth acceleration model forecasts +6.8% annual expansion.',
      employment: 'High-skilled job creation surging in technology and renewable energy sectors.'
    },
    risks: [
      'Fiscal deficit expanding if tax revenue collections lag projected targets.',
      'Cybersecurity and digital payment network vulnerabilities.',
      'Uneven wealth distribution between urban tech hubs and rural regions.'
    ],
    actions: [
      'Pass national digital currency (CBDC) settlement framework for interbank transactions.',
      'Allocate $4B for national high-speed broadband and digital trade infrastructure.',
      'Incentivize commercial banks to offer low-cost digital loans for small businesses.',
      'Streamline single-window trade clearance for digital service exports.'
    ]
  },

  blackswan: {
    badge: 'Tail Risk Normal',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    metrics: { current: 'Crash Risk: 0.38%', change: '-0.12%', text: 'Normal Conditions' },
    rationale: 'Tail-risk probability metrics indicate normal market conditions; however, continuous monitoring of credit spreads and currency swaps remains mandatory.',
    stance: 'Continuous Surveillance Stance',
    problems: [
      'Minor liquidity tightening detected in non-bank financial companies (NBFCs).',
      'Unusual call option volume on global equity volatility indexes.',
      'Mild divergence between spot exchange rates and offshore NDF futures.'
    ],
    forwardGuidance: 'Emergency market stabilization facilities remain on standby with instantaneous trigger capability if volatility thresholds are breached.',
    assessment: {
      inflation: 'Baseline inflation trajectory stable at 3.2%.',
      growth: 'Base case GDP path intact with low probability of negative shock.',
      employment: 'Stable labor market indicators across major employment sectors.'
    },
    risks: [
      'Sudden algorithmic sell-off in global bond markets triggered by central bank surprise speech.',
      'Unforeseen credit default by major international financial institution.',
      'Abrupt disruption of maritime trade chokepoints.'
    ],
    actions: [
      'Maintain daily stress-testing protocol across all Tier-1 commercial banks.',
      'Enforce strict limits on unhedged foreign currency borrowing by domestic corporations.',
      'Keep $15B sovereign stabilization facility ready for immediate market injection.',
      'Establish cross-border regulatory reporting for high-frequency algorithmic trade desks.'
    ]
  },

  budgetstabilizer: {
    badge: 'Fiscal Score 68.5/100',
    statusClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    metrics: { current: 'Deficit: 4.2%', change: '-0.5%', text: 'Fiscal Consolidation' },
    rationale: 'Reallocating inefficient fuel subsidies toward capital infrastructure investments will reduce the sovereign debt trajectory by $12B over 3 years.',
    stance: 'Fiscal Consolidation & Reform',
    problems: [
      'Subsidies absorbing over 14% of annual sovereign tax revenues.',
      'Rising interest payment obligations on long-dated government bonds.',
      'Under-collection of indirect corporate taxes in retail sectors.'
    ],
    forwardGuidance: 'The sovereign budget will adhere strictly to a 4.0% debt-to-GDP fiscal target over the medium-term horizon.',
    assessment: {
      inflation: 'Subsidy rationalization may create temporary +0.4% CPI tick before stabilizing.',
      growth: 'Shift to capital expenditure increases long-term GDP multiplier to 1.35x.',
      employment: 'Infrastructure creation generates over 450,000 new construction jobs.'
    },
    risks: [
      'Public resistance to subsidy reductions requiring clear public communication.',
      'Higher bond yield spreads if debt issuance volume exceeds market demand.',
      'Revenue shortfalls if global trade growth slows.'
    ],
    actions: [
      'Phase out non-targeted fuel subsidies and replace with direct digital cash transfers to low-income households.',
      'Cap government debt issuance at current quarterly target levels.',
      'Implement AI-driven tax audit software to identify corporate tax leakage.',
      'Ring-fence infrastructure spending to ensure timely project execution.'
    ]
  },

  timemachine: {
    badge: '3-Month Horizon Match',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    metrics: { current: 'Index: 104.2', change: '+3.4%', text: 'Historical Replay' },
    rationale: 'Replaying historical 2008 & 2020 post-crisis recoveries indicates current currency trajectory follows a strong V-shaped normalization curve.',
    stance: 'Historical Pattern Tracking',
    problems: [
      'Short-term price divergence compared to 5-year historical average.',
      'Temporary correlation breakdown between bond yields and currency strength.',
      'Seasonal export order contraction in Q3.'
    ],
    forwardGuidance: 'Historical cycle analysis confirms 89% probability of trend continuation over the next 90 trading days.',
    assessment: {
      inflation: 'CPI trajectory matches historical post-supply shock recovery pattern.',
      growth: 'Quarterly GDP performance aligned with 10-year historical expansion averages.',
      employment: 'Labor market participation metrics recovering at faster rate than 2015 baseline.'
    },
    risks: [
      'Unexpected external policy shifts breaking historical cyclical correlations.',
      'Macro volatility spikes during upcoming corporate earnings season.',
      'Liquidity compression during end-of-year settlement windows.'
    ],
    actions: [
      'Align sovereign reserve management strategies with historical peak liquidity cycles.',
      'Issue inflation-indexed bonds to hedge against historical secondary price waves.',
      'Optimize import credit financing terms based on seasonal historical trade flows.',
      'Establish dynamic currency hedge ratios for state-owned commodity importers.'
    ]
  },

  risksentinel: {
    badge: 'Stability 50.36 MODERATE',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    metrics: { current: 'National Risk: 49.6', change: '-2.4%', text: 'Moderate Vigilance' },
    rationale: 'Comprehensive 5-domain risk monitoring shows moderate stress in external financial exposures while internal banking capital remains solid.',
    stance: 'Sovereign Shielding Mode',
    problems: [
      'Elevated social stress score stemming from food and energy price pressures.',
      'Commercial bank exposure to commercial real estate loans in urban centers.',
      'Increased capital outflow pressure on corporate foreign debt maturity schedules.'
    ],
    forwardGuidance: 'National Risk Sentinel maintains active threat mitigation protocols to keep total risk index below 55.0 threshold.',
    assessment: {
      inflation: 'Financial domain risk contribution at 45.5, indicating controlled monetary pass-through.',
      growth: 'Economic risk score at 52.0 reflects stable domestic consumption buffer.',
      employment: 'Social risk score at 60.2 requires targeted price relief for wage earners.'
    },
    risks: [
      'Simultaneous rating agency downgrade of regional debt obligations.',
      'Cyber warfare targeting interbank clearing and settlement gateways.',
      'Sudden flight to safety strengthening foreign reserve currencies.'
    ],
    actions: [
      'Increase Tier-1 bank capital adequacy requirements by 50 basis points.',
      'Establish a sovereign emergency FX stabilization reserve fund.',
      'Enhance real-time cyber threat intelligence sharing across financial institutions.',
      'Provide targeted energy relief vouchers to vulnerable consumer segments.'
    ]
  },

  shockabsorber: {
    badge: 'Auto-Response Ready',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Absorber: 91.8%', change: '+5.0%', text: 'Crisis Buffer Active' },
    rationale: 'Automated 4-phase shock response algorithm has executed precautionary liquidity injections to insulate domestic trade from external volatility.',
    stance: 'Automated Defense Stance',
    problems: [
      'Import price inflation transmission to domestic retail consumer basket.',
      'Foreign exchange market bid-ask spread widening during European market hours.',
      'Temporary slowdown in foreign direct investment inflows.'
    ],
    forwardGuidance: 'Crisis shock absorber remains dynamically engaged to neutralize currency volatility exceeding 1.2% daily variance.',
    assessment: {
      inflation: 'Inflation Shield priority active: projected CPI impact mitigated by -0.8%.',
      growth: 'Export Boost module maintaining domestic industrial output baseline.',
      employment: 'Employment buffer preserving manufacturing floor payroll stability.'
    },
    risks: [
      'Prolonged duration of external geopolitical crisis exceeding reserve buffer capacity.',
      'Speculative short selling of domestic sovereign debt assets.',
      'Disruption of regional maritime shipping channels.'
    ],
    actions: [
      'Activate Phase 1 Inflation Shield: Release strategic grain and oil reserves.',
      'Activate Phase 2 Forex Buffer: Provide direct USD liquidity to systemic importers.',
      'Activate Phase 3 Fuel Stabilization: Cap wholesale fuel transport tariffs.',
      'Activate Phase 4 Export Incentive: Fast-track GST tax refunds for manufacturing exporters.'
    ]
  },

  economicchain: {
    badge: 'Risk Score 8.5/100',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    metrics: { current: 'Chain Link: 95.8', change: '-1.1%', text: 'Propagation Buffer' },
    rationale: 'Interlinked economic propagation analysis demonstrates high domestic supply chain resilience against second-round oil and commodity price spikes.',
    stance: 'Systemic Link Fortification',
    problems: [
      'Transport sector cost escalation propagating into domestic food logistics.',
      'Imported industrial raw materials experiencing 12-day shipment lag.',
      'Working capital credit line compression for downstream suppliers.'
    ],
    forwardGuidance: 'Policy intervention focused on severing domino transmission between primary energy costs and secondary consumer goods.',
    assessment: {
      inflation: 'Oil shock propagation chain shows maximum 0.6% CPI ripple over 60 days.',
      growth: 'Domestic demand multiplier holding firm despite higher input costs.',
      employment: 'Supply chain labor retention high across logistics and freight transport.'
    },
    risks: [
      'Dual supply chain failure in energy imports and electronic component imports.',
      'Wages-price spiral acceleration if second-round effects persist.',
      'Corporate insolvency cluster among small supply chain sub-contractors.'
    ],
    actions: [
      'Provide freight transport diesel tax subsidies to break energy-to-food cost chain.',
      'Inject emergency supply chain liquidity via state development banks.',
      'Accelerate domestic sourcing substitution programs for key raw inputs.',
      'Monitor real-time credit default swaps of primary industrial producers.'
    ]
  },

  agriweather: {
    badge: 'Climate Stress 20/100',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Crop Health: 78.4', change: '+3.2%', text: 'Food Yield Stable' },
    rationale: 'Satellite vegetation index and monsoonal rainfall projections indicate favorable harvest yields, maintaining low food inflation pressure.',
    stance: 'Agri-Buffer Protection',
    problems: [
      'Localized rainfall deficit in eastern grain producing provinces.',
      'Global fertilizer import cost elevation due to natural gas pricing.',
      'Cold storage capacity shortfall in perishable horticultural zones.'
    ],
    forwardGuidance: 'Agriculture supply outlook supports steady export availability while securing domestic food security buffers.',
    assessment: {
      inflation: 'Food CPI forecast at 2.4%, significantly lower than regional peer averages.',
      growth: 'Agricultural GDP contribution projected to expand by +4.1% this fiscal year.',
      employment: 'Rural employment metrics supported by strong harvesting demand.'
    },
    risks: [
      'Unseasonal rainfall during crop harvest window reducing grain quality.',
      'Global food export restrictions by major agricultural producing nations.',
      'Outbreak of crop diseases affecting primary staple commodities.'
    ],
    actions: [
      'Expand national strategic buffer stocks for wheat, rice, and pulses.',
      'Provide subsidized solar pump installations to reduce rural irrigation energy costs.',
      'Eliminate import duties on essential organic fertilizers and crop protection supplies.',
      'Deploy climate crop insurance coverage with automated digital payout triggers.'
    ]
  },

  moneyflow: {
    badge: 'Net FX Inflow +$5.3B',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    metrics: { current: 'Capital Flow: +$5.3B', change: '+18.4%', text: 'Bullish Foreign Demand' },
    rationale: 'Foreign institutional investor (FII) equity and bond inflows have reached a 6-month high, driven by strong sovereign balance sheet fundamentals.',
    stance: 'Capital Absorption & Sterilization',
    problems: [
      'Short-term speculative capital inflows creating exchange rate overvaluation risk.',
      'Sterilization cost rising for central bank open market operations.',
      'Yield curve flattening due to heavy foreign buying in government bonds.'
    ],
    forwardGuidance: 'Capital account management will focus on encouraging long-term direct investment while absorbing volatile short-term portfolio flows.',
    assessment: {
      inflation: 'Strong currency inflows reducing imported raw material cost pressures.',
      growth: 'Capital availability lowering corporate borrowing costs across domestic markets.',
      employment: 'Foreign direct investment driving expansion in technology and clean energy jobs.'
    },
    risks: [
      'Sudden reversal of global risk appetite causing rapid FII outflow.',
      'Domestic asset bubble formation in equity and real estate sectors.',
      'Over-reliance on short-term hot money portfolio flows.'
    ],
    actions: [
      'Conduct market stabilization scheme (MSS) bond issuances to absorb excess liquidity.',
      'Relax foreign direct investment (FDI) caps in infrastructure and manufacturing sectors.',
      'Implement macroprudential limits on foreign institutional debt holdings.',
      'Build sovereign foreign exchange reserves during high inflow cycles.'
    ]
  },

  policyoptimizer: {
    badge: 'Stability Gain +22.5%',
    statusClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    metrics: { current: 'Optimal Index: 91.5', change: '+4.2%', text: 'Quantum Multi-Variable' },
    rationale: 'Quantum-inspired optimization matrix identifies ideal policy mix: Rate at 6.5%, Tax at 22%, and Export Incentives at 7.5% for maximum economic output.',
    stance: 'Simultaneous Multi-Policy Alignment',
    problems: [
      'Policy lag between monetary interest rate changes and fiscal tax collection.',
      'Conflicting objectives between export promotion and domestic inflation control.',
      'Regulatory fragmentation across financial market oversight agencies.'
    ],
    forwardGuidance: 'Executing synchronized policy adjustment model to achieve maximum GDP growth while preserving price stability.',
    assessment: {
      inflation: 'Optimal policy matrix constrains CPI to 3.2% over 24-month horizon.',
      growth: 'Combined fiscal-monetary multiplier boosts GDP expansion trajectory to +6.9%.',
      employment: 'Balanced policy setup supports job growth in high-value export industries.'
    },
    risks: [
      'Political friction when implementing recommended tax rate rationalizations.',
      'Execution delay in deploying targeted export incentive frameworks.',
      'Unforeseen external interest rate shocks from major central banks.'
    ],
    actions: [
      'Adjust benchmark interest rate to optimal 6.5% baseline.',
      'Rationalize corporate tax rates to 22% for manufacturing re-investment.',
      'Expand export incentive tax credits to 7.5% for high-tech domestic producers.',
      'Establish unified policy steering committee between Treasury and Central Bank.'
    ]
  },

  digitaleconomy: {
    badge: 'Resilience Score 8.4/10',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Digital GDP: 11%', change: '+58% YoY', text: 'UPI & Fintech Surge' },
    rationale: 'Rapid acceleration in digital payments (117B UPI transactions) and cross-border digital service exports is creating a structural boost to currency strength.',
    stance: 'Digital Modernization Push',
    problems: [
      'Cybersecurity risk and threat vectors on retail digital payment networks.',
      'Digital divide between urban enterprise hubs and micro rural traders.',
      'Cross-border digital tax leakages and regulatory arbitrage.'
    ],
    forwardGuidance: 'Expanding national digital infrastructure to target 15% digital GDP contribution within 36 months.',
    assessment: {
      inflation: 'Digital payment efficiency reducing cash handling costs and transactional friction by -0.4%.',
      growth: 'Fintech access boosting small business GDP production by +15.2% year-over-year.',
      employment: 'Digital economy sector generating over 600,000 new software and fintech roles.'
    },
    risks: [
      'Systemic outage or distributed cyber-attack on central payment switches.',
      'Monopoly concentration among major global cloud service providers.',
      'Consumer privacy and financial fraud risks in digital lending apps.'
    ],
    actions: [
      'Link national real-time digital payment system with international trading partners.',
      'Launch Central Bank Digital Currency (CBDC) for wholesale cross-border trade settlements.',
      'Implement zero-fee digital transaction policy for small agricultural merchants.',
      'Establish national financial cybersecurity defense operating center.'
    ]
  },

  sentimentanalyzer: {
    badge: 'Sentiment 58.9 NEUTRAL',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    metrics: { current: 'Sentiment: 58.9', change: '+1.8%', text: 'Positive Bias' },
    rationale: 'Natural language sentiment tracking across financial news, social feeds, and institutional trading desks indicates stable positive investor confidence.',
    stance: 'Market Confidence Reinforcement',
    problems: [
      'Transient viral rumors regarding regional banking sector solvency.',
      'Short-term algorithmic trading sell-offs triggered by news headlines.',
      'Disparity between domestic retail sentiment and foreign institutional sentiment.'
    ],
    forwardGuidance: 'Central bank communication strategy focused on proactive press briefings to eliminate market speculation.',
    assessment: {
      inflation: 'Inflation expectations anchored well at 3.4% according to survey metrics.',
      growth: 'Institutional investor confidence score at 60/100 supporting corporate bond issuance.',
      employment: 'Consumer confidence index rising, driving retail spending expectations.'
    },
    risks: [
      'Headline panic driven by speculative financial media coverage.',
      'Social media sentiment manipulation targeting currency exchange rates.',
      'Sudden drop in global market risk appetite (VIX spike above 30).'
    ],
    actions: [
      'Publish bi-weekly transparent market update bulletins from official regulators.',
      'Deploy real-time AI sentiment monitoring on foreign exchange order flows.',
      'Engage with institutional fund managers to clarify monetary policy objectives.',
      'Implement circuit breakers for excessive intraday currency volatility.'
    ]
  },

  inflationimpact: {
    badge: 'Social Stress 8.5 HIGH',
    statusClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    metrics: { current: 'Food CPI: 4.8%', change: '+0.6%', text: 'Targeted Relief Needed' },
    rationale: 'Granular household economic impact analysis reveals low-income groups face heavy 85% income burden from food costs, requiring immediate fiscal transfers.',
    stance: 'Targeted Social Relief Stance',
    problems: [
      'High food and essential energy inflation burden on low-income households.',
      'Middle-class purchasing power erosion leading to lower discretionary retail spending.',
      'Small business margin compression due to rising raw material input costs.'
    ],
    forwardGuidance: 'Direct fiscal assistance programs will insulate vulnerable demographics without expanding general money supply.',
    assessment: {
      inflation: 'Headline CPI elevated by food prices, while core manufacturing inflation remains subdued at 2.8%.',
      growth: 'Household consumption growth moderating temporarily in lower income brackets.',
      employment: 'Real wage growth negative for low-skilled labor requiring targeted wage indexation.'
    },
    risks: [
      'Social unrest and labor strikes demanding higher mandatory minimum wages.',
      'Widespread small business bankruptcies if raw material costs stay elevated.',
      'Welfare spending fiscal deficit expansion.'
    ],
    actions: [
      'Launch targeted digital food stamp transfers directly to low-income bank accounts.',
      'Temporarily reduce excise duties on domestic cooking gas and transport fuels.',
      'Establish price monitoring cells for essential agricultural commodities.',
      'Offer zero-interest working capital top-up loans for micro-enterprises.'
    ]
  },

  reformgenerator: {
    badge: 'GDP Expansion +4.5%',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Reform Score: 88.2', change: '+6.5%', text: 'Structural Transformation' },
    rationale: 'Executing the 5-point structural reform roadmap (taxation, trade clearance, labor flexibility, energy transition) will unlock +4.5% structural GDP growth.',
    stance: 'Structural Transformation Stance',
    problems: [
      'Complex multi-tier tax structures creating compliance friction for businesses.',
      'Bureaucratic delays in land acquisition and environmental clearances for factories.',
      'High logistics costs accounting for 13% of domestic GDP output.'
    ],
    forwardGuidance: 'Structural reforms scheduled over 3-year phased implementation timeline to ensure smooth economic transition.',
    assessment: {
      inflation: 'Efficiency gains from logistics reform expected to reduce baseline CPI by -0.7%.',
      growth: 'Potential GDP growth ceiling elevated from 6.0% to 8.5% post-reform execution.',
      employment: 'Structural reforms projected to create 1.2 million manufacturing jobs.'
    },
    risks: [
      'Political opposition to labor market modernization and tariff reductions.',
      'Short-term revenue loss during initial tax rate transition phase.',
      'Implementation bottlenecks at regional state government levels.'
    ],
    actions: [
      'Simplify national tax code into 3 streamlined tax slabs.',
      'Implement single-window digital clearance for foreign industrial investments.',
      'Construct dedicated freight railway corridors to lower logistics costs to 8% of GDP.',
      'Pass national labor code flexible hiring guidelines for export manufacturers.'
    ]
  },

  greenstability: {
    badge: 'Green Score 0.45 / 100',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    metrics: { current: 'Renewables: 38%', change: '+12% YoY', text: 'Clean Energy Shift' },
    rationale: 'Transitioning sovereign energy mix to 38% renewables reduces fossil fuel import bills by $9B annually, permanently strengthening current account balance.',
    stance: 'Green Economic Transition',
    problems: [
      'High upfront capital expenditure required for grid-scale solar & storage.',
      'Carbon border tax adjustments imposed by major international trade partners.',
      'Transition friction in legacy coal-dependent industrial regions.'
    ],
    forwardGuidance: 'Green bond issuance program will finance sustainable energy projects while creating high-value green export industries.',
    assessment: {
      inflation: 'Long-term renewable energy costs stabilize electricity tariffs, reducing industrial power CPI impact.',
      growth: 'Green infrastructure investment driving +5.4% annual capital formation.',
      employment: 'Solar, wind, and battery manufacturing generating 350,000 clean energy jobs.'
    },
    risks: [
      'Intermittent renewable power grid instability during weather anomalies.',
      'Supply chain bottlenecks in critical battery minerals (lithium, cobalt).',
      'Legacy energy sector employment dislocation.'
    ],
    actions: [
      'Issue $5 Billion Sovereign Green Bonds to fund renewable grid infrastructure.',
      'Provide 25% tax credits for domestic solar panel and EV battery gigafactories.',
      'Implement carbon pricing mechanism aligned with international standards.',
      'Retrain legacy fossil fuel workforce for clean technology manufacturing.'
    ]
  },

  governmentai: {
    badge: 'Agent Coordination 0.85',
    statusClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    metrics: { current: 'Consensus: 85/100', change: '+4.0%', text: 'Multi-Agent Alignment' },
    rationale: 'Multi-agent simulation combining Central Bank, Treasury, and Social Welfare AI agents yields a balanced consensus policy with zero inter-agency friction.',
    stance: 'Tri-Agency Coordinated Stance',
    problems: [
      'Historical policy friction between Central Bank rate hikes and Treasury expansionary spending.',
      'Uncoordinated policy announcements causing financial market confusion.',
      'Social welfare programs failing to reach targeted economic beneficiaries.'
    ],
    forwardGuidance: 'All three government AI agents have reached 85% policy alignment, establishing a synchronized macro execution framework.',
    assessment: {
      inflation: 'Monetary Agent stance anchors inflation at 3.5% target.',
      growth: 'Fiscal Agent spending directs capital to productive high-multiplier projects boosting GDP.',
      employment: 'Social Welfare Agent ensures complete safety net protection for lowest income quintile.'
    },
    risks: [
      'Conflicting political priorities disrupting tri-agency consensus execution.',
      'Unforeseen external geopolitical crisis forcing departure from consensus plan.',
      'Implementation delays across state administrative bodies.'
    ],
    actions: [
      'Central Bank Agent Action: Hold interest rate at 6.5% with neutral stance.',
      'Fiscal Agent Action: Maintain capital expenditure at 3.3% of GDP.',
      'Social Welfare Agent Action: Deploy automated digital cash transfers for food security.',
      'Joint Action: Conduct quarterly joint multi-agent policy reviews to adjust parameters dynamically.'
    ]
  }
};

// Bespoke Module Simulation Controls Map for all 18 Modules + Master Suite
const MODULE_SIMULATION_CONTROLS = {
  all: [
    { id: 'rbiRate', label: 'RBI Repo Rate Anchor', min: 3.0, max: 12.0, step: 0.25, default: 6.5, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'crudeOil', label: 'Global Crude Oil Price', min: 40, max: 180, step: 5, default: 85, unit: ' $/bbl', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'macroStress', label: 'Integrated Sovereign Stress', min: 0, max: 100, step: 5, default: 35, unit: '/100', color: 'text-purple-400', accent: 'accent-purple-400' }
  ],
  centralbankai: [
    { id: 'rate', label: 'Benchmark Interest Rate', min: 3.0, max: 12.0, step: 0.25, default: 6.5, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'repo', label: 'Repo Liquidity Support', min: 5, max: 50, step: 5, default: 20, unit: ' $B', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'cpi', label: 'CPI Target Anchor', min: 2.0, max: 8.0, step: 0.5, default: 4.0, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' }
  ],
  globalshock: [
    { id: 'oil', label: 'Crude Oil Import Price', min: 50, max: 180, step: 5, default: 95, unit: ' $/bbl', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'geopolitics', label: 'Geopolitical Risk Index', min: 0, max: 100, step: 5, default: 78, unit: '/100', color: 'text-rose-400', accent: 'accent-rose-400' },
    { id: 'shipping', label: 'Supply Chain Shipping Bottleneck', min: 0, max: 100, step: 5, default: 45, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' }
  ],
  digitaltwin: [
    { id: 'cbdc', label: 'CBDC Settlement Adoption', min: 10, max: 95, step: 5, default: 65, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'infra', label: 'Digital Infra Investment', min: 1, max: 20, step: 1, default: 4, unit: ' $B', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'techJobs', label: 'High-Tech Skill Capacity', min: 20, max: 100, step: 5, default: 82, unit: '/100', color: 'text-purple-400', accent: 'accent-purple-400' }
  ],
  blackswan: [
    { id: 'vix', label: 'Market Volatility Index (VIX)', min: 10, max: 80, step: 1, default: 24, unit: ' pts', color: 'text-rose-400', accent: 'accent-rose-400' },
    { id: 'cds', label: 'Sovereign CDS Spread', min: 50, max: 500, step: 10, default: 145, unit: ' bps', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'buffer', label: 'Standby Rescue Buffer', min: 5, max: 50, step: 5, default: 15, unit: ' $B', color: 'text-cyan-400', accent: 'accent-cyan-400' }
  ],
  budgetstabilizer: [
    { id: 'deficit', label: 'Fiscal Deficit Cap', min: 1.0, max: 8.0, step: 0.1, default: 4.2, unit: '% of GDP', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'subsidy', label: 'Subsidy Rationalization', min: 0, max: 100, step: 5, default: 40, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'capex', label: 'Infrastructure Spending', min: 5, max: 50, step: 5, default: 18, unit: ' $B', color: 'text-cyan-400', accent: 'accent-cyan-400' }
  ],
  timemachine: [
    { id: 'crisisEra', label: 'Historical Crisis Benchmark', min: 1, max: 3, step: 1, default: 1, unit: ' (2008 / 2015 / 2020)', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'horizon', label: 'Lookback Cycle Horizon', min: 30, max: 365, step: 30, default: 90, unit: ' Days', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'match', label: 'Pattern Correlation Target', min: 50, max: 99, step: 1, default: 89, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' }
  ],
  risksentinel: [
    { id: 'social', label: 'Social Stress Index', min: 0, max: 100, step: 5, default: 60, unit: '/100', color: 'text-rose-400', accent: 'accent-rose-400' },
    { id: 'bankExp', label: 'Bank Real Estate Exposure', min: 5, max: 40, step: 1, default: 18, unit: '%', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'capitalFlight', label: 'Outflow Vulnerability Level', min: 10, max: 90, step: 5, default: 49, unit: '/100', color: 'text-cyan-400', accent: 'accent-cyan-400' }
  ],
  shockabsorber: [
    { id: 'forexReserve', label: 'Forex Buffer Reserve', min: 5, max: 50, step: 5, default: 25, unit: ' $B', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'grainRelease', label: 'Strategic Commodity Release', min: 0, max: 100, step: 5, default: 50, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'fuelCap', label: 'Freight Tariff Subsidy Cap', min: 0, max: 30, step: 2, default: 12, unit: '%', color: 'text-purple-400', accent: 'accent-purple-400' }
  ],
  economicchain: [
    { id: 'transportSpike', label: 'Logistics Cost Elevation', min: 0, max: 50, step: 2, default: 18, unit: '%', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'importLag', label: 'Raw Material Shipping Delay', min: 0, max: 60, step: 2, default: 12, unit: ' Days', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'creditLine', label: 'Supply Chain Credit Line', min: 1, max: 20, step: 1, default: 8, unit: ' $B', color: 'text-emerald-400', accent: 'accent-emerald-400' }
  ],
  agriweather: [
    { id: 'rain', label: 'Monsoon Rainfall Variance', min: -50, max: 50, step: 5, default: 12, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'fertilizer', label: 'Global Fertilizer Price Index', min: 80, max: 250, step: 10, default: 145, unit: ' pts', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'foodBuffer', label: 'Strategic Grain Buffer', min: 1, max: 20, step: 1, default: 10, unit: ' MT', color: 'text-cyan-400', accent: 'accent-cyan-400' }
  ],
  moneyflow: [
    { id: 'fiiInflow', label: 'Net Foreign FII Inflow', min: -10, max: 15, step: 0.5, default: 5.3, unit: ' $B', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'ndfVolume', label: 'Offshore NDF Daily Volume', min: 1, max: 25, step: 1, default: 14, unit: ' $B', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'bondSpread', label: 'Sovereign Bond Spread', min: 50, max: 500, step: 10, default: 180, unit: ' bps', color: 'text-emerald-400', accent: 'accent-emerald-400' }
  ],
  policyoptimizer: [
    { id: 'taxRate', label: 'Corporate Tax Rate Target', min: 15, max: 35, step: 1, default: 22, unit: '%', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'benchmarkRate', label: 'Optimal Benchmark Rate', min: 4.0, max: 10.0, step: 0.25, default: 6.5, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'exportCredit', label: 'Export Tax Credit Incentive', min: 0, max: 15, step: 0.5, default: 7.5, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' }
  ],
  digitaleconomy: [
    { id: 'upiGrowth', label: 'Digital Payment Growth YoY', min: 20, max: 150, step: 5, default: 58, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'digitalGdp', label: 'Digital Sector GDP Target', min: 5, max: 25, step: 1, default: 11, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'cyberSpend', label: 'Fintech Cyber Security Pool', min: 0.5, max: 10, step: 0.5, default: 3.5, unit: ' $B', color: 'text-purple-400', accent: 'accent-purple-400' }
  ],
  sentimentanalyzer: [
    { id: 'newsSentiment', label: 'Media & Social Sentiment', min: -100, max: 100, step: 5, default: 58.9, unit: ' pts', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'instConf', label: 'Institutional Investor Score', min: 0, max: 100, step: 5, default: 60, unit: '/100', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'retailVol', label: 'Retail Order Book Volatility', min: 10, max: 90, step: 5, default: 32, unit: '%', color: 'text-amber-400', accent: 'accent-amber-400' }
  ],
  inflationimpact: [
    { id: 'foodCpi', label: 'Essential Food CPI Spike', min: 1.0, max: 15.0, step: 0.5, default: 4.8, unit: '%', color: 'text-rose-400', accent: 'accent-rose-400' },
    { id: 'energyTariff', label: 'Household Energy Tariff', min: 0, max: 40, step: 2, default: 14, unit: '%', color: 'text-amber-400', accent: 'accent-amber-400' },
    { id: 'wageIndex', label: 'Minimum Wage Indexation', min: 0, max: 15, step: 0.5, default: 5.5, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' }
  ],
  reformgenerator: [
    { id: 'clearanceSpeed', label: 'Single-Window Approval Speed', min: 1, max: 30, step: 1, default: 7, unit: ' Days', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'logisticsCost', label: 'Logistics GDP Cost Target', min: 6, max: 15, step: 0.5, default: 8.0, unit: '%', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'jobCreation', label: 'Mfg Job Expansion Target', min: 0.2, max: 3.0, step: 0.1, default: 1.2, unit: ' Million', color: 'text-purple-400', accent: 'accent-purple-400' }
  ],
  greenstability: [
    { id: 'renewables', label: 'Renewable Power Share', min: 10, max: 80, step: 2, default: 38, unit: '%', color: 'text-emerald-400', accent: 'accent-emerald-400' },
    { id: 'greenBonds', label: 'Sovereign Green Bond Issuance', min: 1, max: 25, step: 1, default: 5, unit: ' $B', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'importSavings', label: 'Fossil Import Reduction', min: 1, max: 20, step: 1, default: 9, unit: ' $B/yr', color: 'text-purple-400', accent: 'accent-purple-400' }
  ],
  governmentai: [
    { id: 'agentConsensus', label: 'Tri-Agency Consensus Level', min: 50, max: 99, step: 1, default: 85, unit: '%', color: 'text-purple-400', accent: 'accent-purple-400' },
    { id: 'fiscalSpend', label: 'Treasury CapEx Target', min: 1.0, max: 6.0, step: 0.1, default: 3.3, unit: '% of GDP', color: 'text-cyan-400', accent: 'accent-cyan-400' },
    { id: 'socialTransfer', label: 'Direct Welfare Support Pool', min: 1, max: 20, step: 1, default: 6, unit: ' $B', color: 'text-emerald-400', accent: 'accent-emerald-400' }
  ]
};

// Dynamic AI Engine to calculate analysis output based on user simulation values
function getDynamicModuleAnalysisReport(mod, sliderValues) {
  const baseReport = ACSB_MODULE_REPORTS[mod.id] || ACSB_MODULE_REPORTS.centralbankai;
  const controls = MODULE_SIMULATION_CONTROLS[mod.id] || MODULE_SIMULATION_CONTROLS.centralbankai;

  // Calculate normalized stress score (0 to 100) based on user slider positions relative to min & max
  let totalScore = 0;
  let count = 0;
  controls.forEach(ctrl => {
    const val = sliderValues[ctrl.id] !== undefined ? sliderValues[ctrl.id] : ctrl.default;
    const ratio = (val - ctrl.min) / (ctrl.max - ctrl.min || 1);
    totalScore += ratio;
    count++;
  });
  const avgRatio = count > 0 ? totalScore / count : 0.5;

  const ctrl1 = controls[0];
  const val1 = sliderValues[ctrl1.id] !== undefined ? sliderValues[ctrl1.id] : ctrl1.default;
  const ctrl2 = controls[1];
  const val2 = sliderValues[ctrl2.id] !== undefined ? sliderValues[ctrl2.id] : ctrl2.default;

  // HIGH STRESS SCENARIO (avgRatio > 0.65)
  if (avgRatio > 0.65) {
    return {
      badge: `HIGH STRESS ALERT (${Math.round(avgRatio * 100)}/100)`,
      statusClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      metrics: {
        current: `${val1}${ctrl1.unit}`,
        change: `+${(avgRatio * 2.5).toFixed(1)}% Emergency Hike`,
        text: 'High Risk Alert'
      },
      rationale: `Simulated Indian macroeconomic parameters indicate elevated pressure with ${ctrl1.label} reaching ${val1}${ctrl1.unit} and ${ctrl2.label} at ${val2}${ctrl2.unit}. Reserve Bank of India (RBI) intervention is required to buffer USD/INR liquidity and protect Rupee purchasing power.`,
      stance: 'RBI Emergency Macro Protection & Rupee Defense',
      problems: [
        `Elevated risk vector: ${ctrl1.label} (${val1}${ctrl1.unit}) exceeding safe baseline threshold.`,
        `Secondary cost transmission: ${ctrl2.label} (${val2}${ctrl2.unit}) threatening trade balance stability.`,
        'Foreign exchange volatility spike across Indian interbank trading desks (USD/INR spot).'
      ],
      forwardGuidance: `Reserve Bank of India (RBI) is deploying emergency foreign reserve buffers ($640B / ₹53 Lakh Cr) to stabilize ${mod.title} indicators and curb price volatility.`,
      assessment: {
        inflation: `High cost-pass-through risk elevating projected Indian CPI by +${(avgRatio * 4.2).toFixed(1)}% above 4.0% target.`,
        growth: `Indian GDP growth deceleration risk of -${(avgRatio * 1.5).toFixed(1)}% due to elevated input costs and credit tightening.`,
        employment: `Temporary payroll and hiring friction across domestic manufacturing and export sectors.`
      },
      risks: [
        `Rapid widening of sovereign current account deficit if ${ctrl1.label} remains elevated.`,
        'Increased capital outflow pressure on corporate foreign currency debt maturity schedules.',
        'Spike in short-term money market interbank repo lending rates.'
      ],
      actions: [
        `Action 1: RBI deploys $10 Billion (₹83,400 Cr) FX reserve liquidity to cushion ${ctrl1.label} shock.`,
        `Action 2: Conduct fine-tuning variable rate repo operations to keep Indian banking liquidity balanced.`,
        `Action 3: Provide targeted emergency working capital credit lines for key manufacturing importers.`,
        `Action 4: Issue clear RBI Monetary Policy Committee (MPC) guidance to anchor long-term price expectations.`
      ]
    };
  } 
  // LOW STRESS / HIGH OPTIMIZATION SCENARIO (avgRatio < 0.35)
  else if (avgRatio < 0.35) {
    return {
      badge: `OPTIMAL EXPANSION (${Math.round((1 - avgRatio) * 100)}/100)`,
      statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      metrics: {
        current: `${val1}${ctrl1.unit}`,
        change: `-${((1 - avgRatio) * 1.2).toFixed(1)}% Cost Relief`,
        text: 'Expansionary Growth'
      },
      rationale: `Simulation shows highly favorable structural conditions for the Indian economy with ${ctrl1.label} well-managed at ${val1}${ctrl1.unit} and ${ctrl2.label} at ${val2}${ctrl2.unit}. Indian GDP expansion can safely pivot toward digital CapEx, UPI internationalization, and export growth.`,
      stance: 'Proactive Indian Rupee Expansion & Growth Boost',
      problems: [
        `Minor operational lag in scaling up ${ctrl1.label} deployment across rural agricultural hubs.`,
        `Need to absorb strong FII capital inflows without triggering Rupee overvaluation.`,
        'Skill capacity bottlenecks in high-tech industrial manufacturing.'
      ],
      forwardGuidance: `Fiscal and monetary stance will prioritize Union Budget capital expenditure (₹11.1 Lakh Cr) and export capacity expansion while keeping inflation anchored.`,
      assessment: {
        inflation: `Indian CPI projected at a low, stable ${(2.0 + avgRatio * 2.0).toFixed(1)}%, staying safely within target band.`,
        growth: `Indian GDP expansion model forecasts strong +${(6.2 + (1 - avgRatio) * 1.8).toFixed(1)}% annual expansion.`,
        employment: `Surge in high-skilled job creation across digital, fintech, green energy, and manufacturing sectors.`
      },
      risks: [
        'Potential short-term asset bubble formation if excess liquidity is unhedged.',
        'Yield curve flattening due to heavy foreign institutional buying in Indian sovereign bonds.',
        'Global trade slowdown risks impacting export demand.'
      ],
      actions: [
        `Action 1: Accelerate Union Budget CapEx allocation for ${mod.title} infrastructure.`,
        `Action 2: Expand UPI & e-Rupee (CBDC) digital payment links with international trade partners.`,
        `Action 3: Fast-track GST tax credit refunds for manufacturing and IT service exporters.`,
        `Action 4: Accumulate RBI Foreign Exchange Reserves to lock in gains from strong FII capital inflows.`
      ]
    };
  } 
  // MODERATE BASELINE SCENARIO (0.35 - 0.65)
  else {
    return {
      ...baseReport,
      metrics: {
        current: `${val1}${ctrl1.unit}`,
        change: baseReport.metrics.change,
        text: baseReport.metrics.text
      },
      rationale: `Given current simulation settings (${ctrl1.label}: ${val1}${ctrl1.unit}, ${ctrl2.label}: ${val2}${ctrl2.unit}), ${baseReport.rationale}`
    };
  }
}

const ALL_MODULES_MOD = {
  id: 'all',
  title: 'All 18 AI Modules Combined',
  category: 'Master Sovereign Suite',
  desc: 'Unified multi-vector AI synthesis combining all 18 prediction engines.'
};

export default function AdvancedModules() {
  // Master Suite State (All 18 Modules Combined Top Section)
  const [masterIsGenerating, setMasterIsGenerating] = useState(false);
  const [masterHasGenerated, setMasterHasGenerated] = useState(false);
  const [masterReport, setMasterReport] = useState(null);
  const [masterSliderValues, setMasterSliderValues] = useState({});

  // Individual Modules State (Selected from 18 Individual Modules)
  const [selectedModule, setSelectedModule] = useState(ADVANCED_MODULES_LIST[0].id); // Default to Central Bank AI
  const [activeTabCategory, setActiveTabCategory] = useState('All');
  const [indivIsGenerating, setIndivIsGenerating] = useState(false);
  const [indivHasGenerated, setIndivHasGenerated] = useState(false);
  const [indivReport, setIndivReport] = useState(null);
  const [indivSliderValues, setIndivSliderValues] = useState({});

  const categories = ['All', 'Macro Model', 'Historical Replay', 'Stress Test', 'Monetary Policy', 'Tail Risk', 'Capital Tracker'];

  const filteredModules = activeTabCategory === 'All' 
    ? ADVANCED_MODULES_LIST 
    : ADVANCED_MODULES_LIST.filter(m => m.category === activeTabCategory);

  const currentMod = ADVANCED_MODULES_LIST.find(m => m.id === selectedModule) || ADVANCED_MODULES_LIST[0];

  const CurrentIcon = ICON_MAP[currentMod.id] || Cpu;
  const currentControls = MODULE_SIMULATION_CONTROLS[currentMod.id] || MODULE_SIMULATION_CONTROLS.centralbankai;
  const masterControls = MODULE_SIMULATION_CONTROLS.all;

  // Handler for Master AI Suite (Top Section)
  const handleGenerateMasterAnalysis = () => {
    setMasterIsGenerating(true);
    setTimeout(() => {
      const report = getDynamicModuleAnalysisReport(ALL_MODULES_MOD, masterSliderValues);
      setMasterReport(report);
      setMasterHasGenerated(true);
      setMasterIsGenerating(false);
    }, 900);
  };

  // Handler for Individual AI Module Section
  const handleGenerateIndivAnalysis = () => {
    setIndivIsGenerating(true);
    setTimeout(() => {
      const report = getDynamicModuleAnalysisReport(currentMod, indivSliderValues);
      setIndivReport(report);
      setIndivHasGenerated(true);
      setIndivIsGenerating(false);
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black text-white">AI Prediction & Analysis Tools</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Run the master 18-module prediction suite at the top, or test individual AI modules below to generate sovereign policy recommendations.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
          18 Active AI Modules
        </span>
      </div>

      {/* TOP SECTION: MASTER 18-MODULE AI PREDICTION SUITE (STANDALONE CARD AT VERY TOP) */}
      <div className="glass-card-purple p-6 md:p-8 space-y-6 border-2 border-purple-500/50 shadow-[0_0_35px_rgba(139,92,246,0.3)]">
        
        {/* Master Banner Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-purple-500/30 pb-5">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/40 to-cyan-500/40 text-cyan-300 border border-purple-400 shrink-0 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full bg-cyan-400 text-cyan-950 text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(0,242,254,0.4)]">
                  ⚡ MASTER AI PREDICTION SUITE
                </span>
                <span className="text-xs text-emerald-400 font-mono font-extrabold">18/18 Modules Combined</span>
              </div>
              <h2 className="text-xl font-black text-white">AI Prediction From All 18 Modules</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Run a unified multi-vector economic simulation synthesizing Monetary Policy, Digital Twin, Global Shock, Agri-Weather, Money Flow, Risk Sentinel, and all 18 prediction engines.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateMasterAnalysis}
            disabled={masterIsGenerating}
            className="btn-cyan text-sm py-3 px-7 justify-center shadow-[0_0_25px_rgba(0,242,254,0.45)] shrink-0 font-black"
          >
            {masterIsGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Running 18-Module AI Engine...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-cyan-950 fill-current" />
                Generate Master AI Analysis
              </>
            )}
          </button>
        </div>

        {/* MASTER SUITE SETUP SLIDERS (Before Generation) */}
        {!masterHasGenerated && !masterIsGenerating && (
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
                Integrated Sovereign Macro Stress Controls (All 18 Modules)
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Adjust values to calculate unified prediction</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {masterControls.map((ctrl) => {
                const val = masterSliderValues[ctrl.id] !== undefined ? masterSliderValues[ctrl.id] : ctrl.default;
                return (
                  <div key={ctrl.id} className="bg-slate-900/90 p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                      <span>{ctrl.label}</span>
                      <span className={`font-mono font-black ${ctrl.color}`}>{val}{ctrl.unit}</span>
                    </div>
                    <input
                      type="range"
                      min={ctrl.min}
                      max={ctrl.max}
                      step={ctrl.step}
                      value={val}
                      onChange={(e) => setMasterSliderValues({ ...masterSliderValues, [ctrl.id]: Number(e.target.value) })}
                      className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${ctrl.accent}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MASTER SUITE LOADING STATE */}
        {masterIsGenerating && (
          <div className="p-8 text-center space-y-3 bg-slate-950/70 rounded-2xl border border-purple-500/30">
            <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mx-auto"></div>
            <h3 className="text-sm font-extrabold text-white">Synthesizing predictions across all 18 AI modules...</h3>
            <p className="text-xs text-slate-400 font-mono">Evaluating monetary, fiscal, trade, and climate vectors</p>
          </div>
        )}

        {/* MASTER SUITE GENERATED REPORT */}
        {masterHasGenerated && !masterIsGenerating && masterReport && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-300">
            
            {/* Master Report Policy Recommendation Card */}
            <div className="bg-slate-950/90 p-6 rounded-2xl border border-purple-400/40 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-black text-white uppercase tracking-wider">
                    Master 18-Module Policy Synthesis Recommendation
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${masterReport.statusClass}`}>
                  {masterReport.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Current Macro Rate</div>
                  <div className="text-lg font-black font-mono-nums text-white">{masterReport.metrics.current}</div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Projected Expansion</div>
                  <div className="text-lg font-black font-mono-nums text-cyan-400">{masterReport.metrics.change}</div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Unified Stance</div>
                  <div className="text-xs font-extrabold text-purple-300 mt-1">{masterReport.stance}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-200 leading-relaxed">
                <span className="font-bold text-cyan-400">Integrated Rationale: </span>
                {masterReport.rationale}
              </div>
            </div>

            {/* Master Report Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Summary & Guidance */}
              <div className="bg-slate-950/90 p-6 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2">
                  Cross-Module Risk Observations
                </h4>
                <div className="space-y-2 text-xs">
                  {masterReport.problems.map((prob, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200 leading-relaxed font-medium">{prob}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1">
                  <div className="text-[11px] font-extrabold text-cyan-400 uppercase">Forward Steering Guidance</div>
                  <p className="text-xs text-slate-300 italic">"{masterReport.forwardGuidance}"</p>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="bg-slate-950/90 p-6 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/10 pb-2">
                  Unified Master Action Roadmap
                </h4>
                <div className="space-y-2 text-xs">
                  {masterReport.actions.map((actItem, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200 leading-relaxed font-semibold">{actItem}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>


      {/* SECOND SECTION: INDIVIDUAL AI MODULES (18 INDIVIDUAL MODULES) */}
      <div className="space-y-6 pt-4 border-t border-white/10">
        
        {/* Section Title & Filter Chips */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              Explore Individual AI Modules (18 Available)
            </h2>
            <p className="text-xs text-slate-400">Select any module below to run specialized domain predictions.</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTabCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTabCategory === cat
                    ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: 18 Modules Sidebar List vs Detailed Module Analysis Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Module Selector Sidebar List (4 Cols) - EXCLUSIVELY 18 INDIVIDUAL MODULES */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                AI Modules Selector ({filteredModules.length})
              </h3>
            </div>
            
            <div className="space-y-2 max-h-[850px] overflow-y-auto pr-1">
              {filteredModules.map((mod) => {
                const isSelected = selectedModule === mod.id;
                const ModIcon = ICON_MAP[mod.id] || Cpu;
                return (
                  <div
                    key={mod.id}
                    onClick={() => {
                      setSelectedModule(mod.id);
                      setIndivHasGenerated(false);
                      setIndivReport(null);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                        : 'bg-slate-900/80 border-white/10 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${
                        isSelected 
                          ? 'bg-purple-500 text-white border-purple-400' 
                          : 'bg-slate-800 text-purple-400 border-white/5 group-hover:bg-purple-500/10'
                      }`}>
                        <ModIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white group-hover:text-purple-300 transition-colors">
                          {mod.title}
                        </div>
                        <div className="text-[10px] text-slate-400">{mod.category}</div>
                      </div>
                    </div>

                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-purple-500/30 text-purple-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {mod.id === selectedModule ? (indivHasGenerated ? 'Generated' : 'Active') : 'Ready'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Module Analysis Workspace Inspector (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Module Banner with Generate CTA */}
            <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
                  <CurrentIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      {currentMod.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Node #9401</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{currentMod.title} Analysis Engine</h2>
                </div>
              </div>

              <button
                onClick={handleGenerateIndivAnalysis}
                disabled={indivIsGenerating}
                className="btn-cyan text-sm py-2.5 px-5 justify-center shadow-[0_0_20px_rgba(0,242,254,0.35)] shrink-0 font-extrabold"
              >
                {indivIsGenerating ? (
                  <>
                    <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                    Generating AI Analysis...
                  </>
                ) : (
                  <>
                    <Zap className="w-4.5 h-4.5 text-cyan-950 fill-current" />
                    Generate Analysis
                  </>
                )}
              </button>
            </div>

            {/* INITIAL PRE-ANALYSIS STATE (Before User Clicks Generate Analysis) */}
            {!indivHasGenerated && !indivIsGenerating && (
              <div className="glass-card p-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(139,92,246,0.25)]">
                    <CurrentIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-white">{currentMod.title} Setup</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Configure simulation indicators below and click <span className="text-cyan-400 font-bold">Generate Analysis</span> to calculate sovereign policy recommendations, risk assessments, and action plans.
                  </p>
                </div>

                {/* Module-Specific Simulation Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-2">
                  {currentControls.map((ctrl) => {
                    const val = indivSliderValues[ctrl.id] !== undefined ? indivSliderValues[ctrl.id] : ctrl.default;
                    return (
                      <div key={ctrl.id} className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-300 gap-1">
                          <span className="truncate" title={ctrl.label}>{ctrl.label}</span>
                          <span className={`font-mono font-black ${ctrl.color} shrink-0`}>
                            {val}{ctrl.unit}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={ctrl.min}
                          max={ctrl.max}
                          step={ctrl.step}
                          value={val}
                          onChange={(e) => setIndivSliderValues({ ...indivSliderValues, [ctrl.id]: Number(e.target.value) })}
                          className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${ctrl.accent}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Action Callout & Big CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={handleGenerateIndivAnalysis}
                    className="btn-cyan py-3.5 px-8 text-sm font-black mx-auto justify-center shadow-[0_0_25px_rgba(0,242,254,0.4)]"
                  >
                    <Zap className="w-5 h-5 text-cyan-950 fill-current" />
                    Generate {currentMod.title} Analysis
                  </button>
                </div>
              </div>
            )}

            {/* LOADING STATE DURING ANALYSIS GENERATION */}
            {indivIsGenerating && (
              <div className="glass-card p-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mx-auto"></div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">Running AI Prediction Engine...</h3>
                  <p className="text-xs text-slate-400 font-mono">Evaluating macro vectors for {currentMod.title}</p>
                </div>
              </div>
            )}

            {/* GENERATED ACSB MULTI-CARD ANALYSIS WORKSPACE */}
            {indivHasGenerated && !indivIsGenerating && indivReport && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* CARD 1: Key Policy Recommendation Header Banner */}
                <div className="glass-card-purple p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                        Policy Recommendation
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${indivReport.statusClass}`}>
                      {indivReport.badge}
                    </span>
                  </div>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Current Rate / Level</div>
                      <div className="text-lg font-black font-mono-nums text-white">{indivReport.metrics.current}</div>
                    </div>

                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Recommended Change</div>
                      <div className="text-lg font-black font-mono-nums text-cyan-400">{indivReport.metrics.change}</div>
                    </div>

                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Policy Stance</div>
                      <div className="text-sm font-bold text-purple-300 mt-1">{indivReport.stance}</div>
                    </div>
                  </div>

                  {/* Rationale Paragraph */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-200 leading-relaxed">
                    <span className="font-bold text-purple-400">Rationale: </span>
                    {indivReport.rationale}
                  </div>
                </div>

                {/* TWO COLUMN GRID: CARD 2 (MPC / Key Issues Summary) vs CARD 3 (Economic Assessment) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* CARD 2 (Left): Key Observations & Meeting Summary */}
                  <div className="glass-card p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-cyan-400" />
                          <h3 className="text-base font-bold text-white">Key Issues & Meeting Summary</h3>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                          Summary
                        </span>
                      </div>

                      {/* Numbered Points (1, 2, 3) */}
                      <div className="space-y-2.5 text-xs">
                        {indivReport.problems.map((prob, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                              {idx + 1}
                            </span>
                            <span className="text-slate-200 leading-relaxed font-medium">{prob}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Forward Guidance Box */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1 mt-4">
                      <div className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider">Forward Guidance</div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{indivReport.forwardGuidance}"
                      </p>
                    </div>
                  </div>

                  {/* CARD 3 (Right): Economic Assessment */}
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-purple-400" />
                        <h3 className="text-base font-bold text-white">Economic Assessment</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                        Outlook
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      
                      {/* Inflation Outlook Block */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                        <div className="font-extrabold text-cyan-400 uppercase tracking-wider text-[10px]">Inflation Outlook</div>
                        <p className="text-slate-300 leading-relaxed">{indivReport.assessment.inflation}</p>
                      </div>

                      {/* Growth Forecast Block */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                        <div className="font-extrabold text-emerald-400 uppercase tracking-wider text-[10px]">Growth Forecast</div>
                        <p className="text-slate-300 leading-relaxed">{indivReport.assessment.growth}</p>
                      </div>

                      {/* Employment Block */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                        <div className="font-extrabold text-purple-400 uppercase tracking-wider text-[10px]">Employment & Market</div>
                        <p className="text-slate-300 leading-relaxed">{indivReport.assessment.employment}</p>
                      </div>

                    </div>
                  </div>

                </div>

                {/* TWO COLUMN GRID: CARD 4 (Risk Assessment - Red) vs CARD 5 (Policy Response - Green) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* CARD 4: Identified Risk Assessment (Red Accent) */}
                  <div className="glass-card p-6 space-y-4 border-l-4 border-l-rose-500">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                        <h3 className="text-base font-bold text-white">Identified Risk Factors</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        Vulnerabilities
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {indivReport.risks.map((riskItem, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span className="text-slate-200 leading-relaxed font-medium">{riskItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CARD 5: Recommended Action Steps (Green Accent) */}
                  <div className="glass-card p-6 space-y-4 border-l-4 border-l-emerald-500">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-base font-bold text-white">Recommended Policy Steps</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        Action Steps
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {indivReport.actions.map((actItem, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-200 leading-relaxed font-semibold">{actItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
