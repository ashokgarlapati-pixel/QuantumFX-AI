// AI Currency Booster - Clear Data Provider with All 18 AI Modules & Indian Rupee (INR) Focus

export const CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', strength: 82.4, change: +1.2, sentiment: 'Strong Buy', centralBank: 'Reserve Bank of India (RBI)', rate: 6.50 },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', strength: 84.5, change: +1.4, sentiment: 'Strong Buy', centralBank: 'Federal Reserve', rate: 5.25 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', strength: 62.1, change: -0.8, sentiment: 'Neutral', centralBank: 'ECB', rate: 3.75 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', strength: 71.3, change: +0.6, sentiment: 'Buy', centralBank: 'Bank of England', rate: 5.00 },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', strength: 28.4, change: -1.9, sentiment: 'Weak / Sell', centralBank: 'Bank of Japan', rate: 0.25 },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', strength: 58.7, change: +0.2, sentiment: 'Neutral', centralBank: 'Reserve Bank of Australia', rate: 4.35 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', strength: 52.3, change: -0.4, sentiment: 'Neutral', centralBank: 'Bank of Canada', rate: 4.50 },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', strength: 79.1, change: +1.1, sentiment: 'Strong Buy', centralBank: 'Swiss National Bank', rate: 1.25 },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿', strength: 44.2, change: -0.9, sentiment: 'Sell', centralBank: 'Reserve Bank of New Zealand', rate: 5.25 }
];

export const PAIRS_TICKER = [
  { pair: 'USD/INR', price: 83.42, change: -0.15, changePct: -0.18, high: 83.65, low: 83.20, signal: 'Strong INR' },
  { pair: 'EUR/INR', price: 90.45, change: +0.22, changePct: +0.24, high: 90.80, low: 90.10, signal: 'Buy' },
  { pair: 'GBP/INR', price: 109.15, change: +0.45, changePct: +0.41, high: 109.60, low: 108.70, signal: 'Buy' },
  { pair: 'INR/JPY', price: 1.77, change: +0.02, changePct: +1.14, high: 1.79, low: 1.75, signal: 'Strong Buy' },
  { pair: 'EUR/USD', price: 1.0842, change: -0.0034, changePct: -0.31, high: 1.0885, low: 1.0820, signal: 'Sell' },
  { pair: 'GBP/USD', price: 1.3120, change: +0.0045, changePct: +0.34, high: 1.3155, low: 1.3075, signal: 'Buy' },
  { pair: 'USD/JPY', price: 147.85, change: +1.2500, changePct: +0.85, high: 148.10, low: 146.40, signal: 'Strong Buy' },
  { pair: 'AUD/USD', price: 0.6715, change: -0.0012, changePct: -0.18, high: 0.6740, low: 0.6695, signal: 'Sell' }
];

export const STOCKS_AND_CRYPTO = [
  { name: 'Nifty 50 India Index', symbol: 'NIFTY50', price: '₹25,840.50', change: '+0.85%', category: 'Indian Stock Index', signal: 'Strong Buy' },
  { name: 'BSE Sensex Index', symbol: 'SENSEX', price: '₹84,550.20', change: '+0.92%', category: 'Indian Stock Index', signal: 'Strong Buy' },
  { name: 'S&P 500 Stock Index', symbol: 'SPX', price: '5,620.40', change: '+0.75%', category: 'Stock Index', signal: 'Bullish' },
  { name: 'Nasdaq Tech Index', symbol: 'NDX', price: '19,850.10', change: '+1.12%', category: 'Stock Index', signal: 'Strong Buy' },
  { name: 'Gold Price (INR/10g)', symbol: 'XAU/INR', price: '₹75,420.00', change: '+0.64%', category: 'Commodity', signal: 'Strong Buy' },
  { name: 'Bitcoin', symbol: 'BTC/USD', price: '$64,250.00', change: '+3.42%', category: 'Crypto Asset', signal: 'Strong Buy' },
  { name: 'Crude Oil (UK Brent)', symbol: 'UKOIL', price: '$78.40', change: '-1.25%', category: 'Commodity', signal: 'Bearish' }
];

export const RECENT_NEWS = [
  { id: 1, title: 'RBI Policy: Repo Rate Kept at 6.5% to Anchor INR Exchange Stability', category: 'RBI Policy', time: '5m ago', sentiment: 'Strong INR', impact: 'High' },
  { id: 2, title: 'India Digital UPI Transactions Hit Record 117 Billion Annual Volume', category: 'Digital Rupee', time: '20m ago', sentiment: 'Bullish INR', impact: 'High' },
  { id: 3, title: 'India Forex Reserves Touch All-Time High of $640 Billion (₹53 Lakh Cr)', category: 'Rupee Reserves', time: '45m ago', sentiment: 'Strong INR', impact: 'High' },
  { id: 4, title: 'US Fed Hints at Rate Cuts, Boosting Emerging Market Currency Inflows', category: 'Central Bank', time: '1h ago', sentiment: 'Strong Rupee', impact: 'High' },
  { id: 5, title: 'Monsoon Harvest Yield Projections Keep Indian Food CPI Subdued at 4.2%', category: 'Agri-Economy', time: '2h ago', sentiment: 'Positive INR', impact: 'Medium' }
];

// Complete List of All 18 AI Modules from Base44
export const ADVANCED_MODULES_LIST = [
  { id: 'digitaltwin', title: 'Digital Twin', category: 'Macro Model', desc: 'Real-time digital simulation replica of the Indian national economy & balance of payments.' },
  { id: 'timemachine', title: 'Time Machine', category: 'Historical Replay', desc: 'Re-play market decisions during major historical crashes like 1997, 2008 & 2020.' },
  { id: 'globalshock', title: 'Global Shock', category: 'Stress Test', desc: 'Simulate crude oil import spikes, Rupee volatility, and global trade tariffs.' },
  { id: 'centralbankai', title: 'Central Bank AI', category: 'Monetary Policy', desc: 'Predict Reserve Bank of India (RBI) MPC interest rate decisions & Rupee stance.' },
  { id: 'blackswan', title: 'Black Swan', category: 'Tail Risk', desc: 'Early warning radar for sudden INR exchange rate drops and capital flight.' },
  { id: 'budgetstabilizer', title: 'Budget Stabilizer', category: 'Fiscal Engine', desc: 'Model Union Budget fiscal deficit trajectories under GST collections and CapEx.' },
  { id: 'risksentinel', title: 'Risk Sentinel', category: 'Risk Management', desc: 'Real-time multi-asset risk scoring engine across Rupee, bonds, Nifty, and Sensex.' },
  { id: 'shockabsorber', title: 'Shock Absorber', category: 'Buffer Simulator', desc: 'Simulate RBI $640B foreign exchange reserve buffer capacity against external shocks.' },
  { id: 'economicchain', title: 'Economic Chain', category: 'Supply Chain', desc: 'Map multi-sector Indian economic dependencies and cross-border trade flow impacts.' },
  { id: 'agriweather', title: 'Agri-Weather', category: 'Commodity FX', desc: 'Correlate Indian Monsoon rainfall variance with agricultural yield and food CPI.' },
  { id: 'moneyflow', title: 'Money Flow', category: 'Capital Tracker', desc: 'Track FII & FDI capital inflows into Indian sovereign bonds and domestic markets.' },
  { id: 'policyoptimizer', title: 'Policy Optimizer', category: 'Optimization', desc: 'Multi-objective Pareto optimization balancing Indian CPI inflation vs GDP growth.' },
  { id: 'digitaleconomy', title: 'Digital Economy', category: 'Tech Growth', desc: 'Simulate UPI payments surge, e-Rupee CBDC adoption, and digital trade revenue.' },
  { id: 'sentimentanalyzer', title: 'Sentiment Analyzer', category: 'NLP Sentiment', desc: 'Real-time NLP sentiment analysis across RBI speeches, financial news & Rupee sentiment.' },
  { id: 'inflationimpact', title: 'Inflation Impact', category: 'Price Index', desc: 'Predict Indian household basket price inflation under USD/INR exchange rate shifts.' },
  { id: 'reformgenerator', title: 'Reform Generator', category: 'Policy Planning', desc: 'AI-generated structural reform proposals for sustainable Indian economic expansion.' },
  { id: 'greenstability', title: 'Green Stability', category: 'ESG & Carbon', desc: 'Simulate green energy transition, Sovereign Green Bonds (₹), and carbon offset impacts.' },
  { id: 'governmentai', title: 'Government AI', category: 'Sovereign Advisor', desc: 'Multi-agent AI coordinating RBI Monetary, Treasury Fiscal, and Social Welfare policy.' }
];

export const WORKFLOWS = [
  { id: 'wf-1', name: 'Live USD/INR & Rupee Data Auto-Sync', schedule: 'Every 10 Seconds', status: 'Active', executions: '14,290 today', lastRun: 'Just now' },
  { id: 'wf-2', name: 'Rupee Exchange Rate Alert Engine', schedule: 'Continuous', status: 'Active', executions: '2,481 checks', lastRun: '2s ago' },
  { id: 'wf-3', name: 'RBI Macro Policy Shock Checker', schedule: 'Daily', status: 'Active', executions: '31 runs', lastRun: '4h ago' },
  { id: 'wf-4', name: 'Daily Sovereign Rupee Briefing Generator', schedule: 'Every 12 Hours', status: 'Active', executions: '12 briefings', lastRun: '12h ago' }
];

export const CRISIS_ALERTS = [
  { id: 'cr-1', type: 'USD/INR Volatility Warning', target: 'Indian Rupee (INR)', level: 'Monitored', message: 'USD/INR spot at ₹83.42. RBI fine-tuning repo facility active to support stability.', time: '5m ago' },
  { id: 'cr-2', type: 'Monsoon Harvest Supply Alert', target: 'Agri CPI Basket', level: 'Stable', message: 'Rainfall variance within +12% safety band. Food inflation projection stable at 4.2%.', time: '28m ago' },
  { id: 'cr-3', type: 'Forex Reserve Buffer Alert', target: 'RBI Reserve Fund', level: 'Strong Buffer', message: 'Sovereign foreign exchange reserves intact at $640 Billion (₹53 Lakh Crore).', time: '1h ago' }
];
