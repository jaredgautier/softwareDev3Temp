"use strict";

var chai = require("chai");
let chaiHttp = require('chai-http');
let app = require('../app');
chai.should();
var expect = chai.expect;
chai.expect();
chai.use(chaiHttp);
var io = require('socket.io');//(http);
var socket = io();


describe('Open server', () => {
    it('Should return status code 200 ok when server opens', (done) => {
      chai.request(app)
          .get('/')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

    it('Should return status code 200 ok when mainMenu page opens', (done) => {
      chai.request(app)
          .get('/mainMenu')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

      it('Should return status code 200 ok when createGame page opens', (done) => {
      chai.request(app)
          .get('/createGame')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

      it('Should return status code 200 ok when joinGame page opens', (done) => {
      chai.request(app)
          .get('/joinGame')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

      it('Should return status code 200 ok when helpMainMenu page opens', (done) => {
      chai.request(app)
          .get('/helpMainMenu')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

      it('Should return status code 200 ok when lobby page opens', (done) => {
      chai.request(app)
          .get('/lobby')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

    it('Should return status code 200 ok when helpCreateGame page opens', (done) => {
      chai.request(app)
          .get('/helpCreateGame')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

    it('Should return status code 200 ok when game play page opens', (done) => {
      chai.request(app)
          .get('/game')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

    it('Should return status code 200 ok when roundSummary page opens', (done) => {
      chai.request(app)
          .get('/helpMainMenu')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert.equal(err, null);
            done();
          });
    });

    it('Should return status code 404 when a random page is requested',
    function testPath(done) {
      chai.request(app)
      .get('/foo/bar')
      .end((err, res) => {
        res.should.have.status(404);
        chai.expect(err).to.not.equal(null);
        done();
      });
   });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Socket tests
//USERS
    it('Should add new users to the app', function(){

    var newUser = 'Sanvir';
    socket.emit('setUsername', newUser);
    socket.on('setUser', function(new_User){

      newUser.should.equal(new_User.username);
    });
    });


    it('Should not allow null users to log in', function(){

    var newUser = '';
    var ErrorMessage = 'The username field cannot be blank.\nPlease enter a username.';
    socket.emit('setUsername', newUser);
    socket.on('userExists', function(new_User){

      ErrorMessage.should.equal(new_User);
    });
    });

    it('Should not add multiple users with the same name', function(){

    var newUser2 = 'Sanvir'; //Sanvir has already been logged into the app in a previous test
    var ErrorMessage = 'Sorry, the username: '+newUser2 + ' is already taken.\nPlease try some other username.';
    socket.emit('setUsername', newUser2);
    socket.on('userExists', function(new_User){

      ErrorMessage.should.equal(new_User);
    });
    });

    it('Should be able to remove a user', function(){

    var newUser2 = 'Sanvir'; 
    //remove Sanvir
    socket.emit('removeUser', newUser2);
    
    //Sanvir should be removed by now and hence able to be logged in again
    socket.emit('setUsername', newUser2);
    socket.on('setUser', function(new_User){

      newUser2.should.equal(new_User.username);
    });
    });


//GAMES

  it('Should not create games with names = null', function(){
    var gameName = '';
    var ErrorMessage = 'The game name field cannot be blank.\nPlease enter a game name.';
    socket.emit('hostGame', gameName);
    socket.on('gameExists', function(message){
      ErrorMessage.should.equal(message)
  });
  });

  it('Should be able to add a game', function(){
    var gameName = 'myGame';
    //will only enter socket.on if game is created
    socket.emit('hostGame', gameName);

  });

  it('Should not be able to add multiple games with the same name', function(){
    var gameName2 = 'myGame';
    var ErrorMessage = 'Sorry, the game name: '+gameName2 + ' is already taken.\nPlease try some other game name.';
    //will only enter socket.on if game is created
    socket.emit('hostGame', gameName2);
    socket.on('gameExists', function(message){
      ErrorMessage.should.equal(message);
    });
  });

  it('Should be able to return the list of games', function(){
    var gameName = 'myGame';
    socket.emit('getHostedGames');
    socket.on('getHostedGamesArray', function(gamesList){
      //only game in array is myGame at index 0
      gameName.should.equal(gamesList[0]._gameName);
    });
  });

  it('Should be able to add players to a game', function(){
    var Sanvir = {
      username: 'Sanvir',
      gameName: 'myGame'
    };
    socket.emit('addGamePlayer', Sanvir);

    socket.on('getHostedGamesArray', function(gamesList){
      //only game in array is myGame at index 0
      Sanvir.username.should.equal(gamesList[0]._playerArray[0]);
    }); 

  });

  it('Should not allow players to join full game', function(){

    var Sanvir2 = {
      username: 'dessai',
      gameName: 'myGame'
    };

    socket.on('getHostedGamesArray', function(gamesList){
      gamesList[0]._maxNumPlayers = 1;
    });

    var ErrorMessage ='The game you are trying to join is full.\nPlease try a different game.';
    socket.emit('addGamePlayer', Sanvir2);
    socket.on('fullgame', function(message){
      ErrorMessage.should.equal(message);
    });
  });


  it('Should be able to find players game', function(){
    var Sanvir = 'Sanvir';
    var joinedGame = 'myGame';
    socket.emit('getMyGame',Sanvir);
    socket.on('myGame', function(game){
      joinedGame.should.equal(game._gameName);
    });
  });

  it('Should be able to find players game using query', function(){
    var Sanvir = 'Sanvir';
    var joinedGame = 'myGame';
    socket.emit('getMyGameQuery',Sanvir);
    socket.on('myGameQuery', function(game){
      joinedGame.should.equal(game._gameName);
    });
  });


  it('Should allow players to add their definitions', function(){

    var Sanvir = {
      _playerName: 'Sanvir',
      _definition: 'my definition'
    };

    socket.emit('AddDefinition', Sanvir);
    socket.emit('getMyGame', Sanvir._playerName);
    socket.on('myGame', function(game){
      Sanvir._definition.should.equal(game._playerWordArray[0]);
    });

  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});