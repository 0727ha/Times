const API_KEY = `452a4ea137fa426281779a008fa281d0`;
let newsList = [];//여러번 쓰일 것이므로 전역변수로 할당해주는 것임
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click", (Event) => getNewsByCategory(Event)));

//https://newsapi.org/v2/top-headlines(제출용)
//https://timesnews-site.netlify.app//top-headlines
let url = new URL(`https://timesnews-site.netlify.app//top-headlines?country=us&apiKey=${API_KEY}`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
	try {
		url.searchParams.set("page", page);//=> &page=page
		url.searchParams.set("pageSize", pageSize);

		const response = await fetch(url);//await을 포함하는 것은 비동기 함수이다.
		const data = await response.json();//객체 형식으로 주고받기 편하므로 json을 사용
		if (response.status === 200) {
			if (data.articles.length === 0) {
				throw new Error("no result for this search");
			}

			newsList = data.articles;
			totalResults = data.totalResults;
			render();
			paginationRender();
		} else {
			throw new Error(data.message);
		}

	} catch (error) {
		errorRender(error.message);
	}
	render();
};

const getLatestNews = async () => {
	url = new URL(`https://timesnews-site.netlify.app//top-headlines?country=us&apiKey=${API_KEY}`);
	getNews();
};

const getNewsByCategory = async (Event) => {
	const category = Event.target.textContent.toLowerCase();
	console.log("category", category);
	url = new URL(`https://timesnews-site.netlify.app//top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
	getNews();

};
//searchNews가 getNewsByKeyword임
const searchNews = async () => {
	const keyword = document.getElementById("search-input").value;
	console.log("keyword", keyword);
	url = new URL(`https://timesnews-site.netlify.app//top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);

	getNews();
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


	document.getElementById("news-board").innerHTML = newsHTML;//어디에
};

const errorRender = (errorMessage) => {
	const errorHTML = `<div class="alert alert-danger" role="alert">
		${errorMessage}
	      </div>`;

	document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
	//totalresult
	//page
	//pagesize
	//groupsize
	//totalPages
	const totalPages = Math.ceil(totalResults / pageSize);

	//pageGroup
	const pageGroup = Math.ceil(page / groupSize);
	//lastPage
	const lastPage = pageGroup * groupSize;
	//마지막 페이지 그룹이 그룹사이즈보다 작다? lastpage=totalpage
	if (lastPage > totalPages) {
		lastPage = totalPages;
	}
	//firstPage
	const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

	let paginationHTML = `<li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link" href="#">Previous</a></li>`;

	for (let i = firstPage; i <= lastPage; i++) {
		paginationHTML += `<li class="page-item ${i === page ? `active` : ``}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;

	}
	paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})"><a class="page-link" href="#">Next</a></li>`
	document.querySelector(".pagination").innerHTML = paginationHTML;




};

const moveToPage = (pageNum) => {
	console.log("movetoPage", pageNum);
	page = pageNum;
	getNews();
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


//1.버튼들에 클릭이벤트 주기
//2.카테고리별 뉴스 가져오기
//3.뉴스를 ui에 보여주기






