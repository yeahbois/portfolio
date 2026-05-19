'use client'

import React from 'react';

interface ResumePreviewProps {
  data: {
    experience: any[];
    projects: any[];
    skills: any[];
  };
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
  const { experience, projects, skills } = data;

  const sortedExp = [...experience].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedProj = [...projects].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedSkills = [...skills].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return (
    <div
      ref={ref}
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '10mm',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: '9pt',
        lineHeight: '1.2',
        margin: '0 auto',
      }}
      className="resume-container"
    >
      <div style={{ textAlign: 'center', marginBottom: '10pt' }}>
        <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '0 0 2pt 0' }}>Marcello Lienarta</h1>
        <p style={{ margin: '0 0 2pt 0' }}>Multipurpose Developer With 5 years of experience in Web Development, AI, Automation, and Robotics</p>
        <p style={{ fontSize: '8pt', margin: '0' }}>
          marcellolienarta663@gmail.com | linkedin.com/in/marcellolienarta | celloportfolio.vercel.app | Jakarta, Indonesia
        </p>
      </div>

      <section style={{ marginBottom: '8pt' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '0.5pt solid black', marginBottom: '4pt' }}>Experience</h2>
        {sortedExp.map((exp, index) => (
          <div key={index} style={{ marginBottom: '6pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>{exp.company}</span>
              <span>{exp.period}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic' }}>
              <span>{exp.role}</span>
              <span>{exp.location}</span>
            </div>
            <ul style={{ margin: '2pt 0 0 0', paddingLeft: '15pt', listStyleType: 'disc' }}>
              {exp.points.map((point: string, pIndex: number) => (
                <li key={pIndex} style={{ marginBottom: '1pt' }}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '8pt' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '0.5pt solid black', marginBottom: '4pt' }}>Projects</h2>
        {sortedProj.map((proj, index) => (
          <div key={index} style={{ marginBottom: '6pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{proj.title}</span>
                <span style={{ fontStyle: 'italic' }}> | {proj.tech.join(', ')}</span>
              </div>
              {proj.href && proj.href !== '#' && (
                <a href={proj.href} style={{ textDecoration: 'none', color: 'blue', fontSize: '8pt' }}>Link</a>
              )}
            </div>
            <ul style={{ margin: '2pt 0 0 0', paddingLeft: '15pt', listStyleType: 'disc' }}>
              {proj.points.map((point: string, pIndex: number) => (
                <li key={pIndex} style={{ marginBottom: '1pt' }}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '0.5pt solid black', marginBottom: '4pt' }}>Skills</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2pt' }}>
          {sortedSkills.map((skill, index) => (
            <div key={index}>
              <span style={{ fontWeight: 'bold' }}>{skill.category.replace(/_/g, ' ')}: </span>
              <span>{skill.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
