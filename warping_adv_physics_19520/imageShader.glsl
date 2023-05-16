// VERTEX SHADER

uniform sampler2D imageSampler;
varying vec4 vertTexCoord;

void main() {
	vec2 st = vertTexCoord.st;   
	vec3 imageColor = texture2D(imageSampler, st).rgb;
	gl_FragColor = vec4(imageColor, vertTexCoord.st/vertTexCoord.p);  
//	UNCOMMENT IN CASE YOU WANT TO SEE GRID
//	gl_FragColor = vec4(imageColor, 1.0);  
}