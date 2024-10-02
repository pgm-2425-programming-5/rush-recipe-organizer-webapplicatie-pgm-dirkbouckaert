export const STORAGE_KEY = 'recipe-organizer';

export const CATEGORIES = ['Ontbijt', 'Snack', 'Lunch', 'Avondmaal', 'Dessert'];

// Add these dynamic colors to tailwind.config.js under 'safelist'
// Source: https://stackoverflow.com/questions/75440072/tailwindcss-styles-not-rendered-when-applied-dynamically-in-nextjs#answer-75461394
export const BADGE_COLORS: Record<string, string> = {
  Ontbijt: 'bg-red-500/70',
  Snack: 'bg-yellow-500/70',
  Lunch: 'bg-blue-500/70',
  Avondmaal: 'bg-pink-500/70',
  Dessert: 'bg-green-500/70',
};
