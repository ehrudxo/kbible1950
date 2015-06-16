var kbible1950;
var readUrl ='/';
var bHistoryMem = [];
var bibleInstall = function(callback){
  if(typeof(localStorage.getItem("k_bible_1950"))==="string" && localStorage.getItem("k_bible_1950").length>100 ){
    kbible1950 = JSON.parse(localStorage.getItem("k_bible_1950"));
  }
  if(localStorage.getItem("k_bible_1950")){
    var r = confirm("개역 한글이 설치되어 있는 거 같습니다. 그래도 설치하시겠습니까?");
    $('#mWait').modal();
    if (r == true) {
      installRequest(function( data ){
        $('#mWait').modal('toggle');
        alert("성공적으로 설치했습니다!");
      });
    } else {
      window.location.replace( readUrl );
    }
  }else{
    $('#mWait').modal();
    installRequest(function( data ){
      $('#mWait').modal('toggle');
      alert("성공적으로 설치했습니다!");
    });
  }
}
var installRequest = function( callback ){
  $.get( "/getAll", function( data ) {
    localStorage.setItem( "k_bible_1950" , data );
    kbible1950 = JSON.parse(localStorage.getItem("k_bible_1950"));
    callback(data);
  });
}

var bibleRead = function(event, ui){
  $(".cbody").html("");
  var book  = mBible.book.value;
  if(event && ui){
    book = ui.item.value;
  }
  var chap  = mBible.chap.value||1;
  var phase = mBible.phase.value;
  var abbrevsBk = abbrevs[book];
  if(book && kbible1950[abbrevsBk][chap]){
    $(".cbody").append("<table class='table table-striped' id='ctbl'>");
    $('#ctbl').append("<tr><th>절</th><th>말씀</th></tr>")
    for( phs in kbible1950[abbrevsBk][chap]){
      $('#ctbl').append("<tr id='c"+phs+"'>");
      $('#c'+phs).append("<td id='b"+phs+"'>"+phs+"</td>");
      $('#c'+phs).append("<td>"+ kbible1950[abbrevsBk][chap][phs]["t"] + "</td>");
    }
    if(phase){
      $("#b"+phase).css("color","red");
      $("#b"+phase).ScrollTo({duration:'slow', offsetTop : '100'});
    }
    mBible.book.value =  book;
    mBible.chap.value = chap;
    mBible.phase.value =  phase;
    updateHistory({book:book,chap:chap,phase:phase});
    localStorage.setItem("bHistory",JSON.stringify(bHistoryMem));
  }else{
    if( chap > 0 ){
      $('#mInfo').modal();
    }else{

    }
    var prevNow =bHistoryMem[bHistoryMem.length -1];
    mBible.book.value =  prevNow["book"];
    mBible.chap.value = prevNow["chap"];
    mBible.phase.value =  prevNow["phase"];
    bibleRead();
  }

}
var updateHistory = function( bookObj ){
  var isExist= false;
  var hIndex=-1;
  var bHisLen = bHistoryMem.length;
  for(var i=0;i<bHisLen;i++){
    if(bHistoryMem[i]['book']===bookObj['book']
      && bHistoryMem[i]['chap']===bookObj['chap']
      && bHistoryMem[i]['phase']===bookObj['phase']) {
        isExist = true;
        hIndex = i;
        break;
      }
  }
  if(isExist){
    //console.log(isExist,hIndex);
    bHistoryMem.splice(hIndex,1);
  }
  bHistoryMem.push(bookObj);
}
var  books = ['창세기', '출애굽기', '레위기', '민수기', '신명기',
  '여호수아', '사사기', '룻기', '사무엘상', '사무엘하', '열왕기상',
  '열왕기하', '역대상', '역대하', '에스라', '느헤미아', '에스더', '욥기',
  '시편', '잠언', '전도서', '아가', '이사야',
  '예레미아', '예레미아 애가', '에스겔', '다니엘', '호세아', '요엘',
  '아모스', '오바댜', '요나', '미가', '나훔',
  '하박국', '스바냐', '학개', '스가랴', '말라기',
  '마태복음', '마가복음', '누가복음', '요한복음', '사도행전', '로마서',
  '고린도전서', '고린도후서', '갈라디아서', '에베소서', '빌립보서',
  '골로새서', '데살로니가전서', '데살로니가후서', '디모데전서', '디모데후서',
  '디도서', '빌레몬서', '히브리서', '야고보서', '베드로전서', '베드로후서',
  '요한1서', '요한2서', '요한3서', '유다서', '요한계시록'
];
var  abbrevs = {'창세기':'창', '출애굽기':'출', '레위기':'레', '민수기':'민', '신명기':'신',
  '여호수아':'수', '사사기':'삿', '룻기':'룻', '사무엘상':'삼상', '사무엘하':'삼하', '열왕기상':'왕상',
  '열왕기하':'왕하', '역대상':'대상', '역대하':'대하', '에스라':'스', '느헤미아':'느', '에스더':'에', '욥기':'욥',
  '시편':'시', '잠언':'잠', '전도서':'전', '아가':'아', '이사야':'사',
  '예레미아':'렘', '예레미아 애가':'애', '에스겔':'겔', '다니엘':'단', '호세아':'호', '요엘':'욜',
  '아모스':'암', '오바댜':'옵', '요나':'욘', '미가':'미', '나훔':'나',
  '하박국':'합', '스바냐':'습', '학개':'학', '스가랴':'슥', '말라기':'말',
  '마태복음':'마', '마가복음':'막', '누가복음':'눅', '요한복음':'요', '사도행전':'행', '로마서':'롬',
  '고린도전서':'고전', '고린도후서':'고후', '갈라디아서':'갈', '에베소서':'엡', '빌립보서':'빌',
  '골로새서':'골', '데살로니가전서':'살전', '데살로니가후서':'살후', '디모데전서':'딤전', '디모데후서':'딤후',
  '디도서':'딛', '빌레몬서':'몬', '히브리서':'히', '야고보서':'약', '베드로전서':'벧전', '베드로후서':'벧후',
  '요한1서':'요일', '요한2서':'요이', '요한3서':'요삼', '유다서':'유', '요한계시록':'계'
};
var bibleInit = function(){
  if(typeof(localStorage.getItem("k_bible_1950"))==="string" && localStorage.getItem("k_bible_1950").length>100 ){
    kbible1950 = JSON.parse(localStorage.getItem("k_bible_1950"));
  }
  $('.autocomplete').autocomplete({
    source : books,
    select : bibleRead
  });
  getHistory();
  initModal();
  var recent = bHistoryMem[bHistoryMem.length-1];
  if(recent){
    mBible.book.value = recent['book'];
    mBible.chap.value = recent['chap'];
    mBible.phase.value = recent['phase'];
    bibleRead();
  }

}
var chapterMove = function( delta ){
  mBible.phase.value = 1;
  mBible.chap.value = parseInt(mBible.chap.value||1) + delta;
  bibleRead();
}
var phaseMove = function( delta ){
  mBible.phase.value=parseInt(mBible.phase.value||1) + delta;
  bibleRead();
}
var bookMove = function( book ){
  $('#mBooks').modal('toggle');
  mBible.book.value = book;
  bibleRead();
}
var modalBooks = function(){
  $('#mBooks').modal();
}
var modalChapters = function(book){

}
var goBookHistory = function( book,chap,phase ){
  mBible.book.value = book;
  mBible.chap.value = chap;
  mBible.phase.value = phase;
  bibleRead();
  $('#mHistory').modal('toggle');
}
var modalHistroy = function(){
  $('#mHistory>.modal-dialog>.modal-content>.modal-body').html('');
  $('#mHistory>.modal-dialog>.modal-content>.modal-body').append('<div class="list-group">');
  var target = $('#mHistory>.modal-dialog>.modal-content>.modal-body>.list-group');
  getHistory();
  var i = bHistoryMem.length-1;
  var showRows = 20;
  while( showRows-- ){
    var his = bHistoryMem[i-showRows];
    if(his){
      var abbrevsBk = abbrevs[his['book']];
      var str = '<a href="#" class="list-group-item" onclick="goBookHistory(\'';
          str += his['book']+'\','+his['chap']+','+(his['phase']||1)+');">[';
          str += his['book']+']'+his['chap']+'장 ';
          if(his['phase']){
            str += his['phase']+'절';
          }else{
            str += his['phase']+'전체';
          }
          if(kbible1950[abbrevsBk][his['chap']] && kbible1950[abbrevsBk][his['chap']][his['phase']||1]){
            str += ' - '+ kbible1950[abbrevsBk][his['chap']][his['phase']||1]['t']+"</a>";
            target.prepend(str);
          }
    }
  }
  $('#mHistory>.modal-dialog>.modal-content>.modal-body').append();
  $('#mHistory').modal();
}
var initModal = function(){
  var buttons = '';
  for(var i=0,len=books.length;i<len;i++){
    buttons += '<a href="#" class="btn" onclick="bookMove(\''+books[i]+'\');">'+books[i]+'</a>'
  }
  $('#mBooks>.modal-dialog>.modal-content>.modal-body').append(buttons);
}
var getHistory = function(){
  var bHistory = localStorage.getItem("bHistory");
  if( bHistory ){
    bHistoryMem = JSON.parse(bHistory);
  }else{
    bHistoryMem =[];
  }
}
