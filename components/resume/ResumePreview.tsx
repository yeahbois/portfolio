'use client'

import React from 'react';

interface ResumePreviewProps {
  data: {
    experience: any[];
    projects: any[];
    skills: any[];
    education: any[];
    awards: any[];
  };
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
  const { experience, projects, skills, education, awards } = data;

  const sortedExp = [...experience].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedProj = [...projects].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedSkills = [...skills].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedEdu = [...education].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  const sortedAwards = [...awards].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return (
    <div
      ref={ref}
      style={{
        width: '8.5in',
        minHeight: '11in',
        padding: '0.5in',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontSize: '9.5pt',
        lineHeight: '1.2',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
      className="resume-container"
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '15pt' }}>
        <h1 style={{ fontSize: '26pt', fontWeight: 'bold', margin: '0 0 4pt 0', letterSpacing: '-0.02em' }}>Marcello Lienarta</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12pt', fontSize: '9pt', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
             marcellolienarta663@gmail.com
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
             <a href="https://linkedin.com/in/marcellolienarta" style={{ color: 'black', textDecoration: 'underline' }}>linkedin.com/in/marcellolienarta</a>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
             <a href="https://celloportfolio.vercel.app" style={{ color: 'black', textDecoration: 'underline' }}>celloportfolio.vercel.app</a>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
             Jakarta, Indonesia
          </span>
        </div>
      </div>

      {/* Experience */}
      <section style={{ marginBottom: '12pt' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 2pt 0' }}>Experience</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        {sortedExp.map((exp, index) => (
          <div key={index} style={{ marginBottom: '10pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>{exp.company}</span>
              <span>{exp.period}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '9pt', marginBottom: '2pt' }}>
              <span>{exp.role}</span>
              <span>{exp.location}</span>
            </div>
            <div style={{ paddingLeft: '12pt' }}>
              {exp.points?.map((point: string, pIndex: number) => (
                <div key={pIndex} style={{ display: 'flex', marginBottom: '2pt', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-10pt' }}>•</span>
                  <span style={{ flex: 1 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section style={{ marginBottom: '12pt' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 2pt 0' }}>Projects</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        {sortedProj.map((proj, index) => (
          <div key={index} style={{ marginBottom: '10pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 'bold' }}>
                {proj.title} <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>| {proj.tech?.join(', ')}</span>
              </div>
              {proj.href && proj.href !== '#' && (
                <a href={proj.href} style={{ textDecoration: 'none', color: '#0066cc', fontSize: '9pt', fontWeight: 'bold' }}>Link</a>
              )}
            </div>
            <div style={{ paddingLeft: '12pt', marginTop: '2pt' }}>
              {proj.points?.map((point: string, pIndex: number) => (
                <div key={pIndex} style={{ display: 'flex', marginBottom: '2pt', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-10pt' }}>•</span>
                  <span style={{ flex: 1 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '12pt' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 2pt 0' }}>Education</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        {sortedEdu.map((edu, index) => (
          <div key={index} style={{ marginBottom: '6pt' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>{edu.institution}</span>
              <span>{edu.period}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '9pt' }}>
              <span>{edu.degree}</span>
              <span>{edu.location}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Awards & Activities */}
      {sortedAwards.length > 0 && (
        <section style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 2pt 0' }}>Awards and Activities</h2>
          <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
          <div style={{ paddingLeft: '12pt' }}>
            {sortedAwards.map((award, index) => (
              <div key={index} style={{ marginBottom: '4pt' }}>
                <span style={{ fontWeight: 'bold' }}>{award.title}: </span>
                <span>{award.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      <section>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '0 0 2pt 0' }}>Technical Skills</h2>
        <div style={{ borderBottom: '1px solid black', marginBottom: '6pt' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2pt' }}>
          {sortedSkills.map((skill, index) => (
            <div key={index}>
              <span style={{ fontWeight: 'bold' }}>{skill.category.replace(/_/g, ' ')}: </span>
              <span>{skill.items?.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
