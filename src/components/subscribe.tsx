import React, { useState } from 'react';

interface SubscriptionData {
  email: string;
  industry: string;
  updates: string[];
}

const INDUSTRIES = [
  'Financial Services',
  'Healthcare',
  'Technology',
  'Manufacturing',
  'Retail',
  'Other'
];

const UPDATE_TYPES = [
  'Compliance Updates',
  'Policy Changes',
  'Industry Standards',
  'Regulatory Alerts',
  'Best Practices'
];

const SubscriptionBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [industry, setIndustry] = useState('');
  const [selectedUpdates, setSelectedUpdates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
    }
  };

  const handleUpdateToggle = (update: string) => {
    setSelectedUpdates(prev =>
      prev.includes(update)
        ? prev.filter(u => u !== update)
        : [...prev, update]
    );
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError('');
    
    const subscriptionData: SubscriptionData = {
      email,
      industry,
      updates: selectedUpdates
    };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSuccess(true);
      setShowModal(false);
      setEmail('');
      setIndustry('');
      setSelectedUpdates([]);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Initial Email Form */}
      <form onSubmit={handleEmailSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered flex-grow"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <div className="alert alert-success mt-4">
          Successfully subscribed! Check your email for confirmation.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mt-4">
          {error}
        </div>
      )}

      {/* Preferences Modal */}
      <dialog className={`modal ${showModal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Customize Your Updates</h3>
          
          {/* Industry Selection */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Your Industry</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            >
              <option value="">Select an industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Update Types Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Update Types</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {UPDATE_TYPES.map((update) => (
                <label key={update} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedUpdates.includes(update)}
                    onChange={() => handleUpdateToggle(update)}
                  />
                  <span>{update}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button 
              className="btn btn-ghost"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              onClick={handleSubscribe}
              disabled={!industry || selectedUpdates.length === 0 || isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Complete Subscription'}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowModal(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SubscriptionBox;