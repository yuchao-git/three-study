/**
 * 设置影子要选告诉渲染器,需要渲染影子
 * */
$(function () {
    var stats = initStats();
 
    var scene = new THREE.Scene(); //创建一个场景

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.3, 1000); //创建一个相机

    var renderer = new THREE.WebGLRenderer(); //创建一个渲染器

    renderer.setClearColor(0xEEEEEE, 1.0); //设置渲染器的颜色为白色底
    renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染器的大小

    //创建光源,这个时候要看创建的东西的材质是不是可以接受光源
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true; //设置光源产生影子
    scene.add(spotLight);

    
    renderer.shadowMapEnabled = true; //设置渲染器会渲染影子
    var axis = new THREE.AxisHelper(20); //创建一个坐标轴

    scene.add(axis);

    //创建一个平面
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true; //设置接收影子
    //平面设置位置
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    //创建一个方块
    var cubeGeometry = new THREE.CubeGeometry(4, 4, 4); //参数是方框的长宽高
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        wireframe: false
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true; //设置方块有影子
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    scene.add(cube);

    //创建一个圆
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff,
        wireframe: true
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; //设置圆有影子


    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    scene.add(sphere);

    

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    $('#demo').append(renderer.domElement);
    //document.getElementById("demo").appendChild(renderer.domElement);
    var step = 0;

    var control = new Controls();
    var gui = new dat.GUI(); //这是一个图形改变的库
    gui.add(control, 'rotationSpeed', 0, 0.5);
    gui.add(control, 'bouncingSpeed', 0, 0.5);
    gui.add(control, 'rotate', 0, 2);
    //用来制作动画的函数,内部使用递归
    function interval() {
        stats.update();

        plane.rotation.x = -(control.rotate) * Math.PI;

        //设置方块的动画
        cube.rotation.x += control.rotationSpeed;
        cube.rotation.y += control.rotationSpeed;
        cube.rotation.z += control.rotationSpeed;
        //设置圆的动画
        step += control.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
        requestAnimationFrame(interval);
        renderer.render(scene, camera);
    }
    //创建一个查看帧的对象,也可以查看渲染时间
    function initStats() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '16rem';
        stats.domElement.style.top = '0px';
        $('#stats').append(stats.domElement);
        return stats;
    }


    //构造函数用来构造一个初始化的图形改变的速度;
    function Controls() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.rotate = 0.25;
    }

    
    interval();

})