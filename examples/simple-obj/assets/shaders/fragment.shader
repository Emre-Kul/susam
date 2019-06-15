precision mediump float;

varying highp vec2 vTexture;
varying highp vec4 vLighting;
varying highp vec4 vColor;

uniform sampler2D uSampler;
uniform bool uEnableTexture;

void main() {
    if(uEnableTexture){
        gl_FragColor = texture2D(uSampler, vTexture);
    } else{
        gl_FragColor = vColor;
    }
    gl_FragColor *= vLighting;

}
