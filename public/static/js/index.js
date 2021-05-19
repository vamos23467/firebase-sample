// var images = [ 'url(../img/sample.jpeg)', 'url(../img/sample2.jpeg)'];  // ランダム表示させたい画像のパス

//     $(function(){
//       var backgroundRandom = function(){
//         var number = Math.floor(Math.random() * images.length); // 0~3の数値を算出 
//         var selectedImg = images[number]; // 算出された数値を元に、1行目の配列から取り出す
//         $('.bg-div').css('background-image',selectedImg); // cssにランダムに選ばれた画像を背景設定する
//       };s
//       setInterval(backgroundRandom, 1000);  // 1000msごとにランダム切り替えを繰り返す
//     });

const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;
recognition.maxAlternatives = 3;
var textUpdateTimeoutID = 0;
var textUpdateTimeoutSecond = 30;
var start_flag = false;

const start_tango = ['いい','スタート','妹','すたーと','今','いいの','いいも','芋','いーも','良いも','いいね','えーも'];

function searchStartWord(transcript, word_list){
  for (const key of word_list) {
    const regex = new RegExp(key);
    if (regex.test(transcript)){
      return true;
    }
  }
  return false;
}

recognition.onresult = (event) => {
  recognition.stop()
  let transcript;
  let emoji;
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
    } else {

    }
    start_flag = searchStartWord(transcript, start_tango);
    console.log(transcript);
    console.log(start_flag);
  }
  if (start_flag){
    //遷移の処理をする
    const namespace = "/recog.html";
    window.location.href = 'http://' + document.domain + ':' + location.port + namespace;
  }
  
}

recognition.start();
//永続化(SSL化すれば、マイク入力許可なしでいけるらしい)
recognition.onend = () =>
{
  recognition.start();
};

recognition.onaudioend = () =>
{
  //console.log("Onaudioend is called");
  try{
      recognition.stop();
    }catch(e){
       /* already started の場合は無視 */
    }
};

recognition.onerror = () =>
{
  console.log("Onaudioerror is called");
  try{
      recognition.stop();
    }catch(e){
       /* already started の場合は無視 */
    }
};

recognition.onnomatch = () =>
{
  //console.log("On no match is called");
  try{
      recognition.stop();
    }catch(e){
       /* already started の場合は無視 */
    }
};


recognition.onspeechend = () =>
{
//   console.log("On no match is called");
//   try{
//       recognition.stop();
//       recognition.start();
//     }catch(e){
//        /* already started の場合は無視 */
//     }
};

