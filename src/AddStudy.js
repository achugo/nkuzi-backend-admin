import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import CKEditor from "react-ckeditor-component";
import axios from "axios";
import { withRouter } from "react-router-dom";
import TextEditor from "./TextEditor";

function AddStudy(props) {
  const [categories, setCategories] = useState(null);
  const [subtopics, setSubTopics] = useState(null);
  const [studies, setStudies] = useState(null);
  const [newCategory, setNewCaterogy] = useState("");
  const [selectedStudy, setSelectedStudy] = useState(null);

  const [lesson, setLesson] = useState("");
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    fetch("https://nkuziigbo.herokuapp.com/igboapp/api/category/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      });
  };
  //https://nkuziigbo.herokuapp.com/igboapp/api/lesson/all/5f48d04285bc1a00041a0e14

  const loadSubTopics = (id) => {
    fetch(`https://nkuziigbo.herokuapp.com/igboapp/api/lesson/all/${id}`)
      .then((response) => response.json())
      .then((data) => {
        let sub_topics = data.data;
        setSubTopics(sub_topics);
      });
  };

  //5f4a9f1dad39cd0004947959
  const loadStudy = (id) => {
    fetch(`https://nkuziigbo.herokuapp.com/igboapp/api/study/allstudy/${id}`)
      .then((response) => response.json())
      .then((data) => {
        let studies = data.data;
        setStudies(studies);
      });
  };

  const handleNewCategoryChange = (evt) => {
    //const newContent = evt.editor.getData();
    setNewCaterogy(evt);
  };

  const handleCategoryChange = (e, data) => {
    let result = data.find((payload) => payload.name == e.target.value);
    loadSubTopics(result._id);
  };

  const handleTopicChange = (e, data) => {
    let result = data.find((payload) => payload.name == e.target.value);
    setLesson(result);
    loadStudy(result._id);
  };

  const handleStudySelect = (e, data) => {
    console.log(data, e.target.value);
    let result = data.find((payload) => payload.description == e.target.value);
    setSelectedStudy(result);
    console.log(result);
  };

  const pushToQuestion = (data) => {
    localStorage.setItem("data__", JSON.stringify(selectedStudy));
    localStorage.setItem("lesson__", JSON.stringify(lesson));
    props.history.push(`/edit/${data}`);
  };
  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };

  const pushEdit = () => {
    props.history.push("/edit");
  };
  const pushSubTopic = () => {
    props.history.push("/subtopic");
  };
  const pushStudy = () => {
    props.history.push("/study");
  };

  return (
    <div className="App">
      <div className="text-center">
        <h2>NKUZI IGBO</h2>
        <h2>SELECT QUESTION TO EDIT</h2>
        <button onClick={pushEdit}>Edit question</button>
        <button onClick={pushSubTopic}>Edit Sub Topic</button>
        <button onClick={pushStudy}>Edit Study</button>
      </div>
      <div className="row">
        <div className="col-md-4 align__left">
          <div>
            <label>Select a category</label>
            {categories && (
              <select onChange={(e) => handleCategoryChange(e, categories)}>
                <option>Select category</option>
                {categories.map((item) => {
                  return <option value={item._id} key={item.name}>{item.name}</option>;
                })}
              </select>
            )}
            <label>Add Category</label>
            <TextEditor value={newCategory} index='first' handleChange={(content) => handleNewCategoryChange(content)} />
            <button onClick={addCategory}>Add Category</button>
          </div>
          <div>
            {subtopics && (
              <>
                <label>Choose a subtopic</label>
                <select onChange={(e) => handleTopicChange(e, subtopics)}>
                  <option>Select subtopic</option>
                  {subtopics.map((item) => {
                    return <option value={item._id} key={item.name}>{item.name}</option>;
                  })}
                </select>
              </>
            )}
          </div>

          <div>
            {studies && (
              <>
                <label>Choose a Study</label>

                <select onChange={(e) => handleStudySelect(e, studies)}>
                  <option>Select study</option>
                  {studies.map((item) => {
                    return (
                      <option value={item._id} key={item.description}>{item.description}</option>
                    );
                  })}
                </select>
              </>
            )}
          </div>
          {studies && (
            <>
              <span>studies</span>
            </>
          )}
        </div>
        <div className="col-md-8">
          <>
            {selectedStudy && (
              <>
                {selectedStudy.test.length > 0 && (
                  <>
                    {selectedStudy.test.map((item, index) => (
                      <button onClick={() => pushToQuestion(item)}>{`Question ${
                        index + 1
                      }`}</button>
                    ))}
                  </>
                )}
                {selectedStudy.test.length == 0 && (
                  <>
                    <div>No question in this test</div>
                  </>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddStudy);
