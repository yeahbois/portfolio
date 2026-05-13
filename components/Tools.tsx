import Link from 'next/link'

export default function Tools() {
  const tools = [
    {
      id: 'drivecdn',
      name: 'DRIVE_TO_CDN_v1.0',
      description: 'Convert Google Drive links into direct CDN access points with preview capabilities.',
      href: '/tools/drivecdn',
      tag: 'UTILITY'
    },
    {
      id: 'projectdashboard',
      name: 'PROJECT_DASHBOARD_v1.0',
      description: 'Centralized control center for project management and deployment metrics.',
      href: '/project/dashboard',
      tag: 'MANAGEMENT'
    },
    {
      id: 'delfdalf',
      name: 'DELF_DALF_STUDY_TOOL',
      description: 'Comprehensive resources and tracking for French language proficiency exams.',
      href: '/tools/delf-dalf',
      tag: 'EDUCATION'
    },
    {
      id: 'hskcsca',
      name: 'HSK_CSCA_STUDY_TOOL',
      description: 'Specialized preparation module for Chinese proficiency and CSCA assessments.',
      href: '/tools/hsk-csca',
      tag: 'EDUCATION'
    }
  ]

  return (
    <section id="tools" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">04. SYSTEM_TOOLS</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="ascii-border p-6 bg-surface/30 hover:bg-surface-variant/20 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-4xl font-black">{tool.id.toUpperCase()}</span>
             </div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-primary font-bold">{tool.tag}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{tool.name}</h3>
            <p className="text-sm text-on-surface/90 mb-6 font-mono leading-relaxed">
              {tool.description}
            </p>
            <Link
              href={tool.href}
              className="inline-block px-6 py-2 border border-outline/20 text-[10px] font-mono tracking-widest hover:bg-primary hover:text-on-primary hover:border-primary transition-all uppercase"
            >
              Access_Tool.exe
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
