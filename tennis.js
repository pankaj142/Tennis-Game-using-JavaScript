 var canvas;
        var canvasContext;
        
        console.log("hi....");
        var ballX=50;
        var ballY=150;
        var moveSpeedHorizontal =15;
        var moveSpeedVertical=5;
        
        var paddle2Y =250;
        var paddle1Y =250; 
        var PADDLE_HEIGHT =100;
        var PADDLE_THICKNESS=10;
        
        var player1Score =0
        var player2Score =0;
        
        function calculateMousePos(evt){
            var rect =canvas.getBoundingClientRect();
            var root =document.documentElement;
            //
            var mouseX = evt.clientX -rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            
            //var mouseX = evt.clientX;
            //var mouseY = evt.clientY;
          
            return {
                 x:mouseX,
                 y:mouseY
            };
        }
        
                
        //to move the computer paddle according to ball
        // +35 and -35 is to avoid paddle's shaking
        function computerMovement(){
            var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
            if(paddle2YCenter > ballY+35)
                {
                    paddle2Y -= 6;
                } else if(paddle2YCenter < ballY-35)
                {    
                   paddle2Y += 6;
                }
            
        }
        
          window.onload = function(){
               canvas = document.getElementById('firstcanvas');
               canvasContext= canvas.getContext('2d');
             
               var framespersecond=20;
              
               setInterval(callBoth, 1000/framespersecond);
              
              
              //set paddle's position value whenever mouse moves
              canvas.addEventListener('mousemove',
                                      function(evt){
                  var mousepos = calculateMousePos(evt);
                  paddle1Y = mousepos.y-(PADDLE_HEIGHT/2);
                  
              });
              
              
              
          }
        
          function callBoth(){
              moveFun();
              drawFun();
          }
          
        function resetBall(){
            ballX =canvas.width/2;
            ballY =canvas.height/2;
            moveSpeedHorizontal = -moveSpeedHorizontal; 
        }
        
        function moveFun(){
            //to move the computer paddle according to ball
            computerMovement();
            
            ballX =ballX + moveSpeedHorizontal;
            ballY =ballY + moveSpeedVertical;
            
            // below lines check boundary values
            if(ballX < 0){
                if(ballY > paddle1Y && 
                   ballY < paddle1Y+PADDLE_HEIGHT){
                    moveSpeedHorizontal = -moveSpeedHorizontal;
                }else{
                      resetBall();
                    //computer's score is incremented by 1
                      player2Score++; 
                     }
                     
            }
            if(ballX > canvas.width){
               if(ballY > paddle2Y && 
                 ballY < paddle2Y+PADDLE_HEIGHT){
                moveSpeedHorizontal = -moveSpeedHorizontal;   
               }else {
                   resetBall();
                   // player1 score increased by 1
                   player1Score++;
               }
                
                
            }
            
            if(ballY < 0){
                moveSpeedVertical = -moveSpeedVertical;    
            }
            if(ballY > canvas.height){
                moveSpeedVertical = -moveSpeedVertical;
            }
            
        }
        
        function drawFun(){
        // next line blanks out the screen with black    
        colorRect(0,0,canvas.width,canvas.height,'black');
       
        // this is the left player paddle
        colorRect(0,paddle1Y,
                  PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
            
        // this is the right player paddle
        colorRect(canvas.width-PADDLE_THICKNESS,
                  paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
            
        // calling function to draw ball    
        colorCircle(ballX,ballY,20,'red');    
            
        // these lines draws circle as ball    
    /*    canvasContext.fillStyle='red';
        canvasContext.beginPath();
        canvasContext.arc(ballX,150,20,0,Math.PI*2,true);
        canvasContext.fill();    */
        
            
            //display scores 
            canvasContext.fillText(player1Score,100,100);
            canvasContext.fillText(player2Score,
                                   canvas.width-100,100);
       
        
        }
        
        // this function draws rectangle
        function colorRect(leftX,topY,width,height,drawColor){
            canvasContext.fillStyle=drawColor;
            canvasContext.fillRect(leftX,topY,width,height);
        
        }
        
        // this function draws circle 
        function colorCircle(centerX,centerY,radius,color){
            canvasContext.fillStyle=color;
            canvasContext.beginPath();
            canvasContext.arc(centerX,centerY,radius,0,
                                 Math.PI*2,true);
            canvasContext.fill();
        }
        