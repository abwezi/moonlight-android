#version 310 es
precision highp float;

in vec2 v_texCoord;

uniform sampler2D sTexture;
uniform vec2 uResolution;

layout(location = 0) out vec4 fragColor;

// Simplified BB_Texture
vec4 BB_Texture(vec2 tc)
{
    vec4 color = texture(sTexture, tc);
    float alpha = max(color.r, max(color.g, color.b));
    return vec4(color.rgb, alpha);
}

void main()
{
    vec2 texcoord = v_texCoord;

    // --- Side-by-Side input ---
    vec2 tcL = vec2(texcoord.x * 0.5, texcoord.y);
    vec2 tcR = vec2(texcoord.x * 0.5 + 0.5, texcoord.y);

    vec4 cL = BB_Texture(tcL);
    vec4 cR = BB_Texture(tcR);

    // --- Column interlaced output (EYE SWAPPED) ---
    vec2 grid = floor(texcoord * uResolution);

    vec4 outColor = (mod(grid.x, 2.0) > 0.5) ? cL : cR;

    fragColor = vec4(outColor.rgb, 1.0);
}