setup()

function setup(){
  let appElement = document.getElementById('main');
  appElement.querySelectorAll('.view').forEach(e=> e.classList.add('hidden'));

  let homeView = document.getElementById('home-page');
  homeView.classList.remove('hidden')

}