'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchSuggestions } from './SearchSuggestions';

interface EnhancedSearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  defaultValue?: string;
  showClearButton?: boolean;
}

export function EnhancedSearchInput({ 
  placeholder = "Search products...",
  onSearch,
  className = '',
  defaultValue = '',
  showClearButton = true
}: EnhancedSearchInputProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleSearchSubmit = (searchQuery: string) => {
    onSearch(searchQuery);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      handleSearchSubmit(query.trim());
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
              <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`w-full rounded-full border border-gray-300 bg-white px-10 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors ${ isFocused ? 'border-gold-500' : '' } ${showClearButton && query ? 'pr-10' : ''}`}
          aria-label="Search products"
        />
        {showClearButton && query && (
          <button onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear search">
              <X className="h-4 w-4" />
              </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <SearchSuggestions query={query}
          onSelect={handleSuggestionSelect}
          onSearch={handleSearchSubmit}
          className="mt-1"
        />
      )}
    </div>
  );
}
