$(function() {
//////////滾動條//////////
   $(".singer_list").mCustomScrollbar();
//////////滾動條//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////獲取歌曲信息//////////
var musiclist
getMusicList();
function getMusicList(){

    $.ajax({
      url:"./source/singerlist.json",
      dataType:"json",
      success:function (data){
        musiclist = data;
        var singerlist


        $.each(musiclist, function (index, ele){

          singerlist = '<li class=\"singer_info\"><div class=\"singer_img\" style=\"background:url( '+musiclist[index].singer_photo+' )\"></div> '+ musiclist[index].name +' <span></span></li>\n'
          $(".singer_list ul").append(singerlist);


        });

        changeSinger(data[0]);
        initSinger(data[0]);
        initSong(data[0])

      },
      error:function(e){
        console.log(e)
      }
    })
}
//////////獲取歌曲信息//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////切換歌曲信息//////////
var currentIndex = 0
var currentMusic = 0


function initSinger(){
  $(".singer").css('background', 'url('+ musiclist[currentIndex].singer+') no-repeat center bottom');
  $(".bcg_font > p").text(musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name + " " + musiclist[currentIndex].name)
  $(".info > p").text(musiclist[currentIndex].info)
  if($(window).width() > 768){
    $(".bcg_image").css('background', 'url('+ musiclist[currentIndex].background+'), -webkit-linear-gradient(107.5deg, #D62828 0%, #D62828 67%, #fffbf7 67%, #fffbf7 100%) ');
  }else{
    $(".bcg_image").css('background', 'url('+ musiclist[currentIndex].background+') no-repeat bottom');
    $(".bcg_image").css('background-color', '#D62828');
  }
  currentMusic = 0
  initSong();
}

function initSong(){
  $("audio").attr('src', musiclist[currentIndex].music[currentMusic].song_url);
  $(".song_album").text(musiclist[currentIndex].music[currentMusic].song_album + " - " + musiclist[currentIndex].music[currentMusic].song_name);
  $(".song_time").text( "00:00" + "/" + musiclist[currentIndex].music[currentMusic].song_time)

}

function changeSinger(){

  $(".singer_info").click(function(event) {
    currentIndex = $(this).index()
    initSinger()
    initSong()
    $("#audio")[0].play();

    if ($(".play").hasClass('pause')) {
      $("#audio")[0].play();
      $(".play").addClass('pause')
    } else {
      $("#audio")[0].pause();
      $(".play").removeClass('pause')
    }

  });
}

//////////切換歌曲信息//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////播放音樂//////////


$(".play").click(function(event) {
  $(".play").toggleClass('pause');

  if ($(".play").hasClass('pause')) {
    $("#audio")[0].play();
  }
  else{
    $("#audio")[0].pause();
  }

});

//////////播放音樂//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////切換音樂//////////
$(".next").click(function(event) {


  $(".progress_bar").css('width', '0');
  $(".progress_dot").css('left','0');
  if (currentMusic >=  musiclist[currentIndex].music.length-1) {

    currentMusic = 0
    initSong();
    if ($(".play").hasClass('pause')) {
      $("#audio")[0].play();
    }

  } else {
    currentMusic ++
    initSong();
    if ($(".play").hasClass('pause')) {
      $("#audio")[0].play();
    }
  }
});

$(".pre").click(function(event) {
  if (currentMusic <= 0) {
    currentMusic = musiclist[currentIndex].music.length-1
    initSong();
    if ($(".play").hasClass('pause')) {
      $("#audio")[0].play();
    }
  } else {
    currentMusic --
    initSong();
    if ($(".play").hasClass('pause')) {
      $("#audio")[0].play();
    }
  }
});

//////////切換音樂//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////音樂進度條//////////
  progressClick(musicGoTO);
  function progressClick(callback){
    $(".progress_line").click(function(event) {
      var normalLeft = $(this).offset().left;
      var eventLeft = event.pageX;
      $(".progress_line").addClass('enabled')
      $(".info > p, .info > button, .progress>span, .singer_list ul").css('user-select', 'none');
      $(".progress_bar").css('width', eventLeft - normalLeft);
      $(".progress_dot").css('left', eventLeft - normalLeft)

      var value = (eventLeft - normalLeft) / $(".progress_line").width()
      callback(value)


    });
  }


  progressMove(musicGoTO)
  function progressMove(callback){

    var normalLeft = $(".progress_line").offset().left;

    var eventLeft

    $(".progress_line").mousedown(function(event) {
      $(".progress_line").addClass('enabled')

      var normalLeft = $(".progress_line").offset().left;

      $(document).mousemove(function(event) {

        eventLeft = event.pageX;

        $(".info > p, .info > button, .progress>span, .singer_list ul").css('user-select', 'none');
        if (eventLeft - normalLeft > 0 && eventLeft - normalLeft <420 ) {

          $(".progress_bar").css('width', eventLeft - normalLeft);
          $(".progress_dot").css('left', eventLeft - normalLeft)

        }
        var value = (eventLeft - normalLeft) / $(".progress_line").width()
        callback(value)
      });

      $(document).mouseup(function(event) {
        $(document).off("mousemove")
        $(".info > p, .info > button, .progress>span, .singer_list ul").css('user-select', 'text');
        $(".progress_line").removeClass('enabled')

    });



    });

  }

  function musicGoTO(value){
    if(isNaN(value)) return
    audio.currentTime = audio.duration * value
    console.log(value)
  }

//////////音樂進度條//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////進度條時間//////////


  var audio = document.getElementById("audio");

  function getdurationTime(){
    if( this.audio.duration >= 0){
      return this.audio.duration
    }

  }

  function getcurrentTime(){
    return audio.currentTime
  }

  $("#audio").on("timeupdate",function (){
      var durationTime = getdurationTime();
      var currentTime = getcurrentTime();
      var song_time = songTime();
      $(".song_time").text(song_time)

      var playProgress = currentTime / durationTime * 100 ;

      setProgress()
      function setProgress(){
          if ($(".progress_line").hasClass('enabled')) return
          $(".progress_bar").css('width', playProgress+"%");
          $(".progress_dot").css('left', playProgress+"%" );
      }

      function songTime(){
        var startMin = parseInt(currentTime / 60)
        var startSec = parseInt(currentTime % 60)
        if (startMin < 10){
          startMin = "0"+ startMin;
        };
        if (startSec < 10){
          startSec = "0"+ startSec;
        }
        return startMin + ":" + startSec + "/" + musiclist[currentIndex].music[currentMusic].song_time
      }

  })
//////////進度條時間//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////自動播放下一首//////////
  $("#audio").on('timeupdate', function(event) {
    // if ($(".progress_line").hasClass('enabled')) return
    if (audio.currentTime == audio.duration) {
      $(".next").trigger('click')
    }

  });
//////////自動播放下一首//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////
//////////音量控制//////////

  audio.volume = 0.7
  $(window).keydown(function(event) {
    var volume = audio.volume
    switch (event.keyCode) {
      case 38:
        audio.volume = volume+0.05
        console.log(audio.volume)
      break;

      case 40:
        audio.volume = volume-0.05
        console.log(audio.volume)
      break;

      case 37:
        $(".pre").trigger('click')
      break;

      case 39:
        $(".next").trigger('click')
      break;

      case 32:
        $(".play").trigger('click')
      break;
    }
  });
  //////////音量控制//////////
  //////////
  //////////
  //////////
  //////////
  //////////
  //////////
  //////////
  //////////使用教學//////////
    $("body > span").click(function(event) {
      $(".help").slideToggle(400,function(){

      });
    });


  //////////手機版選單//////////
    $(".fa-bars").click(function(event) {
      $("aside").slideToggle('400', function() {
        $("aside li").click(function(event) {
          $("aside").slideUp(400)
        });
      });
    });


  //////////手機版選單//////////

  $(window).resize(function() {
      if ($(window).width()>768) {
      $("aside").show(400)
        initSinger();
      } else {
        initSinger();
      }

  });




















});
