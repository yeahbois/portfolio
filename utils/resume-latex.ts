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
}) {
  const { experience, projects, skills } = data;

  const sortedExp = [...experience].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedProj = [...projects].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedSkills = [...skills].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return `\\documentclass[9pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.4in]{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    filecolor=magenta,
    urlcolor=blue,
    pdftitle={Marcello Lienarta - Resume},
}

\\pagestyle{empty}
\\setlist[itemize]{noitemsep, topsep=0pt, leftmargin=1.2em, partopsep=0pt, parsep=0pt}
\\titlespacing*{\\section}{0pt}{5pt}{3pt}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{Marcello Lienarta}} \\\\
    \\vspace{1pt}
    {Multipurpose Developer With 5 years of experience in Web Development, AI, Automation, and Robotics}\\\\
    \\vspace{2pt}
    \\small \\href{mailto:marcellolienarta663@gmail.com}{marcellolienarta663@gmail.com} $|$ \\href{https://linkedin.com/in/marcellolienarta}{linkedin.com/in/marcellolienarta} $|$ \\href{https://celloportfolio.vercel.app}{celloportfolio.vercel.app} $|$ Jakarta, Indonesia
\\end{center}

\\section*{Experience}
\\hrule
\\vspace{2pt}
${sortedExp.map(exp => `
\\textbf{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.period)} \\\\
\\textit{${escapeLatex(exp.role)}} \\hfill ${escapeLatex(exp.location || '')}
\\begin{itemize}
${exp.points.map((p: string) => `    \\item ${escapeLatex(p)}`).join('\n')}
\\end{itemize}
\\vspace{4pt}`).join('')}

\\section*{Projects}
\\hrule
\\vspace{2pt}
${sortedProj.map(proj => `
\\textbf{${escapeLatex(proj.title)}} $|$ \\textit{${escapeLatex(proj.tech.join(', '))}} \\hfill \\href{${proj.href}}{Link}
\\begin{itemize}
${proj.points.map((p: string) => `    \\item ${escapeLatex(p)}`).join('\n')}
\\end{itemize}
\\vspace{4pt}`).join('')}

\\section*{Skills}
\\hrule
\\vspace{2pt}
${sortedSkills.map(skill => `
\\textbf{${escapeLatex(skill.category.replace(/_/g, ' '))}}: ${escapeLatex(skill.items.join(', '))}`).join(' \\\\ \n')}

\\end{document}`;
}
