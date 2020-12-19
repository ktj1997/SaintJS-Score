# SaintJS-Score
## saint.ssu.ac.kr(유세인트)에서 자신의 성적 크롤링

### Install
````
npm install saintjs-score 
````

### Usage
`````
const crawling = require("saintjs-score");

const func = async () =>{
    const ret =await crawl("학번","비밀번호");
    console.log(ret);
}
func();
`````


### ReturnValue


````
 {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '데이터베이스응용',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: '하석재'
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '캡스톤디자인종합프로젝트1',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: '이수원'
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '운영체제',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: ', 양승민'
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '한반도평화와선교(숭실사이버대)',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: ' '
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: 'CHAPEL',
    credit: '0.5',
    score: ' ',
    grade: ' ',
    profName: '정대경'
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '알고리즘',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: ', 최지웅'
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '데이터통신과네트워크',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: '조효진'
  },
  {
    year: '2020학년도',
    semester: '2 학기',
    subjName: '고급컴퓨터수학',
    credit: '3.0',
    score: ' ',
    grade: ' ',
    profName: '최형광'
  }
]
````

