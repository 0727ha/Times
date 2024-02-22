const API_KEY = `452a4ea137fa426281779a008fa281d0`;
let newsList = [];//여러번 쓰일 것이므로 전역변수로 할당해주는 것임
//https://newsapi.org/v2/top-headlines
//https://timesnews-site.netlify.app//top-headlines
const getLatestNews = async () => {
	const url = new URL(`https://timesnews-site.netlify.app//top-headlines?country=us&apiKey=${API_KEY}`);

	const response = await fetch(url);//await을 포함하는 것은 비동기 함수이다.
	const data = await response.json();//객체 형식으로 주고받기 편하므로 json을 사용
	newsList = data.articles;
	render();
	console.log("ddd", newsList);
};
const render = () => {
	const newsHTML = newsList.map((news) => `		<div class="row news">
	<div class="col-lg-4">
		<img class="news-img-size"
			src=${news.urlToImage} />

	</div>
	<div class="col-lg-8">
		<h2>${news.title}</h2>
		<p>${news.description}</p>
		<div>${news.source.name} * ${news.publishedAt}</div>
	</div>`).join("");/*map은 그곳에 있는 배열을 모두 갖고 온다 */
	console.log("html", newsHTML);

	document.getElementById(`news-board`).innerHTML = newsHTML;//어디에
};

getLatestNews();

/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

const openSearchBox = () => {
	let inputArea = document.getElementById("input-area");
	if (inputArea.style.display === "inline") {
		inputArea.style.display = "none";
	} else {
		inputArea.style.display = "inline";
	}
};
openSearchBox();





