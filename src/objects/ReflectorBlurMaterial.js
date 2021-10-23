import * as THREE from 'three'

import vertexShader from '../shaders/reflectorBlurMaterial/vertex.glsl'
import fragmentShader from '../shaders/reflectorBlurMaterial/fragment.glsl'

export default class ReflectorBlurMaterial extends THREE.RawShaderMaterial {
  constructor() {
    super({
      uniforms: {
        tMap: new THREE.Uniform(null),
        uBluriness: new THREE.Uniform(1),
        uDirection: new THREE.Uniform(new THREE.Vector2(1, 0)),
        uResolution: new THREE.Uniform(new THREE.Vector2())
      },
      vertexShader,
      fragmentShader,
      blending: THREE.NoBlending,
      depthWrite: false,
      depthTest: false
    });
  }
}