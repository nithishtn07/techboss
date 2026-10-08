// Centralized Gadget specifications and catalog for Tech Hub & Comparisons
// Informational specs and real device data

export const GADGETS_DATA = [
  {
    id: "s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    category: "Smartphones",
    tier: "Flagship",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    rating: "4.9 / 5.0",
    priceEst: "₹1,29,999",
    verdict: "The absolute Android king with Snapdragon 8 Elite, anti-reflective Gorilla Armor glass, and S-Pen.",
    featured: true,
    specs: {
      display: "6.8\" Dynamic AMOLED 2X, 120Hz LTPO, 2600 nits, QHD+",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12GB / 16GB LPDDR5X",
      storage: "256GB / 512GB / 1TB UFS 4.0",
      camera: "200MP Main + 50MP Ultra-wide + 50MP 5x Telephoto + 10MP 3x Telephoto",
      battery: "5000 mAh Li-Ion",
      weight: "219 g",
      os: "One UI 7 (Android 15)",
      fastCharging: "45W Wired, 15W Wireless"
    }
  },
  {
    id: "iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max",
    category: "Smartphones",
    tier: "Flagship",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    rating: "4.9 / 5.0",
    priceEst: "₹1,44,900",
    verdict: "Class-leading 4K 120fps Dolby Vision video recording, dedicated Camera Control button, and titanium build.",
    featured: true,
    specs: {
      display: "6.9\" Super Retina XDR OLED, 120Hz ProMotion, 2000 nits",
      processor: "Apple A18 Pro (3nm)",
      ram: "8GB Unified Memory",
      storage: "256GB / 512GB / 1TB NVMe",
      camera: "48MP Fusion + 48MP Ultra-wide + 12MP 5x Tetraprism Telephoto",
      battery: "4685 mAh",
      weight: "227 g",
      os: "iOS 18 (Apple Intelligence)",
      fastCharging: "30W Wired, 25W MagSafe"
    }
  },
  {
    id: "oneplus-13",
    name: "OnePlus 13",
    category: "Smartphones",
    tier: "Flagship",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    rating: "4.8 / 5.0",
    priceEst: "₹69,999",
    verdict: "Unmatched battery endurance with massive 6000mAh silicon-carbon cell and 100W SuperVOOC charging.",
    featured: true,
    specs: {
      display: "6.82\" 2K BOE X2 Oriental OLED, 120Hz LTPO, 4500 nits peak",
      processor: "Qualcomm Snapdragon 8 Elite (3nm)",
      ram: "12GB / 16GB / 24GB LPDDR5X",
      storage: "256GB / 512GB / 1TB UFS 4.0",
      camera: "50MP Sony LYT-808 + 50MP Ultra-wide + 50MP 3x Periscope",
      battery: "6000 mAh Glacier Battery",
      weight: "213 g",
      os: "OxygenOS 15 (Android 15)",
      fastCharging: "100W Wired, 50W AIRVOOC Wireless"
    }
  },
  {
    id: "nothing-phone-2a-plus",
    name: "Nothing Phone (2a) Plus",
    category: "Smartphones",
    tier: "Mid-range",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    rating: "4.6 / 5.0",
    priceEst: "₹24,999",
    verdict: "Unique transparent aesthetic, clean bloat-free Nothing OS, and solid dual 50MP cameras for the price.",
    featured: false,
    specs: {
      display: "6.7\" Flexible AMOLED, 120Hz, 1300 nits peak, FHD+",
      processor: "MediaTek Dimensity 7350 Pro 5G (4nm)",
      ram: "8GB / 12GB LPDDR4X",
      storage: "256GB UFS 2.2",
      camera: "50MP Main (OIS) + 50MP Ultra-wide | 50MP Front",
      battery: "5000 mAh",
      weight: "190 g",
      os: "Nothing OS 2.6 (Android 14)",
      fastCharging: "50W Fast Charging"
    }
  },
  {
    id: "pixel-9-pro",
    name: "Google Pixel 9 Pro",
    category: "Smartphones",
    tier: "Camera",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: "4.7 / 5.0",
    priceEst: "₹1,09,999",
    verdict: "The purest Android experience with unmatched computational photography and Gemini Advanced built-in.",
    featured: false,
    specs: {
      display: "6.3\" Super Actua LTPO OLED, 120Hz, 3000 nits peak",
      processor: "Google Tensor G4 with Titan M2",
      ram: "16GB LPDDR5X",
      storage: "128GB / 256GB / 512GB / 1TB",
      camera: "50MP Octa PD Main + 48MP Quad PD Ultra-wide + 48MP 5x Telephoto",
      battery: "4700 mAh",
      weight: "199 g",
      os: "Clean Android 15 (7 Years Updates)",
      fastCharging: "27W Wired, 21W Wireless"
    }
  },
  {
    id: "asus-rog-phone-9",
    name: "ASUS ROG Phone 9 Pro",
    category: "Smartphones",
    tier: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    rating: "4.8 / 5.0",
    priceEst: "₹94,999",
    verdict: "Hardcore mobile gaming powerhouse with 185Hz display, AniMe Vision mini-LED rear matrix, and active cooling.",
    featured: false,
    specs: {
      display: "6.78\" FHD+ Samsung E6 AMOLED, 185Hz Refresh, 2500 nits",
      processor: "Qualcomm Snapdragon 8 Elite (3nm)",
      ram: "16GB / 24GB LPDDR5X",
      storage: "512GB / 1TB UFS 4.0",
      camera: "50MP Sony Lytia 700 + 13MP Ultra-wide + 32MP 3x Telephoto",
      battery: "5800 mAh Quick Charge 5.0",
      weight: "227 g",
      os: "ROG UI (Android 15)",
      fastCharging: "65W HyperCharge, 15W Qi Wireless"
    }
  },
  {
    id: "macbook-pro-16-m4",
    name: "MacBook Pro 16\" (M4 Max)",
    category: "Laptops",
    tier: "Creator",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    rating: "4.9 / 5.0",
    priceEst: "₹3,49,900",
    verdict: "Unprecedented rendering speeds for 8K video timelines in DaVinci Resolve and silent thermal efficiency.",
    featured: true,
    specs: {
      display: "16.2\" Liquid Retina XDR, 1600 nits peak, 120Hz ProMotion",
      processor: "Apple M4 Max (16-core CPU, 40-core GPU, 16-core Neural Engine)",
      ram: "36GB / 48GB / 128GB Unified Memory",
      storage: "1TB / 2TB / 4TB / 8TB SSD (Up to 7.4GB/s)",
      camera: "12MP Center Stage Camera with Desk View",
      battery: "100Wh (Up to 24 hours battery life)",
      weight: "2.14 kg",
      os: "macOS Sequoia",
      fastCharging: "140W USB-C MagSafe 3"
    }
  },
  {
    id: "rog-zephyrus-g16",
    name: "ASUS ROG Zephyrus G16 (2025)",
    category: "Laptops",
    tier: "Gaming",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    rating: "4.8 / 5.0",
    priceEst: "₹2,19,990",
    verdict: "Sleek aluminum CNC unibody with 2.5K 240Hz OLED and RTX 4080 in an ultra-portable chassis.",
    featured: false,
    specs: {
      display: "16\" 2.5K (2560x1600) ROG Nebula OLED, 240Hz 0.2ms, G-SYNC",
      processor: "Intel Core Ultra 9 185H / AMD Ryzen AI 9 HX 370",
      ram: "32GB LPDDR5X-7467",
      storage: "1TB / 2TB PCIe 4.0 NVMe M.2",
      camera: "1080p FHD IR Camera with Windows Hello",
      battery: "90Wh (Up to 10 hours productivity)",
      weight: "1.85 kg",
      os: "Windows 11 Home",
      fastCharging: "240W AC Adapter, 100W USB-C PD"
    }
  },
  {
    id: "dell-xps-14",
    name: "Dell XPS 14 (9440)",
    category: "Laptops",
    tier: "Student",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    rating: "4.5 / 5.0",
    priceEst: "₹1,74,990",
    verdict: "Futuristic zero-lattice keyboard, seamless glass haptic trackpad, and vivid 3.2K OLED touchscreen.",
    featured: false,
    specs: {
      display: "14.5\" 3.2K (3200x2000) OLED Touch, 120Hz, 400 nits",
      processor: "Intel Core Ultra 7 155H (16 Cores, 22 Threads)",
      ram: "16GB / 32GB LPDDR5X",
      storage: "512GB / 1TB PCIe 4.0 SSD",
      camera: "1080p Webcam with dual digital mic array",
      battery: "69.5Wh (Up to 12 hours web browsing)",
      weight: "1.68 kg",
      os: "Windows 11 Home",
      fastCharging: "60W / 100W USB-C Type-C"
    }
  }
];

export const AI_TOOLS_DATA = [
  {
    id: "ai-tool-1",
    name: "DeepSeek-R1 / V3",
    category: "AI Coding & Reasoning",
    description: "Open-weights reasoning frontier model rivaling OpenAI o1 at a fraction of the inference compute cost.",
    tag: "Open Source",
    freeTier: "100% Free / Local Ollama",
    link: "https://deepseek.com",
    badge: "Trending"
  },
  {
    id: "ai-tool-2",
    name: "Claude 3.7 Sonnet",
    category: "AI Writing & Logic",
    description: "Hybrid fast and extended reasoning model excelling at nuanced coding, long document comprehension, and writing.",
    tag: "Cloud AI",
    freeTier: "Free Tier Available",
    link: "https://claude.ai",
    badge: "Best for Code"
  },
  {
    id: "ai-tool-3",
    name: "Midjourney v6.1",
    category: "AI Image Generation",
    description: "Photorealistic imagery generation with hyper-detailed skin textures, accurate lighting, and typography.",
    tag: "Creative",
    freeTier: "Subscription Only",
    link: "https://midjourney.com",
    badge: "Visual Leader"
  },
  {
    id: "ai-tool-4",
    name: "ElevenLabs Voice AI",
    category: "Voice & Speech Synthesis",
    description: "Natural voice cloning and emotion-aware multilingual speech generator with high fidelity Tamil accent support.",
    tag: "Audio",
    freeTier: "10,000 Free Credits/Mo",
    link: "https://elevenlabs.io",
    badge: "Tamil Audio"
  },
  {
    id: "ai-tool-5",
    name: "Perplexity AI",
    category: "AI Search & Research",
    description: "Direct conversational answers with real-time web citations, academic filtering, and computational search.",
    tag: "Search",
    freeTier: "Free Tier Available",
    link: "https://perplexity.ai",
    badge: "Essential"
  },
  {
    id: "ai-tool-6",
    name: "Cursor AI",
    category: "AI Developer Tool",
    description: "Next-generation VS Code fork built around model context protocol, multi-file edits, and agentic workflows.",
    tag: "Developer",
    freeTier: "Free Trial Available",
    link: "https://cursor.com",
    badge: "Top Pick"
  }
];
