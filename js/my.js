var buildId="";
var zoneId="";
var url="";
var zoneName="";
var burl="";
//添加链接地址
 buildId=getQueryVariable("buildId");
 zoneId=getQueryVariable("zoneId");
 zoneName=getQueryVariable("zoneName");
url="http://192.168.0.136:1661/ScaleWebService/data/buildViewList?buildId="+buildId+"&zoneId="+zoneId+"&zoneName="+zoneName;
$(".gongre a").attr("href","heat.html?buildId="+buildId+"&zoneId="+zoneId+"&zoneName="+zoneName);
$(".hujian a").attr("href","balance.html?buildId="+buildId+"&zoneId="+zoneId+"&zoneName="+zoneName);
$(".jicha a").attr("href","inspect.html?buildId="+buildId+"&zoneId="+zoneId+"&zoneName="+zoneName);
$(".famen a").attr("href","valve.html?buildId="+buildId+"&zoneId="+zoneId+"&zoneName="+zoneName);
$(".zoneName").html(zoneName);
ifback();
function ifback(){
    if(buildId==0){
        $(".back").css("display","none");
    }
}
$(".back").on("click",function(){
     window.location.href=encodeURI("shujufenxi.html?zoneId="+zoneId+"&name="+zoneName);
});
function getZoneBuilds(){
    $.ajax({
        url:'http://192.168.0.136:1661/ScaleWebService/baseq/getBuilds?zoneid='+zoneId,
        type:'GET',
        dataType:'json',
        async:'false',
        success:function(data){
            var html="";
            $(data).each(function(index){
                var d=data[index];
                if(d.Id==buildId){
                      html=html+"<option selected value='"+d.Id+"'>"+d.BuildName+"</option>";
                }else{
                    html=html+"<option value='"+d.Id+"'>"+d.BuildName+"</option>";
                }      
            });
            $("#buildSelect").html(html);
        }
    });
}   




function currentTime(){ 
	var show_day=new Array('星期一','星期二','星期三','星期四','星期五','星期六','星期日'); 
  var d=new Date(),str=''; 
  str+=d.getFullYear()+'年'; 
  str+=d.getMonth() + 1+'月'; 
  str+=d.getDate()+'日 '; 
  var day=d.getDay(); 
  str+=show_day[day-1];
  return str; 
} 
setInterval(function(){$('.body_top_right').html(currentTime)},1000); 


//窗口
function autodivheight(){ //函数：获取尺寸
		//获取浏览器窗口高度
		var winHeight=0;
		if (window.innerHeight){
		winHeight = window.innerHeight;
		}
		var winWidth=0;
		if(window.innerWidth){
			winWidth=window.innerWidth;
			//console.log(winWidth);
		}
		document.getElementById("scroll_unit").style.width= (winWidth-80)+"px";
		// else if ((document.body) && (document.body.clientHeight)){
		// winHeight = document.body.clientHeight;
		// }
		//通过深入Document内部对body进行检测，获取浏览器窗口高度
		// if (document.documentElement && document.documentElement.clientHeight){
		// winHeight = document.documentElement.clientHeight;
		// }
		//DIV高度为浏览器窗口的高度
		//document.getElementById("test").style.height= winHeight +"px";
		//DIV高度为浏览器窗口高度的一半
		// alert(winHeight);
		if(winWidth>=1100){
			document.getElementById("body_content").style.height= (winHeight-180)+"px";
			document.getElementById("scroll_unit").style.height= (winHeight-200)+"px";
		}else if(winWidth>=800){
			document.getElementById("body_content").style.height= (winHeight-210)+"px";
			document.getElementById("scroll_unit").style.height= (winHeight-230)+"px";			
		}else{
            document.getElementById("body_content").style.height= (winHeight-50)+"px";
            document.getElementById("scroll_unit").style.height= (winHeight-280)+"px";  
        }

		}
		window.onresize=autodivheight; //浏览器窗口发生变化时同时变化DIV高度


        //获取地址栏参数
        function getQueryVariable(variable)
        {
           var query = window.location.search.substring(1);

           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == variable){return decodeURI(pair[1]);}
                }
           return(false);
        }



        //取消选中
        function checkRoom(inputId){

        }

        //右上角切换
        $("#imgOpen").click(function(){
            $("#valveOpen").css("display","none");
            $("#valveClose").css("display","block");
        })
        $("#imgClose").click(function(){
            $("#valveClose").css("display","none");
            $("#valveOpen").css("display","block");
            $("#bar div").css("width","0");
            $("#f3 #btn").css("left","0");
            $("#f1 input").val("0");
            $("#f3 #title").text("0");
        })
        $("#jia").click(function(){
            var x=$("#openstate").val();
            if(x<25){
                x++;
                $("#openstate").val(x);
            }
        });
        $("#jian").click(function(){
            var x=$("#openstate").val();
            if(x>-25){
                x--;
                $("#openstate").val(x);
            }
        });
        function closeValveOpen(){
            $("#openstate").val("0");
            $("#valveOpen").css("display","none");
            $("#valveClose").css("display","block");
        }

       $("#select_id").change(function(){
           var selected=$(this).children('option:selected').val();
           $("#changebody .option").css("display","none");
           if(selected==1){ 
            $("#f1").css("display","block");
           }else if(selected==2){
            $("#f2").css("display","block");
           }else if(selected==3){
             $("#f3").css("display","block");
           }
   });

    scale=function (btn,bar,title){
    this.btn=document.getElementById(btn);
    this.bar=document.getElementById(bar);
    this.title=document.getElementById(title);
    this.step=this.bar.getElementsByTagName("DIV")[0];
    this.init();
};
scale.prototype={
    init:function (){
        var f=this,g=document,b=window,m=Math;
        f.btn.onmousedown=function (e){
            var x=(e||b.event).clientX;
            var l=this.offsetLeft;
            var max=f.bar.offsetWidth-this.offsetWidth;
            g.onmousemove=function (e){
                var thisX=(e||b.event).clientX;
                var to=m.min(max,m.max(-2,l+(thisX-x)));
                f.btn.style.left=to+'px';
                f.ondrag(m.round(m.max(0,to/max)*100),to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup=new Function('this.onmousemove=null');
        };
    },
    ondrag:function (pos,x){
        this.step.style.width=Math.max(0,x)+'px';
        this.title.innerHTML=pos;
    }
}
new scale('btn','bar','title');

$(".scroll_unit").scroll(function(){
  var x=$(".scroll_unit").scrollTop();
  $(".unit_top").css("top",x);
});


