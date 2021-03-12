
$(()=>{
    let scene = new THREE.Scene();

    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE); 
    renderer.setSize($('#demo').width(), $('#demo').height());   

    let camera = new THREE.PerspectiveCamera(45,$('#demo').width()/$('#demo').height(),0.3,1000);
    camera.position.set(-25,30,25);
    camera.lookAt(new THREE.Vector3(10, 0, 0))
    scene.add(camera);

    $('#demo').append(renderer.domElement);

    let ambientLight = new THREE.AmbientLight("#0c0c0c");
    scene.add(ambientLight)

    var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-20,30,30);
        scene.add(spotLight);
    
    let planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    let planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
    let plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x = -0.5*Math.PI;
    scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(5,5,5);
    let cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
    let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.set(-4,3,0)
    scene.add(cube);


    let sphereGeometry = new THREE.SphereGeometry(4,20,20);
    let sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    scene.add(sphere);

    function Control(){
        this.cuberotation = 0.05;
        this.step = 0.04;
        this.ambientColor = '#0c0c0c';
    }
    let control = new Control();
    
    let gui = new dat.GUI();
    gui.add(control,'step',0,0.3);
    gui.add(control,'cuberotation',0,0.5);
    gui.addColor(control,'ambientColor');

    let step = 0;

    function render(){

        ambientLight.color.set(control.ambientColor);
        
        cube.rotation.x += control.cuberotation
        cube.rotation.y += control.cuberotation
        cube.rotation.z += control.cuberotation

        step += control.step;
        sphere.position.x = 20 + ( 10 * (Math.cos(step)));
        sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    render()
    
})

