uniform vec3 uDepthColor; //= vec3(0.3,0.3,0.0);//vec3(255.0,64.0,0.0);
uniform vec3 uSurfaceColor;// = vec3(0.3,0.3,0.0);//vec3(21.0, 28.0, 55.0);
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include ./pointLight.glsl

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    //Base color
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength = smoothstep(0.0, 1.0, mixStrength);
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    vec3 light = vec3(0.0);
    light += pointLight(
    vec3(1.0),
    20.0,
    normal,
    vec3(0.0,1.25,0.0),
    viewDirection,
    30.0,
    vPosition,
    0.99
    );

    color *= light;
    
    // Final Color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}