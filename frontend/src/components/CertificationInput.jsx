import React from 'react';

const CertificationInput = ({ certifications, setCertifications }) => {
  const addCertification = () => setCertifications([...certifications, { name: '', url: '' }]);
  const removeCertification = (index) => setCertifications(certifications.filter((_, i) => i !== index));
  const handleChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  return (
    <div>
      <h3>Certifications</h3>
      {certifications.map((cert, index) => (
        <div className="row mt-4" key={index}>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Certification Name"
              className="form-control"
              value={cert.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <input
              type="url"
              placeholder="Certification URL"
              className="form-control"
              value={cert.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-danger mt-2 w-50" type="button" onClick={() => removeCertification(index)}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary mt-2 w-50" onClick={addCertification}>Add Certification</button>
    </div>
  );
};

export default CertificationInput;
