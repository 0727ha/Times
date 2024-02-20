const API_KEY = `452a4ea137fa426281779a008fa281d0`;
let news = [];//여러번 쓰일 것이므로 전역변수로 할당해주는 것임
//https://newsapi.org/v2/top-headlines
const getLatestNews = async () => {
	const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

	const response = await fetch(url);//await을 포함하는 것은 비동기 함수이다.
	const data = await response.json();//객체 형식으로 주고받기 편하므로 json을 사용
	news = data.articles;
	console.log("ddd", news);
};

getLatestNews();