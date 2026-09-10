import{A as cn,B as Hi,Bt as _i,C as fn,D as dn,E as Vi,Gt as ai,H as Dt,It as un,J as pn,K as hn,L as mn,M as Wi,O as _n,Qt as gn,R as vn,T as oi,U as En,Ut as Qt,V as Sn,Wt as si,Y as Mn,Yt as Tn,Zt as xn,_ as gi,a as An,c as rt,et as Rn,f as bn,h as ei,i as Ln,l as ct,n as tt,o as Cn,q as mt,s as Pn,t as Ze,tt as ti,y as Un,z as Ct,zt as Ht}from"./Color-CtF1uI9B.js";import{r as wn,t as Pt}from"./Texture-CLEUlQxP.js";import{t as at}from"./Vector4-D2-Rkv50.js";import{t as St}from"./WebGLRenderTarget-B_z__DMr.js";import{a as Yt,c as Dn,d as zi,f as yn,g as He,i as Gt,l as ki,n as _t,o as In,p as ii,r as li,s as Nn}from"./Camera-uKuF0w_x.js";import{a as ci,i as ft,n as Xi,r as On}from"./Scene-DqnFNPSQ.js";import{a as nt,i as Yi,n as Fn,r as ni,t as Mt}from"./ShaderMaterial-xl3afqxk.js";import{t as J}from"./UniformsLib-CU0P8Zbq.js";import{t as Gn}from"./OrthographicCamera-CEcsnNCC.js";var qi=class extends Pt{constructor(e=null,i=1,t=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:t,depth:n},this.magFilter=mt,this.minFilter=mt,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Bn=class extends Pt{constructor(e=null,i=1,t=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:t,depth:n},this.magFilter=mt,this.minFilter=mt,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Tt=-90,xt=1,Hn=class extends zi{constructor(e,i,t){super(),this.type="CubeCamera",this.renderTarget=t,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ft(Tt,xt,e,i);n.layers=this.layers,this.add(n);const o=new ft(Tt,xt,e,i);o.layers=this.layers,this.add(o);const s=new ft(Tt,xt,e,i);s.layers=this.layers,this.add(s);const p=new ft(Tt,xt,e,i);p.layers=this.layers,this.add(p);const a=new ft(Tt,xt,e,i);a.layers=this.layers,this.add(a);const v=new ft(Tt,xt,e,i);v.layers=this.layers,this.add(v)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[t,n,o,s,p,a]=i;for(const v of i)this.remove(v);if(e===2e3)t.up.set(0,1,0),t.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===2001)t.up.set(0,-1,0),t.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const v of i)this.add(v),v.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:t,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,s,p,a,v,m]=this.children,T=e.getRenderTarget(),S=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),P=e.xr.enabled;e.xr.enabled=!1;const b=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,e.setRenderTarget(t,0,n),e.render(i,o),e.setRenderTarget(t,1,n),e.render(i,s),e.setRenderTarget(t,2,n),e.render(i,p),e.setRenderTarget(t,3,n),e.render(i,a),e.setRenderTarget(t,4,n),e.render(i,v),t.texture.generateMipmaps=b,e.setRenderTarget(t,5,n),e.render(i,m),e.setRenderTarget(T,S,M),e.xr.enabled=P,t.texture.needsPMREMUpdate=!0}},Ki=class extends Pt{constructor(e,i,t,n,o,s,p,a,v,m){e=e!==void 0?e:[],i=i!==void 0?i:301,super(e,i,t,n,o,s,p,a,v,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Vn=class extends St{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const t={width:e,height:e,depth:1},n=[t,t,t,t,t,t];i.encoding!==void 0&&(Pn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===3001?Ht:""),this.texture=new Ki(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Ct}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new ci(5,5,5),o=new Mt({name:"CubemapFromEquirect",uniforms:ni(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:1,blending:0});o.uniforms.tEquirect.value=i;const s=new _t(n,o),p=i.minFilter;return i.minFilter===1008&&(i.minFilter=Ct),new Hn(1,10,this).update(e,s),i.minFilter=p,s.geometry.dispose(),s.material.dispose(),this}clear(e,i,t,n){const o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(i,t,n);e.setRenderTarget(o)}};function Zi(){let e=null,i=!1,t=null,n=null;function o(s,p){t(s,p),n=e.requestAnimationFrame(o)}return{start:function(){i!==!0&&t!==null&&(n=e.requestAnimationFrame(o),i=!0)},stop:function(){e.cancelAnimationFrame(n),i=!1},setAnimationLoop:function(s){t=s},setContext:function(s){e=s}}}function Wn(e,i){const t=i.isWebGL2,n=new WeakMap;function o(m,T){const S=m.array,M=m.usage,P=S.byteLength,b=e.createBuffer();e.bindBuffer(T,b),e.bufferData(T,S,M),m.onUploadCallback();let x;if(S instanceof Float32Array)x=e.FLOAT;else if(S instanceof Uint16Array)if(m.isFloat16BufferAttribute)if(t)x=e.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=e.UNSIGNED_SHORT;else if(S instanceof Int16Array)x=e.SHORT;else if(S instanceof Uint32Array)x=e.UNSIGNED_INT;else if(S instanceof Int32Array)x=e.INT;else if(S instanceof Int8Array)x=e.BYTE;else if(S instanceof Uint8Array)x=e.UNSIGNED_BYTE;else if(S instanceof Uint8ClampedArray)x=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+S);return{buffer:b,type:x,bytesPerElement:S.BYTES_PER_ELEMENT,version:m.version,size:P}}function s(m,T,S){const M=T.array,P=T._updateRange,b=T.updateRanges;if(e.bindBuffer(S,m),P.count===-1&&b.length===0&&e.bufferSubData(S,0,M),b.length!==0){for(let x=0,c=b.length;x<c;x++){const r=b[x];t?e.bufferSubData(S,r.start*M.BYTES_PER_ELEMENT,M,r.start,r.count):e.bufferSubData(S,r.start*M.BYTES_PER_ELEMENT,M.subarray(r.start,r.start+r.count))}T.clearUpdateRanges()}P.count!==-1&&(t?e.bufferSubData(S,P.offset*M.BYTES_PER_ELEMENT,M,P.offset,P.count):e.bufferSubData(S,P.offset*M.BYTES_PER_ELEMENT,M.subarray(P.offset,P.offset+P.count)),P.count=-1),T.onUploadCallback()}function p(m){return m.isInterleavedBufferAttribute&&(m=m.data),n.get(m)}function a(m){m.isInterleavedBufferAttribute&&(m=m.data);const T=n.get(m);T&&(e.deleteBuffer(T.buffer),n.delete(m))}function v(m,T){if(m.isGLBufferAttribute){const M=n.get(m);(!M||M.version<m.version)&&n.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}m.isInterleavedBufferAttribute&&(m=m.data);const S=n.get(m);if(S===void 0)n.set(m,o(m,T));else if(S.version<m.version){if(S.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(S.buffer,m,T),S.version=m.version}}return{get:p,remove:a,update:v}}var zn=class $i extends li{constructor(i=1,t=1,n=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:i,height:t,widthSegments:n,heightSegments:o};const s=i/2,p=t/2,a=Math.floor(n),v=Math.floor(o),m=a+1,T=v+1,S=i/a,M=t/v,P=[],b=[],x=[],c=[];for(let r=0;r<T;r++){const h=r*M-p;for(let E=0;E<m;E++){const N=E*S-s;b.push(N,-h,0),x.push(0,0,1),c.push(E/a),c.push(1-r/v)}}for(let r=0;r<v;r++)for(let h=0;h<a;h++){const E=h+m*r,N=h+m*(r+1),O=h+1+m*(r+1),L=h+1+m*r;P.push(E,N,L),P.push(N,O,L)}this.setIndex(P),this.setAttribute("position",new Yt(b,3)),this.setAttribute("normal",new Yt(x,3)),this.setAttribute("uv",new Yt(c,2))}copy(i){return super.copy(i),this.parameters=Object.assign({},i.parameters),this}static fromJSON(i){return new $i(i.width,i.height,i.widthSegments,i.heightSegments)}},kn=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`,Xn=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (ατ)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids ατ == 0. Could also do ατ =1-ατ
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`,Yn=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`,qn=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,Kn=`
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`,Zn=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`,$n=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`,jn=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`,Jn=`
#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}
#endif
`,Qn=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif
`,er=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`,tr=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`,ir=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`,nr=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`,rr=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`,ar=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

	}
	#pragma unroll_loop_end

	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

		bool clipped = true;

		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

		}
		#pragma unroll_loop_end

		if ( clipped ) discard;

	#endif

#endif
`,or=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`,sr=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`,lr=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`,cr=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`,fr=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`,dr=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`,ur=`
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif
`,pr=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

float luminance( const in vec3 rgb ) {

	// assumes rgb is in linear color space with sRGB primaries and D65 white point

	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );

	return dot( weights, rgb );

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`,hr=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`,mr=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`,_r=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`,gr=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`,vr=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`,Er=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`,Sr=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`,Mr=`

// http://www.russellcottrell.com/photo/matrixCalculator.htm

// Linear sRGB => XYZ => Linear Display P3
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);

// Linear Display P3 => XYZ => Linear sRGB
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);

vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}

vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

// @deprecated, r156
vec4 LinearToLinear( in vec4 value ) {
	return value;
}

// @deprecated, r156
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}
`,Tr=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`,xr=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`,Ar=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`,Rr=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`,br=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`,Lr=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`,Cr=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`,Pr=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`,Ur=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`,wr=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`,Dr=`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`,yr=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`,Ir=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`,Nr=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`,Or=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	#if defined ( LEGACY_LIGHTS )

		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

		}

		return 1.0;

	#else

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	#endif

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`,Fr=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
`,Gr=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`,Br=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`,Hr=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`,Vr=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`,Wr=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`,zr=`

struct PhysicalMaterial {

	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );

		return saturate(v);

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from 
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;

	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

	return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

	return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

	#endif

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

	#else

		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

	#endif

	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`,kr=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,Xr=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getIBLIrradiance( geometryNormal );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`,Yr=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`,qr=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`,Kr=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`,Zr=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`,$r=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

	#else

		if ( isPerspectiveMatrix( projectionMatrix ) ) {

			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

			gl_Position.z *= gl_Position.w;

		}

	#endif

#endif
`,jr=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`,Jr=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`,Qr=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`,ea=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,ta=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`,ia=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`,na=`
#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`,ra=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

		}

	#else

		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];

	#endif

#endif
`,aa=`
#ifdef USE_MORPHTARGETS

	uniform float morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;

		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;

			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );

		}

	#else

		#ifndef USE_MORPHNORMALS

			uniform float morphTargetInfluences[ 8 ];

		#else

			uniform float morphTargetInfluences[ 4 ];

		#endif

	#endif

#endif
`,oa=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

		}

	#else

		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];

		#ifndef USE_MORPHNORMALS

			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];

		#endif

	#endif

#endif
`,sa=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`,la=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`,ca=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,fa=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,da=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`,ua=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`,pa=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`,ha=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`,ma=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`,_a=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`,ga=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`,va=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)

const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8; // tidy overflow
	return r * PackUpscale;
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}

vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}

float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}

vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps orthographic depth in [ 0, 1 ] to viewZ
	return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps perspective depth in [ 0, 1 ] to viewZ
	return ( near * far ) / ( ( far - near ) * depth - far );
}
`,Ea=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`,Sa=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`,Ma=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`,Ta=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`,xa=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`,Aa=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`,Ra=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		float hard_shadow = step( compare , distribution.x ); // Hard Shadow

		if (hard_shadow != 1.0 ) {

			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return shadow;

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// dp = normalized distance from light to fragment position
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
		dp += shadowBias;

		// bd3D = base direction 3D
		vec3 bd3D = normalize( lightToPosition );

		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );

		#else // no percentage-closer filtering

			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

		#endif

	}

#endif
`,ba=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`,La=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`,Ca=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`,Pa=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`,Ua=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`,wa=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`,Da=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`,ya=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`,Ia=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`,Na=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`,Oa=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 OptimizedCineonToneMapping( vec3 color ) {

	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// Input and output encoded as Linear-sRGB.
vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	const float AgxMinEv = - 12.47393;  // log2(pow(2, LOG2_MIN) * MIDDLE_GRAY)
	const float AgxMaxEv = 4.026069;    // log2(pow(2, LOG2_MAX) * MIDDLE_GRAY)

	// AGX Tone Mapping implementation based on Filament, which is in turn based
	// on Blender's implementation for rec 2020 colors:
	// https://github.com/google/filament/pull/7236
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	return color;

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`,Fa=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`,Ga=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independant scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;

		// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;

		// Sample framebuffer to get pixel the refracted ray hits.
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );

		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job 
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`,Ba=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,Ha=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,Va=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`,Wa=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`,za=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,ka=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,Xa=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,Ya=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,qa=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,Ka=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,Za=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,$a=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#endif

}
`,ja=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,Ja=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`,Qa=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,eo=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,to=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,io=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,no=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,ro=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,ao=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,oo=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,so=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,lo=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,co=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,fo=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`,uo=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,po=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,ho=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,mo=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,_o=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,go=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,vo=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,Eo=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,So=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Mo=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`,To=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,xo=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`,Le={alphahash_fragment:kn,alphahash_pars_fragment:Xn,alphamap_fragment:Yn,alphamap_pars_fragment:qn,alphatest_fragment:Kn,alphatest_pars_fragment:Zn,aomap_fragment:$n,aomap_pars_fragment:jn,batching_pars_vertex:Jn,batching_vertex:Qn,begin_vertex:er,beginnormal_vertex:tr,bsdfs:ir,iridescence_fragment:nr,bumpmap_pars_fragment:rr,clipping_planes_fragment:ar,clipping_planes_pars_fragment:or,clipping_planes_pars_vertex:sr,clipping_planes_vertex:lr,color_fragment:cr,color_pars_fragment:fr,color_pars_vertex:dr,color_vertex:ur,common:pr,cube_uv_reflection_fragment:hr,defaultnormal_vertex:mr,displacementmap_pars_vertex:_r,displacementmap_vertex:gr,emissivemap_fragment:vr,emissivemap_pars_fragment:Er,colorspace_fragment:Sr,colorspace_pars_fragment:Mr,envmap_fragment:Tr,envmap_common_pars_fragment:xr,envmap_pars_fragment:Ar,envmap_pars_vertex:Rr,envmap_physical_pars_fragment:Fr,envmap_vertex:br,fog_vertex:Lr,fog_pars_vertex:Cr,fog_fragment:Pr,fog_pars_fragment:Ur,gradientmap_pars_fragment:wr,lightmap_fragment:Dr,lightmap_pars_fragment:yr,lights_lambert_fragment:Ir,lights_lambert_pars_fragment:Nr,lights_pars_begin:Or,lights_toon_fragment:Gr,lights_toon_pars_fragment:Br,lights_phong_fragment:Hr,lights_phong_pars_fragment:Vr,lights_physical_fragment:Wr,lights_physical_pars_fragment:zr,lights_fragment_begin:kr,lights_fragment_maps:Xr,lights_fragment_end:Yr,logdepthbuf_fragment:qr,logdepthbuf_pars_fragment:Kr,logdepthbuf_pars_vertex:Zr,logdepthbuf_vertex:$r,map_fragment:jr,map_pars_fragment:Jr,map_particle_fragment:Qr,map_particle_pars_fragment:ea,metalnessmap_fragment:ta,metalnessmap_pars_fragment:ia,morphcolor_vertex:na,morphnormal_vertex:ra,morphtarget_pars_vertex:aa,morphtarget_vertex:oa,normal_fragment_begin:sa,normal_fragment_maps:la,normal_pars_fragment:ca,normal_pars_vertex:fa,normal_vertex:da,normalmap_pars_fragment:ua,clearcoat_normal_fragment_begin:pa,clearcoat_normal_fragment_maps:ha,clearcoat_pars_fragment:ma,iridescence_pars_fragment:_a,opaque_fragment:ga,packing:va,premultiplied_alpha_fragment:Ea,project_vertex:Sa,dithering_fragment:Ma,dithering_pars_fragment:Ta,roughnessmap_fragment:xa,roughnessmap_pars_fragment:Aa,shadowmap_pars_fragment:Ra,shadowmap_pars_vertex:ba,shadowmap_vertex:La,shadowmask_pars_fragment:Ca,skinbase_vertex:Pa,skinning_pars_vertex:Ua,skinning_vertex:wa,skinnormal_vertex:Da,specularmap_fragment:ya,specularmap_pars_fragment:Ia,tonemapping_fragment:Na,tonemapping_pars_fragment:Oa,transmission_fragment:Fa,transmission_pars_fragment:Ga,uv_pars_fragment:Ba,uv_pars_vertex:Ha,uv_vertex:Va,worldpos_vertex:Wa,background_vert:za,background_frag:ka,backgroundCube_vert:Xa,backgroundCube_frag:Ya,cube_vert:qa,cube_frag:Ka,depth_vert:Za,depth_frag:$a,distanceRGBA_vert:ja,distanceRGBA_frag:Ja,equirect_vert:Qa,equirect_frag:eo,linedashed_vert:to,linedashed_frag:io,meshbasic_vert:no,meshbasic_frag:ro,meshlambert_vert:ao,meshlambert_frag:oo,meshmatcap_vert:so,meshmatcap_frag:lo,meshnormal_vert:co,meshnormal_frag:fo,meshphong_vert:uo,meshphong_frag:po,meshphysical_vert:ho,meshphysical_frag:mo,meshtoon_vert:_o,meshtoon_frag:go,points_vert:vo,points_frag:Eo,shadow_vert:So,shadow_frag:Mo,sprite_vert:To,sprite_frag:xo},pt={basic:{uniforms:nt([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.fog]),vertexShader:Le.meshbasic_vert,fragmentShader:Le.meshbasic_frag},lambert:{uniforms:nt([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Le.meshlambert_vert,fragmentShader:Le.meshlambert_frag},phong:{uniforms:nt([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Le.meshphong_vert,fragmentShader:Le.meshphong_frag},standard:{uniforms:nt([J.common,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.roughnessmap,J.metalnessmap,J.fog,J.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag},toon:{uniforms:nt([J.common,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.gradientmap,J.fog,J.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Le.meshtoon_vert,fragmentShader:Le.meshtoon_frag},matcap:{uniforms:nt([J.common,J.bumpmap,J.normalmap,J.displacementmap,J.fog,{matcap:{value:null}}]),vertexShader:Le.meshmatcap_vert,fragmentShader:Le.meshmatcap_frag},points:{uniforms:nt([J.points,J.fog]),vertexShader:Le.points_vert,fragmentShader:Le.points_frag},dashed:{uniforms:nt([J.common,J.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Le.linedashed_vert,fragmentShader:Le.linedashed_frag},depth:{uniforms:nt([J.common,J.displacementmap]),vertexShader:Le.depth_vert,fragmentShader:Le.depth_frag},normal:{uniforms:nt([J.common,J.bumpmap,J.normalmap,J.displacementmap,{opacity:{value:1}}]),vertexShader:Le.meshnormal_vert,fragmentShader:Le.meshnormal_frag},sprite:{uniforms:nt([J.sprite,J.fog]),vertexShader:Le.sprite_vert,fragmentShader:Le.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Le.background_vert,fragmentShader:Le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Le.backgroundCube_vert,fragmentShader:Le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Le.cube_vert,fragmentShader:Le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Le.equirect_vert,fragmentShader:Le.equirect_frag},distanceRGBA:{uniforms:nt([J.common,J.displacementmap,{referencePosition:{value:new He},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Le.distanceRGBA_vert,fragmentShader:Le.distanceRGBA_frag},shadow:{uniforms:nt([J.lights,J.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Le.shadow_vert,fragmentShader:Le.shadow_frag}};pt.physical={uniforms:nt([pt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag};var Nt={r:0,b:0,g:0};function Ao(e,i,t,n,o,s,p){const a=new Ze(0);let v=s===!0?0:1,m,T,S=null,M=0,P=null;function b(c,r){let h=!1,E=r.isScene===!0?r.background:null;E&&E.isTexture&&(E=(r.backgroundBlurriness>0?t:i).get(E)),E===null?x(a,v):E&&E.isColor&&(x(E,1),h=!0);const N=e.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,p):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,p),(e.autoClear||h)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),E&&(E.isCubeTexture||E.mapping===306)?(T===void 0&&(T=new _t(new ci(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:ni(pt.backgroundCube.uniforms),vertexShader:pt.backgroundCube.vertexShader,fragmentShader:pt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),T.geometry.deleteAttribute("normal"),T.geometry.deleteAttribute("uv"),T.onBeforeRender=function(O,L,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(T.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(T)),T.material.uniforms.envMap.value=E,T.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,T.material.uniforms.backgroundBlurriness.value=r.backgroundBlurriness,T.material.uniforms.backgroundIntensity.value=r.backgroundIntensity,T.material.toneMapped=tt.getTransfer(E.colorSpace)!==_i,(S!==E||M!==E.version||P!==e.toneMapping)&&(T.material.needsUpdate=!0,S=E,M=E.version,P=e.toneMapping),T.layers.enableAll(),c.unshift(T,T.geometry,T.material,0,0,null)):E&&E.isTexture&&(m===void 0&&(m=new _t(new zn(2,2),new Mt({name:"BackgroundMaterial",uniforms:ni(pt.background.uniforms),vertexShader:pt.background.vertexShader,fragmentShader:pt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(m)),m.material.uniforms.t2D.value=E,m.material.uniforms.backgroundIntensity.value=r.backgroundIntensity,m.material.toneMapped=tt.getTransfer(E.colorSpace)!==_i,E.matrixAutoUpdate===!0&&E.updateMatrix(),m.material.uniforms.uvTransform.value.copy(E.matrix),(S!==E||M!==E.version||P!==e.toneMapping)&&(m.material.needsUpdate=!0,S=E,M=E.version,P=e.toneMapping),m.layers.enableAll(),c.unshift(m,m.geometry,m.material,0,0,null))}function x(c,r){c.getRGB(Nt,Yi(e)),n.buffers.color.setClear(Nt.r,Nt.g,Nt.b,r,p)}return{getClearColor:function(){return a},setClearColor:function(c,r=1){a.set(c),v=r,x(a,v)},getClearAlpha:function(){return v},setClearAlpha:function(c){v=c,x(a,v)},render:b}}function Ro(e,i,t,n){const o=e.getParameter(e.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:i.get("OES_vertex_array_object"),p=n.isWebGL2||s!==null,a={},v=c(null);let m=v,T=!1;function S(A,B,H,Z,z){let W=!1;if(p){const ne=x(Z,H,B);m!==ne&&(m=ne,P(m.object)),W=r(A,Z,H,z),W&&h(A,Z,H,z)}else{const ne=B.wireframe===!0;(m.geometry!==Z.id||m.program!==H.id||m.wireframe!==ne)&&(m.geometry=Z.id,m.program=H.id,m.wireframe=ne,W=!0)}z!==null&&t.update(z,e.ELEMENT_ARRAY_BUFFER),(W||T)&&(T=!1,X(A,B,H,Z),z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function M(){return n.isWebGL2?e.createVertexArray():s.createVertexArrayOES()}function P(A){return n.isWebGL2?e.bindVertexArray(A):s.bindVertexArrayOES(A)}function b(A){return n.isWebGL2?e.deleteVertexArray(A):s.deleteVertexArrayOES(A)}function x(A,B,H){const Z=H.wireframe===!0;let z=a[A.id];z===void 0&&(z={},a[A.id]=z);let W=z[B.id];W===void 0&&(W={},z[B.id]=W);let ne=W[Z];return ne===void 0&&(ne=c(M()),W[Z]=ne),ne}function c(A){const B=[],H=[],Z=[];for(let z=0;z<o;z++)B[z]=0,H[z]=0,Z[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:H,attributeDivisors:Z,object:A,attributes:{},index:null}}function r(A,B,H,Z){const z=m.attributes,W=B.attributes;let ne=0;const ee=H.getAttributes();for(const D in ee)if(ee[D].location>=0){const V=z[D];let ae=W[D];if(ae===void 0&&(D==="instanceMatrix"&&A.instanceMatrix&&(ae=A.instanceMatrix),D==="instanceColor"&&A.instanceColor&&(ae=A.instanceColor)),V===void 0||V.attribute!==ae||ae&&V.data!==ae.data)return!0;ne++}return m.attributesNum!==ne||m.index!==Z}function h(A,B,H,Z){const z={},W=B.attributes;let ne=0;const ee=H.getAttributes();for(const D in ee)if(ee[D].location>=0){let V=W[D];V===void 0&&(D==="instanceMatrix"&&A.instanceMatrix&&(V=A.instanceMatrix),D==="instanceColor"&&A.instanceColor&&(V=A.instanceColor));const ae={};ae.attribute=V,V&&V.data&&(ae.data=V.data),z[D]=ae,ne++}m.attributes=z,m.attributesNum=ne,m.index=Z}function E(){const A=m.newAttributes;for(let B=0,H=A.length;B<H;B++)A[B]=0}function N(A){O(A,0)}function O(A,B){const H=m.newAttributes,Z=m.enabledAttributes,z=m.attributeDivisors;H[A]=1,Z[A]===0&&(e.enableVertexAttribArray(A),Z[A]=1),z[A]!==B&&((n.isWebGL2?e:i.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](A,B),z[A]=B)}function L(){const A=m.newAttributes,B=m.enabledAttributes;for(let H=0,Z=B.length;H<Z;H++)B[H]!==A[H]&&(e.disableVertexAttribArray(H),B[H]=0)}function F(A,B,H,Z,z,W,ne){ne===!0?e.vertexAttribIPointer(A,B,H,z,W):e.vertexAttribPointer(A,B,H,Z,z,W)}function X(A,B,H,Z){if(n.isWebGL2===!1&&(A.isInstancedMesh||Z.isInstancedBufferGeometry)&&i.get("ANGLE_instanced_arrays")===null)return;E();const z=Z.attributes,W=H.getAttributes(),ne=B.defaultAttributeValues;for(const ee in W){const D=W[ee];if(D.location>=0){let V=z[ee];if(V===void 0&&(ee==="instanceMatrix"&&A.instanceMatrix&&(V=A.instanceMatrix),ee==="instanceColor"&&A.instanceColor&&(V=A.instanceColor)),V!==void 0){const ae=V.normalized,ce=V.itemSize,ve=t.get(V);if(ve===void 0)continue;const Ee=ve.buffer,we=ve.type,Se=ve.bytesPerElement,Be=n.isWebGL2===!0&&(we===e.INT||we===e.UNSIGNED_INT||V.gpuType===1013);if(V.isInterleavedBufferAttribute){const C=V.data,it=C.stride,Oe=V.offset;if(C.isInstancedInterleavedBuffer){for(let de=0;de<D.locationSize;de++)O(D.location+de,C.meshPerAttribute);A.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let de=0;de<D.locationSize;de++)N(D.location+de);e.bindBuffer(e.ARRAY_BUFFER,Ee);for(let de=0;de<D.locationSize;de++)F(D.location+de,ce/D.locationSize,we,ae,it*Se,(Oe+ce/D.locationSize*de)*Se,Be)}else{if(V.isInstancedBufferAttribute){for(let C=0;C<D.locationSize;C++)O(D.location+C,V.meshPerAttribute);A.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let C=0;C<D.locationSize;C++)N(D.location+C);e.bindBuffer(e.ARRAY_BUFFER,Ee);for(let C=0;C<D.locationSize;C++)F(D.location+C,ce/D.locationSize,we,ae,ce*Se,ce/D.locationSize*C*Se,Be)}}else if(ne!==void 0){const ae=ne[ee];if(ae!==void 0)switch(ae.length){case 2:e.vertexAttrib2fv(D.location,ae);break;case 3:e.vertexAttrib3fv(D.location,ae);break;case 4:e.vertexAttrib4fv(D.location,ae);break;default:e.vertexAttrib1fv(D.location,ae)}}}}L()}function u(){te();for(const A in a){const B=a[A];for(const H in B){const Z=B[H];for(const z in Z)b(Z[z].object),delete Z[z];delete B[H]}delete a[A]}}function g(A){if(a[A.id]===void 0)return;const B=a[A.id];for(const H in B){const Z=B[H];for(const z in Z)b(Z[z].object),delete Z[z];delete B[H]}delete a[A.id]}function G(A){for(const B in a){const H=a[B];if(H[A.id]===void 0)continue;const Z=H[A.id];for(const z in Z)b(Z[z].object),delete Z[z];delete H[A.id]}}function te(){pe(),T=!0,m!==v&&(m=v,P(m.object))}function pe(){v.geometry=null,v.program=null,v.wireframe=!1}return{setup:S,reset:te,resetDefaultState:pe,dispose:u,releaseStatesOfGeometry:g,releaseStatesOfProgram:G,initAttributes:E,enableAttribute:N,disableUnusedAttributes:L}}function bo(e,i,t,n){const o=n.isWebGL2;let s;function p(T){s=T}function a(T,S){e.drawArrays(s,T,S),t.update(S,s,1)}function v(T,S,M){if(M===0)return;let P,b;if(o)P=e,b="drawArraysInstanced";else if(P=i.get("ANGLE_instanced_arrays"),b="drawArraysInstancedANGLE",P===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}P[b](s,T,S,M),t.update(S,s,M)}function m(T,S,M){if(M===0)return;const P=i.get("WEBGL_multi_draw");if(P===null)for(let b=0;b<M;b++)this.render(T[b],S[b]);else{P.multiDrawArraysWEBGL(s,T,0,S,0,M);let b=0;for(let x=0;x<M;x++)b+=S[x];t.update(b,s,1)}}this.setMode=p,this.render=a,this.renderInstances=v,this.renderMultiDraw=m}function Lo(e,i,t){let n;function o(){if(n!==void 0)return n;if(i.has("EXT_texture_filter_anisotropic")===!0){const F=i.get("EXT_texture_filter_anisotropic");n=e.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(F){if(F==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const p=typeof WebGL2RenderingContext<"u"&&e.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const v=s(a);v!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",v,"instead."),a=v);const m=p||i.has("WEBGL_draw_buffers"),T=t.logarithmicDepthBuffer===!0,S=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),P=e.getParameter(e.MAX_TEXTURE_SIZE),b=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),x=e.getParameter(e.MAX_VERTEX_ATTRIBS),c=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),r=e.getParameter(e.MAX_VARYING_VECTORS),h=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=M>0,N=p||i.has("OES_texture_float"),O=E&&N,L=p?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:p,drawBuffers:m,getMaxAnisotropy:o,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:T,maxTextures:S,maxVertexTextures:M,maxTextureSize:P,maxCubemapSize:b,maxAttributes:x,maxVertexUniforms:c,maxVaryings:r,maxFragmentUniforms:h,vertexTextures:E,floatFragmentTextures:N,floatVertexTextures:O,maxSamples:L}}function Co(e){const i=this;let t=null,n=0,o=!1,s=!1;const p=new On,a=new rt,v={value:null,needsUpdate:!1};this.uniform=v,this.numPlanes=0,this.numIntersection=0,this.init=function(S,M){const P=S.length!==0||M||n!==0||o;return o=M,n=S.length,P},this.beginShadows=function(){s=!0,T(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(S,M){t=T(S,M,0)},this.setState=function(S,M,P){const b=S.clippingPlanes,x=S.clipIntersection,c=S.clipShadows,r=e.get(S);if(!o||b===null||b.length===0||s&&!c)s?T(null):m();else{const h=s?0:n,E=h*4;let N=r.clippingState||null;v.value=N,N=T(b,M,E,P);for(let O=0;O!==E;++O)N[O]=t[O];r.clippingState=N,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=h}};function m(){v.value!==t&&(v.value=t,v.needsUpdate=n>0),i.numPlanes=n,i.numIntersection=0}function T(S,M,P,b){const x=S!==null?S.length:0;let c=null;if(x!==0){if(c=v.value,b!==!0||c===null){const r=P+x*4,h=M.matrixWorldInverse;a.getNormalMatrix(h),(c===null||c.length<r)&&(c=new Float32Array(r));for(let E=0,N=P;E!==x;++E,N+=4)p.copy(S[E]).applyMatrix4(h,a),p.normal.toArray(c,N),c[N+3]=p.constant}v.value=c,v.needsUpdate=!0}return i.numPlanes=x,i.numIntersection=0,c}}function Po(e){let i=new WeakMap;function t(p,a){return a===303?p.mapping=301:a===304&&(p.mapping=302),p}function n(p){if(p&&p.isTexture){const a=p.mapping;if(a===303||a===304)if(i.has(p)){const v=i.get(p).texture;return t(v,p.mapping)}else{const v=p.image;if(v&&v.height>0){const m=new Vn(v.height/2);return m.fromEquirectangularTexture(e,p),i.set(p,m),p.addEventListener("dispose",o),t(m.texture,p.mapping)}else return null}}return p}function o(p){const a=p.target;a.removeEventListener("dispose",o);const v=i.get(a);v!==void 0&&(i.delete(a),v.dispose())}function s(){i=new WeakMap}return{get:n,dispose:s}}var Rt=4,vi=[.125,.215,.35,.446,.526,.582],bt=20,qt=new Gn,Ei=new Ze,Kt=null,Zt=0,$t=0,Et=(1+Math.sqrt(5))/2,At=1/Et,Si=[new He(1,1,1),new He(-1,1,1),new He(1,1,-1),new He(-1,1,-1),new He(0,Et,At),new He(0,Et,-At),new He(At,0,Et),new He(-At,0,Et),new He(Et,At,0),new He(-Et,At,0)],Mi=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,t=.1,n=100){Kt=this._renderer.getRenderTarget(),Zt=this._renderer.getActiveCubeFace(),$t=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,t,n,o),i>0&&this._blur(o,0,0,i),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ai(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kt,Zt,$t),e.scissorTest=!1,Ot(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kt=this._renderer.getRenderTarget(),Zt=this._renderer.getActiveCubeFace(),$t=this._renderer.getActiveMipmapLevel();const t=i||this._allocateTargets();return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,t={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:Wi,format:ti,colorSpace:Dt,depthBuffer:!1},n=Ti(e,i,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ti(e,i,t);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Uo(o)),this._blurMaterial=wo(o,e,i)}return n}_compileMaterial(e){const i=new _t(this._lodPlanes[0],e);this._renderer.compile(i,qt)}_sceneToCubeUV(e,i,t,n){const o=new ft(90,1,i,t),s=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],a=this._renderer,v=a.autoClear,m=a.toneMapping;a.getClearColor(Ei),a.toneMapping=0,a.autoClear=!1;const T=new Dn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),S=new _t(new ci,T);let M=!1;const P=e.background;P?P.isColor&&(T.color.copy(P),e.background=null,M=!0):(T.color.copy(Ei),M=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(o.up.set(0,s[b],0),o.lookAt(p[b],0,0)):x===1?(o.up.set(0,0,s[b]),o.lookAt(0,p[b],0)):(o.up.set(0,s[b],0),o.lookAt(0,0,p[b]));const c=this._cubeSize;Ot(n,x*c,b>2?c:0,c,c),a.setRenderTarget(n),M&&a.render(S,o),a.render(e,o)}S.geometry.dispose(),S.material.dispose(),a.toneMapping=m,a.autoClear=v,e.background=P}_textureToCubeUV(e,i){const t=this._renderer,n=e.mapping===301||e.mapping===302;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ai()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xi());const o=n?this._cubemapMaterial:this._equirectMaterial,s=new _t(this._lodPlanes[0],o),p=o.uniforms;p.envMap.value=e;const a=this._cubeSize;Ot(i,0,0,3*a,2*a),t.setRenderTarget(i),t.render(s,qt)}_applyPMREM(e){const i=this._renderer,t=i.autoClear;i.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const o=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),s=Si[(n-1)%Si.length];this._blur(e,n-1,n,o,s)}i.autoClear=t}_blur(e,i,t,n,o){const s=this._pingPongRenderTarget;this._halfBlur(e,s,i,t,n,"latitudinal",o),this._halfBlur(s,e,t,t,n,"longitudinal",o)}_halfBlur(e,i,t,n,o,s,p){const a=this._renderer,v=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,T=new _t(this._lodPlanes[n],v),S=v.uniforms,M=this._sizeLods[t]-1,P=isFinite(o)?Math.PI/(2*M):2*Math.PI/39,b=o/P,x=isFinite(o)?1+Math.floor(m*b):bt;x>bt&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${bt}`);const c=[];let r=0;for(let N=0;N<bt;++N){const O=N/b,L=Math.exp(-O*O/2);c.push(L),N===0?r+=L:N<x&&(r+=2*L)}for(let N=0;N<c.length;N++)c[N]=c[N]/r;S.envMap.value=e.texture,S.samples.value=x,S.weights.value=c,S.latitudinal.value=s==="latitudinal",p&&(S.poleAxis.value=p);const{_lodMax:h}=this;S.dTheta.value=P,S.mipInt.value=h-t;const E=this._sizeLods[n];Ot(i,3*E*(n>h-Rt?n-h+Rt:0),4*(this._cubeSize-E),3*E,2*E),a.setRenderTarget(i),a.render(T,qt)}};function Uo(e){const i=[],t=[],n=[];let o=e;const s=e-Rt+1+vi.length;for(let p=0;p<s;p++){const a=Math.pow(2,o);t.push(a);let v=1/a;p>e-Rt?v=vi[p-e+Rt-1]:p===0&&(v=0),n.push(v);const m=1/(a-2),T=-m,S=1+m,M=[T,T,S,T,S,S,T,T,S,S,T,S],P=6,b=3,x=2,c=1,r=new Float32Array(108),h=new Float32Array(72),E=new Float32Array(36);for(let O=0;O<P;O++){const L=O%3*2/3-1,F=O>2?0:-1,X=[L,F,0,L+2/3,F,0,L+2/3,F+1,0,L,F,0,L+2/3,F+1,0,L,F+1,0];r.set(X,18*O),h.set(M,12*O);const u=[O,O,O,O,O,O];E.set(u,6*O)}const N=new li;N.setAttribute("position",new Gt(r,b)),N.setAttribute("uv",new Gt(h,x)),N.setAttribute("faceIndex",new Gt(E,c)),i.push(N),o>Rt&&o--}return{lodPlanes:i,sizeLods:t,sigmas:n}}function Ti(e,i,t){const n=new St(e,i,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ot(e,i,t,n,o){e.viewport.set(i,t,n,o),e.scissor.set(i,t,n,o)}function wo(e,i,t){const n=new Float32Array(bt),o=new He(0,1,0);return new Mt({name:"SphericalGaussianBlur",defines:{n:bt,CUBEUV_TEXEL_WIDTH:1/i,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:fi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function xi(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ai(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fi(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Do(e){let i=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const v=a.mapping,m=v===303||v===304,T=v===301||v===302;if(m||T)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let S=i.get(a);return t===null&&(t=new Mi(e)),S=m?t.fromEquirectangular(a,S):t.fromCubemap(a,S),i.set(a,S),S.texture}else{if(i.has(a))return i.get(a).texture;{const S=a.image;if(m&&S&&S.height>0||T&&S&&o(S)){t===null&&(t=new Mi(e));const M=m?t.fromEquirectangular(a):t.fromCubemap(a);return i.set(a,M),a.addEventListener("dispose",s),M.texture}else return null}}}return a}function o(a){let v=0;const m=6;for(let T=0;T<m;T++)a[T]!==void 0&&v++;return v===m}function s(a){const v=a.target;v.removeEventListener("dispose",s);const m=i.get(v);m!==void 0&&(i.delete(v),m.dispose())}function p(){i=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:p}}function yo(e){const i={};function t(n){if(i[n]!==void 0)return i[n];let o;switch(n){case"WEBGL_depth_texture":o=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=e.getExtension(n)}return i[n]=o,o}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const o=t(n);return o===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),o}}}function Io(e,i,t,n){const o={},s=new WeakMap;function p(S){const M=S.target;M.index!==null&&i.remove(M.index);for(const b in M.attributes)i.remove(M.attributes[b]);for(const b in M.morphAttributes){const x=M.morphAttributes[b];for(let c=0,r=x.length;c<r;c++)i.remove(x[c])}M.removeEventListener("dispose",p),delete o[M.id];const P=s.get(M);P&&(i.remove(P),s.delete(M)),n.releaseStatesOfGeometry(M),M.isInstancedBufferGeometry===!0&&delete M._maxInstanceCount,t.memory.geometries--}function a(S,M){return o[M.id]===!0||(M.addEventListener("dispose",p),o[M.id]=!0,t.memory.geometries++),M}function v(S){const M=S.attributes;for(const b in M)i.update(M[b],e.ARRAY_BUFFER);const P=S.morphAttributes;for(const b in P){const x=P[b];for(let c=0,r=x.length;c<r;c++)i.update(x[c],e.ARRAY_BUFFER)}}function m(S){const M=[],P=S.index,b=S.attributes.position;let x=0;if(P!==null){const h=P.array;x=P.version;for(let E=0,N=h.length;E<N;E+=3){const O=h[E+0],L=h[E+1],F=h[E+2];M.push(O,L,L,F,F,O)}}else if(b!==void 0){const h=b.array;x=b.version;for(let E=0,N=h.length/3-1;E<N;E+=3){const O=E+0,L=E+1,F=E+2;M.push(O,L,L,F,F,O)}}else return;const c=new(Ln(M)?Nn:In)(M,1);c.version=x;const r=s.get(S);r&&i.remove(r),s.set(S,c)}function T(S){const M=s.get(S);if(M){const P=S.index;P!==null&&M.version<P.version&&m(S)}else m(S);return s.get(S)}return{get:a,update:v,getWireframeAttribute:T}}function No(e,i,t,n){const o=n.isWebGL2;let s;function p(P){s=P}let a,v;function m(P){a=P.type,v=P.bytesPerElement}function T(P,b){e.drawElements(s,b,a,P*v),t.update(b,s,1)}function S(P,b,x){if(x===0)return;let c,r;if(o)c=e,r="drawElementsInstanced";else if(c=i.get("ANGLE_instanced_arrays"),r="drawElementsInstancedANGLE",c===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}c[r](s,b,a,P*v,x),t.update(b,s,x)}function M(P,b,x){if(x===0)return;const c=i.get("WEBGL_multi_draw");if(c===null)for(let r=0;r<x;r++)this.render(P[r]/v,b[r]);else{c.multiDrawElementsWEBGL(s,b,0,a,P,0,x);let r=0;for(let h=0;h<x;h++)r+=b[h];t.update(r,s,1)}}this.setMode=p,this.setIndex=m,this.render=T,this.renderInstances=S,this.renderMultiDraw=M}function Oo(e){const i={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,p,a){switch(t.calls++,p){case e.TRIANGLES:t.triangles+=a*(s/3);break;case e.LINES:t.lines+=a*(s/2);break;case e.LINE_STRIP:t.lines+=a*(s-1);break;case e.LINE_LOOP:t.lines+=a*s;break;case e.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",p)}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:i,render:t,programs:null,autoReset:!0,reset:o,update:n}}function Fo(e,i){return e[0]-i[0]}function Go(e,i){return Math.abs(i[1])-Math.abs(e[1])}function Bo(e,i,t){const n={},o=new Float32Array(8),s=new WeakMap,p=new at,a=[];for(let m=0;m<8;m++)a[m]=[m,0];function v(m,T,S){const M=m.morphTargetInfluences;if(i.isWebGL2===!0){const P=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,b=P!==void 0?P.length:0;let x=s.get(T);if(x===void 0||x.count!==b){let A=function(){te.dispose(),s.delete(T),T.removeEventListener("dispose",A)};x!==void 0&&x.texture.dispose();const h=T.morphAttributes.position!==void 0,E=T.morphAttributes.normal!==void 0,N=T.morphAttributes.color!==void 0,O=T.morphAttributes.position||[],L=T.morphAttributes.normal||[],F=T.morphAttributes.color||[];let X=0;h===!0&&(X=1),E===!0&&(X=2),N===!0&&(X=3);let u=T.attributes.position.count*X,g=1;u>i.maxTextureSize&&(g=Math.ceil(u/i.maxTextureSize),u=i.maxTextureSize);const G=new Float32Array(u*g*4*b),te=new qi(G,u,g,b);te.type=cn,te.needsUpdate=!0;const pe=X*4;for(let B=0;B<b;B++){const H=O[B],Z=L[B],z=F[B],W=u*g*4*B;for(let ne=0;ne<H.count;ne++){const ee=ne*pe;h===!0&&(p.fromBufferAttribute(H,ne),G[W+ee+0]=p.x,G[W+ee+1]=p.y,G[W+ee+2]=p.z,G[W+ee+3]=0),E===!0&&(p.fromBufferAttribute(Z,ne),G[W+ee+4]=p.x,G[W+ee+5]=p.y,G[W+ee+6]=p.z,G[W+ee+7]=0),N===!0&&(p.fromBufferAttribute(z,ne),G[W+ee+8]=p.x,G[W+ee+9]=p.y,G[W+ee+10]=p.z,G[W+ee+11]=z.itemSize===4?p.w:1)}}x={count:b,texture:te,size:new ct(u,g)},s.set(T,x),T.addEventListener("dispose",A)}let c=0;for(let h=0;h<M.length;h++)c+=M[h];const r=T.morphTargetsRelative?1:1-c;S.getUniforms().setValue(e,"morphTargetBaseInfluence",r),S.getUniforms().setValue(e,"morphTargetInfluences",M),S.getUniforms().setValue(e,"morphTargetsTexture",x.texture,t),S.getUniforms().setValue(e,"morphTargetsTextureSize",x.size)}else{const P=M===void 0?0:M.length;let b=n[T.id];if(b===void 0||b.length!==P){b=[];for(let E=0;E<P;E++)b[E]=[E,0];n[T.id]=b}for(let E=0;E<P;E++){const N=b[E];N[0]=E,N[1]=M[E]}b.sort(Go);for(let E=0;E<8;E++)E<P&&b[E][1]?(a[E][0]=b[E][0],a[E][1]=b[E][1]):(a[E][0]=Number.MAX_SAFE_INTEGER,a[E][1]=0);a.sort(Fo);const x=T.morphAttributes.position,c=T.morphAttributes.normal;let r=0;for(let E=0;E<8;E++){const N=a[E],O=N[0],L=N[1];O!==Number.MAX_SAFE_INTEGER&&L?(x&&T.getAttribute("morphTarget"+E)!==x[O]&&T.setAttribute("morphTarget"+E,x[O]),c&&T.getAttribute("morphNormal"+E)!==c[O]&&T.setAttribute("morphNormal"+E,c[O]),o[E]=L,r+=L):(x&&T.hasAttribute("morphTarget"+E)===!0&&T.deleteAttribute("morphTarget"+E),c&&T.hasAttribute("morphNormal"+E)===!0&&T.deleteAttribute("morphNormal"+E),o[E]=0)}const h=T.morphTargetsRelative?1:1-r;S.getUniforms().setValue(e,"morphTargetBaseInfluence",h),S.getUniforms().setValue(e,"morphTargetInfluences",o)}}return{update:v}}function Ho(e,i,t,n){let o=new WeakMap;function s(v){const m=n.render.frame,T=v.geometry,S=i.get(v,T);if(o.get(S)!==m&&(i.update(S),o.set(S,m)),v.isInstancedMesh&&(v.hasEventListener("dispose",a)===!1&&v.addEventListener("dispose",a),o.get(v)!==m&&(t.update(v.instanceMatrix,e.ARRAY_BUFFER),v.instanceColor!==null&&t.update(v.instanceColor,e.ARRAY_BUFFER),o.set(v,m))),v.isSkinnedMesh){const M=v.skeleton;o.get(M)!==m&&(M.update(),o.set(M,m))}return S}function p(){o=new WeakMap}function a(v){const m=v.target;m.removeEventListener("dispose",a),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:s,dispose:p}}var ji=class extends Pt{constructor(e,i,t,n,o,s,p,a,v,m){if(m=m!==void 0?m:Vi,m!==1026&&m!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&m===1026&&(t=ai),t===void 0&&m===1027&&(t=si),super(null,n,o,s,p,a,m,t,v),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=p!==void 0?p:mt,this.minFilter=a!==void 0?a:mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}},Ji=new Pt,Qi=new ji(1,1);Qi.compareFunction=515;var en=new qi,tn=new Bn,nn=new Ki,Ri=[],bi=[],Li=new Float32Array(16),Ci=new Float32Array(9),Pi=new Float32Array(4);function Ut(e,i,t){const n=e[0];if(n<=0||n>0)return e;const o=i*t;let s=Ri[o];if(s===void 0&&(s=new Float32Array(o),Ri[o]=s),i!==0){n.toArray(s,0);for(let p=1,a=0;p!==i;++p)a+=t,e[p].toArray(s,a)}return s}function je(e,i){if(e.length!==i.length)return!1;for(let t=0,n=e.length;t<n;t++)if(e[t]!==i[t])return!1;return!0}function Je(e,i){for(let t=0,n=i.length;t<n;t++)e[t]=i[t]}function Vt(e,i){let t=bi[i];t===void 0&&(t=new Int32Array(i),bi[i]=t);for(let n=0;n!==i;++n)t[n]=e.allocateTextureUnit();return t}function Vo(e,i){const t=this.cache;t[0]!==i&&(e.uniform1f(this.addr,i),t[0]=i)}function Wo(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y)&&(e.uniform2f(this.addr,i.x,i.y),t[0]=i.x,t[1]=i.y);else{if(je(t,i))return;e.uniform2fv(this.addr,i),Je(t,i)}}function zo(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y||t[2]!==i.z)&&(e.uniform3f(this.addr,i.x,i.y,i.z),t[0]=i.x,t[1]=i.y,t[2]=i.z);else if(i.r!==void 0)(t[0]!==i.r||t[1]!==i.g||t[2]!==i.b)&&(e.uniform3f(this.addr,i.r,i.g,i.b),t[0]=i.r,t[1]=i.g,t[2]=i.b);else{if(je(t,i))return;e.uniform3fv(this.addr,i),Je(t,i)}}function ko(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y||t[2]!==i.z||t[3]!==i.w)&&(e.uniform4f(this.addr,i.x,i.y,i.z,i.w),t[0]=i.x,t[1]=i.y,t[2]=i.z,t[3]=i.w);else{if(je(t,i))return;e.uniform4fv(this.addr,i),Je(t,i)}}function Xo(e,i){const t=this.cache,n=i.elements;if(n===void 0){if(je(t,i))return;e.uniformMatrix2fv(this.addr,!1,i),Je(t,i)}else{if(je(t,n))return;Pi.set(n),e.uniformMatrix2fv(this.addr,!1,Pi),Je(t,n)}}function Yo(e,i){const t=this.cache,n=i.elements;if(n===void 0){if(je(t,i))return;e.uniformMatrix3fv(this.addr,!1,i),Je(t,i)}else{if(je(t,n))return;Ci.set(n),e.uniformMatrix3fv(this.addr,!1,Ci),Je(t,n)}}function qo(e,i){const t=this.cache,n=i.elements;if(n===void 0){if(je(t,i))return;e.uniformMatrix4fv(this.addr,!1,i),Je(t,i)}else{if(je(t,n))return;Li.set(n),e.uniformMatrix4fv(this.addr,!1,Li),Je(t,n)}}function Ko(e,i){const t=this.cache;t[0]!==i&&(e.uniform1i(this.addr,i),t[0]=i)}function Zo(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y)&&(e.uniform2i(this.addr,i.x,i.y),t[0]=i.x,t[1]=i.y);else{if(je(t,i))return;e.uniform2iv(this.addr,i),Je(t,i)}}function $o(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y||t[2]!==i.z)&&(e.uniform3i(this.addr,i.x,i.y,i.z),t[0]=i.x,t[1]=i.y,t[2]=i.z);else{if(je(t,i))return;e.uniform3iv(this.addr,i),Je(t,i)}}function jo(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y||t[2]!==i.z||t[3]!==i.w)&&(e.uniform4i(this.addr,i.x,i.y,i.z,i.w),t[0]=i.x,t[1]=i.y,t[2]=i.z,t[3]=i.w);else{if(je(t,i))return;e.uniform4iv(this.addr,i),Je(t,i)}}function Jo(e,i){const t=this.cache;t[0]!==i&&(e.uniform1ui(this.addr,i),t[0]=i)}function Qo(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y)&&(e.uniform2ui(this.addr,i.x,i.y),t[0]=i.x,t[1]=i.y);else{if(je(t,i))return;e.uniform2uiv(this.addr,i),Je(t,i)}}function es(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y||t[2]!==i.z)&&(e.uniform3ui(this.addr,i.x,i.y,i.z),t[0]=i.x,t[1]=i.y,t[2]=i.z);else{if(je(t,i))return;e.uniform3uiv(this.addr,i),Je(t,i)}}function ts(e,i){const t=this.cache;if(i.x!==void 0)(t[0]!==i.x||t[1]!==i.y||t[2]!==i.z||t[3]!==i.w)&&(e.uniform4ui(this.addr,i.x,i.y,i.z,i.w),t[0]=i.x,t[1]=i.y,t[2]=i.z,t[3]=i.w);else{if(je(t,i))return;e.uniform4uiv(this.addr,i),Je(t,i)}}function is(e,i,t){const n=this.cache,o=t.allocateTextureUnit();n[0]!==o&&(e.uniform1i(this.addr,o),n[0]=o);const s=this.type===e.SAMPLER_2D_SHADOW?Qi:Ji;t.setTexture2D(i||s,o)}function ns(e,i,t){const n=this.cache,o=t.allocateTextureUnit();n[0]!==o&&(e.uniform1i(this.addr,o),n[0]=o),t.setTexture3D(i||tn,o)}function rs(e,i,t){const n=this.cache,o=t.allocateTextureUnit();n[0]!==o&&(e.uniform1i(this.addr,o),n[0]=o),t.setTextureCube(i||nn,o)}function as(e,i,t){const n=this.cache,o=t.allocateTextureUnit();n[0]!==o&&(e.uniform1i(this.addr,o),n[0]=o),t.setTexture2DArray(i||en,o)}function os(e){switch(e){case 5126:return Vo;case 35664:return Wo;case 35665:return zo;case 35666:return ko;case 35674:return Xo;case 35675:return Yo;case 35676:return qo;case 5124:case 35670:return Ko;case 35667:case 35671:return Zo;case 35668:case 35672:return $o;case 35669:case 35673:return jo;case 5125:return Jo;case 36294:return Qo;case 36295:return es;case 36296:return ts;case 35678:case 36198:case 36298:case 36306:case 35682:return is;case 35679:case 36299:case 36307:return ns;case 35680:case 36300:case 36308:case 36293:return rs;case 36289:case 36303:case 36311:case 36292:return as}}function ss(e,i){e.uniform1fv(this.addr,i)}function ls(e,i){const t=Ut(i,this.size,2);e.uniform2fv(this.addr,t)}function cs(e,i){const t=Ut(i,this.size,3);e.uniform3fv(this.addr,t)}function fs(e,i){const t=Ut(i,this.size,4);e.uniform4fv(this.addr,t)}function ds(e,i){const t=Ut(i,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function us(e,i){const t=Ut(i,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function ps(e,i){const t=Ut(i,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function hs(e,i){e.uniform1iv(this.addr,i)}function ms(e,i){e.uniform2iv(this.addr,i)}function _s(e,i){e.uniform3iv(this.addr,i)}function gs(e,i){e.uniform4iv(this.addr,i)}function vs(e,i){e.uniform1uiv(this.addr,i)}function Es(e,i){e.uniform2uiv(this.addr,i)}function Ss(e,i){e.uniform3uiv(this.addr,i)}function Ms(e,i){e.uniform4uiv(this.addr,i)}function Ts(e,i,t){const n=this.cache,o=i.length,s=Vt(t,o);je(n,s)||(e.uniform1iv(this.addr,s),Je(n,s));for(let p=0;p!==o;++p)t.setTexture2D(i[p]||Ji,s[p])}function xs(e,i,t){const n=this.cache,o=i.length,s=Vt(t,o);je(n,s)||(e.uniform1iv(this.addr,s),Je(n,s));for(let p=0;p!==o;++p)t.setTexture3D(i[p]||tn,s[p])}function As(e,i,t){const n=this.cache,o=i.length,s=Vt(t,o);je(n,s)||(e.uniform1iv(this.addr,s),Je(n,s));for(let p=0;p!==o;++p)t.setTextureCube(i[p]||nn,s[p])}function Rs(e,i,t){const n=this.cache,o=i.length,s=Vt(t,o);je(n,s)||(e.uniform1iv(this.addr,s),Je(n,s));for(let p=0;p!==o;++p)t.setTexture2DArray(i[p]||en,s[p])}function bs(e){switch(e){case 5126:return ss;case 35664:return ls;case 35665:return cs;case 35666:return fs;case 35674:return ds;case 35675:return us;case 35676:return ps;case 5124:case 35670:return hs;case 35667:case 35671:return ms;case 35668:case 35672:return _s;case 35669:case 35673:return gs;case 5125:return vs;case 36294:return Es;case 36295:return Ss;case 36296:return Ms;case 35678:case 36198:case 36298:case 36306:case 35682:return Ts;case 35679:case 36299:case 36307:return xs;case 35680:case 36300:case 36308:case 36293:return As;case 36289:case 36303:case 36311:case 36292:return Rs}}var Ls=class{constructor(e,i,t){this.id=e,this.addr=t,this.cache=[],this.type=i.type,this.setValue=os(i.type)}},Cs=class{constructor(e,i,t){this.id=e,this.addr=t,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=bs(i.type)}},Ps=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,t){const n=this.seq;for(let o=0,s=n.length;o!==s;++o){const p=n[o];p.setValue(e,i[p.id],t)}}},jt=/(\w+)(\])?(\[|\.)?/g;function Ui(e,i){e.seq.push(i),e.map[i.id]=i}function Us(e,i,t){const n=e.name,o=n.length;for(jt.lastIndex=0;;){const s=jt.exec(n),p=jt.lastIndex;let a=s[1];const v=s[2]==="]",m=s[3];if(v&&(a=a|0),m===void 0||m==="["&&p+2===o){Ui(t,m===void 0?new Ls(a,e,i):new Cs(a,e,i));break}else{let T=t.map[a];T===void 0&&(T=new Ps(a),Ui(t,T)),t=T}}}var Bt=class{constructor(e,i){this.seq=[],this.map={};const t=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let n=0;n<t;++n){const o=e.getActiveUniform(i,n);Us(o,e.getUniformLocation(i,o.name),this)}}setValue(e,i,t,n){const o=this.map[i];o!==void 0&&o.setValue(e,t,n)}setOptional(e,i,t){const n=i[t];n!==void 0&&this.setValue(e,t,n)}static upload(e,i,t,n){for(let o=0,s=i.length;o!==s;++o){const p=i[o],a=t[p.id];a.needsUpdate!==!1&&p.setValue(e,a.value,n)}}static seqWithValue(e,i){const t=[];for(let n=0,o=e.length;n!==o;++n){const s=e[n];s.id in i&&t.push(s)}return t}};function wi(e,i,t){const n=e.createShader(i);return e.shaderSource(n,t),e.compileShader(n),n}var ws=37297,Ds=0;function ys(e,i){const t=e.split(`
`),n=[],o=Math.max(i-6,0),s=Math.min(i+6,t.length);for(let p=o;p<s;p++){const a=p+1;n.push(`${a===i?">":" "} ${a}: ${t[p]}`)}return n.join(`
`)}function Is(e){const i=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(e);let n;switch(i===t?n="":i==="p3"&&t==="rec709"?n="LinearDisplayP3ToLinearSRGB":i==="rec709"&&t==="p3"&&(n="LinearSRGBToLinearDisplayP3"),e){case Dt:case mn:return[n,"LinearTransferOETF"];case Ht:case _n:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),[n,"LinearTransferOETF"]}}function Di(e,i,t){const n=e.getShaderParameter(i,e.COMPILE_STATUS),o=e.getShaderInfoLog(i).trim();if(n&&o==="")return"";const s=/ERROR: 0:(\d+)/.exec(o);if(s){const p=parseInt(s[1]);return t.toUpperCase()+`

`+o+`

`+ys(e.getShaderSource(i),p)}else return o}function Ns(e,i){const t=Is(i);return`vec4 ${e}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Os(e,i){let t;switch(i){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="OptimizedCineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",i),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Fs(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Lt).join(`
`)}function Gs(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Lt).join(`
`)}function Bs(e){const i=[];for(const t in e){const n=e[t];n!==!1&&i.push("#define "+t+" "+n)}return i.join(`
`)}function Hs(e,i){const t={},n=e.getProgramParameter(i,e.ACTIVE_ATTRIBUTES);for(let o=0;o<n;o++){const s=e.getActiveAttrib(i,o),p=s.name;let a=1;s.type===e.FLOAT_MAT2&&(a=2),s.type===e.FLOAT_MAT3&&(a=3),s.type===e.FLOAT_MAT4&&(a=4),t[p]={type:s.type,location:e.getAttribLocation(i,p),locationSize:a}}return t}function Lt(e){return e!==""}function yi(e,i){const t=i.numSpotLightShadows+i.numSpotLightMaps-i.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,i.numDirLights).replace(/NUM_SPOT_LIGHTS/g,i.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,i.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,i.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,i.numPointLights).replace(/NUM_HEMI_LIGHTS/g,i.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,i.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,i.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,i.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,i.numPointLightShadows)}function Ii(e,i){return e.replace(/NUM_CLIPPING_PLANES/g,i.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,i.numClippingPlanes-i.numClipIntersection)}var Vs=/^[ \t]*#include +<([\w\d./]+)>/gm;function ri(e){return e.replace(Vs,zs)}var Ws=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function zs(e,i){let t=Le[i];if(t===void 0){const n=Ws.get(i);if(n!==void 0)t=Le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',i,n);else throw new Error("Can not resolve #include <"+i+">")}return ri(t)}var ks=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ni(e){return e.replace(ks,Xs)}function Xs(e,i,t,n){let o="";for(let s=parseInt(i);s<parseInt(t);s++)o+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return o}function Oi(e){let i="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?i+=`
#define HIGH_PRECISION`:e.precision==="mediump"?i+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(i+=`
#define LOW_PRECISION`),i}function Ys(e){let i="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===1?i="SHADOWMAP_TYPE_PCF":e.shadowMapType===2?i="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===3&&(i="SHADOWMAP_TYPE_VSM"),i}function qs(e){let i="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case 301:case 302:i="ENVMAP_TYPE_CUBE";break;case 306:i="ENVMAP_TYPE_CUBE_UV"}return i}function Ks(e){let i="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===302&&(i="ENVMAP_MODE_REFRACTION"),i}function Zs(e){let i="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case 0:i="ENVMAP_BLENDING_MULTIPLY";break;case 1:i="ENVMAP_BLENDING_MIX";break;case 2:i="ENVMAP_BLENDING_ADD"}return i}function $s(e){const i=e.envMapCubeUVHeight;if(i===null)return null;const t=Math.log2(i)-2,n=1/i;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function js(e,i,t,n){const o=e.getContext(),s=t.defines;let p=t.vertexShader,a=t.fragmentShader;const v=Ys(t),m=qs(t),T=Ks(t),S=Zs(t),M=$s(t),P=t.isWebGL2?"":Fs(t),b=Gs(t),x=Bs(s),c=o.createProgram();let r,h,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Lt).join(`
`),r.length>0&&(r+=`
`),h=[P,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Lt).join(`
`),h.length>0&&(h+=`
`)):(r=[Oi(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+T:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+v:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lt).join(`
`),h=[P,Oi(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+T:"",t.envMap?"#define "+S:"",M?"#define CUBEUV_TEXEL_WIDTH "+M.texelWidth:"",M?"#define CUBEUV_TEXEL_HEIGHT "+M.texelHeight:"",M?"#define CUBEUV_MAX_MIP "+M.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+v:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Le.tonemapping_pars_fragment:"",t.toneMapping!==0?Os("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Le.colorspace_pars_fragment,Ns("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lt).join(`
`)),p=ri(p),p=yi(p,t),p=Ii(p,t),a=ri(a),a=yi(a,t),a=Ii(a,t),p=Ni(p),a=Ni(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,r=[b,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+r,h=["precision mediump sampler2DArray;","#define varying in",t.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const N=E+r+p,O=E+h+a,L=wi(o,o.VERTEX_SHADER,N),F=wi(o,o.FRAGMENT_SHADER,O);o.attachShader(c,L),o.attachShader(c,F),t.index0AttributeName!==void 0?o.bindAttribLocation(c,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(c,0,"position"),o.linkProgram(c);function X(te){if(e.debug.checkShaderErrors){const pe=o.getProgramInfoLog(c).trim(),A=o.getShaderInfoLog(L).trim(),B=o.getShaderInfoLog(F).trim();let H=!0,Z=!0;if(o.getProgramParameter(c,o.LINK_STATUS)===!1)if(H=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(o,c,L,F);else{const z=Di(o,L,"vertex"),W=Di(o,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(c,o.VALIDATE_STATUS)+`

Program Info Log: `+pe+`
`+z+`
`+W)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):(A===""||B==="")&&(Z=!1);Z&&(te.diagnostics={runnable:H,programLog:pe,vertexShader:{log:A,prefix:r},fragmentShader:{log:B,prefix:h}})}o.deleteShader(L),o.deleteShader(F),u=new Bt(o,c),g=Hs(o,c)}let u;this.getUniforms=function(){return u===void 0&&X(this),u};let g;this.getAttributes=function(){return g===void 0&&X(this),g};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=o.getProgramParameter(c,ws)),G},this.destroy=function(){n.releaseStatesOfProgram(this),o.deleteProgram(c),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ds++,this.cacheKey=i,this.usedTimes=1,this.program=c,this.vertexShader=L,this.fragmentShader=F,this}var Js=0,Qs=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,t=e.fragmentShader,n=this._getShaderStage(i),o=this._getShaderStage(t),s=this._getShaderCacheForMaterial(e);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const t of i)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let t=i.get(e);return t===void 0&&(t=new Set,i.set(e,t)),t}_getShaderStage(e){const i=this.shaderCache;let t=i.get(e);return t===void 0&&(t=new el(e),i.set(e,t)),t}},el=class{constructor(e){this.id=Js++,this.code=e,this.usedTimes=0}};function tl(e,i,t,n,o,s,p){const a=new yn,v=new Qs,m=[],T=o.isWebGL2,S=o.logarithmicDepthBuffer,M=o.vertexTextures;let P=o.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(u){return u===0?"uv":`uv${u}`}function c(u,g,G,te,pe){const A=te.fog,B=pe.geometry,H=u.isMeshStandardMaterial?te.environment:null,Z=(u.isMeshStandardMaterial?t:i).get(u.envMap||H),z=Z&&Z.mapping===306?Z.image.height:null,W=b[u.type];u.precision!==null&&(P=o.getMaxPrecision(u.precision),P!==u.precision&&console.warn("THREE.WebGLProgram.getParameters:",u.precision,"not supported, using",P,"instead."));const ne=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=ne!==void 0?ne.length:0;let D=0;B.morphAttributes.position!==void 0&&(D=1),B.morphAttributes.normal!==void 0&&(D=2),B.morphAttributes.color!==void 0&&(D=3);let V,ae,ce,ve;if(W){const Ye=pt[W];V=Ye.vertexShader,ae=Ye.fragmentShader}else V=u.vertexShader,ae=u.fragmentShader,v.update(u),ce=v.getVertexShaderID(u),ve=v.getFragmentShaderID(u);const Ee=e.getRenderTarget(),we=pe.isInstancedMesh===!0,Se=pe.isBatchedMesh===!0,Be=!!u.map,C=!!u.matcap,it=!!Z,Oe=!!u.aoMap,de=!!u.lightMap,ge=!!u.bumpMap,Ae=!!u.normalMap,Ie=!!u.displacementMap,Pe=!!u.emissiveMap,d=!!u.metalnessMap,l=!!u.roughnessMap,w=u.anisotropy>0,K=u.clearcoat>0,k=u.iridescence>0,Y=u.sheen>0,me=u.transmission>0,ie=w&&!!u.anisotropyMap,oe=K&&!!u.clearcoatMap,fe=K&&!!u.clearcoatNormalMap,Re=K&&!!u.clearcoatRoughnessMap,q=k&&!!u.iridescenceMap,Ke=k&&!!u.iridescenceThicknessMap,De=Y&&!!u.sheenColorMap,Te=Y&&!!u.sheenRoughnessMap,se=!!u.specularMap,le=!!u.specularColorMap,ye=!!u.specularIntensityMap,Ve=me&&!!u.transmissionMap,Fe=me&&!!u.thicknessMap,We=!!u.gradientMap,$=!!u.alphaMap,_=u.alphaTest>0,j=!!u.alphaHash,re=!!u.extensions,xe=!!B.attributes.uv1,he=!!B.attributes.uv2,ze=!!B.attributes.uv3;let ke=0;return u.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(ke=e.toneMapping),{isWebGL2:T,shaderID:W,shaderType:u.type,shaderName:u.name,vertexShader:V,fragmentShader:ae,defines:u.defines,customVertexShaderID:ce,customFragmentShaderID:ve,isRawShaderMaterial:u.isRawShaderMaterial===!0,glslVersion:u.glslVersion,precision:P,batching:Se,instancing:we,instancingColor:we&&pe.instanceColor!==null,supportsVertexTextures:M,outputColorSpace:Ee===null?e.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:Dt,map:Be,matcap:C,envMap:it,envMapMode:it&&Z.mapping,envMapCubeUVHeight:z,aoMap:Oe,lightMap:de,bumpMap:ge,normalMap:Ae,displacementMap:M&&Ie,emissiveMap:Pe,normalMapObjectSpace:Ae&&u.normalMapType===1,normalMapTangentSpace:Ae&&u.normalMapType===0,metalnessMap:d,roughnessMap:l,anisotropy:w,anisotropyMap:ie,clearcoat:K,clearcoatMap:oe,clearcoatNormalMap:fe,clearcoatRoughnessMap:Re,iridescence:k,iridescenceMap:q,iridescenceThicknessMap:Ke,sheen:Y,sheenColorMap:De,sheenRoughnessMap:Te,specularMap:se,specularColorMap:le,specularIntensityMap:ye,transmission:me,transmissionMap:Ve,thicknessMap:Fe,gradientMap:We,opaque:u.transparent===!1&&u.blending===1,alphaMap:$,alphaTest:_,alphaHash:j,combine:u.combine,mapUv:Be&&x(u.map.channel),aoMapUv:Oe&&x(u.aoMap.channel),lightMapUv:de&&x(u.lightMap.channel),bumpMapUv:ge&&x(u.bumpMap.channel),normalMapUv:Ae&&x(u.normalMap.channel),displacementMapUv:Ie&&x(u.displacementMap.channel),emissiveMapUv:Pe&&x(u.emissiveMap.channel),metalnessMapUv:d&&x(u.metalnessMap.channel),roughnessMapUv:l&&x(u.roughnessMap.channel),anisotropyMapUv:ie&&x(u.anisotropyMap.channel),clearcoatMapUv:oe&&x(u.clearcoatMap.channel),clearcoatNormalMapUv:fe&&x(u.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&x(u.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(u.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&x(u.iridescenceThicknessMap.channel),sheenColorMapUv:De&&x(u.sheenColorMap.channel),sheenRoughnessMapUv:Te&&x(u.sheenRoughnessMap.channel),specularMapUv:se&&x(u.specularMap.channel),specularColorMapUv:le&&x(u.specularColorMap.channel),specularIntensityMapUv:ye&&x(u.specularIntensityMap.channel),transmissionMapUv:Ve&&x(u.transmissionMap.channel),thicknessMapUv:Fe&&x(u.thicknessMap.channel),alphaMapUv:$&&x(u.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ae||w),vertexColors:u.vertexColors,vertexAlphas:u.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:xe,vertexUv2s:he,vertexUv3s:ze,pointsUvs:pe.isPoints===!0&&!!B.attributes.uv&&(Be||$),fog:!!A,useFog:u.fog===!0,fogExp2:A&&A.isFogExp2,flatShading:u.flatShading===!0,sizeAttenuation:u.sizeAttenuation===!0,logarithmicDepthBuffer:S,skinning:pe.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:D,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:p.numPlanes,numClipIntersection:p.numIntersection,dithering:u.dithering,shadowMapEnabled:e.shadowMap.enabled&&G.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,useLegacyLights:e._useLegacyLights,decodeVideoTexture:Be&&u.map.isVideoTexture===!0&&tt.getTransfer(u.map.colorSpace)==="srgb",premultipliedAlpha:u.premultipliedAlpha,doubleSided:u.side===2,flipSided:u.side===1,useDepthPacking:u.depthPacking>=0,depthPacking:u.depthPacking||0,index0AttributeName:u.index0AttributeName,extensionDerivatives:re&&u.extensions.derivatives===!0,extensionFragDepth:re&&u.extensions.fragDepth===!0,extensionDrawBuffers:re&&u.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&u.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&u.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:T||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:T||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:T||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:u.customProgramCacheKey()}}function r(u){const g=[];if(u.shaderID?g.push(u.shaderID):(g.push(u.customVertexShaderID),g.push(u.customFragmentShaderID)),u.defines!==void 0)for(const G in u.defines)g.push(G),g.push(u.defines[G]);return u.isRawShaderMaterial===!1&&(h(g,u),E(g,u),g.push(e.outputColorSpace)),g.push(u.customProgramCacheKey),g.join()}function h(u,g){u.push(g.precision),u.push(g.outputColorSpace),u.push(g.envMapMode),u.push(g.envMapCubeUVHeight),u.push(g.mapUv),u.push(g.alphaMapUv),u.push(g.lightMapUv),u.push(g.aoMapUv),u.push(g.bumpMapUv),u.push(g.normalMapUv),u.push(g.displacementMapUv),u.push(g.emissiveMapUv),u.push(g.metalnessMapUv),u.push(g.roughnessMapUv),u.push(g.anisotropyMapUv),u.push(g.clearcoatMapUv),u.push(g.clearcoatNormalMapUv),u.push(g.clearcoatRoughnessMapUv),u.push(g.iridescenceMapUv),u.push(g.iridescenceThicknessMapUv),u.push(g.sheenColorMapUv),u.push(g.sheenRoughnessMapUv),u.push(g.specularMapUv),u.push(g.specularColorMapUv),u.push(g.specularIntensityMapUv),u.push(g.transmissionMapUv),u.push(g.thicknessMapUv),u.push(g.combine),u.push(g.fogExp2),u.push(g.sizeAttenuation),u.push(g.morphTargetsCount),u.push(g.morphAttributeCount),u.push(g.numDirLights),u.push(g.numPointLights),u.push(g.numSpotLights),u.push(g.numSpotLightMaps),u.push(g.numHemiLights),u.push(g.numRectAreaLights),u.push(g.numDirLightShadows),u.push(g.numPointLightShadows),u.push(g.numSpotLightShadows),u.push(g.numSpotLightShadowsWithMaps),u.push(g.numLightProbes),u.push(g.shadowMapType),u.push(g.toneMapping),u.push(g.numClippingPlanes),u.push(g.numClipIntersection),u.push(g.depthPacking)}function E(u,g){a.disableAll(),g.isWebGL2&&a.enable(0),g.supportsVertexTextures&&a.enable(1),g.instancing&&a.enable(2),g.instancingColor&&a.enable(3),g.matcap&&a.enable(4),g.envMap&&a.enable(5),g.normalMapObjectSpace&&a.enable(6),g.normalMapTangentSpace&&a.enable(7),g.clearcoat&&a.enable(8),g.iridescence&&a.enable(9),g.alphaTest&&a.enable(10),g.vertexColors&&a.enable(11),g.vertexAlphas&&a.enable(12),g.vertexUv1s&&a.enable(13),g.vertexUv2s&&a.enable(14),g.vertexUv3s&&a.enable(15),g.vertexTangents&&a.enable(16),g.anisotropy&&a.enable(17),g.alphaHash&&a.enable(18),g.batching&&a.enable(19),u.push(a.mask),a.disableAll(),g.fog&&a.enable(0),g.useFog&&a.enable(1),g.flatShading&&a.enable(2),g.logarithmicDepthBuffer&&a.enable(3),g.skinning&&a.enable(4),g.morphTargets&&a.enable(5),g.morphNormals&&a.enable(6),g.morphColors&&a.enable(7),g.premultipliedAlpha&&a.enable(8),g.shadowMapEnabled&&a.enable(9),g.useLegacyLights&&a.enable(10),g.doubleSided&&a.enable(11),g.flipSided&&a.enable(12),g.useDepthPacking&&a.enable(13),g.dithering&&a.enable(14),g.transmission&&a.enable(15),g.sheen&&a.enable(16),g.opaque&&a.enable(17),g.pointsUvs&&a.enable(18),g.decodeVideoTexture&&a.enable(19),u.push(a.mask)}function N(u){const g=b[u.type];let G;if(g){const te=pt[g];G=Fn.clone(te.uniforms)}else G=u.uniforms;return G}function O(u,g){let G;for(let te=0,pe=m.length;te<pe;te++){const A=m[te];if(A.cacheKey===g){G=A,++G.usedTimes;break}}return G===void 0&&(G=new js(e,g,u,s),m.push(G)),G}function L(u){if(--u.usedTimes===0){const g=m.indexOf(u);m[g]=m[m.length-1],m.pop(),u.destroy()}}function F(u){v.remove(u)}function X(){v.dispose()}return{getParameters:c,getProgramCacheKey:r,getUniforms:N,acquireProgram:O,releaseProgram:L,releaseShaderCache:F,programs:m,dispose:X}}function il(){let e=new WeakMap;function i(s){let p=e.get(s);return p===void 0&&(p={},e.set(s,p)),p}function t(s){e.delete(s)}function n(s,p,a){e.get(s)[p]=a}function o(){e=new WeakMap}return{get:i,remove:t,update:n,dispose:o}}function nl(e,i){return e.groupOrder!==i.groupOrder?e.groupOrder-i.groupOrder:e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.material.id!==i.material.id?e.material.id-i.material.id:e.z!==i.z?e.z-i.z:e.id-i.id}function Fi(e,i){return e.groupOrder!==i.groupOrder?e.groupOrder-i.groupOrder:e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.z!==i.z?i.z-e.z:e.id-i.id}function Gi(){const e=[];let i=0;const t=[],n=[],o=[];function s(){i=0,t.length=0,n.length=0,o.length=0}function p(S,M,P,b,x,c){let r=e[i];return r===void 0?(r={id:S.id,object:S,geometry:M,material:P,groupOrder:b,renderOrder:S.renderOrder,z:x,group:c},e[i]=r):(r.id=S.id,r.object=S,r.geometry=M,r.material=P,r.groupOrder=b,r.renderOrder=S.renderOrder,r.z=x,r.group=c),i++,r}function a(S,M,P,b,x,c){const r=p(S,M,P,b,x,c);P.transmission>0?n.push(r):P.transparent===!0?o.push(r):t.push(r)}function v(S,M,P,b,x,c){const r=p(S,M,P,b,x,c);P.transmission>0?n.unshift(r):P.transparent===!0?o.unshift(r):t.unshift(r)}function m(S,M){t.length>1&&t.sort(S||nl),n.length>1&&n.sort(M||Fi),o.length>1&&o.sort(M||Fi)}function T(){for(let S=i,M=e.length;S<M;S++){const P=e[S];if(P.id===null)break;P.id=null,P.object=null,P.geometry=null,P.material=null,P.group=null}}return{opaque:t,transmissive:n,transparent:o,init:s,push:a,unshift:v,finish:T,sort:m}}function rl(){let e=new WeakMap;function i(n,o){const s=e.get(n);let p;return s===void 0?(p=new Gi,e.set(n,[p])):o>=s.length?(p=new Gi,s.push(p)):p=s[o],p}function t(){e=new WeakMap}return{get:i,dispose:t}}function al(){const e={};return{get:function(i){if(e[i.id]!==void 0)return e[i.id];let t;switch(i.type){case"DirectionalLight":t={direction:new He,color:new Ze};break;case"SpotLight":t={position:new He,direction:new He,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new He,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new He,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new He,halfWidth:new He,halfHeight:new He}}return e[i.id]=t,t}}}function ol(){const e={};return{get:function(i){if(e[i.id]!==void 0)return e[i.id];let t;switch(i.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3}}return e[i.id]=t,t}}}var sl=0;function ll(e,i){return(i.castShadow?2:0)-(e.castShadow?2:0)+(i.map?1:0)-(e.map?1:0)}function cl(e,i){const t=new al,n=ol(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let T=0;T<9;T++)o.probe.push(new He);const s=new He,p=new ii,a=new ii;function v(T,S){let M=0,P=0,b=0;for(let te=0;te<9;te++)o.probe[te].set(0,0,0);let x=0,c=0,r=0,h=0,E=0,N=0,O=0,L=0,F=0,X=0,u=0;T.sort(ll);const g=S===!0?Math.PI:1;for(let te=0,pe=T.length;te<pe;te++){const A=T[te],B=A.color,H=A.intensity,Z=A.distance,z=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)M+=B.r*H*g,P+=B.g*H*g,b+=B.b*H*g;else if(A.isLightProbe){for(let W=0;W<9;W++)o.probe[W].addScaledVector(A.sh.coefficients[W],H);u++}else if(A.isDirectionalLight){const W=t.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity*g),A.castShadow){const ne=A.shadow,ee=n.get(A);ee.shadowBias=ne.bias,ee.shadowNormalBias=ne.normalBias,ee.shadowRadius=ne.radius,ee.shadowMapSize=ne.mapSize,o.directionalShadow[x]=ee,o.directionalShadowMap[x]=z,o.directionalShadowMatrix[x]=A.shadow.matrix,N++}o.directional[x]=W,x++}else if(A.isSpotLight){const W=t.get(A);W.position.setFromMatrixPosition(A.matrixWorld),W.color.copy(B).multiplyScalar(H*g),W.distance=Z,W.coneCos=Math.cos(A.angle),W.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),W.decay=A.decay,o.spot[r]=W;const ne=A.shadow;if(A.map&&(o.spotLightMap[F]=A.map,F++,ne.updateMatrices(A),A.castShadow&&X++),o.spotLightMatrix[r]=ne.matrix,A.castShadow){const ee=n.get(A);ee.shadowBias=ne.bias,ee.shadowNormalBias=ne.normalBias,ee.shadowRadius=ne.radius,ee.shadowMapSize=ne.mapSize,o.spotShadow[r]=ee,o.spotShadowMap[r]=z,L++}r++}else if(A.isRectAreaLight){const W=t.get(A);W.color.copy(B).multiplyScalar(H),W.halfWidth.set(A.width*.5,0,0),W.halfHeight.set(0,A.height*.5,0),o.rectArea[h]=W,h++}else if(A.isPointLight){const W=t.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity*g),W.distance=A.distance,W.decay=A.decay,A.castShadow){const ne=A.shadow,ee=n.get(A);ee.shadowBias=ne.bias,ee.shadowNormalBias=ne.normalBias,ee.shadowRadius=ne.radius,ee.shadowMapSize=ne.mapSize,ee.shadowCameraNear=ne.camera.near,ee.shadowCameraFar=ne.camera.far,o.pointShadow[c]=ee,o.pointShadowMap[c]=z,o.pointShadowMatrix[c]=A.shadow.matrix,O++}o.point[c]=W,c++}else if(A.isHemisphereLight){const W=t.get(A);W.skyColor.copy(A.color).multiplyScalar(H*g),W.groundColor.copy(A.groundColor).multiplyScalar(H*g),o.hemi[E]=W,E++}}h>0&&(i.isWebGL2?e.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=J.LTC_FLOAT_1,o.rectAreaLTC2=J.LTC_FLOAT_2):(o.rectAreaLTC1=J.LTC_HALF_1,o.rectAreaLTC2=J.LTC_HALF_2):e.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=J.LTC_FLOAT_1,o.rectAreaLTC2=J.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=J.LTC_HALF_1,o.rectAreaLTC2=J.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=M,o.ambient[1]=P,o.ambient[2]=b;const G=o.hash;(G.directionalLength!==x||G.pointLength!==c||G.spotLength!==r||G.rectAreaLength!==h||G.hemiLength!==E||G.numDirectionalShadows!==N||G.numPointShadows!==O||G.numSpotShadows!==L||G.numSpotMaps!==F||G.numLightProbes!==u)&&(o.directional.length=x,o.spot.length=r,o.rectArea.length=h,o.point.length=c,o.hemi.length=E,o.directionalShadow.length=N,o.directionalShadowMap.length=N,o.pointShadow.length=O,o.pointShadowMap.length=O,o.spotShadow.length=L,o.spotShadowMap.length=L,o.directionalShadowMatrix.length=N,o.pointShadowMatrix.length=O,o.spotLightMatrix.length=L+F-X,o.spotLightMap.length=F,o.numSpotLightShadowsWithMaps=X,o.numLightProbes=u,G.directionalLength=x,G.pointLength=c,G.spotLength=r,G.rectAreaLength=h,G.hemiLength=E,G.numDirectionalShadows=N,G.numPointShadows=O,G.numSpotShadows=L,G.numSpotMaps=F,G.numLightProbes=u,o.version=sl++)}function m(T,S){let M=0,P=0,b=0,x=0,c=0;const r=S.matrixWorldInverse;for(let h=0,E=T.length;h<E;h++){const N=T[h];if(N.isDirectionalLight){const O=o.directional[M];O.direction.setFromMatrixPosition(N.matrixWorld),s.setFromMatrixPosition(N.target.matrixWorld),O.direction.sub(s),O.direction.transformDirection(r),M++}else if(N.isSpotLight){const O=o.spot[b];O.position.setFromMatrixPosition(N.matrixWorld),O.position.applyMatrix4(r),O.direction.setFromMatrixPosition(N.matrixWorld),s.setFromMatrixPosition(N.target.matrixWorld),O.direction.sub(s),O.direction.transformDirection(r),b++}else if(N.isRectAreaLight){const O=o.rectArea[x];O.position.setFromMatrixPosition(N.matrixWorld),O.position.applyMatrix4(r),a.identity(),p.copy(N.matrixWorld),p.premultiply(r),a.extractRotation(p),O.halfWidth.set(N.width*.5,0,0),O.halfHeight.set(0,N.height*.5,0),O.halfWidth.applyMatrix4(a),O.halfHeight.applyMatrix4(a),x++}else if(N.isPointLight){const O=o.point[P];O.position.setFromMatrixPosition(N.matrixWorld),O.position.applyMatrix4(r),P++}else if(N.isHemisphereLight){const O=o.hemi[c];O.direction.setFromMatrixPosition(N.matrixWorld),O.direction.transformDirection(r),c++}}}return{setup:v,setupView:m,state:o}}function Bi(e,i){const t=new cl(e,i),n=[],o=[];function s(){n.length=0,o.length=0}function p(T){n.push(T)}function a(T){o.push(T)}function v(T){t.setup(n,T)}function m(T){t.setupView(n,T)}return{init:s,state:{lightsArray:n,shadowsArray:o,lights:t},setupLights:v,setupLightsView:m,pushLight:p,pushShadow:a}}function fl(e,i){let t=new WeakMap;function n(s,p=0){const a=t.get(s);let v;return a===void 0?(v=new Bi(e,i),t.set(s,[v])):p>=a.length?(v=new Bi(e,i),a.push(v)):v=a[p],v}function o(){t=new WeakMap}return{get:n,dispose:o}}var dl=class extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fn,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ul=class extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},pl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,hl=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`;function ml(e,i,t){let n=new Xi;const o=new ct,s=new ct,p=new at,a=new dl({depthPacking:Rn}),v=new ul,m={},T=t.maxTextureSize,S={0:1,1:0,2:2},M=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:pl,fragmentShader:hl}),P=M.clone();P.defines.HORIZONTAL_PASS=1;const b=new li;b.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new _t(b,M),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let r=this.type;this.render=function(L,F,X){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||L.length===0)return;const u=e.getRenderTarget(),g=e.getActiveCubeFace(),G=e.getActiveMipmapLevel(),te=e.state;te.setBlending(0),te.buffers.color.setClear(1,1,1,1),te.buffers.depth.setTest(!0),te.setScissorTest(!1);const pe=r!==3&&this.type===3,A=r===3&&this.type!==3;for(let B=0,H=L.length;B<H;B++){const Z=L[B],z=Z.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;o.copy(z.mapSize);const W=z.getFrameExtents();if(o.multiply(W),s.copy(z.mapSize),(o.x>T||o.y>T)&&(o.x>T&&(s.x=Math.floor(T/W.x),o.x=s.x*W.x,z.mapSize.x=s.x),o.y>T&&(s.y=Math.floor(T/W.y),o.y=s.y*W.y,z.mapSize.y=s.y)),z.map===null||pe===!0||A===!0){const ee=this.type!==3?{minFilter:mt,magFilter:mt}:{};z.map!==null&&z.map.dispose(),z.map=new St(o.x,o.y,ee),z.map.texture.name=Z.name+".shadowMap",z.camera.updateProjectionMatrix()}e.setRenderTarget(z.map),e.clear();const ne=z.getViewportCount();for(let ee=0;ee<ne;ee++){const D=z.getViewport(ee);p.set(s.x*D.x,s.y*D.y,s.x*D.z,s.y*D.w),te.viewport(p),z.updateMatrices(Z,ee),n=z.getFrustum(),N(F,X,z.camera,Z,this.type)}z.isPointLightShadow!==!0&&this.type===3&&h(z,X),z.needsUpdate=!1}r=this.type,c.needsUpdate=!1,e.setRenderTarget(u,g,G)};function h(L,F){const X=i.update(x);M.defines.VSM_SAMPLES!==L.blurSamples&&(M.defines.VSM_SAMPLES=L.blurSamples,P.defines.VSM_SAMPLES=L.blurSamples,M.needsUpdate=!0,P.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new St(o.x,o.y)),M.uniforms.shadow_pass.value=L.map.texture,M.uniforms.resolution.value=L.mapSize,M.uniforms.radius.value=L.radius,e.setRenderTarget(L.mapPass),e.clear(),e.renderBufferDirect(F,null,X,M,x,null),P.uniforms.shadow_pass.value=L.mapPass.texture,P.uniforms.resolution.value=L.mapSize,P.uniforms.radius.value=L.radius,e.setRenderTarget(L.map),e.clear(),e.renderBufferDirect(F,null,X,P,x,null)}function E(L,F,X,u){let g=null;const G=X.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(G!==void 0)g=G;else if(g=X.isPointLight===!0?v:a,e.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0){const te=g.uuid,pe=F.uuid;let A=m[te];A===void 0&&(A={},m[te]=A);let B=A[pe];B===void 0&&(B=g.clone(),A[pe]=B,F.addEventListener("dispose",O)),g=B}if(g.visible=F.visible,g.wireframe=F.wireframe,u===3?g.side=F.shadowSide!==null?F.shadowSide:F.side:g.side=F.shadowSide!==null?F.shadowSide:S[F.side],g.alphaMap=F.alphaMap,g.alphaTest=F.alphaTest,g.map=F.map,g.clipShadows=F.clipShadows,g.clippingPlanes=F.clippingPlanes,g.clipIntersection=F.clipIntersection,g.displacementMap=F.displacementMap,g.displacementScale=F.displacementScale,g.displacementBias=F.displacementBias,g.wireframeLinewidth=F.wireframeLinewidth,g.linewidth=F.linewidth,X.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const te=e.properties.get(g);te.light=X}return g}function N(L,F,X,u,g){if(L.visible===!1)return;if(L.layers.test(F.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&g===3)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,L.matrixWorld);const te=i.update(L),pe=L.material;if(Array.isArray(pe)){const A=te.groups;for(let B=0,H=A.length;B<H;B++){const Z=A[B],z=pe[Z.materialIndex];if(z&&z.visible){const W=E(L,z,u,g);L.onBeforeShadow(e,L,F,X,te,W,Z),e.renderBufferDirect(X,null,te,W,L,Z),L.onAfterShadow(e,L,F,X,te,W,Z)}}}else if(pe.visible){const A=E(L,pe,u,g);L.onBeforeShadow(e,L,F,X,te,A,null),e.renderBufferDirect(X,null,te,A,L,null),L.onAfterShadow(e,L,F,X,te,A,null)}}const G=L.children;for(let te=0,pe=G.length;te<pe;te++)N(G[te],F,X,u,g)}function O(L){L.target.removeEventListener("dispose",O);for(const F in m){const X=m[F],u=L.target.uuid;u in X&&(X[u].dispose(),delete X[u])}}}function _l(e,i,t){const n=t.isWebGL2;function o(){let _=!1;const j=new at;let re=null;const xe=new at(0,0,0,0);return{setMask:function(he){re!==he&&!_&&(e.colorMask(he,he,he,he),re=he)},setLocked:function(he){_=he},setClear:function(he,ze,ke,Ye,ot){ot===!0&&(he*=Ye,ze*=Ye,ke*=Ye),j.set(he,ze,ke,Ye),xe.equals(j)===!1&&(e.clearColor(he,ze,ke,Ye),xe.copy(j))},reset:function(){_=!1,re=null,xe.set(-1,0,0,0)}}}function s(){let _=!1,j=null,re=null,xe=null;return{setTest:function(he){he?Se(e.DEPTH_TEST):Be(e.DEPTH_TEST)},setMask:function(he){j!==he&&!_&&(e.depthMask(he),j=he)},setFunc:function(he){if(re!==he){switch(he){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}re=he}},setLocked:function(he){_=he},setClear:function(he){xe!==he&&(e.clearDepth(he),xe=he)},reset:function(){_=!1,j=null,re=null,xe=null}}}function p(){let _=!1,j=null,re=null,xe=null,he=null,ze=null,ke=null,Ye=null,ot=null;return{setTest:function(Ge){_||(Ge?Se(e.STENCIL_TEST):Be(e.STENCIL_TEST))},setMask:function(Ge){j!==Ge&&!_&&(e.stencilMask(Ge),j=Ge)},setFunc:function(Ge,dt,ut){(re!==Ge||xe!==dt||he!==ut)&&(e.stencilFunc(Ge,dt,ut),re=Ge,xe=dt,he=ut)},setOp:function(Ge,dt,ut){(ze!==Ge||ke!==dt||Ye!==ut)&&(e.stencilOp(Ge,dt,ut),ze=Ge,ke=dt,Ye=ut)},setLocked:function(Ge){_=Ge},setClear:function(Ge){ot!==Ge&&(e.clearStencil(Ge),ot=Ge)},reset:function(){_=!1,j=null,re=null,xe=null,he=null,ze=null,ke=null,Ye=null,ot=null}}}const a=new o,v=new s,m=new p,T=new WeakMap,S=new WeakMap;let M={},P={},b=new WeakMap,x=[],c=null,r=!1,h=null,E=null,N=null,O=null,L=null,F=null,X=null,u=new Ze(0,0,0),g=0,G=!1,te=null,pe=null,A=null,B=null,H=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,W=0;const ne=e.getParameter(e.VERSION);ne.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(ne)[1]),z=W>=1):ne.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),z=W>=2);let ee=null,D={};const V=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),ce=new at().fromArray(V),ve=new at().fromArray(ae);function Ee(_,j,re,xe){const he=new Uint8Array(4),ze=e.createTexture();e.bindTexture(_,ze),e.texParameteri(_,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(_,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ke=0;ke<re;ke++)n&&(_===e.TEXTURE_3D||_===e.TEXTURE_2D_ARRAY)?e.texImage3D(j,0,e.RGBA,1,1,xe,0,e.RGBA,e.UNSIGNED_BYTE,he):e.texImage2D(j+ke,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,he);return ze}const we={};we[e.TEXTURE_2D]=Ee(e.TEXTURE_2D,e.TEXTURE_2D,1),we[e.TEXTURE_CUBE_MAP]=Ee(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(we[e.TEXTURE_2D_ARRAY]=Ee(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),we[e.TEXTURE_3D]=Ee(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),v.setClear(1),m.setClear(0),Se(e.DEPTH_TEST),v.setFunc(3),Pe(!1),d(1),Se(e.CULL_FACE),Ae(0);function Se(_){M[_]!==!0&&(e.enable(_),M[_]=!0)}function Be(_){M[_]!==!1&&(e.disable(_),M[_]=!1)}function C(_,j){return P[_]!==j?(e.bindFramebuffer(_,j),P[_]=j,n&&(_===e.DRAW_FRAMEBUFFER&&(P[e.FRAMEBUFFER]=j),_===e.FRAMEBUFFER&&(P[e.DRAW_FRAMEBUFFER]=j)),!0):!1}function it(_,j){let re=x,xe=!1;if(_)if(re=b.get(j),re===void 0&&(re=[],b.set(j,re)),_.isWebGLMultipleRenderTargets){const he=_.texture;if(re.length!==he.length||re[0]!==e.COLOR_ATTACHMENT0){for(let ze=0,ke=he.length;ze<ke;ze++)re[ze]=e.COLOR_ATTACHMENT0+ze;re.length=he.length,xe=!0}}else re[0]!==e.COLOR_ATTACHMENT0&&(re[0]=e.COLOR_ATTACHMENT0,xe=!0);else re[0]!==e.BACK&&(re[0]=e.BACK,xe=!0);xe&&(t.isWebGL2?e.drawBuffers(re):i.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Oe(_){return c!==_?(e.useProgram(_),c=_,!0):!1}const de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};if(n)de[103]=e.MIN,de[104]=e.MAX;else{const _=i.get("EXT_blend_minmax");_!==null&&(de[103]=_.MIN_EXT,de[104]=_.MAX_EXT)}const ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function Ae(_,j,re,xe,he,ze,ke,Ye,ot,Ge){if(_===0){r===!0&&(Be(e.BLEND),r=!1);return}if(r===!1&&(Se(e.BLEND),r=!0),_!==5){if(_!==h||Ge!==G){if((E!==100||L!==100)&&(e.blendEquation(e.FUNC_ADD),E=100,L=100),Ge)switch(_){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",_)}else switch(_){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",_)}N=null,O=null,F=null,X=null,u.set(0,0,0),g=0,h=_,G=Ge}return}he=he||j,ze=ze||re,ke=ke||xe,(j!==E||he!==L)&&(e.blendEquationSeparate(de[j],de[he]),E=j,L=he),(re!==N||xe!==O||ze!==F||ke!==X)&&(e.blendFuncSeparate(ge[re],ge[xe],ge[ze],ge[ke]),N=re,O=xe,F=ze,X=ke),(Ye.equals(u)===!1||ot!==g)&&(e.blendColor(Ye.r,Ye.g,Ye.b,ot),u.copy(Ye),g=ot),h=_,G=!1}function Ie(_,j){_.side===2?Be(e.CULL_FACE):Se(e.CULL_FACE);let re=_.side===1;j&&(re=!re),Pe(re),_.blending===1&&_.transparent===!1?Ae(0):Ae(_.blending,_.blendEquation,_.blendSrc,_.blendDst,_.blendEquationAlpha,_.blendSrcAlpha,_.blendDstAlpha,_.blendColor,_.blendAlpha,_.premultipliedAlpha),v.setFunc(_.depthFunc),v.setTest(_.depthTest),v.setMask(_.depthWrite),a.setMask(_.colorWrite);const xe=_.stencilWrite;m.setTest(xe),xe&&(m.setMask(_.stencilWriteMask),m.setFunc(_.stencilFunc,_.stencilRef,_.stencilFuncMask),m.setOp(_.stencilFail,_.stencilZFail,_.stencilZPass)),w(_.polygonOffset,_.polygonOffsetFactor,_.polygonOffsetUnits),_.alphaToCoverage===!0?Se(e.SAMPLE_ALPHA_TO_COVERAGE):Be(e.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(_){te!==_&&(_?e.frontFace(e.CW):e.frontFace(e.CCW),te=_)}function d(_){_!==0?(Se(e.CULL_FACE),_!==pe&&(_===1?e.cullFace(e.BACK):_===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Be(e.CULL_FACE),pe=_}function l(_){_!==A&&(z&&e.lineWidth(_),A=_)}function w(_,j,re){_?(Se(e.POLYGON_OFFSET_FILL),(B!==j||H!==re)&&(e.polygonOffset(j,re),B=j,H=re)):Be(e.POLYGON_OFFSET_FILL)}function K(_){_?Se(e.SCISSOR_TEST):Be(e.SCISSOR_TEST)}function k(_){_===void 0&&(_=e.TEXTURE0+Z-1),ee!==_&&(e.activeTexture(_),ee=_)}function Y(_,j,re){re===void 0&&(ee===null?re=e.TEXTURE0+Z-1:re=ee);let xe=D[re];xe===void 0&&(xe={type:void 0,texture:void 0},D[re]=xe),(xe.type!==_||xe.texture!==j)&&(ee!==re&&(e.activeTexture(re),ee=re),e.bindTexture(_,j||we[_]),xe.type=_,xe.texture=j)}function me(){const _=D[ee];_!==void 0&&_.type!==void 0&&(e.bindTexture(_.type,null),_.type=void 0,_.texture=void 0)}function ie(){try{e.compressedTexImage2D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function oe(){try{e.compressedTexImage3D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function fe(){try{e.texSubImage2D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Re(){try{e.texSubImage3D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function q(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Ke(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function De(){try{e.texStorage2D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Te(){try{e.texStorage3D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function se(){try{e.texImage2D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function le(){try{e.texImage3D.apply(e,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function ye(_){ce.equals(_)===!1&&(e.scissor(_.x,_.y,_.z,_.w),ce.copy(_))}function Ve(_){ve.equals(_)===!1&&(e.viewport(_.x,_.y,_.z,_.w),ve.copy(_))}function Fe(_,j){let re=S.get(j);re===void 0&&(re=new WeakMap,S.set(j,re));let xe=re.get(_);xe===void 0&&(xe=e.getUniformBlockIndex(j,_.name),re.set(_,xe))}function We(_,j){const re=S.get(j).get(_);T.get(j)!==re&&(e.uniformBlockBinding(j,re,_.__bindingPointIndex),T.set(j,re))}function $(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),n===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),M={},ee=null,D={},P={},b=new WeakMap,x=[],c=null,r=!1,h=null,E=null,N=null,O=null,L=null,F=null,X=null,u=new Ze(0,0,0),g=0,G=!1,te=null,pe=null,A=null,B=null,H=null,ce.set(0,0,e.canvas.width,e.canvas.height),ve.set(0,0,e.canvas.width,e.canvas.height),a.reset(),v.reset(),m.reset()}return{buffers:{color:a,depth:v,stencil:m},enable:Se,disable:Be,bindFramebuffer:C,drawBuffers:it,useProgram:Oe,setBlending:Ae,setMaterial:Ie,setFlipSided:Pe,setCullFace:d,setLineWidth:l,setPolygonOffset:w,setScissorTest:K,activeTexture:k,bindTexture:Y,unbindTexture:me,compressedTexImage2D:ie,compressedTexImage3D:oe,texImage2D:se,texImage3D:le,updateUBOMapping:Fe,uniformBlockBinding:We,texStorage2D:De,texStorage3D:Te,texSubImage2D:fe,texSubImage3D:Re,compressedTexSubImage2D:q,compressedTexSubImage3D:Ke,scissor:ye,viewport:Ve,reset:$}}function gl(e,i,t,n,o,s,p){const a=o.isWebGL2,v=i.has("WEBGL_multisampled_render_to_texture")?i.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),T=new WeakMap;let S;const M=new WeakMap;let P=!1;try{P=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(d,l){return P?new OffscreenCanvas(d,l):Cn("canvas")}function x(d,l,w,K){let k=1;if((d.width>K||d.height>K)&&(k=K/Math.max(d.width,d.height)),k<1||l===!0)if(typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&d instanceof ImageBitmap){const Y=l?ei:Math.floor,me=Y(k*d.width),ie=Y(k*d.height);S===void 0&&(S=b(me,ie));const oe=w?b(me,ie):S;return oe.width=me,oe.height=ie,oe.getContext("2d").drawImage(d,0,0,me,ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+d.width+"x"+d.height+") to ("+me+"x"+ie+")."),oe}else return"data"in d&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+d.width+"x"+d.height+")."),d;return d}function c(d){return gi(d.width)&&gi(d.height)}function r(d){return a?!1:d.wrapS!==1001||d.wrapT!==1001||d.minFilter!==1003&&d.minFilter!==1006}function h(d,l){return d.generateMipmaps&&l&&d.minFilter!==1003&&d.minFilter!==1006}function E(d){e.generateMipmap(d)}function N(d,l,w,K,k=!1){if(a===!1)return l;if(d!==null){if(e[d]!==void 0)return e[d];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+d+"'")}let Y=l;if(l===e.RED&&(w===e.FLOAT&&(Y=e.R32F),w===e.HALF_FLOAT&&(Y=e.R16F),w===e.UNSIGNED_BYTE&&(Y=e.R8)),l===e.RED_INTEGER&&(w===e.UNSIGNED_BYTE&&(Y=e.R8UI),w===e.UNSIGNED_SHORT&&(Y=e.R16UI),w===e.UNSIGNED_INT&&(Y=e.R32UI),w===e.BYTE&&(Y=e.R8I),w===e.SHORT&&(Y=e.R16I),w===e.INT&&(Y=e.R32I)),l===e.RG&&(w===e.FLOAT&&(Y=e.RG32F),w===e.HALF_FLOAT&&(Y=e.RG16F),w===e.UNSIGNED_BYTE&&(Y=e.RG8)),l===e.RGBA){const me=k?En:tt.getTransfer(K);w===e.FLOAT&&(Y=e.RGBA32F),w===e.HALF_FLOAT&&(Y=e.RGBA16F),w===e.UNSIGNED_BYTE&&(Y=me==="srgb"?e.SRGB8_ALPHA8:e.RGBA8),w===e.UNSIGNED_SHORT_4_4_4_4&&(Y=e.RGBA4),w===e.UNSIGNED_SHORT_5_5_5_1&&(Y=e.RGB5_A1)}return(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)&&i.get("EXT_color_buffer_float"),Y}function O(d,l,w){return h(d,w)===!0||d.isFramebufferTexture&&d.minFilter!==1003&&d.minFilter!==1006?Math.log2(Math.max(l.width,l.height))+1:d.mipmaps!==void 0&&d.mipmaps.length>0?d.mipmaps.length:d.isCompressedTexture&&Array.isArray(d.image)?l.mipmaps.length:1}function L(d){return d===1003||d===1004||d===1005?e.NEAREST:e.LINEAR}function F(d){const l=d.target;l.removeEventListener("dispose",F),u(l),l.isVideoTexture&&T.delete(l)}function X(d){const l=d.target;l.removeEventListener("dispose",X),G(l)}function u(d){const l=n.get(d);if(l.__webglInit===void 0)return;const w=d.source,K=M.get(w);if(K){const k=K[l.__cacheKey];k.usedTimes--,k.usedTimes===0&&g(d),Object.keys(K).length===0&&M.delete(w)}n.remove(d)}function g(d){const l=n.get(d);e.deleteTexture(l.__webglTexture);const w=d.source,K=M.get(w);delete K[l.__cacheKey],p.memory.textures--}function G(d){const l=d.texture,w=n.get(d),K=n.get(l);if(K.__webglTexture!==void 0&&(e.deleteTexture(K.__webglTexture),p.memory.textures--),d.depthTexture&&d.depthTexture.dispose(),d.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(w.__webglFramebuffer[k]))for(let Y=0;Y<w.__webglFramebuffer[k].length;Y++)e.deleteFramebuffer(w.__webglFramebuffer[k][Y]);else e.deleteFramebuffer(w.__webglFramebuffer[k]);w.__webglDepthbuffer&&e.deleteRenderbuffer(w.__webglDepthbuffer[k])}else{if(Array.isArray(w.__webglFramebuffer))for(let k=0;k<w.__webglFramebuffer.length;k++)e.deleteFramebuffer(w.__webglFramebuffer[k]);else e.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&e.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&e.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let k=0;k<w.__webglColorRenderbuffer.length;k++)w.__webglColorRenderbuffer[k]&&e.deleteRenderbuffer(w.__webglColorRenderbuffer[k]);w.__webglDepthRenderbuffer&&e.deleteRenderbuffer(w.__webglDepthRenderbuffer)}if(d.isWebGLMultipleRenderTargets)for(let k=0,Y=l.length;k<Y;k++){const me=n.get(l[k]);me.__webglTexture&&(e.deleteTexture(me.__webglTexture),p.memory.textures--),n.remove(l[k])}n.remove(l),n.remove(d)}let te=0;function pe(){te=0}function A(){const d=te;return d>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+d+" texture units while this GPU supports only "+o.maxTextures),te+=1,d}function B(d){const l=[];return l.push(d.wrapS),l.push(d.wrapT),l.push(d.wrapR||0),l.push(d.magFilter),l.push(d.minFilter),l.push(d.anisotropy),l.push(d.internalFormat),l.push(d.format),l.push(d.type),l.push(d.generateMipmaps),l.push(d.premultiplyAlpha),l.push(d.flipY),l.push(d.unpackAlignment),l.push(d.colorSpace),l.join()}function H(d,l){const w=n.get(d);if(d.isVideoTexture&&Ie(d),d.isRenderTargetTexture===!1&&d.version>0&&w.__version!==d.version){const K=d.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(w,d,l);return}}t.bindTexture(e.TEXTURE_2D,w.__webglTexture,e.TEXTURE0+l)}function Z(d,l){const w=n.get(d);if(d.version>0&&w.__version!==d.version){ce(w,d,l);return}t.bindTexture(e.TEXTURE_2D_ARRAY,w.__webglTexture,e.TEXTURE0+l)}function z(d,l){const w=n.get(d);if(d.version>0&&w.__version!==d.version){ce(w,d,l);return}t.bindTexture(e.TEXTURE_3D,w.__webglTexture,e.TEXTURE0+l)}function W(d,l){const w=n.get(d);if(d.version>0&&w.__version!==d.version){ve(w,d,l);return}t.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+l)}const ne={[un]:e.REPEAT,[oi]:e.CLAMP_TO_EDGE,[hn]:e.MIRRORED_REPEAT},ee={[mt]:e.NEAREST,[Mn]:e.NEAREST_MIPMAP_NEAREST,[pn]:e.NEAREST_MIPMAP_LINEAR,[Ct]:e.LINEAR,[Sn]:e.LINEAR_MIPMAP_NEAREST,[Hi]:e.LINEAR_MIPMAP_LINEAR},D={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function V(d,l,w){if(w?(e.texParameteri(d,e.TEXTURE_WRAP_S,ne[l.wrapS]),e.texParameteri(d,e.TEXTURE_WRAP_T,ne[l.wrapT]),(d===e.TEXTURE_3D||d===e.TEXTURE_2D_ARRAY)&&e.texParameteri(d,e.TEXTURE_WRAP_R,ne[l.wrapR]),e.texParameteri(d,e.TEXTURE_MAG_FILTER,ee[l.magFilter]),e.texParameteri(d,e.TEXTURE_MIN_FILTER,ee[l.minFilter])):(e.texParameteri(d,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(d,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(d===e.TEXTURE_3D||d===e.TEXTURE_2D_ARRAY)&&e.texParameteri(d,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(l.wrapS!==1001||l.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(d,e.TEXTURE_MAG_FILTER,L(l.magFilter)),e.texParameteri(d,e.TEXTURE_MIN_FILTER,L(l.minFilter)),l.minFilter!==1003&&l.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),l.compareFunction&&(e.texParameteri(d,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(d,e.TEXTURE_COMPARE_FUNC,D[l.compareFunction])),i.has("EXT_texture_filter_anisotropic")===!0){const K=i.get("EXT_texture_filter_anisotropic");if(l.magFilter===1003||l.minFilter!==1005&&l.minFilter!==1008||l.type===1015&&i.has("OES_texture_float_linear")===!1||a===!1&&l.type===1016&&i.has("OES_texture_half_float_linear")===!1)return;(l.anisotropy>1||n.get(l).__currentAnisotropy)&&(e.texParameterf(d,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(l.anisotropy,o.getMaxAnisotropy())),n.get(l).__currentAnisotropy=l.anisotropy)}}function ae(d,l){let w=!1;d.__webglInit===void 0&&(d.__webglInit=!0,l.addEventListener("dispose",F));const K=l.source;let k=M.get(K);k===void 0&&(k={},M.set(K,k));const Y=B(l);if(Y!==d.__cacheKey){k[Y]===void 0&&(k[Y]={texture:e.createTexture(),usedTimes:0},p.memory.textures++,w=!0),k[Y].usedTimes++;const me=k[d.__cacheKey];me!==void 0&&(k[d.__cacheKey].usedTimes--,me.usedTimes===0&&g(l)),d.__cacheKey=Y,d.__webglTexture=k[Y].texture}return w}function ce(d,l,w){let K=e.TEXTURE_2D;(l.isDataArrayTexture||l.isCompressedArrayTexture)&&(K=e.TEXTURE_2D_ARRAY),l.isData3DTexture&&(K=e.TEXTURE_3D);const k=ae(d,l),Y=l.source;t.bindTexture(K,d.__webglTexture,e.TEXTURE0+w);const me=n.get(Y);if(Y.version!==me.__version||k===!0){t.activeTexture(e.TEXTURE0+w);const ie=tt.getPrimaries(tt.workingColorSpace),oe=l.colorSpace===""?null:tt.getPrimaries(l.colorSpace),fe=l.colorSpace===""||ie===oe?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,l.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,l.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Re=r(l)&&c(l.image)===!1;let q=x(l.image,Re,!1,o.maxTextureSize);q=Pe(l,q);const Ke=c(q)||a,De=s.convert(l.format,l.colorSpace);let Te=s.convert(l.type),se=N(l.internalFormat,De,Te,l.colorSpace,l.isVideoTexture);V(K,l,Ke);let le;const ye=l.mipmaps,Ve=a&&l.isVideoTexture!==!0&&se!==36196,Fe=me.__version===void 0||k===!0,We=O(l,q,Ke);if(l.isDepthTexture)se=e.DEPTH_COMPONENT,a?l.type===1015?se=e.DEPTH_COMPONENT32F:l.type===1014?se=e.DEPTH_COMPONENT24:l.type===1020?se=e.DEPTH24_STENCIL8:se=e.DEPTH_COMPONENT16:l.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),l.format===1026&&se===e.DEPTH_COMPONENT&&l.type!==1012&&l.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),l.type=ai,Te=s.convert(l.type)),l.format===1027&&se===e.DEPTH_COMPONENT&&(se=e.DEPTH_STENCIL,l.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),l.type=si,Te=s.convert(l.type))),Fe&&(Ve?t.texStorage2D(e.TEXTURE_2D,1,se,q.width,q.height):t.texImage2D(e.TEXTURE_2D,0,se,q.width,q.height,0,De,Te,null));else if(l.isDataTexture)if(ye.length>0&&Ke){Ve&&Fe&&t.texStorage2D(e.TEXTURE_2D,We,se,ye[0].width,ye[0].height);for(let $=0,_=ye.length;$<_;$++)le=ye[$],Ve?t.texSubImage2D(e.TEXTURE_2D,$,0,0,le.width,le.height,De,Te,le.data):t.texImage2D(e.TEXTURE_2D,$,se,le.width,le.height,0,De,Te,le.data);l.generateMipmaps=!1}else Ve?(Fe&&t.texStorage2D(e.TEXTURE_2D,We,se,q.width,q.height),t.texSubImage2D(e.TEXTURE_2D,0,0,0,q.width,q.height,De,Te,q.data)):t.texImage2D(e.TEXTURE_2D,0,se,q.width,q.height,0,De,Te,q.data);else if(l.isCompressedTexture)if(l.isCompressedArrayTexture){Ve&&Fe&&t.texStorage3D(e.TEXTURE_2D_ARRAY,We,se,ye[0].width,ye[0].height,q.depth);for(let $=0,_=ye.length;$<_;$++)le=ye[$],l.format!==1023?De!==null?Ve?t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,q.depth,De,le.data,0,0):t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,se,le.width,le.height,q.depth,0,le.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,q.depth,De,Te,le.data):t.texImage3D(e.TEXTURE_2D_ARRAY,$,se,le.width,le.height,q.depth,0,De,Te,le.data)}else{Ve&&Fe&&t.texStorage2D(e.TEXTURE_2D,We,se,ye[0].width,ye[0].height);for(let $=0,_=ye.length;$<_;$++)le=ye[$],l.format!==1023?De!==null?Ve?t.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,le.width,le.height,De,le.data):t.compressedTexImage2D(e.TEXTURE_2D,$,se,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage2D(e.TEXTURE_2D,$,0,0,le.width,le.height,De,Te,le.data):t.texImage2D(e.TEXTURE_2D,$,se,le.width,le.height,0,De,Te,le.data)}else if(l.isDataArrayTexture)Ve?(Fe&&t.texStorage3D(e.TEXTURE_2D_ARRAY,We,se,q.width,q.height,q.depth),t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,De,Te,q.data)):t.texImage3D(e.TEXTURE_2D_ARRAY,0,se,q.width,q.height,q.depth,0,De,Te,q.data);else if(l.isData3DTexture)Ve?(Fe&&t.texStorage3D(e.TEXTURE_3D,We,se,q.width,q.height,q.depth),t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,De,Te,q.data)):t.texImage3D(e.TEXTURE_3D,0,se,q.width,q.height,q.depth,0,De,Te,q.data);else if(l.isFramebufferTexture){if(Fe)if(Ve)t.texStorage2D(e.TEXTURE_2D,We,se,q.width,q.height);else{let $=q.width,_=q.height;for(let j=0;j<We;j++)t.texImage2D(e.TEXTURE_2D,j,se,$,_,0,De,Te,null),$>>=1,_>>=1}}else if(ye.length>0&&Ke){Ve&&Fe&&t.texStorage2D(e.TEXTURE_2D,We,se,ye[0].width,ye[0].height);for(let $=0,_=ye.length;$<_;$++)le=ye[$],Ve?t.texSubImage2D(e.TEXTURE_2D,$,0,0,De,Te,le):t.texImage2D(e.TEXTURE_2D,$,se,De,Te,le);l.generateMipmaps=!1}else Ve?(Fe&&t.texStorage2D(e.TEXTURE_2D,We,se,q.width,q.height),t.texSubImage2D(e.TEXTURE_2D,0,0,0,De,Te,q)):t.texImage2D(e.TEXTURE_2D,0,se,De,Te,q);h(l,Ke)&&E(K),me.__version=Y.version,l.onUpdate&&l.onUpdate(l)}d.__version=l.version}function ve(d,l,w){if(l.image.length!==6)return;const K=ae(d,l),k=l.source;t.bindTexture(e.TEXTURE_CUBE_MAP,d.__webglTexture,e.TEXTURE0+w);const Y=n.get(k);if(k.version!==Y.__version||K===!0){t.activeTexture(e.TEXTURE0+w);const me=tt.getPrimaries(tt.workingColorSpace),ie=l.colorSpace===""?null:tt.getPrimaries(l.colorSpace),oe=l.colorSpace===""||me===ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,l.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,l.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const fe=l.isCompressedTexture||l.image[0].isCompressedTexture,Re=l.image[0]&&l.image[0].isDataTexture,q=[];for(let $=0;$<6;$++)!fe&&!Re?q[$]=x(l.image[$],!1,!0,o.maxCubemapSize):q[$]=Re?l.image[$].image:l.image[$],q[$]=Pe(l,q[$]);const Ke=q[0],De=c(Ke)||a,Te=s.convert(l.format,l.colorSpace),se=s.convert(l.type),le=N(l.internalFormat,Te,se,l.colorSpace),ye=a&&l.isVideoTexture!==!0,Ve=Y.__version===void 0||K===!0;let Fe=O(l,Ke,De);V(e.TEXTURE_CUBE_MAP,l,De);let We;if(fe){ye&&Ve&&t.texStorage2D(e.TEXTURE_CUBE_MAP,Fe,le,Ke.width,Ke.height);for(let $=0;$<6;$++){We=q[$].mipmaps;for(let _=0;_<We.length;_++){const j=We[_];l.format!==1023?Te!==null?ye?t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_,0,0,j.width,j.height,Te,j.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_,le,j.width,j.height,0,j.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ye?t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_,0,0,j.width,j.height,Te,se,j.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_,le,j.width,j.height,0,Te,se,j.data)}}}else{We=l.mipmaps,ye&&Ve&&(We.length>0&&Fe++,t.texStorage2D(e.TEXTURE_CUBE_MAP,Fe,le,q[0].width,q[0].height));for(let $=0;$<6;$++)if(Re){ye?t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,q[$].width,q[$].height,Te,se,q[$].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,le,q[$].width,q[$].height,0,Te,se,q[$].data);for(let _=0;_<We.length;_++){const j=We[_].image[$].image;ye?t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_+1,0,0,j.width,j.height,Te,se,j.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_+1,le,j.width,j.height,0,Te,se,j.data)}}else{ye?t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Te,se,q[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,le,Te,se,q[$]);for(let _=0;_<We.length;_++){const j=We[_];ye?t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_+1,0,0,Te,se,j.image[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,_+1,le,Te,se,j.image[$])}}}h(l,De)&&E(e.TEXTURE_CUBE_MAP),Y.__version=k.version,l.onUpdate&&l.onUpdate(l)}d.__version=l.version}function Ee(d,l,w,K,k,Y){const me=s.convert(w.format,w.colorSpace),ie=s.convert(w.type),oe=N(w.internalFormat,me,ie,w.colorSpace);if(!n.get(l).__hasExternalTextures){const fe=Math.max(1,l.width>>Y),Re=Math.max(1,l.height>>Y);k===e.TEXTURE_3D||k===e.TEXTURE_2D_ARRAY?t.texImage3D(k,Y,oe,fe,Re,l.depth,0,me,ie,null):t.texImage2D(k,Y,oe,fe,Re,0,me,ie,null)}t.bindFramebuffer(e.FRAMEBUFFER,d),Ae(l)?v.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,K,k,n.get(w).__webglTexture,0,ge(l)):(k===e.TEXTURE_2D||k>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,K,k,n.get(w).__webglTexture,Y),t.bindFramebuffer(e.FRAMEBUFFER,null)}function we(d,l,w){if(e.bindRenderbuffer(e.RENDERBUFFER,d),l.depthBuffer&&!l.stencilBuffer){let K=a===!0?e.DEPTH_COMPONENT24:e.DEPTH_COMPONENT16;if(w||Ae(l)){const k=l.depthTexture;k&&k.isDepthTexture&&(k.type===1015?K=e.DEPTH_COMPONENT32F:k.type===1014&&(K=e.DEPTH_COMPONENT24));const Y=ge(l);Ae(l)?v.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Y,K,l.width,l.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,Y,K,l.width,l.height)}else e.renderbufferStorage(e.RENDERBUFFER,K,l.width,l.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,d)}else if(l.depthBuffer&&l.stencilBuffer){const K=ge(l);w&&Ae(l)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,K,e.DEPTH24_STENCIL8,l.width,l.height):Ae(l)?v.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,K,e.DEPTH24_STENCIL8,l.width,l.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,l.width,l.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,d)}else{const K=l.isWebGLMultipleRenderTargets===!0?l.texture:[l.texture];for(let k=0;k<K.length;k++){const Y=K[k],me=s.convert(Y.format,Y.colorSpace),ie=s.convert(Y.type),oe=N(Y.internalFormat,me,ie,Y.colorSpace),fe=ge(l);w&&Ae(l)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,fe,oe,l.width,l.height):Ae(l)?v.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,fe,oe,l.width,l.height):e.renderbufferStorage(e.RENDERBUFFER,oe,l.width,l.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(d,l){if(l&&l.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,d),!(l.depthTexture&&l.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(l.depthTexture).__webglTexture||l.depthTexture.image.width!==l.width||l.depthTexture.image.height!==l.height)&&(l.depthTexture.image.width=l.width,l.depthTexture.image.height=l.height,l.depthTexture.needsUpdate=!0),H(l.depthTexture,0);const w=n.get(l.depthTexture).__webglTexture,K=ge(l);if(l.depthTexture.format===1026)Ae(l)?v.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,w,0,K):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,w,0);else if(l.depthTexture.format===1027)Ae(l)?v.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,w,0,K):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,w,0);else throw new Error("Unknown depthTexture format")}function Be(d){const l=n.get(d),w=d.isWebGLCubeRenderTarget===!0;if(d.depthTexture&&!l.__autoAllocateDepthBuffer){if(w)throw new Error("target.depthTexture not supported in Cube render targets");Se(l.__webglFramebuffer,d)}else if(w){l.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer[K]),l.__webglDepthbuffer[K]=e.createRenderbuffer(),we(l.__webglDepthbuffer[K],d,!1)}else t.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),l.__webglDepthbuffer=e.createRenderbuffer(),we(l.__webglDepthbuffer,d,!1);t.bindFramebuffer(e.FRAMEBUFFER,null)}function C(d,l,w){const K=n.get(d);l!==void 0&&Ee(K.__webglFramebuffer,d,d.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),w!==void 0&&Be(d)}function it(d){const l=d.texture,w=n.get(d),K=n.get(l);d.addEventListener("dispose",X),d.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=e.createTexture()),K.__version=l.version,p.memory.textures++);const k=d.isWebGLCubeRenderTarget===!0,Y=d.isWebGLMultipleRenderTargets===!0,me=c(d)||a;if(k){w.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(a&&l.mipmaps&&l.mipmaps.length>0){w.__webglFramebuffer[ie]=[];for(let oe=0;oe<l.mipmaps.length;oe++)w.__webglFramebuffer[ie][oe]=e.createFramebuffer()}else w.__webglFramebuffer[ie]=e.createFramebuffer()}else{if(a&&l.mipmaps&&l.mipmaps.length>0){w.__webglFramebuffer=[];for(let ie=0;ie<l.mipmaps.length;ie++)w.__webglFramebuffer[ie]=e.createFramebuffer()}else w.__webglFramebuffer=e.createFramebuffer();if(Y)if(o.drawBuffers){const ie=d.texture;for(let oe=0,fe=ie.length;oe<fe;oe++){const Re=n.get(ie[oe]);Re.__webglTexture===void 0&&(Re.__webglTexture=e.createTexture(),p.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&d.samples>0&&Ae(d)===!1){const ie=Y?l:[l];w.__webglMultisampledFramebuffer=e.createFramebuffer(),w.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,w.__webglMultisampledFramebuffer);for(let oe=0;oe<ie.length;oe++){const fe=ie[oe];w.__webglColorRenderbuffer[oe]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,w.__webglColorRenderbuffer[oe]);const Re=s.convert(fe.format,fe.colorSpace),q=s.convert(fe.type),Ke=N(fe.internalFormat,Re,q,fe.colorSpace,d.isXRRenderTarget===!0),De=ge(d);e.renderbufferStorageMultisample(e.RENDERBUFFER,De,Ke,d.width,d.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+oe,e.RENDERBUFFER,w.__webglColorRenderbuffer[oe])}e.bindRenderbuffer(e.RENDERBUFFER,null),d.depthBuffer&&(w.__webglDepthRenderbuffer=e.createRenderbuffer(),we(w.__webglDepthRenderbuffer,d,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(k){t.bindTexture(e.TEXTURE_CUBE_MAP,K.__webglTexture),V(e.TEXTURE_CUBE_MAP,l,me);for(let ie=0;ie<6;ie++)if(a&&l.mipmaps&&l.mipmaps.length>0)for(let oe=0;oe<l.mipmaps.length;oe++)Ee(w.__webglFramebuffer[ie][oe],d,l,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,oe);else Ee(w.__webglFramebuffer[ie],d,l,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);h(l,me)&&E(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Y){const ie=d.texture;for(let oe=0,fe=ie.length;oe<fe;oe++){const Re=ie[oe],q=n.get(Re);t.bindTexture(e.TEXTURE_2D,q.__webglTexture),V(e.TEXTURE_2D,Re,me),Ee(w.__webglFramebuffer,d,Re,e.COLOR_ATTACHMENT0+oe,e.TEXTURE_2D,0),h(Re,me)&&E(e.TEXTURE_2D)}t.unbindTexture()}else{let ie=e.TEXTURE_2D;if((d.isWebGL3DRenderTarget||d.isWebGLArrayRenderTarget)&&(a?ie=d.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ie,K.__webglTexture),V(ie,l,me),a&&l.mipmaps&&l.mipmaps.length>0)for(let oe=0;oe<l.mipmaps.length;oe++)Ee(w.__webglFramebuffer[oe],d,l,e.COLOR_ATTACHMENT0,ie,oe);else Ee(w.__webglFramebuffer,d,l,e.COLOR_ATTACHMENT0,ie,0);h(l,me)&&E(ie),t.unbindTexture()}d.depthBuffer&&Be(d)}function Oe(d){const l=c(d)||a,w=d.isWebGLMultipleRenderTargets===!0?d.texture:[d.texture];for(let K=0,k=w.length;K<k;K++){const Y=w[K];if(h(Y,l)){const me=d.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,ie=n.get(Y).__webglTexture;t.bindTexture(me,ie),E(me),t.unbindTexture()}}}function de(d){if(a&&d.samples>0&&Ae(d)===!1){const l=d.isWebGLMultipleRenderTargets?d.texture:[d.texture],w=d.width,K=d.height;let k=e.COLOR_BUFFER_BIT;const Y=[],me=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=n.get(d),oe=d.isWebGLMultipleRenderTargets===!0;if(oe)for(let fe=0;fe<l.length;fe++)t.bindFramebuffer(e.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ie.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ie.__webglMultisampledFramebuffer),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ie.__webglFramebuffer);for(let fe=0;fe<l.length;fe++){Y.push(e.COLOR_ATTACHMENT0+fe),d.depthBuffer&&Y.push(me);const Re=ie.__ignoreDepthValues!==void 0?ie.__ignoreDepthValues:!1;if(Re===!1&&(d.depthBuffer&&(k|=e.DEPTH_BUFFER_BIT),d.stencilBuffer&&(k|=e.STENCIL_BUFFER_BIT)),oe&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ie.__webglColorRenderbuffer[fe]),Re===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[me]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[me])),oe){const q=n.get(l[fe]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,q,0)}e.blitFramebuffer(0,0,w,K,0,0,w,K,k,e.NEAREST),m&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Y)}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),oe)for(let fe=0;fe<l.length;fe++){t.bindFramebuffer(e.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.RENDERBUFFER,ie.__webglColorRenderbuffer[fe]);const Re=n.get(l[fe]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ie.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.TEXTURE_2D,Re,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ie.__webglMultisampledFramebuffer)}}function ge(d){return Math.min(o.maxSamples,d.samples)}function Ae(d){const l=n.get(d);return a&&d.samples>0&&i.has("WEBGL_multisampled_render_to_texture")===!0&&l.__useRenderToTexture!==!1}function Ie(d){const l=p.render.frame;T.get(d)!==l&&(T.set(d,l),d.update())}function Pe(d,l){const w=d.colorSpace,K=d.format,k=d.type;return d.isCompressedTexture===!0||d.isVideoTexture===!0||d.format===1035||w!=="srgb-linear"&&w!==""&&(tt.getTransfer(w)==="srgb"?a===!1?i.has("EXT_sRGB")===!0&&K===1023?(d.format=xn,d.minFilter=Ct,d.generateMipmaps=!1):l=wn.sRGBToLinear(l):(K!==1023||k!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",w)),l}this.allocateTextureUnit=A,this.resetTextureUnits=pe,this.setTexture2D=H,this.setTexture2DArray=Z,this.setTexture3D=z,this.setTextureCube=W,this.rebindTextures=C,this.setupRenderTarget=it,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Ae}function vl(e,i,t){const n=t.isWebGL2;function o(s,p=""){let a;const v=tt.getTransfer(p);if(s===1009)return e.UNSIGNED_BYTE;if(s===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(s===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(s===1010)return e.BYTE;if(s===1011)return e.SHORT;if(s===1012)return e.UNSIGNED_SHORT;if(s===1013)return e.INT;if(s===1014)return e.UNSIGNED_INT;if(s===1015)return e.FLOAT;if(s===1016)return n?e.HALF_FLOAT:(a=i.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===1021)return e.ALPHA;if(s===1023)return e.RGBA;if(s===1024)return e.LUMINANCE;if(s===1025)return e.LUMINANCE_ALPHA;if(s===1026)return e.DEPTH_COMPONENT;if(s===1027)return e.DEPTH_STENCIL;if(s===1035)return a=i.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===1028)return e.RED;if(s===1029)return e.RED_INTEGER;if(s===1030)return e.RG;if(s===1031)return e.RG_INTEGER;if(s===1033)return e.RGBA_INTEGER;if(s===33776||s===33777||s===33778||s===33779)if(v==="srgb")if(a=i.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===33776)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===33777)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===33778)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===33779)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=i.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===33776)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===33777)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===33778)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===33779)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===35840||s===35841||s===35842||s===35843)if(a=i.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===35840)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===35841)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===35842)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===35843)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===36196)return a=i.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===37492||s===37496)if(a=i.get("WEBGL_compressed_texture_etc"),a!==null){if(s===37492)return v==="srgb"?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===37496)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===37808||s===37809||s===37810||s===37811||s===37812||s===37813||s===37814||s===37815||s===37816||s===37817||s===37818||s===37819||s===37820||s===37821)if(a=i.get("WEBGL_compressed_texture_astc"),a!==null){if(s===37808)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===37809)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===37810)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===37811)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===37812)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===37813)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===37814)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===37815)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===37816)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===37817)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===37818)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===37819)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===37820)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===37821)return v==="srgb"?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===36492||s===36494||s===36495)if(a=i.get("EXT_texture_compression_bptc"),a!==null){if(s===36492)return v==="srgb"?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===36494)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===36495)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===36283||s===36284||s===36285||s===36286)if(a=i.get("EXT_texture_compression_rgtc"),a!==null){if(s===36492)return a.COMPRESSED_RED_RGTC1_EXT;if(s===36284)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===36285)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===36286)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===1020?n?e.UNSIGNED_INT_24_8:(a=i.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):e[s]!==void 0?e[s]:null}return{convert:o}}var El=class extends ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ft=class extends zi{constructor(){super(),this.isGroup=!0,this.type="Group"}},Sl={type:"move"},Jt=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ft,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ft,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new He,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new He),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ft,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new He,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new He),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const t of e.hand.values())this._getHandJoint(i,t)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,t){let n=null,o=null,s=null;const p=this._targetRay,a=this._grip,v=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(v&&e.hand){s=!0;for(const M of e.hand.values()){const P=i.getJointPose(M,t),b=this._getHandJoint(v,M);P!==null&&(b.matrix.fromArray(P.transform.matrix),b.matrix.decompose(b.position,b.rotation,b.scale),b.matrixWorldNeedsUpdate=!0,b.jointRadius=P.radius),b.visible=P!==null}const m=v.joints["index-finger-tip"],T=v.joints["thumb-tip"],S=m.position.distanceTo(T.position);v.inputState.pinching&&S>.025?(v.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!v.inputState.pinching&&S<=.015&&(v.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(o=i.getPose(e.gripSpace,t),o!==null&&(a.matrix.fromArray(o.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,o.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(o.linearVelocity)):a.hasLinearVelocity=!1,o.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(o.angularVelocity)):a.hasAngularVelocity=!1));p!==null&&(n=i.getPose(e.targetRaySpace,t),n===null&&o!==null&&(n=o),n!==null&&(p.matrix.fromArray(n.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,n.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(n.linearVelocity)):p.hasLinearVelocity=!1,n.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(n.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Sl)))}return p!==null&&(p.visible=n!==null),a!==null&&(a.visible=o!==null),v!==null&&(v.visible=s!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const t=new Ft;t.matrixAutoUpdate=!1,t.visible=!1,e.joints[i.jointName]=t,e.add(t)}return e.joints[i.jointName]}},Ml=class extends Un{constructor(e,i){super();const t=this;let n=null,o=1,s=null,p="local-floor",a=1,v=null,m=null,T=null,S=null,M=null,P=null;const b=i.getContextAttributes();let x=null,c=null;const r=[],h=[],E=new ct;let N=null;const O=new ft;O.layers.enable(1),O.viewport=new at;const L=new ft;L.layers.enable(2),L.viewport=new at;const F=[O,L],X=new El;X.layers.enable(1),X.layers.enable(2);let u=null,g=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let V=r[D];return V===void 0&&(V=new Jt,r[D]=V),V.getTargetRaySpace()},this.getControllerGrip=function(D){let V=r[D];return V===void 0&&(V=new Jt,r[D]=V),V.getGripSpace()},this.getHand=function(D){let V=r[D];return V===void 0&&(V=new Jt,r[D]=V),V.getHandSpace()};function G(D){const V=h.indexOf(D.inputSource);if(V===-1)return;const ae=r[V];ae!==void 0&&(ae.update(D.inputSource,D.frame,v||s),ae.dispatchEvent({type:D.type,data:D.inputSource}))}function te(){n.removeEventListener("select",G),n.removeEventListener("selectstart",G),n.removeEventListener("selectend",G),n.removeEventListener("squeeze",G),n.removeEventListener("squeezestart",G),n.removeEventListener("squeezeend",G),n.removeEventListener("end",te),n.removeEventListener("inputsourceschange",pe);for(let D=0;D<r.length;D++){const V=h[D];V!==null&&(h[D]=null,r[D].disconnect(V))}u=null,g=null,e.setRenderTarget(x),M=null,S=null,T=null,n=null,c=null,ee.stop(),t.isPresenting=!1,e.setPixelRatio(N),e.setSize(E.width,E.height,!1),t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){o=D,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){p=D,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return v||s},this.setReferenceSpace=function(D){v=D},this.getBaseLayer=function(){return S!==null?S:M},this.getBinding=function(){return T},this.getFrame=function(){return P},this.getSession=function(){return n},this.setSession=async function(D){if(n=D,n!==null){if(x=e.getRenderTarget(),n.addEventListener("select",G),n.addEventListener("selectstart",G),n.addEventListener("selectend",G),n.addEventListener("squeeze",G),n.addEventListener("squeezestart",G),n.addEventListener("squeezeend",G),n.addEventListener("end",te),n.addEventListener("inputsourceschange",pe),b.xrCompatible!==!0&&await i.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(E),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const V={antialias:n.renderState.layers===void 0?b.antialias:!0,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:o};M=new XRWebGLLayer(n,i,V),n.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),c=new St(M.framebufferWidth,M.framebufferHeight,{format:ti,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let V=null,ae=null,ce=null;b.depth&&(ce=b.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,V=b.stencil?dn:Vi,ae=b.stencil?si:ai);const ve={colorFormat:i.RGBA8,depthFormat:ce,scaleFactor:o};T=new XRWebGLBinding(n,i),S=T.createProjectionLayer(ve),n.updateRenderState({layers:[S]}),e.setPixelRatio(1),e.setSize(S.textureWidth,S.textureHeight,!1),c=new St(S.textureWidth,S.textureHeight,{format:ti,type:Qt,depthTexture:new ji(S.textureWidth,S.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});const Ee=e.properties.get(c);Ee.__ignoreDepthValues=S.ignoreDepthValues}c.isXRRenderTarget=!0,this.setFoveation(a),v=null,s=await n.requestReferenceSpace(p),ee.setContext(n),ee.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function pe(D){for(let V=0;V<D.removed.length;V++){const ae=D.removed[V],ce=h.indexOf(ae);ce>=0&&(h[ce]=null,r[ce].disconnect(ae))}for(let V=0;V<D.added.length;V++){const ae=D.added[V];let ce=h.indexOf(ae);if(ce===-1){for(let Ee=0;Ee<r.length;Ee++)if(Ee>=h.length){h.push(ae),ce=Ee;break}else if(h[Ee]===null){h[Ee]=ae,ce=Ee;break}if(ce===-1)break}const ve=r[ce];ve&&ve.connect(ae)}}const A=new He,B=new He;function H(D,V,ae){A.setFromMatrixPosition(V.matrixWorld),B.setFromMatrixPosition(ae.matrixWorld);const ce=A.distanceTo(B),ve=V.projectionMatrix.elements,Ee=ae.projectionMatrix.elements,we=ve[14]/(ve[10]-1),Se=ve[14]/(ve[10]+1),Be=(ve[9]+1)/ve[5],C=(ve[9]-1)/ve[5],it=(ve[8]-1)/ve[0],Oe=(Ee[8]+1)/Ee[0],de=we*it,ge=we*Oe,Ae=ce/(-it+Oe),Ie=Ae*-it;V.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Ie),D.translateZ(Ae),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Pe=we+Ae,d=Se+Ae,l=de-Ie,w=ge+(ce-Ie),K=Be*Se/d*Pe,k=C*Se/d*Pe;D.projectionMatrix.makePerspective(l,w,K,k,Pe,d),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function Z(D,V){V===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(V.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(n===null)return;X.near=L.near=O.near=D.near,X.far=L.far=O.far=D.far,(u!==X.near||g!==X.far)&&(n.updateRenderState({depthNear:X.near,depthFar:X.far}),u=X.near,g=X.far);const V=D.parent,ae=X.cameras;Z(X,V);for(let ce=0;ce<ae.length;ce++)Z(ae[ce],V);ae.length===2?H(X,O,L):X.projectionMatrix.copy(O.projectionMatrix),z(D,X,V)};function z(D,V,ae){ae===null?D.matrix.copy(V.matrixWorld):(D.matrix.copy(ae.matrixWorld),D.matrix.invert(),D.matrix.multiply(V.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(V.projectionMatrix),D.projectionMatrixInverse.copy(V.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=bn*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(S===null&&M===null))return a},this.setFoveation=function(D){a=D,S!==null&&(S.fixedFoveation=D),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=D)};let W=null;function ne(D,V){if(m=V.getViewerPose(v||s),P=V,m!==null){const ae=m.views;M!==null&&(e.setRenderTargetFramebuffer(c,M.framebuffer),e.setRenderTarget(c));let ce=!1;ae.length!==X.cameras.length&&(X.cameras.length=0,ce=!0);for(let ve=0;ve<ae.length;ve++){const Ee=ae[ve];let we=null;if(M!==null)we=M.getViewport(Ee);else{const Be=T.getViewSubImage(S,Ee);we=Be.viewport,ve===0&&(e.setRenderTargetTextures(c,Be.colorTexture,S.ignoreDepthValues?void 0:Be.depthStencilTexture),e.setRenderTarget(c))}let Se=F[ve];Se===void 0&&(Se=new ft,Se.layers.enable(ve),Se.viewport=new at,F[ve]=Se),Se.matrix.fromArray(Ee.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(Ee.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(we.x,we.y,we.width,we.height),ve===0&&(X.matrix.copy(Se.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),ce===!0&&X.cameras.push(Se)}}for(let ae=0;ae<r.length;ae++){const ce=h[ae],ve=r[ae];ce!==null&&ve!==void 0&&ve.update(ce,V,v||s)}W&&W(D,V),V.detectedPlanes&&t.dispatchEvent({type:"planesdetected",data:V}),P=null}const ee=new Zi;ee.setAnimationLoop(ne),this.setAnimationLoop=function(D){W=D},this.dispose=function(){}}};function Tl(e,i){function t(c,r){c.matrixAutoUpdate===!0&&c.updateMatrix(),r.value.copy(c.matrix)}function n(c,r){r.color.getRGB(c.fogColor.value,Yi(e)),r.isFog?(c.fogNear.value=r.near,c.fogFar.value=r.far):r.isFogExp2&&(c.fogDensity.value=r.density)}function o(c,r,h,E,N){r.isMeshBasicMaterial||r.isMeshLambertMaterial?s(c,r):r.isMeshToonMaterial?(s(c,r),S(c,r)):r.isMeshPhongMaterial?(s(c,r),T(c,r)):r.isMeshStandardMaterial?(s(c,r),M(c,r),r.isMeshPhysicalMaterial&&P(c,r,N)):r.isMeshMatcapMaterial?(s(c,r),b(c,r)):r.isMeshDepthMaterial?s(c,r):r.isMeshDistanceMaterial?(s(c,r),x(c,r)):r.isMeshNormalMaterial?s(c,r):r.isLineBasicMaterial?(p(c,r),r.isLineDashedMaterial&&a(c,r)):r.isPointsMaterial?v(c,r,h,E):r.isSpriteMaterial?m(c,r):r.isShadowMaterial?(c.color.value.copy(r.color),c.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function s(c,r){c.opacity.value=r.opacity,r.color&&c.diffuse.value.copy(r.color),r.emissive&&c.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(c.map.value=r.map,t(r.map,c.mapTransform)),r.alphaMap&&(c.alphaMap.value=r.alphaMap,t(r.alphaMap,c.alphaMapTransform)),r.bumpMap&&(c.bumpMap.value=r.bumpMap,t(r.bumpMap,c.bumpMapTransform),c.bumpScale.value=r.bumpScale,r.side===1&&(c.bumpScale.value*=-1)),r.normalMap&&(c.normalMap.value=r.normalMap,t(r.normalMap,c.normalMapTransform),c.normalScale.value.copy(r.normalScale),r.side===1&&c.normalScale.value.negate()),r.displacementMap&&(c.displacementMap.value=r.displacementMap,t(r.displacementMap,c.displacementMapTransform),c.displacementScale.value=r.displacementScale,c.displacementBias.value=r.displacementBias),r.emissiveMap&&(c.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,c.emissiveMapTransform)),r.specularMap&&(c.specularMap.value=r.specularMap,t(r.specularMap,c.specularMapTransform)),r.alphaTest>0&&(c.alphaTest.value=r.alphaTest);const h=i.get(r).envMap;if(h&&(c.envMap.value=h,c.flipEnvMap.value=h.isCubeTexture&&h.isRenderTargetTexture===!1?-1:1,c.reflectivity.value=r.reflectivity,c.ior.value=r.ior,c.refractionRatio.value=r.refractionRatio),r.lightMap){c.lightMap.value=r.lightMap;const E=e._useLegacyLights===!0?Math.PI:1;c.lightMapIntensity.value=r.lightMapIntensity*E,t(r.lightMap,c.lightMapTransform)}r.aoMap&&(c.aoMap.value=r.aoMap,c.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,c.aoMapTransform))}function p(c,r){c.diffuse.value.copy(r.color),c.opacity.value=r.opacity,r.map&&(c.map.value=r.map,t(r.map,c.mapTransform))}function a(c,r){c.dashSize.value=r.dashSize,c.totalSize.value=r.dashSize+r.gapSize,c.scale.value=r.scale}function v(c,r,h,E){c.diffuse.value.copy(r.color),c.opacity.value=r.opacity,c.size.value=r.size*h,c.scale.value=E*.5,r.map&&(c.map.value=r.map,t(r.map,c.uvTransform)),r.alphaMap&&(c.alphaMap.value=r.alphaMap,t(r.alphaMap,c.alphaMapTransform)),r.alphaTest>0&&(c.alphaTest.value=r.alphaTest)}function m(c,r){c.diffuse.value.copy(r.color),c.opacity.value=r.opacity,c.rotation.value=r.rotation,r.map&&(c.map.value=r.map,t(r.map,c.mapTransform)),r.alphaMap&&(c.alphaMap.value=r.alphaMap,t(r.alphaMap,c.alphaMapTransform)),r.alphaTest>0&&(c.alphaTest.value=r.alphaTest)}function T(c,r){c.specular.value.copy(r.specular),c.shininess.value=Math.max(r.shininess,1e-4)}function S(c,r){r.gradientMap&&(c.gradientMap.value=r.gradientMap)}function M(c,r){c.metalness.value=r.metalness,r.metalnessMap&&(c.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,c.metalnessMapTransform)),c.roughness.value=r.roughness,r.roughnessMap&&(c.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,c.roughnessMapTransform)),i.get(r).envMap&&(c.envMapIntensity.value=r.envMapIntensity)}function P(c,r,h){c.ior.value=r.ior,r.sheen>0&&(c.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),c.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(c.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,c.sheenColorMapTransform)),r.sheenRoughnessMap&&(c.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,c.sheenRoughnessMapTransform))),r.clearcoat>0&&(c.clearcoat.value=r.clearcoat,c.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(c.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,c.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(c.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===1&&c.clearcoatNormalScale.value.negate())),r.iridescence>0&&(c.iridescence.value=r.iridescence,c.iridescenceIOR.value=r.iridescenceIOR,c.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(c.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,c.iridescenceMapTransform)),r.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),r.transmission>0&&(c.transmission.value=r.transmission,c.transmissionSamplerMap.value=h.texture,c.transmissionSamplerSize.value.set(h.width,h.height),r.transmissionMap&&(c.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,c.transmissionMapTransform)),c.thickness.value=r.thickness,r.thicknessMap&&(c.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=r.attenuationDistance,c.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(c.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(c.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=r.specularIntensity,c.specularColor.value.copy(r.specularColor),r.specularColorMap&&(c.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,c.specularColorMapTransform)),r.specularIntensityMap&&(c.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,c.specularIntensityMapTransform))}function b(c,r){r.matcap&&(c.matcap.value=r.matcap)}function x(c,r){const h=i.get(r).light;c.referencePosition.value.setFromMatrixPosition(h.matrixWorld),c.nearDistance.value=h.shadow.camera.near,c.farDistance.value=h.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:o}}function xl(e,i,t,n){let o={},s={},p=[];const a=t.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function v(h,E){const N=E.program;n.uniformBlockBinding(h,N)}function m(h,E){let N=o[h.id];N===void 0&&(b(h),N=T(h),o[h.id]=N,h.addEventListener("dispose",c));const O=E.program;n.updateUBOMapping(h,O);const L=i.render.frame;s[h.id]!==L&&(M(h),s[h.id]=L)}function T(h){const E=S();h.__bindingPointIndex=E;const N=e.createBuffer(),O=h.__size,L=h.usage;return e.bindBuffer(e.UNIFORM_BUFFER,N),e.bufferData(e.UNIFORM_BUFFER,O,L),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,E,N),N}function S(){for(let h=0;h<a;h++)if(p.indexOf(h)===-1)return p.push(h),h;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function M(h){const E=o[h.id],N=h.uniforms,O=h.__cache;e.bindBuffer(e.UNIFORM_BUFFER,E);for(let L=0,F=N.length;L<F;L++){const X=Array.isArray(N[L])?N[L]:[N[L]];for(let u=0,g=X.length;u<g;u++){const G=X[u];if(P(G,L,u,O)===!0){const te=G.__offset,pe=Array.isArray(G.value)?G.value:[G.value];let A=0;for(let B=0;B<pe.length;B++){const H=pe[B],Z=x(H);typeof H=="number"||typeof H=="boolean"?(G.__data[0]=H,e.bufferSubData(e.UNIFORM_BUFFER,te+A,G.__data)):H.isMatrix3?(G.__data[0]=H.elements[0],G.__data[1]=H.elements[1],G.__data[2]=H.elements[2],G.__data[3]=0,G.__data[4]=H.elements[3],G.__data[5]=H.elements[4],G.__data[6]=H.elements[5],G.__data[7]=0,G.__data[8]=H.elements[6],G.__data[9]=H.elements[7],G.__data[10]=H.elements[8],G.__data[11]=0):(H.toArray(G.__data,A),A+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,te,G.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function P(h,E,N,O){const L=h.value,F=E+"_"+N;if(O[F]===void 0)return typeof L=="number"||typeof L=="boolean"?O[F]=L:O[F]=L.clone(),!0;{const X=O[F];if(typeof L=="number"||typeof L=="boolean"){if(X!==L)return O[F]=L,!0}else if(X.equals(L)===!1)return X.copy(L),!0}return!1}function b(h){const E=h.uniforms;let N=0;const O=16;for(let F=0,X=E.length;F<X;F++){const u=Array.isArray(E[F])?E[F]:[E[F]];for(let g=0,G=u.length;g<G;g++){const te=u[g],pe=Array.isArray(te.value)?te.value:[te.value];for(let A=0,B=pe.length;A<B;A++){const H=pe[A],Z=x(H),z=N%O;z!==0&&O-z<Z.boundary&&(N+=O-z),te.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),te.__offset=N,N+=Z.storage}}}const L=N%O;return L>0&&(N+=O-L),h.__size=N,h.__cache={},this}function x(h){const E={boundary:0,storage:0};return typeof h=="number"||typeof h=="boolean"?(E.boundary=4,E.storage=4):h.isVector2?(E.boundary=8,E.storage=8):h.isVector3||h.isColor?(E.boundary=16,E.storage=12):h.isVector4?(E.boundary=16,E.storage=16):h.isMatrix3?(E.boundary=48,E.storage=48):h.isMatrix4?(E.boundary=64,E.storage=64):h.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",h),E}function c(h){const E=h.target;E.removeEventListener("dispose",c);const N=p.indexOf(E.__bindingPointIndex);p.splice(N,1),e.deleteBuffer(o[E.id]),delete o[E.id],delete s[E.id]}function r(){for(const h in o)e.deleteBuffer(o[h]);p=[],o={},s={}}return{bind:v,update:m,dispose:r}}var yc=class{constructor(e={}){const{canvas:i=An(),context:t=null,depth:n=!0,stencil:o=!0,alpha:s=!1,antialias:p=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:v=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:T=!1}=e;this.isWebGLRenderer=!0;let S;t!==null?S=t.getContextAttributes().alpha:S=s;const M=new Uint32Array(4),P=new Int32Array(4);let b=null,x=null;const c=[],r=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ht,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;const h=this;let E=!1,N=0,O=0,L=null,F=-1,X=null;const u=new at,g=new at;let G=null;const te=new Ze(0);let pe=0,A=i.width,B=i.height,H=1,Z=null,z=null;const W=new at(0,0,A,B),ne=new at(0,0,A,B);let ee=!1;const D=new Xi;let V=!1,ae=!1,ce=null;const ve=new ii,Ee=new ct,we=new He,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Be(){return L===null?H:1}let C=t;function it(f,R){for(let y=0;y<f.length;y++){const I=f[y],U=i.getContext(I,R);if(U!==null)return U}return null}try{const f={alpha:!0,depth:n,stencil:o,antialias:p,premultipliedAlpha:a,preserveDrawingBuffer:v,powerPreference:m,failIfMajorPerformanceCaveat:T};if("setAttribute"in i&&i.setAttribute("data-engine","three.js r160"),i.addEventListener("webglcontextlost",We,!1),i.addEventListener("webglcontextrestored",$,!1),i.addEventListener("webglcontextcreationerror",_,!1),C===null){const R=["webgl2","webgl","experimental-webgl"];if(h.isWebGL1Renderer===!0&&R.shift(),C=it(R,f),C===null)throw it(R)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&C instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),C.getShaderPrecisionFormat===void 0&&(C.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(f){throw console.error("THREE.WebGLRenderer: "+f.message),f}let Oe,de,ge,Ae,Ie,Pe,d,l,w,K,k,Y,me,ie,oe,fe,Re,q,Ke,De,Te,se,le,ye;function Ve(){Oe=new yo(C),de=new Lo(C,Oe,e),Oe.init(de),se=new vl(C,Oe,de),ge=new _l(C,Oe,de),Ae=new Oo(C),Ie=new il,Pe=new gl(C,Oe,ge,Ie,de,se,Ae),d=new Po(h),l=new Do(h),w=new Wn(C,de),le=new Ro(C,Oe,w,de),K=new Io(C,w,Ae,le),k=new Ho(C,K,w,Ae),Ke=new Bo(C,de,Pe),fe=new Co(Ie),Y=new tl(h,d,l,Oe,de,le,fe),me=new Tl(h,Ie),ie=new rl,oe=new fl(Oe,de),q=new Ao(h,d,l,ge,k,S,a),Re=new ml(h,k,de),ye=new xl(C,Ae,de,ge),De=new bo(C,Oe,Ae,de),Te=new No(C,Oe,Ae,de),Ae.programs=Y.programs,h.capabilities=de,h.extensions=Oe,h.properties=Ie,h.renderLists=ie,h.shadowMap=Re,h.state=ge,h.info=Ae}Ve();const Fe=new Ml(h,C);this.xr=Fe,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const f=Oe.get("WEBGL_lose_context");f&&f.loseContext()},this.forceContextRestore=function(){const f=Oe.get("WEBGL_lose_context");f&&f.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(f){f!==void 0&&(H=f,this.setSize(A,B,!1))},this.getSize=function(f){return f.set(A,B)},this.setSize=function(f,R,y=!0){if(Fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}A=f,B=R,i.width=Math.floor(f*H),i.height=Math.floor(R*H),y===!0&&(i.style.width=f+"px",i.style.height=R+"px"),this.setViewport(0,0,f,R)},this.getDrawingBufferSize=function(f){return f.set(A*H,B*H).floor()},this.setDrawingBufferSize=function(f,R,y){A=f,B=R,H=y,i.width=Math.floor(f*y),i.height=Math.floor(R*y),this.setViewport(0,0,f,R)},this.getCurrentViewport=function(f){return f.copy(u)},this.getViewport=function(f){return f.copy(W)},this.setViewport=function(f,R,y,I){f.isVector4?W.set(f.x,f.y,f.z,f.w):W.set(f,R,y,I),ge.viewport(u.copy(W).multiplyScalar(H).floor())},this.getScissor=function(f){return f.copy(ne)},this.setScissor=function(f,R,y,I){f.isVector4?ne.set(f.x,f.y,f.z,f.w):ne.set(f,R,y,I),ge.scissor(g.copy(ne).multiplyScalar(H).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(f){ge.setScissorTest(ee=f)},this.setOpaqueSort=function(f){Z=f},this.setTransparentSort=function(f){z=f},this.getClearColor=function(f){return f.copy(q.getClearColor())},this.setClearColor=function(){q.setClearColor.apply(q,arguments)},this.getClearAlpha=function(){return q.getClearAlpha()},this.setClearAlpha=function(){q.setClearAlpha.apply(q,arguments)},this.clear=function(f=!0,R=!0,y=!0){let I=0;if(f){let U=!1;if(L!==null){const Q=L.texture.format;U=Q===1033||Q===1031||Q===1029}if(U){const Q=L.texture.type,ue=Q===1009||Q===1014||Q===1012||Q===1020||Q===1017||Q===1018,_e=q.getClearColor(),Me=q.getClearAlpha(),Ne=_e.r,Ce=_e.g,be=_e.b;ue?(M[0]=Ne,M[1]=Ce,M[2]=be,M[3]=Me,C.clearBufferuiv(C.COLOR,0,M)):(P[0]=Ne,P[1]=Ce,P[2]=be,P[3]=Me,C.clearBufferiv(C.COLOR,0,P))}else I|=C.COLOR_BUFFER_BIT}R&&(I|=C.DEPTH_BUFFER_BIT),y&&(I|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(I)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",We,!1),i.removeEventListener("webglcontextrestored",$,!1),i.removeEventListener("webglcontextcreationerror",_,!1),ie.dispose(),oe.dispose(),Ie.dispose(),d.dispose(),l.dispose(),k.dispose(),le.dispose(),ye.dispose(),Y.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Ye),Fe.removeEventListener("sessionend",ot),ce&&(ce.dispose(),ce=null),Ge.stop()};function We(f){f.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const f=Ae.autoReset,R=Re.enabled,y=Re.autoUpdate,I=Re.needsUpdate,U=Re.type;Ve(),Ae.autoReset=f,Re.enabled=R,Re.autoUpdate=y,Re.needsUpdate=I,Re.type=U}function _(f){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",f.statusMessage)}function j(f){const R=f.target;R.removeEventListener("dispose",j),re(R)}function re(f){xe(f),Ie.remove(f)}function xe(f){const R=Ie.get(f).programs;R!==void 0&&(R.forEach(function(y){Y.releaseProgram(y)}),f.isShaderMaterial&&Y.releaseShaderCache(f))}this.renderBufferDirect=function(f,R,y,I,U,Q){R===null&&(R=Se);const ue=U.isMesh&&U.matrixWorld.determinant()<0,_e=an(f,R,y,I,U);ge.setMaterial(I,ue);let Me=y.index,Ne=1;if(I.wireframe===!0){if(Me=K.getWireframeAttribute(y),Me===void 0)return;Ne=2}const Ce=y.drawRange,be=y.attributes.position;let Qe=Ce.start*Ne,$e=(Ce.start+Ce.count)*Ne;Q!==null&&(Qe=Math.max(Qe,Q.start*Ne),$e=Math.min($e,(Q.start+Q.count)*Ne)),Me!==null?(Qe=Math.max(Qe,0),$e=Math.min($e,Me.count)):be!=null&&(Qe=Math.max(Qe,0),$e=Math.min($e,be.count));const st=$e-Qe;if(st<0||st===1/0)return;le.setup(U,I,_e,y,Me);let ht,qe=De;if(Me!==null&&(ht=w.get(Me),qe=Te,qe.setIndex(ht)),U.isMesh)I.wireframe===!0?(ge.setLineWidth(I.wireframeLinewidth*Be()),qe.setMode(C.LINES)):qe.setMode(C.TRIANGLES);else if(U.isLine){let Ue=I.linewidth;Ue===void 0&&(Ue=1),ge.setLineWidth(Ue*Be()),U.isLineSegments?qe.setMode(C.LINES):U.isLineLoop?qe.setMode(C.LINE_LOOP):qe.setMode(C.LINE_STRIP)}else U.isPoints?qe.setMode(C.POINTS):U.isSprite&&qe.setMode(C.TRIANGLES);if(U.isBatchedMesh)qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)qe.renderInstances(Qe,st,U.count);else if(y.isInstancedBufferGeometry){const Ue=y._maxInstanceCount!==void 0?y._maxInstanceCount:1/0,Wt=Math.min(y.instanceCount,Ue);qe.renderInstances(Qe,st,Wt)}else qe.render(Qe,st)};function he(f,R,y){f.transparent===!0&&f.side===2&&f.forceSinglePass===!1?(f.side=1,f.needsUpdate=!0,It(f,R,y),f.side=0,f.needsUpdate=!0,It(f,R,y),f.side=2):It(f,R,y)}this.compile=function(f,R,y=null){y===null&&(y=f),x=oe.get(y),x.init(),r.push(x),y.traverseVisible(function(U){U.isLight&&U.layers.test(R.layers)&&(x.pushLight(U),U.castShadow&&x.pushShadow(U))}),f!==y&&f.traverseVisible(function(U){U.isLight&&U.layers.test(R.layers)&&(x.pushLight(U),U.castShadow&&x.pushShadow(U))}),x.setupLights(h._useLegacyLights);const I=new Set;return f.traverse(function(U){const Q=U.material;if(Q)if(Array.isArray(Q))for(let ue=0;ue<Q.length;ue++){const _e=Q[ue];he(_e,y,U),I.add(_e)}else he(Q,y,U),I.add(Q)}),r.pop(),x=null,I},this.compileAsync=function(f,R,y=null){const I=this.compile(f,R,y);return new Promise(U=>{function Q(){if(I.forEach(function(ue){Ie.get(ue).currentProgram.isReady()&&I.delete(ue)}),I.size===0){U(f);return}setTimeout(Q,10)}Oe.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ze=null;function ke(f){ze&&ze(f)}function Ye(){Ge.stop()}function ot(){Ge.start()}const Ge=new Zi;Ge.setAnimationLoop(ke),typeof self<"u"&&Ge.setContext(self),this.setAnimationLoop=function(f){ze=f,Fe.setAnimationLoop(f),f===null?Ge.stop():Ge.start()},Fe.addEventListener("sessionstart",Ye),Fe.addEventListener("sessionend",ot),this.render=function(f,R){if(R!==void 0&&R.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(R),R=Fe.getCamera()),f.isScene===!0&&f.onBeforeRender(h,f,R,L),x=oe.get(f,r.length),x.init(),r.push(x),ve.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),D.setFromProjectionMatrix(ve),ae=this.localClippingEnabled,V=fe.init(this.clippingPlanes,ae),b=ie.get(f,c.length),b.init(),c.push(b),dt(f,R,0,h.sortObjects),b.finish(),h.sortObjects===!0&&b.sort(Z,z),this.info.render.frame++,V===!0&&fe.beginShadows();const y=x.state.shadowsArray;if(Re.render(y,f,R),V===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),q.render(b,f),x.setupLights(h._useLegacyLights),R.isArrayCamera){const I=R.cameras;for(let U=0,Q=I.length;U<Q;U++){const ue=I[U];ut(b,f,ue,ue.viewport)}}else ut(b,f,R);L!==null&&(Pe.updateMultisampleRenderTarget(L),Pe.updateRenderTargetMipmap(L)),f.isScene===!0&&f.onAfterRender(h,f,R),le.resetDefaultState(),F=-1,X=null,r.pop(),r.length>0?x=r[r.length-1]:x=null,c.pop(),c.length>0?b=c[c.length-1]:b=null};function dt(f,R,y,I){if(f.visible===!1)return;if(f.layers.test(R.layers)){if(f.isGroup)y=f.renderOrder;else if(f.isLOD)f.autoUpdate===!0&&f.update(R);else if(f.isLight)x.pushLight(f),f.castShadow&&x.pushShadow(f);else if(f.isSprite){if(!f.frustumCulled||D.intersectsSprite(f)){I&&we.setFromMatrixPosition(f.matrixWorld).applyMatrix4(ve);const Q=k.update(f),ue=f.material;ue.visible&&b.push(f,Q,ue,y,we.z,null)}}else if((f.isMesh||f.isLine||f.isPoints)&&(!f.frustumCulled||D.intersectsObject(f))){const Q=k.update(f),ue=f.material;if(I&&(f.boundingSphere!==void 0?(f.boundingSphere===null&&f.computeBoundingSphere(),we.copy(f.boundingSphere.center)):(Q.boundingSphere===null&&Q.computeBoundingSphere(),we.copy(Q.boundingSphere.center)),we.applyMatrix4(f.matrixWorld).applyMatrix4(ve)),Array.isArray(ue)){const _e=Q.groups;for(let Me=0,Ne=_e.length;Me<Ne;Me++){const Ce=_e[Me],be=ue[Ce.materialIndex];be&&be.visible&&b.push(f,Q,be,y,we.z,Ce)}}else ue.visible&&b.push(f,Q,ue,y,we.z,null)}}const U=f.children;for(let Q=0,ue=U.length;Q<ue;Q++)dt(U[Q],R,y,I)}function ut(f,R,y,I){const U=f.opaque,Q=f.transmissive,ue=f.transparent;x.setupLightsView(y),V===!0&&fe.setGlobalState(h.clippingPlanes,y),Q.length>0&&rn(U,Q,R,y),I&&ge.viewport(u.copy(I)),U.length>0&&yt(U,R,y),Q.length>0&&yt(Q,R,y),ue.length>0&&yt(ue,R,y),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function rn(f,R,y,I){if((y.isScene===!0?y.overrideMaterial:null)!==null)return;const U=de.isWebGL2;ce===null&&(ce=new St(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")?Wi:Qt,minFilter:Hi,samples:U?4:0})),h.getDrawingBufferSize(Ee),U?ce.setSize(Ee.x,Ee.y):ce.setSize(ei(Ee.x),ei(Ee.y));const Q=h.getRenderTarget();h.setRenderTarget(ce),h.getClearColor(te),pe=h.getClearAlpha(),pe<1&&h.setClearColor(16777215,.5),h.clear();const ue=h.toneMapping;h.toneMapping=0,yt(f,y,I),Pe.updateMultisampleRenderTarget(ce),Pe.updateRenderTargetMipmap(ce);let _e=!1;for(let Me=0,Ne=R.length;Me<Ne;Me++){const Ce=R[Me],be=Ce.object,Qe=Ce.geometry,$e=Ce.material,st=Ce.group;if($e.side===2&&be.layers.test(I.layers)){const ht=$e.side;$e.side=1,$e.needsUpdate=!0,di(be,y,I,Qe,$e,st),$e.side=ht,$e.needsUpdate=!0,_e=!0}}_e===!0&&(Pe.updateMultisampleRenderTarget(ce),Pe.updateRenderTargetMipmap(ce)),h.setRenderTarget(Q),h.setClearColor(te,pe),h.toneMapping=ue}function yt(f,R,y){const I=R.isScene===!0?R.overrideMaterial:null;for(let U=0,Q=f.length;U<Q;U++){const ue=f[U],_e=ue.object,Me=ue.geometry,Ne=I===null?ue.material:I,Ce=ue.group;_e.layers.test(y.layers)&&di(_e,R,y,Me,Ne,Ce)}}function di(f,R,y,I,U,Q){f.onBeforeRender(h,R,y,I,U,Q),f.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,f.matrixWorld),f.normalMatrix.getNormalMatrix(f.modelViewMatrix),U.onBeforeRender(h,R,y,I,f,Q),U.transparent===!0&&U.side===2&&U.forceSinglePass===!1?(U.side=1,U.needsUpdate=!0,h.renderBufferDirect(y,R,I,U,f,Q),U.side=0,U.needsUpdate=!0,h.renderBufferDirect(y,R,I,U,f,Q),U.side=2):h.renderBufferDirect(y,R,I,U,f,Q),f.onAfterRender(h,R,y,I,U,Q)}function It(f,R,y){R.isScene!==!0&&(R=Se);const I=Ie.get(f),U=x.state.lights,Q=x.state.shadowsArray,ue=U.state.version,_e=Y.getParameters(f,U.state,Q,R,y),Me=Y.getProgramCacheKey(_e);let Ne=I.programs;I.environment=f.isMeshStandardMaterial?R.environment:null,I.fog=R.fog,I.envMap=(f.isMeshStandardMaterial?l:d).get(f.envMap||I.environment),Ne===void 0&&(f.addEventListener("dispose",j),Ne=new Map,I.programs=Ne);let Ce=Ne.get(Me);if(Ce!==void 0){if(I.currentProgram===Ce&&I.lightsStateVersion===ue)return pi(f,_e),Ce}else _e.uniforms=Y.getUniforms(f),f.onBuild(y,_e,h),f.onBeforeCompile(_e,h),Ce=Y.acquireProgram(_e,Me),Ne.set(Me,Ce),I.uniforms=_e.uniforms;const be=I.uniforms;return(!f.isShaderMaterial&&!f.isRawShaderMaterial||f.clipping===!0)&&(be.clippingPlanes=fe.uniform),pi(f,_e),I.needsLights=sn(f),I.lightsStateVersion=ue,I.needsLights&&(be.ambientLightColor.value=U.state.ambient,be.lightProbe.value=U.state.probe,be.directionalLights.value=U.state.directional,be.directionalLightShadows.value=U.state.directionalShadow,be.spotLights.value=U.state.spot,be.spotLightShadows.value=U.state.spotShadow,be.rectAreaLights.value=U.state.rectArea,be.ltc_1.value=U.state.rectAreaLTC1,be.ltc_2.value=U.state.rectAreaLTC2,be.pointLights.value=U.state.point,be.pointLightShadows.value=U.state.pointShadow,be.hemisphereLights.value=U.state.hemi,be.directionalShadowMap.value=U.state.directionalShadowMap,be.directionalShadowMatrix.value=U.state.directionalShadowMatrix,be.spotShadowMap.value=U.state.spotShadowMap,be.spotLightMatrix.value=U.state.spotLightMatrix,be.spotLightMap.value=U.state.spotLightMap,be.pointShadowMap.value=U.state.pointShadowMap,be.pointShadowMatrix.value=U.state.pointShadowMatrix),I.currentProgram=Ce,I.uniformsList=null,Ce}function ui(f){if(f.uniformsList===null){const R=f.currentProgram.getUniforms();f.uniformsList=Bt.seqWithValue(R.seq,f.uniforms)}return f.uniformsList}function pi(f,R){const y=Ie.get(f);y.outputColorSpace=R.outputColorSpace,y.batching=R.batching,y.instancing=R.instancing,y.instancingColor=R.instancingColor,y.skinning=R.skinning,y.morphTargets=R.morphTargets,y.morphNormals=R.morphNormals,y.morphColors=R.morphColors,y.morphTargetsCount=R.morphTargetsCount,y.numClippingPlanes=R.numClippingPlanes,y.numIntersection=R.numClipIntersection,y.vertexAlphas=R.vertexAlphas,y.vertexTangents=R.vertexTangents,y.toneMapping=R.toneMapping}function an(f,R,y,I,U){R.isScene!==!0&&(R=Se),Pe.resetTextureUnits();const Q=R.fog,ue=I.isMeshStandardMaterial?R.environment:null,_e=L===null?h.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Dt,Me=(I.isMeshStandardMaterial?l:d).get(I.envMap||ue),Ne=I.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,Ce=!!y.attributes.tangent&&(!!I.normalMap||I.anisotropy>0),be=!!y.morphAttributes.position,Qe=!!y.morphAttributes.normal,$e=!!y.morphAttributes.color;let st=0;I.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(st=h.toneMapping);const ht=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,qe=ht!==void 0?ht.length:0,Ue=Ie.get(I),Wt=x.state.lights;if(V===!0&&(ae===!0||f!==X)){const lt=f===X&&I.id===F;fe.setState(I,f,lt)}let Xe=!1;I.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Wt.state.version||Ue.outputColorSpace!==_e||U.isBatchedMesh&&Ue.batching===!1||!U.isBatchedMesh&&Ue.batching===!0||U.isInstancedMesh&&Ue.instancing===!1||!U.isInstancedMesh&&Ue.instancing===!0||U.isSkinnedMesh&&Ue.skinning===!1||!U.isSkinnedMesh&&Ue.skinning===!0||U.isInstancedMesh&&Ue.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ue.instancingColor===!1&&U.instanceColor!==null||Ue.envMap!==Me||I.fog===!0&&Ue.fog!==Q||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==fe.numPlanes||Ue.numIntersection!==fe.numIntersection)||Ue.vertexAlphas!==Ne||Ue.vertexTangents!==Ce||Ue.morphTargets!==be||Ue.morphNormals!==Qe||Ue.morphColors!==$e||Ue.toneMapping!==st||de.isWebGL2===!0&&Ue.morphTargetsCount!==qe)&&(Xe=!0):(Xe=!0,Ue.__version=I.version);let gt=Ue.currentProgram;Xe===!0&&(gt=It(I,R,U));let hi=!1,wt=!1,zt=!1;const et=gt.getUniforms(),vt=Ue.uniforms;if(ge.useProgram(gt.program)&&(hi=!0,wt=!0,zt=!0),I.id!==F&&(F=I.id,wt=!0),hi||X!==f){et.setValue(C,"projectionMatrix",f.projectionMatrix),et.setValue(C,"viewMatrix",f.matrixWorldInverse);const lt=et.map.cameraPosition;lt!==void 0&&lt.setValue(C,we.setFromMatrixPosition(f.matrixWorld)),de.logarithmicDepthBuffer&&et.setValue(C,"logDepthBufFC",2/(Math.log(f.far+1)/Math.LN2)),(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial)&&et.setValue(C,"isOrthographic",f.isOrthographicCamera===!0),X!==f&&(X=f,wt=!0,zt=!0)}if(U.isSkinnedMesh){et.setOptional(C,U,"bindMatrix"),et.setOptional(C,U,"bindMatrixInverse");const lt=U.skeleton;lt&&(de.floatVertexTextures?(lt.boneTexture===null&&lt.computeBoneTexture(),et.setValue(C,"boneTexture",lt.boneTexture,Pe)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}U.isBatchedMesh&&(et.setOptional(C,U,"batchingTexture"),et.setValue(C,"batchingTexture",U._matricesTexture,Pe));const kt=y.morphAttributes;if((kt.position!==void 0||kt.normal!==void 0||kt.color!==void 0&&de.isWebGL2===!0)&&Ke.update(U,y,gt),(wt||Ue.receiveShadow!==U.receiveShadow)&&(Ue.receiveShadow=U.receiveShadow,et.setValue(C,"receiveShadow",U.receiveShadow)),I.isMeshGouraudMaterial&&I.envMap!==null&&(vt.envMap.value=Me,vt.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),wt&&(et.setValue(C,"toneMappingExposure",h.toneMappingExposure),Ue.needsLights&&on(vt,zt),Q&&I.fog===!0&&me.refreshFogUniforms(vt,Q),me.refreshMaterialUniforms(vt,I,H,B,ce),Bt.upload(C,ui(Ue),vt,Pe)),I.isShaderMaterial&&I.uniformsNeedUpdate===!0&&(Bt.upload(C,ui(Ue),vt,Pe),I.uniformsNeedUpdate=!1),I.isSpriteMaterial&&et.setValue(C,"center",U.center),et.setValue(C,"modelViewMatrix",U.modelViewMatrix),et.setValue(C,"normalMatrix",U.normalMatrix),et.setValue(C,"modelMatrix",U.matrixWorld),I.isShaderMaterial||I.isRawShaderMaterial){const lt=I.uniformsGroups;for(let Xt=0,ln=lt.length;Xt<ln;Xt++)if(de.isWebGL2){const mi=lt[Xt];ye.update(mi,gt),ye.bind(mi,gt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return gt}function on(f,R){f.ambientLightColor.needsUpdate=R,f.lightProbe.needsUpdate=R,f.directionalLights.needsUpdate=R,f.directionalLightShadows.needsUpdate=R,f.pointLights.needsUpdate=R,f.pointLightShadows.needsUpdate=R,f.spotLights.needsUpdate=R,f.spotLightShadows.needsUpdate=R,f.rectAreaLights.needsUpdate=R,f.hemisphereLights.needsUpdate=R}function sn(f){return f.isMeshLambertMaterial||f.isMeshToonMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isShadowMaterial||f.isShaderMaterial&&f.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(f,R,y){Ie.get(f.texture).__webglTexture=R,Ie.get(f.depthTexture).__webglTexture=y;const I=Ie.get(f);I.__hasExternalTextures=!0,I.__hasExternalTextures&&(I.__autoAllocateDepthBuffer=y===void 0,I.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),I.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(f,R){const y=Ie.get(f);y.__webglFramebuffer=R,y.__useDefaultFramebuffer=R===void 0},this.setRenderTarget=function(f,R=0,y=0){L=f,N=R,O=y;let I=!0,U=null,Q=!1,ue=!1;if(f){const _e=Ie.get(f);_e.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(C.FRAMEBUFFER,null),I=!1):_e.__webglFramebuffer===void 0?Pe.setupRenderTarget(f):_e.__hasExternalTextures&&Pe.rebindTextures(f,Ie.get(f.texture).__webglTexture,Ie.get(f.depthTexture).__webglTexture);const Me=f.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(ue=!0);const Ne=Ie.get(f).__webglFramebuffer;f.isWebGLCubeRenderTarget?(Array.isArray(Ne[R])?U=Ne[R][y]:U=Ne[R],Q=!0):de.isWebGL2&&f.samples>0&&Pe.useMultisampledRTT(f)===!1?U=Ie.get(f).__webglMultisampledFramebuffer:Array.isArray(Ne)?U=Ne[y]:U=Ne,u.copy(f.viewport),g.copy(f.scissor),G=f.scissorTest}else u.copy(W).multiplyScalar(H).floor(),g.copy(ne).multiplyScalar(H).floor(),G=ee;if(ge.bindFramebuffer(C.FRAMEBUFFER,U)&&de.drawBuffers&&I&&ge.drawBuffers(f,U),ge.viewport(u),ge.scissor(g),ge.setScissorTest(G),Q){const _e=Ie.get(f.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+R,_e.__webglTexture,y)}else if(ue){const _e=Ie.get(f.texture),Me=R||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,_e.__webglTexture,y||0,Me)}F=-1},this.readRenderTargetPixels=function(f,R,y,I,U,Q,ue){if(!(f&&f.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Ie.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&ue!==void 0&&(_e=_e[ue]),_e){ge.bindFramebuffer(C.FRAMEBUFFER,_e);try{const Me=f.texture,Ne=Me.format,Ce=Me.type;if(Ne!==1023&&se.convert(Ne)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const be=Ce===1016&&(Oe.has("EXT_color_buffer_half_float")||de.isWebGL2&&Oe.has("EXT_color_buffer_float"));if(Ce!==1009&&se.convert(Ce)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===1015&&(de.isWebGL2||Oe.has("OES_texture_float")||Oe.has("WEBGL_color_buffer_float")))&&!be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}R>=0&&R<=f.width-I&&y>=0&&y<=f.height-U&&C.readPixels(R,y,I,U,se.convert(Ne),se.convert(Ce),Q)}finally{const Me=L!==null?Ie.get(L).__webglFramebuffer:null;ge.bindFramebuffer(C.FRAMEBUFFER,Me)}}},this.copyFramebufferToTexture=function(f,R,y=0){const I=Math.pow(2,-y),U=Math.floor(R.image.width*I),Q=Math.floor(R.image.height*I);Pe.setTexture2D(R,0),C.copyTexSubImage2D(C.TEXTURE_2D,y,0,0,f.x,f.y,U,Q),ge.unbindTexture()},this.copyTextureToTexture=function(f,R,y,I=0){const U=R.image.width,Q=R.image.height,ue=se.convert(y.format),_e=se.convert(y.type);Pe.setTexture2D(y,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,y.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,y.unpackAlignment),R.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,I,f.x,f.y,U,Q,ue,_e,R.image.data):R.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,I,f.x,f.y,R.mipmaps[0].width,R.mipmaps[0].height,ue,R.mipmaps[0].data):C.texSubImage2D(C.TEXTURE_2D,I,f.x,f.y,ue,_e,R.image),I===0&&y.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(f,R,y,I,U=0){if(h.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Q=f.max.x-f.min.x+1,ue=f.max.y-f.min.y+1,_e=f.max.z-f.min.z+1,Me=se.convert(I.format),Ne=se.convert(I.type);let Ce;if(I.isData3DTexture)Pe.setTexture3D(I,0),Ce=C.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)Pe.setTexture2DArray(I,0),Ce=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);const be=C.getParameter(C.UNPACK_ROW_LENGTH),Qe=C.getParameter(C.UNPACK_IMAGE_HEIGHT),$e=C.getParameter(C.UNPACK_SKIP_PIXELS),st=C.getParameter(C.UNPACK_SKIP_ROWS),ht=C.getParameter(C.UNPACK_SKIP_IMAGES),qe=y.isCompressedTexture?y.mipmaps[U]:y.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,qe.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,qe.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,f.min.x),C.pixelStorei(C.UNPACK_SKIP_ROWS,f.min.y),C.pixelStorei(C.UNPACK_SKIP_IMAGES,f.min.z),y.isDataTexture||y.isData3DTexture?C.texSubImage3D(Ce,U,R.x,R.y,R.z,Q,ue,_e,Me,Ne,qe.data):y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),C.compressedTexSubImage3D(Ce,U,R.x,R.y,R.z,Q,ue,_e,Me,qe.data)):C.texSubImage3D(Ce,U,R.x,R.y,R.z,Q,ue,_e,Me,Ne,qe),C.pixelStorei(C.UNPACK_ROW_LENGTH,be),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Qe),C.pixelStorei(C.UNPACK_SKIP_PIXELS,$e),C.pixelStorei(C.UNPACK_SKIP_ROWS,st),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ht),U===0&&I.generateMipmaps&&C.generateMipmap(Ce),ge.unbindTexture()},this.initTexture=function(f){f.isCubeTexture?Pe.setTextureCube(f,0):f.isData3DTexture?Pe.setTexture3D(f,0):f.isDataArrayTexture||f.isCompressedArrayTexture?Pe.setTexture2DArray(f,0):Pe.setTexture2D(f,0),ge.unbindTexture()},this.resetState=function(){N=0,O=0,L=null,ge.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=e==="display-p3"?"display-p3":"srgb",i.unpackColorSpace=tt.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?gn:vn}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===3001?Ht:Dt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Ic=class extends Pt{constructor(e,i,t,n,o,s,p,a,v){super(e,i,t,n,o,s,p,a,v),this.isCanvasTexture=!0,this.needsUpdate=!0}};export{zn as a,Mi as i,yc as n,Ft as r,Ic as t};
