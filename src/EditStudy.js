import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

function EditStudy(props) {
  const [categories, setCategories] = useState(null);
  const [subtopics, setSubTopics] = useState(null);
  const [studies, setStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [studyno, setStudyNo] = useState("");
  const [description, setDescription] = useState("");
  const [igbo, setIgbo] = useState("");
  const [picture, setPicture] = useState("");
  const [voicing, setVoicing] = useState("");

  const [lesson, setLesson] = useState("");
  let loader = false;

  let audio = document.getElementById('ad');
  useEffect(() => {
      loadCategories();
  }, []);

  useEffect (() => {
    if(audio != null) {
        audio.load()
      }
  }, [voicing])
  
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

  //   5f4a9f1dad39cd0004947959
  const loadStudy = (id) => {
    fetch(`https://nkuziigbo.herokuapp.com/igboapp/api/study/allstudy/${id}`)
      .then((response) => response.json())
      .then((data) => {
        let studies = data.data;
        setStudies(studies);
      });
  };

  const handleCategoryChange = (e, data) => {
    let result = data.find((payload) => payload._id == e.target.value);
    loadSubTopics(result._id);
  };

  const handleTopicChange = (e, data) => {
    let result = data.find((payload) => payload._id == e.target.value);
    setLesson(result);
    loadStudy(result._id);
  };

  const handleStudySelect = (e, data) => {
    console.log(data, e.target.getAttribute("id"));
    let result = data.find((payload) => payload._id == e.target.value);
    console.log(result);
    setSelectedStudy(result);
    setStudyNo(result.study_no);
    setDescription(result.description);
    setDescription(result.description);
    setIgbo(result.igbo);
    setPicture(result.picture);
    setVoicing(result.voicing);
  };

  const handleStudyNoChange = (evt) => {
    const newContent = evt.target.value;
    newContent.trim()
    setStudyNo(newContent);
  };

  const handleDescriptionChange = (evt) => {
    const newContent = evt.editor.getData();
    newContent.trim()
    setDescription(newContent);
  };

  const handleIgboChange = (evt) => {
    const newContent = evt.editor.getData();
    newContent.trim()
    setIgbo(newContent);
  };

  const handlePictureChange = (evt) => {
    const newContent = evt.editor.getData();
    newContent.trim()
    setPicture(newContent);
  };

  const handleVoicingChange = (evt) => {
    const newContent = evt.editor.getData();
    newContent.trim()
    setVoicing(newContent);
  };

  const uploadImage = (e) => {
    let upload = e.target.files[0];
    console.log(upload);

    const formData = new FormData();

    formData.append("file", upload);

    fetch(
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api/Files/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setPicture("https://infomall-001-site1.etempurl.com/" + result.name);
        alert("Image update successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error updating Image");
      });
  };

  const uploadAudio = (e) => {
    let upload = e.target.files[0];
    console.log(upload);

    const formData = new FormData();

    formData.append("file", upload);

    fetch(
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api/Files/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setVoicing("https://infomall-001-site1.etempurl.com/" + result.name);
        alert("audio update successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error Updating audio");
      });
  };

  const updateStudy = () => {
    loader = true;
    let data = {
      study_no: studyno,
      description: description,
      igbo: igbo,
      picture: picture,
      voicing: voicing,
    };

    //lesson;
    console.log(data);
    //https://nkuziigbo.herokuapp.com/igboapp/api/test/5f4ac17d8ca10b00047d29e1
    axios({
      method: "put",
      url: `https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/study/${selectedStudy._id}`,
      data: data,
    })
      .then((result) => {
        console.log("Success:", result);
        alert("study update successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error updating Study");
      });
      loader = false
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
                  return <option value={item._id} key={item.name}>{item.name}</option>;
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
          {/* {studies && (
            <>
              <span>studies</span>
            </>
          )} */}
        </div>
        <div className="col-md-8">
          {selectedStudy && (
            <div className="row">
              <div className="col-md-6 align__left ">
                <label>Study No</label>
                <input
                  type="number"
                  value={studyno}
                  onChange={handleStudyNoChange}
                />
                {/* <CKEditor
                  activeClass="p10"
                  content={studyno}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handleStudyNoChange,
                  }} */}
                {/* /> */}
              </div>

              <div className="col-md-6 align__left ">
                <label>Description</label>
                <CKEditor
                  activeClass="p10"
                  content={description}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handleDescriptionChange,
                  }}
                />
              </div>

              <div className="col-md-6 align__left ">
                <label>Igbo</label>
                <CKEditor
                  activeClass="p10"
                  content={igbo}
                  events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: handleIgboChange,
                  }}
                />
              </div>

              <div className="col-md-6 align__left ">
                <label>Picture</label>
                <input type="file" onChange={(e) => uploadImage(e)} />
                {picture && <img src={picture} alt="img uploaded" />}
              </div>

              <div className="col-md-6 align__left ">
                <label>Voicing</label>
                <input type="file" onChange={(e) => uploadAudio(e)} />
                {voicing && (
                  // <audio ref="audio_tag" id="ad" src={voicing} controls />
                  <audio id="ad" controls>
                    <source src={voicing} />
                  </audio>
                )}
              </div>

              <div className="text-center">
                {loader == false && (
                <button onClick={updateStudy}>UPDATE STUDY</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(EditStudy);
