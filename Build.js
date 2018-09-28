import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { validateWorkload,redirectPage, toggleSizeButton, SaveCurrentSession,addSession, changeSession, deleteSession, updateSession, errorValidataion, getSolution,saveWorkload } from '../../State/actions/sessions';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Button from 'grommet/components/Button';
import List from 'grommet/components/List';
import Heading from 'grommet/components/Heading';
import ListItem from 'grommet/components/ListItem';
import Layer from 'grommet/components/Layer';
import Menu from 'grommet/components/Menu';
import ReactTooltip from 'react-tooltip';
import Anchor from 'grommet/components/Anchor';
import Animate from 'grommet/components/Animate';
import Paragraph from 'grommet/components/Paragraph';
import TextInput from 'grommet/components/TextInput';
import Status from 'grommet/components/icons/Status';
//import Toast from 'grommet/components/Toast';
import Home from 'grommet/components/icons/base/Home';
import User from 'grommet/components/icons/base/User';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import Catalog from 'grommet/components/icons/base/Overview';
import TrashIcon from 'grommet/components/icons/base/FormTrash';
import ContractIcon from 'grommet/components/icons/base/Contract';
import CloseIcon from 'grommet/components/icons/base/Close';
import SaveIcon from 'grommet/components/icons/base/Save';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Magic from 'grommet/components/icons/base/Services';
import CaretPrevious from 'grommet/components/icons/base/CaretPrevious';
import CircleInformation from 'grommet/components/icons/base/CircleInformation';
import FormNextLink from 'grommet/components/icons/base/FormNextLink';
import FormEdit from 'grommet/components/icons/base/FormEdit';
//import FormClose from 'grommet/components/icons/base/FormClose';
import MenuIcon from 'grommet/components/icons/base/Menu';
import WarningIcon from 'grommet/components/icons/base/Alert';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import CustomFooter from './CustomFooter';

// import ContactInfo from '../SAPHANASizerScreens/ContactInfo';
// import EnvironmentDetails from '../SAPHANASizerScreens/EnvironmentDetails';
// import OtherEnvironmentDetails from '../SAPHANASizerScreens/OtherEnvironmentDetails';

//import Dummy_Workload from '../Datafiles/Dummy_Workload.json';

import SolnAlternative from './SolnAlternative';
//import {version,said,sizerType,sizerName,launcher,launcherClass} from '../../AppConfig';
import {said} from '../../AppConfig';
import $ from 'jquery';

import {interviewScreens} from '../../SizerScreens';

//var xx;
var NextBtnVisible = true;
var fromsoln = false;

function CreateGuid() {
   function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
   }
   return _p8().toUpperCase() + _p8().toUpperCase() + _p8().toUpperCase() + _p8().toUpperCase();
}

class Build extends Component {

  constructor(){
    super();
    this.state = {
      ShowRightLayer:false,
      showFooter: true,
      ShowProgressBar:false,
      showAddSession: false,
      showUpdateSession:false,
      showDelSession: false,
      showSaveWorkload: false,
      SessionName: {},
      SessionNameTxt: '',
      activeSession: 0,
      DelSession: '',
      ToggleMinimize:false,
      RouteObj: [],
      ErrorPopup: false,
      ErrorPopupMsg: '',
      RedirectPopup: false,
      RedirectMsg: '',
      showDupWLPopup: false,
      DupAvailable: '',
      TitleofSizer:'',
      isTryingToNavigate:false
    }
    this.goHome = this.goHome.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onFinish = this.onFinish.bind(this);
    // this.SetTimeoutFinish = this.SetTimeoutFinish.bind(this);
    this.RightNavLayer = this.RightNavLayer.bind(this);
    this.NextBtnVisible = this.NextBtnVisible.bind(this);
    this.ShowDelSession = this.ShowDelSession.bind(this);
    this.CloseDelSession = this.CloseDelSession.bind(this);
    this.SessionTxtChange = this.SessionTxtChange.bind(this);
    this.SaveWorkloadSubmit = this.SaveWorkloadSubmit.bind(this);
    this.onSaveWorkloadIconClick = this.onSaveWorkloadIconClick.bind(this);
    this.SaveWorkload = this.SaveWorkload.bind(this);
    this.AddUserClick = this.AddUserClick.bind(this);
    this.Submit_Add_Session = this.Submit_Add_Session.bind(this);
    this.Submit_Update_Session = this.Submit_Update_Session.bind(this);
    this.Submit_Change_Session = this.Submit_Change_Session.bind(this);
    this.Submit_Delete_Session = this.Submit_Delete_Session.bind(this);
    this.ToggleMinimize =this.ToggleMinimize.bind(this);
    this.onSolnLostPopupYes = this.onSolnLostPopupYes.bind(this);
    this.onSolnLostPopupClose = this.onSolnLostPopupClose.bind(this);

    this.OverrideMsgYesClick = this.OverrideMsgYesClick.bind(this);
    this.OverrideMsgNoClick = this.OverrideMsgNoClick.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.pushNext = this.pushNext.bind(this);
    //this.pushBack = this.pushBack.bind(this);
  }

  componentWillMount(){
    this.state.RouteObj = interviewScreens;
    // window.onpopstate = function (e) { window.history.forward(1); }
  }

  onBackButtonEvent(e){
    console.log('handling back button press');
    e.preventDefault();
    window.history.forward();
  }

  componentDidMount(){
   if(this.props.TitleCaption["SizerCaption"] !==undefined || this.props.TitleCaption["SizerCaption"] !==''){
              this.setState({TitleofSizer:this.props.TitleCaption["SizerCaption"]});
   }
   window.onpopstate = this.onBackButtonEvent;
  }

  componentWillReceiveProps(nextProps, nextState){

      
  if(this.state.isTryingToNavigate && this.props.validation.required)
  {
      if(nextProps.activeSession.globalError.isError){
        this.setState({ErrorPopup: true, ErrorPopupMsg: nextProps.activeSession.globalError.errorMsg,isTryingToNavigate:false});
        return;
      }
      else {
        this.setState({isTryingToNavigate:false});
        this.pushNext();
        return;
      }
  }
   


    if(nextProps.activeSession.id === ''){
      if(nextProps.allSessions.length > 0){
          this.props.onChangeSession(nextProps.allSessions[0].id);
          this.props.onNewSession(nextProps.allSessions[0].workload);              
          this.props.history.push(this.state.RouteObj[0]['path'])
           $('#footer').hide()
       }
        else{
           this.props.onNewSession(this.props.workloadTemplate);
           this.props.history.push('/Home');
           $('#footer').show()
      }
    }
    else{
        if( nextProps.activeSession.treeView !== ''){
          if( !window.location.pathname.match("/SolnAlternative")){
            this.props.history.push('/Build/SolnAlternative');
            $('#footer').show()
          }
        }else if( window.location.pathname.match("/SolnAlternative") && !fromsoln){
          this.props.history.push(this.state.RouteObj[0]['path']);
          $('#footer').hide()
        }else{

            if(nextProps.OverrideMsg.isEnabled){
                this.state.showDupWLPopup = true;
                this.state.showSaveWorkload = true;
            }else{
                // this.state.showSaveWorkload = false;
                this.state.showDupWLPopup = false;
            }

            if(nextProps.toastNotification.isEnabled){
               this.state.showSaveWorkload = false;
            }
        }
    }

    if(nextProps.Redirect.isEnabled){
      this.props.history.push(nextProps.Redirect.path);
      this.props.onRedirectPage(false, '');
    }
  }

  onSolnLostPopupYes(selLabel){
    this.state.RouteObj.map((route, id) => {
            if( route.label === selLabel ){
                this.props.history.push(route.path);
                // new addition
                fromsoln = true;
                this.props.activeSession.isSizeEnabled = false;
                this.props.activeSession.treeView = '';
                this.props.activeSession.bomView = '';
                this.props.activeSession.configView = '';
                this.props.activeSession.GRInput = '';
                this.props.activeSession.GRBomInput = '';
            }
          });
    this.props.onSaveCurrentSession();
    this.setState({ShowSolnLostMsg: false, NavSelection: '' });
  }

  onSolnLostPopupClose(){
    this.setState({ShowSolnLostMsg: false, NavSelection: '' });
  }

  onLeftNavSelection(e){
    $('#footer').hide()
    // console.log(e.target.id);
    if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
        if( window.location.pathname.match('/Build/SolnAlternative') ){
          //Show Solution will be lost msg
          this.setState({ShowSolnLostMsg: true, NavSelection: e.target.id });
        }else{
          // if(this.props.activeSession.workload.UserInputs.Environments.ProductionEnvironment.ProcessorSelected === 'Select Processor'){
          //   this.setState({ErrorPopup: true, ErrorPopupMsg: 'Please select the processor from the dropdown.' });
          //   this.props.history.push('/Build/EnvironmentDetails');
          // }else{
            this.state.RouteObj.map((route, id) => {
              if(route.label === e.target.id){
                  this.props.history.push(route.path);
                  // if( !window.location.pathname.match('/Build/SolnAlternative') ){
                  //   this.props.activeSession.treeView = '';
                  // }
              }
            });
          // }
        }
     }
  }

  onPrevClick(){
    var index;
    {this.state.RouteObj.map((route, id) => {
          if( window.location.pathname.match(route.path) ){
              index = id;
          }
        }
    )};
    // this.props.history.push(this.state.RouteObj[index-1].path);

    if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
      this.props.history.push(this.state.RouteObj[index-1].path);
    }
  }

pushNext()
{
 var index;
    {this.state.RouteObj.map((route, id) => {
          if( window.location.pathname.match(route.path) ){
              index = id;
          }
        }
    )};
    // if(this.state.RouteObj[index+1].isenabled){
    //   this.props.history.push(this.state.RouteObj[index+1].path);
    // }

    if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
      this.props.history.push(this.state.RouteObj[index+1].path);
    }
}

onNextClick(){
  
  if(!this.props.GlobalErr.isError && this.props.validation !== undefined && this.props.validation.required)
  {
    this.setState({isTryingToNavigate:true});
    this.props.onValidateWorkload(this.props.validation.url, this.props.sizerWorkLoad);
  }
  else{
   this.pushNext();
  }
}

  goHome(){
    // this.props.history.push('/Home');
    if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
      this.props.onUpdateActiveSession(this.props.sizerWorkLoad);
      this.props.onSaveCurrentSession();
      this.props.history.push('/Home');
      $('#footer').show()
    }
  }

  // SetTimeoutFinish(){
   //   this.setState({showFooter: false, ShowProgressBar:false, ShowRightLayer:false})
   //   clearInterval(xx);
   //   this.props.history.push('/Build/SolnAlternative');
  // }

  onFinish(){
    // this.setState({ShowProgressBar: false});
    // xx = setInterval( this.SetTimeoutFinish, 3000);
    this.state.ShowProgressBar = false;
    var workload = {
      "WorkLoad": {}
    };
    this.props.activeSession.workload = this.props.sizerWorkLoad;
    workload.WorkLoad = this.props.activeSession.workload;
    var obj = {
                "Workload":workload,
                "SessionID": this.props.activeSession.id,
                "UserId": "Madhukar",
                "SizerId":said,                 
                "Country":  this.props.country
              }
          //}
    // obj.data.workload.WorkLoad = this.props.activeSession.workload;
    // var x = JSON.stringify(obj).replace('"','\"');

    if(this.props.DefaultInputs['@name'] === 'SAP HANA Sizing Tool' ){
    //  var ProdEnv = this.props.activeSession.workload.UserInputs.Environments.ProductionEnvironment;
    var ProdEnv = this.props.sizerWorkLoad.UserInputs.Environments.ProductionEnvironment;
      if( ProdEnv['ProcessorSelected'] === 'Select Processor' ){
          this.setState({RedirectPopup: true, RedirectMsg: 'Sizing is not allowed. \nPlease check your configuration .'});
          return;
      }else{       
      }
    }
if(said === 'CS750VirtSizer')
    {
      if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
          this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
        }else{
          this.props.OnToggleSizeButton(false);
          obj.Workload = obj.Workload.WorkLoad;
          this.props.onGetSolution(obj);
        }
    }
    else{
 if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
          this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
        }else{
          this.props.OnToggleSizeButton(false);       
          this.props.onGetSolution(obj);
        }
    }
  }

  ShowDelSession(delItem){
    this.setState({ showDelSession: true, DelSession: delItem });
  }

  CloseDelSession(){
    this.setState({ DupAvailable: '', SessionNameTxt: '', showSaveWorkload: false, showDelSession: false, showAddSession: false, SessionName: {}, DelSession: '', showUpdateSession:false });
    this.props.onDisableconflicts();
  }

  Submit_Delete_Session(SessionID){
      if(this.props.GlobalErr !=='' && this.props.GlobalErr.isError){
        this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
      }else{

          this.props.onDeleteSession(SessionID);

          this.CloseDelSession();
      }
  }

  Submit_Change_Session(SessionID){
    
    
    if(this.props.GlobalErr !='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
      if(this.props.activeSession.id !== SessionID){
        
        var errorObj = { isError:false, errorMsg:''};
        this.props.updateError(errorObj);  
        this.props.onUpdateActiveSession(this.props.sizerWorkLoad);      
        this.props.onSaveCurrentSession();
        this.props.onChangeSession(SessionID);

        var workload = '';
        this.props.allSessions.map((value, index) => {
                        if(value.id === SessionID)
                           workload = value.workload;
                        })

        this.props.onNewSession(workload);
        // if(this.props.activeSession.treeView !== ''){
        //   this.props.history.push('/Build/SolnAlternative');
        // }else{
        //   this.props.history.push(this.state.RouteObj[0]['path']);
        // }
        fromsoln = false;
      }
    }
  }

  AddUserClick(){
    if(this.props.GlobalErr !='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
      this.setState({showAddSession: true, showUpdateSession: false, SessionNameTxt: ''});
    }
  }

  Submit_Add_Session(){
    if(this.state.SessionNameTxt.trim() !== ''){
        this.state.SessionName.alias = this.state.SessionNameTxt;
        this.props.onUpdateActiveSession(this.props.sizerWorkLoad);
        this.props.onSaveCurrentSession();
        this.props.onNewSession(this.props.workloadTemplate);
        this.props.onAddSession(CreateGuid(), this.state.SessionName.alias);
        this.props.history.push(this.state.RouteObj[0]['path']);
        this.setState({ showAddSession: false, showUpdateSession: false, showDelSession: false, SessionName: {}, DelSession: '' });
    }
  }

  Submit_Update_Session(){
    if(this.state.SessionNameTxt.trim() !== ''){
        this.state.SessionName.alias = this.state.SessionNameTxt;
        this.props.onUpdateActiveSession(this.props.sizerWorkLoad);
        this.props.onSaveCurrentSession();
        this.props.onUpdateSession(this.state.SessionName);
        if(this.props.activeSession.id === this.state.SessionName.id)
        {
          this.props.onChangeSession(this.props.activeSession.id);
        }
        this.setState({ showDelSession: false, showAddSession: false, showUpdateSession:false, DelSession: '' });
    }
  }

  SessionTxtChange(e){
    var duplicate = false;
     this.props.allSessions.filter( (sessItem,index) => {

        if( sessItem.alias !== this.state.SessionName.alias && sessItem.alias.toLowerCase().trim() === e.target.value.toLowerCase().trim() ){
            duplicate = true;
        }
    });

    if(duplicate){
        if(e.target.value.length <= 25){
          this.setState({ SessionNameTxt: e.target.value, DupAvailable: 'Session name already exists. Please choose a different name.' });
        }
    }else{
        if(e.target.value.length <= 25){
          this.setState({ SessionNameTxt: e.target.value, DupAvailable: '' });
        }
    }
    // this.setState({ SessionNameTxt: e.target.value });
  }

  ToggleMinimize(){
   this.setState({ToggleMinimize: !this.state.ToggleMinimize});
  }

  RightNavLayer(){
    if(this.state.ShowRightLayer){
      this.setState({ShowRightLayer: false})
    }else{
      this.setState({ShowRightLayer: true})
    }
  }

  NextBtnVisible(){
    var currentPage;
      this.state.RouteObj.map((route, id) => {
       if(window.location.pathname === route.path)
          currentPage = id;
      });

      if(this.state.RouteObj.length-1 !== currentPage){
        if( this.state.RouteObj[currentPage+1].isenabled === true ) {
          NextBtnVisible = true;
        }else{
          NextBtnVisible = false;
        }
      }else{
        NextBtnVisible = false;
      }
      return NextBtnVisible;
  }

  onSaveWorkloadIconClick(){
    if(this.props.GlobalErr !='' && this.props.GlobalErr.isError){
      this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    }else{
      // if(this.props.activeSession.alias.indexOf('Default Session') === 0){
        this.setState({ showSaveWorkload: true, SessionNameTxt: this.props.activeSession.alias });
      // }else{
        // this.SaveWorkload();
      // }
    }
  }

  SaveWorkloadSubmit(){
      // this.state.SessionName = this.props.activeSession;
      // this.Submit_Update_Session();
      
      this.props.onUpdateActiveSession(this.props.sizerWorkLoad);
      if(this.state.SessionNameTxt.trim() !== '' && this.state.SessionNameTxt !== null ){
        var initialCheck = false;
        this.SaveWorkload(initialCheck);
      }
  }

  SaveWorkload(overrideParam){
      var workload = { "WorkLoad": {} };
      this.props.activeSession.workload = this.props.sizerWorkLoad;
      workload.WorkLoad = this.props.activeSession.workload;
      var sessionObject = {
                  "Workload":workload,
                  "SessionID": this.props.activeSession.id,
                  "UserId": "Madhukar",
                  // "UserId":this.props.UserID,
                  //"SizerType": sizerType,
                  "SizerId": said,
                  "Alias": this.state.SessionNameTxt,
                  "Override": overrideParam
                }
      // var sessionObject = { "SessionID": this.props.activeSession.id };
      this.props.onSaveWorkload(sessionObject);
  }

  OverrideMsgYesClick(){
    this.SaveWorkload(true);
    this.state.showSaveWorkload = false;
    this.setState({ showDupWLPopup: false });
  }

  OverrideMsgNoClick(){
    this.state.showSaveWorkload = true;
    this.setState({ showDupWLPopup: false });
    this.props.onDisableconflicts();

  }

  render() {

    let ToogleBtn;
    var LayerRight;
    var showDelSession;
    var showAddSession;
    var showSaveWorkload;
    var showDupWLPopupContent;
    // if(this.props.GlobalErr !='' && this.props.GlobalErr.isError){

    // }

    let SizingButton = '';
    // if(!this.props.isSizeEnabled){
    if(said === 'EPA'){
        SizingButton = <Button primary={true} label='Size Workload' onClick={this.onFinish} icon={<Magic/>} style={{padding:'6px 6px',width: '100%'}} />;
    }else{
      if(!this.props.activeSession.isSizeEnabled){
        SizingButton = <Button primary={true} label='Size Workload' icon={<Magic/>} style={{padding:'6px 6px',width: '100%'}} />;
      }else{
        SizingButton = <Button primary={true} label='Size Workload' onClick={this.onFinish} icon={<Magic/>} style={{padding:'6px 6px',width: '100%'}} />;
      }
    }

    

    let RouteWithSubRoutes = (route) => (
      <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )

    let links = this.state.RouteObj.map((route, id) => {
       let activeLinkClass = '';
       if( window.location.pathname.match(route.path) ){
         activeLinkClass = 'active';
       }else{
         activeLinkClass = '';
       }
       return <Box key={id} direction="row" margin="none" pad="none">
                <Box id={id} className={activeLinkClass} style={{color:'transparent',width:'4%'}}>a</Box>
                <li id={id} style={{width:'96%'}}>
                    <Anchor id={route.label} label={route.label} onClick={this.onLeftNavSelection.bind(this)} />
                </li>
              </Box>
    });

    let SolnLostPopup = '';
    if(this.state.ShowSolnLostMsg){
      SolnLostPopup = <Layer>
                                <Box margin='none' pad='none' size='medium' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <WarningIcon size='small' colorIndex='warning' />
                                              <Heading tag="h4" strong={false} >Please Confirm</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ this.onSolnLostPopupClose } >
                                              <CloseIcon size='small' colorIndex="light-2" className="CloseIconStyle" />
                                          </Box>
                                    </Box>
                                    <Box margin="none" pad="small">
                                         <Heading tag='h6' strong={false} margin='none'>
                                           Solution will be lost, are you sure you want to continue ?
                                         </Heading>
                                    </Box>
                                    <Box direction='row' justify='end' margin='none' pad='small'>
                                        <Button label='Yes' className="SessionOutBtns" onClick={ () => this.onSolnLostPopupYes(this.state.NavSelection) } />
                                        <Button label='No'  className="SessionOutBtns" critical={true} onClick={this.onSolnLostPopupClose} />
                                    </Box>
                                </Box>
                      </Layer>
    }
    var toast = '';
    if(this.props.toastNotification.isEnabled){

      toast = <Layer closer={false} overlayClose={true} >
                        <Box margin="none" pad="none" size='medium'>
                             <Box direction="row" colorIndex='neutral-1' margin="none" pad="small" separator="bottom">
                                  <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                       <CircleInformation colorIndex='accent-1-t' size='small' />
                                       <Heading tag="h4"strong={false} style={{marginBottom:'0px'}}>Information</Heading>
                                  </Box>
                                  <Box direction="row" margin="none" pad="none" align='start' alignContent="start"
                                       onClick={ this.props.onCloseToast } >
                                       <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                  </Box>
                             </Box>
                             <Box direction="row" margin="small" pad={{between: 'small'}} >
                                  <Status value='ok' style={{margin:'12px 12px 0px 0px'}} />
                                  <Paragraph margin="small" >{ this.props.toastNotification.msg }</Paragraph>
                             </Box>
                        </Box>
              </Layer>

    // <Box pad="small" justify="between" direction="row" colorIndex="light-2" >
    //              <Box pad={{between:'small'}} justify="between" direction="row" >
    //                 <Status value='ok' />
    //                 <Heading tag='h5' strong={false} margin='none'> {this.props.toastNotification.msg} </Heading>
    //              </Box>
    //              <Box pad="none" direction="row" onClick={this.props.onCloseToast} ><FormClose size="small"/></Box>
    //           </Box>
     // toast =  <Toast status='ok' onClose={ this.props.onCloseToast} style={{zIndex: '100007'}}> {this.props.toastNotification.msg} </Toast>
    }else{
      toast = '';
    }

    let RedirectPopup = '';
    if(this.state.RedirectPopup){
         RedirectPopup = <Layer closer={false} overlayClose={true} >
                            <Box margin="none" pad="none" size='medium' >
                                <Box direction="row" colorIndex='neutral-1' margin="none" pad="small" separator="bottom">
                                      <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                          <WarningIcon colorIndex='critical' size='small' />
                                          <Heading tag="h4" strong={false} style={{marginBottom:'0px'}}>Error</Heading>
                                      </Box>
                                      <Box direction="row" margin="none" pad="none" align='start' alignContent="start"
                                          onClick={ () => { this.props.onRedirectPage(true, this.state.RouteObj[1]['path'] );
                                                            // this.props.history.push(this.state.RouteObj[1]['path']);
                                                            this.setState({ RedirectPopup: false, RedirectMsg: '' })
                                                          }
                                          } >
                                          <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                      </Box>
                                </Box>
                                <Box direction="row" margin="small" pad={{between: 'small'}} >
                                      <Paragraph margin="small" >{ this.state.RedirectMsg }</Paragraph>
                                </Box>
                            </Box>
                      </Layer>
    }

    let ErrorPopup = '';
    if(this.state.ErrorPopup){
         ErrorPopup = <Layer closer={false} overlayClose={true} >
                        <Box margin="none" pad="none" size='medium'>
                             <Box direction="row" colorIndex='neutral-1' margin="none" pad="small" separator="bottom">
                                  <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                       <WarningIcon colorIndex='critical' size='small' />
                                       <Heading tag="h4"strong={false} style={{marginBottom:'0px'}}>Error</Heading>
                                  </Box>
                                  <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ () => this.setState({ ErrorPopup: false, ErrorPopupMsg: '' }) } >
                                       <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                  </Box>
                             </Box>
                             <Box direction="row" margin="small" pad={{between: 'small'}} >
                                  <Paragraph margin="small" >{ this.state.ErrorPopupMsg }</Paragraph>
                             </Box>
                        </Box>
                      </Layer>
    }

    if(this.state.ToggleMinimize){
         ToogleBtn = <Button data-tip="Expand" icon={<MenuIcon colorIndex="accent-3" size="small"  />} onClick={this.ToggleMinimize}/>;
    }else{
         ToogleBtn = <Button  data-tip="Minimize" icon={<ContractIcon colorIndex="accent-3" size="small"   />} onClick={this.ToggleMinimize}/>;
    }

    if(this.state.ShowRightLayer){
          LayerRight = <Box colorIndex="light-2" direction="row" align='start' pad='none' separator="left"
                            style={{height:'100%', width:'300px', overflowY: 'auto',
                            position:'absolute',right:'0px',top:'0px',zIndex:3}}>
                 <Animate enter={{"animation": "slide-left", "duration": 200, "delay": 0}}
                          leave={{"animation": "slide-left", "duration": 200, "delay": 0}}
                          keep={true} style={{width:'100%'}} >
                      <Box direction='row'>

                       <List style={{width:'100%'}}>
                         <Heading tag="h4" align="center" margin="none" strong={true} style={{backgroundColor:'#28ab8c',padding:'4px',color:'#fff'}}>{this.props.DefaultInputs.SolutionPreview.PageCaption}</Heading>
                         <ListItem justify='between' direction="column" separator='horizontal'>
                            <span> Solution Profile Recommended </span>
                            <span style={{width:'100%',textAlign:'center'}} className='secondary'> (Role:Mailbox(log and database isolated) server -Site1 -No DAG) </span>
                          </ListItem>

                          <ListItem justify='between' direction="column" separator='horizontal'>
                            <span> Server Type </span>
                            <span className='secondary'> Proliant </span>
                          </ListItem>
                          <ListItem justify='between' direction="column" separator='horizontal'>
                            <span> ServerPlatform  </span>
                            <span className='secondary'> Tower </span>
                          </ListItem>
                           <ListItem justify='between' direction="column" separator='horizontal'>
                            <span> Processor Vendor </span>
                            <span className='secondary' > Intel </span>
                          </ListItem>
                           <ListItem justify='between' direction="column" separator='horizontal'>
                            <span> Server </span>
                            <span className='secondary'> Proliant ML350 Gen9(CTO) </span>
                          </ListItem>
                        </List>
                     </Box>
                 </Animate>
          </Box>
      }else{
      LayerRight=""
    }

    if( window.location.pathname.match("/SolnAlternative") ){
      this.state.showFooter = NextBtnVisible = false;
    }else if( !window.location.pathname.match("/Home")){
      NextBtnVisible = this.NextBtnVisible();
      this.state.showFooter = true;
    }

    if(this.props.OverrideMsg.isEnabled && this.state.showDupWLPopup){
          showDupWLPopupContent =
                      <Layer>
                                <Box margin='none' pad='none' size='medium' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <WarningIcon size='small' colorIndex='warning' />
                                              <Heading tag="h4" strong={false} >Please Confirm</Heading>
                                          </Box>
                                    </Box>
                                    <Box margin="none" pad="small">
                                         <Heading tag='h6' strong={false} margin='none'>
                                           {this.props.OverrideMsg.msg}
                                         </Heading>
                                    </Box>
                                    <Box direction='row' justify='end' margin='none' pad='small'>
                                        <Button label='Yes' className="SessionOutBtns" onClick={ this.OverrideMsgYesClick } />
                                        <Button label='No'  className="SessionOutBtns" critical={true} onClick={this.OverrideMsgNoClick} />
                                    </Box>
                                </Box>
                      </Layer>
    }else{
          showDupWLPopupContent = ""
    }

    if(this.state.showSaveWorkload){
          showSaveWorkload = <Layer>
                                <Box margin='none' pad='none' size='medium' justify='between' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <Heading tag="h4" strong={false} >Please name your workload:</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ this.CloseDelSession } >
                                              <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                          </Box>
                                    </Box>
                                    <Box direction="row" margin="none" pad="small" justify="start" style={{width:'100%'}}>
                                      <TextInput value={this.state.SessionNameTxt} style={{width:'80%'}}
                                                 placeHolder='Session Name'
                                                 onDOMChange={ this.SessionTxtChange } />
                                      { this.state.SessionNameTxt === '' || this.state.SessionNameTxt.trim() === '' ?
                                          <Button primary={true} icon={<FormNextLink size='small' />} />
                                        :
                                          <Button primary={true} icon={<FormNextLink size='small' />}
                                                  onClick={ this.SaveWorkloadSubmit } />
                                      }
                                    </Box>
                                </Box>
                           </Layer>
    }else{
          showSaveWorkload = ""
    }

    var tempText ='';
    var tempMethod ='';

    if(this.state.showUpdateSession){
       tempText = 'Update Session' ;
       tempMethod = this.Submit_Update_Session;
    }

    if(this.state.showAddSession){
       tempText = 'Name Your Session' ;
       tempMethod = this.Submit_Add_Session;
    }

    if(this.state.showAddSession || this.state.showUpdateSession){
          showAddSession = <Layer>
                                <Box margin='none' pad='none' size='medium' justify='between' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <Heading tag="h4" strong={false} >{tempText}</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ this.CloseDelSession } >
                                              <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle"  />
                                          </Box>
                                    </Box>
                                    <Box direction="row" margin="none" pad="small" justify="start" style={{width:'100%'}} >
                                      <TextInput value={this.state.SessionNameTxt} style={{width:'80%'}}
                                                 placeHolder='Session Name'
                                                 onDOMChange={ this.SessionTxtChange } />
                                      { this.state.SessionNameTxt === '' || this.state.SessionNameTxt.trim() === '' ||
                                        this.state.DupAvailable !== '' ?
                                            <Button primary={true} icon={<FormNextLink size='small' />} />
                                            :
                                            <Button primary={true} icon={<FormNextLink size='small' />}
                                                    onClick={tempMethod} />
                                      }
                                    </Box>
                                    { this.state.DupAvailable !== '' ?
                                      <Box margin="none" pad='none' align='start' >
                                           <Heading tag="h5" strong={false} className='SessionExtPopup' >{this.state.DupAvailable}</Heading>
                                      </Box>
                                    :
                                      ''
                                    }
                                </Box>
                           </Layer>
      }else{
          showAddSession = ""
    }

    if(this.state.showDelSession){
          showDelSession = <Layer>
                                <Box margin='none' pad='none' size='medium' >
                                    <Box direction="row" colorIndex="neutral-1" margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <WarningIcon size='small' colorIndex='warning' />
                                              <Heading tag="h4" strong={false} >Please Confirm</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ this.CloseDelSession } >
                                              <CloseIcon size='small' colorIndex='light-2' className="CloseIconStyle" />
                                          </Box>
                                    </Box>
                                    <Box margin="none" pad="small">
                                         <Heading tag='h6' strong={false} margin='none'>
                                              Are you sure you want to delete the selected session:
                                         </Heading>
                                         <Heading tag='h6' strong={true} margin='none'>
                                              {this.state.DelSession.alias}
                                         </Heading>
                                    </Box>
                                    <Box direction='row' justify='end' margin='none' pad='small'>
                                        <Button label='Yes' className="SessionOutBtns" onClick={ () => this.Submit_Delete_Session(this.state.DelSession.id) } />
                                        <Button label='No'  className="SessionOutBtns" critical={true} onClick={this.CloseDelSession} />
                                    </Box>
                                </Box>
                           </Layer>
     }else{
          showDelSession = ""
    }

    var sessionsMenu ="";

    if(this.props.allSessions.length > 0){

    var s = this.props.allSessions.map((val) => {
          return(
          
                <TableRow key={val.id}>
                  <td> <Anchor pad='none' margin='small' className="UserSelectionAnchor"style={{margin:'0px 0px', fontWeight: '500'}} 
                                       onClick={() => this.Submit_Change_Session(val.id) }>
                                       {val.alias}
                               </Anchor></td>
                                <td>  <Button primary={false} plain={true} onClick = { () => this.setState({ SessionName: val, SessionNameTxt: val.alias, showUpdateSession: true, showAddSession: false }) }                                
                                          icon={<FormEdit size="small" colorIndex='#ff9374' />}  /> </td>  
                                  <td>   <Button primary={false} plain={true} onClick ={ () => this.ShowDelSession(val) }
                                          // onClick ={ ()=>this.props.onDeleteSession(val.id) }     
                                          icon={<TrashIcon size="small" colorIndex='#ff9374' />}  /> </td>
               </TableRow>
         
          
          )
      });

      //  var s = this.props.allSessions.map((val) => {
      //     return(

      //           <TableRow key={val.id} >
      //             <td>
      //               <Box direction='row' >
      //                    <Anchor pad='none' margin='none' className="UserSelectionAnchor"style={{margin:'12px 0px', fontWeight: '500'}}
      //                            onClick={() => this.Submit_Change_Session(val.id) }>
      //                            {val.alias}
      //                    </Anchor>
      //                    <Button primary={false} plain={true} onClick = { () => this.setState({ SessionName: val, SessionNameTxt: val.alias, showUpdateSession: true, showAddSession: false }) }
      //                            icon={<FormEdit size="small" colorIndex='#ff9374' />}  />
      //                    <Button primary={false} plain={true} onClick ={ () => this.ShowDelSession(val) }
      //                            // onClick ={ ()=>this.props.onDeleteSession(val.id) }
      //                            icon={<TrashIcon size="small" colorIndex='#ff9374' />}  />
      //               </Box>
      //                </td>
      //          </TableRow>
      //     )
      // });
    }

    sessionsMenu = <Menu responsive={true} closeOnClick={true} size='medium' margin='none'
                          icon={<User size="small" colorIndex='accent-3' />}
                          label={this.props.activeSession.alias}  className="UserSelectMenu">
                      <Table className="UserSelectDropdownItems">
                        <tbody>
                          <TableRow>
                               <Box direction='row'>   
                                    <Anchor className="UserSelectionAnchor" style={{margin:'0px 0px', fontWeight: '500'}} onClick={ this.AddUserClick }>Add New</Anchor>
                                    <Button primary={false} plain={true} onClick={ this.AddUserClick }
                                    icon={<UserAdd size="small" colorIndex='brand' />}  />
                               </Box>
                            </TableRow>
                               {s}
                           </tbody>
                         </Table>

                    </Menu>

    let SolutionPreviewContent = '';

    //if(this.props.DefaultInputs["@name"] === "SAP HANA Sizing Tool"){
    if(said === "SAPHANA" || said === "CS750VirtSizer"){
        SolutionPreviewContent = '';
    }else{
       // SolutionPreviewContent = <Button icon={<Catalog size="small" colorIndex='brand'/>} onClick={this.RightNavLayer} />
    }

    return (
        <Box>
                 { toast }
          <Box direction='row' className="" margin="none" pad="none" justify="end" separator="bottom" style={this.state.PositionFixedState}>
            <Box direction='row' size='small' align="start">
                <ReactTooltip />
                 { ToogleBtn }
                 { ErrorPopup }
                 { RedirectPopup }
                 { SolnLostPopup }
               <Button  data-tip="Home" icon={<Home size="small" colorIndex="accent-3"   />} onClick={this.goHome}/>

            </Box>
            <Box basis="xxlarge">
                 <Heading align='start' tag='h4' strong={true}     style={{fontSize: '23px',margin: 'auto 0%',paddingLeft:'6px',color: '#01a982',borderLeft: '1px solid #bdbcbc'}}>{this.state.TitleofSizer} </Heading>
                 { showDelSession }
                 { showAddSession }
                 { showSaveWorkload }
                 { showDupWLPopupContent }
            </Box>
            <Box align="center" basis="xlarge"  direction="row"  margin="none" pad={{horizontal: "large"}} >
                {this.state.showFooter ?
                    <Box direction='row' pad='none' margin='none'>
                      <Button primary={false} plain={true} icon={<SaveIcon size="small" colorIndex='accent-3'/>} label='Save Workload' onClick={this.onSaveWorkloadIconClick } className="ReverseSavewrkloadbtn"/>

                      {SolutionPreviewContent}
                    </Box>
                   : null }
                {sessionsMenu}
            </Box>
          </Box>
          <Box direction='row'>
            <Split flex='right' style={{width: '100%'}} pad="small" className="LeftSec"  showOnResponsive='both'>
               { !this.state.ToggleMinimize ?
                     <Animate enter={{"animation": "slide-right", "duration": 500, "delay": 0}} leave={{"animation": "slide-right", "duration": 500, "delay": 0}}  keep={true}>
                      <Box justify='center' style={{width: '100%'}} basis="large" className="MenuToggle" align='center' pad='none' margin='none'>
                          <Box style={{width: '100%'}}>
                            <ul className="LeftNav">
                              {links}
                            </ul>
                        </Box>
                      </Box>  </Animate> :null }
              <Box direction="row" className="RightSec" justify='start' style={{width: '100%',height:'100%'}} align='center' pad='none'>
                  <Box direction="row" style={{height:'100%',width:'100%'}}>
                      <Box className="Togglebtncls">

                      </Box>
                      <Switch>
                         {this.state.RouteObj.map((route, i) => (
                              <RouteWithSubRoutes key={i} {...route}/>
                          ))}
		                  	<Route exact path='/Build/SolnAlternative' component={SolnAlternative} />
                      </Switch>
                  </Box>
                  {LayerRight}
              </Box>
            </Split>
          </Box>
          {this.state.ShowProgressBar ?
          <Box direction="column" margin="none" pad="none" style={{width:'100%',position:'fixed',bottom:'5.8%'}} >
              <Box margin="none" pad="none" align="end" >
                <Heading tag="h3"> 100%</Heading>
              </Box>
              <Box className="ProgressBar" style={{width:'100%',backgroundColor:'rgba(98, 113, 125, 0.57)',bottom:'6%'}}>
                <Box margin="none" pad="none" style={{width:'20%'}} className="ProgressBarAfter"></Box>
              </Box>
          </Box> : null }
          {this.state.showFooter ?
          <Box className="NextPrevSec" direction="row" justify="between" margin="none" pad="none"
               style={{position:'fixed',bottom:'0px',height:'6%',width:'100%',backgroundColor: 'rgba(66, 85, 99, 0.82)',zIndex:'2'}} >
               <Box direction="row" basis="small" />
               <Box direction="row" justify="center" basis="xxlarge" >
                    {/* window.location.pathname.match("/ContactInfo") ? */}
                    { window.location.pathname.match(this.state.RouteObj[0]['path']) ?
                      <Box align="center" className="NextPrevIconDisabled" alignContent="center" style={{width:'10%'}} separator="all">
                        <CaretPrevious size="small" style={{margin:'auto'}} colorIndex='brand'/>
                      </Box>
                      :
                      <Box direction="row" align="center" className="NextPrevIcon" alignContent="center" onClick={this.onPrevClick} style={{width:'10%'}} separator="all">
                          <CaretPrevious size="small" style={{margin:'auto'}} colorIndex='brand'/>
                      </Box>
                    }
                    { NextBtnVisible ?
                      <Box direction="row" align="center" className="NextPrevIcon"  alignContent="center" onClick={this.onNextClick} style={{width:'10%'}} separator="all">
                          <CaretNext size="small" style={{margin:'auto'}} colorIndex='brand'/>
                      </Box>
                      :
                      <Box direction="row" align="center" className="NextPrevIconDisabled" alignContent="center" style={{width:'10%'}} separator="all">
                          <CaretNext size="small" style={{margin:'auto'}} colorIndex='brand'/>
                      </Box>
                    }
               </Box>
               <Box direction="row" basis="small" className="NextPrevIcon" >
                    { SizingButton }
               </Box>
          </Box>
          :   <CustomFooter/> }
        </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      allSessions: state.sessions.sessions,
      activeSession: state.sessions.activeSession,
      treeView: state.sessions.activeSession.treeView,
      TitleCaption: state.sessions.sessionDefaults.inputs.Sizers,
      DefaultInputs: state.sessions.sessionDefaults.inputs.Sizers.Sizer,
      GlobalErr: state.sessions.activeSession.globalError,
      // isSizeEnabled: state.sessions.activeSession.isSizeEnabled,
      country:state.sessions.Country,
      OverrideMsg: state.sessions.overrideMsg,
      toastNotification: state.sessions.notificationMsg,
      Redirect: state.sessions.redirect,
      UserID: state.auth.userData.username,
      sizerWorkLoad: state.sizerWorkload.workload,
      workloadTemplate:state.sessions.sessionDefaults.workload,
      validation:state.sizerWorkload.validation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onAddSession: (id, name) => {
          console.log(name);
          dispatch(addSession(id, name));
      },
      onChangeSession : (id) => {
        dispatch(changeSession(id));
      },
      onDeleteSession: (id) => {
       dispatch(deleteSession(id));
      },
      onUpdateSession:(session) => {
         dispatch(updateSession(session))
      },
      updateError:(errorMsg) =>{
        dispatch(errorValidataion(errorMsg));
      },
      onGetSolution:(workload) =>{
        dispatch(getSolution(workload))
      },
      onSaveCurrentSession:()=>{
        dispatch(SaveCurrentSession());
      },
      onSaveWorkload:(sessionID) =>{
        dispatch(saveWorkload(sessionID));
      },
      onDisableconflicts:()=>{
        dispatch({type:'DISMISS_CONFLICTS'})
      },
      onCloseToast:()=> {
        dispatch({type:'DISMISS_TOAST'});
      },
      OnToggleSizeButton:(value)=>{
        dispatch(toggleSizeButton(value));
      },
      onRedirectPage: (isTrue, path) => {
          dispatch(redirectPage(isTrue, path));
      },
      onNewSession:(workload) => {
        dispatch({type:'UPDATE_SIZER_WORKLOAD',payload:workload})
      },
      onUpdateActiveSession:(workload) => {
        dispatch({type:'UPDATE_Active_WORKLOAD',payload:workload})
      },
      onValidateWorkload:(url,workload) => {
        dispatch(validateWorkload(url,workload));
      }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Build);
