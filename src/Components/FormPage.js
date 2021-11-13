import React, { useState, useRef } from "react";

const FormPage = () => {
  // const [fullName, setFullName] = useState("")
  const [formState, setFormState] = useState({
    fullName: "",
  });
  const [picPrew, setPicPrew] = useState(null);
  const fileRef = useRef();

  const handleSubmitForm = (evt) => {
    evt.preventDefault();

    const [file] = fileRef.current.files;
    const formData = new FormData();
    // console.log("Before Submit : ", formState);

    Object.entries(formState).forEach((item) => {
      const [name, value] = item;
      formData.append(name, value);
    });
    formData.append("picture", file);
    // console.log(formData);
    fetch("https://httpbin.org/post", {
      method: "POST",
      // body:JSON.stringify(formState)
      body: formData,
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const handleChange = (evt) => {
    let { value, name, type } = evt.target;

    if (type === "checkbox") {
      if (name === "hobbies") {
        let hobbies = formState.hobbies ? [...formState.hobbies] : [];
        if (evt.target.checked) {
          hobbies.push(value);
        } else {
          hobbies = hobbies.filter((itm) => itm !== value);
        }
        value = hobbies;
      } else {
        value = evt.target.checked;
      }
    }
    // console.log("Value :", value);
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePicChange = (evt) => {
    const [file] = fileRef.current.files;
    const fileInMemo = file ? URL.createObjectURL(file) : null;
    setPicPrew(fileInMemo);
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <form onSubmit={handleSubmitForm} className="w-50 row">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="John Doe"
            name="fullName"
            value={formState.fullName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={formState.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            name="gender"
            className="form-select"
            id="gender"
            aria-label="Default select example"
            value={formState.gender || ""}
            onChange={handleChange}
          >
            <option>--Select one</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="o">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            name="bio"
            className="form-control"
            id="bio"
            rows="3"
            value={formState.bio || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <label className="form-label">Income range</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="income_range"
            id="range1"
            value="range1"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="range1">
            100-500
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="income_range"
            id="range2"
            value="range2"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="range2">
            500-1000
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="income_range"
            id="range3"
            value="range3"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="range3">
            1000-2000
          </label>
        </div>
        <div className="form-group">
          {picPrew && (
            <img width="250" height="250" src={picPrew} alt="Preview" />
          )}
          <label htmlFor="formFile"></label>
          <input
            ref={fileRef}
            onChange={handlePicChange}
            type="file"
            className="form-control-file"
            id="formFile"
            name="picture"
          />
        </div>
        <div className="form-check mb-3">
          <input
            value={formState.rules || ""}
            onChange={handleChange}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            name="rules"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            I assept rules
          </label>
        </div>
        <br />
        <div className="form-check">
          <p>Hobbies......</p>
          <input
            value="music"
            onChange={handleChange}
            type="checkbox"
            className="form-check-input"
            id="music"
            name="hobbies"
          />
          <label className="form-check-label" htmlFor="music">
            Music
          </label>
        </div>
        <div className="form-check">
          <input
            value="coding"
            onChange={handleChange}
            type="checkbox"
            className="form-check-input"
            id="coding"
            name="hobbies"
          />
          <label className="form-check-label" htmlFor="coding">
            Coding
          </label>
        </div>
        <div className="form-check">
          <input
            value="sport"
            onChange={handleChange}
            type="checkbox"
            className="form-check-input"
            id="sport"
            name="hobbies"
          />
          <label className="form-check-label" htmlFor="sport">
            Sport
          </label>
        </div>
        <button type="submit" className="mt-5 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default FormPage;
