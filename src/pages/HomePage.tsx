import React, { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, Activity, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProcessTable } from '@/components/ProcessTable';
import { ProcessFilters } from '@/components/ProcessFilters';
import { useUiPathProcesses, useStartProcess } from '@/hooks/useUiPathProcesses';
import { initializeUiPathSDK } from '@/lib/uipath';
import type { ProcessGetResponse } from 'uipath-sdk';
export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>();
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  // Initialize UiPath SDK on component mount
  useEffect(() => {
    const initSDK = async () => {
      try {
        console.log('🚀 HomePage: Initializing UiPath SDK...');
        await initializeUiPathSDK();
        console.log('✅ HomePage: SDK initialized successfully');
        setInitError(null);
      } catch (error) {
        console.error('❌ HomePage: SDK initialization failed:', error);
        setInitError(error instanceof Error ? error.message : 'Failed to initialize UiPath SDK');
      } finally {
        setIsInitializing(false);
      }
    };
    initSDK();
  }, []);
  // Fetch processes data
  const { 
    data: processes, 
    isLoading: processesLoading, 
    error: processesError, 
    refetch 
  } = useUiPathProcesses(selectedFolderId, !isInitializing && !initError);
  const { mutate: startProcess, isPending: isStartingProcess } = useStartProcess();
  // Filter processes based on search term
  const filteredProcesses = useMemo(() => {
    if (!processes) return [];
    const processArray = Array.isArray(processes) ? processes : processes?.value || [];
    if (!searchTerm.trim()) return processArray;
    const searchLower = searchTerm.toLowerCase();
    return processArray.filter((process: ProcessGetResponse) =>
      process.name?.toLowerCase().includes(searchLower) ||
      process.key?.toLowerCase().includes(searchLower) ||
      process.description?.toLowerCase().includes(searchLower)
    );
  }, [processes, searchTerm]);
  const handleStartProcess = (processKey: string, folderId: number) => {
    startProcess({ 
      processKey, 
      folderId: folderId || selectedFolderId || 1
    });
  };
  const handleRefresh = () => {
    refetch();
  };
  // Show initialization loading state
  if (isInitializing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">Initializing UiPath connection...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Show initialization error
  if (initError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to connect to UiPath: {initError}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-foreground">UiPath Process Manager</h1>
          </div>
          <p className="text-muted-foreground">
            Monitor and manage your UiPath Orchestrator processes
          </p>
        </div>
        {/* Filters */}
        <div className="mb-6">
          <ProcessFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedFolderId={selectedFolderId}
            onFolderChange={setSelectedFolderId}
          />
        </div>
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredProcesses.length} process{filteredProcesses.length !== 1 ? 'es' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={processesLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${processesLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        {/* Error Alert */}
        {processesError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load processes: {(processesError as Error).message}
            </AlertDescription>
          </Alert>
        )}
        {/* Process Table */}
        <ProcessTable
          processes={filteredProcesses}
          isLoading={processesLoading}
          onStartProcess={handleStartProcess}
          isStartingProcess={isStartingProcess}
        />
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © Powered by UiPath
          </p>
        </div>
      </div>
    </div>
  );
}