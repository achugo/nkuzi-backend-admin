import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

function EditQuestion(props) {
  const [categories, setCategories] = useState(null);
  const [subtopics, setSubTopics] = useState(null);
  const [studies, setStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [audioCore, setAudioCore] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioUrlOption2, setOption2Audio] = useState("");

  const [lesson, setLesson] = useState("");
  const [question_match, setQuestionMatch] = useState("");
  const [match_order, setMatchOrder] = useState("");
  const [correct_order, setCorrectMatchOrder] = useState("");

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

  const handleWordArrangement = (e) => {
    let words = e.target.value.replace(/\s/g, "");
    setMatchOrder(words.split(","));
  };

  const handleCorrectArrangement = (e) => {
    let words = e.target.value.replace(/\s/g, "");
    setCorrectMatchOrder(words.split(","));
  };

  const uploadAudioForAnswerIguess = (e) => {
    let upload = e.target.files[0];
    console.log(upload);

    const formData = new FormData();

    formData.append("file", upload);

    fetch(
      "https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/upload/file",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setAudioCore(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadAudioForOption1 = (e) => {
    let upload = e.target.files[0];
    console.log(upload);

    const formData = new FormData();

    formData.append("file", upload);

    fetch(
      "https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/upload/file",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setAudioUrl(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadAudioForOption2 = (e) => {
    let upload = e.target.files[0];
    console.log(upload);

    const formData = new FormData();

    formData.append("file", upload);

    fetch(
      "https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/upload/file",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption2Audio(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const pushToQuestion = (data) => {
    localStorage.setItem("data__", JSON.stringify(selectedStudy));
    localStorage.setItem("lesson__", JSON.stringify(lesson));
    props.history.push(`/edit/${data}`);
  };

  return (
    <div className="App">
      <div className="text-center">
        <h2>SELECT QUESTION TO EDIT NKUZI IGBO</h2>
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

          <div>
            {studies && (
              <>
                <label>Choose a Study</label>

                <select onChange={(e) => handleStudySelect(e, studies)}>
                  <option>Select study</option>
                  {studies.map((item) => {
                    return (
                      <option key={item.description}>{item.description}</option>
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

export default withRouter(EditQuestion);
