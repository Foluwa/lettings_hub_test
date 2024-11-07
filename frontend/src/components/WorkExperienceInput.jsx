import React from 'react';

const WorkExperienceInput = ({ workExperience, setWorkExperience }) => {
  const addExperience = () => setWorkExperience([...workExperience, { role: '', company_name: '', description: '', duration: '' }]);
  const removeExperience = (index) => setWorkExperience(workExperience.filter((_, i) => i !== index));
  const handleChange = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = value;
    setWorkExperience(updatedExperience);
  };

  return (
    <div>
      <h3>Work Experience</h3>
      {workExperience.map((exp, index) => (
        <div className="row mt-4" key={index}>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              className="form-control"
              onChange={(e) => handleChange(index, 'role', e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Company"
              value={exp.company_name}
              className="form-control"
              onChange={(e) => handleChange(index, 'company_name', e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-2">
            <input
              type="text"
              placeholder="Description"
              value={exp.description}
              className="form-control"
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-2">
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              className="form-control"
              onChange={(e) => handleChange(index, 'duration', e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-danger mt-2 btn-sm w-50" onClick={() => removeExperience(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary mt-2 w-50" onClick={addExperience}>Add Experience</button>
    </div>
  );
};

export default WorkExperienceInput;
