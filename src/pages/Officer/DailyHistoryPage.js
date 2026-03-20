import React, { useState } from 'react';
import * as apiService from '../../services/apiService';
import './OfficerPages.css';

const DailyHistoryPage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const response = await apiService.generateHistoryPDF({ date });

      const contentType = response.headers['content-type'] || 'application/pdf';
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `history_${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      alert('PDF generated and downloaded');
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Error generating PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="officer-page-shell">
      <div className="container">
        <section className="officer-page-hero">
          <div>
            <p className="officer-page-eyebrow">Daily Reporting</p>
            <h1>Activity History</h1>
            <p>Generate a clean PDF record of officer actions for the selected date.</p>
          </div>
          <span className="officer-page-tag">PDF Export</span>
        </section>

        <section className="officer-panel-card">
          <div className="officer-panel-head">
            <h3>Generate Report</h3>
            <span className="officer-panel-pill">Single-click download</span>
          </div>

          <div className="form-group">
            <label>Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleGeneratePDF}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Generating...' : 'Generate & Download PDF'}
          </button>
        </section>

        <section className="officer-panel-card officer-summary-card">
          <h3>Included in Report</h3>
          <ul>
            <li>Product additions and stock updates</li>
            <li>Product edits and deactivations</li>
            <li>News and promotions published</li>
            <li>Order handling and delivery actions</li>
            <li>Timestamped officer activity log</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DailyHistoryPage;
