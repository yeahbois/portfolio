'use client'

const experiences = [
  {
    company: 'TECH_CORP_INTERSTELLAR',
    role: 'SENIOR_FULLSTACK_COMMANDER',
    period: '2023 - PRESENT',
    tasks: ['LEAD_DEVELOPMENT_OF_NEURAL_NETWORKS', 'ARCHITECTED_DISTRIBUTED_SYSTEMS', 'MENTORED_JUNIOR_DROIDS'],
  },
  {
    company: 'CYBER_SECURITY_SOLUTIONS',
    role: 'LEAD_PENTESTER_&_DEV',
    period: '2021 - 2023',
    tasks: ['VULNERABILITY_ASSESSMENT', 'SECURE_API_DESIGN', 'AUTOMATED_THREAT_DETECTION'],
  },
  {
    company: 'STARTUP_X_SPACE',
    role: 'FRONTEND_ARCHITECT',
    period: '2020 - 2021',
    tasks: ['BUILT_HIGH_PERFORMANCE_DASHBOARDS', 'IMPLEMENTED_MICRO_FRONTENDS', 'UI_UX_RESEARCH'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">02. EXPERIENCE</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div className="md:col-span-1">
                <p className="font-mono text-sm text-primary">{exp.period}</p>
              </div>
              <div className="md:col-span-3 mt-2 md:mt-0">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{exp.role}</h3>
                <p className="font-mono text-sm text-on-surface-variant mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.tasks.map((task, i) => (
                    <li key={i} className="flex items-start text-sm opacity-70">
                      <span className="material-symbols-outlined text-[10px] mt-1 mr-2 text-primary">arrow_forward_ios</span>
                      <span className="font-mono">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
