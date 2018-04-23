$(function) {
	
	
	function randomString(){ //ID generator
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i =0; i < 10; i++){
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
}	
	// Column Class
	function Column(name) {
		var self = this; 
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

    function createColumn() {  // Create components of Column
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete btn').text('x');
		var $columnAddCard = $('<button>').addClass('add-card btn').text('Add a card');
		
		
		// add event for click
		$columnDelete.click(function() {
        self.removeColumn();
		});
		
		$columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
		});
		
		//construction column element
		$column.append($columnTitle)
        		.append($columnDelete)
        		.append($columnAddCard)
				.append($columnCardList);

			//return created column
			return $column;
	}
		
  }
// add card , remove columns
Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
};

//card class
function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();
	
	function createCard() { //card elements
		var $card = $('<li>').addClass('card');
    	var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    	var $cardDelete = $('<button>').addClass('btn-delete').text('x');
		
		// remove card
		$cardDelete.click(function(){
        self.removeCard();
		});
		$card.append($cardDelete) // add card with delete btn
            .append($cardDescription);

		return $card;
	}
}	
Card.prototype = {  // delete method
            removeCard: function () {
    		this.$element.remove();
            }
        }

var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};
