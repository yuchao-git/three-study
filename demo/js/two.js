$(function () {
    //1.创建一个场景
    //2.创建一个相机(给相机设置位置)
    //3.创建一个渲染器(包括大小和背景色)
    //4.创建一个平面(包括大小和材质还有位置)
    //5.创建一个环境光
    //6.创建一个光源
    //7.设置影子要选告诉渲染器,需要渲染影子
    var scene = new THREE.Scene(); //场景

    // scene.fog = new THREE.FogExp2(0xffffff,0.015,100);//雾化
    // scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});//所有的东西都用同一种材质

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); //相机
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer(); //渲染器
    renderer.shadowMapEnabled = true;
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axis = new THREE.AxisHelper(40, 40, 40); //坐标轴
    scene.add(axis);

    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1); //平面
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true; //接收影子
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    scene.add(plane);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c); //环境光
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff); //光源
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true; //产生影子
    scene.add(spotLight);
    $('#demo').append(renderer.domElement);

    //正方体的构造函数
    function Cube(size, positions) {
        this.size = size;
        this.positionX = positions.positionX;
        this.positionY = positions.positionY;
        this.positionZ = positions.positionZ;
        this.CreateCube();
    }

    Cube.prototype.CreateCube = function () {
        var cubeGeomeotry = new THREE.CubeGeometry(this.size, this.size, this.size);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            color: Math.random() * 0xff0000
        });
        var cube = new THREE.Mesh(cubeGeomeotry, cubeMaterial);
        cube.castShadow = true;
        cube.position.x = this.positionX;
        cube.position.y = this.positionY;
        cube.position.z = this.positionZ;
        scene.add(cube);
    }

    Cube.remove = function () {
        var removeObj = scene.children[scene.children.length - 1];
        if (removeObj instanceof THREE.Mesh) {
            //必须做判断,否则连平面和光源都会删除
            scene.remove(removeObj);
        }
    }


    var cubeGeomeotry = new THREE.CubeGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xff0000,
        wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeomeotry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    scene.add(cube);

    function interval() {

        scene.traverse(function (e) {
            if (e instanceof THREE.Mesh && e != plane && e != cube) {
                e.rotation.x += constrol.rotateSpeed;
                e.rotation.y += constrol.rotateSpeed;
                e.rotation.z += constrol.rotateSpeed;
            }
        })

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        cube.position.x = constrol.positionx;
        cube.position.y = constrol.positiony;
        cube.position.z = constrol.positionz;

        requestAnimationFrame(interval);
        renderer.render(scene, camera);
    }


    function constrols() {
        this.positionx = 0;
        this.positiony = 0;
        this.positionz = 0;
        this.rotateSpeed = 0.02;
    }
    var constrol = new constrols();
    var gui = new dat.GUI(); //这是一个图形改变的库
    gui.add(constrol, 'positionx', -100, 100);
    gui.add(constrol, 'positiony', -100, 100);
    gui.add(constrol, 'positionz', -100, 100);
    gui.add(constrol, 'rotateSpeed', -0.5, 0.5);
    interval();

    $('#add').on('click', function () {
        var size = Math.ceil(Math.random() * 3);
        var positionx = -15 + Math.round((Math.random() * planeGeometry.parameters.width));
        var positiony = Math.round((Math.random() * 5));
        var positionz = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
        var positions = {
            positionX: positionx,
            positionY: positiony,
            positionZ: positionz
        }
        new Cube(size, positions);
        console.log(scene.children);
    })
    $('#remove').on('click', function () {
        Cube.remove();
    })

})