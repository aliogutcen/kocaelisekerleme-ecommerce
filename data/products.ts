// Kocaeli Şekerleme Ürün Verileri

export const products = {
  // TAHİN HELVALARı
  tahinHelvasi: {
    id: 1,
    name: "Geleneksel Tahin Helvası",
    isNew: false,
    subtitle: "El Yapımı, Taş Değirmende Öğütülmüş",
    category: "Helva",
    price: 149.90,
    oldPrice: 179.90,
    discount: 17,
    rating: 4.9,
    reviews: 312,
    sold: 4567,
    sku: "HLV-TAH-500",
    description: "1948'den beri aynı ustalıkla hazırladığımız geleneksel tahin helvamız. Taş değirmende öğütülmüş saf susamdan elde edilen tahinimiz ve özel şeker şerbetimizle, ustalarımızın maharetli elleriyle hazırlanır. Her lokması çocukluğunuzu hatırlatacak bu eşsiz lezzet, sofralarınızın vazgeçilmezi olacak.",
    features: [
      "Taş değirmende öğütülmüş susam tahini",
      "Geleneksel el çekme yöntemi",
      "Katkı maddesi içermez",
      "Doğal şeker kullanımı",
      "3 nesil ustalarımızın eseri",
      "Vakumlu özel ambalaj",
      "Oda sıcaklığında uzun süre tazeliğini korur",
      "Helal sertifikalı üretim"
    ],
    ingredients: "Tahin (%52), şeker (%48), doğal vanilya",
    usage: "Kahvaltıda, çay saatlerinde veya tatlı ihtiyacınızı karşılamak için tüketebilirsiniz. Ekmek üzerine sürülerek veya direkt olarak yenilebilir.",
    storage: "Serin ve kuru yerde saklayınız. Açıldıktan sonra ağzı kapalı olarak muhafaza ediniz. Buzdolabına koymayınız.",
    nutritionInfo: {
      serving: "100g",
      calories: "520",
      protein: "13",
      fat: "32",
      saturatedFat: "5.2",
      carbs: "48",
      sugar: "45",
      fiber: "3.5",
      salt: "0.02"
    },
    sizes: [
      { id: 1, size: "250g", price: 89.90, available: true },
      { id: 2, size: "500g", price: 149.90, available: true, popular: true },
      { id: 3, size: "1kg", price: 279.90, available: true }
    ]
  },

  fistikliHelva: {
    id: 2,
    name: "Antep Fıstıklı Tahin Helvası",
    isNew: true,
    subtitle: "Bol Fıstıklı Premium",
    category: "Helva",
    price: 199.90,
    oldPrice: 239.90,
    discount: 17,
    rating: 4.9,
    reviews: 187,
    sold: 2341,
    sku: "HLV-FST-500",
    description: "En kaliteli Antep fıstıklarıyla zenginleştirdiğimiz özel tahin helvamız. Geleneksel tarifimize sadık kalarak, bol miktarda taze Antep fıstığı ekleyerek hazırlıyoruz. Hem göze hem damağa hitap eden bu eşsiz lezzet, özel günlerinizin vazgeçilmezi olacak.",
    ingredients: "Tahin (%48), şeker (%42), Antep fıstığı (%10), doğal vanilya"
  },

  // YAZ HELVALARI
  yazHelvasi: {
    id: 3,
    name: "Geleneksel Yaz Helvası",
    isNew: false,
    subtitle: "Hafif ve Ferahlatıcı",
    category: "Helva",
    price: 129.90,
    oldPrice: 149.90,
    discount: 13,
    rating: 4.8,
    reviews: 234,
    sold: 3456,
    sku: "HLV-YAZ-400",
    description: "Yaz aylarının vazgeçilmez lezzeti, geleneksel yaz helvamız. Özel tarifimizle hazırlanan bu hafif helva, içerdiği limon tuzu sayesinde ferahlatıcı tadıyla damaklarınızda unutulmaz bir lezzet bırakır. Sıcak yaz günlerinde çay yanında idealdir.",
    features: [
      "Hafif ve gözenekli yapı",
      "Ferahlatıcı limon aroması",
      "Geleneksel Kocaeli tarifi",
      "El yapımı üretim",
      "Doğal içerikler",
      "Özel yazlık formül"
    ],
    ingredients: "Şeker (%65), su (%20), limon tuzu (%10), yumurta akı (%5)",
    usage: "Soğuk veya oda sıcaklığında servis ediniz. Çay ve kahve yanında idealdir. Buzdolabında saklayarak daha ferah bir tat elde edebilirsiniz.",
    storage: "Serin ve kuru yerde saklayınız. Yaz aylarında buzdolabında muhafaza edilmesi tavsiye edilir."
  },

  // TAHİNLER
  organikTahin: {
    id: 4,
    name: "Organik Susam Tahini",
    isNew: false,
    subtitle: "Taş Değirmende Öğütülmüş",
    category: "Tahin",
    price: 89.90,
    oldPrice: 109.90,
    discount: 18,
    rating: 4.9,
    reviews: 567,
    sold: 8901,
    sku: "TAH-ORG-350",
    description: "100% organik susamdan, geleneksel taş değirmenlerde öğütülen saf tahinimiz. Katkı maddesi, koruyucu ve tatlandırıcı içermez. Zengin vitamin ve mineral kaynağı olan tahinimiz, kahvaltılarınıza ve tatlılarınıza eşsiz bir lezzet katar.",
    features: [
      "100% organik susam",
      "Taş değirmende öğütülmüş",
      "Katkı maddesi yok",
      "Cam kavanozda taze paketleme",
      "Glütensiz ve vegan",
      "Zengin E vitamini kaynağı",
      "Omega-3 ve Omega-6 kaynağı",
      "Yüksek protein içeriği"
    ],
    sizes: [
      { id: 1, size: "350g", price: 89.90, available: true, popular: true },
      { id: 2, size: "600g", price: 149.90, available: true },
      { id: 3, size: "1kg", price: 229.90, available: true }
    ]
  },

  kepekliTahin: {
    id: 5,
    name: "Kepekli Susam Tahini",
    isNew: true,
    subtitle: "Lifli ve Besleyici",
    category: "Tahin",
    price: 94.90,
    oldPrice: 114.90,
    discount: 17,
    rating: 4.8,
    reviews: 234,
    sold: 3456,
    sku: "TAH-KEP-350",
    description: "Kepekli susamlardan ürettiğimiz, lif oranı yüksek özel tahinimiz. Sindirimi kolaylaştıran ve tok tutan özelliğiyle diyet yapanların tercihi. Geleneksel taş değirmende öğütülerek hazırlanır.",
    features: [
      "Yüksek lif içeriği",
      "Kepekli susam kullanımı",
      "Tok tutucu özellik",
      "Sindirim dostu",
      "Diyet uyumlu"
    ]
  },

  // LOKUMLAR
  gulluLokum: {
    id: 6,
    name: "Osmanlı Güllü Lokumu",
    isNew: false,
    subtitle: "Gerçek Gül Suyuyla",
    category: "Lokum",
    price: 94.90,
    oldPrice: 114.90,
    discount: 17,
    rating: 4.9,
    reviews: 423,
    sold: 6789,
    sku: "LKM-GUL-250",
    description: "Osmanlı saraylarından günümüze ulaşan geleneksel tarifimizle hazırlanan güllü lokumumuz. Gerçek gül suyu ve doğal gül aroması ile üretilir. Yumuşacık dokusu ve enfes aromasıyla damaklarınızda unutulmaz bir tat bırakır.",
    features: [
      "Gerçek Isparta gül suyu",
      "Doğal gül aroması",
      "Osmanlı saray tarifi",
      "El kesimi",
      "Pudra şekerli",
      "Yumuşak doku"
    ],
    ingredients: "Şeker, nişasta, gül suyu, doğal gül aroması, pudra şekeri",
    sizes: [
      { id: 1, size: "250g", price: 94.90, available: true },
      { id: 2, size: "500g", price: 179.90, available: true, popular: true },
      { id: 3, size: "1kg Özel Kutu", price: 349.90, available: true }
    ]
  },

  karisikLokum: {
    id: 7,
    name: "Karışık Lokum",
    isNew: false,
    subtitle: "7 Çeşit Bir Arada",
    category: "Lokum",
    price: 119.90,
    oldPrice: 139.90,
    discount: 14,
    rating: 4.8,
    reviews: 345,
    sold: 5678,
    sku: "LKM-KAR-500",
    description: "En sevilen lokum çeşitlerimizi bir araya getirdik. Gül, limon, portakal, nane, mastic, nar ve sade lokumlarımızın bulunduğu özel karışım. Hediye için ideal, her damak tadına uygun.",
    features: [
      "7 farklı lezzet",
      "Doğal aromalar",
      "Renkli ve şık sunum",
      "Hediye için ideal",
      "Özel ambalaj"
    ]
  },

  fistikliLokum: {
    id: 8,
    name: "Antep Fıstıklı Lokum",
    isNew: true,
    subtitle: "Bol Fıstıklı Premium",
    category: "Lokum",
    price: 189.90,
    oldPrice: 229.90,
    discount: 17,
    rating: 4.9,
    reviews: 289,
    sold: 4321,
    sku: "LKM-FST-250",
    description: "En kaliteli Antep fıstıklarıyla hazırlanan premium lokumumuz. Her lokmasında bol miktarda fıstık, yumuşacık lokum dokusu. Özel günleriniz ve hediyeleriniz için mükemmel seçim.",
    features: [
      "Premium Antep fıstığı",
      "El yapımı üretim",
      "Çift kaplı fıstık",
      "Özel hediye kutusu",
      "Lüks sunum"
    ]
  }
}

// İlgili ürünler için helper
export const getRelatedProducts = (currentProductId: number, category: string) => {
  const allProducts = Object.values(products)
  return allProducts
    .filter(p => p.id !== currentProductId && (p.category === category || Math.random() > 0.5))
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: "/hero.jpg",
      tag: p.isNew ? "YENİ" : undefined
    }))
}