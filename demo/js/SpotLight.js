$(()=>{

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45,$('#demo').width()/$('#demo').height(),0.3,1000);
    camera.position.set(-25,30,25);
    camera.lookAt(new THREE.Vector3(10,0,0));
    scene.add(camera);

    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize($('#demo').width(),$('#demo').height());
    $('#demo').append(renderer.domElement);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0,10,10);
    scene.add(spotLight);

    let ambientLight = new THREE.AmbientLight('#1c1c1c');
    scene.add(ambientLight);

    let planeGeometry = new THREE.PlaneGeometry(60,40,20,20);
    let PlaneMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    let plane = new THREE.Mesh(planeGeometry,PlaneMaterial);
    plane.rotation.x = -0.5*Math.PI;
    scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4,4,4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color:'red'});
    let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.set(-4,3,0);
    scene.add(cube); 


    renderer.render(scene,camera);
})
