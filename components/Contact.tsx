'use client'

export default function Contact() {
  return (
    <section id="connect" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">07. CONNECT</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Let&apos;s Build Something Together
          </h3>
          <p className="font-mono text-sm md:text-base opacity-80 max-w-2xl mx-auto text-on-surface-variant">
            Have a project in mind, need to automate manual workflows, or want a custom web application with an admin dashboard? Get in touch directly via any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="ascii-border bg-surface/30 p-6 flex flex-col items-center text-center group hover:bg-surface/50 transition-all">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Zm-320-120v-400 400Z"/>
              </svg>
            </div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">Email</p>
            <p className="font-mono text-xs text-on-surface-variant break-all mb-6">marcellolienarta663@gmail.com</p>
            <a
              href="mailto:marcellolienarta663@gmail.com"
              className="mt-auto w-full py-3 bg-primary text-on-primary font-mono text-xs font-bold tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              <span>Send Email</span>
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="ascii-border bg-surface/30 p-6 flex flex-col items-center text-center group hover:bg-surface/50 transition-all">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                <path d="M792-121 671-242q-37 25-80 38.5T500-190q-121 0-205.5-84.5T210-480q0-121 84.5-205.5T500-770q121 0 205.5 84.5T790-480q0 48-13.5 91T738-309l121 121-67 67Zm-292-149q88 0 149-61t61-149q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 88 61 149t149 61ZM480-360q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z"/>
              </svg>
            </div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">WhatsApp</p>
            <p className="font-mono text-xs text-on-surface-variant mb-6">085652233323</p>
            <a
              href="https://wa.me/6285652233323"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full py-3 bg-primary text-on-primary font-mono text-xs font-bold tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              <span>Direct Chat</span>
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="ascii-border bg-surface/30 p-6 flex flex-col items-center text-center group hover:bg-surface/50 transition-all">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                <path d="M216-160e-13v-400h133v400H216Zm66-455q-23 0-39-16t-16-39q0-23 16-39t39-16q23 0 39 16t16 39q0 23-16 39t-39 16ZM416-160e-13v-400h128v55h2q18-34 60-55t85-21q90 0 139 55t49 162v204H746v-181q0-50-18-77.5T673-495q-42 0-68.5 28.5T578-392v232H416Z"/>
              </svg>
            </div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">LinkedIn</p>
            <p className="font-mono text-xs text-on-surface-variant mb-6">marcellolienarta</p>
            <a
              href="https://www.linkedin.com/in/marcellolienarta/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full py-3 bg-primary text-on-primary font-mono text-xs font-bold tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
