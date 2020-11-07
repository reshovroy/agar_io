

const width = window.innerWidth;
const height = window.innerHeight;

const canvas = document.querySelector("#canvas")
const context = canvas.getContext('2d');
canvas.height = height;
canvas.width = width;

let player = {}
let players = [];
let orbs = []

$(function () {

  $('#loginModal').modal('show')
  $('.name-form').submit((e) => {
    e.preventDefault();
    player.name = $(this).find('#name-input').val();
    console.log(player.name)
    $('#loginModal').modal('hide')
    $('#spawnModal').modal('show')

    $('.player-name').text(player.name)
  })

  $('.start-game').click(handleStartGame)

  function handleStartGame() {
    $('#spawnModal').modal('hide')
    $('.hiddenOnStart').removeAttr('hidden');

    initServerData()
  }

})