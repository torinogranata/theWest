// ==UserScript==
// @name              EasyReskiller
// @version           1
// @description       fast Reskiller
// @author            tori
// @include           http://*.the-west.*/game.php*
// @include           https://*.the-west.*/game.php*
// @include           http://*.tw.innogames.*/game.php*
// @include           https://*.tw.innogames.*/game.php*
// @grant             none
// ==/UserScript==

//function javascript injection
function creaScript(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
	
}

creaScript(function(){
//crea bottone formattato
function createWestButton(text){
var btn=document.createElement("BUTTON");
var t=document.createTextNode(text);
btn.appendChild(t);
btn.style.color="#FFE7B1";
btn.style.background='url("//westzzs.innogamescdn.com/images/tw2gui/button/button_normal.png?1") repeat scroll 0px 0px';
btn.style.font="bold 10pt Arial";
btn.style.borderColor="#800000";
return btn;
}

//crea div con ID
function createDiv(text){
var div=document.createElement("DIV");
div.setAttribute("id",text);
return div;
}

//crea casella attributo
function createAttr(text,src){
var div=createDiv(text);
var inputbox=document.createElement("INPUT");
var img=document.createElement("IMG");
img.setAttribute("src",src);
inputbox.setAttribute("id",text+"input");
inputbox.setAttribute("class","inputattr");
inputbox.setAttribute("type","text");
inputbox.style.width="50px";
inputbox.style.backgroundColor="rgb(196, 174, 150)";
inputbox.style.border="0.5px solid black";
var br=document.createElement("BR");
div.appendChild(img);
div.appendChild(br);
div.appendChild(inputbox);
return div;
}

//crea casella abilità
function createSkill(src){
var div=document.createElement("DIV");
var img=document.createElement("IMG");
img.setAttribute("src",src);
var inputbox=document.createElement("INPUT");
inputbox.setAttribute("class","skills");
inputbox.setAttribute("type","text");
inputbox.style.width="86px";
inputbox.style.border="0.5px solid black";
inputbox.style.backgroundColor="rgb(196, 174, 150)";
var br=document.createElement("BR");
div.appendChild(img);
div.appendChild(br);
div.appendChild(inputbox);
div.style.float="left";
return div;
}


//crea finestra popup
function popupCreate(){
br=document.createElement("BR");
windowparent=window;
mywindow=window.open("","_blank","height=310,width=600");
mywindow.document.body.style.background='url("https://westits.innogamescdn.com/images/window/skills/window4_bg.jpg") no-repeat scroll';
mywindow.document.body.style.backgroundSize="cover";
var contain=createDiv("contain");
var attr=["Forza","Agilità","Destrezza","Carisma"];
var j=0;
	//crea attributi sulla nuova finestra
for(i=0;i<attr.length;i++)
{
	var imgsrc=mywindow.opener.document.getElementsByClassName("attricon")[i].getAttribute("src");
	var attributo=createAttr(attr[i],imgsrc);
	attributo.getElementsByClassName("inputattr")[0].value=windowparent.document.getElementsByClassName("displayValue")[j].textContent;
  contain.appendChild(attributo);
	j=j+6;
}
	contain.style.float="left";
	var containSkill=createDiv("containSkill");
	// crea skill sulla nuova finestra
for(i=0;i<20;i++)
{
var imgsrcskill=windowparent.document.getElementsByClassName("skillicon")[i].getAttribute("src");
var skill=createSkill(imgsrcskill);
skill.getElementsByClassName("skills")[0].value=document.querySelectorAll(".sk_skills_content .displayValue")[i].textContent;
containSkill.appendChild(skill);
}
containSkill.style.float="right";
containSkill.style.width="430px";
var rskbtn=createWestButton("reskill");

	// crea free points
contain.appendChild(rskbtn);
var attrfree=createDiv("attrfree");
attrfree.style.color="#FFE7B1";
attrfree.style.background='url("https://westits.innogamescdn.com/images/window/skills/circle_wood2.png") no-repeat scroll center center';
attrfree.textContent=windowparent.document.getElementById("sps_open_attr_points").textContent;
attrfree.style.display="inline-block";
attrfree.style.textAlign="center";
attrfree.style.width="25px";
attrfree.style.heigth="30px";
attrfree.style.margin="4px";
var skillfree=createDiv("attrfree");
skillfree.style.color="#FFE7B1";
skillfree.style.background='url("//westzzs.innogamescdn.com/images/window/skills/rect_wood2.png") no-repeat scroll center center';
skillfree.textContent=windowparent.document.getElementById("sps_open_skill_points").textContent;
skillfree.style.display="inline-block";
skillfree.style.textAlign="center";
skillfree.style.width="25px";
skillfree.style.heigth="30px";
skillfree.style.margin="4px";
	
//appende nodi alla nuova finestra
mywindow.document.body.appendChild(attrfree);
mywindow.document.body.appendChild(skillfree);
mywindow.document.body.appendChild(contain);
mywindow.document.body.appendChild(containSkill);
	
//click handler	
rskbtn.onclick=function(){
	var arrayOld=[];
	var arrayAttrOld=[];
	var arrayNews=[];
	var arrayAttrNew=[];
	var arrayDiff=[];
	var arrayAttrDiff=[];
	
	for(i=0;i<20;i++)
		{
			arrayOld[i]=windowparent.document.querySelectorAll(".sk_skills_content .displayValue")[(i)].textContent;
			arrayNews[i]=mywindow.document.getElementsByClassName("skills")[i].value;
			arrayDiff[i]=arrayNews[i]-arrayOld[i];
			if (arrayDiff[i]<0)
				{
					arrayDiff[i]=0;
				}
		}
	for(i=0;i<4;i++)
		{
			arrayAttrOld[i]=windowparent.document.querySelectorAll(".sk_attr_content .displayValue")[i].textContent;
			arrayAttrNew[i]=mywindow.document.getElementsByClassName("inputattr")[i].value;
			arrayAttrDiff[i]=arrayAttrNew[i]-arrayAttrOld[i];
			if (arrayAttrDiff[i]<0)
				{
					arrayAttrDiff[i]=0;
				}
		}
	
	// check attributi/skill
	var sommaSkill=0;
	var sommaAttr=0;
	for (i=0;i<20;i++)
		{
			sommaSkill += arrayDiff[i];
		}
	for (i=0;i<4;i++)
		{
			sommaAttr += arrayAttrDiff[i];
		}

if(sommaSkill>parseInt(skillfree.textContent) || sommaAttr>parseInt(attrfree.textContent))
	{
		alert("too many points");
	}
else
	{
	


for (i=19,j=3;i>=-1;i--)
{
    if((i+1)%5==0 && i<19)
    {
        arrayDiff.splice(i+1,0,arrayAttrDiff[j]);
        j=j-1;
    }
   
}



for(i=0;i<24;i++)
{
    var n= arrayDiff[i];
    for(j=0;j<n;j++)
    {
        windowparent.document.getElementsByClassName("butPlus")[i].click();
    }
}
	}
	mywindow.close();
  
  }

}


//inizializza
function init(){
setTimeout(function(){
var windowparent= window;
var open=createWestButton("Open Reskiller");
open.setAttribute("id","open");
var close=createWestButton("close");
document.getElementsByClassName("skills-expert")[0].appendChild(open);// Append <button> to <body>
window.document.getElementById("ske_showItemBonus").click();
open.onclick= popupCreate;},1000);
}


//inizializza
function ini(){
window.document.getElementsByClassName("char_links skills")[0].addEventListener("click",init,true);	
	}

//javascsript injection
try { setTimeout(ini,5000);
		  } catch(e) { alert(e);}

	
});
