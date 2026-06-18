const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// ============ MIDDLEWARE ============
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  // ✅ Cookies allow karne ke liye
}));
app.use(cookieParser());  // Cookies parse karne ke liye
app.use(express.json());

// ============ SESSION SETUP ============
app.use(session({
  secret: 'blazebites_super_secret_key_2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // ✅ Development mein false
    httpOnly: true,       // ✅ JavaScript se cookie access nahi kar sakta
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din
  }
}));

// ============ MONGODB CONNECTION ============
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;||3000;
app.listen(PORT);

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ============ SCHEMAS / MODELS ============

const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  price: Number,
  category: String,
  discount: { type: Number, default: 0 },
  badge: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  phone: String,
  address: String,
  item: String,
  qty: { type: Number, default: 1 },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);

// ============ DEFAULT 15 ITEMS ============
const defaultItems = [
  { _id: "1", name: "Blaze Double Burger", price: 699, category: "burger", discount: 0, badge: "Best Seller", description: "Double flame-grilled patty, cheddar, Blaze sauce, lettuce & tomato in a brioche bun.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75" },
  { _id: "2", name: "Classic Smash Burger", price: 549, category: "burger", discount: 0, badge: "", description: "Smashed single patty, American cheese, caramelized onions & pickles.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=75" },
  { _id: "3", name: "Zinger Stack", price: 599, category: "burger", discount: 0, badge: "🌶️ Spicy", description: "Crispy fried chicken fillet, coleslaw, jalapeños & fire mayo.", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=75" },
  { _id: "4", name: "Mushroom Melt", price: 629, category: "burger", discount: 0, badge: "New", description: "Grilled patty with sautéed mushrooms, Swiss cheese & truffle aioli.", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=75" },
  { _id: "5", name: "Fire Fries Large", price: 299, category: "fries", discount: 0, badge: "Fan Fav", description: "Thick-cut fries tossed in Blaze seasoning — smoky, spicy & addictive.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=75" },
  { _id: "6", name: "Loaded Cheese Fries", price: 399, category: "fries", discount: 0, badge: "", description: "Crispy fries smothered in nacho cheese sauce & jalapeños.", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=75" },
  { _id: "7", name: "Onion Rings Basket", price: 249, category: "fries", discount: 0, badge: "", description: "Golden-fried onion rings served with garlic dip.", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=75" },
  { _id: "8", name: "Inferno Wrap", price: 549, category: "wrap", discount: 0, badge: "🔥 Hot", description: "Flame-grilled chicken strips, grilled veggies & Blaze sauce in a toasted tortilla.", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=75" },
  { _id: "9", name: "BBQ Beef Wrap", price: 599, category: "wrap", discount: 0, badge: "", description: "Pulled beef, BBQ sauce, pickled onions & crispy slaw in a whole-wheat wrap.", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=75" },
  { _id: "10", name: "Lava Wings 8 pcs", price: 799, category: "wings", discount: 0, badge: "🔥 Must Try", description: "Crispy wings tossed in our signature lava sauce. Sweet heat perfection.", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=75" },
  { _id: "11", name: "BBQ Wings 6 pcs", price: 649, category: "wings", discount: 0, badge: "", description: "Classic BBQ glazed wings with ranch dipping sauce.", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=75" },
  { _id: "12", name: "Volcano Shake", price: 349, category: "drinks", discount: 0, badge: "New", description: "Thick milkshake in Chocolate, Strawberry, or Mango Chili. Served ice-cold.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=75" },
  { _id: "13", name: "Fresh Lemonade", price: 199, category: "drinks", discount: 0, badge: "", description: "Squeezed-fresh lemonade with mint & pink salt. Ultimate refresher.", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=75" },
  { _id: "14", name: "Blaze Sundae", price: 279, category: "dessert", discount: 0, badge: "Sweet 🍦", description: "Soft-serve vanilla ice cream drizzled with our hot caramel Blaze sauce.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=75" },
  { _id: "15", name: "Molten Brownie", price: 319, category: "dessert", discount: 0, badge: "🍫", description: "Warm chocolate brownie with a gooey centre, served with vanilla ice cream.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=75" }
];

async function seedItemsIfEmpty() {
  const count = await Item.countDocuments();
  if (count === 0) {
    await Item.insertMany(defaultItems);
    console.log("🌱 Default 15 items inserted into MongoDB");
  } else {
    console.log(`📦 ${count} items already in MongoDB`);
  }
}
seedItemsIfEmpty();

let itemCounter = 16;
async function refreshItemCounter() {
  const allItems = await Item.find({}, '_id');
  const max = allItems.reduce((m, it) => {
    const num = parseInt(it._id, 10);
    return !isNaN(num) && num >= m ? num + 1 : m;
  }, 16);
  itemCounter = max;
}
refreshItemCounter();

// Serve static files
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));

// ============ SESSION ROUTES (SIRF YEH ADD HUYE HAIN) ============

// ✅ Check session status
app.get('/api/check-session', (req, res) => {
  if (req.session && req.session.isLoggedIn) {
    res.json({
      loggedIn: true,
      user: {
        username: req.session.username,
        role: req.session.role
      }
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// ✅ Logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Logout failed' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ success: true, message: 'Logged out successfully' });
    }
  });
});

// ============ API ROUTES (SIRF ADMIN LOGIN MEIN SESSION ADD KIYA) ============

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    console.log("📦 GET /api/items - Sending", items.length, "items");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new item
app.post('/api/items', async (req, res) => {
  try {
    const { name, price, category, badge, description, image } = req.body;
    const newItem = new Item({
      _id: String(itemCounter++),
      name: name,
      price: Number(price),
      category: category || 'burger',
      discount: 0,
      badge: badge || '',
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75'
    });
    await newItem.save();
    console.log("✅ New item added:", newItem.name);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Item.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (updated) {
      console.log("✏️ Item updated:", updated.name, "- Discount:", updated.discount + "%");
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Item.findOneAndDelete({ _id: id });
    console.log("🗑️ Item deleted:", deletedItem?.name);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    console.log("📋 GET /api/orders - Total orders:", orders.length);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place new order
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, item, qty } = req.body;
    const newOrder = new Order({
      _id: String(Date.now()),
      name: name,
      phone: phone,
      address: address,
      item: item,
      qty: qty || 1,
      status: 'pending',
      createdAt: new Date()
    });
    await newOrder.save();
    console.log("🛒 New order received from:", name, "- Item:", item);
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Order.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (updated) {
      console.log("✏️ Order updated:", updated._id, "- Status:", updated.status);
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findOneAndDelete({ _id: id });
    console.log("🗑️ Order deleted:", id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ ADMIN LOGIN (SESSION ADDED) ============
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Admin login attempt:", username);
  
  if (username === 'admin' && password === 'admin123') {
    // ✅ Session mein data save karo
    req.session.isLoggedIn = true;
    req.session.username = username;
    req.session.role = 'admin';
    
    console.log("✅ Admin login successful - Session ID:", req.session.id);
    res.json({ 
      success: true, 
      message: 'Login successful!',
      sessionId: req.session.id,
      user: { username, role: 'admin' }
    });
  } else {
    console.log("❌ Admin login failed");
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Setup route to reset items
app.post('/api/setup', async (req, res) => {
  try {
    await Item.deleteMany({});
    await Item.insertMany(defaultItems);
    itemCounter = 16;
    console.log("🔄 Items reset to original 15 items");
    res.json({ message: 'Items reset to original 15 items!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 ========================================`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🚀 ========================================`);
  console.log(`✅ Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`✅ Customer Website: http://localhost:${PORT}/blazebites.html`);
  console.log(`🔐 Admin Login: admin / admin123`);
  console.log(`👤 Customer Login: admin / 1234`);
  console.log(`\n📝 API Endpoints:`);
  console.log(`   GET    /api/items - Get all items`);
  console.log(`   POST   /api/items - Add new item`);
  console.log(`   PUT    /api/items/:id - Update item`);
  console.log(`   DELETE /api/items/:id - Delete item`);
  console.log(`   GET    /api/orders - Get all orders`);
  console.log(`   POST   /api/orders - Place new order`);
  console.log(`   PUT    /api/orders/:id - Update order status`);
  console.log(`   DELETE /api/orders/:id - Delete order`);
  console.log(`   GET    /api/check-session - Check session status`);
  console.log(`   POST   /api/admin/logout - Logout`);
  console.log(`========================================\n`);
});