
$(() => {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45,$('#demo').width()/$('#demo').height(),0.3,1000);
    camera.position.set(-25,30,25);
    camera.lookAt(new THREE.Vector3(10, 0, 0))
    scene.add(camera);

    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize($('#demo').width(),$('#demo').height());

    $('#demo').append(renderer.domElement);
    
    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-20,30,30);
    scene.add(pointLight);

    let planeGeometry = new THREE.PlaneGeometry(60,40,20,20);
    let planeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    let plane = new THREE.Mesh(planeGeometry,planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5*Math.PI;

    let cubeGeometry = new THREE.BoxGeometry(4,4,4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color:'red'});
    let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.set(-4,3,0);
    scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4,20,20);
    let sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    scene.add(sphere);

    let sphereSpointGeometry = new THREE.SphereGeometry(0.2);
    let sphereSpointMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    let sphereSpoint = new THREE.Mesh(sphereSpointGeometry,sphereSpointMaterial);
    scene.add(sphereSpoint);

    function Control(){
        this.step = 0.02;
        this.rotation = 0.03;
        this.position = 0.01;
        this.pointColor = 0xffffff;
        this.intensity = 1;
        this.distance = 100;
    }

    let control = new Control();
    let gui = new dat.GUI();
    gui.add(control,'step',0,0.1);
    gui.add(control,'rotation',0,0.1);
    gui.add(control,'position',0,0.1);
    gui.addColor(control,'pointColor');
    gui.add(control,'intensity',0,10);
    gui.add(control,'distance',0,500)
 
    let step = 0;
    let phase = 0;
    let invert = 1;
    function render(){

        cube.rotation.x += control.rotation;
        cube.rotation.y += control.rotation;
        cube.rotation.z += control.rotation;

        step += control.step;
        sphere.position.x = 20 + ( 10 * (Math.cos(step)));
        sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));


        if (phase > 2 * Math.PI) {
            invert = invert * -1;
            phase -= 2 * Math.PI;
        } else {
            phase += control.position;
        }

        pointLight.position.set(14 * (Math.cos(phase)),5,7 * (Math.sin(phase)));

        if (invert < 0) {
            var pivot = 14;
            pointLight.position.x = (invert * (pointLight.position.x - pivot)) + pivot;
        }
        
        pointLight.intensity = control.intensity;
        pointLight.distance = control.distance;   
        pointLight.color.set(control.pointColor);

        sphereSpoint.position.copy(pointLight.position);

        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    render()
    
})