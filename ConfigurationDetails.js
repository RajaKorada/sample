import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Paragraph from 'grommet/components/Paragraph';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import LinkNext from 'grommet/components/icons/base/LinkNext';
import Mail from 'grommet/components/icons/base/Mail';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import $ from 'jquery';
import TableHeader from 'grommet/components/TableHeader';
import renderHTML from 'react-render-html';
import html2canvas from 'html2canvas';
import  jsPDF from 'jspdf';
import { connect } from 'react-redux';
import {fetchConfigString} from '../../State/actions/sessions';
import {serviceUrl} from '../../AppConfig';
let TreevieeLevel1;
var StringX;
var StringY;
var StringZ;

class ConfigurationDetails extends Component{
  constructor(){
      super();
      this.state={         
      }
        this.onBomSavePdf=this.onBomSavePdf.bind(this);
        this.ObjectLoopingCommonfn=this.ObjectLoopingCommonfn.bind(this);
        this.exportConfig = this.exportConfig.bind(this);
  }

  componentDidMount(){
     if(this.props.activeSession.configView==''){
            if(this.props.actvSoln === undefined || this.props.actvSoln === null){
                var sessionObject = {"SessionID":this.props.activeSession.id };
                this.props.onFetchConfigString(sessionObject);
            }else{
                var sessionObject = {"SessionID":this.props.activeSession.id, "EPASolutionType": this.props.actvSoln };
                this.props.onFetchConfigString(sessionObject);
            }
     }
  }

  exportConfig(format)
  {
      var mapForm = document.createElement("form");
            
            mapForm.id = "FormExportBOM";

            mapForm.setAttribute("method","GET")
            mapForm.setAttribute("action", serviceUrl+"/SizingEngine/ConfigDoc");

            mapForm.target = "_blank";

            var mapInput1 = document.createElement("input");
            mapInput1.id = "BomHTMLTemp1";
            mapInput1.type = "text";
            mapInput1.name = "format";
            mapInput1.value = format.toString();
            mapForm.appendChild(mapInput1);

            var mapInput = document.createElement("input");
            mapInput.id = "BomHTMLTemp";
            mapInput.type = "text";
            mapInput.name = "sessionId";
            mapInput.value = this.props.activeSession.id.toString();

            mapForm.appendChild(mapInput);
            document.body.appendChild(mapForm);
             mapForm.submit();
             $("#FormExportBOM").remove();

  }

  onBomSavePdf(){
      html2canvas(document.querySelector("#ConfigureDetails")).then(canvas => {
     const imgData = canvas.toDataURL('image/png');
      var     doc;
       if(canvas.width > canvas.height){
             doc = new jsPDF('l', 'mm', [380, canvas.height]);
              doc.addImage(imgData, 'JPEG', 15, 15);
               }
           else{
             doc = new jsPDF('p', 'mm', [380, canvas.width]);
                doc.addImage(imgData, 'JPEG', 15, 15);
            
          }
         doc.save("ConfigurationDetails.pdf");


        //         var doc = new jsPDF({unit:'px'});
        //          doc.setFontSize(20);
        //         //  doc.text(10, 10, "Configuration Details");
        //          doc.addImage(imgData, 'JPEG', 15, 15, 400, 700);
        //         doc.save("ConfigurationDetails.pdf");

        });
    //   html2canvas(document.querySelector("#ConfigureDetails")).then(canvas => {
    //  const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'JPEG', 15, 20, 190, 300);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("Configuration Details.pdf");
    //   //  this.downloadPDF(canvas.toDataURL(), 'canvas.pdf');
    // });
 
}

 ObjectLoopingCommonfn(loopObject1){
                  TreevieeLevel1 = loopObject1.map(function(val,id){
                            
                            return(<ul>
                            <li><span>{val["RoleName"]}</span><ul>
                                <li><span>{val["Processor"]}</span><ul>
                                    <li><span>{val["Storage"]}</span></li>
                                    <li><span>Memory - (Per Server)</span></li>
                                    <li> <span>GB Storage</span></li>
                                </ul></li>
                            </ul></li>
                            </ul>)
                                    console.log(val);
                        });
}

    render(){
        var loopObject;
        var ObjectArray;
      if(this.props.activeSession.configView["configuration"] ==undefined ||this.props.activeSession.configView["configuration"]==''){
          StringX='',
          StringY='',
          StringZ=''
      }else{
           StringX=this.props.activeSession.configView["ConfigDatasize"];
           StringY= this.props.activeSession.configView["treeView"];
           StringZ= this.props.activeSession.configView["configuration"];
         
      }
       loopObject = this.props.activeSession.treeView.Solutions.Solution.Roles.Role;
               if( Array.isArray(loopObject)){
                   this.ObjectLoopingCommonfn(loopObject);
               }else{
                  ObjectArray=[];
                  ObjectArray.push(loopObject)
                    this.ObjectLoopingCommonfn(ObjectArray);
               } 

  


    //  StringY=this.props.activeSession.configView["treeView"];
        return(
              <Box id="ConfigureDetails" style={{width:'100%',position:'relative',marginTop:'27px'}} margin="none" pad="none" className="StringSection">             
                    
                        
                            {renderHTML(StringX)}
                            { /*<Heading tag="h4" strong={true} size='small' style={{marginTop:'25px',fontSize: '17px'}}>Solution Summary</Heading>*/}
                          { /* <ul className="treeViewItem">                            
                          <li>Solution Details {TreevieeLevel1}</li></ul> */}
                            {renderHTML(StringY)}
                            {renderHTML(StringZ)}                    
                               

                    <Box direction='row' margin="none" pad={{between:"small"}} className="StringSection " alignSelf="start" align="start" alignContent="start" style={{marginLeft:'1%',marginTop:'10px' ,marginBottom:'10px'}}>            
                        <Button primary={false} label='Save as PDF'  onClick={()=>this.exportConfig('pdf') }/>
                        <Button primary={false} label='Save as Word' onClick={()=>this.exportConfig('doc')} />
                         {/* <Button primary={false} label='Open in mail' />*/}
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
   onFetchConfigString:(sessionID) =>{
        dispatch(fetchConfigString(sessionID));
      },
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (ConfigurationDetails);
