/*
 * name：Application
 * descript：.
 * Author : Roy(luoyi,罗毅,15925664181,173783000@qq.com)
*/
var tempMenus = new Array();
function Application() {
    var formArray = new Array();
    var _self = {
        forms: formArray,
        created: false,
        defaultLanguage: "EN",
        addForm: function (htmlForm) {
            this.forms.push(htmlForm);
        }
    }
    return _self;
}
var application;
window.onload = function () {
    application = new Application();
    if (!application.created) {
        application.created = true;
        main();
    }
};

/*
 * name：Control
 * descript：all visual control inherite from control.
 * Author : Roy
*/
function Control(ParentControl,htmlType,htmlClass)
{
    var parentElement;
    if (ParentControl == null) {
        parentElement = document.body;
    }
    else {
        if (ParentControl.self)
            parentElement = ParentControl.self;
        else
            parentElement = ParentControl;
        
    }
    var htmlElement = document.createElement(htmlType);
    parentElement.appendChild(htmlElement);
    var controlArray = new Array();
    var _self = 
        {
            //properties
            align: "none",        // enum:none,left,top,right,bottom,center;
            setAlign:function(val){
                this.align = val;
                if (this.parent) this.parent.update();
            },
            getAlign:function(){
                return this.align;
            },

            alignment: "left",    // left,right,center
            setAlignment:function(val){
                this.alignment = val;
                htmlElement.style.textAlign = this.alignment;
            },
            getAlignment:function(){
                return this.alignment;
            },

            anchors: "left,top",  //[left,top,right,bottom]
            name: "",
            setName:function(val){
                this.name = val;
                htmlElement.name = val;
            },
            getName:function(){
                return this.name;
            },

            color: "",
            setColor:function(val){
                this.color = val;
                htmlElement.style.backgroundColor = this.color;
            },
            getColor:function(){
                return this.color;
            },

            css: "",
            setCss:function(val){
                this.css = val;
                htmlElement.setAttribute("style", this.css);
            },
            getCss:function(){
                return this.css;
            },

            className: htmlClass,
            setClassName:function(val){
                this.className = val;
                htmlElement.setAttribute("class", val);
            },
            getClassName:function(){
                return this.className;
            },

            fontName: "微软雅黑",
            setFontName:function(val){
                this.fontName = val;
                htmlElement.style.fontFamily = val;
            },
            getFontName:function(){
                return this.fontName;
            },

            fontSize: 10,
            setFontSize:function(val){
                this.fontSize = val;
                htmlElement.style.fontSize = this.fontSize;
            },
            getFontSize:function(){
                return this.fontSize;
            },

            fontColor:"black",
            setFontColor:function(val){
                this.fontColor = val;
                htmlElement.style.color = val;
            },
            getFontColor:function(){
                return this.fontColor;
            },

            html:"",
            getHtml(){
                html = htmlElement.innerHTML;
                return htmlElement.innerHTML;
            },
            setHtml(h){
                html = h;
                htmlElement.innerHTML = h;
            },

            parent: ParentControl,
            self: htmlElement,
            popupMenu: null,
            setPopupMenu:function(menu){
                this.popupMenu = menu;
                var menuPanel = document.createElement("div");
                tempMenus.push(menuPanel);
                document.body.appendChild(menuPanel);
                //menuPanel.style.display = "none";
                menuPanel.className = menu.className;
                menuPanel.style.position = "absolute";
                menuPanel.style.padding = "3px";
                menuPanel.style.boxShadow = "0 1px 1px #888,1px 0 1px #ccc";
                menuPanel.style.backgroundColor = "#e6e6e6";
                menuPanel.style.overflow = "hidden";
                menuPanel.style.display = "none";
                for(var i=0;i<menu.items.length;i++){
                    var item = menu.items[i];
                    if (item.text == "-"){
                        var element = document.createElement("hr");
                        element.style = "height:1px;border:none;border-top:1px solid #555555;";
                        menuPanel.appendChild(element);
                    }
                    else{
                        var element = document.createElement("div");
                        element.style.width = "auto";
                        element.style.height = "auto";
                        element.style.padding = "0 10px";
                        element.style.lineHeight = "25px";
                        element.onmouseover = function(){this.style.backgroundColor = "#666";}
                        element.onmouseout = function(){this.style.backgroundColor = "#e6e6e6";}
                        element.id = item.id;
                        element.innerHTML = item.text;
                        element.onclick = function(evt){
                            evt.id = this.id;
                            evt.text = this.innerHTML;
                            menu.onclick(_self,evt);
                        }
                        menuPanel.appendChild(element);
                    }
                }

                htmlElement.oncontextmenu=function(e){
                    e.preventDefault();
                    menuPanel.style.left=e.clientX+'px';
                    menuPanel.style.top=e.clientY+'px';
                    menuPanel.style.width='auto';
                    menuPanel.style.display = "block";
                }
                window.onclick=function(e){
                    for(var i=0;i<tempMenus.length;i++){
                        tempMenus[i].style.display = "none";
                    }
                    
                }
                
            },

            left:0,
            setLeft:function(val){
                this.left = val;
                htmlElement.style.left = this.left+ "px";
            },
            getLeft:function(){
                return this.left;
            },

            top:0,
            setTop:function(val){
                this.top = val;
                htmlElement.style.top = this.top+ "px";
            },
            getTop:function(){
                return this.top;
            },
            right:0,
            bottom:0,

            width : 100,
            setWidth:function(val){
                this.width = val;
                htmlElement.style.width = this.width+ "px";
            },
            getWidth:function(){
                return this.width;
            },

            height: 60,
            setHeight:function(val){
                this.height = val;
                htmlElement.style.height = this.height+ "px";
            },
            getHeight:function(){
                return this.height;
            },
            hint: "",
            setHint:function(val){
                this.hint = val;
                htmlElement.setAttribute("placeholder", val);
            },
            getHint:function(){
                return this.hint;
            },

            type: "control",
            index: ParentControl ? 0 : parentElement.childNodes.length,
            controls: controlArray,
            controlCount: 0,
            text : "",
            setText:function(val){
                this.text = val;
                if (htmlElement.tagName == "LABEL"){
                    htmlElement.innerHTML = val;
                }
                else{
                    htmlElement.value = val;
                }
            },
            getText:function(){
                this.text = htmlElement.value;
                return this.text;
            },

            visible:true,
            setVisible:function(val){
                this.visible = val;
                htmlElement.style.display = val ? "block":"none";
            },

            //methods
            getClientWidth : function(){
                var w = this.self.clientWidth;
                if (w == 0) w = this.width;
                return w;
            },
            getClientHeight : function(){
                var h = this.self.clientHeight;
                if (h == 0) h = this.height;
                return h;
            },
            resize: function () {
                /*计算子控件位置*/
                var leftArray = new Array();
                var topArray = new Array();
                var rightArray = new Array();
                var bottomArray = new Array();
                var centerArray = new Array();
                for (var i = 0; i < this.controlCount; i++) {
                    switch (this.controls[i].align) {
                        case "left": leftArray.push(this.controls[i]); break;
                        case "top": topArray.push(this.controls[i]); break;
                        case "right": rightArray.push(this.controls[i]); break;
                        case "bottom": bottomArray.push(this.controls[i]); break;
                        case "center": centerArray.push(this.controls[i]); break;
                    }
                }
                var ALeft = 0, ATop = 0, ABottom = 0, ARight = 0;
                for (var i = 0; i < topArray.length; i++) {
                    var control = topArray[i];
                    control.self.style.left = ALeft + "px";
                    control.self.style.top = ATop + "px";
                    control.self.style.width = this.getClientWidth() + "px";
                    control.self.style.height = control.height;
                    ATop += control.getClientHeight();
                    control.width = this.getClientWidth();
                }
                for (var i = 0; i < bottomArray.length; i++) {
                    var control = bottomArray[i];
                    control.self.style.width = this.getClientWidth() + "px";
                    control.self.style.height = control.height;
                    control.self.style.left = ALeft + "px";
                    control.self.style.top = (this.getClientHeight() - control.getClientHeight() - ABottom) + "px";
                    ABottom += control.getClientHeight();
                    control.width = this.getClientWidth();
                }
                for (var i = 0; i < leftArray.length; i++) {
                    var control = leftArray[i];
                    control.self.style.left = ALeft + "px";
                    control.self.style.top = ATop + "px";
                    control.self.style.width = control.width;
                    control.self.style.height = (this.getClientHeight() - ATop - ABottom) + "px";
                    ALeft += control.getClientWidth();
                    control.height = this.getClientHeight() - ATop - ABottom;
                }
                for (var i = 0; i < rightArray.length; i++) {
                    var control = rightArray[i];
                    control.self.style.width = control.width;
                    control.self.style.height = (this.getClientHeight() - ATop - ABottom) + "px";
                    control.self.style.left = (this.getClientWidth() - control.getClientWidth() - ARight - control.right) + "px";
                    control.self.style.top = ATop + "px";
                    ARight += control.getClientWidth();
                    control.height = this.getClientHeight() - ATop - ABottom;
                }
                /*居中时，每个子控件大小一致*/
                for (var i = centerArray.length-1; i >=0 ; i++) {
                    var control = centerArray[i];
                    control.self.style.left = ALeft + "px";
                    control.self.style.top = ATop + "px";
                    var offw = 0;
                    var offh = 0;
                    // if (control.self.tagName == "INPUT")
                    //     offw = 1;
                    // if (control.self.tagName == "TEXTAREA"){
                    //     offw = 1;
                    //     offh = 1;
                    // }
                    var _w = control.parent.self.clientWidth;
                    if (_w == 0) _w = control.parent.width;
                    _w = (_w - ALeft - ARight - offw)
                    var _h = control.parent.self.clientHeight;
                    if (_h == 0) _h = control.parent.height;
                     _h = (_h - ATop - ABottom - offh);

                    control.self.style.width = _w + "px";;
                    control.self.style.height = _h  + "px";
                    control.width = _w;
                    control.height = _h;
                    break;
                }
            },
            setControlPos: function () {
                if (ParentControl == null) {
                    if (this.align == "left") {
                        htmlElement.style.left = "0px";
                        htmlElement.style.top = "0px";
                        htmlElement.style.height = parentElement.clientHeight + "px";
                        _this.height = parentElement.clientHeight;
                    }
                    if (this.align == "top") {
                        htmlElement.style.left = "0px";
                        htmlElement.style.top = "0px";
                        htmlElement.style.width = parentElement.clientWidth + "px";
                        _this.width = parentElement.clientWidth;
                    }
                    if (this.align == "right") {
                        htmlElement.style.left = (parentElement.clientWidth - htmlElement.clientWidth) + "px";
                        htmlElement.style.top = "0px";
                        htmlElement.style.height = parentElement.clientHeight + "px";
                        _this.height = parentElement.clientHeight;
                    }
                    if (this.align == "bottom") {
                        htmlElement.style.left = "0px";
                        htmlElement.style.top = (parentElement.clientHeight - htmlElement.clientHeight) + "px";
                        htmlElement.style.width = parentElement.clientWidth + "px";
                        _this.width = parentElement.clientWidth;
                    }
                    if (this.align == "center") {
                        htmlElement.style.left = "0px";
                        htmlElement.style.top = "0px";
                        htmlElement.style.width = this.width + "px";
                        htmlElement.style.height = this.height + "px";
                    }
                    
                }
                if (this.align == "none") {
                    htmlElement.style.left = this.left+ "px";
                    htmlElement.style.top = this.top+ "px";
                    htmlElement.style.width = this.width + "px";
                    htmlElement.style.height = this.height+ "px";
                }
                this.resize();
            },
            setAnchors:function(){

            },
            create: function () {
                htmlElement.setAttribute("class", this.className);
                htmlElement.style.backgroundColor = this.color;
                htmlElement.style.position = "absolute";
                htmlElement.style.padding = parentElement.style.padding;
                //htmlElement.style.marginTop = parentElement.offsetTop + "px";
                //htmlElement.style.marginLeft = parentElement.offsetLeft + "px";
                htmlElement.style.fontFamily = this.fontName;
                htmlElement.style.fontSize = this.fontSize;
                htmlElement.style.color = this.fontColor;
                htmlElement.style.textAlign = this.alignment;
                htmlElement.value = this.text;
                var cssValue = htmlElement.getAttribute("style");
                htmlElement.setAttribute("style", cssValue+this.css);
                
                
                this.setControlPos();
            },
            /*事件*/
            onclick:null,
            onchange:null,
            update: function () {
                if (this.parent && this.parent.self) this.parent.update();
                this.create();
                
                if (this.onclick){
                    htmlElement.onclick = this.onclick;
                }
                if (this.onchange){
                    htmlElement.onchange = this.onchange;
                } 
            }
        }
    htmlElement.bind = _self;
    return _self;
};

//事件参数
function ControlEvent(c){
    var _self = {
        control:c,
        index : -1
    }
}

/*基础界面控件*/
function HtmlForm(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlForm");
    application.addForm(_this);
    _this.width = window.innerWidth;
    _this.height = window.innerHeight;
    _this.create();
    _this.Refresh = function () {
        _this.update();
    }
    return _this;
};

function HtmlPanel(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlPanel");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.create();
    _this.Refresh = function () {
        if (_this.text != "")
            _this.self.innerHTML = this.text;
        _this.update();
    }
    return _this;
};

function HtmlFrame(parentElement) {
    var _this = new Control(parentElement, "iframe", "HtmlFrame");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.create();
    _this.setUrl = function (url) {
        _this.self.src = url;
    }
    _this.Refresh = function () {
        _this.self.frameBorder = "0";
        _this.update();
    }
    return _this;
}

function HtmlButton(parentElement) {
    var _this = new Control(parentElement, "button", "HtmlButton");
    if(parentElement.self){
        parentElement.controls.push(_this);
        parentElement.controlCount = parentElement.controls.length;
    }
    _this.width = 50;
    _this.height = 50;
    _this.create();
    _this.alignment = "center";
    _this.text = "";
    _this.imageUrl = ""
    _this.Refresh = function () {
        if (_this.imageUrl != ""){
            var imgcss = "width:"+_this.self.clientWidth+";height:"+_this.self.clientHeight+";";
            _this.self.innerHTML = "<img src='" + _this.imageUrl + "' style='"+imgcss+"' />" + _this.text;
        }
        else
        _this.self.innerHTML =  _this.text;
        _this.update();
    }
    return _this;
}

function HtmlLinkButton(parentElement){
    var _this = new Control(parentElement, "a", "HtmlButton");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 50;
    _this.height = 50;
    _this.create();
    _this.alignment = "center";
    _this.text = "";
    _this.imageUrl = ""
    _this.setUrl = function (url) {
        _this.self.href = url;
    }
    _this.Refresh = function () {
        if (_this.imageUrl != "")
            _this.self.innerHTML = "<img src='" + _this.imageUrl + "' />" + _this.text;
        else
        _this.self.innerHTML =  _this.text;
        _this.update();
    }
    return _this;
}

function HtmlEdit(parentElement) {
    var _this = new Control(parentElement, "Input", "HtmlEdit");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 121;
    _this.height = 21;
    _this.create();
    _this.alignment = "left";
    _this.text = "";
    _this.Refresh = function () {
        _this.update();
    }
    return _this;
}

function HtmlMemo(parentElement) {
    var _this = new Control(parentElement, "TextArea", "HtmlMemo");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 100;
    _this.height = 100;
    _this.create();
    _this.alignment = "left";
    _this.text = "";
    _this.Refresh = function () {
        _this.self.style.resize = "none";
        _this.update();
    }
    return _this;
}

function HtmlLabel(parentElement) {
    var _this = new Control(parentElement, "Label", "HtmlLabel");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 50;
    _this.height = 21;
    _this.create();
    _this.alignment = "center";
    _this.text = "";
    _this.Refresh = function () {
        _this.self.innerHTML = _this.text;
        _this.update();
    }

    _this.for = "";
    _this.setFor = function(val){
        _this.for = val;
        _this.self.for = val;
    }

    return _this;
}

function HtmlImage(parentElement) {
    var _this = new Control(parentElement, "img", "HtmlImage");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 50;
    _this.height = 50;
    _this.create();
    _this.alignment = "center";
    _this.text = "";
    _this.Refresh = function () {
        _this.self.src = _this.imageUrl;
        _this.update();
    }

    _this.imageUrl = "";
    _this.setImageUrl = function(url){
        _this.imageUrl = url;
        _this.self.src = url;
    }

    return _this;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}

function HtmlCheckBox(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlCheckBox");
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    checkbox.id = uuid();
    checkbox.type = "checkbox";
    checkbox.style.verticalAlign = "middle";
    checkbox.style.marginTop = "-1px";
    checkbox.setAttribute("class","HtmlCheckBoxSubCheckBox");
    label.setAttribute("for",checkbox.id);
    label.setAttribute("class","HtmlCheckBoxSubLabel");
    _this.self.appendChild(checkbox);
    _this.self.appendChild(label);   

    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 100;
    _this.height = 18;
    this.alignment = "left";
    _this.create();
    _this.value = "";
    _this.setValue = function(val){
        _this.value = val;
        checkbox.value = val;
    }
    _this.getValue = function(){
        _this.value = checkbox.value;
        return checkbox.value;
    }

    _this.caption = ""
    _this.setCaption = function(val){
        _this.caption = val;
        label.innerHTML = _this.caption;
    }
    _this.getCaption = function(){
        _this.caption = label.innerHTML;
        return _this.caption;
    }

    _this.checked = false;
    _this.setChecked = function(val){
        _this.checked = val;
        checkbox.checked = val;
    }
    _this.getChecked = function(){
        return checkbox.checked;
    }
    _this.Refresh = function () {
        if (_this.caption != "") {
            label.innerHTML = _this.caption;
        }
        if (_this.value != "") {
            checkbox.value = _this.value;
        }
        checkbox.checked = _this.checked;
        _this.update();
        //去掉div事件，然后把事件转移到checkbox
        checkbox.onclick = _this.onclick;
        _this.self.onclick = null;
    }

    return _this;
}

function HtmlRadio(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlRadio");
    var radio = document.createElement("input");
    var label = document.createElement("label");
    radio.id = uuid();
    radio.type = "radio";
    radio.style.verticalAlign = "middle";
    radio.style.marginTop = "-1px";
    radio.setAttribute("class","HtmlRadioSubRadio");
    label.setAttribute("for",radio.id);
    label.setAttribute("class","HtmlRadioSubLabel");
    _this.self.appendChild(radio);
    _this.self.appendChild(label);   

    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 100;
    _this.height = 18;
    this.alignment = "left";
    _this.create();
    _this.value = "";
    _this.setValue = function(val){
        _this.value = val;
        radio.value = val;
    }
    _this.getValue = function(){
        _this.value = radio.value;
        return radio.value;
    }

    _this.caption = ""
    _this.setCaption = function(val){
        _this.caption = val;
        label.innerHTML = _this.caption;
    }
    _this.getCaption = function(){
        _this.caption = label.innerHTML;
        return _this.caption;
    }

    _this.checked = false;
    _this.setChecked = function(val){
        _this.checked = val;
        radio.checked = val;
    }
    _this.getChecked = function(){
        return radio.checked;
    }

    _this.groupName = "";
    _this.setGroupName = function(val){
        _this.groupName = val;
        radio.name = val;
    }
    _this.getSelectedValue = function(){
        if (_this.groupName == ""){
            return _this.value;
        }else{
            var obj = document.getElementsByName(_this.groupName);
            for(i=0; i<obj.length;i++)  { 
                if(obj[i].checked)  {  
                    return  obj[i].value;  
                }  
            }      
            return "";    
        }
    }

    _this.Refresh = function () {
        if (_this.caption != "") {
            label.innerHTML = _this.caption;
        }
        if (_this.value != "") {
            radio.value = _this.value;
        }
        radio.checked = _this.checked;
        if (_this.groupName != "") {
            radio.name = _this.groupName;
        }
        _this.update();
        //去掉div事件，然后把事件转移到radio
        radio.onclick = _this.onclick;
        _this.self.onclick = null;
    }

    return _this;
}

function HtmlCombobox(parentElement) {
    var _this = new Control(parentElement, "select", "HtmlCombobox");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 121;
    _this.height = 21;
    _this.create();
    _this.value = "";
    _this.text = "";
    _this.items = new Array();
    _this.itemIndex = -1;
    _this.listbox = false;
    _this.setSelectedIndex = function(index){
        _this.self.options[index].selected = true;
        _this.itemIndex = index;
        _this.value = _this.self.options[index].value;
        _this.text = _this.self.options[index].text;
    }
    _this.Refresh = function () {
        _this.items.forEach(element => {
            var op = document.createElement("option");
            if (element.key)
                op.value = element.key;
            if (element.text)
                op.text = element.text;
            _this.self.add(op);
        });
        if (_this.listbox){
            _this.self.setAttribute("multiple","true");
        }
     
        _this.update();
        //重写onchange事件
        _this.self.onchange = function(){
            var index = this.selectedIndex;
            _this.value = this.options[index].value;
            _this.text = this.options[index].text;
            if (_this.onchange)
                _this.onchange();
        }
        if (_this.itemIndex >= 0) {
            _this.self.options[_this.itemIndex].selected = true;
            _this.value = _this.self.options[_this.itemIndex].value;
            _this.text = _this.self.options[_this.itemIndex].text;
        }         
    }  
    return _this;
}

function HtmlGroupBox(parentElement) {
    var _this = new Control(parentElement, "fieldset", "HtmlGroupBox");
    var legend = document.createElement("legend");
    _this.self.appendChild(legend);
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.create();
    _this.Refresh = function () {
        if (_this.text != "")
            legend.innerHTML = this.text;
            _this.update();
    }
    return _this;
};

function HtmlPopupMenu(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlPopupMenu");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.create();
    _this.onclick = function(){};
    _this.Refresh = function () {
        
        _this.update();
    }
    return _this;
};

function HtmlDropMenu(parentElement){
    var _this = new Control(parentElement, "div", "HtmlDropMenu");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 70;
    _this.create();
    _this.onclick = function(){};
    _this.setDropMenu = function(menu){
        var menuPanel = document.createElement("div");
        tempMenus.push(menuPanel);
        document.body.appendChild(menuPanel);
        menuPanel.className = "HtmlDropMenu-Panel";
        menuPanel.style.position = "absolute";
        menuPanel.style.padding = "3px";
        menuPanel.style.boxShadow = "0 1px 1px #888,1px 0 1px #ccc";
        menuPanel.style.backgroundColor = "#e6e6e6";
        menuPanel.style.overflow = "hidden";
        menuPanel.style.display = "none";
        for(var i=0;i<menu.items.length;i++){
            var item = menu.items[i];
            if (item.text == "-"){
                var element = document.createElement("hr");
                element.style = "height:1px;border:none;border-top:1px solid #555555;";
                menuPanel.appendChild(element);
            }
            else{
                var element = document.createElement("div");
                element.style.width = "auto";
                element.style.height = "auto";
                element.style.padding = "0 10px";
                element.style.lineHeight = "25px";
                element.onmouseover = function(){this.style.backgroundColor = "#666";}
                element.onmouseout = function(){this.style.backgroundColor = "#e6e6e6";}
                element.id = item.id;
                element.innerHTML = item.text;
                element.onclick = function(evt){
                    evt.id = this.id;
                    evt.text = this.innerHTML;
                    menu.onclick(_this,evt);
                }
                menuPanel.appendChild(element);
            }
        }

        menuPanel.onmouseover = function(){
            menuPanel.style.display = "block";
        }

        _this.self.onmouseover=function(e){
            for(var i=0;i<tempMenus.length;i++){
                tempMenus[i].style.display = "none";
            }
            e.preventDefault();
            var rect = this.getBoundingClientRect();
            var x = rect.left;
            var y = rect.top;
            
            menuPanel.style.left=x+'px';
            menuPanel.style.top=(y+this.clientHeight)+'px';
            menuPanel.style.width='auto';
            menuPanel.style.display = "block";
        }

        menuPanel.onmouseout=_this.self.onmouseout = function(){
            for(var i=0;i<tempMenus.length;i++){
                tempMenus[i].style.display = "none";
            }
        }
        
        window.onclick=function(e){
            for(var i=0;i<tempMenus.length;i++){
                tempMenus[i].style.display = "none";
            }
            
        }
    };
    _this.imageUrl = "";
    _this.Refresh = function () {
        if (_this.imageUrl != "")
            _this.self.innerHTML = "<img src='" + _this.imageUrl + "' />" + _this.text;
        else
        _this.self.innerHTML =  _this.text;
        _this.update();
    }
    return _this;
}

function HtmlNavBar(parentElement){
    var _this = new Control(parentElement, "div", "HtmlNavBar");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.items = null;
    _this.self.style.overflow = "auto";
    _this.self.style.overflowX = "hidden";
    _this.activeItem = null;
    _this.activeColor = "rgb(37, 134, 129)";
    _this.defaultColor = "#333";
    _this.itemProperties = {"fontSize":"12","fontColor":"White","fontName":"微软雅黑"};
    _this.titleProperties = {"fontSize":"12","fontColor":"White","fontName":"微软雅黑"};
    _this.onGroupItemClick = function(event){};
    _this.create();
    _this.Refresh = function () {
        _this.update(); 
        if (_this.items){
            var groupbox = new Array();
            for(var i=0;i<_this.items.length;i++){
                var groupHeight = 0;
                var group = _this.items[i];
                var groupPanel = new HtmlPanel(_this);
                groupbox.push(groupPanel);
                groupPanel.align = "top";
                groupPanel.height = 200;
                var titlePanel = new HtmlPanel(groupPanel);
                titlePanel.setClassName("HtmlNavBar-title");
                titlePanel.align = "top";
                titlePanel.alignment = "center";
                titlePanel.text = group.title;
                titlePanel.setHeight("24");
                titlePanel.fontColor = _this.titleProperties.fontColor;
                titlePanel.fontName = _this.titleProperties.fontName;
                titlePanel.self.itemIndex = i;
                groupPanel.titlePanel = titlePanel;
                var itemsPanel = new HtmlPanel(groupPanel);
                itemsPanel.align = "center";
                groupPanel.itemsPanel = itemsPanel;
                titlePanel.onclick = function(){
                    var index = this.itemIndex;
                    this.bind.parent.itemsPanel.setVisible(!this.bind.parent.itemsPanel.visible);
                    this.bind.parent.setHeight(this.bind.parent.itemsPanel.visible?this.bind.parent.self.itemsize:"30");
                    _this.update();
                }
                for(var n=0;n<group.items.length;n++){
                    var itemPanel = new HtmlPanel(itemsPanel);
                    itemPanel.setClassName("HtmlNavBar-item");
                    itemPanel.align = "top";
                    itemPanel.height = "21";
                    itemPanel.id = group.items[n].id;
                    itemPanel.text = group.items[n].caption;
                    itemPanel.color = _this.defaultColor;
                    itemPanel.fontColor = _this.itemProperties.fontColor;
                    itemPanel.fontName = _this.itemProperties.fontName;
                    itemPanel.self.itemIndex = n;
                    itemPanel.onclick = function(){
                        _this.activeItem = this.bind;
                        var evt = new ControlEvent(this.bind);
                        evt.index = this.itemIndex;
                        evt.control = this.bind;
                        groupbox.forEach(function(item){
                           for(var m=0;m<item.itemsPanel.controlCount;m++){
                               item.itemsPanel.controls[m].setColor(_this.defaultColor)
                            } 
                        })
                        
                        this.bind.setColor(_this.activeColor);
                        _this.onGroupItemClick(evt);
                    }
                    itemPanel.self.onmouseover=function(){
                        this.bind.setColor(_this.activeColor);
                    }
                    itemPanel.self.onmouseout=function(){
                        if (this.bind == _this.activeItem)
                            this.bind.setColor(_this.activeColor);
                        else
                            this.bind.setColor(_this.defaultColor);
                    }
                    itemPanel.Refresh();
                    groupHeight += itemPanel.self.clientHeight;
                    if (group.items[n].img){
                        var img = new HtmlImage(itemPanel);
                        img.imageUrl = group.items[n].img;
                        img.left = 5;
                        img.top = 4;
                        img.width = 18;
                        img.height = 18;
                        img.Refresh();
                    }
                }
                groupHeight += titlePanel.self.clientHeight;
                groupPanel.self.itemsize = groupHeight;
                groupPanel.setHeight(groupHeight);
                itemsPanel.Refresh();
                titlePanel.Refresh();
                groupPanel.Refresh();
            }
        }
        

    }
    return _this;
}

function HtmlTabControl(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlTabControl");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 350;
    _this.height = 300;
    _this.tabs = null;
    _this.tabIndex = 0;
    _this.tabLabels = new Array();
    _this.sheets = null;
    _this.contentPanel = new HtmlPanel(_this);
    _this.contentPanel.align = "center";
    _this.contentPanel.name = "tabControl.contentPanel";
    _this.create();
    _this.Refresh = function(){
        _this.update();
        _this.contentPanel.Refresh();
        if (_this.tabs){
            var tabsPanel = new HtmlPanel(_this);
            tabsPanel.align = "top";
            tabsPanel.height = 30;
            var tabLabelLeft = 5;
            var itemIndex = 0;
            _this.tabs.forEach(function(item){
                var tabLabel = new HtmlLabel(tabsPanel);
                _this.tabLabels.push(tabLabel);
                tabLabel.top = 2;
                tabLabel.height = 23;
                tabLabel.width = 100;
                tabLabel.left = tabLabelLeft;
                tabLabelLeft += 102;
                tabLabel.index = itemIndex;
                if (item.img != "")
                    tabLabel.text = "<img src='" + item.img + "' style='width:14px;height:14px;' />  " + item.caption;
                else
                    tabLabel.text = item.caption;
                tabLabel.id = item.id;
                
                if (_this.tabIndex == itemIndex)
                    tabLabel.setCss("border:1px solid #cac3c3;border-bottom:0;");
                else
                    tabLabel.setCss("border:1px solid rgba(238, 238, 238, 0);border-bottom:0;");
                tabLabel.onclick = function(){
                    _this.tabLabels.forEach(function(tab){
                        //tab.self.style.borderWidth = 0;
                        tab.self.style.borderColor = "rgba(238, 238, 238, 0)";
                    });
                    this.style.borderColor = "#cac3c3";
                    //show sheet 
                    _this.sheets.forEach(function(sheet){
                        sheet.setAlign("none");
                        sheet.setVisible(false);
                    });
                    _this.sheets[ this.bind.index ].setVisible(true);
                    _this.sheets[ this.bind.index ].setAlign("center");
                    _this.contentPanel.Refresh();
                }
                tabLabel.Refresh();
                tabLabel.self.style.paddingTop = "5px";
                itemIndex += 1;
            });
            _this.contentPanel.setCss("border-top:1px solid #cac3c3");
            

            if(_this.sheets){
                _this.sheets.forEach(function(sheet){
                    sheet.setAlign("none");
                    sheet.setVisible(false);
                });
                _this.sheets[ _this.tabIndex ].setVisible(true);
                _this.sheets[ _this.tabIndex ].setAlign("none");
            }

            tabsPanel.Refresh();
            
        }
    }
    _this.addSheets = function (sheets) {
        _this.sheets = sheets;
    }
    return _this;
};

function HtmlTable(parentElement) {
    var _this = new Control(parentElement, "table", "HtmlTable");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    parentElement.self.style.overflow = "scroll";
    _this.width = 350;
    _this.data = null;
    _this.columns = null;
    _this.buttons = null;
    _this.rowComputeStyle = null;
    _this.cellComputeStyle = null;
    _this.buttonColumnWidth = 100;
    _this.onButtonClick = function(evt){};
    _this.self.border = 1;
    _this.self.cellspacing = 0;
    _this.self.style.borderCollapse = "collapse";
    _this.header = null;
    _this.create();
    _this.setData = function(cdata){
        _this.data = cdata;
        if (cdata == null) return;
        if (_this.columns){
            _this.self.innerHTML = "";
            var headRow = document.createElement("tr");
            _this.header = headRow;
            _this.self.appendChild(headRow);
            _this.columns.forEach(function(item){
                var headCell = document.createElement("th");
                headCell.innerHTML = item.text;
                headCell.align = "center";
                if (item.width){
                    headCell.width = item.width;
                }
                headRow.appendChild(headCell);
            });
            if (_this.buttons){
                var headCell = document.createElement("th");
                headCell.width = _this.buttonColumnWidth;
                headRow.appendChild(headCell);
            }
            if (_this.data){
                _this.data.forEach(function(dataItem){
                    var dataRow = document.createElement("tr");
                    _this.columns.forEach(function(item){
                        var fieldname = item.fieldname;
                        var field = document.createElement("td");
                        if (dataItem[fieldname])
                            field.innerHTML = dataItem[fieldname];
                        field.align = "center";
                        field.fieldName = fieldname;
                        dataRow.appendChild(field);
                        _this.computeCell(field,dataItem);
                    });
                    if (_this.buttons){
                        var btnCell = document.createElement("td");
                        btnCell.align = "center";
                        dataRow.appendChild(btnCell);
                        _this.buttons.forEach(function(btn){
                            var button = document.createElement("button");
                            if (btn.img != "")
                                button.innerHTML = "<img src='" + btn.img + "' style='width:12px;height:12px;' />  " + btn.text;
                            button.buttonId = btn.id;
                            button.data = dataItem;
                            button.className = "HtmlTable-OP-Button";
                            btnCell.appendChild(button);
                            button.onclick = function(evt){
                                evt.id = this.buttonId;
                                evt.data = this.data;
                                _this.onButtonClick(evt);
                            }
                        });
                    }
                    _this.computeRow(dataRow,dataItem);
                    _this.self.appendChild(dataRow);
                });
            }
        }
    };
    _this.addRowData = function(dataItem){
        var dataRow = document.createElement("tr");
        _this.columns.forEach(function(item){
            var fieldname = item.fieldname;
            var field = document.createElement("td");
            if (dataItem[fieldname])
                field.innerHTML = dataItem[fieldname];
            field.align = "center";
            field.fieldName = fieldname
            dataRow.appendChild(field);
            _this.computeCell(field,dataItem);
        });
        _this.data.push(dataItem);
        _this.self.appendChild(dataRow);
        if (_this.buttons){
            var btnCell = document.createElement("td");
            btnCell.align = "center";
            dataRow.appendChild(btnCell);
            _this.buttons.forEach(function(btn){
                var button = document.createElement("button");
                if (btn.img != "")
                    button.innerHTML = "<img src='" + btn.img + "' style='width:12px;height:12px;' />  " + btn.text;
                button.buttonId = btn.id;
                button.data = dataItem;
                button.className = "HtmlTable-OP-Button";
                btnCell.appendChild(button);
                button.onclick = function(evt){
                    evt.id = this.buttonId;
                    evt.data = this.data;
                    _this.onButtonClick(evt);
                }
            });
        }
        _this.computeRow(dataRow,dataItem);
    };
    _this.addColumn = function (column){
        if (!_this.header) return;
        var headCell = document.createElement("th");
        headCell.innerHTML = column.text;
        headCell.align = "center";
        if (column.width){
            headCell.width = column.width;
        }
        _this.header.appendChild(headCell);
        _this.columns.push(column);
        _this.setData(_this.data);
    }
    _this.computeRow = function(dataRow,dataItem){
        if (_this.rowComputeStyle){
            _this.rowComputeStyle.forEach(function(item){
                var fieldName = item.fieldName;
                var v1 = dataItem[fieldName];
                var v2 = item.val;
                switch(item.compare){
                    case ">":
                        if (v1 <= v2)return;break;
                    case ">=":
                        if (v1 < v2)return;break;
                    case "<":
                        if (v1 >= v2)return;break;
                    case "<=":
                        if (v1 > v2)return;break;
                    case "=":
                        if (v1 != v2)return;break;
                    case "like":
                        if (v1.indexOf(v2)<0)return;break;
                }
                dataRow.setAttribute("style",item.style);
            });
        }
    };
    _this.computeCell = function(cell,dataItem){
        if (_this.cellComputeStyle){
            _this.cellComputeStyle.forEach(function(item){
                var fieldName = item.fieldName;
                var v1 = dataItem[fieldName];
                var v2 = item.val;
                switch(item.compare){
                    case ">":
                        if (v1 <= v2)return;break;
                    case ">=":
                        if (v1 < v2)return;break;
                    case "<":
                        if (v1 >= v2)return;break;
                    case "<=":
                        if (v1 > v2)return;break;
                    case "=":
                        if (v1 != v2)return;break;
                    case "like":
                        if (v1.indexOf(v2)<0)return;break;
                }
                if(item.style.indexOf(">") >= 0){
                    if (cell.fieldName == fieldName)
                            cell.innerHTML = item.style;
                }
                else{
                    var style = item.style;
                    if (cell.getAttribute("style"))
                        style = cell.getAttribute("style") + style;
                    cell.setAttribute("style",style);
                }
                    
            });
        }
    };
    _this.Refresh = function () {
        _this.setData(_this.data);
        _this.update();
    };
    return _this;
};

function HtmlDialog(parentElement) {
    var _this = new Control(parentElement, "div", "HtmlDialog");
    parentElement.controls.push(_this);
    parentElement.controlCount = parentElement.controls.length;
    _this.width = 450;
    _this.height = 300;
    _this.visible = false;
    _this.align = "center";
    _this.title = "";
    _this.contentPanel = null;
    _this.create();
    _this.close = function(){
        _this.setVisible(false);
    }
    _this.show = function(){
        _this.setVisible(true);
    }
    _this.Refresh = function () {
        var dialogWidth = _this.width;
        var dialogHeight = _this.height;
        var dialogForm = new HtmlPanel(_this);
        dialogForm.width = dialogWidth;
        dialogForm.height = dialogHeight;
        dialogForm.top = (parentElement.height - dialogHeight) / 2;
        dialogForm.left = (parentElement.width - dialogWidth) / 2;
        dialogForm.setCss("border:1px solid #eee;")
        dialogForm.Refresh();
        var titleBar = new HtmlPanel(dialogForm);
        titleBar.align = "top";
        titleBar.height = "30";
        titleBar.Refresh();
        titleBar.setColor("#eee");
        var btnClose = new HtmlImage(titleBar);
        btnClose.align = "right";
        btnClose.width = "30";
        btnClose.imageUrl = "../img/close.png";
        btnClose.onclick = function(){
            _this.close();
        }
        btnClose.Refresh();
        var title = new HtmlLabel(titleBar);
        title.align = "center";
        title.alignment = "left";
        title.text = _this.title;
        title.setCss("padding-left:10px;padding-top:8px;");
        title.Refresh();
        _this.contentPanel = new HtmlPanel(dialogForm);
        _this.contentPanel.align = "center";
        _this.contentPanel.Refresh();
        _this.contentPanel.setColor("#fff");
        _this.update();
        _this.setVisible(_this.visible);
        _this.setColor("rgba(10, 10, 10, 0.4)");
        _this.self.style.zIndex = 999;
    }
    return _this;
}