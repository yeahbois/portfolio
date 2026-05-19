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
        padding: '12mm',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: '10pt',
        lineHeight: '1.25',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
      className="resume-container"
    >
      <div style={{ textAlign: 'center', marginBottom: '12pt' }}>
        <h1 style={{ fontSize: '20pt', fontWeight: 'bold', margin: '0 0 4pt 0' }}>Marcello Lienarta</h1>
        <p style={{ fontSize: '10pt', margin: '0 0 4pt 0' }}>Multipurpose Developer With 5 years of experience in Web Development, AI, Automation, and Robotics</p>
        <p style={{ fontSize: '9pt', margin: '0' }}>
          marcellolienarta663@gmail.com | linkedin.com/in/marcellolienarta | celloportfolio.vercel.app | Jakarta, Indonesia
        </p>
      </div>

      <section style={{ marginBottom: '10pt' }}>
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 2pt 0' }}>Experience</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        {sortedExp.map((exp, index) => (
          <div key={index} style={{ marginBottom: '8pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>{exp.company}</span>
              <span>{exp.period}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', marginBottom: '2pt' }}>
              <span>{exp.role}</span>
              <span>{exp.location}</span>
            </div>
            <div style={{ paddingLeft: '4mm' }}>
              {exp.points.map((point: string, pIndex: number) => (
                <div key={pIndex} style={{ display: 'flex', marginBottom: '2pt' }}>
                  <span style={{ marginRight: '6pt' }}>•</span>
                  <span style={{ flex: 1 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '10pt' }}>
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 2pt 0' }}>Projects</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        {sortedProj.map((proj, index) => (
          <div key={index} style={{ marginBottom: '8pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{proj.title}</span>
                <span style={{ fontStyle: 'italic' }}> | {proj.tech.join(', ')}</span>
              </div>
              {proj.href && proj.href !== '#' && (
                <a href={proj.href} style={{ textDecoration: 'none', color: 'blue', fontSize: '9pt' }}>Link</a>
              )}
            </div>
            <div style={{ paddingLeft: '4mm', marginTop: '2pt' }}>
              {proj.points.map((point: string, pIndex: number) => (
                <div key={pIndex} style={{ display: 'flex', marginBottom: '2pt' }}>
                  <span style={{ marginRight: '6pt' }}>•</span>
                  <span style={{ flex: 1 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 2pt 0' }}>Skills</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3pt' }}>
          {sortedSkills.map((skill, index) => (
            <div key={index} style={{ display: 'flex' }}>
              <span style={{ fontWeight: 'bold', minWidth: '120pt' }}>{skill.category.replace(/_/g, ' ')}: </span>
              <span style={{ flex: 1 }}>{skill.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
