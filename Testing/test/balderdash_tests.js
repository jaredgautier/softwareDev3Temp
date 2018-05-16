"use strict";

var chai = require("chai");
chai.should();
var expect = chai.expect;
chai.expect();

// Player module tests
var player = require('../public/balderdash_modules/player');



describe("Player", function(){
	//NAME
	describe("Get name", function(){
		it("A new player can be returned", function(){

			var newPlayer = "John";

			newPlayer.should.equal(player.getName());
		});
	});

	describe("Add name", function(){
		it("A new player can be named", function(){

			var newPlayer = "Sanvir";
			player.addName(newPlayer);

			newPlayer.should.equal(player.getName());
		});
	});
// SCORE
	describe("Get score", function(){
		it("A new players score can be returned", function(){

			var newScore = 0;

			newScore.should.equal(player.getScore());
		});
	});

	describe("Add to score", function(){
		it("A new players score can be increased", function(){

			var newScore = 10;
			player.scoreUp(newScore);
			newScore.should.equal(player.getScore());

			var newScore2 = 20;
			player.scoreUp(newScore);
			newScore2.should.equal(player.getScore());

		});
	});

	describe("Reduce score", function(){
		it("A new players score can be reduced", function(){

			var newScore = 10;
			player.scoreDown(newScore);
			newScore.should.equal(player.getScore());

			var newScore2 = 0;
			player.scoreDown(newScore);
			newScore2.should.equal(player.getScore());

		});
	});

// WORD
	describe("Get word", function(){
		it("A new players word can be returned", function(){

			var newWord = "balderdash";

			newWord.should.equal(player.getWord());
		});
	});

	describe("Set word", function(){
		it("A new players word can be changed", function(){

			var newWord = "neoterize";
			player.setWord(newWord);
			newWord.should.equal(player.getWord());

		});
	});

// DEFINITION
	describe("Get Definition", function(){
		it("A new players definition can be returned", function(){

			var newMeaning = "The word means";

			newMeaning.should.equal(player.getDefinition());
		});
	});

	describe("Set Definition", function(){
		it("A new players definition can be changed", function(){

			var newMeaning = "To introduce new words";
			player.define(newMeaning);
			newMeaning.should.equal(player.getDefinition());

		});
	});

// DASHING
	describe("isDashing", function(){
		it("A new players type can be obtained", function(){

			var state = false;

			state.should.equal(player.isDashing());
		});
	});

	describe("Set Dashing", function(){
		it("A new players type can be changed", function(){

			var state = true;
			player.setDashing(state);
			state.should.equal(player.isDashing());
		});
	});

//RESPONSE
	describe("response", function(){
 		it("A new players response can be obtained", function(){
 			var response = 0;
 		
 			response.should.equal(player.getResponse());
 		});
 	});

 	describe("response", function(){
 		it("A new players response can be set", function(){
 			var response = 1;
 			player.setResponse(response);
 			response.should.equal(player.getResponse());
 		});
 	});

});

////////////////////////////////////////////////////////////////////////////////
// Test LobbyGame.js

var test_lobbygame = require('../public/balderdash_modules/LobbyGame');

describe("LobbyGame:", function(){
	// Lobby game name
	describe("Lobby name:", function(){
		it("a lobby game is created with the default name", function(){
			var defaultname = 'Unnamed Game';
			defaultname.should.equal(test_lobbygame.getGameName());
		});
		it("a lobby game is created with the setter", function(){
			var newName = 'First Game';
			test_lobbygame.setGameName('First Game');
			newName.should.equal(test_lobbygame.getGameName());
		});
	});

	// Game winning score
	describe("Winning score:", function(){
		it("Get the default score", function(){
			var defaultScore = 20;
			defaultScore.should.equal(test_lobbygame.getWinningScore());
		});
		it("Set a non-default score", function(){
			var newScore = 30;
			test_lobbygame.setWinningScore(30);
			newScore.should.equal(test_lobbygame.getWinningScore());
		});
	});

	// current number of players
	describe("Current number of players:", function(){
		var test_player = require('../public/balderdash_modules/player');
		it("Get the default number of players", function(){
			var defaultnum = 1;
			defaultnum.should.equal(test_lobbygame.getCurrentNumPlayers());
		});
		it("Add a player", function(){
			var num = 2;
			test_lobbygame.addPlayer(test_player);
			num.should.equal(test_lobbygame.getCurrentNumPlayers());
		});
		it("Remove a player", function(){
			var num = 1;
			test_lobbygame.removePlayer(test_player);
			num.should.equal(test_lobbygame.getCurrentNumPlayers());
		});

		it("Try remove a player that doesn't exist", function(){
			var num = 1;
			var nonexisting_player = require('../public/balderdash_modules/player');
			test_lobbygame.removePlayer(nonexisting_player);
			num.should.equal(test_lobbygame.getCurrentNumPlayers());
		});
		it("Try add more than the maximum number of players allowed", function(){
			var num = 4;
			for (var i = 0; i < 4; i++) {
				var test_player = require('../public/balderdash_modules/player');
				test_lobbygame.addPlayer(test_player);

			}
			num.should.equal(test_lobbygame.getCurrentNumPlayers());
		});
	});
	// player array tests - we may need more of these
	describe("The player array", function() {
		it("Test that there is at least one player in the game", function(){
			expect(test_lobbygame).to.not.be.empty;
		});
	})

});