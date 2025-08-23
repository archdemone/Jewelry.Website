'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchSuggestions({ query, onSelect, onSearch, className = '' }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Popular searches based on jewelry trends - memoized to prevent re-renders
  const popularSearchesData = useMemo(() => [
    'Rose Gold Engagement Ring',
    'Diamond Solitaire',
    'Vintage Wedding Band',
    'Minimalist Ring',
    'Statement Ring',
    'Stackable Rings',
    'Eternity Band',
    'Signet Ring',
    'Halo Ring',
    'Pearl Ring'
  ], []);

  useEffect(() => {
    // Load recent searches from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
    setPopularSearches(popularSearchesData);
  }, [popularSearchesData]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(true);
      return;
    }

    // Search synonyms and related terms - moved inside useEffect to avoid dependency issues
    const searchSynonyms = {
      'ring': ['rings', 'band', 'bands', 'jewelry', 'engagement ring', 'wedding ring'],
      'rings': ['ring', 'bands', 'jewelry', 'engagement rings', 'wedding rings'],
      'engagement': ['engagement ring', 'proposal ring', 'diamond ring', 'solitaire'],
      'wedding': ['wedding band', 'wedding ring', 'marriage ring', 'ceremony ring'],
      'gold': ['yellow gold', 'rose gold', 'white gold', 'precious metal'],
      'silver': ['sterling silver', 'white metal', 'precious metal'],
      'diamond': ['diamonds', 'gemstone', 'precious stone', 'solitaire'],
      'ruby': ['rubies', 'red gemstone', 'precious stone', 'birthstone'],
      'sapphire': ['sapphires', 'blue gemstone', 'precious stone', 'birthstone'],
      'emerald': ['emeralds', 'green gemstone', 'precious stone', 'birthstone'],
      'pearl': ['pearls', 'organic gem', 'natural pearl', 'cultured pearl'],
      'vintage': ['antique', 'classic', 'retro', 'timeless'],
      'modern': ['contemporary', 'minimalist', 'sleek', 'trendy'],
      'minimalist': ['simple', 'clean', 'understated', 'elegant'],
      'statement': ['bold', 'dramatic', 'eye-catching', 'showstopper'],
      'stackable': ['stack', 'layered', 'mix and match', 'versatile'],
      'eternity': ['eternity ring', 'full eternity', 'half eternity', 'anniversary'],
      'signet': ['signet ring', 'family crest', 'monogram', 'personalized'],
      'solitaire': ['single stone', 'diamond solitaire', 'classic solitaire'],
      'halo': ['halo ring', 'surround', 'enhanced', 'sparkle'],
    };

    const generateSuggestions = () => {
      const queryLower = query.toLowerCase();
      const newSuggestions: string[] = [];

      // Add exact matches first
      if (queryLower.includes('ring')) {
        newSuggestions.push('Rings');
      }
      if (queryLower.includes('engagement')) {
        newSuggestions.push('Engagement Rings');
      }
      if (queryLower.includes('wedding')) {
        newSuggestions.push('Wedding Bands');
      }

      // Add synonyms
      Object.entries(searchSynonyms).forEach(([key, synonyms]) => {
        if (queryLower.includes(key)) {
          synonyms.forEach(synonym => {
            if (!newSuggestions.includes(synonym) && newSuggestions.length < 8) {
              newSuggestions.push(synonym);
            }
          });
        }
      });

      // Add popular searches that match
      popularSearches.forEach(popular => {
        if (popular.toLowerCase().includes(queryLower) && !newSuggestions.includes(popular)) {
          newSuggestions.push(popular);
        }
      });

      setSuggestions(newSuggestions.slice(0, 8));
      setShowSuggestions(true);
    };

    const timeoutId = setTimeout(generateSuggestions, 200);
    return () => clearTimeout(timeoutId);
  }, [query, popularSearches]);

  const handleSuggestionClick = (suggestion: string) => {
    onSelect(suggestion);
    setShowSuggestions(false);
    
    // Save to recent searches
    const updated = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 5);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          onSearch(query);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = (searchTerm: string) => {
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  if (!showSuggestions) return null;

  return (
    <div 
      ref={containerRef}
      className={`absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg ${className}`}
      onKeyDown={handleKeyDown}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Search Suggestions */}
          {query.trim() && suggestions.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Suggestions</span>
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button              key={suggestion}              onClick={() => handleSuggestionClick(suggestion)}              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      index === selectedIndex ? 'bg-gray-50 text-gold-600' : 'text-gray-700'
                    }`}
                  >
                    <Search className="h-3 w-3 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Recent Searches</span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button              key={search}              onClick={() => handleSearch(search)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Clock className="h-3 w-3 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query.trim() && (
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 6).map((search) => (
                  <button              key={search}              onClick={() => handleSearch(search)}
                    className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gold-100 hover:text-gold-700 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Press <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">Enter</kbd> to search, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
