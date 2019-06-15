attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexture;


uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 uNormal;
uniform vec4 uColor;
uniform vec3 uLightPosition;
uniform vec4 uLightColor;
uniform bool uEnableLight;

varying highp vec2 vTexture;
varying highp vec4 vLighting;
varying highp vec4 vColor;

void main() {
    // Vertexs
    gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
    vTexture = aTexture;

    // Lighting
    if(uEnableLight) {
        vec3 v_normal = (uNormal * vec4(aNormal, 1.0)).xyz;
        vec3 surfaceWorldPosition = (uModel * vec4(aPosition, 1.0)).xyz;
        vec3 surfaceToLight = uLightPosition - surfaceWorldPosition;
        float light = clamp(dot(normalize(v_normal), normalize(surfaceToLight)), 0.0, 1.0);
        vLighting = vec4(light, light, light, 1.0);
        vLighting *= uLightColor;
    }
    else {
        vLighting = vec4(1.0, 1.0, 1.0, 1.0);
    }
    // color
    vColor = uColor;
}
