const Products = [
    {
      name: 'Paneer Makhani Pizza',
      description: 'Fusion favorite: Pizza topped with paneer, makhani sauce, onions, and bell peppers.',
      isVegetarian: true,
      isBestSeller: true,
      category:'FastFoodFavorites',
      // Pizza sizes: Small, Medium, Large
      pricing: [
        { size: 'Small (6")', price: 299 },
        { size: 'Medium (9")', price: 449 },
        { size: 'Large (12")', price: 699 }
      ],
      image_url: '/images/fastfood/paneer_pizza.jpg'
    },
    {
      name: 'Jumbo Chicken Burger',
      description: 'Crispy fried chicken fillet with cheese, lettuce, and a spicy mayo spread.',
      isVegetarian: false,
      isBestSeller: true,
      category:'FastFoodFavorites',
      pricing: [
        { size: 'Single Patty', price: 199 },
        { size: 'Double Patty', price: 289 }
      ],
      image_url: '/images/fastfood/jumbo_chicken_burger.jpg'
    },
    {
    
      name: 'Spaghetti Aglio e Olio',
      description: 'Classic Italian pasta with garlic, olive oil, dried chili flakes, and parsley.',
      isVegetarian: true,
      isBestSeller: false,
      category:'FastFoodFavorites',
      // Pasta portion sizes
      pricing: [
        { size: 'Regular', price: 249 },
        { size: 'Large', price: 349 }
      ],
      image_url: '/images/fastfood/aglio_olio.jpg'
    },
    {
      
      name: 'Veg Momos (Steamed)',
      description: 'Soft, steamed dumplings filled with finely chopped vegetables, served with spicy red chutney.',
      isVegetarian: true,
      isBestSeller: true,
      category:'FastFoodFavorites',
      // Momos sold by count
      pricing: [
        { size: '6 Pcs', price: 120 },
        { size: '10 Pcs', price: 190 }
      ],
      image_url: '/images/fastfood/veg_momos.jpg'
    },
    {

      name: 'Tuna Melt Sandwich',
      description: 'Classic toasted sandwich with tuna salad and melted cheddar cheese.',
      isVegetarian: false,
      isBestSeller: false,
      category:'FastFoodFavorites',
      // Single price item
      pricing: [{ size: 'Single', price: 180 }],
      image_url: '/images/fastfood/tuna_melt.jpg'
    },
    {
      name: 'Butter Chicken (Murgh Makhani)',
      description: 'Tender chicken in a rich, creamy tomato and cashew nut gravy, a universal favorite.',
      isVegetarian: false,
      isBestSeller: true,
      category:'IndianCurries',
      // Curry portion sizes: Half/Full
      pricing: [
        { size: 'Half Portion', price: 349 },
        { size: 'Full Portion', price: 599 }
      ],
      image_url: '/images/indian/butter_chicken.jpg'
    },
    {
      name: 'Shahi Paneer',
      description: 'Paneer cubes in a thick, sweet, and royal gravy made with cream, tomatoes, and dry fruits.',
      isVegetarian: true,
      isBestSeller: true,
      category:'IndianCurries',
      pricing: [
        { size: 'Half Portion', price: 319 },
        { size: 'Full Portion', price: 549 }
      ],
      image_url: '/images/indian/shahi_paneer.jpg'
    },
    {
      name: 'Chicken Korma',
      description: 'Mildly spiced curry with yogurt, cream, and ground nuts, resulting in a thick, fragrant sauce.',
      isVegetarian: false,
      isBestSeller: false,
      category:'IndianCurries',
      pricing: [
        { size: 'Half Portion', price: 375 },
        { size: 'Full Portion', price: 650 }
      ],
      image_url: '/images/indian/chicken_korma.jpg'
    },
    {
      name: 'Dal Tadka',
      description: 'Yellow lentils tempered with fried spices (ghee, cumin, dried chilies, and garlic).',
      isVegetarian: true,
      isBestSeller: true,
      category:'IndianCurries',
      pricing: [
        { size: 'Half Portion', price: 210 },
        { size: 'Full Portion', price: 350 }
      ],
      image_url: '/images/indian/dal_tadka.jpg'
    }
,
    {
      name: 'Mutton Dum Biryani',
      description: 'Aromatic basmati rice layered with slow-cooked, tender mutton pieces and special spices.',
      isVegetarian: false,
      isBestSeller: false,
      category:'BiryanisAndRice',
      pricing: [
        { size: 'Single Serve', price: 420 },
        { size: 'Family Pack (4-5)', price: 899 }
      ],
      image_url: '/images/biryani/mutton_biryani.jpg'
    },
    {
      name: 'Egg Biryani',
      description: 'Fragrant basmati rice layered with boiled eggs and an aromatic Hyderabadi spice mix.',
      isVegetarian: false,
      isBestSeller: false,
      category:'BiryanisAndRice',
      pricing: [
        { size: 'Single Serve', price: 290 },
        { size: 'Double Serve', price: 499 }
      ],
      image_url: '/images/biryani/egg_biryani.jpg'
    },
    {
      name: 'Peas Pulao',
      description: 'Lightly spiced, savory rice dish cooked with green peas and whole spices.',
      isVegetarian: true,
      isBestSeller: true,
      category:'BiryanisAndRice',
      pricing: [
        { size: 'Regular', price: 160 },
        { size: 'Large', price: 280 }
      ],
      image_url: '/images/biryani/peas_pulao.jpg'
    }
,
    {
      name: 'Chicken Seekh Kebab',
      description: 'Minced chicken seasoned with spices, pressed onto a skewer, and grilled in the tandoor.',
      isVegetarian: false,
      isBestSeller: true,
      category:'TandooriAndBreads',
      pricing: [
        { size: '3 Pcs', price: 299 },
        { size: '6 Pcs', price: 499 }
      ],
      image_url: '/images/tandoor/seekh_kebab.jpg'
    },
    {
      name: 'Paneer Tikka Masala Dry',
      description: 'Marinated paneer pieces tossed in a smoky dry masala with onion and capsicum.',
      isVegetarian: true,
      isBestSeller: true,
      category:'TandooriAndBreads',
      pricing: [
        { size: 'Half Plate', price: 320 },
        { size: 'Full Plate', price: 540 }
      ],
      image_url: '/images/tandoor/paneer_tikka_dry.jpg'
    },
    {
      name: 'Lachha Paratha',
      description: 'Layered whole wheat flatbread, flaky and soft.',
      isVegetarian: true,
      isBestSeller: true,
      category:'TandooriAndBreads',
      pricing: [{ size: 'Per Piece', price: 45 }],
      image_url: '/images/breads/lachha_paratha.jpg'
    },
    {
      name: 'Amritsari Kulcha',
      description: 'Leavened bread stuffed with spiced potatoes or paneer, baked in a tandoor.',
      isVegetarian: true,
      isBestSeller: false,
      category:'TandooriAndBreads',
      pricing: [{ size: 'Single', price: 80 }],
      image_url: '/images/breads/amritsari_kulcha.jpg'
    }
  ,
    {
      name: 'Mini Veg Thali',
      description: 'A complete meal: Dal, one seasonal vegetable curry, 2 Tawa Rotis, rice, and salad.',
      isVegetarian: true,
      isBestSeller: true,
      category:'ThalisAndCombos',
      pricing: [{ size: 'Fixed Price', price: 350 }],
      image_url: '/images/thali/mini_veg_thali.jpg'
    },
    {
      name: 'Chicken Curry Meal',
      description: 'Portion of Chicken Curry, Rice, and two Butter Naans.',
      isVegetarian: false,
      isBestSeller: true,
      category:'ThalisAndCombos',
      pricing: [{ size: 'Fixed Price', price: 450 }],
      image_url: '/images/thali/chicken_meal.jpg'
    },

    {
      name: 'Pani Puri / Gol Gappe',
      description: 'Hollow, crispy semolina balls served with spicy, tangy water and spiced filling.',
      isVegetarian: true,
      isBestSeller: true,
      category:'StreetFood',
      pricing: [
        { size: '6 Pcs', price: 90 },
        { size: '8 Pcs', price: 110 }
      ],
      image_url: '/images/streetfood/pani_puri.jpg'
    },
    {
      name: 'Samosa (2 Pcs)',
      description: 'Crispy fried pastry filled with spiced potatoes and peas.',
      isVegetarian: true,
      isBestSeller: true,
      category:'StreetFood',
      pricing: [{ size: '2 Pcs', price: 80 }],
      image_url: '/images/streetfood/samosa.jpg'
    },
    {
      name: 'Vada Pav',
      description: 'The iconic Mumbai potato fritter (vada) inside a soft bread roll (pav).',
      isVegetarian: true,
      isBestSeller: true,
      category:'StreetFood',
      pricing: [{ size: 'Single', price: 50 }],
      image_url: '/images/streetfood/vada_pav.jpg'
    },
    {
      name: 'Chole Bhature',
      description: 'Fluffy fried bread (Bhatura) served with spicy chickpea curry (Chole).',
      isVegetarian: true,
      isBestSeller: false,
      category:'StreetFood',
      pricing: [{ size: '2 Bhatura + Chole', price: 210 }],
      image_url: '/images/streetfood/chole_bhature.jpg'
    },
    {
      name: 'Red Velvet Pastry',
      description: 'Moist red velvet cake layered with rich cream cheese frosting.',
      isVegetarian: true,
      isBestSeller: false,
      category:'Desserts',
      pricing: [{ size: 'Per Slice', price: 140 }],
      image_url: '/images/desserts/red_velvet.jpg'
    },
    {
      name: 'Gulab Jamun (2 Pcs)',
      description: 'Deep-fried milk solids soaked in a warm, fragrant rose and cardamom syrup.',
      isVegetarian: true,
      isBestSeller: true,
      category:'Desserts',
      pricing: [{ size: '2 Pcs', price: 110 }],
      image_url: '/images/desserts/gulab_jamun.jpg'
    },
    {
      name: 'Chocolate Brownie with Ice Cream',
      description: 'Warm, gooey chocolate brownie served with a scoop of vanilla ice cream.',
      isVegetarian: true,
      isBestSeller: true,
      category:'Desserts',
      pricing: [{ size: 'Single Serve', price: 175 }],
      image_url: '/images/desserts/brownie.jpg'
    }
,
    {
      name: 'Masala Chai',
      description: 'Strong black tea brewed with milk, sugar, ginger, and aromatic spices.',
      isVegetarian: true,
      isBestSeller: true,
      category:'Beverages',
      pricing: [{ size: 'Regular', price: 60 }],
      image_url: '/images/beverages/masala_chai.jpg'
    },
    {
      name: 'Iced Mocha',
      description: 'A cooling mix of espresso, chocolate syrup, milk, and ice.',
      isVegetarian: true,
      isBestSeller: false,
      category:'Beverages',
      pricing: [
        { size: 'Medium', price: 150 },
        { size: 'Large', price: 190 }
      ],
      image_url: '/images/beverages/iced_mocha.jpg'
    },
    {
      name: 'Cold Coffee (Indian Style)',
      description: 'Strong coffee blended with chilled milk, sugar, and ice cream for a thick texture.',
      isVegetarian: true,
      isBestSeller: true,
      category:'Beverages',
      pricing: [{ size: 'Regular', price: 130 }],
      image_url: '/images/beverages/cold_coffee.jpg'
    },
    {
      name: 'Sweet Lassi',
      description: 'Traditional Punjabi yogurt drink, blended with sugar and a hint of cardamom.',
      isVegetarian: true,
      isBestSeller: true,
      category:'Beverages',
      pricing: [
        { size: 'Regular', price: 110 },
        { size: 'Jumbo', price: 150 }
      ],
      image_url: '/images/beverages/sweet_lassi.jpg'
    },
    {
      name: 'Fresh Lime Soda (Sweet/Salted)',
      description: 'A refreshing mix of fresh lime juice, sugar/salt, and soda water.',
      isVegetarian: true,
      isBestSeller: false,
      category:'Beverages',
      pricing: [{ size: 'Single Serve', price: 70 }],
      image_url: '/images/beverages/lime_soda.jpg'
    }
  ]
export default Products;