const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const products = [
  { title: 'Wireless Noise-Cancelling Headphones', price: 299.99, image: 'https://picsum.photos/seed/headphones/400/300' },
  { title: 'Mechanical Gaming Keyboard RGB', price: 159.99, image: 'https://picsum.photos/seed/keyboard/400/300' },
  { title: 'Ultra-Wide Curved Monitor 34"', price: 549.00, image: 'https://picsum.photos/seed/monitor/400/300' },
  { title: 'Ergonomic Mesh Office Chair', price: 429.99, image: 'https://picsum.photos/seed/chair/400/300' },
  { title: 'Portable Bluetooth Speaker 360°', price: 89.99, image: 'https://picsum.photos/seed/speaker/400/300' },
  { title: 'Smart Home Hub Pro 4th Gen', price: 129.00, image: 'https://picsum.photos/seed/smarthome/400/300' },
  { title: 'Wireless Charging Pad 15W Fast', price: 49.99, image: 'https://picsum.photos/seed/charger/400/300' },
  { title: 'Action Camera 4K Ultra HD 60fps', price: 399.00, image: 'https://picsum.photos/seed/camera/400/300' },
  { title: 'Fitness Tracker Smart Watch Pro', price: 199.99, image: 'https://picsum.photos/seed/smartwatch/400/300' },
  { title: 'Adjustable Laptop Stand Aluminium', price: 69.99, image: 'https://picsum.photos/seed/laptopstand/400/300' },
  { title: 'USB-C Hub 7-in-1 Multiport', price: 59.99, image: 'https://picsum.photos/seed/usbhub/400/300' },
  { title: 'LED Desk Lamp with USB Charging', price: 44.95, image: 'https://picsum.photos/seed/desklamp/400/300' },
  { title: 'Slim Wireless Ergonomic Mouse', price: 39.99, image: 'https://picsum.photos/seed/mouse/400/300' },
  { title: 'HD Webcam 1080p 60fps AutoFocus', price: 79.99, image: 'https://picsum.photos/seed/webcam/400/300' },
  { title: 'Noise-Isolating True Wireless Earbuds', price: 119.00, image: 'https://picsum.photos/seed/earbuds/400/300' },
  { title: 'Gaming Headset 7.1 Surround Sound', price: 89.50, image: 'https://picsum.photos/seed/gamingheadset/400/300' },
  { title: 'Mechanical Numpad Wireless', price: 55.00, image: 'https://picsum.photos/seed/numpad/400/300' },
  { title: 'Portable SSD 1TB USB 3.2', price: 109.99, image: 'https://picsum.photos/seed/ssd/400/300' },
  { title: 'Smart LED Strip Lights 5M RGB', price: 34.99, image: 'https://picsum.photos/seed/ledstrip/400/300' },
  { title: 'Dual Monitor Arm Stand', price: 74.99, image: 'https://picsum.photos/seed/monitorarm/400/300' },
  { title: 'Noise Cancelling Microphone USB', price: 99.00, image: 'https://picsum.photos/seed/microphone/400/300' },
  { title: 'Gaming Mouse Pad XL RGB', price: 29.99, image: 'https://picsum.photos/seed/mousepad/400/300' },
  { title: 'Mechanical Gaming Chair Pro', price: 349.00, image: 'https://picsum.photos/seed/gamingchair/400/300' },
  { title: 'Wireless Presenter Remote Clicker', price: 24.99, image: 'https://picsum.photos/seed/presenter/400/300' },
  { title: 'Smart WiFi Power Strip 4-Port', price: 42.99, image: 'https://picsum.photos/seed/powerstrip/400/300' },
  { title: 'Laptop Cooling Pad 6 Fans', price: 37.99, image: 'https://picsum.photos/seed/coolingpad/400/300' },
  { title: 'Compact Mechanical Travel Keyboard', price: 79.00, image: 'https://picsum.photos/seed/travelkeyboard/400/300' },
  { title: '4K HDMI Capture Card USB', price: 149.99, image: 'https://picsum.photos/seed/capturecard/400/300' },
  { title: 'Smart Desk Organizer Wireless Charger', price: 64.99, image: 'https://picsum.photos/seed/deskorganizer/400/300' },
  { title: 'Portable Laptop Projector Mini', price: 219.00, image: 'https://picsum.photos/seed/projector/400/300' },
  { title: 'Electric Standing Desk Converter', price: 289.99, image: 'https://picsum.photos/seed/standingdesk/400/300' },
  { title: 'OLED Gaming Monitor 27" 165Hz', price: 699.00, image: 'https://picsum.photos/seed/oledmonitor/400/300' },
  { title: 'Smart Security Camera 2K WiFi', price: 59.95, image: 'https://picsum.photos/seed/securitycam/400/300' },
  { title: 'Noise Cancelling Desk Fan USB-C', price: 38.50, image: 'https://picsum.photos/seed/deskfan/400/300' },
  { title: 'Bluetooth Keyboard & Mouse Combo', price: 69.00, image: 'https://picsum.photos/seed/kbmousecombo/400/300' },
  { title: 'Thunderbolt 4 Docking Station', price: 189.99, image: 'https://picsum.photos/seed/dockingstation/400/300' },
  { title: 'Premium Cable Management Kit', price: 19.99, image: 'https://picsum.photos/seed/cablekit/400/300' },
  { title: 'Foldable Wireless Keyboard BT5', price: 47.00, image: 'https://picsum.photos/seed/foldkb/400/300' },
  { title: 'USB Desktop DAC Amplifier Hi-Fi', price: 139.00, image: 'https://picsum.photos/seed/dacamp/400/300' },
  { title: 'Smart AI Webcam 4K Auto-Framing', price: 249.99, image: 'https://picsum.photos/seed/aiwebcam/400/300' },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // Insert seed products
    const inserted = await Product.insertMany(products);
    console.log(`Successfully seeded ${inserted.length} products.`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
