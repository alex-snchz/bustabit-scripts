/****
ALEX SANCHEZ STRATEGY

Easy peasy strategy: increase the cashOut value on every loss keeping the same betSize. 
Once we win start a new session.

********/


var config = {
  bet: { value: 100, type: 'balance', label: 'Initial Bet' },
  cashOut: { value: 2, type: 'multiplier', label: 'Initial Cashout' },
};

var cashOut = config.cashOut.value;

engine.bet(config.bet.value, cashOut);

engine.on('GAME_STARTING', onGameStarted);
engine.on('GAME_ENDED', onGameEnded);


function onGameStarted() {
  engine.bet(config.bet.value, cashOut);
}

function onGameEnded() {
	var lastGame = engine.history.first()

	if (!lastGame.wager) {
    	return;
  	}

  	// won
  	if (lastGame.cashedAt) {
    	log('Cicle ended starting a new one ...');
    	cashOut = config.cashOut.value;
  	} else {
  	// lost
  		cashOut = cashOut + config.bet.value;
  	}
}

