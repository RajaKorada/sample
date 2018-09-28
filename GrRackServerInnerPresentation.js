import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchGRinput} from '../../State/actions/sessions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import ZoomIn from 'grommet/components/icons/base/ZoomIn';
import ZoomOut from 'grommet/components/icons/base/ZoomOut';
import Revert from 'grommet/components/icons/base/Revert';
import Print from 'grommet/components/icons/base/Print';
import Save from 'grommet/components/icons/base/Save';
// import GRInput from '../../Datafiles/GrInput.json';
import html2canvas from 'html2canvas';
import ReactTooltip from 'react-tooltip';
let RackServersPresentation;
var FrontView;
let RacksInsideServers;
var Mapcontent=[];
var SynergyContent=[];
let EventTopspace;
let RacksDisplaying;
let EventLeftspace;
let SynergyContent1=[];
let Synergy12000Render=[];
var HoverTitleStyle;
var RackHeight;
let RearviewHOverItems;
var RackInnerHeight;
var CountNewWindowOpen=0;

class GrRackServerInnerPresentation extends Component{
  constructor(){
      super();
      this.state={
         scaleRadiusX:1,
         scaleRadiusY:1,
         disabledZoomOut:false,
         disabledZoomIn:false,
         RackInnerView:false,
         RackRearView:true,
         ViewLabelbtn:'Rear View',
         ActiveSite:'',
         TopAlignServer:'',
         TitleDisplay:false,
         ServerItemName:'D123467',
         MinRackHeight:700,
      }
      this.ZoomIn=this.ZoomIn.bind(this);
      this.ZoomOut=this.ZoomOut.bind(this);
      this.InnerView=this.InnerView.bind(this);
      this.RearView=this.RearView.bind(this);
      this.RevertBack=this.RevertBack.bind(this);
      this.EnclosurePatteren=this.EnclosurePatteren.bind(this);
      this.SynergyPatteren=this.SynergyPatteren.bind(this);
      this.RackHoverOut=this.RackHoverOut.bind(this);
      this.SynergyContent1Arrangement=this.SynergyContent1Arrangement.bind(this);
      this.Synergy12000Design=this.Synergy12000Design.bind(this);
      this.OuterLayerLoop=this.OuterLayerLoop.bind(this);
      this.ImageConvertion=this.ImageConvertion.bind(this);
      this.downloadURI=this.downloadURI.bind(this);
      this.PrintImage=this.PrintImage.bind(this);
      this.PrintImageURI=this.PrintImageURI.bind(this);
      this.VoucherSourcetoPrint=this.VoucherSourcetoPrint.bind(this);
      this.VoucherSourcetoPrintIe=this.VoucherSourcetoPrintIe.bind(this);
  }
  PrintImage(){
       this.setState({scaleRadiusX:0.8000000000000001,MinRackHeight:600, scaleRadiusY:1 });
      CountNewWindowOpen++;
   //    this.downloadURI(canvas.toDataURL(), 'canvas.png');
            html2canvas(document.querySelector("#capture")).then(canvas => {
                 this.PrintImageURI(canvas.toDataURL(), 'canvas.png');             
           });     
  }
    PrintImageURI(url,filename){
      var 	Pagelink = "about:blank";
		var pwa = window.open(Pagelink, "_new");
		pwa.document.open();
		pwa.document.write(this.VoucherSourcetoPrint(url));
		pwa.document.close();
    }
    
    VoucherSourcetoPrint (url){
        	return "<html><head><script>function step1(){\n" +
				"setTimeout('step2()', 10);}\n" +
				"function step2(){window.print();window.close()}\n" +
				"</scri" + "pt></head><body onload='step1()'>\n" +
				"<img  style='width:100%,height:100%' src='" + url + "'}} /></body></html>";
}
  VoucherSourcetoPrintIe (url){
      	return "<html><head><script>function step1(){\n" +
				"setTimeout('step2()', 10);}\n" +
				"function step2(){}\n" +
				"</scri" + "pt></head><body onload='step1()'>\n" +
				"<img style='width:100%,height:100%' src='" + url + "' /></body></html>";
  }


  ImageConvertion(div){
      CountNewWindowOpen++;
      this.setState({scaleRadiusX:0.8000000000000001,MinRackHeight:600, scaleRadiusY:1 });
    html2canvas(document.querySelector("#capture")).then(canvas => {
         canvas.width=window.innerWidth;
         canvas.height=window.innerHeight;
        this.downloadURI(canvas.toDataURL(), 'canvas.png');
    });
  }
downloadURI(uri, filename){

      
            var link = document.createElement('a');
            link.setAttribute('download','');
            if (typeof link.getAttribute('download') === 'string') {
                link.setAttribute('href','');
                   link.href = uri;
                   link.download = filename;
               var blobObject = new Blob([link.href], {type : 'image/png'});
                 if(window.navigator.msSaveOrOpenBlob) {
                     var 	Pagelink = "about:blank" ;
	             	var pwa = window.open(Pagelink, "_new");
                    	pwa.document.open();
                    	pwa.document.write(this.VoucherSourcetoPrint(uri));            
                    // this.href = uri  + encodeURIComponent('<p>Hello world!</p>') 
                    // window.navigator.msSaveOrOpenBlob(blobObject, link.download);    
                }
                // For browsers that support the `download` attribute
                else {
                    this.href = uri
                        + encodeURIComponent('<p>Hello world!</p>');
                }
         
           //Firefox requires the link to be in the body
            document.body.appendChild(link);
            //simulate click
            link.click();
    
           
            document.body.removeChild(link);
            } else {
            window.open(uri);
            }
}
  
 OuterLayerLoop(Rackitem,idx){
        if(Array.isArray(this.state.GrInputRearView.OuterLayer)){
                        if(this.props.PassActiveSite["@SiteID"] ==undefined){
                                FrontView =  this.state.GrInputRearView.OuterLayer[idx]  
                          }
                            else{
                                FrontView =this.state.GrInputRearView.OuterLayer[this.props.PassActiveSite["@SiteID"]]; 
                            }
                        }else{
                            FrontView= this.state.GrInputRearView.OuterLayer
                        }                                         
                            let RackHeight=parseInt(FrontView["@Height"].replace("U","")) * 17.4;           
                            let RackInnerHeight=parseInt(FrontView["@Height"].replace("U","")) * 16;
                            if(Array.isArray(FrontView.InnerLayers.InnerLayer)){
                            RacksInsideServers =FrontView.InnerLayers.InnerLayer.map(val=>{   
                                    let Synergy12000Render;
                                    let PaddinngStyle;                      
                                    let Server ;
                                    var InnerServrsHeight=parseInt(val["@Height"].replace("U","")) * 16;
                                        if(val.Item ===undefined){
                                        //    Server =val["@EmptyImage"];  
                                        }else{
                                            Mapcontent.length=[];
                                            this.EnclosurePatteren(val);
                                            console.log(Mapcontent);
                                            let ServerImgPath;
                                                    if(this.state.RackRearView){
                                                        ServerImgPath="  ../img/SizingEngine/Images/GRE Images/";
                                                    }else{
                                                        ServerImgPath="";
                                                    }
                                                    
                                                    if(val["@EmptyImage"] == "C7000.gif"){
                                                            Server =Mapcontent.map(function(val,id){                                
                                                                if(val.length ==2){
                                                                    return( <Box justify='start' align='start' style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row'  justify='start'  id={val[0]["@EmptyImage"].slice(0,-4)}  className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)}> </Box>
                                                                                <Box direction='row'  justify='start' id={val[1]["@EmptyImage"].slice(0,-4)}  className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[1]["@EmptyImage"]+'")'}} data-tip={val[1]["@EmptyImage"].slice(0,-4)} ></Box>
                                                                            </Box>);                
                                                                }
                                                                else{
                                                                    if(val[0]["@EnclosureHeight"]=="2"){
                                                                    return(<Box justify='start' align='start'className="" style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} align='start' className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)} > {id} </Box>
                                                                    </Box>);   
                                                                    }else{
                                                                        return(<Box justify='start' align='start'className="" style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)}  align='start' className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}} data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);   
                                                                    }                                            
                                                                }                                    
                                                        }.bind(this));
                                                    }else  if(val["@EmptyImage"] == "C3000.gif"){
                                                    
                                                                let   AlignmentItemTop= '';
                                                                let   AlignmentItemleft='';
                                                                let   AlignmentItemRight='';
                                                                var ToAlign;                    
                                                            Server =Mapcontent.map(function(val,id){                                                                      
                                                                if(id==0){ ToAlign='6px' }else if(id==1){ToAlign='-13px'}else if(id==2){ ToAlign='-31px'
                                                                    }else if(id==3){ ToAlign='-51px' }else{ }
                                                                    var  TopStyle={                                                            
                                                                        height:'138%', width:'11%', position:'absolute', top: ToAlign,left:'45%', transform:'rotate(270deg)'
                                                                    }
                                                                
                                                                if(val.length ==2){
                                                                    return( <Box justify='start' align='start' style={TopStyle}>
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[0]["@EmptyImage"].slice(0,-4)}> </Box>
                                                                                <Box direction='row' justify='start' id={val[1]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[1]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[1]["@EmptyImage"].slice(0,-4)}>  </Box>
                                                                            </Box>);                
                                                                }                                                      
                                                                else{
                                                                    if(val[0]["@EnclosureHeight"]=="2"){
                                                                        return(<Box justify='start' align='start' style={TopStyle} className="">
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} align='start' className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);  
                                                                    }else{
                                                                        return(<Box justify='start' align='start' style={TopStyle} className="">
                                                                                <Box direction='row' justify='start' align='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);  
                                                                    }                                                 
                                                                }                                    
                                                        }.bind(this));
                                                    }else if(val["@EmptyImage"] =="Synergy 12000.gif"){
                                                        SynergyContent.length=[];                                             
                                                        this.SynergyPatteren(val);
                                                        console.log(SynergyContent);                                      
                                                            this.SynergyContent1Arrangement();               
                                                            console.log(SynergyContent1);
                                                            var topstyle;var leftstyle;var bottomstyle;
                                                        Synergy12000Render=  SynergyContent1.map((val,id)=>{
                                                                if(id==0){ 
                                                                topstyle='0px'
                                                                leftstyle='',
                                                                bottomstyle=''
                                                                }else if(id==1){
                                                                topstyle=''
                                                                leftstyle='',
                                                                bottomstyle='0px'
                                                                }else if(id==2){ 
                                                                topstyle='0px'
                                                                leftstyle='33%',
                                                                bottomstyle=''
                                                                    }else if(id==3){
                                                                    topstyle=''
                                                                    leftstyle='33%',
                                                                    bottomstyle='0px'
                                                                        }else if(id==4){
                                                                            topstyle='0px'
                                                                            leftstyle='66%',
                                                                            bottomstyle=''
                                                                        }else {
                                                                            topstyle=''
                                                                            leftstyle='66%',
                                                                            bottomstyle='0px'

                                                                    }
                                                                    var  AlignementCss={                                                            
                                                                        position:'absolute',width:'33%',bottom: bottomstyle,top:topstyle,left:leftstyle,height:'50%'
                                                                    }
                                                                        if(val.length ==2){
                                                                                    return(<Box direction='row' justify='start' align='start' style={AlignementCss}>
                                                                                            <Box direction='row' justify='start' align='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)} ></Box>
                                                                                            <Box direction='row' justify='start' align='start' id={val[1]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[1]["@EmptyImage"]+'")'}}  data-tip={val[1]["@EmptyImage"].slice(0,-4)}>  </Box>
                                                                                        </Box> );         
                                                                                }else{
                                                                                    if(val[0]["@EnclosureHeight"]==="2"){
                                                                                        return(<Box direction='row' justify='start' align='start' style={AlignementCss} >
                                                                                            <Box direction='row' justify='start' align='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover"  style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)}></Box>
                                                                                            <Box direction='row' justify='start' align='start'className="ServerItemsHover" style={{width:'100%',height:'100%'}}></Box>
                                                                                        </Box> );   
                                                                                    }else{
                                                                                        if(val[0]["@EnclosureHeight"]==="10"){
                                                                                        return(<Box direction='row' justify='start' align='start' style={AlignementCss}>
                                                                                            <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} align='start'className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)}> </Box>
                                                                                        
                                                                                        </Box> );   
                                                                                        }
                                                                                    }
                                                                                }
                                                        });


                                                            Server=<Box className="Synergy12000"  style={{position:'relative',height:'100%',width:'97%',margin:'auto'}}>{Synergy12000Render} </Box>

                                                    }                                                                                      

                                                    else{
                                                        Server =Mapcontent.map(function(val,id){                   
                                                                if(val.length ==2){
                                                                    return( <Box justify='start' align='start' style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' align='start'className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}> {id}</Box>
                                                                                <Box direction='row' justify='start' align='start'className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath+val[1]["@EmptyImage"]+'")'}}> {id} </Box>
                                                                            </Box>);                
                                                                }
                                                                else{
                                                                    if(val[0]["@EnclosureHeight"]==="2"){
                                                                        return(<Box justify='start' align='start' style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' align='start'className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("'+ServerImgPath +val["@EmptyImage"]+'")'}}> {id} </Box>
                                                                    </Box>); 
                                                                    }else{
                                                                        return(<Box justify='start' align='start' style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' align='start'className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("'+ServerImgPath +val["@EmptyImage"]+'")'}}> {id} </Box>
                                                                        </Box>); 
                                                                    }                                                                                             
                                                                }                                    
                                                        }); 
                                                    }
                                        }
                                        let  ImgPathUrl ='';
                                    if(val["@EmptyImage"]==="C7000.gif" || val["@EmptyImage"]==="C3000.gif" ||val["@EmptyImage"]==="Synergy 12000.gif"){
                                            if(this.state.RackRearView){
                                                ImgPathUrl ="../img/SizingEngine/Images/GRE Images/Enclosure/"  ;
                                                    
                                            }else{
                                                    ImgPathUrl ="../img/SizingEngine/Images/GRE Images/Rear View/" 
                                            }                                                                
                                    }else{
                                            if(this.state.RackRearView){
                                                    ImgPathUrl ="../img/SizingEngine/Images/GRE Images/" ; 
                                                    
                                            }else{
                                                    ImgPathUrl ="../img/SizingEngine/Images/GRE Images/Rear View/";  
                                            }   
                                    }                   
                                return(
                                    <Box direction='row'justify='start' align='start' margin="none" pad="none" className="" style={{height:InnerServrsHeight,width:'100%'}} >
                                    <Box direction='row'justify='start'   align='start' margin="none" pad="none" className="RackItemsHover" style={{height:'100%',width: '4px',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/BlankDetails.png")'}}> </Box>  
                                {/*     <Box direction='row' justify='start' align='start'  id={val["@EmptyImage"].slice(0,-4)}  separator="top" className="12345" style={{height:'100%',width:'100%',position:'relative',Padding:'4px', backgroundImage:'url("' + ImgPathUrl +val["@EmptyImage"]+'")',}} data-tip={val[0]["@EmptyImage"].slice(0,-4)}>   */ }    

                                      <Box direction='row' justify='start' align='start'  id={val["@EmptyImage"].slice(0,-4)}  separator="top" className="12345" style={{height:'100%',width:'100%',position:'relative',Padding:'4px', backgroundImage:'url("' + ImgPathUrl +val["@EmptyImage"]+'")',}} data-tip={val["@EmptyImage"].slice(0,-4)}>                  
                                            {Server}
                                    </Box>  
                                        <Box direction='row'justify='start' align='start' className="RackItemsHover" margin="none" pad="none"  style={{height:'100%',width: '4px',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/BlankDetails.png")'}}> </Box>  
                                        </Box>);                     
                        // console.log(Mapcontent);
                            
                            });
                        }else{                          
                                
                                    let PaddinngStyle;                      
                                    let Server ;                        
                                    var InnerServrsHeight = parseInt(FrontView.InnerLayers.InnerLayer["@Height"].replace("U","")) * 16;                 
                                    let  ImgPathUrl ='';
                                    if(FrontView.InnerLayers.InnerLayer.Item ===undefined){
                                        //    Server =val["@EmptyImage"];  
                                        }else{   
                                            Mapcontent.length=[];
                                            this.EnclosurePatteren(FrontView.InnerLayers.InnerLayer);
                                            console.log(Mapcontent);                            
                                            if(FrontView.InnerLayers.InnerLayer["@EmptyImage"]=="C7000.gif"){
                                                    let ServerImgPath;
                                                            if(this.state.RackRearView){
                                                            ServerImgPath="  ../img/SizingEngine/Images/GRE Images/";
                                                        }else{
                                                            ServerImgPath="";
                                                        }
                                                            Server =Mapcontent.map(function(val,id){                                
                                                                if(val.length ==2){
                                                                    return( <Box justify='start' align='start' style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row'  justify='start'  id={val[0]["@EmptyImage"].slice(0,-4)}  className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}} data-tip={val[0]["@EmptyImage"].slice(0,-4)}> </Box>
                                                                                <Box direction='row'  justify='start' id={val[1]["@EmptyImage"].slice(0,-4)}  className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[1]["@EmptyImage"]+'")'}} data-tip={val[1]["@EmptyImage"].slice(0,-4)}></Box>
                                                                            </Box>);                
                                                                }
                                                                else{
                                                                    if(val[0]["@EnclosureHeight"]=="2"){
                                                                    return(<Box justify='start' align='start'className="" style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} align='start' className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}} data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);   
                                                                    }else{
                                                                        return(<Box justify='start' align='start'className="" style={{height:'82%',width:'12%',marginTop:'4px'}}>
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)}  align='start' className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}} data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);   
                                                                    }                                            
                                                                }                                    
                                                        }.bind(this));

                                            }else if(FrontView.InnerLayers.InnerLayer["@EmptyImage"]=="C3000.gif"){
                                                            let ServerImgPath;
                                                            if(this.state.RackRearView){
                                                                ServerImgPath="  ../img/SizingEngine/Images/GRE Images/";
                                                                }else{
                                                                    ServerImgPath="";
                                                                }
                                                
                                                                let   AlignmentItemTop= '';
                                                                let   AlignmentItemleft='';
                                                                let   AlignmentItemRight='';
                                                                var ToAlign;                    
                                                            Server =Mapcontent.map(function(val,id){                                                                      
                                                                if(id==0){ ToAlign='6px' }else if(id==1){ToAlign='-13px'}else if(id==2){ ToAlign='-31px'
                                                                    }else if(id==3){ ToAlign='-51px' }else{ }
                                                                    var  TopStyle={                                                            
                                                                        height:'138%', width:'11%', position:'absolute', top: ToAlign,left:'45%', transform:'rotate(270deg)'
                                                                    }
                                                                
                                                                if(val.length ==2){
                                                                    return( <Box justify='start' align='start' style={TopStyle}>
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[0]["@EmptyImage"].slice(0,-4)}> </Box>
                                                                                <Box direction='row' justify='start' id={val[1]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" align='start' style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[1]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[1]["@EmptyImage"].slice(0,-4)}>  </Box>
                                                                            </Box>);                
                                                                }                                                      
                                                                else{
                                                                    if(val[0]["@EnclosureHeight"]=="2"){
                                                                        return(<Box justify='start' align='start' style={TopStyle} className="">
                                                                                <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} align='start' className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);  
                                                                    }else{
                                                                        return(<Box justify='start' align='start' style={TopStyle} className="">
                                                                                <Box direction='row' justify='start' align='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" style={{width:'100%',height:'50%',backgroundImage:'url("' +ServerImgPath +val[0]["@EmptyImage"]+'")'}}
                                                                                data-tip={val[0]["@EmptyImage"].slice(0,-4)}> {id} </Box>
                                                                    </Box>);  
                                                                    }                                                 
                                                                }                                    
                                                        }.bind(this));
                                            }else if(FrontView.InnerLayers.InnerLayer["@EmptyImage"]=="Synergy 12000.gif") {
                                                        SynergyContent.length=[];                                        
                                                        this.SynergyPatteren(FrontView.InnerLayers.InnerLayer);
                                                        console.log(SynergyContent); 
                                                        this.SynergyContent1Arrangement();                     
                                                        console.log(SynergyContent1);                                               
                                                        this.Synergy12000Design(SynergyContent1);
                                                        Server=<Box className="Synergy12000"  style={{position:'relative',height:'100%',width:'97%',margin:'auto'}}>{Synergy12000Render} </Box>               
                                                    }                                                                
                                                    console.log(FrontView.InnerLayers.InnerLayer.Item);
                                                } 
                                        if(FrontView.InnerLayers.InnerLayer["@EmptyImage"]==="C7000.gif" || FrontView.InnerLayers.InnerLayer["@EmptyImage"]==="C3000.gif" ||FrontView.InnerLayers.InnerLayer["@EmptyImage"]==="Synergy 12000.gif"){
                                            if(this.state.RackRearView){
                                                ImgPathUrl ="../img/SizingEngine/Images/GRE Images/Enclosure/"  ;
                                                    
                                            }else{
                                                    ImgPathUrl ="../img/SizingEngine/Images/GRE Images/Rear View/" 
                                            } 
                                        }else{
                                            if(this.state.RackRearView){
                                                ImgPathUrl ="../img/SizingEngine/Images/Enclosures/"  ;                                       
                                                }else{
                                                ImgPathUrl ="../img/SizingEngine/Images/GRE Images/Rear View/" 
                                            } 
                                        }
                                        
                        
                                RacksInsideServers=   <Box direction='row'justify='start' align='start' margin="none" pad="none" className="" style={{height:InnerServrsHeight,width:'100%',}} >
                                                        <Box direction='row'justify='start'   align='start' margin="none" pad="none" className="RackItemsHover" style={{height:'100%',width: '4px',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/BlankDetails.png")'}}> </Box>  
                                                            <Box direction='row' justify='start' align='start' className="idxse"   separator="top"  style={{height:'100%',width:'100%',position:'relative',Padding:'4px', backgroundImage:'url("' + ImgPathUrl +FrontView.InnerLayers.InnerLayer["@EmptyImage"]+'")',}}>      {Server}     
                                                            </Box>  
                                                        <Box direction='row'justify='start' align='start' className="RackItemsHover" margin="none" pad="none"  style={{height:'100%',width: '4px',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/BlankDetails.png")'}}> </Box>  
                                                    </Box> 
                        }
  }


  Synergy12000Design(SynergyContent1){

            let ServerImgPath;
                 if(this.state.RackRearView){
                   ServerImgPath="  ../img/SizingEngine/Images/GRE Images/";
             }else{
                  ServerImgPath="";
            }

           var topstyle;var leftstyle;var bottomstyle;
    Synergy12000Render  =  SynergyContent1.map((val1,id)=>{

                                        if(!Array.isArray(val1)){
                                              var val =[];
                                            val.push(val1);
                                        }
                                    //   if(typeof val1 =='object'){
                                    //       var val =[];
                                    //         val.push(val1);
                                    //   }
                                      
                                      else{                     
                                           val = val1;
                                      }
         
                                                        if(id==0){ 
                                                           topstyle='0px'
                                                           leftstyle='',
                                                           bottomstyle=''
                                                        }else if(id==1){
                                                           topstyle=''
                                                           leftstyle='',
                                                           bottomstyle='0px'
                                                        }else if(id==2){ 
                                                           topstyle='0px'
                                                           leftstyle='33%',
                                                           bottomstyle=''
                                                            }else if(id==3){
                                                            topstyle=''
                                                            leftstyle='33%',
                                                            bottomstyle='0px'
                                                                 }else if(id==4){
                                                                    topstyle='0px'
                                                                    leftstyle='66%',
                                                                    bottomstyle=''
                                                                 }else {
                                                                    topstyle=''
                                                                    leftstyle='66%',
                                                                    bottomstyle='0px'

                                                             }
                                                              var  AlignementCss={                                                            
                                                                   position:'absolute',width:'33%',bottom: bottomstyle,top:topstyle,left:leftstyle,height:'50%'
                                                            }
                                                                if(val.length ==2){
                                                                             return(<Box direction='row' justify='start' align='start' style={AlignementCss}>
                                                                                    <Box direction='row' justify='start' align='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)} ></Box>
                                                                                    <Box direction='row' justify='start' align='start' id={val[1]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[1]["@EmptyImage"]+'")'}}  data-tip={val[1]["@EmptyImage"].slice(0,-4)}>  </Box>
                                                                                  </Box> );         
                                                                        }else{
                                                                            if(val[0]["@EnclosureHeight"]==="2"){
                                                                                return(<Box direction='row' justify='start' align='start' style={AlignementCss} >
                                                                                       <Box direction='row' justify='start' align='start' id={val[0]["@EmptyImage"].slice(0,-4)} className="ServerItemsHover"  style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)}></Box>
                                                                                       <Box direction='row' justify='start' align='start'className="ServerItemsHover" style={{width:'100%',height:'100%'}}></Box>
                                                                                  </Box> );   
                                                                            }else{
                                                                                if(val[0]["@EnclosureHeight"]==="10"){
                                                                                   return(<Box direction='row' justify='start' align='start' style={AlignementCss}>
                                                                                    <Box direction='row' justify='start' id={val[0]["@EmptyImage"].slice(0,-4)} align='start'className="ServerItemsHover" style={{width:'100%',height:'100%',backgroundImage:'url("' +ServerImgPath+val[0]["@EmptyImage"]+'")'}}  data-tip={val[0]["@EmptyImage"].slice(0,-4)}> </Box>
                                                                                  
                                                                                  </Box> );   
                                                                                }
                                                                            }
                                                                        }
                                                 });
  }
  SynergyContent1Arrangement(){
            let ArrayHaifBuy=[];  let ArrayFullBuy=[];  let ArrayFullBuyhalf=[];                                                
            SynergyContent1.length=[];                                            
             SynergyContent.map((org,id)=>{
             if(org.Item == undefined){
                   if(org.length == 1 && org[0]["@EnclosureHeight"]=="2" || org.length>1){
                   if(ArrayHaifBuy.length<1){                                                                      
                     ArrayHaifBuy=[...ArrayHaifBuy,org]
                     }else{
                     ArrayFullBuyhalf=[...ArrayFullBuyhalf,org]               
                       }
                }else if(org.length ==1 && org[0]["@EnclosureHeight"]=="10"){
                       ArrayFullBuy=[...ArrayFullBuy,org]
                }else{

             }
             }else{
                  if(org.Item["@EnclosureHeight"]=="2"){                                                                      
                     ArrayHaifBuy=[...ArrayHaifBuy,org.Item]
                     }else{
                     ArrayFullBuyhalf=[...ArrayFullBuyhalf,org.Item]               
                       }
             }
                  
           
           });
     SynergyContent1 =SynergyContent1.concat(ArrayHaifBuy,ArrayFullBuy,ArrayFullBuyhalf);   
  }
RackHoverOut(e){
     this.setState({TitleDisplay:false,ServerItemName:''});    
   console.log(this.state.TitleDisplay);
}

ZoomIn(){
     var ZoomScaleX = 0.2;
      if(this.state.scaleRadiusX>2.1){
        //   alert("ZoomIn NoMore")
      
       }
   //  console.log(this.state.scaleRadiusX);
     this.setState({scaleRadiusX:this.state.scaleRadiusX + ZoomScaleX, scaleRadiusY:this.state.scaleRadiusY ,MinRackHeight: this.state.MinRackHeight + 50 ,disabledZoomOut:false});
}
ZoomOut(){
     var ZoomScaleX = 0.2;
       if(this.state.scaleRadiusX<0.8){
         console.log("Zoomput NoMore")
             console.log(this.state.scaleRadiusX - ZoomScaleX);
             console.log(this.state.MinRackHeight -50);
             console.log(this.state.scaleRadiusY);
          
       }else{
                 

               this.setState({scaleRadiusX:this.state.scaleRadiusX - ZoomScaleX,MinRackHeight:this.state.MinRackHeight -50, scaleRadiusY:this.state.scaleRadiusY });
     
    

  }
}
  RackHoverOver(e){
    var  HoveText =e.target.getAttribute("id");
     EventTopspace =e.clientY;
     EventLeftspace=e.clientX;
    console.log(this.state.TitleDisplay);   
    this.setState({TitleDisplay:true,ServerItemName:HoveText});
  }

componentWillMount(){  

   console.log(this.props.PassActiveSite);
// this.props.activeSession.GRInput;
  console.log(this.props.StaticGRlist);

   this.state.ActiveSite=this.props.PassActiveSite["@SiteID"];

   /* Static GRinput file */
            // this.state.GrInputRearView= GRInput.GraphicalInputs;
  /* dynamic GRinput file */

 this.state.GrInputRearView=this.props.activeSession.GRInput;
   this.RackInsideServers();
}
SynergyPatteren(val){

    if(Array.isArray(val.Item)){
   val.Item.map(function(val,id){
           if(val["@EnclosureHeight"]=="2"){
              if(SynergyContent.length<1){
                    var z=[];
                    z.push(val);
                    SynergyContent=[...SynergyContent,z];
              }else{
                    var  quit=false;
                             var visited=true;
                   SynergyContent.map(element=>{
                      if(element.length===1 && element[0]["@EnclosureHeight"] ==="2"){                                             
                                  element.push(val)  
                                  quit=false;
                                    visited=false;                                              
                                 } else if(element[0]["@EnclosureHeight"] ==="10"){
                                   if(visited){
                                     quit=true;
                                       }                                 
                                      }else{
                                         quit=true;
                                       }
                   });
                                    if(quit){
                                       var z=[];
                                        z =[...z,val];  
                                        SynergyContent=[...SynergyContent,z];
                                 }
                             return false;                                            
                                   
              }

           }else if(val["@EnclosureHeight"] =="10"){
               var z=[];                
                           z.push(val);   
                            SynergyContent=[...SynergyContent,z];
           }else{

           }

   })
    }else{
      SynergyContent=[...SynergyContent,val];  
    }

console.log(SynergyContent);
}
EnclosurePatteren(val){

           if(Array.isArray(val.Item)){
            val.Item.map(function(val,id){
                if(val["@EnclosureHeight"] =="1"){    
                     if(Mapcontent.length<1){        
                           var z=[];                
                           z.push(val);   
                            Mapcontent=[...Mapcontent,z];
                       }else{
                             var  quit=false;
                             var visited=true;
                             var t=0;                                      
                              Mapcontent.map(element=>{
                               if(element.length===1 && element[0]["@EnclosureHeight"] ==="1"){                                             
                                  element.push(val)  
                                  quit=false;
                                    visited=false;                                              
                                 } else if(element[0]["@EnclosureHeight"] ==="2"){
                                   if(visited){
                                     quit=true;
                                       }                                 
                                      }else{
                                         quit=true;
                                       }
                                     });
                                   if(quit){
                                       var z=[];
                                        z =[...z,val];  
                                        Mapcontent=[...Mapcontent,z];
                                        }
                                         return false;                                            
                                    }             
                                    }          
                                    else if(val["@EnclosureHeight"] =="2"){
                                            var z=[];
                                            z =[...z,val];
                                        Mapcontent=[...Mapcontent,z];
                                    }  else{
                                    }    
                              });
           }else{
            Mapcontent=[...Mapcontent,val];
           }
}

RackInsideServers(){
    console.log(this.stateActiveSite);
 console.log(this.state.GrInputRearView);

                    
                        if( this.state.GrInputRearView.OuterLayer.length >1 && this.state.GrInputRearView.OuterLayer[1]["@Site"] == this.state.GrInputRearView.OuterLayer[0]["@Site"]){
                         RacksDisplaying=  this.state.GrInputRearView.OuterLayer.map((Rackitem,id)=>{
                                this.OuterLayerLoop(Rackitem,id);
                                      let RackHeight=parseInt(Rackitem["@Height"].replace("U","")) * 17.4;           
                                      let RackInnerHeight=parseInt(Rackitem["@Height"].replace("U","")) * 16;
                                    return(
                                        <Box margin="small" pad="none" style={{width:'200px'}}>
                                         <Box direction='row' justify='start' align='center' className="RackHeightCls" style={{width:'50%',position:'absolute',left:'0%',top:'26%'}}>
                                                <Headline margin="none" pad="none" strong={true} size="small" className="RotateHeadingRack" style={{fontSize: '16px'}}>
                                              
                                                </Headline>
                                            </Box>
                                                  <Box  align='center' style={{width:'100%'}}> 
                                                     <Heading strong={true} align='center' uppercase={false}truncate={false} tag='h3'>{!this.state.ViewLabelbtn} </Heading>
                                                    
                                                    </Box>
                                                 <Box justify='center' pad="none" margin="small"  align='center' className="RackImageDisplay" style={{width:'100%',height:RackHeight +'px', backgroundImage:'url("../img/SizingEngine/Images/GRE Images/' +FrontView["@OuterLayerImage"]+'")'}}> 
                                                    <Box   align='end'  pad="none" margin="none"  reverse={true}    style={{height:RackInnerHeight,width:'77%',margin:'auto',height:'95%',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/Blank.png")',marginBottom:'4%',marginTop:'3%'}}> 
                                                        <Box   align='end'  reverse={true}  className="" style={{height:RackInnerHeight,width:'100%',margin:'auto',marginBottom:'10px'}}> 
                                                                {RacksInsideServers}
                                                        </Box>
                                                    </Box>
                                                </Box>  </Box> );
                              
                              });

                        }else{

                                var data =this.state.GrInputRearView.OuterLayer;
                                 this.OuterLayerLoop(data);
                             //    this.OuterLayerLoop(data,0);
                               

                              if(this.props.PassActiveSite["@SiteID"] ==undefined){
                                          FrontView= this.state.GrInputRearView.OuterLayer
                                    }else{
                                          FrontView =this.state.GrInputRearView.OuterLayer[this.props.PassActiveSite["@SiteID"]]; 
                                }
                              RackHeight=parseInt(FrontView["@Height"].replace("U","")) * 17.4;           
                              RackInnerHeight=parseInt(FrontView["@Height"].replace("U","")) * 16;

                              RacksDisplaying= <Box  margin="small"  pad="none" style={{width:'200px'}}>
                                                    <Box direction='row' justify='start' align='center' className="RackHeightCls" style={{width:'50%',position:'absolute',left:'0%',top:'26%'}}>
                                                        <Headline margin="none" pad="none" strong={true} size="small" className="RotateHeadingRack" style={{fontSize: '16px'}}>
                                                     
                                                        </Headline>
                                                    </Box>
                                                        <Box  align='center' style={{width:'100%'}}> 
                                                             <Heading strong={true} align='center' uppercase={false}truncate={false} tag='h3'>{!this.state.ViewLabelbtn} </Heading> 
                                                        </Box>
                                                        <Box justify='center' pad="none" margin="small"  align='center' className="RackImageDisplay" style={{width:'100%',height:RackHeight+'px',transform: 'scale('+ this.state.scaleRadiusX + ','+ this.state.scaleRadiusX+ ')',transition:'all 0.5s ease-in-out',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/' +FrontView["@OuterLayerImage"]+'")'}}> 
                                                            <Box   align='end'  pad="none" margin="none"  reverse={true}    style={{height:RackInnerHeight+'px',width:'77%',margin:'auto',height:'95%',backgroundImage:'url("../img/SizingEngine/Images/GRE Images/Blank.png")',marginBottom:'4%',marginTop:'3%'}}> 
                                                                <Box   align='end'  reverse={true}   style={{height:RackInnerHeight,width:'100%',margin:'auto',marginBottom:'10px'}}> 
                                                                        {RacksInsideServers}
                                                                </Box>
                                                            </Box>
                                                        </Box> 
                                                 </Box> 
                                    }
                                  RackServersPresentation = <Box direction='row' justify='center'  align='center'  style={{width:'100%',minHeight:this.state.MinRackHeight +'px',maxHeight:'900px',position:'relative'}} >                                     
                                                <Box  direction="row" justify='between' align='end'>
                                                    {RacksDisplaying}    
                                                </Box>
                            </Box>
}
InnerView(){
 
}
RevertBack(){
     this.props.RackserverView(true);
}
RearView(){

    if(!this.state.RackRearView){
        this.setState({ViewLabelbtn:'Rear View',RackRearView:true});
    }else{
            this.setState({ViewLabelbtn:'Front View',RackRearView:false});
    }
}




    render(){
          HoverTitleStyle={
                    color:'black', width:'auto',height:'auto',padding:'2px 4px',position:'absolute',top:EventTopspace-10+'px',left:EventLeftspace-10 +'px',zIndex:'220',backgroundColor:'#cccccc',border:''
                }
          
          this.RackInsideServers();

         
          if(this.state.RackRearView){
         RearviewHOverItems =   this.state.TitleDisplay ? <Box margin="none" pad="none" style={HoverTitleStyle} >{this.state.ServerItemName}</Box>:<Box></Box>
          }else{
            RearviewHOverItems="";  
          }
        return(
              <Box direction='row' margin="none" pad="none"  className="GrTabSection" justify='start' align='center'style={{height:'100%',width:'100%'}}>
                  <ReactTooltip />
                    <Box    margin="none" pad="none" justify='start' align='start'  basis="1/4" separator="right" style={{height:'100%',width:'100%'}}> 
                            <Box separator="bottom"  direction='row' justify='start'  margin="none" justify='start' align='center'  className="ZoomSectionBtns" style={{width:'100%'}}>                                                              
                                <Button icon={<Print size="small" colorIndex="accent-3" />} primary={false}  onClick={this.PrintImage} />
                                <Button icon={<Save size="small" colorIndex="accent-3" />} primary={false} onClick={this.ImageConvertion} />              
                                <Button icon={<ZoomIn size="small" colorIndex="accent-3" />} primary={false}  disabled={this.state.disabledZoomIn} onClick={this.ZoomIn}/>
                                <Button icon={<ZoomOut size="small" colorIndex="accent-3" />} primary={false} disabled={this.state.disabledZoomOut} onClick={this.ZoomOut} />                              
                                <Button icon={<Revert size="small" colorIndex="accent-3"  />} primary={false} onClick={this.RevertBack} />
                            </Box>
                    <Box  justify='between'  margin="none" pad="small"  align='center' className="ConfigBtns" style={{width:'100%'}}>                   
                        <Button  full={true} label={this.state.ViewLabelbtn}  onClick={this.RearView}/>    
                    </Box>
                        
                        <Box  className="SolutionConfigAccordian"justify='start'  margin="none" pad="none" justify='start' align='start'>                      
                        </Box>
                </Box>
                    <Box  id="capture"  className="HrSecPres"  margin="none" pad="small" justify='center' align='start' basis="3/4">              
                        <Box  direction='row' margin="none" pad="small" justify='center'  style={{minHeight:'400px',maxHeight:'700px',width:'100%',overflow:'auto'}} >        
                              {RearviewHOverItems}   
                            {RackServersPresentation}
                        </Box>
            </Box>
        </Box> 



         

        );
    }
}
const mapStateToProps = (state) => {  
  return{                
      activeSession: state.sessions.activeSession,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
   onfetchGRinput:(sessionID) =>{
        dispatch(fetchGRinput(sessionID));
      },
    };
};
//export default GrRackServerPresentation;
export default connect(mapStateToProps,mapDispatchToProps) (GrRackServerInnerPresentation);

