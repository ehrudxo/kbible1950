var kbible1950;
var readUrl ='/';
var bibleInstall = function(callback){
  if(typeof(localStorage.getItem("k_bible_1950"))==="string" && localStorage.getItem("k_bible_1950").length>100 ){
    kbible1950 = JSON.parse(localStorage.getItem("k_bible_1950"));
  }
  if(localStorage.getItem("k_bible_1950")){
    var r = confirm("개역 한글이 설치되어 있는 거 같습니다. 그래도 설치하시겠습니까?");
    if (r == true) {
      installRequest(function( data ){
        console.log( data );
        alert("성공적으로 설치했습니다!");
        //window.location.replace( readUrl );
      });
    } else {
      window.location.replace( readUrl );
    }
  }else{
    installRequest(function( data ){
      console.log( data );
      alert("성공적으로 설치했습니다!");
      //window.location.replace( readUrl );
    });
  }
}
var installRequest = function( callback ){
  $.get( "/getAll", function( data ) {
    localStorage.setItem( "k_bible_1950" , data );
    callback(data);
  });
}

var bibleRead = function(book,chap,phase){
  $(".cbody").html("");
  book = abbrevs[book];
  if(book && book.length==1){
    book = book + " ";
  }
  chap = chap ||"1";
  if(book){
    for( phs in kbible1950[book][chap]){
      $(".cbody").append("<div class='b"+phs+"'>["+book+" "+chap+":"+phs+"] "+ kbible1950[book][chap][phs]["t"] + "</div>");
    }
  }
  if(phase){
    $(".b"+phase).css("color","red");
    $(".b"+phase).ScrollTo();
  }
}
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  };
};

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
  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    displayKey: 'value',
    source: substringMatcher(books)
  });

}
