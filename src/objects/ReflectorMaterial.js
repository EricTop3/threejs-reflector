import * as THREE from 'three'

import vertexShader from '../shaders/reflectorMaterial/vertex.glsl'
import fragmentShader from '../shaders/reflectorMaterial/fragment.glsl'

export default class ReflectorMaterial extends THREE.RawShaderMaterial {
  constructor({
    color = new THREE.Color(0x7F7F7F),
    map = null,
    fog = null,
    dithering = false
  } = {}) {
    const params = {
      defines: {},
      uniforms: {
        tMap: new THREE.Uniform(null),
        tReflect: new THREE.Uniform(null),
        uMapTransform: new THREE.Uniform(new THREE.Matrix3()),
        uMatrix: new THREE.Uniform(new THREE.Matrix4()),
        uColor: new THREE.Uniform(color instanceof THREE.Color ? color : new THREE.Color(color))
      },
      vertexShader,
      fragmentShader
    }
    if(map) {
      map.updateMatrix()
      params.uniforms = Object.assign(params.uniforms, {
        tMap: new THREE.Uniform(map),
        uMapTransform: new THREE.Uniform(map.matrix)
      })
    }
    if (dithering) {
      params.defines = Object.assign(params.defines, {
        DITHERING: ''
      })
    }
    super(params)
  }

}