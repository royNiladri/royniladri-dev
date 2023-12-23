import React from 'react';

interface TechProps {
    tech: string;
}

const TechIcon: React.FC<TechProps> = ({ tech }) => {
    // const imageUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`;
const imageUrl = `https://raw.githubusercontent.com/devicons/devicon/develop/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`
    return <img className='tech-icon' src={imageUrl} alt={tech} height={32} title={tech}/>;
};

export default TechIcon;