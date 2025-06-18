"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

const popularTags = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', 
  'Web Development', 'Frontend', 'Backend', 'Tutorial'
];

export function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');

  const updateURL = (newSearch: string, newTag: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newTag) params.set('tag', newTag);
    
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateURL(value, selectedTag);
  };

  const handleTagSelect = (tag: string) => {
    const newTag = selectedTag === tag ? '' : tag;
    setSelectedTag(newTag);
    updateURL(search, newTag);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTag('');
    router.push('/');
  };

  const hasActiveFilters = search || selectedTag;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Tags Filter */}
      <div className="text-center">
        <div className="inline-flex flex-wrap gap-2 justify-center">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Active filters:
            {search && (
              <Badge variant="secondary">
                Search: "{search}"
              </Badge>
            )}
            {selectedTag && (
              <Badge variant="secondary">
                Tag: {selectedTag}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-1"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}