export default function ProjectDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="ascii-border p-12 bg-surface/30 text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter uppercase glitch-effect">Project_Dashboard</h1>
        <p className="text-xs opacity-50 tracking-widest uppercase animate-pulse">Initializing System... Access Restricted</p>
        <div className="h-[2px] w-full bg-outline/20">
          <div className="h-full bg-primary animate-loading-bar" style={{ width: '60%' }}></div>
        </div>
        <p className="text-[10px] opacity-40">This module is currently under development. Detailed project metrics and deployment controls will be available here.</p>
        <div className="pt-8">
           <a href="/" className="text-primary hover:underline text-[10px] uppercase tracking-widest">Return_To_Base</a>
        </div>
      </div>
    </div>
  )
}
