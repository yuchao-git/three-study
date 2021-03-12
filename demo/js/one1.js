$(() => {

    // 创建一个场景
    let scene = new THREE.Scene();

    //创建一个相机
    let camera = new THREE.PerspectiveCamera(45, $('#demo').width() / $('#demo').height(), 0.3, 2000);

    //设置相机的位置
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    //创建渲染器
    let renderer = new THREE.WebGLRenderer();

    //设置渲染器会渲染影子
    renderer.shadowMapEnabled = true; 
    // 设置渲染器的背景颜色和大小
    renderer.setClearColor('#eeeeee');
    renderer.setSize($('#demo').width(), $('#demo').height());

    //设置光源
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    // 设置光源产生影子
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log(spotLight)

    //创建一个坐标轴
    var axis = new THREE.AxisHelper(20);

    scene.add(axis);

    //创建一个相机辅助
    let cameraHelp = new THREE.CameraHelper(camera);
    scene.add(cameraHelp)

    // 创建一个平面
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //设置平面接收影子
    plane.receiveShadow = true;
    plane.position.set(15, 0, 0);
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    //创建一个方块
    var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        wireframe: false
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 设置正方形的影子
    cube.castShadow = true;
    cube.position.set(-4, 2, 2);
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff,
        wireframe: false
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.set(10, 2, 2);
    scene.add(sphere)

   
   

    //动画控制器
    let control = {
        cubeRotation:0.03,
        sphereStep:0.02
    }
   
    let gui = new dat.GUI()
    gui.add(control,'cubeRotation',-2,2);
    gui.add(control,'sphereStep',-0.5,0.5);   
    
     //动画
     let step = 0;
     function interval() {
        cube.rotation.x += control.cubeRotation;
        cube.rotation.y += control.cubeRotation;
        cube.rotation.z += control.cubeRotation;
        step += control.sphereStep;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        requestAnimationFrame(interval);
        // 将场景和相机加入渲染器
        renderer.render(scene, camera);
    }
    
    interval();
    // 将渲染器加到页面
    $('#demo').append(renderer.domElement);
})


