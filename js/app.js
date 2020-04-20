new Vue({
  el: '#app',
  data: {
    gameState: false,
    playerHealth: 100,
    monsterHealth: 100,
    events: []
  },
  methods: {
    startNewGame: function() {
      this.gameState = true;
      this.reset();
    },
    attack: function() {
      this.monsterHealth -= this.calcDamage(3,10);
      if(this.checkHealth()) {
         return;
      }

      this.monsterTurn();
    },
    specialAttack: function() {
      this.monsterHealth -= this.calcDamage(10,20);
      if(this.checkHealth()) {
         return;
      }

      this.monsterTurn();
    },
    heal: function() {

    },
    giveUp: function() {
      this.reset();
    },
    monsterTurn: function() {
      this.playerHealth -= this.calcDamage(5,12);
      this.checkHealth();
    },
    calcDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkHealth: function() {
      if(this.monsterHealth < 1) {
        this.monsterHealth = 0;
        this.events.push("Player wins!");
        this.gameState = false;
        return true;
      } else if (this.playerHealth < 1) {
        this.playerHealth = 0;
        this.events.push("Monster wins...");
        this.gameState = false;
        return true;
      }
      return false;
    },
    reset: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.events = [];
    }
  }
});
