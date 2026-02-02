import React from 'react';

interface HorizontalSectionProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
}

const HorizontalSection: React.FC<HorizontalSectionProps> = ({
  children,
  className = '',
  width = '100vw',
}) => {
  return (
    <section
      className={`flex-shrink-0 flex items-center justify-center ${className}`}
      style={{ width }}
    >
      {children}
    </section>
  );
};

export default HorizontalSection;
