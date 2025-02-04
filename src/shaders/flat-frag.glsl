#version 300 es
precision highp float;

uniform vec3 u_Eye, u_Ref, u_Up;
uniform vec2 u_Dimensions;
uniform float u_Time;

in vec2 fs_Pos;
out vec4 out_Col;

void main() {
  // out_Col = vec4(0.5 * (fs_Pos + vec2(1.0)), 0.0, 1.0);
  // vec2 newPos = 0.5 * (fs_Pos + vec2(1.0));
  out_Col = mix( vec4(.7, .8, .6, 1), vec4(1.2, 1, .1, 1), fs_Pos.y);
}
