const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
// Allow CORS from all origins (update with specific domains in production)
app.use(cors({
  origin: true, // Allow all origins - update with specific domains for production
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Serve static images - use absolute path for production
const imagesPath = path.join(__dirname, "Images");
console.log("📁 Images directory path:", imagesPath);
console.log("📁 __dirname:", __dirname);
console.log("📁 Images folder exists:", fs.existsSync(imagesPath));

// List files in Images directory for debugging
if (fs.existsSync(imagesPath)) {
  try {
    const files = fs.readdirSync(imagesPath);
    console.log("📁 Images folder contents:", files);
    if (fs.existsSync(path.join(imagesPath, "fastfood"))) {
      const fastfoodFiles = fs.readdirSync(path.join(imagesPath, "fastfood"));
      console.log("📁 fastfood folder contents:", fastfoodFiles);
    }
  } catch (err) {
    console.error("❌ Error reading Images folder:", err);
  }
}

// Serve static images - use /Images to match folder name (case-sensitive on Linux)
app.use("/Images", express.static(imagesPath));


const combinedMenuFavorites = {
  // --- 1. Global Fast Food (Burgers, Pizzas, Sandwiches) ---
  'FastFoodFavorites': [
    {
      id: 'FF001',
      name: 'Paneer Makhani Pizza',
      description: 'Fusion favorite: Pizza topped with paneer, makhani sauce, onions, and bell peppers.',
      isVegetarian: true,
      isBestSeller: true,
      // Pizza sizes: Small, Medium, Large
      pricing: [
        { size: 'Small (6")', price: 299 },
        { size: 'Medium (9")', price: 449 },
        { size: 'Large (12")', price: 699 }
      ],
      image_url: '/Images/fastfood/paneer_pizza.jpg'
    },
    {
      id: 'FF002',
      name: 'Jumbo Chicken Burger',
      description: 'Crispy fried chicken fillet with cheese, lettuce, and a spicy mayo spread.',
      isVegetarian: false,
      isBestSeller: true,
      // Burger sizes: Single or Double Patty
      pricing: [
        { size: 'Single Patty', price: 199 },
        { size: 'Double Patty', price: 289 }
      ],
      image_url: '/Images/fastfood/jumbo_chicken_burger.jpg'
    },
    {
      id: 'FF003',
      name: 'Spaghetti Aglio e Olio',
      description: 'Classic Italian pasta with garlic, olive oil, dried chili flakes, and parsley.',
      isVegetarian: true,
      isBestSeller: false,
      // Pasta portion sizes
      pricing: [
        { size: 'Regular', price: 249 },
        { size: 'Large', price: 349 }
      ],
      image_url: '/Images/fastfood/aglio_olio.jpg'
    },
    {
      id: 'FF004',
      name: 'Veg Momos (Steamed)',
      description: 'Soft, steamed dumplings filled with finely chopped vegetables, served with spicy red chutney.',
      isVegetarian: true,
      isBestSeller: true,
      // Momos sold by count
      pricing: [
        { size: '6 Pcs', price: 120 },
        { size: '10 Pcs', price: 190 }
      ],
      image_url: '/Images/fastfood/veg_momos.jpg'
    },
    {
      id: 'FF005',
      name: 'Tuna Melt Sandwich',
      description: 'Classic toasted sandwich with tuna salad and melted cheddar cheese.',
      isVegetarian: false,
      isBestSeller: false,
      // Single price item
      pricing: [{ size: 'Single', price: 180 }],
      image_url: '/Images/fastfood/tuna_melt.jpg'
    }
  ],

  // --- 2. Indian Signature Curries ---
  'IndianCurries': [
    {
      id: 'IC006',
      name: 'Butter Chicken (Murgh Makhani)',
      description: 'Tender chicken in a rich, creamy tomato and cashew nut gravy, a universal favorite.',
      isVegetarian: false,
      isBestSeller: true,
      // Curry portion sizes: Half/Full
      pricing: [
        { size: 'Half Portion', price: 349 },
        { size: 'Full Portion', price: 599 }
      ],
      image_url: '/Images/indian/butter_chicken.jpg'
    },
    {
      id: 'IC007',
      name: 'Shahi Paneer',
      description: 'Paneer cubes in a thick, sweet, and royal gravy made with cream, tomatoes, and dry fruits.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [
        { size: 'Half Portion', price: 319 },
        { size: 'Full Portion', price: 549 }
      ],
      image_url: '/Images/indian/shahi_paneer.jpg'
    },
    {
      id: 'IC008',
      name: 'Chicken Korma',
      description: 'Mildly spiced curry with yogurt, cream, and ground nuts, resulting in a thick, fragrant sauce.',
      isVegetarian: false,
      isBestSeller: false,
      pricing: [
        { size: 'Half Portion', price: 375 },
        { size: 'Full Portion', price: 650 }
      ],
      image_url: '/Images/indian/chicken_korma.jpg'
    },
    {
      id: 'IC009',
      name: 'Dal Tadka',
      description: 'Yellow lentils tempered with fried spices (ghee, cumin, dried chilies, and garlic).',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [
        { size: 'Half Portion', price: 210 },
        { size: 'Full Portion', price: 350 }
      ],
      image_url: '/Images/indian/dal_tadka.jpg'
    }
  ],

  // --- 3. Biryanis & Rice ---
  'BiryanisAndRice': [
    {
      id: 'BR010',
      name: 'Mutton Dum Biryani',
      description: 'Aromatic basmati rice layered with slow-cooked, tender mutton pieces and special spices.',
      isVegetarian: false,
      isBestSeller: false,
      pricing: [
        { size: 'Single Serve', price: 420 },
        { size: 'Family Pack (4-5)', price: 899 }
      ],
      image_url: '/Images/biryani/mutton_biryani.jpg'
    },
    {
      id: 'BR011',
      name: 'Egg Biryani',
      description: 'Fragrant basmati rice layered with boiled eggs and an aromatic Hyderabadi spice mix.',
      isVegetarian: false,
      isBestSeller: false,
      pricing: [
        { size: 'Single Serve', price: 290 },
        { size: 'Double Serve', price: 499 }
      ],
      image_url: '/Images/biryani/egg_biryani.jpg'
    },
    {
      id: 'BR012',
      name: 'Peas Pulao',
      description: 'Lightly spiced, savory rice dish cooked with green peas and whole spices.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [
        { size: 'Regular', price: 160 },
        { size: 'Large', price: 280 }
      ],
      image_url: '/Images/biryani/peas_pulao.jpg'
    }
  ],

  // --- 4. Tandoori Breads and Grills ---
  'TandooriAndBreads': [
    {
      id: 'TB013',
      name: 'Chicken Seekh Kebab',
      description: 'Minced chicken seasoned with spices, pressed onto a skewer, and grilled in the tandoor.',
      isVegetarian: false,
      isBestSeller: true,
      pricing: [
        { size: '3 Pcs', price: 299 },
        { size: '6 Pcs', price: 499 }
      ],
      image_url: '/Images/tandoor/seekh_kebab.jpg'
    },
    {
      id: 'TB014',
      name: 'Paneer Tikka Masala Dry',
      description: 'Marinated paneer pieces tossed in a smoky dry masala with onion and capsicum.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [
        { size: 'Half Plate', price: 320 },
        { size: 'Full Plate', price: 540 }
      ],
      image_url: '/Images/tandoor/paneer_tikka_dry.jpg'
    },
    {
      id: 'TB015',
      name: 'Lachha Paratha',
      description: 'Layered whole wheat flatbread, flaky and soft.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: 'Per Piece', price: 45 }],
      image_url: '/Images/breads/lachha_paratha.jpg'
    },
    {
      id: 'TB016',
      name: 'Amritsari Kulcha',
      description: 'Leavened bread stuffed with spiced potatoes or paneer, baked in a tandoor.',
      isVegetarian: true,
      isBestSeller: false,
      pricing: [{ size: 'Single', price: 80 }],
      image_url: '/Images/breads/amritsari_kulcha.jpg'
    }
  ],
  
  // --- 5. Thalis & Combos (Meals) ---
  'ThalisAndCombos': [
    {
      id: 'TH017',
      name: 'Mini Veg Thali',
      description: 'A complete meal: Dal, one seasonal vegetable curry, 2 Tawa Rotis, rice, and salad.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: 'Fixed Price', price: 350 }],
      image_url: '/Images/thali/mini_veg_thali.jpg'
    },
    {
      id: 'TH018',
      name: 'Chicken Curry Meal',
      description: 'Portion of Chicken Curry, Rice, and two Butter Naans.',
      isVegetarian: false,
      isBestSeller: true,
      pricing: [{ size: 'Fixed Price', price: 450 }],
      image_url: '/Images/thali/chicken_meal.jpg'
    }
  ],

  // --- 6. Street Food & Snacks ---
  'StreetFood': [
    {
      id: 'SF019',
      name: 'Pani Puri / Gol Gappe',
      description: 'Hollow, crispy semolina balls served with spicy, tangy water and spiced filling.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [
        { size: '6 Pcs', price: 90 },
        { size: '8 Pcs', price: 110 }
      ],
      image_url: '/Images/streetfood/pani_puri.jpg'
    },
    {
      id: 'SF020',
      name: 'Samosa (2 Pcs)',
      description: 'Crispy fried pastry filled with spiced potatoes and peas.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: '2 Pcs', price: 80 }],
      image_url: '/Images/streetfood/samosa.jpg'
    },
    {
      id: 'SF021',
      name: 'Vada Pav',
      description: 'The iconic Mumbai potato fritter (vada) inside a soft bread roll (pav).',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: 'Single', price: 50 }],
      image_url: '/Images/streetfood/vada_pav.jpg'
    },
    {
      id: 'SF022',
      name: 'Chole Bhature',
      description: 'Fluffy fried bread (Bhatura) served with spicy chickpea curry (Chole).',
      isVegetarian: true,
      isBestSeller: false,
      pricing: [{ size: '2 Bhatura + Chole', price: 210 }],
      image_url: '/Images/streetfood/chole_bhature.jpg'
    }
  ],

  // --- 7. Desserts ---
  'Desserts': [
    {
      id: 'DE023',
      name: 'Red Velvet Pastry',
      description: 'Moist red velvet cake layered with rich cream cheese frosting.',
      isVegetarian: true,
      isBestSeller: false,
      pricing: [{ size: 'Per Slice', price: 140 }],
      image_url: '/Images/desserts/red_velvet.jpg'
    },
    {
      id: 'DE024',
      name: 'Gulab Jamun (2 Pcs)',
      description: 'Deep-fried milk solids soaked in a warm, fragrant rose and cardamom syrup.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: '2 Pcs', price: 110 }],
      image_url: '/Images/desserts/gulab_jamun.jpg'
    },
    {
      id: 'DE025',
      name: 'Chocolate Brownie with Ice Cream',
      description: 'Warm, gooey chocolate brownie served with a scoop of vanilla ice cream.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: 'Single Serve', price: 175 }],
      image_url: '/Images/desserts/brownie.jpg'
    }
  ],
  
  // --- 8. Beverages (Coffee, Tea, Shakes) ---
  'Beverages': [
    {
      id: 'BE026',
      name: 'Masala Chai',
      description: 'Strong black tea brewed with milk, sugar, ginger, and aromatic spices.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: 'Regular', price: 60 }],
      image_url: '/Images/beverages/masala_chai.jpg'
    },
    {
      id: 'BE027',
      name: 'Iced Mocha',
      description: 'A cooling mix of espresso, chocolate syrup, milk, and ice.',
      isVegetarian: true,
      isBestSeller: false,
      pricing: [
        { size: 'Medium', price: 150 },
        { size: 'Large', price: 190 }
      ],
      image_url: '/Images/beverages/iced_mocha.jpg'
    },
    {
      id: 'BE028',
      name: 'Cold Coffee (Indian Style)',
      description: 'Strong coffee blended with chilled milk, sugar, and ice cream for a thick texture.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [{ size: 'Regular', price: 130 }],
      image_url: '/Images/beverages/cold_coffee.jpg'
    },
    {
      id: 'BE029',
      name: 'Sweet Lassi',
      description: 'Traditional Punjabi yogurt drink, blended with sugar and a hint of cardamom.',
      isVegetarian: true,
      isBestSeller: true,
      pricing: [
        { size: 'Regular', price: 110 },
        { size: 'Jumbo', price: 150 }
      ],
      image_url: '/Images/beverages/sweet_lassi.jpg'
    },
    {
      id: 'BE030',
      name: 'Fresh Lime Soda (Sweet/Salted)',
      description: 'A refreshing mix of fresh lime juice, sugar/salt, and soda water.',
      isVegetarian: true,
      isBestSeller: false,
      pricing: [{ size: 'Single Serve', price: 70 }],
      image_url: '/Images/beverages/lime_soda.jpg'
    }
  ]
};

// ✅ Routes
app.get("/", (req, res) => res.json(combinedMenuFavorites));

app.post("/category/:id",(req,res)=>{
  const {id}=req.params;
  // const data=req.body;
  const catdata=combinedMenuFavorites[id];
  res.json(catdata);
})

// Debug route to test image serving
app.get("/test-image", (req, res) => {
  const testImagePath = path.join(imagesPath, "fastfood", "paneer_pizza.jpg");
  const exists = fs.existsSync(testImagePath);
  res.json({
    imagesPath: imagesPath,
    __dirname: __dirname,
    testImagePath: testImagePath,
    imageExists: exists,
    imagesFolderExists: fs.existsSync(imagesPath),
    currentWorkingDirectory: process.cwd()
  });
})

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
