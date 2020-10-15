import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

function EditSubTopic(props) {
  const [categories, setCategories] = useState(null);
  const [subtopics, setSubTopics] = useState(null);
  const [studies, setStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [form, setForm] = useState("");
  const [premium_content, setPremiumContent] = useState("");

  const [lesson, setLesson] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);
  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };
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
  //   const loadStudy = (id) => {
  //     fetch(`https://nkuziigbo.herokuapp.com/igboapp/api/study/allstudy/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let studies = data.data;
  //         setStudies(studies);
  //       });
  //   };

  const handleCategoryChange = (e, data) => {
    let result = data.find((payload) => payload.name == e.target.value);
    loadSubTopics(result._id);
  };

  const handleTopicChange = (e, data) => {
    let result = data.find((payload) => payload.name == e.target.value);
    setLesson(result);
    setName(result.name);
    setType(result.type);
    setForm(result.form);
    setPremiumContent(result.premium_content);
    // loadStudy(result._id);
  };

  const handleNameChange = (evt) => {
    const newContent = evt.editor.getData();
    setName(newContent);
  };

  const handleTypeChange = (evt) => {
    const newContent = evt.editor.getData();
    setType(newContent);
  };

  const handleFormChange = (evt) => {
    const newContent = evt.editor.getData();
    setForm(newContent);
  };

  const handlePremiumContentChange = (evt) => {
    const newContent = evt.editor.getData();
    setPremiumContent(newContent);
  };

  const updateLesson = () => {
    let data = {
      name: name,
      type: type,
      form: form,
      premium_content: premium_content,
      time: "2 minutes",
    };

    //lesson;
    console.log(data);
    //https://nkuziigbo.herokuapp.com/igboapp/api/test/5f4ac17d8ca10b00047d29e1
    axios({
      method: "put",
      url: `https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/lesson/${lesson._id}`,
      data: data,
    })
      .then((result) => {
        console.log("Success:", result);
        alert("sub topic update successful");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <h2>SELECT SUBTOPIC TO EDIT</h2>
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
                  return <option key={item.name}>{item.name}</option>;
                })}
              </select>
            )}
          </div>
          <div>
            {subtopics && (
              <>
                <label>Choose a subtopic</label>
                <select onChange={(e) => handleTopicChange(e, subtopics)}>
                  <option>Select subtopic</option>
                  {subtopics.map((item) => {
                    return <option key={item.name}>{item.name}</option>;
                  })}
                </select>
              </>
            )}
          </div>
        </div>
        <div className="col-md-8">
          {lesson && (
            <div className="row">
              <div className="col-md-6 align__left ">
                <label>Name</label>
                <CKEditor
                  activeClass="p10"
                  content={name}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handleNameChange,
                  }}
                />
              </div>

              <div className="col-md-6 align__left ">
                <label>Type</label>
                <CKEditor
                  activeClass="p10"
                  content={type}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handleTypeChange,
                  }}
                />
              </div>

              <div className="col-md-6 align__left ">
                <label>Form</label>
                <CKEditor
                  activeClass="p10"
                  content={form}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handleFormChange,
                  }}
                />
              </div>

              <div className="col-md-6 align__left ">
                <label>Premium Content</label>
                <CKEditor
                  activeClass="p10"
                  content={premium_content == true ? "true" : "false"}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handlePremiumContentChange,
                  }}
                />
              </div>

              <div className="text-center">
                <button onClick={updateLesson}>UPDATE LESSON</button>
              </div>
            </div>
          )}
        </div>
        {/* {studies && (
            <>
              <span>studies</span>
            </>
          )} */}
      </div>
    </div>
  );
}

export default withRouter(EditSubTopic);
