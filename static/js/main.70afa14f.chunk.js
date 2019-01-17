(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(26)},21:function(e,t,n){},23:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(15),o=n.n(r),s=(n(21),n(4)),c=n(5),l=n(7),h=n(6),d=n(8),u=(n(23),n(10)),m=n(2),v=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.setSidebarCanvas(this.side_canvas)}},{key:"render",value:function(){var e=this,t=this.props,n=t.sidebar_orientation,i=t.sidebar_image_size,r=t.grem,o=t.p,s=t.hover_index,c=t.mnist_labels,l=t.color_array;return a.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",flexGrow:1}},a.a.createElement("div",{style:{display:"flex",flexDirection:"horizontal"===n?"row":"column"}},a.a.createElement("canvas",{ref:function(t){e.side_canvas=t},width:i,height:i}),a.a.createElement("div",{style:{flexGrow:1}},a.a.createElement("div",{style:{background:s?"rgb(".concat(l[c[s]].join(","),")"):"transparent",color:s?"#000":"#fff",padding:o(r/4,r/2),display:"flex",justifyContent:"space-between",transition:"all 0.1s linear"}},a.a.createElement("div",null,"Label:"),s?a.a.createElement("div",null,c[s]):null),a.a.createElement("div",{style:{padding:o(r/4,r/2),display:"flex",justifyContent:"space-between"}},"Index:",s?a.a.createElement("div",null,s):null))),a.a.createElement("div",{style:{padding:r/2}},a.a.createElement("div",null,"An interactive UMAP visualization of the MNIST data set."," ",a.a.createElement("a",{href:"#"},"About"))))}}]),t}(i.Component),f=n(11),p=n(12),b=n(1),g=n(9),w=n(3),y=Object(p.a)(Array(14)).map(function(e,t){return"".concat("/umap-explorer","/").concat("mnist_tile_solid_").concat(t,".png")}),x=y.map(function(e){var t=document.createElement("img");return t.src=e,t}),_=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).handleResize=function(e,t){n.camera.aspect=e/t,n.camera.updateProjectionMatrix(),n.renderer.setSize(e,t);var i=n.getScaleFromZ(n.camera.position.z),a=-n.camera.position.x*i+n.props.width/2,r=n.camera.position.y*i+n.props.height/2,o=w.f.translate(a,r).scale(i),s=w.d(n.mount);n.d3_zoom.transform(s,o)},n.state={},n.init=n.init.bind(Object(m.a)(Object(m.a)(n))),n.addPoints=n.addPoints.bind(Object(m.a)(Object(m.a)(n))),n.handleResize=n.handleResize.bind(Object(m.a)(Object(m.a)(n))),n.setUpCamera=n.setUpCamera.bind(Object(m.a)(Object(m.a)(n))),n.animate=n.animate.bind(Object(m.a)(Object(m.a)(n))),n.getScaleFromZ=n.getScaleFromZ.bind(Object(m.a)(Object(m.a)(n))),n.getZFromScale=n.getZFromScale.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"getZFromScale",value:function(e){var t=b.d.degToRad(this.camera.fov);return this.props.height/e/(2*Math.tan(t/2))}},{key:"getScaleFromZ",value:function(e){var t=b.d.degToRad(this.camera.fov),n=2*(Math.tan(t/2)*e);return this.props.height/n}},{key:"zoomHandler",value:function(){var e=w.a.transform,t=e.k,n=-(e.x-this.props.width/2)/t,i=(e.y-this.props.height/2)/t,a=this.getZFromScale(t);this.camera.position.set(n,i,a);for(var r=function(e){var t=w.c().domain([10,5]).range([14,28]).clamp(!0),n=w.c().domain([2,.1]).range([28,56]);return e>=5?t(e):e<=2?n(e):28}(a),o=this.scene.children[0].children,s=0;s<o.length;s++)o[s].material.uniforms.size.value=r}},{key:"setUpCamera",value:function(){var e,t=this.props,n=t.width,i=t.height,a=t.mnist_embeddings,r=this.camera.aspect,o=this.camera.fov,s=b.d.degToRad(o),c=a.map(function(e){return e[0]}),l=g.min(c),h=g.max(c),d=a.map(function(e){return e[1]}),u=g.min(d),m=g.max(d),v=(h-l)/(m-u),f=g.max([l,h].map(function(e){return Math.abs(e)})),p=g.max([u,m].map(function(e){return Math.abs(e)})),y=1.25*(e=v>r?f/Math.tan(s/2)/r:p/Math.tan(s/2));this.camera.far=y,this.camera.position.z=1.1*e,this.d3_zoom=w.e().scaleExtent([this.getScaleFromZ(y-1),this.getScaleFromZ(.1)]).on("zoom",this.zoomHandler.bind(this));var x=w.d(this.mount);this.view=x,x.call(this.d3_zoom);var _=this.getScaleFromZ(this.camera.position.z),j=w.f.translate(n/2,i/2).scale(_);this.d3_zoom.transform(x,j)}},{key:"addPoints",value:function(){for(var e=this.props,t=e.mnist_embeddings,n=e.mnist_labels,i=e.color_array,a=[],r=0;r<14;r++){var o=5329*r,s=5329*(r+1);13===r&&(s=74606),a.push([o,s])}var c=a.map(function(e){return t.slice(e[0],e[1])}),l=a.map(function(e){return n.slice(e[0],e[1])}),h=new b.k;this.textures=y.map(function(e){var t=h.load(e);return t.flipY=!1,t.magFilter=b.e,t});for(var d=new b.c,u=0;u<14;u++){for(var m=c[u],v=l[u],f=[],p=0;p<m.length;p++){var g=m[p],w=new b.m(g[0],g[1],0);f[p]=w}var x=new b.b,_=f.length,j=new Float32Array(3*_),O=new Float32Array(2*_),k=new Float32Array(3*_);x.addAttribute("position",new b.a(j,3)),x.addAttribute("offset",new b.a(O,2)),x.addAttribute("color",new b.a(k,3)),x.attributes.position.copyVector3sArray(f);for(var z=0,S=0,C=_;z<C;z++,S+=2){var E=z%73*28/2048,M=28*Math.floor(z/73)/2048;O[S]=E,O[S+1]=M}for(var F=0,P=0,A=_;F<A;F++,P+=3){var D=i[v[F]];k[P]=D[0]/255,k[P+1]=D[1]/255,k[P+2]=D[2]/255}var H={texture:{value:this.textures[u]},repeat:{value:new b.l(1/73,1/73)},size:{value:28}},I=new b.j({uniforms:H,vertexShader:"\n        attribute vec2 offset;\n        varying vec2 vOffset;\n        attribute vec3 color;\n        varying vec3 vColor;\n        uniform float size;\n        void main() {\n          vOffset = offset;\n          vColor = color;\n          gl_PointSize = size;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }",fragmentShader:"\n        uniform sampler2D texture;\n        uniform vec2 repeat;\n        varying vec2 vOffset;\n        varying vec3 vColor;\n        void main() {\n          vec2 uv = vec2( gl_PointCoord.x, gl_PointCoord.y );\n          vec4 tex = texture2D( texture, uv * repeat + vOffset );\n          if ( tex.r < 0.5 ) discard;\n          gl_FragColor = tex * vec4(vColor, 1.0);\n        }"}),Z=new b.g(x,I);Z.userData={sprite_index:u},d.add(Z)}this.scene.add(d)}},{key:"addBlankHighlightPoints",value:function(){var e=new b.c;this.scene.add(e);var t=[new b.m(0,0,0)],n=new b.b,i=t.length,a=new Float32Array(3*i),r=new Float32Array(2*i);n.addAttribute("position",new b.a(a,3)),n.addAttribute("offset",new b.a(r,2));var o={texture:{value:this.textures[0]},repeat:{value:new b.l(1/73,1/73)},size:{value:56}},s=new b.j({uniforms:o,vertexShader:"\n        attribute vec2 offset;\n        varying vec2 vOffset;\n        uniform float size;\n        void main() {\n          vOffset = offset;\n          gl_PointSize = size;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }",fragmentShader:"\n        uniform sampler2D texture;\n        uniform vec2 repeat;\n        varying vec2 vOffset;\n        void main() {\n          vec2 uv = vec2( gl_PointCoord.x, gl_PointCoord.y );\n          vec4 tex = texture2D( texture, uv * repeat + vOffset );\n          if ( tex.r < 0.5 ) discard;\n          gl_FragColor = tex;\n        }"}),c=new b.g(n,s);c.frustumCulled=!1,this.scene.children[1].visible=!1,this.scene.children[1].add(c)}},{key:"highlightPoint",value:function(e,t,n){var i=this.scene.children[1].children[0],a=this.props.mnist_embeddings[n],r=[new b.m(a[0],a[1],0)],o=new Float32Array(2),s=t%73*28/2048,c=28*Math.floor(t/73)/2048;o[0]=s,o[1]=c,i.geometry.attributes.position.copyVector3sArray(r),i.geometry.attributes.position.needsUpdate=!0,i.geometry.attributes.offset.array=o,i.geometry.attributes.offset.needsUpdate=!0,i.material.uniforms.texture.value=this.textures[e]}},{key:"removeHighlights",value:function(){var e=this.scene.children[1],t=e.children;e.remove.apply(e,Object(p.a)(t))}},{key:"checkIntersects",value:function(e){var t=this.props,n=t.width,i=t.height,a=t.sidebar_ctx,r=t.sidebar_image_size;var o=function(e){var t=Object(f.a)(e,2),a=t[0],r=t[1];return new b.m(a/n*2-1,-r/i*2+1,1)}(e);this.raycaster.setFromCamera(o,this.camera),this.raycaster.params.Points.threshold=.25;var s=this.raycaster.intersectObjects(this.scene.children[0].children);if(s[0]){var c=function(e){return g.sortBy(e,"distanceToRay")}(s)[0],l=c.object.userData.sprite_index,h=c.index,d=5329*l+h;this.props.setHoverIndex(d),this.highlightPoint(l,h,d),this.scene.children[1].visible=!0,a.fillRect(0,0,r,r),a.drawImage(x[l],h%73*28,28*Math.floor(h/73),28,28,0,0,r,r)}else this.props.setHoverIndex(null),this.scene.children[1].visible=!1,a.fillRect(0,0,r,r)}},{key:"handleMouse",value:function(){var e=this,t=w.d(this.renderer.domElement);this.raycaster=new b.h,t.on("mousemove",function(){var n=w.b(t.node()),i=Object(f.a)(n,2),a=[i[0],i[1]];e.checkIntersects(a)})}},{key:"init",value:function(){var e=this.props,t=e.width,n=e.height;this.scene=new b.i;var i=t/n;this.camera=new b.f(75,i,.01,1e3),this.renderer=new b.n,this.renderer.setClearColor(1118481,1),this.renderer.setSize(t,n),this.mount.appendChild(this.renderer.domElement),this.addPoints(),this.addBlankHighlightPoints(),this.setUpCamera(),this.animate(),this.handleMouse()}},{key:"animate",value:function(){requestAnimationFrame(this.animate),this.renderer.render(this.scene,this.camera)}},{key:"componentDidMount",value:function(){var e=this.props;e.width,e.height;this.init()}},{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.width,i=t.height;n===e.width&&i===e.height||this.handleResize(n,i)}},{key:"componentWillUnmount",value:function(){this.mount.removeChild(this.renderer.domElement)}},{key:"render",value:function(){var e=this,t=this.props,n=t.width,i=t.height;return a.a.createElement("div",{style:{width:n,height:i,overflow:"hidden"},ref:function(t){e.mount=t}})}}]),t}(i.Component);function j(e,t){return"".concat(e,"px ").concat(t,"px")}var O=[[141,211,199],[255,255,179],[190,186,218],[251,128,114],[128,177,211],[253,180,98],[179,222,105],[252,205,229],[188,128,189],[204,235,197]],k=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).state={ww:null,wh:null,sidebar_height:null,sidebar_ctx:null,hover_index:null},n.setSize=g.debounce(n.setSize.bind(Object(m.a)(Object(m.a)(n))),200),n.setSidebarCanvas=n.setSidebarCanvas.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"setSize",value:function(){this.setState({ww:window.innerWidth,wh:window.innerHeight});var e=this.sidebar_mount.offsetHeight;this.setState({sidebar_height:e})}},{key:"setSidebarCanvas",value:function(e){var t=e.getContext("2d");t.imageSmoothingEnabled=!1,this.setState({sidebar_ctx:t})}},{key:"setHoverIndex",value:function(e){this.setState({hover_index:e})}},{key:"componentWillMount",value:function(){this.setSize()}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.setSize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.setSize)}},{key:"render",value:function(){var e,t,n=this,i=this.props,r=i.mnist_embeddings,o=i.mnist_labels,s=this.state,c=s.ww,l=s.wh,h=s.sidebar_height,d=s.sidebar_ctx,m=s.hover_index,f={position:"absolute",left:0,top:0,height:"100vh",overflow:"auto",background:"#222",display:"flex",flexDirection:"column"},p={position:"relative",height:"100vh",background:"#111"},b=16;if(c<800)b=14,f=Object(u.a)({},f,{flexDirection:"row",width:"100%",top:"auto",height:"auto",bottom:0}),p={width:c,height:l-h},e=1.5*b*3,t="horizontal";else if(c<1400){var g=200+(c-800)/600*100;b=14+(c-800)/600*2,e=(f=Object(u.a)({},f,{width:g})).width,p=Object(u.a)({},p,{width:c-g,left:g,height:l}),t="vertical"}else f=Object(u.a)({},f,{width:300}),p=Object(u.a)({},p,{width:c-300,left:300,height:l}),e=f.width,t="vertical";var w=1.5*b,y={fontSize:b,lineHeight:1.5};return null!==c?a.a.createElement("div",{style:y},a.a.createElement("div",{style:f,ref:function(e){n.sidebar_mount=e}},a.a.createElement(v,{sidebar_orientation:t,sidebar_image_size:e,grem:w,p:j,color_array:O,setSidebarCanvas:this.setSidebarCanvas,hover_index:m,mnist_labels:o})),a.a.createElement("div",{style:p},a.a.createElement(_,{width:p.width,height:p.height,mnist_embeddings:r,mnist_labels:o,color_array:O,sidebar_ctx:d,sidebar_image_size:e,setHoverIndex:this.setHoverIndex.bind(this)}))):a.a.createElement("div",null,"loading layout")}}]),t}(i.Component),z=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).state={mnist_embeddings:null,mnist_labels:null},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat("/umap-explorer","/mnist_embeddings.json")).then(function(e){return e.json()}).then(function(t){return e.setState({mnist_embeddings:t})}),fetch("".concat("/umap-explorer","/mnist_labels.json")).then(function(e){return e.json()}).then(function(t){return e.setState({mnist_labels:t})})}},{key:"render",value:function(){return this.state.mnist_embeddings&&this.state.mnist_labels?a.a.createElement(k,this.state):"loading data"}}]),t}(i.Component),S=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.a.createElement(z,null)}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.70afa14f.chunk.js.map