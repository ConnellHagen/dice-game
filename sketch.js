var WIDTH;
var HEIGHT;
var allGUI;

function setup(){
  
  WIDTH = windowHeight*16/9;
  HEIGHT = windowHeight;
  allGUI = new GUI();
  
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("display");
  
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont('Rubik');
  
}

function draw(){
  
  background(46, 127, 34);
  allGUI.display();
  
}

//all GUI managed by this `Class`
class GUI{
  
  constructor(){
    
    this.gui = [
      
      new DiceContainer(),
      new MoneyCounter(),
      new BetPlacer(),
      new RollButton()
      
    ];
    
  }
  
  display(){
    
    for(let i=0; i<this.gui.length; i++){
      this.gui[i].display();
    }
    
  }
  
  mousePressed(mx, my){
    
    for(let i=0; i<this.gui.length; i++){
      this.gui[i].mousePressed(mx, my);
    }
    
  }
  
  getDiceContainer(){
    return this.gui[0];
  }
  
  getMoneyCounter(){
    return this.gui[1];
  }
  
  getBetPlacer(){
    return this.gui[2];
  }
  
  getRollButton(){
    return this.gui[3];
  }
  
}

//GUI the brown box that the `Dice` will roll in, and contains the array of `Dice`
class DiceContainer{
  
  constructor(){
    
    this.positions = new Array(3);
    this.positions = [15, 10 + HEIGHT*7/30, 5 + 2 * HEIGHT*7/30];
    
    this.dice = new Array(9);
    this.dice = [
      
      new Dice(HEIGHT*7/30-10, this.positions[0], this.positions[0]),
      new Dice(HEIGHT*7/30-10, this.positions[1], this.positions[0]),
      new Dice(HEIGHT*7/30-10, this.positions[2], this.positions[0]),
      new Dice(HEIGHT*7/30-10, this.positions[0], this.positions[1]),
      new Dice(HEIGHT*7/30-10, this.positions[1], this.positions[1]),
      new Dice(HEIGHT*7/30-10, this.positions[2], this.positions[1]),
      new Dice(HEIGHT*7/30-10, this.positions[0], this.positions[2]),
      new Dice(HEIGHT*7/30-10, this.positions[1], this.positions[2]),
      new Dice(HEIGHT*7/30-10, this.positions[2], this.positions[2])
      
    ]
    
  }
  
  display(){
    
    push();
    
    fill(105, 49, 22);
    square(5, 5, HEIGHT*7/10, WIDTH/100);
    fill(120, 58, 25);
    square(10, 10, HEIGHT*7/10-10, WIDTH/100);
    
    pop();
    
    for(let i = 0; i<this.dice.length; i++){
      this.dice[i].display();
    }
    
    push();
    textSize(WIDTH/3.5);
    fill(0, 0, 0, 50);
    text(this.totalDice(), (5+HEIGHT*7/10)/2, (5+HEIGHT*7/10)/2 + HEIGHT/64);
    pop();
    
  }
  
  roll(){
    
    for(let i=0; i<9; i++){
      this.dice[i].roll();
    }
    
  }
  
  totalDice(){
    
    let total = 0;
    for(let i=0; i<this.dice.length; i++){
      total += this.dice[i].getPips();
    }
    return total;
    
  }
  
  mousePressed(){
    
  }
  
}

//the dice that appear within the `DiceContainer`
class Dice{
  
  constructor(size, x, y){
    this.pips = Math.ceil(random(0,6));
    //square length in pixels
    this.size = size;
    this.x = x;
    this.y = y;
  }
  
  display(){
    
    push();
    
    //draws the white part of the dice    
    fill(234);
    square(this.x, this.y, this.size, WIDTH/100);
    
    //draws the pips
    fill(40);
    switch(this.pips){
        
        case(1):
          circle(this.x + 0.5 * this.size, this.y + 0.5 * this.size, 0.18 * this.size);
        break;
        
        case(2):
          circle(this.x + 0.25 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
        break;
        
        case(3):
          circle(this.x + 0.25 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
          circle(this.x + 0.5 * this.size, this.y + 0.5 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
        break;
        
        case(4):
          circle(this.x + 0.25 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
          circle(this.x + 0.25 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
        break;
        
        case(5):
          circle(this.x + 0.25 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
          circle(this.x + 0.25 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
          circle(this.x + 0.5 * this.size, this.y + 0.5 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
        break;
        
        case(6):
          circle(this.x + 0.25 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
          circle(this.x + 0.25 * this.size, this.y + 0.5 * this.size, 0.18 * this.size);
          circle(this.x + 0.25 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.25 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.5 * this.size, 0.18 * this.size);
          circle(this.x + 0.75 * this.size, this.y + 0.75 * this.size, 0.18 * this.size);
        break;
        
    }
    
    pop();
    
  }
  
  roll(){
    this.pips = Math.ceil(random(0,6));
  }
  
  getPips(){
    return this.pips;
  }
  
}

//GUI the counter and displayer of the user's balance
class MoneyCounter{
  
  constructor(){
    
    this.balance = 5000;
    
  }
  
  display(){
    
    //box
    push();
    
    fill(112, 59, 22);
    rect(5, HEIGHT*7/10+10, HEIGHT*7/10, HEIGHT*3/10-15, WIDTH/100);
    fill(127, 68, 25);
    rect(10, HEIGHT*7/10+15, HEIGHT*7/10-10, HEIGHT*3/10-25, WIDTH/100);
    
    //count
    switch(digits(this.balance)){
        
      case 1: case 2: case 3: case 4:
        textSize(WIDTH/9);
        break;
        
      case 5:
        textSize(WIDTH/10);
        break;
        
      case 6:
        textSize(WIDTH/11.5);
        break;
        
      case 7:
        textSize(WIDTH/13);
        break;
      
      default:
        textSize(WIDTH/15);
        
    }
    fill(0);
    text('$' + this.balance, (10 + HEIGHT*7/10)/2, (HEIGHT*17/10 + 5)/2 + HEIGHT/64);
    
    pop();
    
  }
  
  mousePressed(x, y){

  }
  
  addValue(value){
    this.balance += Math.floor(value);
  }
  
  subtractValue(value){
    this.balance -= Math.floor(value);
  }
  
  getBal(){
    return this.balance;
  }
  
}

//GUI from which the user places a bet, and can see their return/loss possible
class BetPlacer{
  
  constructor(){
    
    this.bet = 0;
    this.add = true;
    this.selected = 0;
    this.comparativeVal = 31;
    this.returnOnBet = 1.8;
    
  }
  
  display(){
    
    this.calculateReturn();
    
    push();
    
    //box
    fill(112, 59, 22);
    rect(HEIGHT*7/10 + 10, 5, WIDTH-(HEIGHT*7/10 + 10)-5, HEIGHT*7/10, WIDTH/100);
    fill(127, 68, 25);
    rect(HEIGHT*7/10 + 15, 10, WIDTH-(HEIGHT*7/10 + 10)-15, HEIGHT*7/10-10, WIDTH/100);
    
    //greater than/less than equal to gui area

    //buttons
    //display for number to compare to
    fill(46, 127, 34);
    square(HEIGHT*7/10 + 20, 15, HEIGHT*2/10 - 20, WIDTH/100, 0, 0, WIDTH/100);
    fill(240);
    textSize(HEIGHT/10)
    text(this.comparativeVal, (HEIGHT*16/10 + 20)/2, (HEIGHT*2/10 - 5)/2 + HEIGHT/64);
    
    textSize(HEIGHT/6);
    if(this.selected==0){
      fill(230, 0, 0);
    }else{
      fill(0);
    }
    square(HEIGHT*9/10, 15, HEIGHT*2/10 - 20);
    fill(240);
    text('<', (HEIGHT - 10), (HEIGHT*2/10 - 5)/2 + HEIGHT/64);

    if(this.selected==1){
      fill(230, 0, 0);
    }else{
      fill(0);
    }
    square(HEIGHT*11/10 - 20, 15, HEIGHT*2/10 - 20);
    fill(240);
    text('=', (HEIGHT*6/5 - 30), (HEIGHT*2/10 - 5)/2 + HEIGHT/64);
    
    if(this.selected==2){
      fill(230, 0, 0);
    }else{
      fill(0);
    }
    square(HEIGHT*13/10 - 40, 15, HEIGHT*2/10 - 20);
    fill(240);
    text('>', (HEIGHT*7/5 - 50), (HEIGHT*2/10 - 5)/2 + HEIGHT/64);
    
    fill(46, 127, 34);
    rect(HEIGHT*15/10 - 60, 15, (WIDTH-15) - (HEIGHT*15/10 - 60), HEIGHT*2/10 - 20, 0, WIDTH/100, WIDTH/100, 0);
    fill(240);
    textSize(HEIGHT/10)
    text(this.returnOnBet + 'x', (WIDTH + HEIGHT*15/10 - 75)/2, (HEIGHT*2/10 - 5)/2 + HEIGHT/64);
    
    //bet tracker - calculator looking thing
    //window
    fill(112, 59, 22);
    rect(HEIGHT*7/10 + 20, HEIGHT*2/10, (WIDTH-15)-(HEIGHT*7/10 + 20), HEIGHT*2/10 - 20, WIDTH/100);
    fill(240);
    text('$' + this.bet, (WIDTH-15 + HEIGHT*7/10 + 20)/2, HEIGHT*3/10 - 10 );
    
    //buttons
    fill(112, 59, 22);
    rect(HEIGHT*7/10 + 20, HEIGHT*4/10 - 10,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*28/50 + 14 + WIDTH/5, HEIGHT*4/10 - 10,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*21/50 + 8 + WIDTH*2/5, HEIGHT*4/10 - 10,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*14/50 + 2 + WIDTH*3/5, HEIGHT*4/10 - 10,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*7/50 -4 + WIDTH*4/5, HEIGHT*4/10 - 10,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    
    rect(HEIGHT*7/10 + 20, HEIGHT*11/20 - 5,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*28/50 + 14 + WIDTH/5, HEIGHT*11/20 - 5,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*21/50 + 8 + WIDTH*2/5, HEIGHT*11/20 - 5,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*14/50 + 2 + WIDTH*3/5, HEIGHT*11/20 - 5,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    rect(HEIGHT*7/50 -4 + WIDTH*4/5, HEIGHT*11/20 - 5,  (WIDTH-HEIGHT*7/10 - 55)/5, HEIGHT*3/20, WIDTH/100);
    
    fill(240);
    text('1', HEIGHT*7/10 + 20 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*4/10 - 10 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('2', HEIGHT*28/50 + 14 + WIDTH/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*4/10 - 10 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('3', HEIGHT*21/50 + 8 + WIDTH*2/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*4/10 - 10 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('4', HEIGHT*14/50 + 2 + WIDTH*3/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*4/10 - 10 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('5', HEIGHT*7/50 + -4 + WIDTH*4/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*4/10 - 10 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('6', HEIGHT*7/10 + 20 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*11/20 - 5 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('7', HEIGHT*28/50 + 14 + WIDTH/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*11/20 - 5 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('8', HEIGHT*21/50 + 8 + WIDTH*2/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*11/20 - 5 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('9', HEIGHT*14/50 + 2 + WIDTH*3/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*11/20 - 5 + (HEIGHT*3/20)/2 + HEIGHT/128);
    text('0', HEIGHT*7/50 + -4 + WIDTH*4/5 + ((WIDTH-HEIGHT*7/10 - 55)/10), HEIGHT*11/20 - 5 + (HEIGHT*3/20)/2 + HEIGHT/128);

    pop();
    
  }
  
  calculateReturn(){
    
    //23 on each half of the possible scale -- something to consider
    // [less than number, equal to, greater than]
    // index is `comparativeVal` - 9
    let returnsOnBet = [
      [1.01, 25000, 0],
      [1.02, 10000, 25000],
      [1.03, 5000, 5000],
      [1.04, 1000, 3000],
      [1.05, 500, 1000],
      [1.07, 300, 500],
      [1.09, 200, 200],
      [1.11, 150, 100],
      [1.13, 130, 50],
      [1.15, 115, 35],
      [1.2, 100, 20],
      [1.25, 90, 10],
      [1.3, 80, 7.5],
      [1.35, 70, 6],
      [1.4, 66, 4],
      [1.45, 62, 3.4],
      [1.5, 58, 3.2],
      [1.6, 54, 3.0],
      [1.7, 50, 2.9],
      [1.8, 48, 2.75],
      [1.9, 46, 2.7],
      [2, 44, 2.65],
      [2.2, 42, 2.6],
      [2.5, 40, 2.55],
      [2.55, 40, 2.5],
      [2.6, 42, 2.2],
      [2.65, 44, 2],
      [2.7, 46, 1.9],
      [2.75, 48, 1.8],
      [2.9, 50, 1.7],
      [3.0, 54, 1.6],
      [3.2, 58, 1.5],
      [3.4, 62, 1.45],
      [4, 66, 1.4],
      [6, 70, 1.35],
      [7.5, 80, 1.3],
      [10, 90, 1.25],
      [20, 100, 1.2],
      [35, 115, 1.15],
      [50, 130, 1.13],
      [100, 150, 1.11],
      [200, 200, 1.09],      
      [500, 300, 1.07],
      [1000, 500, 1.05],
      [3000, 1000, 1.04],
      [5000, 5000, 1.03],
      [25000, 10000, 1.02],
      [0, 25000, 1.01]
    ];
    this.returnOnBet = returnsOnBet[this.comparativeVal-9][this.selected];
  }
  
  clearBet(){
    this.bet = 0;
  }
  
  addBetDigit(digit){
    if(digits(this.bet)>=9){
      this.pushBetDigit(digit);
    }
    else{
      this.bet = this.bet*10 + digit; 
    }
    
  }
  
  pushBetDigit(digit){
    let numDigits = digits(this.bet);
    this.bet = this.bet % pow(10, numDigits-1);
    this.bet = this.bet * 10 + digit;
  }
  
  getBet(){
    return this.bet;
  }
  
  getReturnOnBet(){
    return this.returnOnBet;
  }
  
  getSelected(){
    return this.selected;
  }
  
  getComparativeVal(){
    return this.comparativeVal;
  }
  
  randomComparativeVal(){
    let tempDice = new DiceContainer();
    this.comparativeVal = tempDice.totalDice();
  }
  
  mousePressed(x, y){
    
    //greater than less than equal to selector
    if(x >= HEIGHT*9/10 && x < HEIGHT*11/10 - 20 && y >= 15 && y <= HEIGHT*2/10 - 5){
      this.selected = 0;
    }
    if(x >= HEIGHT*11/10 - 20 && x < HEIGHT*13/10 - 40 && y >= 15 && y <= HEIGHT*2/10 - 5){
      this.selected = 1;
    }
    if(x >= HEIGHT*13/10 - 40 && x < HEIGHT*15/10 - 60 && y >= 15 && y <= HEIGHT*2/10 - 5){
      this.selected = 2;
    }
    
    //bet clear button (click on bet)
    if(x >= HEIGHT*7/10 + 20 && x <= WIDTH - 15 && y >= HEIGHT*2/10 && y <= HEIGHT*4/10 - 20){
      this.clearBet();
    }
    
    if(x >= HEIGHT*7/10 + 20 && x <= WIDTH/5 + HEIGHT*28/50 + 9 && y >= HEIGHT*4/10 - 10 && y <= HEIGHT*11/20 - 10){
       this.addBetDigit(1);
    }
    if(x >= HEIGHT*28/50 + 14 + WIDTH/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*28/50 + 14 + WIDTH/5 && y >= HEIGHT*4/10 - 10 && y <= HEIGHT*11/20 - 10){
       this.addBetDigit(2);
    }
    if(x >= HEIGHT*21/50 + 8 + WIDTH*2/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*21/50 + 8 + WIDTH*2/5 && y >= HEIGHT*4/10 - 10 && y <= HEIGHT*11/20 - 10){
       this.addBetDigit(3);
    }
    if(x >= HEIGHT*14/50 + 2 + WIDTH*3/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*14/50 + 2 + WIDTH*3/5 && y >= HEIGHT*4/10 - 10 && y <= HEIGHT*11/20 - 10){
       this.addBetDigit(4);
    }
    if(x >= HEIGHT*7/50 + -4 + WIDTH*4/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*7/50 + -4 + WIDTH*4/5 && y >= HEIGHT*4/10 - 10 && y <= HEIGHT*11/20 - 10){
       this.addBetDigit(5);
    }
    if(x >= HEIGHT*7/10 + 20 && x <= WIDTH/5 + HEIGHT*28/50 + 9 && y >= HEIGHT*11/20 - 5 && y <= HEIGHT*14/20-5){
       this.addBetDigit(6);
    }
    if(x >= HEIGHT*28/50 + 14 + WIDTH/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*28/50 + 14 + WIDTH/5 && y >= HEIGHT*11/20 - 5 && y <= HEIGHT*14/20-5){
       this.addBetDigit(7);
    }
    if(x >= HEIGHT*21/50 + 8 + WIDTH*2/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*21/50 + 8 + WIDTH*2/5 && y >= HEIGHT*11/20 - 5 && y <= HEIGHT*14/20-5){
       this.addBetDigit(8);
    }
    if(x >= HEIGHT*14/50 + 2 + WIDTH*3/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*14/50 + 2 + WIDTH*3/5 && y >= HEIGHT*11/20 - 5 && y <= HEIGHT*14/20-5){
       this.addBetDigit(9);
    }
    if(x >= HEIGHT*7/50 + -4 + WIDTH*4/5 && x <= (WIDTH-HEIGHT*7/10 - 55)/5 + HEIGHT*7/50 + -4 + WIDTH*4/5 && y >= HEIGHT*11/20 - 5 && y <= HEIGHT*14/20-5){
       this.addBetDigit(0);
    }
    
    
  }
  
}

//GUI in which the user presses the button to trigger a re-roll of the `Dice` array within `allGUI`
class RollButton{
  
  constructor(){
    
  }  
  
  display(){
    
    push();
    
    //button
    fill(181, 0, 21);
    rect(HEIGHT*7/10 + 10, HEIGHT*7/10+10, WIDTH-(HEIGHT*7/10 + 10)-5, HEIGHT*3/10-15, WIDTH/100);
    fill(204, 0, 23);
    rect(HEIGHT*7/10 + 15, HEIGHT*7/10+15, WIDTH-(HEIGHT*7/10 + 10)-15, HEIGHT*3/10-25, WIDTH/100);
    
    //text
    let tsize = WIDTH/7;
    fill(240);
    textSize(tsize);
    text('roll', (HEIGHT*7/10 + WIDTH-5)/2, (HEIGHT*7/10+10 + HEIGHT-10)/2 + HEIGHT/64);
    
    pop();
    
  }
  
  mousePressed(x, y){
    
    if(x>=HEIGHT*7/10 + 10 && x<=WIDTH-5 && y>=HEIGHT*7/10+10 && y<=HEIGHT-10){
      
      if(allGUI.getBetPlacer().getBet() > allGUI.getMoneyCounter().getBal())
         return;
         
      allGUI.getDiceContainer().roll();
      if(
        (allGUI.getDiceContainer().totalDice() > allGUI.getBetPlacer().getComparativeVal() && allGUI.getBetPlacer().getSelected() == 0) || (allGUI.getDiceContainer().totalDice() == allGUI.getBetPlacer().getComparativeVal() && allGUI.getBetPlacer().getSelected() == 1) || (allGUI.getDiceContainer().totalDice() < allGUI.getBetPlacer().getComparativeVal() && allGUI.getBetPlacer().getSelected() == 2)){
        
        allGUI.getMoneyCounter().addValue(allGUI.getBetPlacer().getBet() * (allGUI.getBetPlacer().getReturnOnBet()-1));
        allGUI.getBetPlacer().randomComparativeVal();
        
      }else{
        
        allGUI.getMoneyCounter().subtractValue(allGUI.getBetPlacer().getBet());
        allGUI.getBetPlacer().randomComparativeVal();
        
      }
      
    }
    
  }
  
}

//count the number of digits `num` has
function digits(num){
  
  if(num == num%10){
     return 1;
  }
  return 1 + digits(Math.floor(num/10));
  
}

function mousePressed(){
  
  allGUI.mousePressed(Math.floor(mouseX), Math.floor(mouseY));
  
}
