import React, { useState, useEffect, useRef } from 'react';
import { Plus, MapPin, Calendar, ArrowLeft, Check, Trash2, Edit3, Cloud, CloudRain, Sun, Snowflake, Sparkles, Archive, X, ChevronDown, ChevronRight, Plane, Bookmark } from 'lucide-react';

// ============ TEMPLATES ============
const TEMPLATES = {
  beach: {
    name: 'Beach Escape',
    emoji: '🏖️',
    gradient: 'from-amber-200 via-rose-200 to-sky-200',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    categories: ['Documents', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Beach Gear', 'Shoes', 'Toiletries', 'Electronics', 'Health & Meds'],
    items: [
      { name: 'Passport', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Travel insurance', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Boarding passes', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Swimsuit', cat: 'Beach Gear', qty: 2, perDay: false },
      { name: 'Beach towel', cat: 'Beach Gear', qty: 1, perDay: false },
      { name: 'Sunscreen SPF 50', cat: 'Beach Gear', qty: 1, perDay: false },
      { name: 'Sunglasses', cat: 'Beach Gear', qty: 1, perDay: false },
      { name: 'Sun hat', cat: 'Beach Gear', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Shorts', cat: 'Comfy Outfits (day)', qty: 3, perDay: false },
      { name: 'T-shirts', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Light cardigan', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Sundress', cat: 'Nice Outfits (evening)', qty: 2, perDay: false },
      { name: 'Nice top', cat: 'Nice Outfits (evening)', qty: 2, perDay: false },
      { name: 'Wrap or shawl', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Flip flops', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Sandals', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Phone charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Headphones', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Adapter', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Pain reliever', cat: 'Health & Meds', qty: 1, perDay: false },
      { name: 'After-sun lotion', cat: 'Health & Meds', qty: 1, perDay: false },
    ],
  },
  ski: {
    name: 'Ski Trip',
    emoji: '⛷️',
    gradient: 'from-sky-200 via-slate-200 to-indigo-200',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80',
    categories: ['Documents', 'Snow Gear', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Toiletries', 'Electronics', 'Health & Meds'],
    items: [
      { name: 'Passport', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Lift pass / booking', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Travel insurance', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Ski jacket', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Ski pants', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Thermal base layers', cat: 'Snow Gear', qty: 2, perDay: false },
      { name: 'Ski socks', cat: 'Snow Gear', qty: 1, perDay: true },
      { name: 'Gloves', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Beanie', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Goggles', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Helmet', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Neck gaiter', cat: 'Snow Gear', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Sweaters', cat: 'Comfy Outfits (day)', qty: 2, perDay: false },
      { name: 'Jeans', cat: 'Comfy Outfits (day)', qty: 2, perDay: false },
      { name: 'Long sleeve tees', cat: 'Comfy Outfits (day)', qty: 2, perDay: false },
      { name: 'Nice sweater', cat: 'Nice Outfits (evening)', qty: 2, perDay: false },
      { name: 'Nice pants', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Apres-ski boots', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Lip balm SPF', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Moisturizer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Phone charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Hand warmers', cat: 'Health & Meds', qty: 4, perDay: false },
      { name: 'Pain reliever', cat: 'Health & Meds', qty: 1, perDay: false },
    ],
  },
  city: {
    name: 'City Break',
    emoji: '🏙️',
    gradient: 'from-stone-200 via-amber-100 to-rose-200',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    categories: ['Documents', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Toiletries', 'Electronics', 'Accessories'],
    items: [
      { name: 'Passport', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Boarding passes', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Reservations printout', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Socks', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Daytime outfits', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Light jacket', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'PJs', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Evening outfit', cat: 'Nice Outfits (evening)', qty: 2, perDay: false },
      { name: 'Dressy top', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Walking shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Dressy shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Flip flops', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Skincare', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Makeup', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Phone charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Portable battery', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Adapter', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Crossbody bag', cat: 'Accessories', qty: 1, perDay: false },
      { name: 'Sunglasses', cat: 'Accessories', qty: 1, perDay: false },
    ],
  },
  camping: {
    name: 'Camping',
    emoji: '🏕️',
    gradient: 'from-emerald-200 via-lime-100 to-amber-200',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    categories: ['Documents', 'Camp Gear', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Food & Cooking', 'Toiletries', 'Health & Meds'],
    items: [
      { name: 'ID', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Campsite reservation', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Tent', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Sleeping bag', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Sleeping pad', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Headlamp', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Flashlight', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Camp chair', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Multi-tool', cat: 'Camp Gear', qty: 1, perDay: false },
      { name: 'Wool socks', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Quick-dry pants', cat: 'Comfy Outfits (day)', qty: 2, perDay: false },
      { name: 'Rain jacket', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Fleece', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'T-shirts', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Cozy sweater for camp', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Warm pants for evening', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Hiking boots', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Camp shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Flip flops', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Camp stove', cat: 'Food & Cooking', qty: 1, perDay: false },
      { name: 'Fuel canister', cat: 'Food & Cooking', qty: 1, perDay: false },
      { name: 'Cookset', cat: 'Food & Cooking', qty: 1, perDay: false },
      { name: 'Water bottles', cat: 'Food & Cooking', qty: 2, perDay: false },
      { name: 'Water filter', cat: 'Food & Cooking', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Biodegradable soap', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'First aid kit', cat: 'Health & Meds', qty: 1, perDay: false },
      { name: 'Bug spray', cat: 'Health & Meds', qty: 1, perDay: false },
      { name: 'Bear spray', cat: 'Health & Meds', qty: 1, perDay: false },
    ],
  },
  business: {
    name: 'Business Trip',
    emoji: '💼',
    gradient: 'from-slate-200 via-stone-200 to-zinc-300',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    categories: ['Documents', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Electronics', 'Toiletries', 'Accessories'],
    items: [
      { name: 'ID / Passport', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Boarding passes', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Business cards', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Meeting agenda', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Casual outfit', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'PJs', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Workout clothes', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Business outfit', cat: 'Nice Outfits (evening)', qty: 1, perDay: true },
      { name: 'Socks', cat: 'Nice Outfits (evening)', qty: 1, perDay: true },
      { name: 'Blazer', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Dress shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Sneakers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Laptop', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Laptop charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Phone charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Notebook & pen', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Skincare', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair products', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Briefcase / work bag', cat: 'Accessories', qty: 1, perDay: false },
    ],
  },
  roadtrip: {
    name: 'Road Trip',
    emoji: '🚗',
    gradient: 'from-orange-200 via-amber-200 to-yellow-200',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    categories: ['Documents', 'Car Essentials', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Toiletries', 'Snacks', 'Electronics', 'Entertainment'],
    items: [
      { name: 'Drivers license', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Registration', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Insurance card', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Phone car mount', cat: 'Car Essentials', qty: 1, perDay: false },
      { name: 'Car charger', cat: 'Car Essentials', qty: 1, perDay: false },
      { name: 'Jumper cables', cat: 'Car Essentials', qty: 1, perDay: false },
      { name: 'Paper map (backup)', cat: 'Car Essentials', qty: 1, perDay: false },
      { name: 'Roadside emergency kit', cat: 'Car Essentials', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Daytime outfits', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Comfy travel clothes', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'PJs', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Evening outfit', cat: 'Nice Outfits (evening)', qty: 2, perDay: false },
      { name: 'Sneakers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Flip flops', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Water bottles', cat: 'Snacks', qty: 2, perDay: false },
      { name: 'Snack mix', cat: 'Snacks', qty: 1, perDay: false },
      { name: 'Cooler', cat: 'Snacks', qty: 1, perDay: false },
      { name: 'Auxiliary cable', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Bluetooth speaker', cat: 'Entertainment', qty: 1, perDay: false },
      { name: 'Playlist downloaded', cat: 'Entertainment', qty: 1, perDay: false },
      { name: 'Audiobook downloaded', cat: 'Entertainment', qty: 1, perDay: false },
    ],
  },
  international: {
    name: 'International',
    emoji: '✈️',
    gradient: 'from-violet-200 via-indigo-200 to-cyan-200',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    categories: ['Documents', 'Money & Cards', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Electronics', 'Toiletries', 'Health & Meds'],
    items: [
      { name: 'Passport', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Visa (if needed)', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Travel insurance', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Boarding passes', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Copies of passport', cat: 'Documents', qty: 2, perDay: false },
      { name: 'Local currency', cat: 'Money & Cards', qty: 1, perDay: false },
      { name: 'Credit card (notify bank)', cat: 'Money & Cards', qty: 2, perDay: false },
      { name: 'Backup card', cat: 'Money & Cards', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Socks', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Daytime outfits', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Jacket', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'PJs', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Evening outfit', cat: 'Nice Outfits (evening)', qty: 2, perDay: false },
      { name: 'Dressy top', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Walking shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Dressy shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Flip flops', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Universal adapter', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Phone charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Portable battery', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Travel-size toiletries', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Prescription meds', cat: 'Health & Meds', qty: 1, perDay: false },
      { name: 'Imodium / stomach meds', cat: 'Health & Meds', qty: 1, perDay: false },
      { name: 'Hand sanitizer', cat: 'Health & Meds', qty: 1, perDay: false },
    ],
  },
  weekend: {
    name: 'Weekend Getaway',
    emoji: '🧳',
    gradient: 'from-pink-200 via-rose-200 to-fuchsia-200',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    categories: ['Documents', 'Comfy Outfits (day)', 'Nice Outfits (evening)', 'Shoes', 'Toiletries', 'Electronics'],
    items: [
      { name: 'ID', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Reservation info', cat: 'Documents', qty: 1, perDay: false },
      { name: 'Underwear', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'Daytime outfits', cat: 'Comfy Outfits (day)', qty: 1, perDay: true },
      { name: 'PJs', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Jacket', cat: 'Comfy Outfits (day)', qty: 1, perDay: false },
      { name: 'Evening outfit', cat: 'Nice Outfits (evening)', qty: 1, perDay: false },
      { name: 'Sneakers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Nice shoes', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Slippers', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Flip flops', cat: 'Shoes', qty: 1, perDay: false },
      { name: 'Toothbrush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Toothpaste', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Shampoo and conditioner', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Razor', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Brush', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Hair dryer', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Vitamins', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Skincare basics', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Deodorant', cat: 'Toiletries', qty: 1, perDay: false },
      { name: 'Phone charger', cat: 'Electronics', qty: 1, perDay: false },
      { name: 'Headphones', cat: 'Electronics', qty: 1, perDay: false },
    ],
  },
};

const DEFAULT_TASKS = [
  { label: 'Check passport expiration', daysBefore: 30 },
  { label: 'Refill prescriptions', daysBefore: 14 },
  { label: 'Arrange pet / mail care', daysBefore: 7 },
  { label: 'Notify bank of travel', daysBefore: 7 },
  { label: 'Check in for flight', daysBefore: 2 },
  { label: 'Charge all devices', daysBefore: 1 },
  { label: 'Pack carry-on', daysBefore: 1 },
];

// ============ UTILITIES ============
const uid = () => Math.random().toString(36).slice(2, 11);

const daysBetween = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.round((e - s) / 86400000) + 1);
};

const daysUntil = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatDateRange = (start, end) => {
  return `${formatDate(start)} – ${formatDate(end)}`;
};

// Weather: geocode then fetch via Open-Meteo (no API key needed)
const fetchWeather = async (destination) => {
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) return null;
    const { latitude, longitude, name, country } = geoData.results[0];
    const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&temperature_unit=fahrenheit&forecast_days=7`);
    const wData = await wRes.json();
    const maxTemps = wData.daily.temperature_2m_max;
    const minTemps = wData.daily.temperature_2m_min;
    const precip = wData.daily.precipitation_probability_max;
    const codes = wData.daily.weather_code;
    const dates = wData.daily.time;
    const avgHigh = maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length;
    const avgLow = minTemps.reduce((a, b) => a + b, 0) / minTemps.length;
    const maxPrecip = Math.max(...precip);
    const daily = dates.map((date, i) => ({
      date,
      high: Math.round(maxTemps[i]),
      low: Math.round(minTemps[i]),
      precip: precip[i],
      code: codes[i],
    }));
    return { name, country, avgHigh: Math.round(avgHigh), avgLow: Math.round(avgLow), maxPrecip, daily };
  } catch (e) {
    return null;
  }
};

const getWeatherSuggestions = (weather) => {
  if (!weather) return [];
  const suggestions = [];
  if (weather.maxPrecip > 50) {
    suggestions.push({ name: 'Rain jacket', cat: 'Clothing', qty: 1, perDay: false });
    suggestions.push({ name: 'Compact umbrella', cat: 'Accessories', qty: 1, perDay: false });
  }
  if (weather.avgLow < 40) {
    suggestions.push({ name: 'Warm coat', cat: 'Clothing', qty: 1, perDay: false });
    suggestions.push({ name: 'Gloves', cat: 'Accessories', qty: 1, perDay: false });
    suggestions.push({ name: 'Wool hat', cat: 'Accessories', qty: 1, perDay: false });
    suggestions.push({ name: 'Scarf', cat: 'Accessories', qty: 1, perDay: false });
  } else if (weather.avgLow < 55) {
    suggestions.push({ name: 'Sweater', cat: 'Clothing', qty: 2, perDay: false });
    suggestions.push({ name: 'Light jacket', cat: 'Clothing', qty: 1, perDay: false });
  }
  if (weather.avgHigh > 80) {
    suggestions.push({ name: 'Sunscreen', cat: 'Toiletries', qty: 1, perDay: false });
    suggestions.push({ name: 'Sun hat', cat: 'Accessories', qty: 1, perDay: false });
    suggestions.push({ name: 'Extra water bottle', cat: 'Misc', qty: 1, perDay: false });
  }
  return suggestions;
};

const getWeatherIcon = (weather) => {
  if (!weather) return Cloud;
  if (weather.maxPrecip > 50) return CloudRain;
  if (weather.avgLow < 35) return Snowflake;
  if (weather.avgHigh > 75) return Sun;
  return Cloud;
};

// Weather code → icon (WMO standard codes from Open-Meteo)
const getCodeIcon = (code, precip) => {
  if (code >= 71 && code <= 77) return Snowflake; // snow
  if (code >= 51 && code <= 67) return CloudRain; // drizzle / rain
  if (code >= 80 && code <= 86) return CloudRain; // rain showers
  if (code >= 95) return CloudRain; // thunderstorms
  if (precip > 50) return CloudRain;
  if (code === 0 || code === 1) return Sun;
  return Cloud;
};

// Outfit guidance based on a single day's temp
const outfitForDay = (high, low, precip) => {
  if (high < 40) return 'Heavy coat, sweater';
  if (high < 55) return 'Jacket, layers';
  if (high < 68) return 'Sweater, jeans';
  if (high < 78) return 'Light layers, jeans';
  if (high < 85) return 'T-shirt, pants or shorts';
  return 'Shorts, t-shirt';
};

const dayName = (dateStr) => {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};

const dayDate = (dateStr) => {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
};

// ============ STORAGE ============
const STORAGE_KEY = 'wanderlist_v1';
const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { trips: [], customTemplates: [] };
  } catch {
    return { trips: [], customTemplates: [] };
  }
};
const saveData = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};

// ============ MAIN APP ============
export default function Wanderlist() {
  const [data, setData] = useState(loadData);
  const [view, setView] = useState({ name: 'home' });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => { saveData(data); }, [data]);

  const updateTrip = (tripId, updater) => {
    setData(d => ({
      ...d,
      trips: d.trips.map(t => t.id === tripId ? updater(t) : t)
    }));
  };

  const deleteTrip = (tripId) => {
    setData(d => ({ ...d, trips: d.trips.filter(t => t.id !== tripId) }));
    setView({ name: 'home' });
  };

  const createTrip = (templateKey, name, destination, startDate, endDate) => {
    const tpl = TEMPLATES[templateKey] || data.customTemplates.find(t => t.id === templateKey);
    if (!tpl) return;
    const days = daysBetween(startDate, endDate);
    const items = tpl.items.map(item => ({
      id: uid(),
      name: item.name,
      category: item.cat,
      quantity: item.perDay ? days : item.qty,
      isPerDay: item.perDay,
      isPacked: false,
      isSuggested: false,
    }));
    const tasks = DEFAULT_TASKS.map(t => ({ id: uid(), label: t.label, daysBefore: t.daysBefore, isDone: false }));
    const newTrip = {
      id: uid(),
      name: name || tpl.name,
      destination,
      startDate,
      endDate,
      templateKey,
      heroImage: tpl.image,
      gradient: tpl.gradient,
      categories: tpl.categories,
      items,
      tasks,
      weather: null,
      createdAt: Date.now(),
    };
    setData(d => ({ ...d, trips: [newTrip, ...d.trips] }));
    setView({ name: 'trip', tripId: newTrip.id });
    // Fetch weather async
    fetchWeather(destination).then(weather => {
      if (weather) {
        updateTrip(newTrip.id, t => ({ ...t, weather }));
      }
    });
  };

  const saveAsTemplate = (trip, customName) => {
    const newTemplate = {
      id: uid(),
      name: customName,
      emoji: '🌟',
      gradient: trip.gradient,
      image: trip.heroImage,
      categories: trip.categories,
      isCustom: true,
      items: trip.items.map(i => ({
        name: i.name, cat: i.category, qty: i.quantity, perDay: i.isPerDay
      })),
    };
    setData(d => ({ ...d, customTemplates: [...d.customTemplates, newTemplate] }));
  };

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  const currentTrip = view.name === 'trip' ? data.trips.find(t => t.id === view.tripId) : null;

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#FAF5EC', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
        .glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        @keyframes confettiFall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .anim-slide { animation: slideUp 0.4s ease-out; }
        .anim-fade { animation: fadeIn 0.3s ease-out; }
        .anim-scale { animation: scaleIn 0.3s ease-out; }
        .check-anim { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        body { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {showConfetti && <Confetti />}

      <div className="max-w-md mx-auto relative">
        {view.name === 'home' && (
          <HomeView
            trips={data.trips}
            onSelectTrip={(id) => setView({ name: 'trip', tripId: id })}
            onNewTrip={() => setView({ name: 'newTrip' })}
          />
        )}
        {view.name === 'newTrip' && (
          <NewTripView
            customTemplates={data.customTemplates}
            onCancel={() => setView({ name: 'home' })}
            onCreate={createTrip}
          />
        )}
        {view.name === 'trip' && currentTrip && (
          <TripView
            trip={currentTrip}
            onBack={() => setView({ name: 'home' })}
            onUpdate={(u) => updateTrip(currentTrip.id, u)}
            onDelete={() => deleteTrip(currentTrip.id)}
            onSaveTemplate={(name) => saveAsTemplate(currentTrip, name)}
            onComplete={() => setShowConfetti(true)}
          />
        )}
      </div>
    </div>
  );
}

// ============ CONFETTI ============
function Confetti() {
  const colors = ['#0F766E', '#C2410C', '#CA8A04', '#BE185D', '#7E22CE'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 8 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `confettiFall ${2 + Math.random()}s ease-in ${p.delay}s forwards`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

// ============ HOME VIEW ============
function HomeView({ trips, onSelectTrip, onNewTrip }) {
  const active = trips.filter(t => daysUntil(t.endDate) >= 0);
  const past = trips.filter(t => daysUntil(t.endDate) < 0);

  return (
    <div className="min-h-screen pb-24 anim-fade">
      <header className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#A8956F' }}>Issue No. 01</p>
          <Plane size={16} style={{ color: '#A8956F' }} />
        </div>
        <h1 className="font-display text-6xl leading-none tracking-tight" style={{ color: '#1A1A1A', fontWeight: 500, fontStyle: 'italic' }}>
          Wander<span style={{ fontStyle: 'normal' }}>list</span>
        </h1>
        <p className="font-body text-sm mt-3 leading-relaxed" style={{ color: '#6B5D4A' }}>
          Your travel companion for unforgettable journeys.
        </p>
      </header>

      <div className="px-6">
        <div className="h-px mb-6" style={{ backgroundColor: '#D4C5A0' }} />

        {trips.length === 0 ? (
          <EmptyState onNewTrip={onNewTrip} />
        ) : (
          <>
            {active.length > 0 && (
              <section className="mb-10">
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="font-display text-2xl" style={{ color: '#1A1A1A' }}>Upcoming</h2>
                  <span className="font-body text-xs tracking-widest uppercase" style={{ color: '#A8956F' }}>{active.length} trip{active.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="space-y-5">
                  {active.map(trip => (
                    <TripCard key={trip.id} trip={trip} onClick={() => onSelectTrip(trip.id)} />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section className="mb-10">
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="font-display text-2xl" style={{ color: '#1A1A1A' }}>Archive</h2>
                  <span className="font-body text-xs tracking-widest uppercase" style={{ color: '#A8956F' }}>{past.length}</span>
                </div>
                <div className="space-y-3">
                  {past.map(trip => (
                    <PastTripCard key={trip.id} trip={trip} onClick={() => onSelectTrip(trip.id)} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <button
        onClick={onNewTrip}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-7 py-4 rounded-full shadow-2xl flex items-center gap-2 active:scale-95 transition-transform"
        style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC', boxShadow: '0 10px 40px -10px rgba(15, 76, 74, 0.5)' }}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span className="font-body font-medium tracking-wide">New trip</span>
      </button>
    </div>
  );
}

function EmptyState({ onNewTrip }) {
  return (
    <div className="text-center py-16 anim-slide">
      <div className="text-7xl mb-6">🌍</div>
      <h2 className="font-display text-3xl mb-3" style={{ color: '#1A1A1A', fontStyle: 'italic' }}>
        Where to first?
      </h2>
      <p className="font-body text-sm mb-8 px-6 leading-relaxed" style={{ color: '#6B5D4A' }}>
        Plan your first trip and we'll handle the packing math, weather, and pre-trip prep.
      </p>
    </div>
  );
}

function TripCard({ trip, onClick }) {
  const total = trip.items.length;
  const packed = trip.items.filter(i => i.isPacked).length;
  const progress = total > 0 ? Math.round((packed / total) * 100) : 0;
  const days = daysUntil(trip.startDate);
  const isToday = days === 0;
  const isPast = daysUntil(trip.endDate) < 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-3xl overflow-hidden active:scale-[0.98] transition-transform anim-slide"
      style={{ boxShadow: '0 4px 30px -10px rgba(0,0,0,0.15)' }}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={trip.heroImage} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)' }} />

        <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <span className="font-body text-xs tracking-widest uppercase font-semibold" style={{ color: '#0F4C4A' }}>
            {isPast ? 'Completed' : isToday ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days`}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="font-body text-xs tracking-[0.2em] uppercase opacity-80 mb-1">
            {formatDateRange(trip.startDate, trip.endDate)}
          </p>
          <h3 className="font-display text-3xl leading-tight" style={{ fontWeight: 500 }}>
            {trip.destination}
          </h3>
        </div>
      </div>

      <div className="p-5" style={{ backgroundColor: '#FFFBF3' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs tracking-widest uppercase" style={{ color: '#6B5D4A' }}>Packed</span>
          <span className="font-display text-sm" style={{ color: '#1A1A1A' }}>{packed} of {total}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8DCC2' }}>
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, backgroundColor: '#0F4C4A' }}
          />
        </div>
      </div>
    </button>
  );
}

function PastTripCard({ trip, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-4 p-3 rounded-2xl active:scale-[0.98] transition-transform"
      style={{ backgroundColor: '#F4EBD7' }}
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
        <img src={trip.heroImage} alt="" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg leading-tight truncate" style={{ color: '#1A1A1A' }}>{trip.destination}</h3>
        <p className="font-body text-xs" style={{ color: '#6B5D4A' }}>{formatDateRange(trip.startDate, trip.endDate)}</p>
      </div>
      <ChevronRight size={18} style={{ color: '#A8956F' }} />
    </button>
  );
}

// ============ NEW TRIP VIEW ============
function NewTripView({ customTemplates, onCancel, onCreate }) {
  const [step, setStep] = useState(1);
  const [templateKey, setTemplateKey] = useState(null);
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const allTemplates = [
    ...Object.entries(TEMPLATES).map(([key, t]) => ({ key, ...t })),
    ...customTemplates.map(t => ({ key: t.id, ...t })),
  ];

  const selectedTemplate = allTemplates.find(t => t.key === templateKey);

  const canCreate = templateKey && destination.trim() && startDate && endDate && new Date(endDate) >= new Date(startDate);

  return (
    <div className="min-h-screen pb-12 anim-fade">
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <button onClick={onCancel} className="p-2 -ml-2 active:scale-90 transition-transform">
          <X size={24} style={{ color: '#1A1A1A' }} />
        </button>
        <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#A8956F' }}>
          Step {step} of 2
        </p>
        <div className="w-10" />
      </header>

      <div className="px-6">
        {step === 1 && (
          <div className="anim-slide">
            <h2 className="font-display text-4xl leading-tight mb-2" style={{ color: '#1A1A1A', fontStyle: 'italic', fontWeight: 500 }}>
              What kind of trip?
            </h2>
            <p className="font-body text-sm mb-8" style={{ color: '#6B5D4A' }}>
              Pick a starting point. You can customize everything.
            </p>

            <div className="space-y-3">
              {allTemplates.map(tpl => (
                <button
                  key={tpl.key}
                  onClick={() => setTemplateKey(tpl.key)}
                  className={`w-full text-left rounded-2xl overflow-hidden active:scale-[0.98] transition-all relative ${templateKey === tpl.key ? 'ring-2' : ''}`}
                  style={{
                    backgroundColor: '#FFFBF3',
                    boxShadow: templateKey === tpl.key ? '0 4px 20px -5px rgba(15,76,74,0.3)' : '0 2px 10px -5px rgba(0,0,0,0.08)',
                    ...(templateKey === tpl.key ? { '--tw-ring-color': '#0F4C4A' } : {})
                  }}
                >
                  <div className="flex items-center gap-4 p-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <img src={tpl.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        {tpl.emoji}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg leading-tight" style={{ color: '#1A1A1A' }}>{tpl.name}</h3>
                      <p className="font-body text-xs" style={{ color: '#6B5D4A' }}>
                        {tpl.items.length} items · {tpl.categories.length} categories
                      </p>
                    </div>
                    {templateKey === tpl.key && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0F4C4A' }}>
                        <Check size={14} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              disabled={!templateKey}
              onClick={() => setStep(2)}
              className="w-full mt-8 py-4 rounded-full font-body font-medium active:scale-95 transition-all disabled:opacity-40"
              style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC' }}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && selectedTemplate && (
          <div className="anim-slide">
            <h2 className="font-display text-4xl leading-tight mb-2" style={{ color: '#1A1A1A', fontStyle: 'italic', fontWeight: 500 }}>
              Tell us more.
            </h2>
            <p className="font-body text-sm mb-8" style={{ color: '#6B5D4A' }}>
              Where are you going and when?
            </p>

            <div className="space-y-5">
              <div>
                <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: '#A8956F' }}>
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="Paris, France"
                  className="w-full px-4 py-3 rounded-xl font-display text-xl outline-none focus:ring-2"
                  style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
                />
              </div>

              <div>
                <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: '#A8956F' }}>
                  Trip name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={selectedTemplate.name}
                  className="w-full px-4 py-3 rounded-xl font-body outline-none focus:ring-2"
                  style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: '#A8956F' }}>
                    Start
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl font-body outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: '#A8956F' }}>
                    End
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full px-4 py-3 rounded-xl font-body outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
                  />
                </div>
              </div>

              {startDate && endDate && new Date(endDate) >= new Date(startDate) && (
                <div className="rounded-xl p-4 anim-fade" style={{ backgroundColor: '#F4EBD7' }}>
                  <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: '#A8956F' }}>Trip length</p>
                  <p className="font-display text-2xl" style={{ color: '#1A1A1A' }}>
                    {daysBetween(startDate, endDate)} days
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-4 rounded-full font-body font-medium active:scale-95 transition-all"
                style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}
              >
                Back
              </button>
              <button
                disabled={!canCreate}
                onClick={() => onCreate(templateKey, name, destination, startDate, endDate)}
                className="flex-1 py-4 rounded-full font-body font-medium active:scale-95 transition-all disabled:opacity-40"
                style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC' }}
              >
                Create trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ TRIP VIEW ============
function TripView({ trip, onBack, onUpdate, onDelete, onSaveTemplate, onComplete }) {
  const [activeTab, setActiveTab] = useState('packing');
  const [collapsedCats, setCollapsedCats] = useState(new Set());
  const [showAddItem, setShowAddItem] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const total = trip.items.length;
  const packed = trip.items.filter(i => i.isPacked).length;
  const progress = total > 0 ? (packed / total) * 100 : 0;
  const days = daysUntil(trip.startDate);
  const isPast = daysUntil(trip.endDate) < 0;

  const wasComplete = useRef(progress === 100 && total > 0);
  useEffect(() => {
    const nowComplete = progress === 100 && total > 0;
    if (nowComplete && !wasComplete.current) {
      onComplete();
    }
    wasComplete.current = nowComplete;
  }, [progress, total, onComplete]);

  const toggleItem = (id) => {
    onUpdate(t => ({
      ...t,
      items: t.items.map(i => i.id === id ? { ...i, isPacked: !i.isPacked } : i)
    }));
  };

  const deleteItem = (id) => {
    onUpdate(t => ({ ...t, items: t.items.filter(i => i.id !== id) }));
    setEditingItem(null);
  };

  const updateItem = (id, updates) => {
    onUpdate(t => ({
      ...t,
      items: t.items.map(i => i.id === id ? { ...i, ...updates } : i)
    }));
  };

  const addItem = (name, category, quantity) => {
    const newItem = {
      id: uid(),
      name,
      category,
      quantity: parseInt(quantity) || 1,
      isPerDay: false,
      isPacked: false,
      isSuggested: false,
    };
    onUpdate(t => ({ ...t, items: [...t.items, newItem] }));
  };

  const addSuggestions = (suggestions) => {
    const days = daysBetween(trip.startDate, trip.endDate);
    const newItems = suggestions.map(s => ({
      id: uid(),
      name: s.name,
      category: trip.categories.includes(s.cat) ? s.cat : 'Misc',
      quantity: s.perDay ? days : s.qty,
      isPerDay: s.perDay,
      isPacked: false,
      isSuggested: true,
    }));
    onUpdate(t => ({ ...t, items: [...t.items, ...newItems] }));
  };

  const dismissWeather = () => {
    onUpdate(t => ({ ...t, weatherDismissed: true }));
  };

  const toggleTask = (id) => {
    onUpdate(t => ({
      ...t,
      tasks: t.tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task)
    }));
  };

  const toggleCat = (cat) => {
    setCollapsedCats(s => {
      const n = new Set(s);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
  };

  // Group items by category
  const itemsByCategory = {};
  trip.categories.forEach(c => { itemsByCategory[c] = []; });
  trip.items.forEach(item => {
    const cat = trip.categories.includes(item.category) ? item.category : 'Misc';
    if (!itemsByCategory[cat]) itemsByCategory[cat] = [];
    itemsByCategory[cat].push(item);
  });

  const suggestions = getWeatherSuggestions(trip.weather);
  const showWeather = trip.weather && !trip.weatherDismissed && suggestions.length > 0;
  const WeatherIcon = getWeatherIcon(trip.weather);

  const upcomingTasks = trip.tasks
    .filter(t => !t.isDone)
    .filter(t => days <= t.daysBefore)
    .sort((a, b) => a.daysBefore - b.daysBefore);

  return (
    <div className="min-h-screen pb-32 anim-fade">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src={trip.heroImage} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 50%, rgba(250,245,236,1) 100%)' }} />

        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
          style={{ backgroundColor: 'rgba(255,251,243,0.9)' }}
        >
          <ArrowLeft size={20} style={{ color: '#1A1A1A' }} />
        </button>

        <button
          onClick={() => setShowMenu(true)}
          className="absolute top-12 right-4 w-10 h-10 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
          style={{ backgroundColor: 'rgba(255,251,243,0.9)' }}
        >
          <Edit3 size={18} style={{ color: '#1A1A1A' }} />
        </button>

        <div className="absolute bottom-8 left-0 right-0 px-6 text-white">
          <p className="font-body text-xs tracking-[0.2em] uppercase opacity-90 mb-2">
            {formatDateRange(trip.startDate, trip.endDate)} · {daysBetween(trip.startDate, trip.endDate)} days
          </p>
          <h1 className="font-display text-5xl leading-none" style={{ fontWeight: 500 }}>{trip.destination}</h1>
        </div>
      </div>

      {/* Countdown */}
      <div className="px-6 -mt-4 relative z-10">
        <div className="rounded-2xl p-5 flex items-center justify-between" style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC' }}>
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase opacity-70 mb-1">
              {isPast ? 'Trip ended' : days === 0 ? 'Departing' : days < 0 ? 'In progress' : 'Until departure'}
            </p>
            <p className="font-display text-4xl" style={{ fontWeight: 500 }}>
              {isPast ? '✓' : days === 0 ? 'Today' : days < 0 ? `Day ${-days + 1}` : `${days} ${days === 1 ? 'day' : 'days'}`}
            </p>
          </div>
          {trip.weather && (
            <div className="text-right">
              <WeatherIcon size={32} className="mb-1 ml-auto" style={{ color: '#E8DCC2' }} />
              <p className="font-body text-xs opacity-80">{trip.weather.avgLow}° – {trip.weather.avgHigh}°F</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6">
        <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: '#F4EBD7' }}>
          <button
            onClick={() => setActiveTab('packing')}
            className="flex-1 py-2.5 rounded-full font-body text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === 'packing' ? '#FFFBF3' : 'transparent',
              color: activeTab === 'packing' ? '#0F4C4A' : '#6B5D4A',
              boxShadow: activeTab === 'packing' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Packing ({packed}/{total})
          </button>
          <button
            onClick={() => setActiveTab('prep')}
            className="flex-1 py-2.5 rounded-full font-body text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === 'prep' ? '#FFFBF3' : 'transparent',
              color: activeTab === 'prep' ? '#0F4C4A' : '#6B5D4A',
              boxShadow: activeTab === 'prep' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Pre-trip {upcomingTasks.length > 0 && `(${upcomingTasks.length})`}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {activeTab === 'packing' && total > 0 && (
        <div className="px-6 mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: '#A8956F' }}>Progress</span>
            <span className="font-display text-sm" style={{ color: '#1A1A1A' }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8DCC2' }}>
            <div
              className="h-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#CA8A04' : '#0F4C4A' }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 mt-6">
        {activeTab === 'packing' && (
          <>
            {trip.weather && trip.weather.daily && (
              <ForecastCard weather={trip.weather} />
            )}
            {showWeather && (
              <WeatherCard weather={trip.weather} suggestions={suggestions} onAdd={addSuggestions} onDismiss={dismissWeather} />
            )}

            {Object.entries(itemsByCategory).map(([cat, items]) => {
              if (items.length === 0) return null;
              const catPacked = items.filter(i => i.isPacked).length;
              const collapsed = collapsedCats.has(cat);
              return (
                <div key={cat} className="mb-5 anim-slide">
                  <button onClick={() => toggleCat(cat)} className="w-full flex items-center justify-between mb-3 py-1">
                    <div className="flex items-center gap-2">
                      {collapsed ? <ChevronRight size={18} style={{ color: '#A8956F' }} /> : <ChevronDown size={18} style={{ color: '#A8956F' }} />}
                      <h3 className="font-display text-xl" style={{ color: '#1A1A1A' }}>{cat}</h3>
                    </div>
                    <span className="font-body text-xs tracking-widest uppercase" style={{ color: '#A8956F' }}>
                      {catPacked}/{items.length}
                    </span>
                  </button>
                  {!collapsed && (
                    <div className="space-y-2">
                      {items.map(item => (
                        <ItemRow
                          key={item.id}
                          item={item}
                          onToggle={() => toggleItem(item.id)}
                          onEdit={() => setEditingItem(item)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setShowAddItem(true)}
              className="w-full py-4 rounded-2xl font-body font-medium flex items-center justify-center gap-2 mt-4 active:scale-95 transition-transform border-2 border-dashed"
              style={{ borderColor: '#D4C5A0', color: '#6B5D4A' }}
            >
              <Plus size={18} />
              Add item
            </button>
          </>
        )}

        {activeTab === 'prep' && (
          <PrepTab tasks={trip.tasks} daysOut={days} onToggle={toggleTask} />
        )}
      </div>

      {/* Modals */}
      {showAddItem && (
        <AddItemModal
          categories={trip.categories}
          onClose={() => setShowAddItem(false)}
          onAdd={(name, cat, qty) => { addItem(name, cat, qty); setShowAddItem(false); }}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          categories={trip.categories}
          onClose={() => setEditingItem(null)}
          onSave={(updates) => { updateItem(editingItem.id, updates); setEditingItem(null); }}
          onDelete={() => deleteItem(editingItem.id)}
        />
      )}

      {showMenu && (
        <TripMenu
          trip={trip}
          onClose={() => setShowMenu(false)}
          onSaveTemplate={() => { setShowMenu(false); setShowSaveTemplate(true); }}
          onDelete={() => { setShowMenu(false); onDelete(); }}
        />
      )}

      {showSaveTemplate && (
        <SaveTemplateModal
          defaultName={trip.destination}
          onClose={() => setShowSaveTemplate(false)}
          onSave={(name) => { onSaveTemplate(name); setShowSaveTemplate(false); }}
        />
      )}
    </div>
  );
}

// ============ ITEM ROW ============
function ItemRow({ item, onToggle, onEdit }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl check-anim"
      style={{
        backgroundColor: item.isPacked ? '#F4EBD7' : '#FFFBF3',
        opacity: item.isPacked ? 0.6 : 1,
      }}
    >
      <button
        onClick={onToggle}
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform check-anim"
        style={{
          backgroundColor: item.isPacked ? '#0F4C4A' : 'transparent',
          border: item.isPacked ? '2px solid #0F4C4A' : '2px solid #D4C5A0',
        }}
      >
        {item.isPacked && <Check size={14} color="#FAF5EC" strokeWidth={3} />}
      </button>
      <button onClick={onEdit} className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="font-body text-base" style={{
            color: '#1A1A1A',
            textDecoration: item.isPacked ? 'line-through' : 'none'
          }}>
            {item.name}
          </span>
          {item.isSuggested && !item.isPacked && (
            <Sparkles size={12} style={{ color: '#CA8A04' }} />
          )}
        </div>
      </button>
      {item.quantity > 1 && (
        <span
          className="font-body text-xs px-2 py-1 rounded-full"
          style={{ backgroundColor: '#E8DCC2', color: '#6B5D4A' }}
        >
          ×{item.quantity}
        </span>
      )}
    </div>
  );
}

// ============ FORECAST CARD ============
function ForecastCard({ weather }) {
  const [expanded, setExpanded] = useState(false);
  const days = weather.daily || [];
  const visible = expanded ? days : days.slice(0, 7);

  return (
    <div className="rounded-2xl mb-6 anim-scale overflow-hidden" style={{ backgroundColor: '#FFFBF3', border: '1px solid #E8DCC2' }}>
      <div className="px-5 pt-5 pb-3">
        <p className="font-body text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: '#0F4C4A' }}>
          7-day forecast · {weather.name}
        </p>
        <p className="font-display text-sm" style={{ color: '#6B5D4A' }}>
          Plan your outfits by the day.
        </p>
      </div>

      <div className="px-2 pb-3">
        {visible.map((day, i) => {
          const Icon = getCodeIcon(day.code, day.precip);
          const outfit = outfitForDay(day.high, day.low, day.precip);
          return (
            <div
              key={day.date}
              className="flex items-center gap-3 px-3 py-3 rounded-xl"
              style={{ borderBottom: i < visible.length - 1 ? '1px solid #F4EBD7' : 'none' }}
            >
              <div className="w-12 flex-shrink-0">
                <p className="font-display text-base leading-tight" style={{ color: '#1A1A1A', fontWeight: 500 }}>
                  {i === 0 ? 'Today' : dayName(day.date)}
                </p>
                <p className="font-body text-xs" style={{ color: '#A8956F' }}>{dayDate(day.date)}</p>
              </div>
              <Icon size={22} style={{ color: '#CA8A04' }} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm leading-tight" style={{ color: '#1A1A1A' }}>{outfit}</p>
                {day.precip > 30 && (
                  <p className="font-body text-xs" style={{ color: '#6B5D4A' }}>{day.precip}% rain</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-display text-base" style={{ color: '#1A1A1A', fontWeight: 500 }}>{day.high}°</p>
                <p className="font-body text-xs" style={{ color: '#A8956F' }}>{day.low}°</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ WEATHER CARD ============
function WeatherCard({ weather, suggestions, onAdd, onDismiss }) {
  const [added, setAdded] = useState(false);
  const WIcon = getWeatherIcon(weather);

  return (
    <div className="rounded-2xl p-5 mb-6 anim-scale relative overflow-hidden" style={{ backgroundColor: '#FFFBF3', border: '1px solid #E8DCC2' }}>
      <button onClick={onDismiss} className="absolute top-3 right-3 p-1 active:scale-90">
        <X size={16} style={{ color: '#A8956F' }} />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <WIcon size={18} style={{ color: '#CA8A04' }} />
        <p className="font-body text-xs tracking-widest uppercase font-semibold" style={{ color: '#CA8A04' }}>
          Weather forecast
        </p>
      </div>

      <p className="font-display text-lg mb-1" style={{ color: '#1A1A1A' }}>
        {weather.avgLow}° – {weather.avgHigh}°F
        {weather.maxPrecip > 30 && <span style={{ color: '#6B5D4A' }} className="font-body text-sm ml-2">· {weather.maxPrecip}% rain</span>}
      </p>
      <p className="font-body text-sm mb-4" style={{ color: '#6B5D4A' }}>
        Based on the conditions, we suggest adding:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((s, i) => (
          <span key={i} className="font-body text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>
            {s.name}{s.qty > 1 ? ` ×${s.qty}` : ''}
          </span>
        ))}
      </div>

      <button
        onClick={() => { onAdd(suggestions); setAdded(true); setTimeout(onDismiss, 800); }}
        disabled={added}
        className="w-full py-3 rounded-full font-body font-medium text-sm active:scale-95 transition-all"
        style={{ backgroundColor: added ? '#CA8A04' : '#0F4C4A', color: '#FAF5EC' }}
      >
        {added ? '✓ Added to list' : `Add all ${suggestions.length} items`}
      </button>
    </div>
  );
}

// ============ PREP TAB ============
function PrepTab({ tasks, daysOut, onToggle }) {
  const sorted = [...tasks].sort((a, b) => b.daysBefore - a.daysBefore);
  return (
    <div className="space-y-2 anim-slide">
      {sorted.map(task => {
        const isActive = daysOut <= task.daysBefore;
        return (
          <div
            key={task.id}
            className="flex items-center gap-3 p-4 rounded-xl check-anim"
            style={{
              backgroundColor: task.isDone ? '#F4EBD7' : '#FFFBF3',
              opacity: task.isDone ? 0.6 : isActive ? 1 : 0.55,
            }}
          >
            <button
              onClick={() => onToggle(task.id)}
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
              style={{
                backgroundColor: task.isDone ? '#0F4C4A' : 'transparent',
                border: task.isDone ? '2px solid #0F4C4A' : '2px solid #D4C5A0',
              }}
            >
              {task.isDone && <Check size={14} color="#FAF5EC" strokeWidth={3} />}
            </button>
            <div className="flex-1">
              <p className="font-body text-base" style={{
                color: '#1A1A1A',
                textDecoration: task.isDone ? 'line-through' : 'none'
              }}>
                {task.label}
              </p>
              <p className="font-body text-xs mt-0.5" style={{ color: '#A8956F' }}>
                {task.daysBefore === 1 ? '1 day' : `${task.daysBefore} days`} before departure
              </p>
            </div>
            {isActive && !task.isDone && (
              <span className="font-body text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                Due
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============ MODALS ============
function AddItemModal({ categories, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center anim-fade" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl p-6 anim-slide" style={{ backgroundColor: '#FAF5EC' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: '#D4C5A0' }} />
        <h3 className="font-display text-2xl mb-5" style={{ color: '#1A1A1A' }}>Add item</h3>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Item name"
            autoFocus
            className="w-full px-4 py-3 rounded-xl font-body outline-none"
            style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl font-body outline-none"
            style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="flex items-center gap-3">
            <label className="font-body text-sm" style={{ color: '#6B5D4A' }}>Quantity</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full font-body font-semibold" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>−</button>
              <span className="font-display text-xl w-10 text-center" style={{ color: '#1A1A1A' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full font-body font-semibold" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>+</button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="px-6 py-3 rounded-full font-body font-medium" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>Cancel</button>
          <button
            disabled={!name.trim()}
            onClick={() => onAdd(name.trim(), category, qty)}
            className="flex-1 py-3 rounded-full font-body font-medium disabled:opacity-40"
            style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC' }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function EditItemModal({ item, categories, onClose, onSave, onDelete }) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [qty, setQty] = useState(item.quantity);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center anim-fade" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl p-6 anim-slide" style={{ backgroundColor: '#FAF5EC' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: '#D4C5A0' }} />
        <h3 className="font-display text-2xl mb-5" style={{ color: '#1A1A1A' }}>Edit item</h3>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl font-body outline-none"
            style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl font-body outline-none"
            style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="flex items-center gap-3">
            <label className="font-body text-sm" style={{ color: '#6B5D4A' }}>Quantity</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full font-body font-semibold" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>−</button>
              <span className="font-display text-xl w-10 text-center" style={{ color: '#1A1A1A' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full font-body font-semibold" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>+</button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onDelete} className="p-3 rounded-full" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
            <Trash2 size={18} />
          </button>
          <button onClick={onClose} className="px-5 py-3 rounded-full font-body font-medium" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>Cancel</button>
          <button
            onClick={() => onSave({ name: name.trim(), category, quantity: qty })}
            className="flex-1 py-3 rounded-full font-body font-medium"
            style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function TripMenu({ onClose, onSaveTemplate, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center anim-fade" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl p-6 anim-slide" style={{ backgroundColor: '#FAF5EC' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: '#D4C5A0' }} />
        <h3 className="font-display text-2xl mb-5" style={{ color: '#1A1A1A' }}>Options</h3>

        <button
          onClick={onSaveTemplate}
          className="w-full flex items-center gap-4 p-4 rounded-xl mb-2 active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#FFFBF3' }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4EBD7' }}>
            <Bookmark size={18} style={{ color: '#0F4C4A' }} />
          </div>
          <div className="text-left">
            <p className="font-display text-base" style={{ color: '#1A1A1A' }}>Save as template</p>
            <p className="font-body text-xs" style={{ color: '#6B5D4A' }}>Reuse this list for future trips</p>
          </div>
        </button>

        <button
          onClick={onDelete}
          className="w-full flex items-center gap-4 p-4 rounded-xl active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#FFFBF3' }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEE2E2' }}>
            <Trash2 size={18} style={{ color: '#DC2626' }} />
          </div>
          <div className="text-left">
            <p className="font-display text-base" style={{ color: '#DC2626' }}>Delete trip</p>
            <p className="font-body text-xs" style={{ color: '#6B5D4A' }}>This can't be undone</p>
          </div>
        </button>

        <button onClick={onClose} className="w-full mt-4 py-3 rounded-full font-body font-medium" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function SaveTemplateModal({ defaultName, onClose, onSave }) {
  const [name, setName] = useState(defaultName);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center anim-fade" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl p-6 anim-slide" style={{ backgroundColor: '#FAF5EC' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: '#D4C5A0' }} />
        <h3 className="font-display text-2xl mb-2" style={{ color: '#1A1A1A' }}>Save as template</h3>
        <p className="font-body text-sm mb-5" style={{ color: '#6B5D4A' }}>Give your template a memorable name.</p>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 rounded-xl font-body outline-none"
          style={{ backgroundColor: '#FFFBF3', color: '#1A1A1A', border: '1px solid #E8DCC2' }}
        />

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="px-6 py-3 rounded-full font-body font-medium" style={{ backgroundColor: '#F4EBD7', color: '#1A1A1A' }}>Cancel</button>
          <button
            disabled={!name.trim()}
            onClick={() => onSave(name.trim())}
            className="flex-1 py-3 rounded-full font-body font-medium disabled:opacity-40"
            style={{ backgroundColor: '#0F4C4A', color: '#FAF5EC' }}
          >
            Save template
          </button>
        </div>
      </div>
    </div>
  );
}
