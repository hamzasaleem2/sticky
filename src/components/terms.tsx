import React from 'react';

const TermsOfConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-darkBg text-text dark:text-text-dark p-8 mt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Conditions</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By using Sticky, you agree to these terms. If you don't agree, well, we'll be sad, but you shouldn't use Sticky. It's like agreeing to play a board game – you've got to follow the rules to have fun!</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p>Use Sticky for good, not evil. Don't do anything illegal, harmful, or that would make your grandmother disappointed in you. Sticky is for organizing ideas, not planning world domination (unless it's in a fun, non-threatening way).</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>Keep your account info safe and sound. You're responsible for everything that happens under your account, so don't share it – not even with your cat, no matter how trustworthy they seem.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Content Responsibility</h2>
            <p>You're responsible for your sticky notes. We're not liable for any embarrassing ideas you jot down at 3 AM. Remember, with great sticky power comes great sticky responsibility.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p>We own Sticky, you own your stickies. It's a beautiful relationship, let's keep it that way. Don't try to claim you invented Sticky – we all know it was the ancient Egyptians who first used sticky notes (okay, maybe not, but you get the idea).</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p>We reserve the right to terminate accounts for misconduct. Don't make us use this power – we prefer to use our energy for creating awesome features instead.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p>We may update these terms occasionally. We'll let you know when we do, but it's up to you to stay informed. Think of it like checking your sticky notes for updates!</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfConditions;