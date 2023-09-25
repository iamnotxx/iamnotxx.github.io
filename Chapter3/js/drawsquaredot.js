"use strict";

var canvas;
var gl1,g12;

var theta = 0.0;
var thetaLoc;

var direction = 1;
var speed=0.1;
function clockwise(){
    direction=-1;
}
function anticlockwise(){
    direction=1;
}
function faster(){
    speed=0.15;
}
function medium(){
    speed=0.1;
}
function slower(){
    speed=0.05;
}
function changedir(){
	direction*=-1;
}
function changestate(){
	if(!direction) direction=1;
	else   direction=0;
}
function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl1 = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl1 ){
		alert( "WebGL isn't available" );
	}

	gl1.viewport( 0, 0, canvas.width, canvas.height );
	gl1.clearColor( 0.5, 0.5, 0.5, 1.0 );

	var program = initShaders( gl1, "rot-v-shader", "rot-f-shader" );
	gl1.useProgram( program );

	var vertices = [
		//  0,  1,  0,
		// -1,  0,  0,
		//  1,  0,  0,
		//  0, -1,  0
        //  0.5,  0.0,  0,
        // -0.5,  0.0,  0,
        // -0.5,  0.5,  0,
        // -0.53,  0.5,  0, 
        // -0.5, -0.5,  0,
        // -0.53, -0.5,  0
        0.01,  0.1,  0,
         0.6,  0.0,  0,
        0.01,  0.5,  0,
       -0.01,  0.5,  0, 
        0.01, -0.5,  0,
       -0.01, -0.5,  0,
        0.01,  -0.1,  0,
        -0.6,  0.0,  0
	];

	var bufferId = gl1.createBuffer();
	gl1.bindBuffer( gl1.ARRAY_BUFFER, bufferId );
	gl1.bufferData( gl1.ARRAY_BUFFER, new Float32Array( vertices ), gl1.STATIC_DRAW );

	var vPosition = gl1.getAttribLocation( program, "vPosition" );
	gl1.vertexAttribPointer( vPosition, 3, gl1.FLOAT, false, 0, 0 );
	gl1.enableVertexAttribArray( vPosition );

	thetaLoc = gl1.getUniformLocation( program, "theta" );

	renderSquare();
}

function renderSquare(){
	gl1.clear( gl1.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += speed*direction;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	
	gl1.uniform1f( thetaLoc, theta );

	gl1.drawArrays( gl1.TRIANGLE_STRIP, 2, 4 );
    gl1.drawArrays( gl1.TRIANGLES, 0, 3 );
    gl1.drawArrays( gl1.TRIANGLES, 5, 3 );

	// update and render
	window.requestAnimFrame( renderSquare );
}