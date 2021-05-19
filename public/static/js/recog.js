const resText = document.querySelector('#result-text');
const resRes = document.querySelector('#span-res');

let neko_flag = false;
let finish_flag = false;
let anime_flag = false;

const finish_word = ['終了','妹オフ','いいのオフ','芋オフ','いーもオフ','えもオフ','えーもオフ','えーオフ','イーオフ','フィニッシュ','終わり'];
 
const neko_kao = ['&#x1f63a;','&#x1f916;','&#x1f639;','&#x1f63b;','&#x1f63c;','&#x1f63d;','&#x1f640;','&#x1f63f;','&#x1f63e;']
//😺,😸,😹,😻,😼,😽,🙀,😿,😾
 
// const hard_tango = ['シュン',`いらっしゃい`,'ありがとう','お願い','書いて','いい加減','忘れて','ごめん','全く','先輩','気をつ','資料','おい','パン']
// const hard_emoji = ['😔','😌','😌','🙂','😳','🤯','😇','😭','😤','😩','😢','🧐','😡','🍞']
const yorokobi_tango = ['たのしい','楽しい','最高','いいね','気持ちいい']
const yorokobi_emoji
= ['&#x1f600;','&#x1f603;','&#x1f604;','&#x1f601;','&#x1f606;',
'&#x1f923;','&#x1f602;','&#x1f609;','&#x1f60a;','&#x1f970;',
'&#x1f60d;','&#x1f929;','&#x1f618;','&#x1f617;','&#x1f61a;',
'&#x1f60b;','&#x1f917;','&#x1f60c;','&#x1f920;','&#x1f973;',
'&#x1f60e;','&#x1f913;']
//😀,😃,😄,😁,😆,
//🤣,😂,😉,😊,🥰,
//😍,🤩,😘,😗,😚
//😋,🤗,😌,🤠,🥳
//😎,🤓
 
const kanasimi_tango = ['悲しい','泣き','ごめん']
const kanasimi_emoji = ['&#x1f972;','&#x1f62a;','&#x1f643;','&#x1f614;','&#x1f915;',
'&#x1f922;','&#x1f92e;','&#x1f927;','&#x1f975;','&#x1f976;',
'&#x1f974;','&#x1f635;','&#x1f92f;','&#x1f615;','&#x1f61f;',
'&#x1f641;','&#x2639;','&#x1f97a;','&#x1f626;','&#x1f628;',
'&#x1f630;','&#x1f625;','&#x1f622;','&#x1f62d;','&#x1f631;',
'&#x1f616;','&#x1f61e;','&#x1f613;','&#x1f629;','&#x1f62b;',
'&#x1f971;']
//,😪,🙃,😔,🤕
//🤢,🤮,🤧,🥵,🥶
//🥴,😵,🤯,😕,😟
//🙁,☹,🥺,😦,😨
//😰,😥,😢,😭,😱
//😖,😞,😓,😩,😫
//🥱
 
const ikari_tango = ['おこった','おこ','怒ら','怒']
const ikari_emoji = ['&#x1f624;','&#x1f621;','&#x1f620;','&#x1f92c;','&#x1f608;',
'&#x1f47f;','&#x1f480;','&#x2620;','&#x1f479;']
//😤,😡,😠,🤬,😈
//👿,💀,☠,👹
 
const kurui_tango = ['バーカ','アホ','ボケ']
const kurui_emoji = ['&#x1f617;','&#x1f61c;','&#x1f61b;','&#x1f92a;','&#x1f61d;',
'&#x1f644;','&#x1f644;','&#x1f62c;']
//😗,😜,😛,🤪,😝
//🙄,😬
 
const odoroki_tango = ['えっ','マジ','びっくり']
const odoroki_emoji = ['&#x1f92d;','&#x1f636;','&#x1f62e;','&#x1f62f;','&#x1f632;']
//🤭,😶,😮,😯,😲

const nayami_tango = ['苦しい','考え中','迷い'] 
const nayami_emoji = ['&#x1f914;','&#x1f613;']
//🤔,😓
 
const good_hand = ['&#x1f44c;','&#x1f91f;','&#x1f918;','&#x1f919;',
'&#x1f448;','&#x1f446;','&#x1f44d;','&#x1f44f;','&#x1f64c;',
'&#x1f450;','&#x1f932;','&#x1f4aa;']
//👌,🤟,🤘,🤙
//👈,👆,👍,👏,🙌
//👐,🤲,💪
 
//const bad_hand = ['&#x1f44e;','&#x1f44a;']
//👎,👊
 
const kyocyo_kigou = ['&#x203c;','&#x2049;','&#x2757;']
//‼,⁉

let wordLists = [yorokobi_tango, kanasimi_tango, ikari_tango, kurui_tango, odoroki_tango, nayami_tango];
let emojiLists = [yorokobi_emoji, kanasimi_emoji, ikari_emoji, kurui_emoji, odoroki_emoji, nayami_tango];
let emojiOthers = [good_hand, kyocyo_kigou];

const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;
recognition.maxAlternatives = 3;
var textUpdateTimeoutID = 0;
var textUpdateTimeoutSecond = 30;

//配列形式の単語と絵文字
function setEmoji(transcript, word_list, emoji){
  //let res_transcript;
  for (const key of word_list) {
    const regex = new RegExp(key);
    if (regex.test(transcript)){
      let res = emoji[Math.floor(Math.random() * emoji.length)];
      
      return res;
    }
  }
}

//3400の単語
//hash形式の単語と絵文字(test関数がmatchよりも速いらしい)
function setHashEmoji(transcript, tangos){
  let reultText;
  for(const key of Object.keys(tangos)){
    const regex = new RegExp(key);
    if (regex.test(transcript)){
      
      var arr = Array.from(tangos[key]);
      var num = arr.length;
      console.log(Math.floor(Math.random() * num));

      let res = arr[Math.floor(Math.random() * num)];
      console.log(transcript.indexOf(key));
      return res
    }
  }
}

//後でクロージャーにしたい
function searchTango(transcript, wordLists, emojiLists, tangos, neko_flag){
  //judge neko mode(default false)
  if(!neko_flag){
    let i = 0;
    for (const word of wordLists) {
      emoji =  setEmoji(transcript, word, emojiLists[i]);
      if (emoji){
        return emoji;
      }
      i++;
    }

    emoji = setHashEmoji(transcript, tangos);
    if (emoji){
      console.log("emoji is returned" + emoji);
      return emoji;
    }
  } else {
    emoji = neko_kao[Math.floor(Math.random() * neko_kao.length)];
  }
  return emoji;
}

//クソコード(破壊的)
function judgeNekoMode(transcript){
  const neko = new RegExp('猫');
  const wanwan = new RegExp('ワンワン');
  if (neko.test(transcript)){
    neko_flag = true;
  } else if (wanwan.test(transcript)){
    neko_flag = false;
  }
}

function searchFinishWord(transcript, word_list){
  for (const key of word_list) {
    const regex = new RegExp(key);
    if (regex.test(transcript)){
      return true;
    }
  }
  return false;
}

let animation_text;

recognition.onresult = (event) => {
  let transcript;
  let emoji_res;
  let emoji;
  
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript = event.results[i][0].transcript;
    console.log(event.results[i].isFinal);
    if (event.results[i].isFinal) {
      recognition.stop()

      finish_flag = searchFinishWord(transcript, finish_word);
      //finalTranscript = transcript;
      //judgeNekoMode(transcript);
      //set emoji based on word
      emoji = searchTango(transcript, wordLists, emojiLists, tangos, neko_flag);
      //仮でundefinedが出ないように、単語と紐づいていない絵文字をランダム表示
      if (!emoji){
        console.log("emoji is not exists");
        const num = Math.floor(Math.random() * emojiOthers.length);
        const num2 = Math.floor(Math.random() * emojiOthers[num].length);
        emoji = emojiOthers[num][num2];
      }
      var num = Math.floor(Math.random()*(5-1)+1);
      emoji_res = emoji.repeat(num);
      let result = transcript + emoji_res;

      //animationが動いている時は、現在の文字に付け足す
      if (anime_flag){
        if (transcript.length >= 10){
          animation_text += result;
        }else{
          resRes.innerHTML += result;
        }
        // $('#span-res').removeClass("animation");
        // $('#span-res').addClass("animation");
        //$(".animation").animate( { duration: 120000, easing: 'linear', queue: true } ).delay(2000);
      }else{
        resRes.innerHTML = result;
        //初期化
        $('#span-res').removeClass("animation");
        $('#span-res').css('padding-left','0%');
      }
      let moji_count = transcript.length+num;
      console.log(resRes.clientWidth);
      console.log((transcript.length+num));
      //取得した文字数
      if(moji_count >= 12 && !anime_flag){
        $('#span-res').addClass("animation");
        $('#span-res').css('padding-left','20%');

      //   if(moji_count >= 12 && moji_count < 16){
      //     $(".animation").animate( { duration: 10000, easing: 'linear' } );
      //   }else if(moji_count >= 16 && moji_count < 20){
      //     $(".animation").animate( { duration: 14000, easing: 'linear' } );
      //   }else if(moji_count >= 20 && moji_count < 27){
      //     $(".animation").animate({ duration: 22000, easing: 'linear' } );
      //   }else if(moji_count >= 27 && moji_count < 33){
      //     $(".animation").animate({ duration: 29000, easing: 'linear' } );
      //   }else if(moji_count >= 33 && moji_count < 37){
      //     $(".animation").animate({ duration: 36000, easing: 'linear' } );
      //   }else if(moji_count >= 37 && moji_count < 42){
      //     $(".animation").animate( { duration: 42000, easing: 'linear' } );
      //   }else{
      //     $(".animation").animate({ duration: 50000, easing: 'linear' } );
      //   }

        //速さを変更
        if(moji_count >= 12 && moji_count < 16){
          $(".animation").animate( { duration: 12000, easing: 'linear',queue: true } );
        }else if(moji_count >= 16 && moji_count < 20){
          $(".animation").animate( { duration: 16000, easing: 'linear',queue: true } );
        }else if(moji_count >= 20 && moji_count < 27){
          $(".animation").animate({ duration: 27000, easing: 'linear',queue: true } );
        }else if(moji_count >= 27 && moji_count < 33){
          $(".animation").animate({ duration: 33000, easing: 'linear', queue: true } );
        }else if(moji_count >= 33 && moji_count < 37){
          $(".animation").animate({ duration: 43000, easing: 'linear', queue: true } );
        }else{
          $(".animation").animate({ duration: 50000, easing: 'linear', queue: true } );
        }
        anime_flag = true;
      }else{
        if (anime_flag){
        }else{
          $('#span-res').removeClass("animation");
          $('#span-res').css('padding-left','0%');
          anime_flag = false;
        }
      }

    } else {
      if(transcript.length >= 13 && !anime_flag){
        resRes.innerHTML = '<i style="color:#ddd;">' + transcript + '</i>';
        //interimTranscript = transcript;
        //transcript = "~~~~~~~~~~";
      }
    }
  }
  console.log(transcript);
} 

//animation終了時に文字を消す
resRes.addEventListener('animationend', () => {
  // アニメーション終了後に実行する内容
  console.log("animation end");
  //アニメーション実行中に入力された場合の処理
  if (anime_flag && animation_text){
    resRes.innerHTML = animation_text;
    $('#span-res').addClass("animation");
    $(".animation").animate( { duration: 12000, easing: 'linear',queue: true } );
  }else{
    $('#span-res').removeClass("animation");
    $('#span-res').css('padding-left','30%');
    resRes.innerHTML = "";
    emoji_res = "";
    anime_flag = false;
    animation_text = "";
  }
})

recognition.start();
//永続化(SSL化すれば、マイク入力許可なしでいけるらしい)
recognition.onend = () =>
{
  console.log("onend");
  recognition.start();

  if (finish_flag){
      //遷移の処理をする
    console.log(finish_flag);
    var namespace = "/index.html";
    window.location.href = 'http://' + document.domain + ':' + location.port + namespace;
  }
}

// recognition.on = () =>
// {
//   //console.log("Onaudioend is called");
//   try{
//       recognition.stop();
//     }catch(e){
//        /* already started の場合は無視 */
//     }
// };

recognition.onaudioend = () =>
{
  
};

recognition.onerror = () =>
{
  //console.log("Onaudioerror is called");
  try{
      recognition.stop();
    }catch(e){
       /* already started の場合は無視 */
    }
};

recognition.onnomatch = () =>
{
  resRes.innerHTML = "認識できません"+"🙇‍♂";
};


recognition.onspeechend = () =>
{
  console.log("On no sppechend is called");
  // try{
  //     recognition.stop();
  //     recognition.start();
  //   }catch(e){
  //      /* already started の場合は無視 */
  //   }
};

recognition.onspeechstart = function() {
}

recognition.onstart = function() {
}

recognition.onsoundend = function() {
  //resRes.innerHTML = '音の検出は終わりました。終了します。';
  //window.location.href = 'http://localhost:5000/';
}
