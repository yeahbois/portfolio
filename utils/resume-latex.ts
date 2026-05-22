export function escapeLatex(str: string) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\$/g, '\\$')
    .replace(/\&/g, '\\&')
    .replace(/\#/g, '\\#')
    .replace(/\_/g, '\\_')
    .replace(/\%/g, '\\%')
    .replace(/\~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

export function generateResumeLatex(data: {
  experience: any[];
  projects: any[];
  skills: any[];
  certificates: any[];
  achievements: any[];
}) {
  const { experience, projects, skills, certificates, achievements } = data;

  const sortedExp = [...(experience || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedProj = [...(projects || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedSkills = [...(skills || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedCert = [...(certificates || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedAch = [...(achievements || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return `\\documentclass[9pt,letterpaper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.4in]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}

\\pagestyle{empty}
\\setlist[itemize]{noitemsep, topsep=0pt, leftmargin=1.2em, partopsep=0pt, parsep=0pt}
\\titlespacing*{\\section}{0pt}{5pt}{3pt}
\\setlength{\\parindent}{0pt}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{Marcello Lienarta}} \\\\
    \\vspace{1pt}
    {Multipurpose Developer With 5 years of experience in Web Development, AI, Automation, and Robotics}\\\\
    \\vspace{2pt}
    \\small \\href{mailto:marcellolienarta663@gmail.com}{marcellolienarta663@gmail.com} $|$ \\href{https://linkedin.com/in/marcellolienarta}{linkedin.com/in/marcellolienarta} $|$ \\href{https://celloportfolio.vercel.app}{celloportfolio.vercel.app} $|$ Jakarta, Indonesia
\\end{center}

${sortedExp.length > 0 ? `
\\section*{Experience}
\\hrule
\\vspace{2pt}
${sortedExp.map(exp => `
\\textbf{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.period)} \\\\
\\textit{${escapeLatex(exp.role)}} \\hfill ${escapeLatex(exp.location || '')}
\\begin{itemize}
${exp.points.map((p: string) => `    \\item ${escapeLatex(p)}`).join('\n')}
\\end{itemize}
\\vspace{4pt}`).join('')}` : ''}

${sortedProj.length > 0 ? `
\\section*{Projects}
\\hrule
\\vspace{2pt}
${sortedProj.map(proj => `
\\textbf{${escapeLatex(proj.title)}} $|$ \\textit{${escapeLatex(proj.tech.join(', '))}} \\hfill \\href{${proj.href}}{Link}
\\begin{itemize}
${proj.points.map((p: string) => `    \\item ${escapeLatex(p)}`).join('\n')}
\\end{itemize}
\\vspace{4pt}`).join('')}` : ''}

${sortedCert.length > 0 ? `
\\section*{Certificates}
\\hrule
\\vspace{2pt}
${sortedCert.map(cert => `
\\textbf{${escapeLatex(cert.institution)}} \\hfill ${escapeLatex(cert.period)} \\\\
\\textit{${escapeLatex(cert.degree)}} \\hfill ${escapeLatex(cert.location || '')}
\\vspace{4pt}`).join('\n')}` : ''}

${sortedAch.length > 0 ? `
\\section*{Achievements}
\\hrule
\\vspace{2pt}
${sortedAch.map(ach => `
\\textbf{${escapeLatex(ach.title)}}: ${escapeLatex(ach.description)}
\\vspace{4pt}`).join('\n')}` : ''}

${sortedSkills.length > 0 ? `
\\section*{Skills}
\\hrule
\\vspace{2pt}
${sortedSkills.map(skill => `
\\textbf{${escapeLatex(skill.category.replace(/_/g, ' '))}}: ${escapeLatex(skill.items.join(', '))}
\\vspace{4pt}`).join('\n')}
` : ''}

\\end{document}`;
}
