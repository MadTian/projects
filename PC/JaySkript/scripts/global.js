
// addLoadEvent函数
function addLoadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload!='function'){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

/*function h(){
  alert('你好');
}*/
// addClass函数封装
function addClass(element,value){
  if(!element.className){
    element.className=value;
  }else{
    newClassName = element.className;
    newClassName+= "";
    newClassName+= value;
    element.className = newClassName;
  }
}
/*var oImg = document.getElementsByTagName('img')[0];
console.log(oImg);
addClass(oImg,'pic');*/

// insertAfter函数封装
function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

// 页面突出显示
function highlightPage(){
  // 检查DOM方法
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;

  // 取得导航列表中所有的链接
  var headers = document.getElementsByTagName('header');
  if(headers.length == 0) return false;
  var navs = headers[0].getElementsByTagName('nav');
  if(navs.length == 0) return false;

  var links =navs[0].getElementsByTagName('a');
  var linkurl;

  for(var i=0;i<links.length;i++){
    linkurl = links[i].getAttribute('href');
    if(window.location.href.indexOf(linkurl) != -1){
      links[i].className = 'here';
      // 为每个页面的body元素添加id属性
      // toLowerCase 转为小写
      var linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id', linktext);
    }
  }
}
addLoadEvent(highlightPage);

// 首页幻灯片

function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var frame = document.createElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(frame);
  var preview = document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
  var links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    links[i].onmouseover = function() {
      var destination = this.getAttribute("href");
      if (destination.indexOf("index.html") != -1) {
        moveElement("preview",0,0,5);
      }
      if (destination.indexOf("about.html") != -1) {
        moveElement("preview",-150,0,5);
      }
      if (destination.indexOf("photos.html") != -1) {
        moveElement("preview",-300,0,5);
      }
      if (destination.indexOf("live.html") != -1) {
        moveElement("preview",-450,0,5);
      }
      if (destination.indexOf("contact.html") != -1) {
        moveElement("preview",-600,0,5);
      }
    }
  }
}

addLoadEvent(prepareSlideshow);

// About

function showSection(id){
  var sections = document.getElementsByTagName("section");
  for(var i=0;i<sections.length;i++) {
    if(sections[i].getAttribute("id") != id){
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
    
  }
}

function prepareInternalnav(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var articles = document.getElementsByTagName('article');
  if(articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName("nav");
  if(navs.length==0) return false;
  var links = navs[0].getElementsByTagName('a');
  for(var i=0;i<links.length;i++){
    var sectionId = links[i].getAttribute("href").split("#")[1];
    // alert(sectionId);
    if(!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function(){
      showSection(this.destination);
      return false;
    }
  }
}
addLoadEvent(prepareInternalnav);

// Photos
function showPic(whichpic) {
  if (!document.getElementById("placeholder")) return true;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if (!document.getElementById("description")) return false;
  if (whichpic.getAttribute("title")) {
    var text = whichpic.getAttribute("title");
  } else {
    var text = "";
  }
  var description = document.getElementById("description");
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
    }
  }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

// Live
// addClass()函数封装
function addClass(element,value){
  if(!element.className){
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}
// 斑马线效果 stiprTables函数封装
function stripeTables(){
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName('table');
  for(var i=0;i<tables.length;i++){
    var odd = false;
    var rows = tables[i].getElementsByTagName('tr');
    // alert(rows);
    for(var j=0;j<rows.length;j++){
      if(odd == true){
        // rows[j].style.backgroundColor="#ffc";
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}
addLoadEvent(stripeTables);

// 9.3.3 响应事件
function highlightRows(){
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  // console.log(rows);
  for(var i=0;i<rows.length;i++){
    rows[i].oldClassName = rows[i].className;
    // alert(this.oldClassName);
    rows[i].onmouseover = function(){
      addClass(this,'highlight');
    }
    rows[i].onmouseout = function(){
      this.className = this.oldClassName;
    }
  }
}
addLoadEvent(highlightRows);

// 缩略语列表创建
var abbreviations = document.getElementsByTagName('abbr');
var defs = [];
function displayAbbreviations(){
  if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  // 遍历所有缩略词
  if(abbreviations.length<1) return false;
  for(var i=0;i<abbreviations.length;i++){
    var currentAbbr = abbreviations[i];
    var key = currentAbbr.lastChild.nodeValue;
    // var definition = currentAbbr.getAttribute("title");
    var definition = currentAbbr.title;
    // alert(definition);
    defs[key] = definition;
  }
  // 缩略语之定义列表
  var dlist = document.createElement("dl");
  // 遍历定义
  for(key in defs){
    var definition = defs[key];
    // 创建定义标题--dt
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    // 创建定义描述--dd
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);

    // dt dd追加到dlist
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  // 创建标题
  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  // 标题追加到页面主体
  header.appendChild(header_text);

  var articles = document.getElementsByTagName("article");
  if(articles.length ==0) return false;
  var container = articles[0];
  // 把定义列表添加到页面主体
  container.appendChild(header);
  container.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);

/* ***********Contact 页面*********** */

// 很多浏览器都会为label添加默认行为：
// 如果label中的文本被单击，关联的表单字段就会获得焦点
// 但有些浏览器却不支持,我们不妨自己添加这种行为
function focusLabels(){
  if(!document.getElementByTagName) return false;
  var labels  = document.getElementsByTagName("label");
  for(var i=0;i<labels.length;i++){
    if(!labels[i].getAttribute("for")) continue;
    labels[i].onclick=function(){
      var id = this.getAttribute("for");
      if(!document.getElementById) return false;
      var element = document.getElementById;
      element.focus();
    }
  }
}
addLoadEvent(focusLabels);

// 占位符值
function resetFields(whichform){
  if(Modernizr.input.placeholder) return;
  for(var i=0; i<whichform.elements.length; i++){
    // 每个form都有一个elements.length属性
    // form.elements数组返回input/select/textarea以及其他表单字段
    var element = whichform.elements[i];
    if(element.type == "submit") continue;
    var check = element.placeholder || element.getAttribute("placeholder");
    if(!check) continue;
    element.onfocus = function(){
      var text = this.placeholder || this.getAttribute("placeholder");
      if(this.value == text){
        this.className = "";
        this.value ="";
      }
    }
    element.onblur = function(){
      if(this.value == ""){
        this.className = "placeholder";
        this.value = this.placeholder || this.getAttribute("placeholder");
      }
    }
    element.onblur();
  }
}

function prepareForms(){
  for(var i=0;i<document.forms.length;i++){
    var thisform = document.forms[i];
    resetFields(thisform);
  }
}

addLoadEvent(prepareForms);