import React from 'react';
import { Github } from 'lucide-react';
import { Button } from '../ui/button';

const OpenSourceSection: React.FC = () => {
  return (
    <section className="px-4 py-16 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-text dark:text-text-dark">
          Sticky is Open Source
        </h2>
        <p className="text-xl mb-8 text-text dark:text-text-dark">
          We believe in transparency and community-driven development. Sticky is open source, and we welcome contributions from developers like you!
        </p>
        <Button
          onClick={() => window.open('https://github.com/hamzasaleem2/sticky', '_blank')}
          className="inline-flex items-center text-lg px-6 py-3"
        >
          <Github className="mr-2 h-5 w-5" />
          View on GitHub
        </Button>
      </div>
    </section>
  );
};

export default OpenSourceSection;