import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import {connect} from 'react-redux';
import { saveSolution, SaveCurrentSession, changeSession, updateSession, 
         EPAActvSolnChange, fetchMetricsData, fetchCompareSolution } from '../../State/actions/sessions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Heading from 'grommet/components/Heading';                                              
import Paragraph from 'grommet/components/Paragraph'; 
import TextInput from 'grommet/components/TextInput';                                             
import Table from 'grommet/components/Table';
import Layer from 'grommet/components/Layer';    
import TableRow from 'grommet/components/TableRow';
// import Image from 'grommet/components/Image';

import SaveSolutionIcon from 'grommet/components/icons/base/DocumentDownload';
import AddInfoIcon from 'grommet/components/icons/base/Link';
import ViewIcon from 'grommet/components/icons/base/Bundle'; 
import FormNextLink from 'grommet/components/icons/base/FormNextLink';
import CloseIcon from 'grommet/components/icons/base/Close';  
import RoleIcon from 'grommet/components/icons/base/StreetView';
import SolnIcon from 'grommet/components/icons/base/Info';
import MoneyIcon from 'grommet/components/icons/base/Money';
import ConfigIcon from 'grommet/components/icons/base/Troubleshoot';
import WarningIcon from 'grommet/components/icons/base/Alert';
import CircleInformation from 'grommet/components/icons/base/CircleInformation';
import Status from 'grommet/components/icons/Status';

import CustomArticle from './CustomArticle';
import RecomSoln from './Recom_Soln';
import BOM from './BOM';

import ConfigurationDetails from './ConfigurationDetails';
import GraphicalRepresentation from './GraphicalRepresentation';
import MetricsData from '../../SizerUI/SizerScreens/MetricsData';
import {said} from '../../AppConfig';
import $ from 'jquery';
import {serviceUrl} from '../../AppConfig';
let PreviousName = '';
let SolutionAlternativeTabsContent;
let CombineTotalPrice;
let CombineRack;
 let RolesList=[];
 var totalNumOfRows= [];
 var ComputeNodeArray=[];
 var TraditionalArray=[];
class SolnAlternative extends Component {
    
  constructor(props) {
    super(props);    
    this.state = { showSaveSolution: false, showDupSoLPopup: false, SessionName: '', CurrentSession: {}, 
                   SolutionObj: '', RoleObj: '', RoleItems: '', SharedRoleObj: '', SharedRoleItems: '',
                   activeTab: 0, ServQty: 0, HomePageJson: [], AdditionalInfoPop: false ,
                   GRPresent: false, GRPresentStatic:false, MetricsDataPresent: false,
                   ActiveSoln: 'WDO Config',ActiveSolTabClass:'',
                   activeSoltab:0,ComapareSolState:false,compareSolutionTabactive:false,
                   SolutionItemsList:['WDO Config','Traditional','Compare Solution']
                 }
    this.GrClose = this.GrClose.bind(this);

    this.ClosePopup = this.ClosePopup.bind(this);    
    this.SessionTxtChange = this.SessionTxtChange.bind(this);
    this.SaveSolution = this.SaveSolution.bind(this);
    this.onSaveSolutionSubmit = this.onSaveSolutionSubmit.bind(this);
    this.onSaveSolutionIconClick = this.onSaveSolutionIconClick.bind(this);
    this.Submit_Update_Session = this.Submit_Update_Session.bind(this);
    this.OverrideSolMsgYesClick = this.OverrideSolMsgYesClick.bind(this);
    this.OverrideSolMsgNoClick = this.OverrideSolMsgNoClick.bind(this);
    this.MetricsDataBtnClick = this.MetricsDataBtnClick.bind(this);  
    this.MetricsDataClose = this.MetricsDataClose.bind(this);
    this.GrPresentation = this.GrPresentation.bind(this);
    this.GrPresentationStatic = this.GrPresentationStatic.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);
    this.updateSolutionTreeView = this.updateSolutionTreeView.bind(this);
    this.SelectActiveSolutionTab=this.SelectActiveSolutionTab.bind(this);
    this.CompareSolution=this.CompareSolution.bind(this);
  }

SelectActiveSolutionTab(val,id){

   this.state.activeSoltab=id;
  if(id<2){
     this.state.activeTab=0;
     this.props.onEPAActvSolnChange({ "actvItem": val });
    this.setState({ActiveSoln: val })
   RolesList=[];
    totalNumOfRows= [];
    ComputeNodeArray=[];
    TraditionalArray=[];
//  this.state.activeSoltab=id;
  this.state.ComapareSolState=false;
  //  this.updateSolutionTreeView(this.props.activeSession.EPAArray[id].treeView.Solutions); 
    this.props.activeSession.MultipleSolActiveTab = val;
  }else{
    this.CompareSolution();
  }
   
}

CompareSolution(){

     var currencySign =this.props.activeSession.CompareSolution.Solutions["@Currency"]
    CombineTotalPrice = this.props.activeSession.CompareSolution.Solutions.Solution.map(function(val){
      return(<td>{currencySign + " " +val["TotalPrice"]}</td>);
     });
   CombineRack=this.props.activeSession.CompareSolution.Solutions.Solution.map(function(val){
      return(<td>{ val.RackSelected["@CompDesc"]}</td>);
     });
         this.props.activeSession.CompareSolution.Solutions.Solution[0].Roles.Role.map(function(val){
             ComputeNodeArray.push(
             {"Role Name":  val["RoleName"]},
             {"Server Name":val.ServerName["@Qty"] + " X " +val.ServerName["#text"]},
             {"Processor":  val["ProcessorDetails"]},
             {"Memory":val["Memory"]},
             {"Storage":val.DAS.TableData["VolumeName"] + " - " +val.DAS.TableData["Disk"]}
             );
             
          });
           this.props.activeSession.CompareSolution.Solutions.Solution[1].Roles.Role.map(function(val){
            TraditionalArray.push(
             {"Role Name":  val["RoleName"]},
             {"Server Name":val.ServerName["@Qty"] + " X " +val.ServerName["#text"]},
             {"Processor":  val["ProcessorDetails"]},
             {"Memory":val["Memory"]},
            {"Storage":val.DAS.TableData["VolumeName"] + " - " +val.DAS.TableData["Disk"]}
             );
  
         });
        var x = this.props.activeSession.CompareSolution.Solutions.Solution[0].Roles.Role.length;
        var y = this.props.activeSession.CompareSolution.Solutions.Solution[1].Roles.Role.length;
  
            if(x > y){
            totalNumOfRows.length=x * 5;
            }else{
             totalNumOfRows.length=y * 5;
            }
      var RoleItems=["Role Name","Server Name","Processor","Memory","Storage"];
      var tablerow=[];
      var countRole=0;
        for(var i=0;i<totalNumOfRows.length;i++){  
              var TraditionalValue;
              var ComputeValue;
              if(i>=TraditionalArray.length){   
                    TraditionalValue="";
              }else{
                 TraditionalValue =TraditionalArray[i][RoleItems[countRole]];
              }      
               if(i>=ComputeNodeArray.length){
                  ComputeValue="";
              }else{
                 ComputeValue =ComputeNodeArray[i][RoleItems[countRole]];
              }

               RolesList.push ( <TableRow>          
                   <td >{RoleItems[countRole]}</td>
                   <td >{ComputeValue}</td>
                   <td >{TraditionalValue}</td>
                </TableRow>
                );
           countRole++;     
           if( countRole==5){
               countRole=0;
           }

        }

  this.setState({ComapareSolState:true});
}


  downloadFiles(fileType){
    var sessionObject =  this.props.activeSession.id;             
      
            var mapForm = document.createElement("form");            
            mapForm.id = "FormExportBOM";
            mapForm.setAttribute("method","GET")
            mapForm.setAttribute("action", serviceUrl+"SizingEngine/GenerateOCADocument");

            mapForm.target = "_blank";

            var mapInput1 = document.createElement("input");
            mapInput1.id = "BomHTMLTemp1";
            mapInput1.type = "text";
            mapInput1.name = "format";
            mapInput1.value = fileType;
            mapForm.appendChild(mapInput1);

            var mapInput = document.createElement("input");
            mapInput.id = "BomHTMLTemp";
            mapInput.type = "text";
            mapInput.name = "sessionId";
            mapInput.value = sessionObject.toString();
            mapForm.appendChild(mapInput);

            var mapInput2 = document.createElement("input");
            mapInput2.id = "BomHTMLTemp";
            mapInput2.type = "text";
            mapInput2.name = "said";
            mapInput2.value = 'Sap Hana Sizing Tool';
            mapForm.appendChild(mapInput2);

            var mapInput3 = document.createElement("input");
            mapInput3.id = "BomHTMLTemp";
            mapInput3.type = "text";
            mapInput3.name = "version";
            mapInput3.value = "18.0.0";
            mapForm.appendChild(mapInput3);

            
            document.body.appendChild(mapForm);
            mapForm.submit();
             $("#FormExportBOM").remove(); 
          
       
  }

  componentDidMount(){
    
    // if( this.props.DefaultInputs.Sizers.Sizer['@name'] === 'SAP HANA Sizing Tool'){
    //     if( this.props.activeSession.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] === '' ||
    //       this.props.activeSession.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] === null ){
    //       this.props.activeSession.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] = '';
    //     }
    // }

    this.props.onFetchMetricsData();
    this.props.onFetchCompareSolution({'SessionID': this.props.activeSession.id});
    this.state.CurrentSession = this.props.activeSession;
    this.state.SessionName = this.props.activeSession.alias;

    if(this.props.activeSession.treeView !== ''){       
        this.state.HomePageJson = this.props.DefaultInputs;
        this.updateSolutionTreeView(this.props.activeSession.treeView.Solutions); 
    }
  }

  updateSolutionTreeView(SolTreeView){
    this.state.SolutionObj = SolTreeView;
      // this.state.SolutionObj = CSVirtSoln;
      this.state.RoleObj = {};
      this.state.SharedRoleObj = {};
      this.state.RoleItems = this.state.SolutionObj.Solution.Roles.Role;
      this.state.SharedRoleItems = this.state.SolutionObj.Solution.Roles.SharedRole;

      let ServQty = 0;
      if ( Array.isArray(this.state.RoleItems) ) {
          this.state.RoleItems.map((roleitem, index) => {
            if(roleitem['@DisplayName'] === undefined || roleitem['@DisplayName'] === ''){
              this.state.RoleObj[ roleitem['RoleName'] ] = roleitem;
              if(roleitem['RoleName'] !== 'HPE ConvergedSystem'){
                if(roleitem['ServerName'] !== undefined && roleitem['ServerName'] !== null){
                  ServQty += parseInt(roleitem['ServerName']['@Qty'], 10);
                }
              }
            }else{
              this.state.RoleObj[ roleitem['@DisplayName'] ] = roleitem;
              if(roleitem['@DisplayName'] !== 'HPE ConvergedSystem'){
                if(roleitem['ServerName'] !== undefined && roleitem['ServerName'] !== null){
                  ServQty += parseInt(roleitem['ServerName']['@Qty'], 10);
                }
              }
            }
          });
      }else{
          if(this.state.RoleItems['@DisplayName'] === undefined || this.state.RoleItems['@DisplayName'] === ''){
            this.state.RoleObj[ this.state.RoleItems.RoleName ] = this.state.RoleItems;
            if(this.state.RoleItems['RoleName'] !== 'HPE ConvergedSystem'){
              if(this.state.RoleItems.ServerName !== undefined && this.state.RoleItems.ServerName !== null){
                ServQty += parseInt(this.state.RoleItems.ServerName['@Qty'], 10);
              }
            }
          }else{
            this.state.RoleObj[ this.state.RoleItems['@DisplayName'] ] = this.state.RoleItems;
            if(this.state.RoleItems['@DisplayName'] !== 'HPE ConvergedSystem'){
              if(this.state.RoleItems.ServerName !== undefined && this.state.RoleItems.ServerName !== null){
                ServQty += parseInt(this.state.RoleItems.ServerName['@Qty'], 10);
              }
            }
          }
      }

      if (this.state.SharedRoleItems !== undefined){
        // if ( Array.isArray(this.state.SharedRoleItems) ) {
        //     this.state.SharedRoleItems.map((sharedroleitem, index) => {
        //       if(sharedroleitem['@DisplayName'] === undefined || sharedroleitem['@DisplayName'] === ''){
        //         this.state.SharedRoleObj[ sharedroleitem['RoleName'] ] = sharedroleitem;
        //       }else{
        //         this.state.SharedRoleObj[ sharedroleitem['@DisplayName'] ] = sharedroleitem;
        //       }
        //     });
        // }else{
            if(this.state.SharedRoleItems['@DisplayName'] === undefined || this.state.SharedRoleItems['@DisplayName'] === ''){
              this.state.SharedRoleObj[ this.state.SharedRoleItems['RoleName'] ] = this.state.SharedRoleItems;
            }else{
              this.state.SharedRoleObj[ this.state.SharedRoleItems['@DisplayName'] ] = this.state.SharedRoleItems;
            }
        // }
      }
      
      this.setState({ServQty: ServQty});
  }
    
  componentWillReceiveProps(nextProps, nextState){
   
   if(nextProps.activeSession.treeView !==undefined){
    if(nextProps.activeSession.treeView !== ''){
       
        if( nextProps.activeSession.treeView !== this.props.activeSession.treeView){          
            this.updateSolutionTreeView(nextProps.activeSession.treeView.Solutions);
        }
    }

    if(nextProps.OverrideSolMsg.isEnabled){
       this.state.showSaveSolution = true;
       this.state.showDupSoLPopup = true;
     }else{
       //this.state.showSaveSolution = false;
       this.state.showDupSoLPopup = false;
     }

     if(nextProps.toastNotification.isEnabled){
       this.state.showSaveSolution = false;
     }
   }

  }
  
  AdditionalInfo(){
    this.setState({ AdditionalInfoPop: true });
  }
  GrPresentationStatic(){
          this.state.GRPresentStatic=true;
        this.setState({GRPresent:true,});
  }
  GrPresentation(a){
     this.state.GRPresentStatic=false;
    this.setState({GRPresent:true});
  }
  MetricsDataBtnClick(){
    this.setState({ MetricsDataPresent: true });
  }
  MetricsDataClose(){
    this.setState({ MetricsDataPresent: false });  
  }
  ClosePopup(){
    this.setState({showSaveSolution: false });
    this.props.onDisableconflicts();
  }
  GrClose(){
    this.setState({GRPresent:false,GRPresentStatic:false});  
  }

  SessionTxtChange(e){  
    if(e.target.value.length <= 25){
      this.setState({ SessionName: e.target.value });
    }
  }
  Submit_Update_Session(){
    if(this.state.SessionName.trim() !== ''){          
        this.state.CurrentSession.alias = this.state.SessionName;
        this.props.onSaveCurrentSession();
        this.props.onUpdateSession(this.state.CurrentSession);
        if(this.props.activeSession.id === this.state.CurrentSession.id)
        {
          this.props.onChangeSession(this.props.activeSession.id);
        }
        this.setState({ showSaveSolution: false });
    }
  }
  onSaveSolutionIconClick(){
      // PreviousName = this.props.activeSession.alias;
      this.setState({showSaveSolution: true, SessionName: this.props.activeSession.alias});
  }
  onSaveSolutionSubmit(){
      // this.state.CurrentSession = this.props.activeSession;
      // this.Submit_Update_Session();
      if(this.state.SessionName.trim() !== '' && this.state.SessionName !== null ){
        var initialCheck = false;      
        this.SaveSolution(initialCheck);
      }
  }
  SaveSolution(overrideParam){                 
      var sessionObject = {
                  "UserId": "Madhukar",
                  // "UserId": this.props.UserID,
                  "SizerId": "SAPHANA",
                  "SessionID": this.props.activeSession.id,
                  "Alias": this.state.SessionName,
                  "Override": overrideParam,                  
                  "ParentAlias": ''
                  // "ParentAlias": PreviousName
                };                            
      this.props.onSaveSolution(sessionObject);
  } 
  OverrideSolMsgYesClick(){
    this.SaveSolution(true); 
    this.state.showSaveSolution = false;
    PreviousName = '';
    this.setState({ showDupSoLPopup: false });
  }
  OverrideSolMsgNoClick(){
    this.props.onDisableconflicts();
    this.setState({ showDupSoLPopup: false });
  }
  ChangeActvSoln(actvitem){
    this.props.onEPAActvSolnChange({ "actvItem": actvitem });
    this.setState({ActiveSoln: actvitem })
  }

  render() {
        
    let SolutionCost = '';
    let PriceListDetails = '';
    let MultipleSolutionTabs='';
    if(this.props.activeSession.EPAArray !==undefined && this.props.activeSession.EPAArray !==""){    
       if(this.props.activeSession.EPAArray.length>1){
          MultipleSolutionTabs=  this.state.SolutionItemsList.map((val,id)=>{                        
                                  if(this.state.activeSoltab == id){
                                      this.state.ActiveSolTabClass="MultipleSolTabsClass";
                               }else{
                                      this.state.ActiveSolTabClass="";
                               }
                              return(  <Anchor  primary={false} label={val} plain={true}  id={id} className={this.state.ActiveSolTabClass} onClick={(e)=>this.SelectActiveSolutionTab(val,id)} style={{padding:'3.6px',position:'absolute',left:id*137+'px',textDecoration:'none',fontSize:'18px'}}></Anchor> );
                           })   
       }else{
         MultipleSolutionTabs='';
       }      
    };

    
    if(this.state.SolutionObj !== ''){
       SolutionCost = this.state.SolutionObj.Solution.SolPrice;
       PriceListDetails = this.state.SolutionObj['@PriceList'].split(' ')[0]+" Internet Price [ "+this.state.SolutionObj['@Country']+" ]";    
    }
    
    // let SolutionCost = this.state.SolutionObj.Solution.SolPrice;
    // let PriceListDetails = this.state.SolutionObj['@PriceList'].split(' ')[0]+" Internet Price [ "+this.state.SolutionObj['@Country']+" ]";
    let AdditionalInformation = '';
    let AdditionalList = '';
    var prompt = '';
    let showSaveSolutionContent = null;   
    let showDupNameContent = null;
    let OCAPopupContent = '';

    if(this.state.showSaveSolution){
          showSaveSolutionContent = <Layer className="solutionPopup">
                                <Box margin='none' pad='none' size='medium' justify='between' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <Heading tag="h4" strong={false} >Please name your solution</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ this.ClosePopup } >
                                              <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                          </Box>
                                    </Box>
                                    <Box direction="row" margin="none" pad="small" justify="start" style={{width:'100%'}}>
                                      <TextInput value={this.state.SessionName} style={{width:'80%'}} 
                                                 placeHolder='Session Name'
                                                 onDOMChange={ this.SessionTxtChange } />
                                      { this.state.SessionName === '' || this.state.SessionName.trim() === '' ?
                                          <Button primary={true} icon={<FormNextLink size='small' />} /> 
                                        :
                                          <Button primary={true} icon={<FormNextLink size='small' />}
                                                  onClick={ this.onSaveSolutionSubmit } />
                                      }
                                    </Box>
                                </Box>
                           </Layer>
    }else{
          showSaveSolutionContent = ""
    }

    if(this.props.OverrideSolMsg.isEnabled && this.state.showDupSoLPopup){
          showDupNameContent = 
                      <Layer className="WarningPopup">
                                <Box margin='none' pad='none' size='medium' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <WarningIcon size='small' colorIndex='warning' />
                                              <Heading tag="h4" strong={false} >Please Confirm</Heading>
                                          </Box>
                                    </Box>
                                    <Box margin="none" pad="small">
                                         <Heading tag='h6' strong={false} margin='none'>
                                           {this.props.OverrideSolMsg.msg}
                                         </Heading>
                                    </Box>
                                    <Box direction='row' justify='end' margin='none' pad='small'>
                                        <Button label='Yes' className="SessionOutBtns" onClick={ this.OverrideSolMsgYesClick } />
                                        <Button label='No'  className="SessionOutBtns" critical={true} onClick={this.OverrideSolMsgNoClick} />
                                    </Box>
                                </Box>
                      </Layer>
    }else{
       showDupNameContent = '';
    }

    if( window.location.pathname.match("/SolnAlternative")){
        prompt = <Prompt when={false}
                        message={location => (
                        `Solution will be lost, do you still want to continue ?`
                        )}
        />
    }else{
         prompt = <Prompt when={false}
                        message={location => (
                        `Solution will be lost, do you still want to continue ?`
                        )}
        />;
    }
    
    if(this.state.OCAPopup){
      OCAPopupContent = <Layer closer={false} overlayClose={true} >
                        <Box margin="none" pad="none" size='medium'>
                             <Box direction="row" colorIndex='neutral-1' margin="none" pad="small" separator="bottom">
                                  <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                       <CircleInformation colorIndex='accent-1-t' size='small' />
                                       <Heading tag="h4"strong={false} style={{marginBottom:'0px'}}>Please select</Heading>
                                  </Box>
                                  <Box direction="row" margin="none" pad="none" align='start' alignContent="start" 
                                       onClick={ () => this.setState({ OCAPopup: false }) } >
                                       <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                  </Box> 
                             </Box> 
                             
                             <Box style={{margin:'12px 0px 12px 12px'}} pad={{between: 'small'}} >     
                                  <Anchor primary={true} onClick={ () => this.downloadFiles('xml') }>Download an XML file</Anchor>                                                                                                
                                  <Box direction="column" margin="none" pad={{between: 'small'}} separator="top"  > 
                                  <Anchor style={{margin:'5px 0px 0px 0px'}} primary={true} onClick={ () => this.downloadFiles('xls') }>Download an Excel file</Anchor>                                  
                                      <Paragraph margin='none'>Please perform Save As for the downloaded file in excel application before uploading to OCA Tool, if excel is your choice. </Paragraph> 
                                  </Box>
                                    
                             </Box>  
                        </Box>
              </Layer>
     }else{
      OCAPopupContent = '';
    }


    if(this.state.AdditionalInfoPop){
      AdditionalList = this.state.HomePageJson.Sizers.Sizer.AdditionalInformation.Doc.map(function(val,id){
                                    //  <td> {val["Name"]}  </td>
                              return(    
                                  <TableRow key={id} >
                                       <td className='secondary'> <a href={val["Url"]} target="_blank"> {val["Name"]} </a> </td>
                                   </TableRow>                                                  
                           );
      });
      AdditionalInformation = <Layer className="AdditionalInflolayer" style={{width:'50%',height:'50%'}}>                                                
                                <Box direction="column" margin="none" pad="none">
                                    <Box direction="row" colorIndex='neutral-1' margin="none" pad="small" separator="bottom">
                                          <Box direction="row" margin="none" pad="none" align='start' style={{width:'96%'}}>
                                               <Heading tag="h4" strong={true} style={{marginBottom:'0px',color:'#01a982'}}>Additional Information</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={() => {this.setState({ AdditionalInfoPop: false}) }} >
                                               <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                          </Box>
                                    </Box>
                                    <Box margin="none" pad="small">
                                            <Heading tag="h6" strong={true} style={{margin:'4px 0px'}}>Learn More</Heading>                                    
                                            <Paragraph style={{margin:'2px 0px', maxWidth:'100%'}}>{ this.state.HomePageJson.Sizers.Sizer.AdditionalInformation["@Text"]}</Paragraph>                                                                                      
                                            <Table style={{margin:'4px 0px', overflow:'initial'}} selectable={false}>   
                                                <tbody>
                                                  {AdditionalList}                                                 
                                                </tbody>
                                            </Table>                                                                                                                       
                                    </Box>     
                                </Box>                            
                              </Layer>
    }else{
      AdditionalInformation = "";
      AdditionalList = '';
    }
    
    let RoleObjContent = null;
    if(this.state.RoleObj !== '' ) {
     // var roleObj = this.state.RoleObj;
          RoleObjContent =  Object.keys(this.state.RoleObj).map(function (key, index) {

                if( this.state.RoleObj[key].ServerName === undefined ){
                   return ( <Box pad={{between: 'small'}} margin='none' justify='between' >
                                <Box direction='row' pad={{between:'small'}} colorIndex='light-2' style={{padding:'5px'}} >
                                  <RoleIcon size='small' colorIndex='#69506f' />
                                  <Heading tag='h4' strong={true} margin='none' style={{fontSize:'17px'}}>{key}</Heading>
                                </Box>
                            </Box>
                   )
                }else{
                   return ( <Box pad={{between: 'small'}} margin='none' justify='between' >
                                <CustomArticle key={index}
                                    ArticleBackgroundColor='light-2'
                                    ContentBackgroundColor='light-1'
                                    title={key}
                                    titleIcon={<RoleIcon size='small' colorIndex='#69506f' />}
                                    content={<RecomSoln RoleData={this.state.RoleObj[key]} />} />
                            </Box>
                   )
                }
            }.bind(this))
    }
    
    let SharedRoleObjContent = null;
    if(this.state.SharedRoleObj !== '' ) {
          SharedRoleObjContent = <Box pad={{between: 'small'}} margin='none' justify='between' >
            { Object.keys(this.state.SharedRoleObj).map(function (key, index) {
                   return (
                                <CustomArticle key={index}
                                     ArticleBackgroundColor='light-2'
                                     ContentBackgroundColor='light-1'
                                     title={key}
                                     titleIcon={<RoleIcon size='small' colorIndex='#69506f' />}
                                     content={<RecomSoln RoleData={this.state.SharedRoleObj[key]} />} />
                                     // content='blaaah!!!' />
                   )
            }.bind(this)) }
          </Box>
    }              
    if(this.state.ComapareSolState){
     SolutionAlternativeTabsContent= <Box margin="small" pad="small"  className="CompareSolutionTable">
        <Table >
            <thead>
              <tr>
                <th> Details</th>
                <th>WDO Config </th>
                <th>Traditional</th>
              </tr>
            </thead>
            <tbody>
              <TableRow>
                <td>Total Price</td>
                {CombineTotalPrice}
                </TableRow>
                <TableRow>
                  <td>Rack</td>
                {CombineRack}
                </TableRow>            
                {RolesList}             
                </tbody>
        </Table>
     
      <Box direction='row' justify='start' align='center'wrap={true}>
      <Button label='Export to Excel' />
      </Box>
     </Box>
    }else{
      SolutionAlternativeTabsContent =
              <Box margin="none" pad="none">
               <Box justify='between' direction='row' className="SolAlternativeHeadingsec">
                          <Heading tag='h4' style={{color:'#01a982',marginTop:'13px', fontSize: '19px'}} strong={true} margin='none' >Solution Summary</Heading>
                          <Box direction='row' justify='between' margin='none' pad={{between: 'small'}} className="SolAlterNativeGrpBtns">
                              <Button primary={false} plain={true} icon={<SaveSolutionIcon size="small" colorIndex='accent-3'/>} label='Save Solution' onClick={ this.onSaveSolutionIconClick }/>
                              <Button primary={false} plain={true} icon={<ViewIcon size="small" colorIndex='accent-3'/>} onClick={this.MetricsDataBtnClick.bind(this)} label='Metrics Data' />
                              {said ==='SAPHANA' ? <Button primary={false} plain={true} icon={<AddInfoIcon size="small" colorIndex='accent-3'/>} onClick={this.AdditionalInfo.bind(this)} label='Additional Information' /> : null}
                              <Button primary={false} plain={true} icon={<ViewIcon size="small" colorIndex='accent-3'/>} onClick={this.GrPresentation.bind(this)} label='Graphical View' />
                          </Box>
                      </Box>
                      <Box margin='none' className="SolalternativeTabsecs" pad="none" style={{height:'95%'}}>
                        <Tabs className="Tabsec"
                            style={{width: '100%',margin: '0px 0' }}
                            activeIndex={this.state.activeTab}
                            onActive={i => this.setState({activeTab: i}) }
                            justify='start' responsive={true} >
                          <Tab title={<Box direction='row' margin='none' pad={{between: 'small'}} >
                                          <SolnIcon size='small' />
                                          <Heading tag='h4' margin='none' >Solution Recommended</Heading>
                                      </Box>} >                
                              <Box margin="none" pad="none" direction ='row' style={{margin: '5px 0px'}}>                      
                                  <Anchor primary={false} label='Convert to OCA' plain={true} 
                                          onClick={ () => this.setState({ OCAPopup: true }) } />            
                                  <Anchor primary={false} label='Start OCA' style={{marginLeft: '15px'}} plain={true} onClick={()=>{window.open("https://hpe.sharepoint.com/sites/B1/EG/so/eCPQ/CPQProcess/OCA/Pages/OCA.aspx")}}/>
                              </Box>
                              <Box pad={{between: 'small'}} margin='none' style={{height: '100%'}} >
                                <Box direction='row' justify='between' pad='none' style={{marginTop: '12px'}} >
                                  <Box direction='row' pad={{'between': 'small'}}>
                                    <Heading tag='h5' margin='none' >Total Server Count :</Heading>
                                    <Heading tag='h5' strong={true} margin='none' >{this.state.ServQty}</Heading>
                                  </Box>
                                  <Box direction='row' pad={{'between': 'small'}}>
                                    <Heading tag='h5' margin='none' >Solution Cost :</Heading>
                                    {this.state.SolutionObj["@Currency"] === 'UD' ? 
                                        <Heading tag='h5' strong={true} margin='none' >{'$ ' + SolutionCost}</Heading>
                                    :
                                        <Heading tag='h5' strong={true} margin='none' >{this.state.SolutionObj["@Currency"] + " " + SolutionCost}</Heading>
                                    }
                                  </Box>
                                  <Heading tag='h5' margin='none' >{PriceListDetails} </Heading>
                                </Box>
                                <Heading tag='h5' margin='none' style={{color: 'red'}} >
                                  Note: The price above is the standard worldwide list price. It reflects only the hardware required for your solution but not any partner or customer discounts. Additional services are required for your HANA solution to run.
                                </Heading>
                                
                                { /* Normal RoleObj Content */}
                                { RoleObjContent }

                                { /* SharedRoleObj Content */}
                                { SharedRoleObjContent }
                                
                              </Box>
                          </Tab>
                          <Tab title={<Box direction='row' margin='none' pad={{between: 'small'}} >
                                          <MoneyIcon size='small' />
                                          <Heading tag='h4' margin='none' >BOM details</Heading>
                                      </Box>}>
                              <Box margin='none' pad='none' align='center' justify='between' >
                                  <BOM actvSoln={this.state.ActiveSoln}/>
                              </Box>
                          </Tab>
                          <Tab title={<Box direction='row' margin='none' pad={{between: 'small'}} >
                                          <ConfigIcon size='small' />
                                          <Heading tag='h4' margin='none' >Configuration details</Heading>
                                      </Box>}>
                              <Box margin='none' pad='none' align='center' justify='between' >

                                <ConfigurationDetails actvSoln={this.state.ActiveSoln} />
                              </Box>
                              </Tab>
                        </Tabs>
                      </Box>
                </Box>
    }
    var MutpleSolPresnt=[];
      if(this.props.activeSession.EPAArray.length){
        MutpleSolPresnt.push(
        <Box direction ='row'className="MultiPleSltTabs" margin="none" pad="none" style={{height: '35px',borderBottom:'1px solid #614767'}}>
            {MultipleSolutionTabs}        
        </Box>);
      }else{

      }
        

    return (
      <Box pad='none' margin='none' style={{width:'100%', minHeight:'270%',position:'relative',maxHeight:'370%', margin:'12px 24px 24px 24px'}}>
        { prompt }

        
        { AdditionalInformation }
        { OCAPopupContent }
        { showSaveSolutionContent }       
        { this.state.GRPresent ?
          <Layer className="GRPage" closer={true} flush={false}
                 onClose={this.GrClose} style={{zIndex:101}}>
                 <GraphicalRepresentation listItem={this.state.GRPresentStatic} actvSoln={this.state.ActiveSoln}/>
          </Layer>
        : null
     //   <Button primary={false} plain={true} icon={<ViewIcon size="small" colorIndex='accent-3'/>} label='GR Demo' onClick={this.GrPresentationStatic}/>  
                      
        }
        { this.state.MetricsDataPresent ?
          <Layer className="MetricsDataPage" closer={true} flush={false} 
                 onClose={this.MetricsDataClose} style={{zIndex:101}}>
                 <MetricsData />
          </Layer>
        : null
        // <Button primary={false} plain={true} icon={<ViewIcon size="small" colorIndex='accent-3'/>} label='GR Demo' onClick={this.GrPresentationStatic}/>                
        }
        
        { showDupNameContent }
         {MutpleSolPresnt}
               
          {SolutionAlternativeTabsContent}              
      </Box>
    );
  }
}

const mapStateToProps = (state) => {  
  return{
      allSessions:state.sessions.sessions,
      activeSession: state.sessions.activeSession,
      DefaultInputs: state.sessions.sessionDefaults.inputs,
      OverrideSolMsg: state.sessions.overrideSolMsg,
      toastNotification:state.sessions.notificationMsg,
      UserID: state.auth.userData.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {     
        onSaveSolution:(sessionID) =>{
          dispatch(saveSolution(sessionID));
        },
        onSaveCurrentSession:()=>{
          dispatch(SaveCurrentSession());
        },
        onUpdateSession:(session) => {
          dispatch(updateSession(session))
        },
        onChangeSession : (id) => {
          dispatch(changeSession(id));
        },
        onDisableconflicts:()=>{
          dispatch({type:'DISMISS_CONFLICTS'})
        },
        onFetchMetricsData: () => {
          dispatch(fetchMetricsData());
        },
        onFetchCompareSolution: (obj) => {
          dispatch(fetchCompareSolution(obj));
        },
        onEPAActvSolnChange: (obj) => {
          dispatch(EPAActvSolnChange(obj));
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SolnAlternative);

