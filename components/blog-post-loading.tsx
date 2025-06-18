export function BlogPostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="animate-pulse">
        {/* Back button */}
        <div className="h-10 w-32 bg-muted rounded mb-8" />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-muted rounded" />
            <div className="h-6 w-20 bg-muted rounded" />
          </div>
          <div className="h-12 bg-muted rounded mb-6" />
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-muted rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="aspect-video bg-muted rounded-lg mb-8" />

        {/* Content */}
        <div className="space-y-4 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded" />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted rounded" />
              <div className="h-6 w-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}