/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./facechat.css";
import Paf from "../../api.js";
import { getByDisplayValue } from "@testing-library/dom";

function FaceChat() {
  const [letter, setLetter] = useState("base");
  const [sentence, setSentence] = useState("shut up please bitch");
  const [recording, setRecording] = useState('blank')
  const [talkable, setTalkable] = useState('talk')
  const { id } = useParams();

  var synth = window.speechSynthesis;
  let senArray = sentence.split("");
  var utterThis = new SpeechSynthesisUtterance(sentence);
  let voices = synth.getVoices();
  utterThis.voice = voices[49];
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  console.log(recognition)
  // console.log(image)
  //sets the next letter
  // function speak() {
  //   let id = setInterval(() => {
  //     setLetter((old) => {
  //       if (letter > senArray.length) {
  //         clearInterval(id);
  //         return 1;
  //       } else {
  //         return old + 1;
  //       }
  //     });
  //   }, 75);
  //   synth.speak(utterThis);
  // }

  // useEffect(() => {
  //   var i = 1;
  //   let word = sentence.split('')

  //   function myLoop() {
  //     setTimeout(function () {
  //       setLetter((word[i]));
  //       i++;
  //       if (i < 10) {
  //         myLoop();
  //       }
  //     }, 100);
  //   }

  //   myLoop();
  // }, [sentence]);


  function speak() {
    console.log("hello");
        var i = 1;
    let word = sentence.split('')

    function myLoop() {
      setTimeout(function () {
        setLetter((word[i]));
        i++;
        if (i < 10) {
          myLoop();
        }
      }, 100);
    }
    synth.speak(utterThis);
    myLoop();
  }

  //sets the image
  // useEffect(() => {
  //   setImage((old) => {
  //     let spot = letter;
  //     if (!spot) {
  //       spot = 'a';
  //     }
  //     return spot;
  //   });
  // }, [letter]);

  //sends text to server, server responses with resposne.
  // const addText = async (evt) => {
  //   evt.preventDefault();
  //   setText((data) => [...data, formData]);
  //   formData.friend_id = id;
  //   let res = await Paf.sendStatement(formData);
  //   setText((data) => [...data, { statement: res }]);
  //   setFormData({ statement: "" });
  //   return { success: true };
  // };

  function startListening() {
    setRecording('recording')
    setTalkable('no')
    recognition.start();
  }

  recognition.onresult = function (event) {
    setRecording('blank')
        setTalkable('talk')
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
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
    <>
      <div className="head">
        <div className="eyes">
          <div className="eyeball"></div>
          <div className="eyeball"></div>
        </div>
        <div className={`mouth ${letter}`}></div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div onClick={startListening} className={`startRecording ${recording}`} >
        </div>
        <div onClick={speak}  className={`${talkable}`} >
        {'>'}
        </div>
      </div>
    </>
  );
}

export default FaceChat;
