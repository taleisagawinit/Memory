$(document).ready(() => { 

    class Card {
        constructor(match, name) {
            this._match = match;
            this._name = name;
            this._el = `
            <div class="card">
                <div class="front ${name}">
                    <h3>${name}</h3>
                </div>
                <div class="back"></div>
            </div>
            ` 
        }
        get match() {
            return this._match
        }
        get name() {
            return this._name
        }
        get el() {
            return this._el
        }
    }

    class Deck {
        constructor() {
            this._pack = [];
            this.makePack();
        }
        makePack() {
            const matches = ['match1', 'match2']
            const names = ['Michael', 'Dwight', 'Pam', 'Jim', 'Kevin', 'Stanley', 'Angela', 'Ryan', 'Kelly']

            matches.forEach((match) => {
                names.forEach(name => {
                        this.pack.push(new Card(match, name))
                })
            })
        }
        populate(el) {
            const html = this.pack.map(card => card.el).join('')
            el.innerHTML = html;
        }
        shuffle() {
            var j, x, i;
            for (i = this._pack.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = this._pack[i];
                this._pack[i] = this.pack[j];
                this._pack[j] = x;
            }
        }

        get pack() {
            return this._pack;
        }

    }

    function start(){
    return `
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/The_Office_US_logo.svg/1280px-The_Office_US_logo.svg.png">
            <p>Memory Game</p>
            <ul id="intro">
                <li>Click a card to reveal it and find its matching pair</li> 
                <li>Each move is counted as a Toby (displayed below game)</li> 
                <li>Match all cards in 20 Toby's or less to win</li>
                <li>The less Toby's the better (obviously)</li>
            </ul>
            <img id="button" src="http://www.sclance.com/pngs/the-office-png/the_office_png_1372131.png">
            <p id="startbutton">
                <span>Start</span> <br> <strong>Game</strong>
            </p>
        </div>
    `
    }

    function lose(either) {
        return `
        <div>
            <img src="http://www.sclance.com/pngs/the-office-png/the_office_png_1372131.png">
            <p id="loser">
                <span>You</span> <br> <strong>${either}</strong>
            </p>
        </div>
        `
    }


    var toby = []
    function makeTobys(array) {
        for (let i = 0; i < 20; i++) {
            array.push(`<img src='./toby.gif'>`)
        }
        return array;
    }

    
    var disableCard = false
    function compareCards(card1, card2) {
        if(card1.innerHTML == card2.innerHTML) {
            counter = 0;
            flipped = flipped+2;
            if (flipped === 18) {
                return setTimeout(function() {
                    $(".lose").html(lose('Win'))
                    $(".container").slideUp()
                    $(".lose").slideDown()
                  }, 2000)
            } else {
                return $(card2, card1).css("pointer-events", "none")
            }
            
        } else {
            disableCard = true;
            if (tobycount === 21) {
                return setTimeout(function() {
                    $(".lose").html(lose('Lose'))
                    $(".container").addClass('gray')
                    $(".card").addClass('flipped')
                    $(".container").slideUp()
                    $(".x").slideDown()
                  }, 2000)
            }
            setTimeout(function() {
                card1.classList.remove('flipped')
                card2.classList.remove('flipped')
                counter = 0;
                return disableCard = false;
              }, 2000)
        }
        
    }

    var deck = new Deck()
    var cards = document.querySelector('.container')
    deck.shuffle();
    deck.populate(cards)
    $(".moves").html(makeTobys(toby))

    let num = 0;
    deck.pack.forEach(function(card) {
        num++
        console.log(num + " " + card.name)
        if (num == 6) {
            num = 0
        }
    })

    $(".start").html(start())
    
    
    $("#button, #startbutton").on('click', function(e) {
        $(".start").slideUp();
        $(".container").slideDown();
    })
    
    var hasFlipped = false;
    var counter = 0;
    var flipped = 0;
    let tobycount = 1;
    let card1, card2
   

    $(".card").on('click', function(e) {
        
        if (disableCard) return
        this.classList.add('flipped')
        counter++
        if (!hasFlipped) {
            hasFlipped = true;
            card1 = this;
        } else {
            hasFlipped = false;
            card2 = this;
        }

        if (counter == 2) {
            $(`.moves img:nth-child(${tobycount})`).addClass("toby animated bounce")
            tobycount++
            return compareCards(card1, card2)
        }
    })

    







    
















})
