$(()=>{

    // 创建场景
    let scene = new THREE.Scene();
    // 创建相机
    let camera = new THREE.PerspectiveCamera( 90,$('#demo').width()/$('#demo').height(),0.3,1000);
    camera.position.set(-40,25,30);
    camera.lookAt(new THREE.Vector3(5, 0, -10));

    //创建渲染器
    let renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
    renderer.setClearColor(0xeeeeee);
    renderer.setSize($('#demo').width(),$('#demo').height());
    $('#demo').append(renderer.domElement);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20,60,10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    let ambientLight = new THREE.AmbientLight(0x090909);
    scene.add(ambientLight);

    let planeGeometry = new THREE.PlaneGeometry(60,40,0,0);
    let planeMaterial = new THREE.MeshLambertMaterial(0xffffff);
    let plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.set(-0.5 * Math.PI,0,0);
    scene.add(plane);

    let cubeGeometry = new THREE.CubeGeometry(10,10,10);
    let cubeMaterial = new THREE.MeshLambertMaterial({
        color:0xefaec,
        wireframe:false
    });
    
    let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.set(0,5,0);
    cube.castShadow = true;
    scene.add(cube);

    function Constrol(){
        this.rotation = {
            x:0,
            y:0,
            z:0
        }
        this.position = {
            x:0,
            y:5,
            z:0
        }
        this.scale = {
            x:1,
            y:1,
            z:1
        }
        this.translate = {
            x:1,
            y:1,
            z:1
        }
        this.translateClick = function(){
            cube.translateX(this.translate.x);
            cube.translateY(this.translate.y);
            cube.translateZ(this.translate.z);

            this.position = {
                ...cube.position
            };
        }
        this.visible = true;
    }

    let constrol = new Constrol();
    let gui = new dat.GUI();
    let guiPosition = gui.addFolder('position');
    guiPosition.add(constrol.position,'x',-10,10);
    guiPosition.add(constrol.position,'y',-10,10);
    guiPosition.add(constrol.position,'z',-10,10);
 

    let guiscale = gui.addFolder('scale');
    guiscale.add(constrol.scale,'x',-10,10);
    guiscale.add(constrol.scale,'y',-10,10);
    guiscale.add(constrol.scale,'z',-10,10);

    let guiRotation = gui.addFolder('rotation');
    guiRotation.add(constrol.rotation,'x',-10,10);
    guiRotation.add(constrol.rotation,'y',-10,10);
    guiRotation.add(constrol.rotation,'z',-10,10);

    let guiTranslate = gui.addFolder('translate');
    guiTranslate.add(constrol.translate,'x',-10,10);
    guiTranslate.add(constrol.translate,'y',-10,10);
    guiTranslate.add(constrol.translate,'z',-10,10);
    guiTranslate.add(constrol,'translateClick');

    gui.add(constrol,'visible');

    function render(){  
        cube.position.set(constrol.position.x,constrol.position.y,constrol.position.z);
        cube.rotation.set(constrol.rotation.x,constrol.rotation.y,constrol.rotation.z);
        cube.scale.set(constrol.scale.x,constrol.scale.y,constrol.scale.z);
        

        cube.visible = constrol.visible;
        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    render();
})