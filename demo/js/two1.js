$(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('#eeeeee');
    renderer.setSize($('#demo').width(), $('#demo').height());



    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1); //平面
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    scene.add(plane);
    
    let spotLight = new THREE.SpotLight();
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

    let ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight)

    $('#add').on('click', () => {
        let width = Math.ceil(Math.random() * 3);

        let cubePx = -15 + Math.round((Math.random() * planeGeometry.parameters.width));
        let cubePy = Math.round((Math.random() * 5));
        let cubePz = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

        var cubeGeometry = new THREE.CubeGeometry(width, width, width);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            wireframe: false
        });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        // 设置正方形的影子
        cube.castShadow = true;
        cube.position.set(cubePx, cubePy, cubePz);
        scene.add(cube);
    })

    $('#remove').on('click', function () {
        let removeObj = scene.children[scene.children.length - 1];
        if (removeObj instanceof THREE.Mesh) {
            scene.remove(removeObj);
        }

    })

    function interval() {
        requestAnimationFrame(interval);
        renderer.render(scene, camera);
    }
    interval();
    $('#demo').append(renderer.domElement);
})