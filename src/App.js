import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";

function App() {
  const [categories, setCategories] = useState(null);
  const [subtopics, setSubTopics] = useState(null);
  const [studies, setStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [audioCore, setAudioCore] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioUrlOption2, setOption2Audio] = useState("");
  const [audioUrlOption3, setOption3Audio] = useState("");
  const [audioUrlOption4, setOption4Audio] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlOption2, setOption2img] = useState("");
  const [imgUrlOption3, setOption3img] = useState("");
  const [imgUrlOption4, setOption4img] = useState("");
  const [optionType, setOptionType] = useState("");
  const [optionTypeVal, setOptionTypeVal] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [readyToSend, setReadyToSend] = useState(false);
  const [lesson, setLesson] = useState("");
  const [question_match, setQuestionMatch] = useState("");
  const [match_order, setMatchOrder] = useState("");
  const [correct_order, setCorrectMatchOrder] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  console.log(lesson, selectedStudy);

  useEffect(() => {
    if (
      option1.length > 0 &&
      option2.length > 0 &&
      option3.length > 0 &&
      option4.length > 0 &&
      question.length > 0 &&
      correctAnswer.length > 0 &&
      audioCore.length > 0
    ) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [option1, option2, option3, option4]);

  useEffect(() => {
    if (
      question.length > 0 &&
      correct_order.length > 0 &&
      match_order.length > 0 &&
      audioCore.length > 0
    ) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [question, correct_order, match_order, audioCore]);

  useEffect(() => {
    if (
      option1.length > 0 &&
      option2.length > 0 &&
      option3.length > 0 &&
      option4.length > 0 &&
      correctAnswer.length > 0 &&
      question.length > 0 &&
      audioCore.length > 0
    ) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [imgUrl, imgUrlOption2, imgUrlOption3, imgUrlOption4]);

  console.log(optionType, optionTypeVal);

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

  const uploadImageForOption1 = (e) => {
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
        setImgUrl(result.data);
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

  const uploadImageForOption2 = (e) => {
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
        setOption2img(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadAudioForOption3 = (e) => {
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
        setOption3Audio(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadImageForOption3 = (e) => {
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
        setOption3img(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadAudioForOption4 = (e) => {
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
        setOption4Audio(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadImageForOption4 = (e) => {
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
        setOption4img(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTypeSelection = (e) => {
    setOptionType(e.target.value);
    return e.target.value == "toIgbo"
      ? setOptionTypeVal("ordinary")
      : e.target.value == "toEnglish"
      ? setOptionTypeVal("match1")
      : e.target.value == "match"
      ? setOptionTypeVal("match2")
      : setOptionTypeVal("sentence");
  };

  const handleCorrectOption = (e) => {
    setCorrectAnswer(e.target.value);
  };
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOption1Change = (e) => {
    setOption1(e.target.value);
  };

  const handleOption2Change = (e) => {
    setOption2(e.target.value);
  };

  const handleOption3Change = (e) => {
    setOption3(e.target.value);
  };

  const handleOption4Change = (e) => {
    setOption4(e.target.value);
  };

  const handleMatchQuestion = (e) => {
    setQuestionMatch(e.target.value);
  };

  const postQuestion = () => {
    let data = {};
    if (optionTypeVal == "match1") {
      data = {
        optionType: optionTypeVal,
        question: question,
        audioUrl: audioCore,
        correctOption: correctAnswer,
        option1audio: audioUrl,
        option1: option1,
        option2audio: audioUrlOption2,
        option2: option2,
        option3audio: audioUrlOption3,
        option3: option3,
        option4audio: audioUrlOption4,
        option4: option4,
        type: optionTypeVal,
        lesson: lesson._id,
        study: selectedStudy._id,
      };
    } else if (optionTypeVal == "match2") {
      data = {
        optionType: optionTypeVal,
        question: question_match,
        matchQuestion: optionTypeVal,
        audioUrl: audioCore,
        correctOption: correctAnswer,
        optionIaudio: audioUrl,
        optionI: option1,
        optionIIaudio: audioUrlOption2,
        optionII: option2,
        optionIIIaudio: audioUrlOption3,
        optionIII: option3,
        optionIVaudio: audioUrlOption4,
        optionIV: option4,
        type: optionTypeVal,
        lesson: lesson._id,
        study: selectedStudy._id,
      };
    } else if (optionTypeVal == "sentence") {
      data = {
        optionType: optionTypeVal,
        question: question,
        mainQuestion: question_match,
        audioUrl: audioCore,
        correctSentence: correct_order,
        words: match_order,
        type: optionTypeVal,
        lesson: lesson._id,
        study: selectedStudy._id,
      };
    } else {
      data = {
        optionType: optionTypeVal,
        question: question,
        audioUrl: audioCore,
        optionA: option1,
        optionAImage: imgUrl,
        optionB: option2,
        optionBImage: imgUrlOption2,
        optionC: option3,
        type: optionTypeVal,
        optionCImage: imgUrlOption3,
        optionD: option4,
        optionDImage: imgUrlOption4,
        correctOption: correctAnswer,
        lesson: lesson._id,
        study: selectedStudy._id,
      };
    }

    //lesson;
    console.log(data);

    fetch(
      "https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/test/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        alert(result.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("option type val", optionTypeVal);

  return (
    <div className="App">
      <div className="text-center">
        <h2>NKUZI IGBO</h2>
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
                <option>Select study</option>
                <select onChange={(e) => handleStudySelect(e, studies)}>
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
              <div className="section__wrap">
                <label>Upload question audio</label>
                <input
                  type="file"
                  onChange={(e) => uploadAudioForAnswerIguess(e)}
                />
                {audioCore && (
                  <audio controls>
                    <source src={audioCore} type="audio/mp3" />
                  </audio>
                )}
              </div>

              {optionTypeVal == "match2" ||
                (optionTypeVal == "sentence" && (
                  <>
                    <div className="section__wrap">
                      <label> Match question</label>
                      <textarea onChange={(e) => handleMatchQuestion(e)} />
                    </div>
                  </>
                ))}

              {optionTypeVal == "sentence" && (
                <>
                  <div className="section__wrap">
                    <label>Enter Correct sentence order</label>
                    <textarea
                      placeholder="seperate with comma"
                      onChange={(e) => handleCorrectArrangement(e)}
                    />
                  </div>
                </>
              )}

              {optionTypeVal.length > 0 && optionTypeVal != "sentence" && (
                <div className="section__wrap">
                  <label> Enter correct answer</label>
                  <textarea onChange={(e) => handleCorrectOption(e)} />
                </div>
              )}
            </>
          )}
        </div>
        <div className="col-md-8">
          {selectedStudy && (
            <>
              <div className="section__wrap">
                <div className="row">
                  <div className="col-md-4">
                    <label>Select question type</label>
                    <select onChange={(e) => handleTypeSelection(e)}>
                      <option>Select an option</option>
                      <option>toIgbo</option>
                      <option>toEnglish</option>
                      <option>match</option>
                      <option>sentence</option>
                    </select>
                  </div>
                  <div className="col-md-5">
                    <label style={{ display: "block" }}>Enter Question</label>
                    <textarea onChange={(e) => handleQuestionChange(e)} />
                  </div>
                </div>
              </div>
              {optionTypeVal.length > 0 && optionTypeVal != "sentence" && (
                <>
                  <div className="section__wrap">
                    <div className="row">
                      <div className="col-md-6 align__left ">
                        <textarea
                          onChange={(e) => handleOption1Change(e)}
                          placeholder="option 1"
                        />
                      </div>
                      {optionTypeVal != "ordinary" && (
                        <div className="col-md-3 align__left">
                          <label>Audio</label>
                          <input
                            type="file"
                            onChange={(e) => uploadAudioForOption1(e)}
                          />
                          {audioUrl && (
                            <audio controls>
                              <source src={audioUrl} type="audio/mp3" />
                            </audio>
                          )}
                        </div>
                      )}

                      {optionTypeVal == "ordinary" && (
                        <div className="col-md-3 align__left ">
                          <label>image</label>
                          <input
                            type="file"
                            onChange={(e) => uploadImageForOption1(e)}
                          />
                          {imgUrl && <img src={imgUrl} alt="img uploaded" />}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="section__wrap">
                    <div className="row">
                      <div className="col-md-6 align__left ">
                        <textarea
                          onChange={(e) => handleOption2Change(e)}
                          placeholder="option 2"
                        />
                      </div>
                      {optionTypeVal != "ordinary" && (
                        <div className="col-md-3 align__left">
                          <label>Audio</label>
                          <input
                            type="file"
                            onChange={(e) => uploadAudioForOption2(e)}
                          />
                          {audioUrlOption2 && (
                            <audio controls>
                              <source src={audioUrlOption2} type="audio/mp3" />
                            </audio>
                          )}
                        </div>
                      )}

                      {optionTypeVal == "ordinary" && (
                        <div className="col-md-3 align__left ">
                          <label>image</label>
                          <input
                            type="file"
                            onChange={(e) => uploadImageForOption2(e)}
                          />
                          {imgUrlOption2 && (
                            <img src={imgUrlOption2} alt="img uploaded" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="section__wrap">
                    <div className="row">
                      <div className="col-md-6 align__left ">
                        <textarea
                          onChange={(e) => handleOption3Change(e)}
                          placeholder="option 3"
                        />
                      </div>
                      {optionTypeVal != "ordinary" && (
                        <div className="col-md-3 align__left">
                          <label>Audio</label>
                          <input
                            type="file"
                            onChange={(e) => uploadAudioForOption3(e)}
                          />
                          {audioUrlOption3 && (
                            <audio controls>
                              <source src={audioUrlOption3} type="audio/mp3" />
                            </audio>
                          )}
                        </div>
                      )}

                      {optionTypeVal == "ordinary" && (
                        <div className="col-md-3 align__left ">
                          <label>image</label>
                          <input
                            type="file"
                            onChange={(e) => uploadImageForOption3(e)}
                          />
                          {imgUrlOption3 && (
                            <img src={imgUrlOption3} alt="img uploaded" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="section__wrap">
                    <div className="row">
                      <div className="col-md-6 align__left ">
                        <textarea
                          onChange={(e) => handleOption4Change(e)}
                          placeholder="option 4"
                        />
                      </div>
                      {optionTypeVal != "ordinary" && (
                        <div className="col-md-3 align__left">
                          <label>Audio</label>
                          <input
                            type="file"
                            onChange={(e) => uploadAudioForOption4(e)}
                          />
                          {audioUrlOption4 && (
                            <audio controls>
                              <source src={audioUrlOption4} type="audio/mp3" />
                            </audio>
                          )}
                        </div>
                      )}

                      {optionTypeVal == "ordinary" && (
                        <div className="col-md-3 align__left ">
                          <label>image</label>
                          <input
                            type="file"
                            onChange={(e) => uploadImageForOption4(e)}
                          />
                          {imgUrlOption4 && (
                            <img src={imgUrlOption4} alt="img uploaded" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {optionTypeVal == "sentence" && (
                <div className="section__wrap">
                  <div className="row">
                    <div className="col-md-6 align__left ">
                      <label>Words</label>
                      <textarea
                        onChange={(e) => handleWordArrangement(e)}
                        placeholder="Separate the words with comma "
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {readyToSend && (
        <div className="text-center">
          <button onClick={postQuestion}>POST QUESTION</button>
        </div>
      )}
    </div>
  );
}

export default App;
