"use strict";(self.webpackChunkluichewjohor=self.webpackChunkluichewjohor||[]).push([[149],{2149:(z,v,a)=>{a.r(v),a.d(v,{CultureModule:()=>G});var d=a(6895),s=a(433),c=a(1779),I=a(4466),x=a(5861),h=a(5843),y=a(8505),p=a(4004);class _{constructor(o,t,i,u,l,n){this.header=i,this.headerImage=l,this.description=o,this.images=u,this.key=n,this.seq=t}}var e=a(4650);class b{constructor(o,t,i){this.path=o,this.fileList=t,this.attribute=i}}var w=a(5698),L=a(8646),S=a(2248);let F=(()=>{class r{constructor(t,i){this.db=t,this.uploadFileService=i,this.basePath="/culture",this.fileUploadFirebaseLst=[],this.cultureRef=t.list(this.basePath)}storeCulture(t,i,u){this.fileUploadFirebaseLst=[],this.db.list(this.basePath).push(new _(t.description,t.header,t.seq,[],[],null)).then(l=>{const n=this.basePath+"/"+l.key;this.fileUploadFirebaseLst.push(new b(n,i,"images")),this.fileUploadFirebaseLst.push(new b(n,u,"headerImage")),console.log(n),this.uploadFileService.uploadFileList(this.fileUploadFirebaseLst)})}getAll(){return this.cultureRef}getAllCulture(){return this.cultureRef.snapshotChanges().pipe((0,w.q)(1),(0,p.U)(t=>t.map(i=>({key:i.payload.key,...i.payload.val()}))),(0,p.U)(t=>t.sort((i,u)=>i.seq.localeCompare(u.seq))))}getCulture(t){return this.db.object(this.basePath+"/"+t)}deleteCultureDatabase(t){return this.db.list(this.basePath+"/"+t).remove()}deleteCulture(t){this.deleteCultureDatabase(t).catch(i=>console.log(i)),this.uploadFileService.deleteFileStorage(t,this.basePath),console.log("Deleted ID"+t)}updateCulture(t,i){this.db.list(this.basePath).update(t,i)}updateCultureSeq(t){for(let i of t)this.db.list(this.basePath).update(i.key,{seq:i.seq})}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(L.KQ),e.LFG(S.I))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();function U(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",0)(1,"div",29),e._UZ(2,"img",30),e.qZA(),e.TgZ(3,"div",31)(4,"button",4),e.NdJ("click",function(){const l=e.CHM(t).index,n=e.oxw();return e.KtG(n.onDeleteHeaderImage(l))}),e.TgZ(5,"span",32),e._uU(6," \u5220\u9664\u6b64\u56fe"),e.qZA()()(),e.TgZ(7,"label"),e._uU(8),e.qZA()()}if(2&r){const t=o.$implicit,i=o.index;e.xp6(1),e.Q6J("formGroupName",i),e.xp6(1),e.Q6J("src",t.value.result,e.LSH)("alt",t.value.name),e.xp6(6),e.hij(" ",t.value.name,"")}}function E(r,o){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const t=o.$implicit;e.Q6J("value",t.seq),e.xp6(1),e.Oqu(t.seq)}}function N(r,o){1&r&&(e.TgZ(0,"div",34)(1,"sup"),e._uU(2,"*"),e.qZA(),e._uU(3,"Please select your seq "),e.qZA())}function k(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",0)(1,"div",35),e._UZ(2,"img",30),e.qZA(),e.TgZ(3,"div",31)(4,"button",4),e.NdJ("click",function(){const l=e.CHM(t).index,n=e.oxw();return e.KtG(n.onDeleteImage(l))}),e.TgZ(5,"span",32),e._uU(6," \u5220\u9664\u6b64\u56fe"),e.qZA()()(),e.TgZ(7,"label"),e._uU(8),e.qZA()()}if(2&r){const t=o.$implicit,i=o.index;e.xp6(1),e.Q6J("formGroupName",i),e.xp6(1),e.Q6J("src",t.value.result,e.LSH)("alt",t.value.name),e.xp6(6),e.hij(" ",t.value.name,"")}}function J(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",36)(1,"div",37)(2,"div",38),e._UZ(3,"textarea",39),e.qZA(),e.TgZ(4,"div",40)(5,"button",4),e.NdJ("click",function(){const l=e.CHM(t).index,n=e.oxw();return e.KtG(n.onDeleteParagraph(l))}),e.TgZ(6,"span",32),e._uU(7," \u5220\u9664\u6b64\u6bb5"),e.qZA()()()()()}2&r&&e.Q6J("formGroupName",o.index)}let Z=(()=>{class r{constructor(t,i,u){this.cultureService=t,this.route=i,this.router=u,this.editMode=!1,this.imageList=[],this.image="",this.headerImgLst=[],this.headerImg="",this.culture=[]}ngOnInit(){this.route.params.subscribe(t=>{this.id=t.id,this.editMode=null!=t.id,this.initForm()})}ngOnDestroy(){}onSubmit(){let t=this.cultureForm.value;this.editMode&&(this.currentSeq!=t.seq&&this.exchangeSeq(t.seq),this.cultureService.deleteCulture(this.id)),this.cultureService.storeCulture(t,this.imageList,this.headerImgLst),setTimeout(()=>{this.onCancel()},2e3)}onCancel(){this.image="",this.imageList=[],this.editMode=!1,this.culture=[],this.currentSeq="",this.headerImg="",this.headerImgLst=[],this.router.navigate(["../"],{relativeTo:this.route})}get descriptionsControls(){if(this.cultureForm&&this.cultureForm.get("description"))return this.cultureForm.get("description").controls}onAddParagraph(){this.cultureForm.get("description").push(new s.cw({paragraph:new s.NI(null,s.kI.required)}))}onDeleteParagraph(t){this.cultureForm.get("description").removeAt(t)}get imagesControls(){if(this.cultureForm&&this.cultureForm.get("images"))return this.cultureForm.get("images").controls}get headerImageControls(){if(this.cultureForm&&this.cultureForm.get("headerImage"))return this.cultureForm.get("headerImage").controls}createImage(t,i,u){this.cultureForm.get(u).push(new s.cw({result:new s.NI(t,s.kI.required),name:new s.NI(i,s.kI.required)}))}uploadCultureFile(t,i){let u=t.target.files;const l=i?"headerImage":"images";if(u){for(let n of u){i?this.headerImgLst.push(new h.p(n,n.type,n.name)):this.imageList.push(new h.p(n,n.type,n.name));let f=new FileReader;f.onload=m=>{this.createImage(m.target.result,n.name,l)},f.readAsDataURL(n)}this.image=this.imageList.map(n=>n.name).join(","),this.headerImg=this.headerImgLst.map(n=>n.name).join(",")}}getBase64ImageFromUrl(t,i,u,l){var n=this;return(0,x.Z)(function*(){let m=yield(yield fetch(t)).blob();return new Promise((H,K)=>{let g=new FileReader;g.addEventListener("load",function(){H(g.result)},!1),g.onerror=()=>K(n),g.readAsDataURL(m),l?n.headerImgLst.push(new h.p(new File([m],i),u,i,t)):n.imageList.push(new h.p(new File([m],i),u,i,t)),n.image=n.imageList.map(C=>C.name).join(","),n.headerImg=n.headerImgLst.map(C=>C.name).join(",")})})()}uploadExistingFile(t,i,u){this.getBase64ImageFromUrl(t.url,t.name,t.type,u).then(l=>this.createImage(l,t.name,i)).catch(l=>console.error(l))}initForm(){let t;this.cultureForm=new s.cw({header:new s.NI("",s.kI.required),headerImage:new s.Oe([]),images:new s.Oe([]),description:new s.Oe([]),seq:new s.NI("0",s.kI.required)}),this.imageList=[],this.editMode&&this.cultureService.getCulture(this.id).snapshotChanges().pipe((0,y.b)(i=>console.debug(i)),(0,p.U)(i=>({key:i.payload.key,...i.payload.val()}))).subscribe(i=>{t=i,this.updateForm(t)}),this.subscription=this.cultureService.getAllCulture().subscribe(i=>{this.culture=i,this.editMode||(this.culture.push(new _([],this.culture.length.toString())),this.seq.setValue((this.culture.length-1).toString()),this.currentSeq=(this.culture.length-1).toString())})}changeSeq(t){this.seq.setValue(t.target.value)}get seq(){return this.cultureForm.get("seq")}updateForm(t){if(t.description)for(let i of t.description)this.cultureForm.get("description").push(new s.cw({paragraph:new s.NI(i.paragraph,s.kI.required)}));if(t.images)for(let i of t.images)this.uploadExistingFile(i,"images",!1);if(t.header&&this.cultureForm.get("header").patchValue(t.header),t.headerImage)for(let i of t.headerImage)this.uploadExistingFile(i,"headerImage",!0);this.seq.setValue(t.seq),this.currentSeq=t.seq}exchangeSeq(t){let i=this.culture.find(l=>l.seq==t),u=i.key;i.seq=this.currentSeq,i.key=null,console.log(i),this.cultureService.updateCulture(u,i)}onDelete(){this.cultureService.deleteCulture(this.id),this.syncCultureSeq(),this.onCancel()}syncCultureSeq(){const t=this.culture.filter(u=>u.key!==this.id);let i=0;t.forEach(u=>{u.seq=i.toString(),i++}),this.cultureService.updateCultureSeq(t)}onDeleteHeaderImage(t){this.cultureForm.get("headerImage").removeAt(t),this.headerImgLst.splice(t,1),this.headerImg=this.headerImgLst.map(i=>i.name).join(",")}onDeleteImage(t){this.cultureForm.get("images").removeAt(t),this.imageList.splice(t,1),this.image=this.imageList.map(i=>i.name).join(",")}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(F),e.Y36(c.gz),e.Y36(c.F0))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-culture-edit"]],decls:60,vars:13,consts:[[1,"row"],[1,"col-12"],[3,"formGroup","ngSubmit"],["type","submit",1,"btn","btn-success",3,"disabled"],["type","button",1,"btn","btn-danger",3,"click"],["formArrayName","headerImage",1,"row"],["for","headerImage"],["class","row",4,"ngFor","ngForOf"],[1,"col-2"],["type","button",1,"btn","btn-primary",2,"width","50%",3,"click"],[1,"col-10","mt-auto"],["id","image","type","file","accept",".png, .jpeg,.jpg","name","image","multiple","",3,"hidden","change"],["cultureHeaderImageUploader",""],[1,"form-group"],["for","header"],["type","text","id","header","formControlName","header",1,"form-control"],[1,"col-1"],["for","seq"],[1,"col-7"],["aria-label",".form-select-md example","formControlName","seq","id","seq",1,"form-select","form-select-md","mb-3",3,"change"],[3,"value",4,"ngFor","ngForOf"],["class","invalid-feedback",4,"ngIf"],["formArrayName","images",1,"row"],["id","image","type","file","accept",".gif,.bmp, .png, .jpeg, .jpg, .pdf","name","image","multiple","",3,"hidden","change"],["cultureFileUploader",""],["formArrayName","description",1,"col-12"],["for","description"],["class","row","style","margin-top: 10px",3,"formGroupName",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-success",3,"click"],[1,"col-5",3,"formGroupName"],[1,"img",3,"src","alt"],[1,"col-3","delete"],["id","boot-icon",1,"bi","bi-trash",2,"color","rgb(255, 255, 255)"],[3,"value"],[1,"invalid-feedback"],[1,"col-3",3,"formGroupName"],[1,"row",2,"margin-top","10px",3,"formGroupName"],[1,"flex-container"],[1,"col-9",2,"min-height","200px"],["type","text","id","paragraph","formControlName","paragraph",1,"form-control"],[1,"delete","col-2"]],template:function(t,i){if(1&t){const u=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"form",2),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e.TgZ(3,"div",0)(4,"div",1)(5,"button",3),e._uU(6," \u5b58\u6863 "),e.qZA(),e.TgZ(7,"button",4),e.NdJ("click",function(){return i.onCancel()}),e._uU(8," \u53d6\u6d88 "),e.qZA(),e.TgZ(9,"button",4),e.NdJ("click",function(){return i.onDelete()}),e._uU(10," \u5220\u9664\u6b64\u5e16 "),e.qZA()()(),e.TgZ(11,"div",5)(12,"label",6),e._uU(13,"\u6807\u9898\u56fe\u7247"),e.qZA(),e.YNc(14,U,9,4,"div",7),e.qZA(),e.TgZ(15,"div",0)(16,"div",8)(17,"button",9),e.NdJ("click",function(){e.CHM(u);const n=e.MAs(23);return n.value="",e.KtG(n.click())}),e._uU(18," \u6e38\u89c8 "),e.qZA()(),e.TgZ(19,"div",10)(20,"span"),e._uU(21),e.qZA()()(),e.TgZ(22,"input",11,12),e.NdJ("change",function(n){return i.uploadCultureFile(n,!0)}),e.qZA(),e.TgZ(24,"div",0)(25,"div",1)(26,"div",13)(27,"label",14),e._uU(28,"\u6807\u9898"),e.qZA(),e._UZ(29,"input",15),e.qZA()()(),e.TgZ(30,"div",0)(31,"div",16)(32,"label",17),e._uU(33,"\u6b21\u5e8f"),e.qZA()(),e.TgZ(34,"div",18)(35,"select",19),e.NdJ("change",function(n){return i.changeSeq(n)}),e.YNc(36,E,2,2,"option",20),e.qZA()(),e.YNc(37,N,4,0,"div",21),e.qZA(),e.TgZ(38,"div",22)(39,"label",6),e._uU(40,"\u56fe\u7247"),e.qZA(),e.YNc(41,k,9,4,"div",7),e.qZA(),e.TgZ(42,"div",0)(43,"div",8)(44,"button",9),e.NdJ("click",function(){e.CHM(u);const n=e.MAs(50);return n.value="",e.KtG(n.click())}),e._uU(45," \u6e38\u89c8 "),e.qZA()(),e.TgZ(46,"div",10)(47,"span"),e._uU(48),e.qZA()()(),e.TgZ(49,"input",23,24),e.NdJ("change",function(n){return i.uploadCultureFile(n,!1)}),e.qZA(),e.TgZ(51,"div",0)(52,"div",25)(53,"label",26),e._uU(54,"\u6bb5\u843d"),e.qZA(),e.YNc(55,J,8,1,"div",27),e.TgZ(56,"div",0)(57,"div",1)(58,"button",28),e.NdJ("click",function(){return i.onAddParagraph()}),e._uU(59," \u52a0\u6bb5\u843d "),e.qZA()()()()()()()()}2&t&&(e.xp6(2),e.Q6J("formGroup",i.cultureForm),e.xp6(3),e.Q6J("disabled",!i.cultureForm.valid),e.xp6(9),e.Q6J("ngForOf",i.headerImageControls),e.xp6(7),e.AsE(" ",i.headerImgLst.length," files have been uploaded ( ",i.headerImg," ) "),e.xp6(1),e.Q6J("hidden",!0),e.xp6(14),e.Q6J("ngForOf",i.culture),e.xp6(1),e.Q6J("ngIf",null==i.seq.errors?null:i.seq.errors.required),e.xp6(4),e.Q6J("ngForOf",i.imagesControls),e.xp6(7),e.AsE(" ",i.imageList.length," files have been uploaded ( ",i.image," ) "),e.xp6(1),e.Q6J("hidden",!0),e.xp6(6),e.Q6J("ngForOf",i.descriptionsControls))},dependencies:[d.sg,d.O5,s._Y,s.YN,s.Kr,s.Fj,s.EJ,s.JJ,s.JL,s.sg,s.u,s.x0,s.CE],styles:[".row[_ngcontent-%COMP%]{margin-bottom:10px}.container[_ngcontent-%COMP%]{margin-bottom:30px}.flex-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.delete[_ngcontent-%COMP%]{display:inline-block;margin:100px 10px}textarea[_ngcontent-%COMP%]{width:100%;height:100%}.col-12[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:20px}.img[_ngcontent-%COMP%]{object-fit:scale-down;width:100%;height:100%}"]}),r})();var q=a(5087);function O(r,o){if(1&r&&(e.TgZ(0,"div",8),e._UZ(1,"img",9),e.TgZ(2,"p",10),e._uU(3),e.qZA()()),2&r){const t=o.$implicit,i=e.oxw();e.xp6(1),e.s9C("alt",t.name),e.Q6J("src",t.url,e.LSH),e.xp6(2),e.Oqu(i.culture.header)}}function M(r,o){if(1&r&&(e.TgZ(0,"div",11),e._UZ(1,"img",12),e.qZA()),2&r){const t=o.$implicit;e.xp6(1),e.s9C("alt",t.name),e.Q6J("src",t.url,e.LSH)}}function D(r,o){if(1&r&&(e.TgZ(0,"p",13),e._uU(1),e.qZA()),2&r){const t=o.$implicit;e.xp6(1),e.hij(" ",t.paragraph," ")}}const P=function(r){return[r]};let Q=(()=>{class r{constructor(t){this.authService=t,this.user=null}ngOnInit(){this.user=null,this.user=this.authService.getCurrentUser(),console.log(this.user)}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(q.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-culture-detail"]],inputs:{culture:"culture"},decls:9,vars:8,consts:[["routerLinkActive","active",1,"list-group-item","clearfix",3,"routerLink"],[1,"container-fluid"],[1,"row"],["class","header-img",4,"ngFor","ngForOf"],[1,"col-xl-3","col-lg-3","col-md-3"],["style","margin-bottom: 10px;",4,"ngFor","ngForOf"],[1,"col-xl-6","col-lg-6","col-md-6"],["class","text-justify",4,"ngFor","ngForOf"],[1,"header-img"],[3,"src","alt"],[1,"header-text"],[2,"margin-bottom","10px"],[1,"img-responsive",3,"src","alt"],[1,"text-justify"]],template:function(t,i){1&t&&(e.TgZ(0,"a",0)(1,"div",1)(2,"div",2),e.YNc(3,O,4,3,"div",3),e.qZA(),e.TgZ(4,"div",2)(5,"div",4),e.YNc(6,M,2,2,"div",5),e.qZA(),e.TgZ(7,"div",6),e.YNc(8,D,2,1,"p",7),e.qZA()()()()),2&t&&(e.ekj("disabled",null==i.user),e.Q6J("routerLink",e.VKq(6,P,i.culture.key)),e.xp6(3),e.Q6J("ngForOf",i.culture.headerImage),e.xp6(3),e.Q6J("ngForOf",i.culture.images),e.xp6(2),e.Q6J("ngForOf",i.culture.description))},dependencies:[d.sg,c.rH,c.Od],styles:["a[_ngcontent-%COMP%]{margin-bottom:20px;cursor:pointer}a.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:not-allowed}img[_ngcontent-%COMP%]{max-width:100%;height:auto}.header-text[_ngcontent-%COMP%]{display:inline-block;width:-moz-fit-content;width:fit-content;margin:0 auto;padding:1em;font-size:20px;text-align:left;font-weight:700}.header-img[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;height:auto;min-height:70px}"]}),r})();function j(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"button",4),e.NdJ("click",function(){e.CHM(t);const u=e.oxw();return e.KtG(u.onNewCulture())}),e._uU(3,"\u6dfb\u52a0\u6587\u5316\u5e16"),e.qZA()()()}}function Y(r,o){1&r&&e._UZ(0,"app-culture-detail",5),2&r&&e.Q6J("culture",o.$implicit)}let T=(()=>{class r{constructor(t,i,u,l){this.cultureService=t,this.router=i,this.route=u,this.authService=l,this.user=null}ngOnDestroy(){this.subscription.unsubscribe()}ngOnInit(){this.retrieveCulture()}retrieveCulture(){this.subscription=this.cultureService.getAll().snapshotChanges().pipe((0,p.U)(t=>t.map(i=>({key:i.payload.key,...i.payload.val()})))).subscribe(t=>{t.sort((i,u)=>i.seq.localeCompare(u.seq)),this.cultures=t,this.user=this.authService.getCurrentUser(),console.log(this.user)})}onNewCulture(){this.router.navigate(["new"],{relativeTo:this.route})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(F),e.Y36(c.F0),e.Y36(c.gz),e.Y36(q.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-culture-list"]],decls:4,vars:2,consts:[["class","row",4,"ngIf"],[1,"row"],[1,"col-12"],[3,"culture",4,"ngFor","ngForOf"],[1,"btn","btn-success",3,"click"],[3,"culture"]],template:function(t,i){1&t&&(e.YNc(0,j,4,0,"div",0),e.TgZ(1,"div",1)(2,"div",2),e.YNc(3,Y,1,1,"app-culture-detail",3),e.qZA()()),2&t&&(e.Q6J("ngIf",null!=i.user),e.xp6(3),e.Q6J("ngForOf",i.cultures))},dependencies:[d.sg,d.O5,Q]}),r})();var A=a(9363);const B=[{path:"list",component:T},{path:"list/new",component:Z,canActivate:[A.a]},{path:"list/:id",component:Z,canActivate:[A.a]},{path:"",component:T}];let G=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[d.ez,s.u5,c.Bz.forChild(B),I.m]}),r})()}}]);