import React from 'react';

const EducationInput = ({ education, setEducation }) => {
  const addEducation = () => setEducation([...education, { school_name: '', degree_name: '', year: '', gpa: '' }]);
  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));
  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  return (
    <div>
      <h3>Education</h3>
      {education?.map((edu, index) => (
        <div className="row mt-4" key={index}>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="School Name"
              className="form-control"
              value={edu.school_name}
              onChange={(e) => handleChange(index, 'school_name', e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Degree Name"
              className="form-control"
              value={edu.degree_name}
              onChange={(e) => handleChange(index, 'degree_name', e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-2">
            <input
              type="number"
              className="form-control"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-2">
            <input
              type="number"
              className="form-control"
              step="0.1"
              placeholder="GPA"
              value={edu.gpa}
              onChange={(e) => handleChange(index, 'gpa', e.target.value)}
            />
          </div>
          <button className="btn btn-danger mt-2 btn-sm w-50" type="button" onClick={() => removeEducation(index)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-secondary mt-2 w-50" type="button" onClick={addEducation}>Add Education</button>
    </div>
  );
};

export default EducationInput;
