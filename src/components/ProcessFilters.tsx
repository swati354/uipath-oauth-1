import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
interface ProcessFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFolderId?: number;
  onFolderChange: (folderId: number | undefined) => void;
}
export function ProcessFilters({
  searchTerm,
  onSearchChange,
  selectedFolderId,
  onFolderChange
}: ProcessFiltersProps) {
  return (
    <Card className="p-4 border-border">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search processes by name, key, or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-input"
            />
          </div>
        </div>
        {/* Folder Filter */}
        <div className="sm:w-64">
          <Select
            value={selectedFolderId?.toString() || 'all'}
            onValueChange={(value) => 
              onFolderChange(value === 'all' ? undefined : parseInt(value))
            }
          >
            <SelectTrigger className="bg-background border-input">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="All Folders" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              <SelectItem value="1">Default Folder</SelectItem>
              <SelectItem value="2">Production</SelectItem>
              <SelectItem value="3">Development</SelectItem>
              <SelectItem value="4">Testing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}