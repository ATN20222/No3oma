/**
 * Seed data for the admin dashboard.
 *
 * Shapes here are the contract the backend must return — see `./api.js` for the
 * endpoint each one feeds. Product records mirror `src/data/products.js` and add
 * the operational fields (sku, stock, cost, status, audit timestamps) that a
 * real catalogue API needs.
 */

export const seedProducts = [
  {
    "id": 1,
    "sku": "N3-BED-1001",
    "name": "مجموعة فراش قطن مصري فاخر",
    "nameEn": "Luxury Egyptian Cotton Bed Set",
    "category": "bedSets",
    "price": 2890,
    "oldPrice": 3490,
    "cost": 1449.0,
    "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.8,
    "reviewCount": 126,
    "discount": 17,
    "isNew": false,
    "stock": 0,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#F2EDE4",
      "#D8CBB4"
    ],
    "sizes": [
      "90×200",
      "140×200"
    ],
    "weight": 5.4,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "cotton",
      "premium"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-01"
  },
  {
    "id": 2,
    "sku": "N3-BED-1002",
    "name": "ملاءات قطن ناعمة بدرجة 400",
    "nameEn": "Soft 400-Thread Cotton Sheets",
    "category": "bedSheets",
    "price": 1390,
    "oldPrice": 1690,
    "cost": 815.0,
    "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.7,
    "reviewCount": 94,
    "discount": 18,
    "isNew": false,
    "stock": 4,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#EFE3D2",
      "#D9C3A5"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200"
    ],
    "weight": 4.8,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-03"
  },
  {
    "id": 3,
    "sku": "N3-BLA-1003",
    "name": "بطانية شتوية صوفية دافئة",
    "nameEn": "Warm Wool Winter Blanket",
    "category": "blankets",
    "price": 1690,
    "oldPrice": null,
    "cost": 864.0,
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.9,
    "reviewCount": 61,
    "discount": 0,
    "isNew": true,
    "stock": 12,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#F5EFE4",
      "#BFCBC4"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200",
      "180×200"
    ],
    "weight": 5.6,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-05"
  },
  {
    "id": 4,
    "sku": "N3-PIL-1004",
    "name": "وسائد ميكروفايبر فاخرة (قطعة)",
    "nameEn": "Microfibre Pillow Pair",
    "category": "pillows",
    "price": 780,
    "oldPrice": 980,
    "cost": 354.0,
    "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.6,
    "reviewCount": 210,
    "discount": 20,
    "isNew": false,
    "stock": 48,
    "reorderPoint": 8,
    "status": "draft",
    "colors": [
      "#E7E1D4",
      "#C9B79A"
    ],
    "sizes": [
      "90×200",
      "140×200"
    ],
    "weight": 5.1,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "cotton",
      "premium"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-07"
  },
  {
    "id": 5,
    "sku": "N3-COV-1005",
    "name": "أغطية فراش ساتان بلمسة مخملية",
    "nameEn": "Velvet-Touch Satin Bed Covers",
    "category": "covers",
    "price": 1890,
    "oldPrice": null,
    "cost": 1008.0,
    "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.8,
    "reviewCount": 78,
    "discount": 0,
    "isNew": true,
    "stock": 76,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#F2EDE4",
      "#D8CBB4"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200"
    ],
    "weight": 7.1,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-09"
  },
  {
    "id": 6,
    "sku": "N3-BED-1006",
    "name": "طقم فراش كامل 6 قطع",
    "nameEn": "Complete 6-Piece Bedding Set",
    "category": "bedding",
    "price": 3190,
    "oldPrice": 3790,
    "cost": 1394.0,
    "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.9,
    "reviewCount": 143,
    "discount": 16,
    "isNew": false,
    "stock": 3,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#EFE3D2",
      "#D9C3A5"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200",
      "180×200"
    ],
    "weight": 3.6,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-11"
  },
  {
    "id": 7,
    "sku": "N3-BED-1007",
    "name": "سرير خشب بإطار تنجيد",
    "nameEn": "Upholstered Wooden Bed Frame",
    "category": "beds",
    "price": 12900,
    "oldPrice": 14500,
    "cost": 5629.0,
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.7,
    "reviewCount": 34,
    "discount": 11,
    "isNew": false,
    "stock": 25,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#F5EFE4",
      "#BFCBC4"
    ],
    "sizes": [
      "90×200",
      "140×200"
    ],
    "weight": 7.2,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "cotton",
      "premium"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-13"
  },
  {
    "id": 8,
    "sku": "N3-SHE-1008",
    "name": "مجموعة ملاءات 4 قطع",
    "nameEn": "4-Piece Sheet Set",
    "category": "sheetSets",
    "price": 1590,
    "oldPrice": null,
    "cost": 866.0,
    "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.5,
    "reviewCount": 57,
    "discount": 0,
    "isNew": false,
    "stock": 61,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#E7E1D4",
      "#C9B79A"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200"
    ],
    "weight": 1.8,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-15"
  },
  {
    "id": 9,
    "sku": "N3-BED-1009",
    "name": "منسوجات غرفة نوم مطرزة",
    "nameEn": "Embroidered Bedroom Textiles",
    "category": "bedroomTextiles",
    "price": 890,
    "oldPrice": null,
    "cost": 531.0,
    "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.6,
    "reviewCount": 41,
    "discount": 0,
    "isNew": true,
    "stock": 9,
    "reorderPoint": 8,
    "status": "draft",
    "colors": [
      "#F2EDE4",
      "#D8CBB4"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200",
      "180×200"
    ],
    "weight": 8.3,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-17"
  },
  {
    "id": 10,
    "sku": "N3-BED-1010",
    "name": "مفارش قطن مطبوعة",
    "nameEn": "Printed Cotton Quilts",
    "category": "bedding",
    "price": 2190,
    "oldPrice": null,
    "cost": 1178.0,
    "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.7,
    "reviewCount": 88,
    "discount": 12,
    "isNew": false,
    "stock": 33,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#EFE3D2",
      "#D9C3A5"
    ],
    "sizes": [
      "90×200",
      "140×200"
    ],
    "weight": 5.8,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "cotton",
      "premium"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-19"
  },
  {
    "id": 11,
    "sku": "N3-PIL-1011",
    "name": "وسادة ظهر ميموري فوم",
    "nameEn": "Memory Foam Back Cushion",
    "category": "pillows",
    "price": 620,
    "oldPrice": null,
    "cost": 278.0,
    "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.4,
    "reviewCount": 152,
    "discount": 0,
    "isNew": false,
    "stock": 0,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#F5EFE4",
      "#BFCBC4"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200"
    ],
    "weight": 1.6,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-21"
  },
  {
    "id": 12,
    "sku": "N3-BLA-1012",
    "name": "بطانية صيفية خفيفة",
    "nameEn": "Lightweight Summer Blanket",
    "category": "blankets",
    "price": 990,
    "oldPrice": null,
    "cost": 510.0,
    "image": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80"
    ],
    "rating": 4.5,
    "reviewCount": 66,
    "discount": 15,
    "isNew": true,
    "stock": 17,
    "reorderPoint": 8,
    "status": "active",
    "colors": [
      "#E7E1D4",
      "#C9B79A"
    ],
    "sizes": [
      "90×200",
      "140×200",
      "160×200",
      "180×200"
    ],
    "weight": 1.9,
    "dimensions": "120 × 90 × 25 cm",
    "tags": [
      "everyday"
    ],
    "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
    "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
    "updatedAt": "2026-09-23"
  }
];

export const seedCategories = [
  {
    "id": "beds",
    "name": "الفراش",
    "nameEn": "Beds",
    "blurb": "أسِرّة بإطارات خشب ومقاسات مختلفة",
    "blurbEn": "Wooden frames in every size",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "bedSheets",
    "name": "الملاءات",
    "nameEn": "Bed Sheets",
    "blurb": "قطن ناعم يتنفس طوال الليل",
    "blurbEn": "Breathable, soft cotton",
    "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "sheetSets",
    "name": "مجموعات الملاءات",
    "nameEn": "Sheet Sets",
    "blurb": "كل ما تحتاجه في عبوة واحدة",
    "blurbEn": "Everything in one box",
    "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "bedding",
    "name": "الفراش والمفارش",
    "nameEn": "Bedding",
    "blurb": "مفارش وأغطية لغرف نوم هادئة",
    "blurbEn": "Quilts and covers for calm rooms",
    "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "bedSets",
    "name": "مجموعات الفراش",
    "nameEn": "Bed Sets",
    "blurb": "أطقم كاملة بأسعار واضحة",
    "blurbEn": "Complete sets, clear pricing",
    "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "covers",
    "name": "الأغطية",
    "nameEn": "Covers",
    "blurb": "ساتان ومخمل بلمسة راقية",
    "blurbEn": "Satin and velvet finishes",
    "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "blankets",
    "name": "البطانيات",
    "nameEn": "Blankets",
    "blurb": "دفء الشتاء وخفة الصيف",
    "blurbEn": "Winter warmth, summer light",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "pillows",
    "name": "الوسائد",
    "nameEn": "Pillows",
    "blurb": "دعم مريح لرأس وظهر",
    "blurbEn": "Support for head and back",
    "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=700&q=80"
  },
  {
    "id": "bedroomTextiles",
    "name": "منسوجات الغرفة",
    "nameEn": "Bedroom Textiles",
    "blurb": "لمسات نهائية منسّجة بعناية",
    "blurbEn": "Finishing touches, carefully woven",
    "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=700&q=80"
  }
];

export const seedOrders = [
  {
    "id": 5000,
    "number": "N3-10240",
    "customerId": 1,
    "customerName": "أحمد الشناوي",
    "customerEmail": "user1@example.com",
    "phone": "+20 103 347 1492",
    "city": "القاهرة",
    "cityEn": "Cairo",
    "address": "١٥ شارع النيل، الدور 7",
    "items": [
      {
        "productId": 8,
        "name": "مجموعة ملاءات 4 قطع",
        "nameEn": "4-Piece Sheet Set",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
        "price": 1590,
        "qty": 3,
        "color": "#E7E1D4",
        "size": "160×200"
      },
      {
        "productId": 4,
        "name": "وسائد ميكروفايبر فاخرة (قطعة)",
        "nameEn": "Microfibre Pillow Pair",
        "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
        "price": 780,
        "qty": 3,
        "color": "#C9B79A",
        "size": "140×200"
      },
      {
        "productId": 1,
        "name": "مجموعة فراش قطن مصري فاخر",
        "nameEn": "Luxury Egyptian Cotton Bed Set",
        "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        "price": 2890,
        "qty": 3,
        "color": "#F2EDE4",
        "size": "140×200"
      }
    ],
    "subtotal": 15780,
    "shipping": 0,
    "discount": 0,
    "total": 15780,
    "currency": "EGP",
    "paymentMethod": "cod",
    "status": "delivered",
    "date": "2026-09-20T14:00:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-20T14:00:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-20T17:00:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5001,
    "number": "N3-10241",
    "customerId": 2,
    "customerName": "سارة محمود",
    "customerEmail": "user2@example.com",
    "phone": "+20 108 960 2363",
    "city": "الجيزة",
    "cityEn": "Giza",
    "address": "١٥ شارع النيل، الدور 1",
    "items": [
      {
        "productId": 6,
        "name": "طقم فراش كامل 6 قطع",
        "nameEn": "Complete 6-Piece Bedding Set",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "price": 3190,
        "qty": 1,
        "color": "#D9C3A5",
        "size": "90×200"
      },
      {
        "productId": 2,
        "name": "ملاءات قطن ناعمة بدرجة 400",
        "nameEn": "Soft 400-Thread Cotton Sheets",
        "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "price": 1390,
        "qty": 3,
        "color": "#EFE3D2",
        "size": "140×200"
      },
      {
        "productId": 2,
        "name": "ملاءات قطن ناعمة بدرجة 400",
        "nameEn": "Soft 400-Thread Cotton Sheets",
        "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "price": 1390,
        "qty": 2,
        "color": "#D9C3A5",
        "size": "90×200"
      }
    ],
    "subtotal": 10140,
    "shipping": 0,
    "discount": 0,
    "total": 10140,
    "currency": "EGP",
    "paymentMethod": "card",
    "status": "processing",
    "date": "2026-09-21T19:36:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-21T19:36:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-21T22:36:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5002,
    "number": "N3-10242",
    "customerId": 3,
    "customerName": "محمد عبدالله",
    "customerEmail": "user3@example.com",
    "phone": "+20 103 314 1857",
    "city": "الإسكندرية",
    "cityEn": "Alexandria",
    "address": "١٥ شارع النيل، الدور 2",
    "items": [
      {
        "productId": 12,
        "name": "بطانية صيفية خفيفة",
        "nameEn": "Lightweight Summer Blanket",
        "image": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
        "price": 990,
        "qty": 2,
        "color": "#C9B79A",
        "size": "90×200"
      },
      {
        "productId": 10,
        "name": "مفارش قطن مطبوعة",
        "nameEn": "Printed Cotton Quilts",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "price": 2190,
        "qty": 3,
        "color": "#EFE3D2",
        "size": "140×200"
      },
      {
        "productId": 6,
        "name": "طقم فراش كامل 6 قطع",
        "nameEn": "Complete 6-Piece Bedding Set",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "price": 3190,
        "qty": 1,
        "color": "#D9C3A5",
        "size": "160×200"
      },
      {
        "productId": 1,
        "name": "مجموعة فراش قطن مصري فاخر",
        "nameEn": "Luxury Egyptian Cotton Bed Set",
        "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        "price": 2890,
        "qty": 2,
        "color": "#F2EDE4",
        "size": "90×200"
      }
    ],
    "subtotal": 17520,
    "shipping": 0,
    "discount": 0,
    "total": 17520,
    "currency": "EGP",
    "paymentMethod": "wallet",
    "status": "shipped",
    "date": "2026-09-23T08:12:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-23T08:12:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-23T11:12:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5003,
    "number": "N3-10243",
    "customerId": 4,
    "customerName": "نور حسن",
    "customerEmail": "user4@example.com",
    "phone": "+20 100 161 8617",
    "city": "المنصورة",
    "cityEn": "Mansoura",
    "address": "١٥ شارع النيل، الدور 2",
    "items": [
      {
        "productId": 11,
        "name": "وسادة ظهر ميموري فوم",
        "nameEn": "Memory Foam Back Cushion",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "price": 620,
        "qty": 3,
        "color": "#F5EFE4",
        "size": "140×200"
      },
      {
        "productId": 9,
        "name": "منسوجات غرفة نوم مطرزة",
        "nameEn": "Embroidered Bedroom Textiles",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
        "price": 890,
        "qty": 1,
        "color": "#F2EDE4",
        "size": "180×200"
      }
    ],
    "subtotal": 2750,
    "shipping": 75,
    "discount": 0,
    "total": 2825,
    "currency": "EGP",
    "paymentMethod": "bank",
    "status": "pending",
    "date": "2026-09-24T20:48:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-24T20:48:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-24T23:48:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5004,
    "number": "N3-10244",
    "customerId": 5,
    "customerName": "خالد عمر",
    "customerEmail": "user5@example.com",
    "phone": "+20 106 530 4487",
    "city": "أسيوط",
    "cityEn": "Assiut",
    "address": "١٥ شارع النيل، الدور 6",
    "items": [
      {
        "productId": 10,
        "name": "مفارش قطن مطبوعة",
        "nameEn": "Printed Cotton Quilts",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "price": 2190,
        "qty": 2,
        "color": "#EFE3D2",
        "size": "90×200"
      },
      {
        "productId": 3,
        "name": "بطانية شتوية صوفية دافئة",
        "nameEn": "Warm Wool Winter Blanket",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
        "price": 1690,
        "qty": 2,
        "color": "#F5EFE4",
        "size": "90×200"
      },
      {
        "productId": 3,
        "name": "بطانية شتوية صوفية دافئة",
        "nameEn": "Warm Wool Winter Blanket",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
        "price": 1690,
        "qty": 1,
        "color": "#BFCBC4",
        "size": "160×200"
      }
    ],
    "subtotal": 9450,
    "shipping": 0,
    "discount": 0,
    "total": 9450,
    "currency": "EGP",
    "paymentMethod": "cod",
    "status": "cancelled",
    "date": "2026-09-26T00:24:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-26T00:24:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-26T03:24:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5005,
    "number": "N3-10245",
    "customerId": 6,
    "customerName": "مريم السيد",
    "customerEmail": "user6@example.com",
    "phone": "+20 104 495 2202",
    "city": "طنطا",
    "cityEn": "Tanta",
    "address": "١٥ شارع النيل، الدور 6",
    "items": [
      {
        "productId": 4,
        "name": "وسائد ميكروفايبر فاخرة (قطعة)",
        "nameEn": "Microfibre Pillow Pair",
        "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
        "price": 780,
        "qty": 3,
        "color": "#E7E1D4",
        "size": "90×200"
      }
    ],
    "subtotal": 2340,
    "shipping": 75,
    "discount": 0,
    "total": 2415,
    "currency": "EGP",
    "paymentMethod": "card",
    "status": "delivered",
    "date": "2026-09-27T15:00:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-27T15:00:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-27T18:00:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5006,
    "number": "N3-10246",
    "customerId": 7,
    "customerName": "يوسف فتحي",
    "customerEmail": "user7@example.com",
    "phone": "+20 109 564 3084",
    "city": "القاهرة",
    "cityEn": "Cairo",
    "address": "١٥ شارع النيل، الدور 2",
    "items": [
      {
        "productId": 10,
        "name": "مفارش قطن مطبوعة",
        "nameEn": "Printed Cotton Quilts",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "price": 2190,
        "qty": 1,
        "color": "#D9C3A5",
        "size": "90×200"
      },
      {
        "productId": 11,
        "name": "وسادة ظهر ميموري فوم",
        "nameEn": "Memory Foam Back Cushion",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "price": 620,
        "qty": 1,
        "color": "#BFCBC4",
        "size": "90×200"
      },
      {
        "productId": 10,
        "name": "مفارش قطن مطبوعة",
        "nameEn": "Printed Cotton Quilts",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "price": 2190,
        "qty": 1,
        "color": "#EFE3D2",
        "size": "90×200"
      },
      {
        "productId": 12,
        "name": "بطانية صيفية خفيفة",
        "nameEn": "Lightweight Summer Blanket",
        "image": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
        "price": 990,
        "qty": 3,
        "color": "#E7E1D4",
        "size": "180×200"
      }
    ],
    "subtotal": 7970,
    "shipping": 0,
    "discount": 0,
    "total": 7970,
    "currency": "EGP",
    "paymentMethod": "wallet",
    "status": "shipped",
    "date": "2026-09-29T02:36:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-29T02:36:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-29T05:36:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5007,
    "number": "N3-10247",
    "customerId": 8,
    "customerName": "ليلى زكي",
    "customerEmail": "user8@example.com",
    "phone": "+20 106 148 2701",
    "city": "الجيزة",
    "cityEn": "Giza",
    "address": "١٥ شارع النيل، الدور 7",
    "items": [
      {
        "productId": 9,
        "name": "منسوجات غرفة نوم مطرزة",
        "nameEn": "Embroidered Bedroom Textiles",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
        "price": 890,
        "qty": 2,
        "color": "#F2EDE4",
        "size": "180×200"
      }
    ],
    "subtotal": 1780,
    "shipping": 75,
    "discount": 0,
    "total": 1855,
    "currency": "EGP",
    "paymentMethod": "bank",
    "status": "processing",
    "date": "2026-09-30T09:12:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-09-30T09:12:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-09-30T12:12:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5008,
    "number": "N3-10248",
    "customerId": 9,
    "customerName": "عمر المنسي",
    "customerEmail": "user9@example.com",
    "phone": "+20 109 602 5807",
    "city": "الإسكندرية",
    "cityEn": "Alexandria",
    "address": "١٥ شارع النيل، الدور 4",
    "items": [
      {
        "productId": 12,
        "name": "بطانية صيفية خفيفة",
        "nameEn": "Lightweight Summer Blanket",
        "image": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
        "price": 990,
        "qty": 1,
        "color": "#E7E1D4",
        "size": "140×200"
      },
      {
        "productId": 8,
        "name": "مجموعة ملاءات 4 قطع",
        "nameEn": "4-Piece Sheet Set",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
        "price": 1590,
        "qty": 3,
        "color": "#E7E1D4",
        "size": "140×200"
      }
    ],
    "subtotal": 5760,
    "shipping": 0,
    "discount": 0,
    "total": 5760,
    "currency": "EGP",
    "paymentMethod": "cod",
    "status": "delivered",
    "date": "2026-10-01T17:48:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-01T17:48:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-01T20:48:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5009,
    "number": "N3-10249",
    "customerId": 10,
    "customerName": "هدى خالد",
    "customerEmail": "user10@example.com",
    "phone": "+20 100 170 5410",
    "city": "المنصورة",
    "cityEn": "Mansoura",
    "address": "١٥ شارع النيل، الدور 1",
    "items": [
      {
        "productId": 4,
        "name": "وسائد ميكروفايبر فاخرة (قطعة)",
        "nameEn": "Microfibre Pillow Pair",
        "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
        "price": 780,
        "qty": 1,
        "color": "#E7E1D4",
        "size": "90×200"
      },
      {
        "productId": 5,
        "name": "أغطية فراش ساتان بلمسة مخملية",
        "nameEn": "Velvet-Touch Satin Bed Covers",
        "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
        "price": 1890,
        "qty": 2,
        "color": "#F2EDE4",
        "size": "90×200"
      },
      {
        "productId": 6,
        "name": "طقم فراش كامل 6 قطع",
        "nameEn": "Complete 6-Piece Bedding Set",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "price": 3190,
        "qty": 1,
        "color": "#D9C3A5",
        "size": "160×200"
      },
      {
        "productId": 11,
        "name": "وسادة ظهر ميموري فوم",
        "nameEn": "Memory Foam Back Cushion",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "price": 620,
        "qty": 3,
        "color": "#F5EFE4",
        "size": "160×200"
      }
    ],
    "subtotal": 9610,
    "shipping": 0,
    "discount": 0,
    "total": 9610,
    "currency": "EGP",
    "paymentMethod": "card",
    "status": "pending",
    "date": "2026-10-03T00:24:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-03T00:24:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-03T03:24:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5010,
    "number": "N3-10250",
    "customerId": 11,
    "customerName": "كريم الشربيني",
    "customerEmail": "user11@example.com",
    "phone": "+20 107 466 6108",
    "city": "أسيوط",
    "cityEn": "Assiut",
    "address": "١٥ شارع النيل، الدور 5",
    "items": [
      {
        "productId": 10,
        "name": "مفارش قطن مطبوعة",
        "nameEn": "Printed Cotton Quilts",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "price": 2190,
        "qty": 3,
        "color": "#EFE3D2",
        "size": "140×200"
      }
    ],
    "subtotal": 6570,
    "shipping": 0,
    "discount": 0,
    "total": 6570,
    "currency": "EGP",
    "paymentMethod": "wallet",
    "status": "cancelled",
    "date": "2026-10-04T11:00:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-04T11:00:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-04T14:00:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5011,
    "number": "N3-10251",
    "customerId": 12,
    "customerName": "ريم نجيب",
    "customerEmail": "user12@example.com",
    "phone": "+20 105 239 2186",
    "city": "طنطا",
    "cityEn": "Tanta",
    "address": "١٥ شارع النيل، الدور 2",
    "items": [
      {
        "productId": 9,
        "name": "منسوجات غرفة نوم مطرزة",
        "nameEn": "Embroidered Bedroom Textiles",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
        "price": 890,
        "qty": 2,
        "color": "#F2EDE4",
        "size": "140×200"
      },
      {
        "productId": 6,
        "name": "طقم فراش كامل 6 قطع",
        "nameEn": "Complete 6-Piece Bedding Set",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "price": 3190,
        "qty": 2,
        "color": "#EFE3D2",
        "size": "180×200"
      },
      {
        "productId": 2,
        "name": "ملاءات قطن ناعمة بدرجة 400",
        "nameEn": "Soft 400-Thread Cotton Sheets",
        "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "price": 1390,
        "qty": 2,
        "color": "#EFE3D2",
        "size": "140×200"
      },
      {
        "productId": 10,
        "name": "مفارش قطن مطبوعة",
        "nameEn": "Printed Cotton Quilts",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "price": 2190,
        "qty": 1,
        "color": "#D9C3A5",
        "size": "140×200"
      }
    ],
    "subtotal": 13130,
    "shipping": 0,
    "discount": 0,
    "total": 13130,
    "currency": "EGP",
    "paymentMethod": "bank",
    "status": "delivered",
    "date": "2026-10-05T19:36:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-05T19:36:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-05T22:36:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5012,
    "number": "N3-10252",
    "customerId": 13,
    "customerName": "طارق الصعيدي",
    "customerEmail": "user13@example.com",
    "phone": "+20 101 192 2893",
    "city": "القاهرة",
    "cityEn": "Cairo",
    "address": "١٥ شارع النيل، الدور 8",
    "items": [
      {
        "productId": 12,
        "name": "بطانية صيفية خفيفة",
        "nameEn": "Lightweight Summer Blanket",
        "image": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
        "price": 990,
        "qty": 2,
        "color": "#C9B79A",
        "size": "180×200"
      },
      {
        "productId": 8,
        "name": "مجموعة ملاءات 4 قطع",
        "nameEn": "4-Piece Sheet Set",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
        "price": 1590,
        "qty": 2,
        "color": "#E7E1D4",
        "size": "160×200"
      },
      {
        "productId": 9,
        "name": "منسوجات غرفة نوم مطرزة",
        "nameEn": "Embroidered Bedroom Textiles",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
        "price": 890,
        "qty": 1,
        "color": "#D8CBB4",
        "size": "90×200"
      },
      {
        "productId": 8,
        "name": "مجموعة ملاءات 4 قطع",
        "nameEn": "4-Piece Sheet Set",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
        "price": 1590,
        "qty": 1,
        "color": "#E7E1D4",
        "size": "160×200"
      }
    ],
    "subtotal": 7640,
    "shipping": 0,
    "discount": 0,
    "total": 7640,
    "currency": "EGP",
    "paymentMethod": "cod",
    "status": "shipped",
    "date": "2026-10-07T06:12:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-07T06:12:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-07T09:12:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5013,
    "number": "N3-10253",
    "customerId": 14,
    "customerName": "سلمى رحمة",
    "customerEmail": "user14@example.com",
    "phone": "+20 109 775 8967",
    "city": "الجيزة",
    "cityEn": "Giza",
    "address": "١٥ شارع النيل، الدور 3",
    "items": [
      {
        "productId": 6,
        "name": "طقم فراش كامل 6 قطع",
        "nameEn": "Complete 6-Piece Bedding Set",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "price": 3190,
        "qty": 2,
        "color": "#EFE3D2",
        "size": "140×200"
      }
    ],
    "subtotal": 6380,
    "shipping": 0,
    "discount": 0,
    "total": 6380,
    "currency": "EGP",
    "paymentMethod": "card",
    "status": "processing",
    "date": "2026-10-08T22:48:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-08T22:48:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-09T01:48:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5014,
    "number": "N3-10254",
    "customerId": 15,
    "customerName": "فارس مرسي",
    "customerEmail": "user15@example.com",
    "phone": "+20 105 775 8240",
    "city": "الإسكندرية",
    "cityEn": "Alexandria",
    "address": "١٥ شارع النيل، الدور 4",
    "items": [
      {
        "productId": 6,
        "name": "طقم فراش كامل 6 قطع",
        "nameEn": "Complete 6-Piece Bedding Set",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "price": 3190,
        "qty": 2,
        "color": "#D9C3A5",
        "size": "140×200"
      },
      {
        "productId": 11,
        "name": "وسادة ظهر ميموري فوم",
        "nameEn": "Memory Foam Back Cushion",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "price": 620,
        "qty": 2,
        "color": "#F5EFE4",
        "size": "90×200"
      }
    ],
    "subtotal": 7620,
    "shipping": 0,
    "discount": 0,
    "total": 7620,
    "currency": "EGP",
    "paymentMethod": "wallet",
    "status": "delivered",
    "date": "2026-10-10T06:24:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-10T06:24:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-10T09:24:00",
        "actor": "system"
      }
    ]
  },
  {
    "id": 5015,
    "number": "N3-10255",
    "customerId": 16,
    "customerName": "دانا عطية",
    "customerEmail": "user16@example.com",
    "phone": "+20 109 424 4438",
    "city": "المنصورة",
    "cityEn": "Mansoura",
    "address": "١٥ شارع النيل، الدور 8",
    "items": [
      {
        "productId": 8,
        "name": "مجموعة ملاءات 4 قطع",
        "nameEn": "4-Piece Sheet Set",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
        "price": 1590,
        "qty": 2,
        "color": "#E7E1D4",
        "size": "160×200"
      },
      {
        "productId": 2,
        "name": "ملاءات قطن ناعمة بدرجة 400",
        "nameEn": "Soft 400-Thread Cotton Sheets",
        "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "price": 1390,
        "qty": 2,
        "color": "#EFE3D2",
        "size": "90×200"
      }
    ],
    "subtotal": 5960,
    "shipping": 0,
    "discount": 0,
    "total": 5960,
    "currency": "EGP",
    "paymentMethod": "bank",
    "status": "pending",
    "date": "2026-10-11T17:00:00",
    "note": "",
    "timeline": [
      {
        "title": "تم إنشاء الطلب",
        "at": "2026-10-11T17:00:00",
        "actor": "system"
      },
      {
        "title": "تأكيد الدفع",
        "at": "2026-10-11T20:00:00",
        "actor": "system"
      }
    ]
  }
];

export const seedCustomers = [
  {
    "id": 1,
    "name": "أحمد الشناوي",
    "nameEn": "أحمد الشناوي",
    "email": "user1@example.com",
    "phone": "+20 103 347 1492",
    "city": "القاهرة",
    "cityEn": "Cairo",
    "ordersCount": 1,
    "totalSpent": 15780,
    "segment": "returning",
    "joined": "2025-06-01",
    "active": true
  },
  {
    "id": 2,
    "name": "سارة محمود",
    "nameEn": "سارة محمود",
    "email": "user2@example.com",
    "phone": "+20 108 960 2363",
    "city": "الجيزة",
    "cityEn": "Giza",
    "ordersCount": 1,
    "totalSpent": 10140,
    "segment": "vip",
    "joined": "2025-06-24",
    "active": true
  },
  {
    "id": 3,
    "name": "محمد عبدالله",
    "nameEn": "محمد عبدالله",
    "email": "user3@example.com",
    "phone": "+20 103 314 1857",
    "city": "الإسكندرية",
    "cityEn": "Alexandria",
    "ordersCount": 1,
    "totalSpent": 17520,
    "segment": "returning",
    "joined": "2025-07-17",
    "active": true
  },
  {
    "id": 4,
    "name": "نور حسن",
    "nameEn": "نور حسن",
    "email": "user4@example.com",
    "phone": "+20 100 161 8617",
    "city": "المنصورة",
    "cityEn": "Mansoura",
    "ordersCount": 1,
    "totalSpent": 2825,
    "segment": "returning",
    "joined": "2025-08-09",
    "active": true
  },
  {
    "id": 5,
    "name": "خالد عمر",
    "nameEn": "خالد عمر",
    "email": "user5@example.com",
    "phone": "+20 106 530 4487",
    "city": "أسيوط",
    "cityEn": "Assiut",
    "ordersCount": 1,
    "totalSpent": 9450,
    "segment": "new",
    "joined": "2025-09-01",
    "active": true
  },
  {
    "id": 6,
    "name": "مريم السيد",
    "nameEn": "مريم السيد",
    "email": "user6@example.com",
    "phone": "+20 104 495 2202",
    "city": "طنطا",
    "cityEn": "Tanta",
    "ordersCount": 1,
    "totalSpent": 2415,
    "segment": "new",
    "joined": "2025-09-24",
    "active": true
  },
  {
    "id": 7,
    "name": "يوسف فتحي",
    "nameEn": "يوسف فتحي",
    "email": "user7@example.com",
    "phone": "+20 109 564 3084",
    "city": "القاهرة",
    "cityEn": "Cairo",
    "ordersCount": 1,
    "totalSpent": 7970,
    "segment": "vip",
    "joined": "2025-10-17",
    "active": true
  },
  {
    "id": 8,
    "name": "ليلى زكي",
    "nameEn": "ليلى زكي",
    "email": "user8@example.com",
    "phone": "+20 106 148 2701",
    "city": "الجيزة",
    "cityEn": "Giza",
    "ordersCount": 1,
    "totalSpent": 1855,
    "segment": "new",
    "joined": "2025-11-09",
    "active": true
  },
  {
    "id": 9,
    "name": "عمر المنسي",
    "nameEn": "عمر المنسي",
    "email": "user9@example.com",
    "phone": "+20 109 602 5807",
    "city": "الإسكندرية",
    "cityEn": "Alexandria",
    "ordersCount": 1,
    "totalSpent": 5760,
    "segment": "vip",
    "joined": "2025-12-02",
    "active": true
  },
  {
    "id": 10,
    "name": "هدى خالد",
    "nameEn": "هدى خالد",
    "email": "user10@example.com",
    "phone": "+20 100 170 5410",
    "city": "المنصورة",
    "cityEn": "Mansoura",
    "ordersCount": 1,
    "totalSpent": 9610,
    "segment": "returning",
    "joined": "2025-12-25",
    "active": true
  },
  {
    "id": 11,
    "name": "كريم الشربيني",
    "nameEn": "كريم الشربيني",
    "email": "user11@example.com",
    "phone": "+20 107 466 6108",
    "city": "أسيوط",
    "cityEn": "Assiut",
    "ordersCount": 1,
    "totalSpent": 6570,
    "segment": "new",
    "joined": "2026-01-17",
    "active": true
  },
  {
    "id": 12,
    "name": "ريم نجيب",
    "nameEn": "ريم نجيب",
    "email": "user12@example.com",
    "phone": "+20 105 239 2186",
    "city": "طنطا",
    "cityEn": "Tanta",
    "ordersCount": 1,
    "totalSpent": 13130,
    "segment": "new",
    "joined": "2026-02-09",
    "active": true
  },
  {
    "id": 13,
    "name": "طارق الصعيدي",
    "nameEn": "طارق الصعيدي",
    "email": "user13@example.com",
    "phone": "+20 101 192 2893",
    "city": "القاهرة",
    "cityEn": "Cairo",
    "ordersCount": 1,
    "totalSpent": 7640,
    "segment": "returning",
    "joined": "2026-03-04",
    "active": true
  },
  {
    "id": 14,
    "name": "سلمى رحمة",
    "nameEn": "سلمى رحمة",
    "email": "user14@example.com",
    "phone": "+20 109 775 8967",
    "city": "الجيزة",
    "cityEn": "Giza",
    "ordersCount": 1,
    "totalSpent": 6380,
    "segment": "returning",
    "joined": "2026-03-27",
    "active": true
  },
  {
    "id": 15,
    "name": "فارس مرسي",
    "nameEn": "فارس مرسي",
    "email": "user15@example.com",
    "phone": "+20 105 775 8240",
    "city": "الإسكندرية",
    "cityEn": "Alexandria",
    "ordersCount": 1,
    "totalSpent": 7620,
    "segment": "returning",
    "joined": "2026-04-19",
    "active": true
  },
  {
    "id": 16,
    "name": "دانا عطية",
    "nameEn": "دانا عطية",
    "email": "user16@example.com",
    "phone": "+20 109 424 4438",
    "city": "المنصورة",
    "cityEn": "Mansoura",
    "ordersCount": 1,
    "totalSpent": 5960,
    "segment": "new",
    "joined": "2026-05-12",
    "active": true
  }
];

export const seedCoupons = [
  {
    "id": 1,
    "code": "WELCOME10",
    "type": "percent",
    "value": 10,
    "minOrder": 500,
    "used": 214,
    "limit": 1000,
    "active": true,
    "expires": "2026-12-31"
  },
  {
    "id": 2,
    "code": "FREESHIP",
    "type": "shipping",
    "value": 75,
    "minOrder": 1500,
    "used": 89,
    "limit": 500,
    "active": true,
    "expires": "2026-11-30"
  },
  {
    "id": 3,
    "code": "EID25",
    "type": "percent",
    "value": 25,
    "minOrder": 2000,
    "used": 431,
    "limit": 450,
    "active": false,
    "expires": "2026-04-10"
  },
  {
    "id": 4,
    "code": "VIP500",
    "type": "fixed",
    "value": 500,
    "minOrder": 4000,
    "used": 37,
    "limit": 100,
    "active": true,
    "expires": "2027-01-31"
  }
];

export const seedReviews = [
  {
    "id": 900,
    "productId": 5,
    "productName": "أغطية فراش ساتان بلمسة مخملية",
    "productNameEn": "Velvet-Touch Satin Bed Covers",
    "productImage": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
    "customerName": "أحمد الشناوي",
    "customerEmail": "user1@example.com",
    "rating": 5,
    "title": "جودة ممتازة",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "approved",
    "date": "2026-09-25",
    "helpful": 13
  },
  {
    "id": 901,
    "productId": 7,
    "productName": "سرير خشب بإطار تنجيد",
    "productNameEn": "Upholstered Wooden Bed Frame",
    "productImage": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "customerName": "سارة محمود",
    "customerEmail": "user2@example.com",
    "rating": 3,
    "title": "棉花很舒服",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "pending",
    "date": "2026-09-26",
    "helpful": 15
  },
  {
    "id": 902,
    "productId": 11,
    "productName": "وسادة ظهر ميموري فوم",
    "productNameEn": "Memory Foam Back Cushion",
    "productImage": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
    "customerName": "محمد عبدالله",
    "customerEmail": "user3@example.com",
    "rating": 4,
    "title": "المنتج مطابق للوصف",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "approved",
    "date": "2026-09-27",
    "helpful": 22
  },
  {
    "id": 903,
    "productId": 10,
    "productName": "مفارش قطن مطبوعة",
    "productNameEn": "Printed Cotton Quilts",
    "productImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    "customerName": "نور حسن",
    "customerEmail": "user4@example.com",
    "rating": 4,
    "title": "توصيل سريع",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "rejected",
    "date": "2026-09-28",
    "helpful": 10
  },
  {
    "id": 904,
    "productId": 2,
    "productName": "ملاءات قطن ناعمة بدرجة 400",
    "productNameEn": "Soft 400-Thread Cotton Sheets",
    "productImage": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
    "customerName": "خالد عمر",
    "customerEmail": "user5@example.com",
    "rating": 5,
    "title": "قيمة مقابل السعر",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "approved",
    "date": "2026-09-29",
    "helpful": 8
  },
  {
    "id": 905,
    "productId": 10,
    "productName": "مفارش قطن مطبوعة",
    "productNameEn": "Printed Cotton Quilts",
    "productImage": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    "customerName": "مريم السيد",
    "customerEmail": "user6@example.com",
    "rating": 5,
    "title": "لون جميل",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "pending",
    "date": "2026-09-30",
    "helpful": 21
  },
  {
    "id": 906,
    "productId": 12,
    "productName": "بطانية صيفية خفيفة",
    "productNameEn": "Lightweight Summer Blanket",
    "productImage": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
    "customerName": "يوسف فتحي",
    "customerEmail": "user7@example.com",
    "rating": 4,
    "title": "أعده شراء مرة أخرى",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "approved",
    "date": "2026-10-01",
    "helpful": 18
  },
  {
    "id": 907,
    "productId": 6,
    "productName": "طقم فراش كامل 6 قطع",
    "productNameEn": "Complete 6-Piece Bedding Set",
    "productImage": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
    "customerName": "ليلى زكي",
    "customerEmail": "user8@example.com",
    "rating": 4,
    "title": "متوسط",
    "body": "تجربة مريحة والخامة ممتازة، أنصح به بشدة. التغليف كان راقيًا والتوصيل في الموعد.",
    "status": "approved",
    "date": "2026-10-02",
    "helpful": 20
  }
];

export const seedStaff = [
  {
    "id": 1,
    "name": "Anton Abdalla",
    "email": "admin@no3oma.com",
    "role": "admin",
    "active": true,
    "lastSeen": "2026-10-06T09:12:00"
  },
  {
    "id": 2,
    "name": "سارة منير",
    "email": "manager@no3oma.com",
    "role": "manager",
    "active": true,
    "lastSeen": "2026-10-05T18:40:00"
  },
  {
    "id": 3,
    "name": "Omar Adel",
    "email": "support@no3oma.com",
    "role": "support",
    "active": true,
    "lastSeen": "2026-10-04T14:05:00"
  },
  {
    "id": 4,
    "name": "هدى فاروق",
    "email": "stock@no3oma.com",
    "role": "inventory",
    "active": false,
    "lastSeen": "2026-09-12T11:22:00"
  }
];

export const seedSettings = {
  "storeName": "No3oma",
  "supportEmail": "support@no3oma.com",
  "phone": "+20 100 000 0000",
  "address": "Cairo, Egypt",
  "currency": "EGP",
  "currencySymbol": "ج.م",
  "taxRate": 14,
  "freeShippingThreshold": 3000,
  "shippingFee": 75,
  "codEnabled": true,
  "cardEnabled": true,
  "walletEnabled": true,
  "bankEnabled": false,
  "orderPrefix": "N3-",
  "lowStockAlerts": true,
  "emailNotifications": true,
  "whatsappNotifications": false,
  "maintenance": false,
  "defaultLang": "ar",
  "content": {
    "announcement": {
      "enabled": true,
      "ar": "شحن مجاني للطلبات فوق ٣٠٠٠ ج.م",
      "en": "Free shipping on orders over 3,000 EGP"
    },
    "hero": {
      "enabled": true,
      "eyebrowAr": "تشكيلة ٢٠٢٦",
      "eyebrowEn": "2026 Collection",
      "titleAr": "نومٌ أهدأ يبدأ بملمس أرقّ",
      "titleEn": "Calmer nights begin with softer linen",
      "ctaLabelAr": "تسوّق الآن",
      "ctaLabelEn": "Shop now",
      "ctaHref": "/shop",
      "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80"
    },
    "promo": {
      "enabled": true,
      "titleAr": "خصم ١٧٪ على مجموعات الفراش",
      "titleEn": "17% off bed sets",
      "href": "/category/bedSets"
    },
    "newsletter": {
      "enabled": true,
      "titleAr": "اشترك في نشرتنا",
      "titleEn": "Join our newsletter"
    },
    "footerAbout": {
      "ar": "نعومة تصنع منتجات نوم مريحة بخامات طبيعية وتشطيب يدوي.",
      "en": "No3oma makes comfortable sleep products from natural fabrics and hand finishing."
    },
    "policies": {
      "shipping": {
        "ar": "التوصيل خلال ٢-٤ أيام عمل.",
        "en": "Delivery within 2-4 business days."
      },
      "returns": {
        "ar": "استبدال خلال ١٤ يومًا من الاستلام.",
        "en": "Exchange within 14 days of delivery."
      },
      "privacy": {
        "ar": "لا نشارك بياناتك مع أي طرف ثالث.",
        "en": "We never share your data with third parties."
      },
      "terms": {
        "ar": "الأسعار بالجنيه المصري وتشمل الضريبة.",
        "en": "Prices in EGP and include VAT."
      }
    },
    "faq": [
      {
        "qAr": "كم تستغرق مدة التوصيل؟",
        "qEn": "How long does delivery take?",
        "aAr": "٢-٤ أيام عمل داخل مصر.",
        "aEn": "2-4 business days within Egypt."
      },
      {
        "qAr": "هل يمكنني الاستبدال؟",
        "qEn": "Can I exchange?",
        "aAr": "نعم خلال ١٤ يومًا.",
        "aEn": "Yes, within 14 days."
      }
    ]
  }
};

export const seedAnalytics = {
  "kpis": {
    "revenue": 486320,
    "revenueTrend": 12.4,
    "orders": 318,
    "ordersTrend": 8.1,
    "customers": 142,
    "customersTrend": 5.6,
    "aov": 1529,
    "aovTrend": -2.3
  },
  "revenueSeries": [
    {
      "label": "سبت",
      "labelEn": "Sat",
      "value": 14200
    },
    {
      "label": "أحد",
      "labelEn": "Sun",
      "value": 18900
    },
    {
      "label": "إثنين",
      "labelEn": "Mon",
      "value": 16400
    },
    {
      "label": "ثلاثاء",
      "labelEn": "Tue",
      "value": 22100
    },
    {
      "label": "أربعاء",
      "labelEn": "Wed",
      "value": 19800
    },
    {
      "label": "خميس",
      "labelEn": "Thu",
      "value": 26400
    },
    {
      "label": "جمعة",
      "labelEn": "Fri",
      "value": 31200
    }
  ],
  "ordersByStatus": [
    {
      "status": "delivered",
      "count": 146
    },
    {
      "status": "processing",
      "count": 74
    },
    {
      "status": "shipped",
      "count": 58
    },
    {
      "status": "pending",
      "count": 26
    },
    {
      "status": "cancelled",
      "count": 14
    }
  ],
  "topProducts": [
    {
      "id": 4,
      "sku": "N3-PIL-1004",
      "name": "وسائد ميكروفايبر فاخرة (قطعة)",
      "nameEn": "Microfibre Pillow Pair",
      "category": "pillows",
      "price": 780,
      "oldPrice": 980,
      "cost": 354.0,
      "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.6,
      "reviewCount": 210,
      "discount": 20,
      "isNew": false,
      "stock": 48,
      "reorderPoint": 8,
      "status": "draft",
      "colors": [
        "#E7E1D4",
        "#C9B79A"
      ],
      "sizes": [
        "90×200",
        "140×200"
      ],
      "weight": 5.1,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "cotton",
        "premium"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-07"
    },
    {
      "id": 11,
      "sku": "N3-PIL-1011",
      "name": "وسادة ظهر ميموري فوم",
      "nameEn": "Memory Foam Back Cushion",
      "category": "pillows",
      "price": 620,
      "oldPrice": null,
      "cost": 278.0,
      "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.4,
      "reviewCount": 152,
      "discount": 0,
      "isNew": false,
      "stock": 0,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#F5EFE4",
        "#BFCBC4"
      ],
      "sizes": [
        "90×200",
        "140×200",
        "160×200"
      ],
      "weight": 1.6,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "everyday"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-21"
    },
    {
      "id": 6,
      "sku": "N3-BED-1006",
      "name": "طقم فراش كامل 6 قطع",
      "nameEn": "Complete 6-Piece Bedding Set",
      "category": "bedding",
      "price": 3190,
      "oldPrice": 3790,
      "cost": 1394.0,
      "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.9,
      "reviewCount": 143,
      "discount": 16,
      "isNew": false,
      "stock": 3,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#EFE3D2",
        "#D9C3A5"
      ],
      "sizes": [
        "90×200",
        "140×200",
        "160×200",
        "180×200"
      ],
      "weight": 3.6,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "everyday"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-11"
    },
    {
      "id": 1,
      "sku": "N3-BED-1001",
      "name": "مجموعة فراش قطن مصري فاخر",
      "nameEn": "Luxury Egyptian Cotton Bed Set",
      "category": "bedSets",
      "price": 2890,
      "oldPrice": 3490,
      "cost": 1449.0,
      "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.8,
      "reviewCount": 126,
      "discount": 17,
      "isNew": false,
      "stock": 0,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#F2EDE4",
        "#D8CBB4"
      ],
      "sizes": [
        "90×200",
        "140×200"
      ],
      "weight": 5.4,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "cotton",
        "premium"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-01"
    },
    {
      "id": 2,
      "sku": "N3-BED-1002",
      "name": "ملاءات قطن ناعمة بدرجة 400",
      "nameEn": "Soft 400-Thread Cotton Sheets",
      "category": "bedSheets",
      "price": 1390,
      "oldPrice": 1690,
      "cost": 815.0,
      "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.7,
      "reviewCount": 94,
      "discount": 18,
      "isNew": false,
      "stock": 4,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#EFE3D2",
        "#D9C3A5"
      ],
      "sizes": [
        "90×200",
        "140×200",
        "160×200"
      ],
      "weight": 4.8,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "everyday"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-03"
    }
  ],
  "lowStock": [
    {
      "id": 1,
      "sku": "N3-BED-1001",
      "name": "مجموعة فراش قطن مصري فاخر",
      "nameEn": "Luxury Egyptian Cotton Bed Set",
      "category": "bedSets",
      "price": 2890,
      "oldPrice": 3490,
      "cost": 1449.0,
      "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.8,
      "reviewCount": 126,
      "discount": 17,
      "isNew": false,
      "stock": 0,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#F2EDE4",
        "#D8CBB4"
      ],
      "sizes": [
        "90×200",
        "140×200"
      ],
      "weight": 5.4,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "cotton",
        "premium"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-01"
    },
    {
      "id": 11,
      "sku": "N3-PIL-1011",
      "name": "وسادة ظهر ميموري فوم",
      "nameEn": "Memory Foam Back Cushion",
      "category": "pillows",
      "price": 620,
      "oldPrice": null,
      "cost": 278.0,
      "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.4,
      "reviewCount": 152,
      "discount": 0,
      "isNew": false,
      "stock": 0,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#F5EFE4",
        "#BFCBC4"
      ],
      "sizes": [
        "90×200",
        "140×200",
        "160×200"
      ],
      "weight": 1.6,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "everyday"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-21"
    },
    {
      "id": 6,
      "sku": "N3-BED-1006",
      "name": "طقم فراش كامل 6 قطع",
      "nameEn": "Complete 6-Piece Bedding Set",
      "category": "bedding",
      "price": 3190,
      "oldPrice": 3790,
      "cost": 1394.0,
      "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.9,
      "reviewCount": 143,
      "discount": 16,
      "isNew": false,
      "stock": 3,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#EFE3D2",
        "#D9C3A5"
      ],
      "sizes": [
        "90×200",
        "140×200",
        "160×200",
        "180×200"
      ],
      "weight": 3.6,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "everyday"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-11"
    },
    {
      "id": 2,
      "sku": "N3-BED-1002",
      "name": "ملاءات قطن ناعمة بدرجة 400",
      "nameEn": "Soft 400-Thread Cotton Sheets",
      "category": "bedSheets",
      "price": 1390,
      "oldPrice": 1690,
      "cost": 815.0,
      "image": "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1589936963437-b9fbb7f2f95b?auto=format&fit=crop&w=900&q=80"
      ],
      "rating": 4.7,
      "reviewCount": 94,
      "discount": 18,
      "isNew": false,
      "stock": 4,
      "reorderPoint": 8,
      "status": "active",
      "colors": [
        "#EFE3D2",
        "#D9C3A5"
      ],
      "sizes": [
        "90×200",
        "140×200",
        "160×200"
      ],
      "weight": 4.8,
      "dimensions": "120 × 90 × 25 cm",
      "tags": [
        "everyday"
      ],
      "description": "قطن مصري ناعم 400 خيط، مقاوم للانكماش، متوفر بعدة ألوان ومقاسات.",
      "descriptionEn": "400-thread-count Egyptian cotton, shrink resistant, available in several colours and sizes.",
      "updatedAt": "2026-09-03"
    }
  ],
  "recentActivity": [
    {
      "titleAr": "طلب جديد N3-10255",
      "titleEn": "New order N3-10255",
      "at": "2026-10-06T09:40:00",
      "tone": "ok"
    },
    {
      "titleAr": "مراجعة بانتظار المراجعة",
      "titleEn": "Review awaiting moderation",
      "at": "2026-10-06T08:15:00",
      "tone": "warn"
    },
    {
      "titleAr": "مخزون منخفض: وسادة ميموري فوم",
      "titleEn": "Low stock: Memory foam pillow",
      "at": "2026-10-05T19:02:00",
      "tone": "danger"
    },
    {
      "titleAr": "كوبون WELCOME10 تم استخدامه",
      "titleEn": "Coupon WELCOME10 redeemed",
      "at": "2026-10-05T15:31:00",
      "tone": "info"
    }
  ]
};
