 /**
  * @fileOverview Automated acceptance testing
  * @author Groun 5: Beder, Dessai, Kastanos, Rubin
  * @version 4 
  */

// Tests should run on "https://balderdash-group-5.herokuapp.com/" 
// but the team did not have time to test this and change settings in codecept.json
// Thus these tests run on local:3000 and a bash terminal is required to run nope app.js before running these tests

Feature('Test the game flow');

Scenario('Success login', (I) => {
  const username = "Ringooooooooooo Star";
  I.amOnPage('/');
  I.fillField('name', username);
  I.click('button');
  I.see('This is the main menu and where your Balderdash adventure begins');
});


Scenario('Create a game', (I) => {
  const username = "Ringoooooooo Star";
  const gamename = "Ringo's Game";
  I.amOnPage('/');
  I.fillField('name', username);
  I.click('button');
  I.click('a[href="createGame"]');
  I.fillField('gameName', gamename);
  I.selectOption('numOfPlayers','3');
  I.click('Start Game');
  I.see('Lobby:');
});

Scenario('Join a game', (I) => {
  const username = "John Lennon";
  const gamename = "Ringo's Game";
  I.amOnPage('/');
  I.fillField('name', username);
  I.click('button');
  I.click('a[href="joinGame"]');
  I.click('button');
  I.see('Lobby:');
});

Scenario('Start a game automatically when max number of players join', (I) => {
  const username = "George Harrison";
  const gamename = "Ringo's Game";
  I.amOnPage('/');
  I.fillField('name', username);
  I.click('button');
  I.click('a[href="joinGame"]');
  I.click('button');
  I.wait(1);
  I.see('Word of the round:')
});