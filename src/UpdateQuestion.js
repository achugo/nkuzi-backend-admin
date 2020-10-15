import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import axios from "axios";
import CKEditor from "react-ckeditor-component";
import { useRouteMatch } from "react-router-dom";

//number, match
//things in our surrounding, sentence

function UpdateQuestion() {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
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

  const route = useRouteMatch();

  useEffect(() => {
    setSelectedStudy(JSON.parse(localStorage.getItem("data__")));
    setLesson(JSON.parse(localStorage.getItem("lesson__")));
    loadQuestion();
  }, []);

  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };

  console.log("route is", route);
  console.log(question, selectedQuestion);

  console.log(optionType, optionTypeVal);

  //https://nkuziigbo.herokuapp.com/igboapp/api/lesson/all/5f48d04285bc1a00041a0e14

  const loadQuestion = () => {
    fetch(`https://nkuziigbo.herokuapp.com/igboapp/api/test/${route.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        let question = data.data;
        console.log("question is ", data);
        if (question) {
          setOptionTypeVal(question.type);
          setSelectedQuestion(question);
          if (question.type == "toEnglish") {
            setOptionTypeVal("match1");
            setOption1(question.option1);
            setOption2(question.option2);
            setOption3(question.option3);
            setOption4(question.option4);
            setAudioCore(question.audioUrl);
            setCorrectAnswer(question.correctOption);
            setQuestion(question.question);
            setAudioUrl(question.option1audio);
            setOption2Audio(question.option2audio);
            setOption3Audio(question.option3audio);
            setOption4Audio(question.option4audio);
          } else if (question.type == "match") {
            setOptionTypeVal("match");
            setOption1(question.optionI);
            setOption2(question.optionII);
            setOption3(question.optionIII);
            setOption4(question.optionIV);
            setQuestion(question.question);
            setQuestionMatch(question.matchQuestion);
            setAudioUrl(question.optionIaudio);
            setOption2Audio(question.optionIIaudio);
            setOption3Audio(question.optionIIIaudio);
            setOption4Audio(question.optionIVaudio);
            setCorrectAnswer(question.correctOption);
            setAudioCore(question.audioUrl);
          } else if (question.type == "sentence") {
            setOptionTypeVal("sentence");
            setQuestionMatch(question.mainQuestion);
            setCorrectMatchOrder(question.correctSentence);
            setMatchOrder(question.words);
            setQuestion(question.question);
          } else {
            setAudioCore(question.audioUrl);
            setOptionTypeVal("ordinary");
            setQuestion(question.question);
            setImgUrl(question.optionAImage);
            setOption2img(question.optionBImage);
            setOption3img(question.optionCImage);
            setOption4img(question.optionDImage);
            setOption1(question.optionA);
            setOption2(question.optionB);
            setOption3(question.optionC);
            setOption4(question.optionD);
            setCorrectAnswer(question.correctOption);
          }
        }
      });
  };

  //https://nkuziigbo.herokuapp.com/igboapp/api/test/5f4ab6c54affc000046a0ca4

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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setAudioCore(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setAudioUrl(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setImgUrl(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption2Audio(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption2img(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption3Audio(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption3img(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption4Audio(result.data.name);
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
      "https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api​/Files​/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setOption4img(result.data.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCorrectOption = (evt) => {
    const newContent = evt.editor.getData();
    setCorrectAnswer(newContent);
  };
  const handleQuestionChange = (evt) => {
    const newContent = evt.editor.getData();
    setQuestion(newContent);
  };

  const handleOption1Change = (evt) => {
    const newContent = evt.editor.getData();
    setOption1(newContent);
  };

  const handleOption2Change = (evt) => {
    const newContent = evt.editor.getData();
    setOption2(newContent);
  };

  const handleOption3Change = (evt) => {
    const newContent = evt.editor.getData();
    setOption3(newContent);
  };

  const handleOption4Change = (evt) => {
    const newContent = evt.editor.getData();
    setOption4(newContent);
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
        type: "toEnglish",
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
        type: "match",
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
        type: "sentence",
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
        type: "toIgbo",
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
    //https://nkuziigbo.herokuapp.com/igboapp/api/test/5f4ac17d8ca10b00047d29e1
    axios({
      method: "put",
      url: `https://fierce-shore-33740.herokuapp.com/https://nkuziigbo.herokuapp.com/igboapp/api/test/${route.params.id}`,
      data: data,
    })
      .then((result) => {
        console.log("Success:", result);
        alert("question update successful");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //console.log("selected question is", selectedQuestion);
  //console.log("option type val", optionTypeVal);

  return (
    <div className="App">
      <div className="text-center">
        <h2>NKUZI IGBO</h2>
        <h2>THIS MODULE IS TO EDIT A SINGLE QUESTION</h2>
      </div>
      <div className="row">
        <div className="col-md-8">
          {selectedQuestion && (
            <>
              <div className="section__wrap">
                <div className="row">
                  <div className="col-md-5">
                    <label style={{ display: "block" }}>Enter Question</label>

                    <CKEditor
                      activeClass="p10"
                      content={question}
                      events={{
                        blur: onBlur,
                        afterPaste: afterPaste,
                        change: handleQuestionChange,
                      }}
                    />
                    {/* <textarea
                      value={question}
                      onChange={(e) => handleQuestionChange(e)}
                    /> */}
                  </div>
                </div>
              </div>

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

                {(optionTypeVal == "match" || optionTypeVal == "sentence") && (
                  <>
                    <div className="section__wrap">
                      <label> Match question</label>
                      <CKEditor
                        activeClass="p10"
                        content={question_match}
                        events={{
                          blur: onBlur,
                          afterPaste: afterPaste,
                          change: handleMatchQuestion,
                        }}
                      />
                      {/* <textarea
                        value={question_match}
                        onChange={(e) => handleMatchQuestion(e)}
                      /> */}
                    </div>
                  </>
                )}
                {optionTypeVal == "sentence" && (
                  <>
                    <div className="section__wrap">
                      <label>Enter Correct sentence order</label>
                      <textarea
                        value={correct_order}
                        placeholder="seperate with comma"
                        onChange={(e) => handleCorrectArrangement(e)}
                      />
                    </div>
                  </>
                )}
                {optionTypeVal.length > 0 && optionTypeVal != "sentence" && (
                  <div className="section__wrap">
                    <label> Enter correct answer</label>
                    <CKEditor
                      activeClass="p10"
                      content={correctAnswer}
                      events={{
                        blur: onBlur,
                        afterPaste: afterPaste,
                        change: handleCorrectOption,
                      }}
                    />
                    {/* <textarea
                      value={correctAnswer}
                      onChange={(e) => handleCorrectOption(e)}
                    /> */}
                  </div>
                )}
              </>

              {optionTypeVal.length > 0 && optionTypeVal != "sentence" && (
                <>
                  <div className="section__wrap">
                    <div className="row">
                      <div className="col-md-6 align__left ">
                        <label> Option 1</label>
                        <CKEditor
                          activeClass="p10"
                          content={option1}
                          events={{
                            blur: onBlur,
                            afterPaste: afterPaste,
                            change: handleOption1Change,
                          }}
                        />
                        {/* <textarea
                          value={option1}
                          onChange={(e) => handleOption1Change(e)}
                          placeholder="option 1"
                        /> */}
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
                        <label> Option 2</label>
                        <CKEditor
                          activeClass="p10"
                          content={option2}
                          events={{
                            blur: onBlur,
                            afterPaste: afterPaste,
                            change: handleOption2Change,
                          }}
                        />
                        {/* <textarea
                          value={option2}
                          onChange={(e) => handleOption2Change(e)}
                          placeholder="option 2"
                        /> */}
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
                        <label> Option 3</label>
                        <CKEditor
                          activeClass="p10"
                          content={option3}
                          events={{
                            blur: onBlur,
                            afterPaste: afterPaste,
                            change: handleOption3Change,
                          }}
                        />
                        {/* <textarea
                          value={option3}
                          onChange={(e) => handleOption3Change(e)}
                          placeholder="option 3"
                        /> */}
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
                        <label> Option 4</label>
                        <CKEditor
                          activeClass="p10"
                          content={option4}
                          events={{
                            blur: onBlur,
                            afterPaste: afterPaste,
                            change: handleOption4Change,
                          }}
                        />
                        {/* <textarea
                          value={option4}
                          onChange={(e) => handleOption4Change(e)}
                          placeholder="option 4"
                        /> */}
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
                        value={match_order}
                        onChange={(e) => handleWordArrangement(e)}
                        placeholder="Separate the words with comma "
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {!selectedQuestion && <div>No data for this question</div>}
        </div>
      </div>

      <div className="text-center">
        <button onClick={postQuestion}>UPDATE QUESTION</button>
      </div>
    </div>
  );
}

export default UpdateQuestion;
