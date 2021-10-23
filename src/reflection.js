import Env from './env'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Reflector from './objects/Reflector'
import ReflectorMaterial from './objects/ReflectorMaterial'


export default class Reflection {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene
    this.camera = this.env.camera
    this.pane = this.env.pane
    this._loadModel()
    this._setMirror()
    this._setLights()
  }

  _setLights() {
    this.scene.add(new THREE.HemisphereLight(0x606060, 0x404040))
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1)
    this.scene.add(light)
  }

  _setMirror() {
    const reflector = new Reflector()

    const floorMap = new THREE.TextureLoader().load('textures/floor.jpg')
    floorMap.wrapS = THREE.RepeatWrapping
    floorMap.wrapT = THREE.RepeatWrapping
    floorMap.repeat.set(20, 20)

    const floorMat = new ReflectorMaterial({
      map: floorMap,
      dithering: true
    })

    floorMat.uniforms.tReflect = reflector.renderTargetUniform
    floorMat.uniforms.uMatrix = reflector.textureMatrixUniform


    const floorGeo = new THREE.PlaneGeometry(50, 50)

    const floor = new THREE.Mesh(floorGeo, floorMat)

    floor.onBeforeRender = (renderer, scene, camera) => {
      this.visible = false
      reflector.update(renderer, scene, camera)
      this.visible = true
    }

    floor.add(reflector)

    floor.position.y = -1.5
    floor.rotation.x = -Math.PI / 2

  
    this.scene.add(floor)
  }

  _loadModel() {
    const paintTexture = new THREE.TextureLoader().load('textures/paint.jpg')
    paintTexture.encoding = THREE.sRGBEncoding
    paintTexture.wrapS = THREE.RepeatWrapping
    paintTexture.wrapT = THREE.RepeatWrapping
    paintTexture.repeat.set(1.8, 2)
    paintTexture.flipY = true
    const loader = new GLTFLoader()
    loader.load('models/reflection.glb', gltf => {
      gltf.scene.traverse(child => {
    
        if(child instanceof THREE.Mesh) {
          if(child.name == 'Cube001_1') {
            const material = new THREE.MeshStandardMaterial({
              map: paintTexture
            })
            this.paint = child
            this.paint.material = material
          } else {
            const material = new THREE.MeshStandardMaterial({
              emissive: 0xffffff
            })
            child.material = material
          }
        }
      })
      this.scene.add(gltf.scene)
    })
  }

  update() {

  }

}