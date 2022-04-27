import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import circle from '../assets/images/circle.png'

interface DataSet {
  x: number
  y: number
  z: number
  label: string
}

interface GalaxyMapOptions {
  point: Point3D
  grid?: Grid
}

interface Grid {
  color: string | number
  centerColor: string | number
}

interface Point3D {
  color: string | number
  hoverColor: string | number
  size: number
}

class GalaxyMap {
  private options: GalaxyMapOptions
  private domElement: HTMLElement
  private scene: THREE.Scene
  private cameraObj: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private set: any[]
  private orbitControls: OrbitControls
  private width: number
  private height: number
  private raycaster: THREE.Raycaster
  private mouse: THREE.Vector2
  private gridHelper: THREE.GridHelper
  private material: THREE.PointsMaterial
  //private material: THREE.ShaderMaterial
  private geometry: THREE.BufferGeometry
  private particles: THREE.Points
  private INTERSECTED: any

  private vertexShader = `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 300.0 / -mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  private fragmentShader = `
    uniform vec3 color;
    uniform sampler2D pointTexture;
    uniform float alphaTest;

    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4( color * vColor, 1.0 );
      gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
      if ( gl_FragColor.a < alphaTest ) discard;
    }
`

  constructor(_domElement: HTMLElement, _options: GalaxyMapOptions) {
    this.width = _domElement.getBoundingClientRect().width
    this.height = _domElement.getBoundingClientRect().height
    this.options = _options
    this.domElement = _domElement
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    this.cameraObj = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
    this.scene = new THREE.Scene()
    this.orbitControls = new OrbitControls(this.cameraObj, this.renderer.domElement)
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2(0, 0)
    window.addEventListener('resize', this.onResize.bind(this), false)
    this.domElement.addEventListener('pointermove', this.onMouseMove.bind(this), false)
  }

  private onResize(): void {
    this.width = this.domElement.getBoundingClientRect().width
    this.height = this.domElement.getBoundingClientRect().height
    this.cameraObj.aspect = this.width / this.height
    this.cameraObj.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
    this.render()
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.cameraObj)
    this.orbitControls.update()
  }

  private onMouseMove(event: MouseEvent): void {
    event.preventDefault()
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    const geometry = this.particles.geometry
    const attributes = geometry.attributes

    this.raycaster.setFromCamera(this.mouse, this.cameraObj)

    const intersects = this.raycaster.intersectObject(this.particles)
    const color = new THREE.Color(this.options.point.color)
    const hoverColor = new THREE.Color(this.options.point.hoverColor)
    if (intersects.length > 0) {
      if (this.INTERSECTED !== intersects[0].index && intersects[0].object.type === 'Points') {
        attributes.color.setXYZ(this.INTERSECTED, color.r, color.g, color.b)
        this.INTERSECTED = intersects[0].index
        attributes.color.setXYZ(this.INTERSECTED, hoverColor.r, hoverColor.g, hoverColor.b)
        attributes.color.needsUpdate = true
      }
    } else if (this.INTERSECTED !== null) {
      attributes.color.setXYZ(this.INTERSECTED, color.r, color.g, color.b)
      attributes.color.needsUpdate = true
      this.INTERSECTED = null
    }
  }

  public lateralGrid(): void {
    this.gridHelper = new THREE.GridHelper(
      500,
      250,
      new THREE.Color(this.options.grid?.centerColor),
      new THREE.Color(this.options.grid?.color)
    )
    this.scene.add(this.gridHelper)
  }

  public setBackground(color: string | number): void {
    this.scene.background = new THREE.Color(color)
  }

  public dataset(data: DataSet[]): void {
    const sizes: number[] = []
    const set: number[] = []
    const colors: number[] = []
    const color = new THREE.Color()
    data.forEach((item: DataSet) => {
      set.push(item.x, item.y, item.z)
      color.set(this.options.point.color)
      colors.push(color.r, color.g, color.b)
      sizes.push(this.options.point.size)
    })
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(set, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    /*this.material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color('#ff00ff') },
        pointTexture: { value: new THREE.TextureLoader().load(circle) },
        alphaTest: { value: 0.5 },
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
    })*/
    this.material = new THREE.PointsMaterial({
      map: new THREE.TextureLoader().load(circle),
      alphaTest: 0.5,
      vertexColors: true,
    })
    this.particles = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.particles)
  }

  public render(): void {
    this.cameraObj.position.set(Math.sin(0) * 70, 70, Math.cos(0) * 70)
    this.cameraObj.lookAt(0, 0, 0)
    this.renderer.setSize(this.width, this.height)
    this.domElement.appendChild(this.renderer.domElement)
    if (this.domElement.childElementCount > 1) {
      this.domElement.removeChild(this.domElement.childNodes[0])
    }
    this.animate()
  }
}

export type { DataSet, GalaxyMapOptions, Point3D }

export default GalaxyMap
