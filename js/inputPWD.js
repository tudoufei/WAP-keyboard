window.onload = function(){		
(function(){
	var container = document.getElementById("inputBoxContainer");
	boxInput = {
		maxLength:"",
		realInput:"",
		bogusInput:"",
		ccc:"",
		callback:"",
		init:function(fun){
			var that = this;
			this.callback = fun;
			that.realInput = container.children[0];
			that.bogusInput = container.children[1];
			that.bogusInputArr = that.bogusInput.children;
			that.maxLength = that.bogusInputArr[1].getAttribute("maxlength");
			that.realInput.oninput = function(){
				that.setValue();
			}
			that.realInput.onpropertychange = function(){
				that.setValue();
			}
		},
		
		/*删除密码*/
		delete_pwd:function(){
			var num = boxInput.getBoxInputValue();
			if(num){
				var newNum = num.substr(0, num.length - 1);
				for(var i = 0 ; i < this.maxLength ; i++){
					this.bogusInputArr[i].value = newNum[i]?newNum[i]:"";
					document.getElementById("pwdNum").value = newNum;
					document.getElementById("pwdNum").focus();
				}
			}
		 },
		 
		 
		 /*清空密码*/
		 clearNum:function(){
			for(var i = 0 ; i < this.maxLength ; i++){
				this.bogusInputArr[i].value= "";
			}
			document.getElementById("pwdNum").focus();
			document.getElementById("pwdNum").value="";
		},
		
		
		 /*数字键盘输入密码*/
		inputNum:function(){
			var _inputPwd = document.getElementById("inputPwd");
			var _inputA = _inputPwd.getElementsByTagName("a");
			var len =_inputA.length;
			for(var i=0;i<len;i++){
				_inputA[i].onclick =function(){
					if(this.innerText== "删除"){
						boxInput.delete_pwd();
					}else if(this.innerText== "清空"){
						boxInput.clearNum();
					}else{
						var initPwd = document.getElementById("pwdNum").value;
						document.getElementById("pwdNum").value = initPwd + this.innerText;
						var real_pwd = document.getElementById("pwdNum").value;
						if(real_pwd.length >= 6){
							document.getElementById("pwdNum").value = real_pwd.substring(0,6);
							setTimeout(function(){
								boxInput.callback();
							}, 300)
						}
						var endPwd = document.getElementById("pwdNum").value;
						var strs  = endPwd.split("",6);
						var showPwd = document.getElementById("showNum");
						var showPwdArray = showPwd.getElementsByTagName("input");
						for(var t = 0 ; t < 6 ; t++){
							showPwdArray[t].value = strs[t]?strs[t]:"";
						}
						document.getElementById("pwdNum").focus();
					}
				}
			}
			
		},
		
		/*键盘键入密码*/
		setValue:function(){
			this.realInput.value = this.realInput.value.replace(/\D/g,"");
			/*console.log(this.realInput.value.replace(/\D/g,""))*/
			var real_str = this.realInput.value;
			for(var i = 0 ; i < this.maxLength ; i++){
				this.bogusInputArr[i].value = real_str[i]?real_str[i]:"";
				
			}
			if(real_str.length >= this.maxLength){
				var the = this;
				this.realInput.value = real_str.substring(0,6);
				setTimeout(function(){
					the.callback();
        		}, 300)
        	
			}
			
		},
		
		
		/*密码值*/
		getBoxInputValue:function(){
			var realValue = "";
			for(var i in this.bogusInputArr){
				
				if(!this.bogusInputArr[i].value){
						break;
				}
				realValue += this.bogusInputArr[i].value;
			}
			return realValue;
		}
	}
	})()
	
	/*输入完密码之后执行的操作*/
	  boxInput.init(function(){
		  alert("123");
	  });
	  
	 /* 数字键盘输入*/
		boxInput.inputNum();
}