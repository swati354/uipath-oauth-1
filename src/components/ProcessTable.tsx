import React, { useState } from 'react';
import { Play, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import type { ProcessGetResponse } from 'uipath-sdk';
interface ProcessTableProps {
  processes: ProcessGetResponse[];
  isLoading: boolean;
  onStartProcess: (processKey: string, folderId: number) => void;
  isStartingProcess: boolean;
}
type SortField = 'name' | 'key' | 'description';
type SortDirection = 'asc' | 'desc';
export function ProcessTable({ 
  processes, 
  isLoading, 
  onStartProcess, 
  isStartingProcess 
}: ProcessTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    process: ProcessGetResponse | null;
  }>({ isOpen: false, process: null });
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const sortedProcesses = React.useMemo(() => {
    if (!processes) return [];
    return [...processes].sort((a, b) => {
      let aValue = '';
      let bValue = '';
      switch (sortField) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'key':
          aValue = a.key || '';
          bValue = b.key || '';
          break;
        case 'description':
          aValue = a.description || '';
          bValue = b.description || '';
          break;
      }
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [processes, sortField, sortDirection]);
  const handleStartClick = (process: ProcessGetResponse) => {
    setConfirmDialog({ isOpen: true, process });
  };
  const handleConfirmStart = () => {
    if (confirmDialog.process) {
      onStartProcess(confirmDialog.process.key!, confirmDialog.process.folderId || 1);
      setConfirmDialog({ isOpen: false, process: null });
    }
  };
  const handleCancelStart = () => {
    setConfirmDialog({ isOpen: false, process: null });
  };
  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium text-left justify-start hover:bg-transparent"
    >
      {children}
      <ArrowUpDown className="ml-2 h-3 w-3" />
    </Button>
  );
  if (isLoading) {
    return (
      <div className="border border-border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="font-semibold">Process Name</TableHead>
              <TableHead className="font-semibold">Key</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i} className="border-border">
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded w-24" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded w-48" />
                </TableCell>
                <TableCell>
                  <div className="h-6 bg-muted animate-pulse rounded w-20" />
                </TableCell>
                <TableCell>
                  <div className="h-8 bg-muted animate-pulse rounded w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  if (!processes || processes.length === 0) {
    return (
      <div className="border border-border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="font-semibold">Process Name</TableHead>
              <TableHead className="font-semibold">Key</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                No processes found. Create processes in UiPath Orchestrator to see them here.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/50">
              <TableHead className="font-semibold">
                <SortButton field="name">Process Name</SortButton>
              </TableHead>
              <TableHead className="font-semibold">
                <SortButton field="key">Key</SortButton>
              </TableHead>
              <TableHead className="font-semibold">
                <SortButton field="description">Description</SortButton>
              </TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProcesses.map((process) => (
              <TableRow 
                key={process.id} 
                className="border-border hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="text-foreground">{process.name}</span>
                    {process.processVersion && (
                      <span className="text-xs text-muted-foreground">
                        v{process.processVersion}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {process.key}
                  </code>
                </TableCell>
                <TableCell className="max-w-md">
                  <span className="text-muted-foreground line-clamp-2">
                    {process.description || 'No description available'}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status="Available" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStartClick(process)}
                      disabled={isStartingProcess}
                      className="gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Start
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onConfirm={handleConfirmStart}
        onCancel={handleCancelStart}
        title="Start Process"
        description={`Are you sure you want to start the process "${confirmDialog.process?.name}"?`}
        confirmText="Start Process"
        isLoading={isStartingProcess}
      />
    </>
  );
}