/** @format */

import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "./facechat.css";
import Paf from "../../api.js";

function FaceChat() {
  const [letter, setLetter] = useState("base");
  const [sentence, setSentence] = useState("hola, quieres hablar?");
  const [recording, setRecording] = useState("blank");
  const [talkable, setTalkable] = useState("talk");
  const {id} = useParams();

  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(sentence);
  let voices = synth.getVoices();
  utterThis.voice = voices[15];
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  function speak() {
    var i = 1;
    let word = sentence.split("");

    function myLoop() {
      setTimeout(function () {
        setLetter(word[i]);
        i++;
        if (i < 10) {
          myLoop();
        }
      }, 100);
    }
    synth.speak(utterThis);
    myLoop();
  }


  function startListening() {
    setRecording("recording");
    setTalkable("no");
    recognition.start();
  }

  recognition.onresult = function (event) {
    setRecording("blank");
    setTalkable("talk");
    var transcript = event.results[0][0].transcript;
    // var confidence = event.results[0][0].confidence;
    setSentence(transcript);
    // sends text to server, server responses with resposne.
    const addText = async () => {
      let info = {
        statement: transcript,
        friend_id: id,
      };
      let res = await Paf.sendStatement(info);
      setSentence(res);
    };
    addText();
  };

  return (
    <div className="head-container">
      <div className="head">
        <div className="eyes">
          <div className="eyeball"></div>
          <div className="eyeball"></div>
        </div>
        <div className={`mouth ${letter}`}></div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={startListening}
          className={`startRecording ${recording}`}
        ></div>
        <div onClick={speak} className={`${talkable}`}>
          {">"}
        </div>
      </div>
    </div>
  );
}

export default FaceChat;
