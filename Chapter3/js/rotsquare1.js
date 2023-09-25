"use strict";

var canvas;
var gl;

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
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = [
		//  0,  1,  0,
		// -1,  0,  0,
		//  1,  0,  0,
		//  0, -1,  0
		0.7, -0.7, 0.0,
		0.0, 0.6, 0.0,
		-0.7, -0.7, 0.0
	];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	renderSquare();
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += speed*direction;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );

	// update and render
	window.requestAnimFrame( renderSquare );
}