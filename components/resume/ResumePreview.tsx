'use client'

import React from 'react';

interface ResumePreviewProps {
    data: {
        experience: any[];
        projects: any[];
        skills: any[];
        certificates: any[];
        achievements: any[];
    };
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
    const { experience, projects, skills, certificates, achievements } = data;

    const sortedExp = [...(experience || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    const sortedProj = [...(projects || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    const sortedSkills = [...(skills || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    const sortedCert = [...(certificates || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    const sortedAch = [...(achievements || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    return (
        <div
            ref={ref}
            style={{
                width: '8.5in',
                minHeight: '11in',
                padding: '0.4in',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: '9pt',
                lineHeight: '1.15',
                margin: '0 auto',
                boxSizing: 'border-box'
            }}
            className="resume-container"
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '10pt' }}>
                <h1 style={{ fontSize: '22pt', fontWeight: 'bold', margin: '0 0 2pt 0', letterSpacing: '-0.02em' }}>Marcello Lienarta</h1>
                <div style={{ marginBottom: '4pt', fontWeight: '500' }}>Full-Stack Developer | Automation & Artificial Intelligence Systems Builder</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10pt', fontSize: '8.5pt', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
                        marcellolienarta663@gmail.com
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
                        <a href="https://linkedin.com/in/marcellolienarta" style={{ color: 'black', textDecoration: 'underline' }}>linkedin.com/in/marcellolienarta</a>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
                        <a href="https://github.com/yeahbois" style={{ color: 'black', textDecoration: 'underline' }}>github.com/yeahbois</a>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
                        <a href="https://cellodev.web.id" style={{ color: 'black', textDecoration: 'underline' }}>cellodev.web.id</a>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3pt' }}>
                        Jakarta, Indonesia
                    </span>
                </div>
            </div>

            {/* Experience */}
            {sortedExp.length > 0 && (
                <section style={{ marginBottom: '10pt' }}>
                    <h2 style={{ fontSize: '10.5pt', fontWeight: 'bold', margin: '0 0 2pt 0', textTransform: 'uppercase' }}>Experience</h2>
                    <div style={{ borderBottom: '0.5pt solid black', marginBottom: '5pt' }}></div>
                    {sortedExp.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{exp.company}</span>
                                <span>{exp.period}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '8.5pt', marginBottom: '2pt' }}>
                                <span>{exp.role}</span>
                                <span>{exp.location}</span>
                            </div>
                            <div style={{ paddingLeft: '12pt' }}>
                                {exp.points?.map((point: string, pIndex: number) => (
                                    <div key={pIndex} style={{ display: 'flex', marginBottom: '1pt', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '-10pt' }}>•</span>
                                        <span style={{ flex: 1 }}>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {sortedProj.length > 0 && (
                <section style={{ marginBottom: '10pt' }}>
                    <h2 style={{ fontSize: '10.5pt', fontWeight: 'bold', margin: '0 0 2pt 0', textTransform: 'uppercase' }}>Projects</h2>
                    <div style={{ borderBottom: '0.5pt solid black', marginBottom: '5pt' }}></div>
                    {sortedProj.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    {proj.title} <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>| {proj.tech?.join(', ')}</span>
                                </div>
                                {proj.href && proj.href !== '#' && (
                                    <a href={proj.href} style={{ textDecoration: 'none', color: '#0066cc', fontSize: '8.5pt', fontWeight: 'bold' }}>Link</a>
                                )}
                            </div>
                            <div style={{ paddingLeft: '12pt', marginTop: '1pt' }}>
                                {proj.points?.map((point: string, pIndex: number) => (
                                    <div key={pIndex} style={{ display: 'flex', marginBottom: '1pt', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '-10pt' }}>•</span>
                                        <span style={{ flex: 1 }}>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Certificates */}
            {sortedCert.length > 0 && (
                <section style={{ marginBottom: '10pt' }}>
                    <h2 style={{ fontSize: '10.5pt', fontWeight: 'bold', margin: '0 0 2pt 0', textTransform: 'uppercase' }}>Certificates</h2>
                    <div style={{ borderBottom: '0.5pt solid black', marginBottom: '5pt' }}></div>
                    {sortedCert.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '4pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{edu.institution}</span>
                                <span>{edu.period}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '8.5pt' }}>
                                <span>{edu.degree}</span>
                                <span>{edu.location}</span>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Achievements */}
            {sortedAch.length > 0 && (
                <section style={{ marginBottom: '10pt' }}>
                    <h2 style={{ fontSize: '10.5pt', fontWeight: 'bold', margin: '0 0 2pt 0', textTransform: 'uppercase' }}>Achievements</h2>
                    <div style={{ borderBottom: '0.5pt solid black', marginBottom: '5pt' }}></div>
                    <div style={{ paddingLeft: '12pt' }}>
                        {sortedAch.map((award, index) => (
                            <div key={index} style={{ marginBottom: '2pt' }}>
                                <span style={{ fontWeight: 'bold' }}>{award.title}: </span>
                                <span>{award.description}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Technical Skills */}
            {sortedSkills.length > 0 && (
                <section>
                    <h2 style={{ fontSize: '10.5pt', fontWeight: 'bold', margin: '0 0 2pt 0', textTransform: 'uppercase' }}>Technical Skills</h2>
                    <div style={{ borderBottom: '0.5pt solid black', marginBottom: '5pt' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1pt' }}>
                        {sortedSkills.map((skill, index) => (
                            <div key={index}>
                                <span style={{ fontWeight: 'bold' }}>{skill.category.replace(/_/g, ' ')}: </span>
                                <span>{skill.items?.join(', ')}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
