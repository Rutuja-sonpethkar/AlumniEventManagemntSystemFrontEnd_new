import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample job listings for students (Alumni Management System)
const studentJobListings = [
  {
    jobTitle: 'Junior Web Developer',
    companyName: 'Tech Solutions Inc.',
    jobDescription: 'Develop and maintain company websites and web applications.',
    jobLocation: 'Mumbai, Maharashtra',
    salary: '$50,000 - $70,000 per year',
    contactEmail: 'hr@techsolutions.com',
    location: 'Mumbai',
  },
  {
    jobTitle: 'Software Engineer Intern',
    companyName: 'Innovative Software Ltd.',
    jobDescription: 'Assist in developing software solutions and testing code.',
    jobLocation: 'Bangalore, Karnataka',
    salary: 'Unpaid (with opportunity for full-time position)',
    contactEmail: 'careers@innovativesoftware.com',
    location: 'Bangalore',
  },
  {
    jobTitle: 'Marketing Assistant',
    companyName: 'Creative Marketing Group',
    jobDescription: 'Assist in executing digital marketing campaigns and analyzing results.',
    jobLocation: 'Pune, Maharashtra',
    salary: '$30,000 - $45,000 per year',
    contactEmail: 'jobs@creativemarketing.com',
    location: 'Pune',
  },
  {
    jobTitle: 'Data Analyst Intern',
    companyName: 'DataGen Analytics',
    jobDescription: 'Analyze data and provide insights to improve business decisions.',
    jobLocation: 'Pune, Maharashtra',
    salary: 'Unpaid (with potential for full-time role)',
    contactEmail: 'careers@datagen.com',
    location: 'Pune',
  },
  {
    jobTitle: 'Product Marketing Associate',
    companyName: 'MarketPro Solutions',
    jobDescription: 'Assist the marketing team with product promotions and customer outreach.',
    jobLocation: 'Punjab, India',
    salary: '$35,000 - $50,000 per year',
    contactEmail: 'jobs@marketprosolutions.com',
    location: 'Punjab',
  },
  {
    jobTitle: 'Marketing Assistant',
    companyName: 'Creative Marketing Group',
    jobDescription: 'Assist in executing digital marketing campaigns and analyzing results.',
    jobLocation: 'Mumbai, Maharashtra',
    salary: '$50,000 - $55,000 per year',
    contactEmail: 'jobs@creativemarketing.com',
    location: 'Mumbai',
  },
];

const Job = () => {
  return (
    <div className="container-fluid ">
      <h2 className="text-center mb-4">Job Opportunities for Students</h2>

      <div className="row">
        {studentJobListings.length === 0 ? (
          <p className="text-center">No job listings available.</p>
        ) : (
          studentJobListings.map((job, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm border-light rounded" style={{ height: '100%' }}>
                <div className="card-body">
                  <h5 className="card-title">{job.jobTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
                  <p className="card-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {job.jobDescription}
                  </p>
                  <p><strong>Location:</strong> {job.jobLocation}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>

                  {/* Apply Button */}
                  <a href={`mailto:${job.contactEmail}`} className="btn btn-primary mt-3">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Job;
