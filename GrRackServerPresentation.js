import React, { Component } from 'react';
//import { Switch, Route, Link } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';
//  import GRInput from '../../Datafiles/GrInput.json';
import Heading from 'grommet/components/Heading';
import Spinning from 'grommet/components/icons/Spinning'
import Map from 'grommet/components/Map';
import ConfigureSolutionDetails from './ConfigureSolution';
import Print from 'grommet/components/icons/base/Print';
import Save from 'grommet/components/icons/base/Save';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import {fetchGRinput} from '../../State/actions/sessions';
import Layer from 'grommet/components/Layer';
import  jsPDF from 'jspdf';
import ReactTooltip from 'react-tooltip';
var HoverTitleStyle;
let  SitesList=[];
let SiteGrPresentation;
var ImagesObject;
let ActiveTabPass;
let SitesMapping;
let RackServersandEnclosureHover;
let  EventTopspace;
let  EventLeftspace;
var CountNewWindowOpen=0;
let LoadingPopup;

var ActiveTabObj={
             Title:'aa',
             Description:'aaa'
}

class GrRackServerPresentation extends Component{
  constructor(props){
      super(props);
      this.state={
          
           scaleRadiusX:50,
           scaleRadiusY:15,
           disabledZoomOut:false,
           InnerView:false,
           GrInputData:'',
           RackservHover:true,
           ActiveTabClass:'',
           TitleDisplay:false,
           ServerItemName:'D123467',
           ActiveSessioonNum:'',
           ActiveServerTab:ActiveTabObj,
           PopupLoaderlayer:true,
           FirstTimeObjLoop:false,
           ConfigureSolutionData:''
          
      }
      this.ZoomIn=this.ZoomIn.bind(this);
      this.ZoomOut=this.ZoomOut.bind(this);
      this.InnerViewSec=this.InnerViewSec.bind(this);
      this.GrPresentation=this.GrPresentation.bind(this);
      this.openServerActiveTab=this.openServerActiveTab.bind(this);
      this.ActiveSiteTab=this.ActiveSiteTab.bind(this);
      this.ClearData=this.ClearData.bind(this);
      this.HandleActive=this.HandleActive.bind(this);
      this.RackHoverOver=this.RackHoverOver.bind(this);
      this.RackHoverOut=this.RackHoverOut.bind(this);
      this.triggerChildAlert=this.triggerChildAlert.bind(this);
      this.ImageConvertion=this.ImageConvertion.bind(this);
      this.downloadURI=this.downloadURI.bind(this);
      this.PrintImage=this.PrintImage.bind(this);
      this.PrintImageURI=this.PrintImageURI.bind(this);
      this.VoucherSourcetoPrint=this.VoucherSourcetoPrint.bind(this);
      this.VoucherSourcetoPrintIe=this.VoucherSourcetoPrintIe.bind(this);
  }

componentWillMount(){
       this.state.FirstTimeObjLoop=true;
     if(this.props.StaticGRlist){
        //      this.state.GrInputData =GRInput;
              this.state.GrInputData= this.state.GrInputData.GraphicalInputs;
     }else{
       if(this.props.activeSession.GRInput!=''){
          this.state.GrInputData=this.props.activeSession.GRInput;
      }
     }    
}

componentDidMount(){
  if(this.props.StaticGRlist){
          //    this.state.GrInputData = GRInput;
              this.state.GrInputData = this.state.GrInputData.GraphicalInputs;
     }else{

        if(this.props.activeSession.GRInput==''){
            if(this.props.activeSession.EPAArray.length == 0 ){
                var sessionObject = {"SessionID":this.props.activeSession.id };
                this.props.onfetchGRinput(sessionObject);
            }else{
                var sessionObject = {"SessionID":this.props.activeSession.id, "EPASolutionType": this.props.actvSoln };
                this.props.onfetchGRinput(sessionObject);
            }
            
            // var sessionObject = {"SessionID":this.props.activeSession.id};
            // this.props.onfetchGRinput(sessionObject);
            this.state.GrInputData=this.props.activeSession.GRInput;
        
        }
     }
}
   componentWillReceiveProps(nextProps, nextState){

       if(nextProps.StaticGRlist){
          
       }else{
            this.state.GrInputData =nextProps.activeSession.GRInput; 
       }
     
}    



 PrintImage(){
       this.setState({scaleRadiusX:0.6000000000000001,MinRackHeight:600, scaleRadiusY:1 });
      CountNewWindowOpen++;
          var doc;
            html2canvas(document.querySelector("#GrRackServers"),{width:1200,height:1400, useCORS: true}).then(canvas => {              
                  var imgData = canvas.toDataURL();
                //   var doc = new jsPDF('p', 'mm');
                //   doc.addImage(imgData, 'PNG', 10, 10);
                //   doc.save('canvas.pdf');         
                this.PrintImageURI(canvas.toDataURL(), 'canvas.png');             
           });     
  }
    PrintImageURI(url,filename){
      var 	Pagelink = "about:blank";
		var pwa = window.open(Pagelink, "_new");
		pwa.document.open();
        	pwa.document.write("SAPHANA tool");
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
      this.setState({scaleRadiusX:0.6000000000000001,MinRackHeight:600, scaleRadiusY:1 });
      var doc;

    html2canvas(document.querySelector("#GrRackServers"),{imageTimeout:0, allowTaint: true,logging:true,width:1200,height:1400, useCORS: true}).then(canvas => {        
           
             
                //   var imgData = canvas.toDataURL();
                //   var doc = new jsPDF('p', 'mm');
                //   doc.addImage(imgData, 'PNG', 10, 10);
                //    doc.save('canvas.png');
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



 triggerChildAlert(d,e){
        this.refs.child.ChildAccordianActive(d,e);
    }
RackHoverOver(e){

    var HoveText=  e.target.getAttribute("id");
       
     if(HoveText == null){

         if(e.target.className.indexOf('grommetux-label') >-1){
              HoveText=e.target.parentNode.childNodes[0].getAttribute("id").slice(2);
         }else{
               HoveText=e.target.childNodes[0].getAttribute("id").slice(2);
         }       
     }else{
         HoveText=e.target.getAttribute("id").slice(2);
     }

//    console.log(e);
    EventTopspace =e.clientY;
    EventLeftspace=e.clientX;
    // console.log(this.state.TitleDisplay);   
    this.setState({TitleDisplay:true,ServerItemName:HoveText});
  }
RackHoverOut(e){
//   console.log(e);
   this.setState({TitleDisplay:false,ServerItemName:''});    
//    console.log(this.state.TitleDisplay);
}
  HandleActive(){
      alert("hoverActive");
  }
ClearData(){
}
InnerViewSec(e){
      // alert("Exiting");
      //  console.log(e);
      this.props.RackserverView1(this.state.InnerView,ActiveTabPass);
}
openServerActiveTab(d,e){
      this.triggerChildAlert(d,e);
      
}

ZoomIn(){
     var ZoomScaleX = 7;
     //  console.log(this.state.scaleRadiusX);
     this.setState({scaleRadiusX:this.state.scaleRadiusX + ZoomScaleX, scaleRadiusY:this.state.scaleRadiusY + 3,disabledZoomOut:false});
}
ZoomOut(){
     var ZoomScaleX = 7;
       if(this.state.scaleRadiusY<15){
          this.setState({disabledZoomOut:true});
       }else{
               this.setState({scaleRadiusX:this.state.scaleRadiusX - ZoomScaleX, scaleRadiusY:this.state.scaleRadiusY - 3});
       }
}



GrPresentation(){
          if(SitesList ==""){
          let SiteObj;
          if( this.state.GrInputData != undefined &&  this.state.GrInputData.GraphicalInput.length==undefined){
               SiteObj={Name :this.state.GrInputData.GraphicalInput["@Site"] ,Id:this.state.GrInputData.GraphicalInput["@SiteID"],ActiveClass:"active" } 
               SitesList=[...SitesList,SiteObj];
            }
            else{this.state.GrInputData.GraphicalInput.map(val=>{   
            if(val["@SiteID"] =="0"){
                SiteObj={Name :val["@Site"] ,Id:val["@SiteID"],ActiveClass:"active" } 
            }else{
                    SiteObj={Name :val["@Site"] ,Id:val["@SiteID"],ActiveClass:"" } 
            }  
            SitesList=[...SitesList,SiteObj];
            });
        }
     }
}
ActiveSiteTab(e){
      this.state.FirstTimeObjLoop=false;
    var  ActiveTabIndex = e.target.getAttribute("id");
    SitesList.map(val=>{     
    
        if(val["Id"] == ActiveTabIndex){
           this.state.ActiveTabClass='active';    
            val["ActiveClass"] =this.state.ActiveTabClass;
            }else{
            this.state.ActiveTabClass=' ';  
            val["ActiveClass"] =''
            }
        });
   this.setState({});
}

    render(){
          
           let  SitesListMenu=[]
        if(this.state.GrInputData !== '' && this.state.FirstTimeObjLoop){
             this.GrPresentation();
             } 
                 let FinalRender;
                 if(this.state.GrInputData["GraphicalInput"]==undefined){
                    FinalRender = <Heading tag='h4' align='center' margin='medium' strong={false} style={{marginLeft:'45%' }} >Loading... </Heading>             
                    }else{                  
                HoverTitleStyle={
                        color:'black', width:'auto',height:'auto',padding:'2px 4px',position:'absolute',top:EventTopspace-10+'px',left:EventLeftspace-10 +'px',zIndex:'220',backgroundColor:'#cccccc',border:''
                    }
               var dessign;
                  SitesListMenu=SitesList.map(val=>{          
                       return( <Anchor className={val["ActiveClass"]}  id={val["Id"]} onClick={(e) => this.ActiveSiteTab(e)}>{val["Name"]}</Anchor>);
                });   
                var ActiiveTabObject = SitesList.filter(x=>x.ActiveClass ==="active");
                 if(this.props.StaticGRlist){
                         // this.state.ConfigureSolutionData=this.state.GrInputData.GraphicalInput[ActiiveTabObject[0]["Id"]].Items;
                            this.state.ConfigureSolutionData = this.state.GrInputData.GraphicalInput.Items;
                      }else{
                          this.state.ConfigureSolutionData = this.state.GrInputData.GraphicalInput.Items;
                      }

                SiteGrPresentation={
                    categories:[
                     {id: 'category-1', label: 'Rack', items: []}, 
                     {id: 'category-2', label: 'Server', items: []}, 
                     {id: 'category-3', label: 'Storage', items: []}, 
                     {id: 'category-4', label: 'BladeEnclosure', items: []}, 
                    ],
                    links:[                  
                    ]
                }         
                      if(this.state.GrInputData.GraphicalInput[ActiiveTabObject[0]["Id"]] ==undefined){
                        ActiveTabPass= this.state.GrInputData.GraphicalInput["@SiteID"];
                        SitesMapping = this.state.GrInputData.GraphicalInput;   
                   
                 }else{
                       ActiveTabPass= this.state.GrInputData.GraphicalInput[ActiiveTabObject[0]["Id"]]
                       SitesMapping = this.state.GrInputData.GraphicalInput[ActiiveTabObject[0]["Id"]] ;   
                 }
                         if(Array.isArray(SitesMapping.Items.Item)){
                         SitesMapping.Items.Item.map(val=>{        
                         var SplitObjImagePath = val["@imagepath"].split("\\\\");
                         var impath = "../img/SizingEngine/"+ SplitObjImagePath[1].replace(/\\/g, "/");
                         let RackItemClick;   
                         SiteGrPresentation.categories.map(function(item,id){
                            if(item["label"] ==="Rack") {
                                RackItemClick = this.InnerViewSec;
                            }else{
                                   RackItemClick = (e)=>this.openServerActiveTab(val["@name"],val["@description"]);
                                  //  RackItemClick = ""
                            }
                                   if(item["label"] == val["@Type"]){
                                       var  SynergyHeight;
                                         var Synergywidth;
                                       if(val["@Type"]=="Server"){                                    
                                               if(val["@description"].indexOf('Synergy')>-1){
                                                     SynergyHeight="140px"
                                                     Synergywidth="49px"
                                               }
                                       }else if(val["@Type"] =="Storage"){
                                             if(val["@description"].indexOf("1 x 20800")>-1){
                                                     SynergyHeight="170px"
                                                     Synergywidth= '70px'
                                               }
                                        }else if(val["@Type"] =="BladeEnclosure"){
                                             if(val["@description"].indexOf("Synergy 12000")>-1){
                                                  SynergyHeight="100px"
                                                     Synergywidth= '110px'
                                             }                                                        
                                        }else{

                                        }
                          
                                       var HoverText1 =val["@name"];
                                    var ItemObj={"id": val["@id"] , "label":val["@description"],"node": <Box margin="none" pad="none"  data-tip={HoverText1} onClick={RackItemClick}>< Box  className="DisplayImages" colorIndex="light-1" pad='none'><Image style={{height:SynergyHeight,width:Synergywidth}}  src={impath} id={val["@id"] + val["@name"]} size="small" caption={val["@description"]} /> </Box></Box>}
                                       item.items =[...item.items,ItemObj];
                                   }                          
                         }.bind(this));                    
                                 if(val.Connections ==undefined){
                                 }else{
                                      var connectionObj;
                                      var ColorCode;  
                                       if(!Array.isArray(val.Connections.Connection)){
                                            if(val.Connections.Connection["linecolor"]=="Red" || val.Connections.Connection["linetype"] =="Red")   {
                                                ColorCode  ="critical"                                      
                                             }else if(val.Connections.Connection["linecolor"]=="Green" || val.Connections.Connection["linetype"] =="Green"){
                                                  ColorCode  ="brand"                                             
                                             }else if(val.Connections.Connection["linetype"] =="Dotted" || val.Connections.Connection["linecolor"] =="Dotted"){
                                                    ColorCode  ="neutral-2"  
                                             }else{
                                                    ColorCode  ="neutral-1"
                                             }  
                                        connectionObj=  {parentId: val["@id"], childId:val.Connections.Connection["id"],colorIndex: ColorCode};
                                        SiteGrPresentation.links=[... SiteGrPresentation.links,connectionObj];
                                       }else{
                                       val.Connections.Connection.map(function(d){   
                                           var ColorCode;  
                                           var Pinpoint;
                                             if(d["linecolor"]=="Red" || d["linetype"] =="Red")   {
                                                ColorCode  ="critical"                                      
                                             }else if(d["linecolor"]=="Green" || d["linetype"] =="Green"){
                                                  ColorCode  ="brand"                                             
                                             }else if(d["linetype"] =="Dotted" || d["linecolor"] =="Dotted"){
                                                    ColorCode  ="neutral-2"  
                                             }else{
                                                    ColorCode  ="neutral-1"
                                             }            
                                        connectionObj=  {parentId: val["@id"], childId:d["id"],colorIndex:ColorCode};
                                        SiteGrPresentation.links=[... SiteGrPresentation.links,connectionObj];
                                        });
                                       }
                                 }                 
                    });
                                  
                                 }
                              else{
                              var SplitObjImagePath = SitesMapping.Items.Item["@imagepath"].split("\\\\");
                              var impath = "../img/SizingEngine/"+ SplitObjImagePath[1].replace(/\\/g, "/");
                              let    RackItemClick;
                              SiteGrPresentation.categories.map(function(item,id){
                                 if(item["label"] ==="Rack")
                                   {
                                      RackItemClick  =this.InnerViewSec ;
                                   }else{
                                        RackItemClick=(e)=>this.openServerActiveTab(item["@name"],item["@description"]);
                                      }
                                    if(item["label"] == SitesMapping.Items.Item["@Type"]){
                                     var  SynergyHeight;
                                      var Synergywidth;
                                        if(SitesMapping.Items.Item["@Type"]=="Server"){
                                        if( SitesMapping.Items.Item["@description"].indexOf('Synergy')>-1){
                                             if(SitesMapping.Items.Item["@description"] =="HPE CS750 Synergy 3.0 VMw Kit ( Q8A80A )"){
                                                      SynergyHeight="500px"
                                                     Synergywidth= '150px'
                                                 }else{
                                                     SynergyHeight="150px"
                                                     Synergywidth='49px'
                                                 }
                                               }
                                        }else if(SitesMapping.Items.Item["@Type"] =="Storage"){
                                             if( SitesMapping.Items.Item["@description"].indexOf("1 x 20800")>-1){
                                                     SynergyHeight="170px"
                                                     Synergywidth= '70px'
                                               }
                                        }else if(SitesMapping.Items.Item["@Type"] =="BladeEnclosure"){
                                             if(SitesMapping.Items.Item["@description"].indexOf("Synergy 12000")>-1){
                                                  SynergyHeight="100px"
                                                     Synergywidth= '110px'
                                             }                                                        
                                        }else{

                                        }
                                         var HoverText =SitesMapping.Items.Item["@name"];
                                    var ItemObj={"id": SitesMapping.Items.Item["@id"] , "label":SitesMapping.Items.Item["@description"],"node": <Box data-tip={HoverText}  onClick={RackItemClick} className="DisplayImages" colorIndex="light-1" pad='none'><Image style={{height:SynergyHeight,width:Synergywidth}} src={impath} id={SitesMapping.Items.Item["@id"] + SitesMapping.Items.Item["@name"]} size="small" caption={SitesMapping.Items.Item["@description"]} /> </Box>}
                                    item.items =[...item.items,ItemObj];
                                   }                          
                        }.bind(this)); 
                   }
                    
                  

        if(this.state.RackservHover){
         RackServersandEnclosureHover =   this.state.TitleDisplay ? <Box margin="none" pad="none" style={HoverTitleStyle}  className="CheckSvgConnection">{this.state.ServerItemName}</Box>:<Box></Box>
          }else{
            RackServersandEnclosureHover="";  
          }
         if(!this.props.StaticGRlist){  
              SitesListMenu ='';    
           }


            FinalRender = <Box direction='row' margin="none" pad="none"  className="GrTabSection" justify='start' align='center'style={{height:'100%',width:'100%'}}>
                             <ReactTooltip />
                         <Box    margin="none" pad="none" justify='start' align='start'  basis="1/4" separator="right" style={{height:'100%',width:'100%'}}>                  
                          <Box  direction="row" justify='start'  margin="none" pad="none" justify='start' align='start'>   
                                <Button  data-tip="Print"  icon={<Print size="small" colorIndex="accent-3"   />}  primary={false}  onClick={this.PrintImage} />
                                <Button   data-tip="Save Image" icon={<Save size="small" colorIndex="accent-3"  />}   primary={false} onClick={this.ImageConvertion} />                                       
                        </Box>
                        <Box  className="SolutionConfigAccordian"justify='start'  margin="none" pad="none" justify='start' align='start'>   
                          {/*  <ConfigureSolutionDetails MapContent={this.state.GrInputData.GraphicalInput.Items} ref="child"/>  */}
                           <ConfigureSolutionDetails MapContent={this.state.ConfigureSolutionData} ref="child"/>
                                   
                        </Box>
                </Box>
                    <Box  className="HrSecPres"  margin="none" pad="small" justify='start' align='start' basis="3/4">
                        <Box direction="row">
                            <Menu responsive={false} inline={true} direction='row' className="SitesMenu" style={{lineHeight:'24px'}}>
                           {SitesListMenu}
                            </Menu>
                        </Box>
                        <Box  direction='row' margin="none" pad="small" justify='start' align='start' style={{height:'100%',width:'100%',overflow:'auto'}} >        
                            <Box  id="GrRackServers" margin="none" align='start' pad="none" style={{height:'120%',width:'100%'}}>
                               <Box justify="center" pad="small" style={{width:'100%'}}>
                                <Heading tag="h5" strong="true"  colorIndex="brand" style={{color:'#01a982',marginLeft:'23%'}}> Graphical Representation </Heading>
                               </Box>
                              
                                <Map  vertical={true} data={SiteGrPresentation}  className="GrMap" style={{width:'100%'}}/>             
                               {RackServersandEnclosureHover}
                            </Box>
                        </Box>
            </Box>
        </Box> 
       
                    }
     
        return(
            <Box direction='row' margin="none" pad="none"  style={{height:'100%',width:'100%'}}>
        
            {FinalRender}
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
export default connect(mapStateToProps,mapDispatchToProps) (GrRackServerPresentation);
