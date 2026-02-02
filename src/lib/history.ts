import { supabase } from './supabase';

export interface HistoryItem {
  id: string;
  type: 'flip' | 'test';
  title: string;
  timestamp: number;
  data: {
    input?: string; // For flip: user's trouble
    result?: string; // For flip: flipped text
    testId?: string; // For test
    resultId?: string; // For test
    resultTitle?: string; // For test
  };
}

const STORAGE_KEY = 'soul_web_history';

export const HistoryManager = {
  // Get all history items (from LocalStorage for now)
  getAll: (): HistoryItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse history', e);
      return [];
    }
  },

  // Add a new history item
  add: async (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    if (typeof window === 'undefined') return;
    try {
      console.log('Adding history item:', item);
      
      // Generate ID (Polyfill for crypto.randomUUID if needed)
      const id = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Date.now().toString(36) + Math.random().toString(36).substr(2);

      // 1. Save to LocalStorage
      const history = HistoryManager.getAll();
      const newItem: HistoryItem = {
        ...item,
        id,
        timestamp: Date.now(),
      };
      
      const newHistory = [newItem, ...history].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      console.log('Saved to LocalStorage:', newItem);

      // 2. Save to Supabase
      const { data, error } = await supabase.from('history').insert({
        type: item.type,
        title: item.title,
        data: item.data,
      }).select();

      if (error) {
        console.error('Supabase insert error:', error);
      } else {
        console.log('Saved to Supabase:', data);
      }

      return newItem;
    } catch (e) {
      console.error('Failed to save history', e);
    }
  },

  // Clear all history
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};
