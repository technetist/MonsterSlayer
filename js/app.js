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
      let damage = this.calcDamage(3,10);
      this.monsterHealth -= damage;
      this.events.unshift({isPlayer: true, message:"Player attacks Monster for " + damage});
      if(this.checkHealth()) {
         return;
      }
      this.monsterTurn();
    },
    specialAttack: function() {
      let damage = this.calcDamage(10,20);
      this.monsterHealth -= damage;
      this.events.unshift({isPlayer: true, message:"Player attacks Monster for " + damage});
      if(this.checkHealth()) {
         return;
      }
      this.monsterTurn();
    },
    heal: function() {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
          this.playerHealth = 100;
      }
      this.events.unshift({isPlayer: true, message:"Player used a health potion for 10 health"});
      this.monsterTurn();
    },
    giveUp: function() {
      this.gameState = false;
      this.reset();
    },
    monsterTurn: function() {
      let damage = this.calcDamage(5,12);
      this.playerHealth -= damage;
      this.events.unshift({isPlayer: false, message:"Monster attacks Player for " + damage});
      this.checkHealth();
    },
    calcDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkHealth: function() {
      if(this.monsterHealth < 1) {
        this.monsterHealth = 0;
        this.events.unshift({isPlayer: true, message:"Player wins!"});
        this.gameState = false;
        return true;
      } else if (this.playerHealth < 1) {
        this.playerHealth = 0;
        this.events.unshift({isPlayer: true, message:"Monster wins..."});
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
