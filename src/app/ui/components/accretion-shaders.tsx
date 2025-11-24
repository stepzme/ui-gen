"use client";

import React, { forwardRef } from "react";
import { Shader } from "react-shaders";
import { cn } from "@/lib/utils";

export interface AccretionShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  turbulence?: number;
  depth?: number;
  brightness?: number;
  colorShift?: number;
  hue?: number; // Оттенок (0-1, где 0 = красный, 0.33 = зеленый, 0.66 = синий)
  saturation?: number; // Насыщенность (0-1, где 0 = серый, 1 = полная насыщенность)
  quality?: number; // Качество рендеринга (1.0 = высокое, 0.5 = среднее, 0.25 = низкое для производительности)
  sharpness?: number; // Резкость (0-2, где 1.0 = нормальная, больше = резче)
}

const fragmentShader = `
// Tanh approximation for tone mapping
vec4 tanhApprox(vec4 x) {
    vec4 x2 = x * x;
    return x * (3.0 + x2) / (3.0 + 3.0 * x2);
}

// HSV to RGB conversion
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void mainImage(out vec4 O, vec2 I)
{
    float z = 0.0, d, i = 0.0;
    O = vec4(0.0);
    
    // Use fixed loop count (GLSL requires constant loop bounds)
    // Quality affects step size and which iterations we process
    const float maxSteps = 20.0;
    const float turbSteps = 7.0;
    
    // Calculate step multiplier based on quality (lower quality = skip more steps)
    float stepMultiplier = mix(1.5, 1.0, u_quality);
    
    for(float step = 0.0; step < maxSteps; step++) {
        // Skip steps based on quality for performance
        if (u_quality < 0.5 && mod(step, 2.0) > 0.0) {
            continue;
        }
        
        i = step;
        // Sample point from ray direction
        vec3 p = z * normalize(vec3(I + I, 0) - iResolution.xyx) + 0.1 * u_depth;
        // Polar coordinates and transformations
        p = vec3(atan(p.y / 0.2, p.x) * 2.0, p.z / 3.0, length(p.xy) - 5.0 - z * 0.2);
        
        // Optimized turbulence - skip iterations based on quality
        vec3 turbOffset = vec3(0.0);
        for(float turb = 0.0; turb < turbSteps; turb++) {
            // Skip turbulence iterations for lower quality
            if (u_quality < 0.7 && turb > 4.0) {
                break;
            }
            float turbFreq = turb + 1.0;
            turbOffset += sin(p.yzx * turbFreq + iTime * u_speed + 0.3 * i * u_turbulence) / turbFreq;
        }
        p += turbOffset;
        
        // Distance to cylinder and waves with refraction
        d = length(vec4(0.4 * cos(p) - 0.4, p.z));
        
        // Early exit optimization - если расстояние очень большое, пропускаем
        if (d > 10.0) {
            z += d;
            continue;
        }
        
        z += d;
        // Coloring and brightness
        vec4 color = (1.0 + cos(p.x + i * 0.4 + z + vec4(6, 1, 2, 0) * u_colorShift)) / d;
        O += color * u_brightness;
    }
    // Tanh tonemap
    O = tanhApprox(O * O / 400.0);
    
    // Apply sharpness/contrast enhancement
    float contrast = mix(1.0, 1.2 + u_sharpness * 0.3, u_sharpness);
    O.rgb = (O.rgb - 0.5) * contrast + 0.5;
    O.rgb = clamp(O.rgb, 0.0, 1.0);
    
    // Apply color adjustments
    // Convert RGB to HSV
    float maxRGB = max(max(O.r, O.g), O.b);
    float minRGB = min(min(O.r, O.g), O.b);
    float delta = maxRGB - minRGB;
    
    float h = 0.0;
    if (delta != 0.0) {
        if (maxRGB == O.r) {
            h = mod((O.g - O.b) / delta + (O.g < O.b ? 6.0 : 0.0), 6.0) / 6.0;
        } else if (maxRGB == O.g) {
            h = ((O.b - O.r) / delta + 2.0) / 6.0;
        } else {
            h = ((O.r - O.g) / delta + 4.0) / 6.0;
        }
    }
    
    float s = maxRGB == 0.0 ? 0.0 : delta / maxRGB;
    float v = maxRGB;
    
    // Apply hue shift
    h = mod(h + u_hue, 1.0);
    
    // Filter warm colors - convert to cool colors
    // Warm colors: red (0.0-0.17), yellow (0.17), green (0.33)
    // Cool colors: cyan (0.5), blue (0.66), purple (0.83)
    if (h < 0.5) {
        // Map warm colors (0.0-0.5) to cool colors (0.5-0.83)
        // Red/Yellow/Green -> Cyan/Blue/Purple
        h = mix(0.5, 0.83, h * 2.0);
    }
    
    // Apply saturation
    s = mix(0.0, s, u_saturation);
    
    // Enhance dark areas (keep black)
    // If brightness is very low, reduce saturation to keep it black
    if (v < 0.1) {
        s = mix(s, 0.0, 1.0 - v * 10.0);
    }
    
    // Convert back to RGB
    vec3 hsv = vec3(h, s, v);
    O.rgb = hsv2rgb(hsv);
}
`;

export const AccretionShaders = forwardRef<HTMLDivElement, AccretionShadersProps>(
  (
    {
      className,
      speed = 1.0,
      turbulence = 1.0,
      depth = 1.0,
      brightness = 1.0,
      colorShift = 1.0,
      hue = 0.0,
      saturation = 1.0,
      quality = 1.0,
      sharpness = 1.2,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-full", className)}
        {...props}
      >
        <Shader
          fs={fragmentShader}
          uniforms={{
            u_speed: { type: "1f", value: speed },
            u_turbulence: { type: "1f", value: turbulence },
            u_depth: { type: "1f", value: depth },
            u_brightness: { type: "1f", value: brightness },
            u_colorShift: { type: "1f", value: colorShift },
            u_hue: { type: "1f", value: hue },
            u_saturation: { type: "1f", value: saturation },
            u_quality: { type: "1f", value: quality },
            u_sharpness: { type: "1f", value: sharpness },
          }}
        />
      </div>
    );
  }
);

AccretionShaders.displayName = "AccretionShaders";
