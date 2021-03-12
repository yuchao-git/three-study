

$(()=>{
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee)
    renderer.setSize($('#demo').width(),$('#demo').height());
    renderer.shadowMapEnabled = true;
    $('#demo').append(renderer.domElement);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45,$('#demo').width()/$('#demo').height(),0.3,1000);//远程相机
    camera.position.set(-20,25,20);
    camera.lookAt(new THREE.Vector3(5, 0, 0));

    var ambientLight = new THREE.AmbientLight(0x090909);
    scene.add(ambientLight);
    
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    let planeGeometry = new THREE.PlaneGeometry(60,40,0,0); 
    let planeMaterial = new THREE.MeshLambertMaterial(0xffffff);
    let plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);

    let vertices = [
        new THREE.Vector3(1,3,1),
        new THREE.Vector3(1,3,-1),
        new THREE.Vector3(1,-1,1),
        new THREE.Vector3(1,-1,-1),
        new THREE.Vector3(-1,3,-1),
        new THREE.Vector3(-1,3,1),
        new THREE.Vector3(-1,-1,-1),
        new THREE.Vector3(-1,-1,1)  
    ]

    let faces = [
        new THREE.Face3(0,2,1),
        new THREE.Face3(2,3,1),
        new THREE.Face3(4,6,5),
        new THREE.Face3(6,7,5),
        new THREE.Face3(4,5,1),
        new THREE.Face3(5,0,1),
        new THREE.Face3(7,6,2),
        new THREE.Face3(6,3,2),
        new THREE.Face3(5,7,0),
        new THREE.Face3(7,2,0),
        new THREE.Face3(1,3,4),
        new THREE.Face3(3,6,4)
    ]
   
    let geom = new THREE.Geometry()
    geom.vertices = vertices;
    geom.faces = faces;
    
    geom.computeFaceNormals();

    var materials = [
        new THREE.MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true}),
        new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
    ];
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
    mesh.children.forEach(function (e) {
        e.castShadow = true
    });
    scene.add(mesh);
    
    // 构造函数用来改变初始化图形
    function Controls(){
        //默认顶点的位置
        let defaultVertices = [
            {x:1,y:3,z:1},
            {x:1,y:3,z:-1},
            {x:1,y:-1,z:1},
            {x:1,y:-1,z:-1},
            {x:-1,y:3,z:-1},
            {x:-1,y:3,z:1},
            {x:-1,y:-1,z:-1},
            {x:-1,y:-1,z:1}            
        ]
        let gui = new dat.GUI();
        for(let i=0;i<defaultVertices.length;i++){
            let vertice = gui.addFolder('顶点'+(i+1));
            vertice.add(defaultVertices[i],'x',-10,10);
            vertice.add(defaultVertices[i],'y',-10,10);
            vertice.add(defaultVertices[i],'z',-10,10);  
        }
        return defaultVertices
    }

    let activeVertices = Controls();

    function render(){
        let vertices = [];
        activeVertices.forEach(item => {
            vertices.push(new THREE.Vector3(item.x,item.y,item.z));
        })
        geom.vertices = vertices;
        geom.verticesNeedUpdate = true;//设置顶点可更新
        geom.computeFaceNormals();
        
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    
    render()
    
})