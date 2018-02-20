/****
OSCAR'S GRIND STRATEGY

Let's take a closer look at an all-time favourite positive progression used by professional gamblers 
all over the world called Oscar's Grind. This method does wonders in the short run, 
but does it have the same effectiveness in the long run?

If you're not familiar with progressions and betting strategies in general, we suggest you read our article about them first.

Oscar's Grind is based on the common misconception that a negative streak has to be followed by a similar-length positive one, 
and tries to take advantage of this by winning more in the winning part of the streaks than what is lost in the losing part. 
In theory, this sounds very nice, but in the practice streaks are just a way for our mind to rationalise randomness, 
but mathematically they do not exist, therefore the theory is invalid. 
Although Oscar's Grind may not be the system that beats the house, it has a great chance to show profit in a single short session 

********/


var config = {
  bet: { value: 100, type: 'balance', label: 'Initial Bet' },
  cashOut: { value: 2, type: 'multiplier' },
};

var sessionLoss = 0;
var betSize = config.bet.value;

engine.bet(betSize, config.cashOut.value);

engine.on('GAME_STARTING', onGameStarted);
engine.on('GAME_ENDED', onGameEnded);


function onGameStarted() {
  engine.bet(betSize, config.cashOut.value);
}

function onGameEnded() {
	var lastGame = engine.history.first()

	if (!lastGame.wager) {
    	return;
  	}

  	// won
  	if (lastGame.cashedAt) {
  		sessionLoss = sessionLoss + betSize;
  		if (sessionLoss > config.bet.value) {
    		log('Cicle ended starting a new one ...');
    		betSize = config.bet.value;
    		sessionLoss = 0;
  		} else {
  			if (sessionLoss + betSize > config.bet.value) {
  				betSize = Math.abs(config.bet.value - sessionLoss);
  			} else {
  				betSize = betSize + config.bet.value;
  			}
  		}
  	} else {
  	// lost
  		sessionLoss = sessionLoss - betSize;
  		betSize = config.bet.value;
  	}
}

