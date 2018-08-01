const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
};

const populateList = function(beers){
  let selectTag = document.getElementById('beerDropdown');
  let index=0;
  beers.forEach((beer) => {
    let option = document.createElement('option');
    option.value = index;
    option.innerText = beer.name;
    selectTag.appendChild(option);
    index++;
  });

  selectTag.addEventListener('change', function(){
    var beer = beers[this.value];
    displayList(beer);
    var jsonString = JSON.stringify(beer);
    localStorage.setItem('beer', jsonString);
  });
};

const clearContent = function(node){
  while(node.hasChildNodes()){
    node.removeChild(node.lastChild);
  }
};

const displayList = function(beer){
  console.log(beer);
  let ulTag = document.getElementById('beer_list');
  clearContent(ulTag);
  let nameBeer = document.createElement('li');
  nameBeer.innerText = `Name: ` + beer.name;
  ulTag.appendChild(nameBeer);
  let dateBeer = document.createElement('li');
  dateBeer.innerText = `First brewed: ` + beer.first_brewed;
  ulTag.appendChild(dateBeer);
  let tagBeer = document.createElement('li');
  tagBeer.innerText = `Tag line: ` +beer.tagline;
  ulTag.appendChild(tagBeer);
  let infoBeer = document.createElement('li');
  infoBeer.innerText = beer.description;
  ulTag.appendChild(infoBeer);
  let imgBeer = document.createElement('img');
  imgBeer.src = beer.image_url;
  ulTag.appendChild(imgBeer);
};

var app = function(){
const url = 'https://api.punkapi.com/v2/beers';
var jsonString = localStorage.getItem('beer');
if(jsonString !== null){
  var savedBeer = JSON.parse(jsonString);
  displayList(savedBeer);
};
makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
