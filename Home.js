import React, { Component } from 'react';
import {updateEULA,updateCountry,SaveCurrentSession, addSession, changeSession, deleteSession, updateSession } from '../../State/actions/sessions';
import {connect} from 'react-redux';
import {said} from '../../AppConfig';
import { Link } from 'react-router-dom';
import RadioButton from 'grommet/components/RadioButton';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Layer from 'grommet/components/Layer';
import TextInput from 'grommet/components/TextInput';

import Map from 'grommet/components/icons/base/Map';
import NewIcon from 'grommet/components/icons/base/New';
import User from 'grommet/components/icons/base/User';
import Info from 'grommet/components/icons/base/Info';
import LinkIcon from 'grommet/components/icons/base/Link';
import DocumentConfig from 'grommet/components/icons/base/DocumentConfig';
import ObjectUngroup from 'grommet/components/icons/base/ObjectUngroup';
import VmMaintenance from 'grommet/components/icons/base/VmMaintenance';
import Calculator from 'grommet/components/icons/base/Calculator';
import WorkshopIcon from 'grommet/components/icons/base/Workshop';
import Catalog from 'grommet/components/icons/base/Catalog';
import CloseIcon from 'grommet/components/icons/base/Close';
import WarningIcon from 'grommet/components/icons/base/Alert';
import TrashIcon from 'grommet/components/icons/base/FormTrash';
import FormNextLink from 'grommet/components/icons/base/FormNextLink';
import FormEdit from 'grommet/components/icons/base/FormEdit';

// import ContactInfo from '../SAPHANASizerScreens/ContactInfo';
// import EnvironmentDetails from '../SAPHANASizerScreens/EnvironmentDetails';
// import OtherEnvironmentDetails from '../SAPHANASizerScreens/OtherEnvironmentDetails';

import CustomFooter from './CustomFooter';
import LoadFiles from './LoadFiles';
import WhatsNewPage from '../../SizerUI/SizerScreens/WhatsNew';
import ReferenceArchitecture from '../../SizerUI/SizerScreens/ReferenceArchitecture';
import {version} from '../../AppConfig';
import $ from 'jquery';
import {interviewScreens} from '../../SizerScreens';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

let AdditionalList=[];
var TotalCountyNames=[];
let CountyList=[];
let About=[];
let EPASizingHomeMenuItems;
function CreateGuid() {  
   function _p8(s) {  
      var p = (Math.random().toString(16)+"000000000").substr(2,8);  
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
   }  
   return _p8().toUpperCase() + _p8().toUpperCase() + _p8().toUpperCase() + _p8().toUpperCase();  
}

class MyMain extends Component {

  constructor() {
    super();
    this.state = {
      ProfileInformation: {
           "Name": '',
           "Email": '',
           "Country": ''
      },
      WhatsnewJson: '',
      referenceArchitectureState:false,
      OtherReferalSites: false,
      whatsNew: false,
      HowTo: false,
      About: false,
      LoadItemTitle: '',
      LoadPopupScr: false,
      AdditionalInfoPop: false,
      HomePageJson: '',
      CountyName: TotalCountyNames,
      EULAInformation:false,
      selectedCountry: 'United States',
      ShowCountryChangeAlert: false,
      Change_Session: '',
      
      showUpdateSession:false,    
      showDelSession: false,      
      SessionName: {},
      DelSession: {},
      SessionNameTxt: ''
    }

    this.closePopUps = this.closePopUps.bind(this);
    this.WhatsNewParent=this.WhatsNewParent.bind(this);
    this.AboutClick = this.AboutClick.bind(this);
    this.WhatsNewClick = this.WhatsNewClick.bind(this);
    this.HowToClick = this.HowToClick.bind(this);
    this.AdditionalInfo = this.AdditionalInfo.bind(this);
    this.LoadWorkloadPopupClick = this.LoadWorkloadPopupClick.bind(this);
    this.LoadSolutionPopupClick = this.LoadSolutionPopupClick.bind(this);
    this.getNewRoute = this.getNewRoute.bind(this);
    this.EULAInformationPopUpClose=this.EULAInformationPopUpClose.bind(this);
    this.ShowDelSession = this.ShowDelSession.bind(this);
    this.CloseDelSession = this.CloseDelSession.bind(this);
    this.SessionTxtChange = this.SessionTxtChange.bind(this);
    this.Submit_Update_Session = this.Submit_Update_Session.bind(this);
    this.Submit_Change_Session = this.Submit_Change_Session.bind(this);
    this.Submit_Delete_Session = this.Submit_Delete_Session.bind(this);
    this.ReferernceArchitecture=this.ReferernceArchitecture.bind(this);
  }
ReferernceArchitecture(){

this.setState({referenceArchitectureState:true});
  console.log("reference architecture");
}
  componentDidMount(){
    this.state.RouteObj = interviewScreens;
     //this.setState({EULAInformation: this.props.EULAInformation});


    // if(this.state.HomePageJson.Sizers.Sizer["ProfileInformation"] ==undefined){
    // }
    // this.state.HomePageJson = HomeInformation;
    // console.log(this.state.HomePageJson);
    //   console.log(this.props.DefaultInputs);
    // this.setState({HomePageJson: this.props.DefaultInputs});
    //  console.log(this.state.HomePageJson);

  }

  ShowDelSession(delItem){
    this.setState({ showDelSession: true, DelSession: delItem });
  }
  
  CloseDelSession(){
    this.setState({ showDelSession: false, SessionName: {}, DelSession: {}, showUpdateSession: false });
  }
  WhatsNewParent(){
    this.closePopUps();
  }
  EULAInformationPopUpClose(){
     // this.props.EULAInformation = false;
     this.props.onUpdateEULA(false)
     this.setState({EULAInformation:false});
  }

  Submit_Delete_Session(SessionID){
      // if(this.props.GlobalErr !='' && this.props.GlobalErr.isError){
      //   this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
      // }else{
        this.props.onDeleteSession(SessionID);
        this.CloseDelSession();
      // }
  }

  Submit_Change_Session(SessionID){
    // if(this.props.GlobalErr !='' && this.props.GlobalErr.isError){
    //   this.setState({ErrorPopup: true, ErrorPopupMsg: this.props.GlobalErr.errorMsg});
    // }else{
    //   var errorObj = { isError:false, errorMsg:''};
    //   this.props.updateError(errorObj);

      var CurrentCountry = this.props.country;
      // this.props.onUpdateActiveSession(this.props.sizerWorkLoad);
      // this.props.onSaveCurrentSession();
      this.props.onChangeSession(SessionID);

      var workload = '';
        this.props.allSessions.map((value, index) => {
                        if(value.id === SessionID)
                           workload = value.workload;
                        })

        this.props.onNewSession(workload);

      this.props.allSessions.filter( (sessionItem, index) => {
          if(sessionItem.id === SessionID){
            if(sessionItem.treeView !== ''){

              if(CurrentCountry === sessionItem.treeView.Solutions['@Country']){
                this.props.history.push('/Build/SolnAlternative');
                $('#footer').show()

              }else{
                this.setState({ ShowCountryChangeAlert: true, Change_Session: sessionItem });
                $('#footer').show()
              }
            }else{
              this.props.history.push(this.state.RouteObj[0]['path']);
              $('#footer').hide()
            }
          }
      });
      // if(this.props.activeSession.treeView !== ''){
      //   this.props.history.push('/Build/SolnAlternative');
      // }else{
      //   // this.props.history.push('/Build/ContactInfo');
      //   this.props.history.push(this.state.RouteObj[0]['path']);
      // }
    // }
  }

  Submit_Update_Session(){
    if(this.state.SessionNameTxt.trim() !== ''){
        this.state.SessionName.alias = this.state.SessionNameTxt;
        this.props.onSaveCurrentSession();
        this.props.onUpdateSession(this.state.SessionName);
        if(this.props.activeSession.id === this.state.SessionName.id)
        {
          this.props.onChangeSession(this.props.activeSession.id);
        }
        this.setState({ showDelSession: false, showUpdateSession:false, SessionName: {}, DelSession: '' });
    }
  }

  SessionTxtChange(e){
    if(e.target.value.length <= 25){
      this.setState({ SessionNameTxt: e.target.value });
    }
  }

  onSelCountry(e){
    var obj = this.state.ProfileInformation;
    obj.Country = e.target.innerHTML.trim();

    this.props.onCountryChange(obj.Country);

    this.setState({
          //selectedCountry: obj.Country,
          ProfileInformation: obj,
          HowTo:false, whatsNew:false, About:false, AdditionalInfoPop:false
    });
  }

  closePopUps(){
    this.setState({ LoadItemTitle: '', LoadPopupScr: false,
                    HowTo:false, whatsNew:false, About:false, AdditionalInfoPop:false,referenceArchitectureState:false })
  }

  AdditionalInfo(){
    this.setState({ HowTo:false, whatsNew:false, About:false, AdditionalInfoPop:true });
  }

  AboutClick(){
    this.setState({ About:true, HowTo:false, whatsNew:false });
  }

  WhatsNewClick(){
    this.setState({ AdditionalInfoPop:false, whatsNew:true, HowTo:false, About:false });
  }

  HowToClick(){
    this.setState({ HowTo:false, whatsNew:false, About:false });
  }

  getNewRoute(str){
    this.closePopUps();
    this.props.history.push(str);
  }

  LoadWorkloadPopupClick(){
    this.setState({ LoadItemTitle: 'Workload', LoadPopupScr: true, AdditionalInfoPop:false, whatsNew:false, HowTo:false, About:false });
  }

  LoadSolutionPopupClick(){
    // loadData = this.props.onLoadSolution('', '');
    this.setState({ LoadItemTitle: 'Solution', LoadPopupScr: true, AdditionalInfoPop:false, whatsNew:false, HowTo:false, About:false });
  }

  render() {

  let refArch = "";



    About = null;    
    let whatsnewButton;
    if(this.props.WhatsNewContent!==undefined && this.props.WhatsNewContent!==''){
        this.state.WhatsnewJson = this.props.WhatsNewContent;

      whatsnewButton=  <Anchor className='active WeightFontColor' onClick={this.WhatsNewClick}  label="What's New" icon={ <NewIcon colorIndex="#ff8d6d" size="small"/>}/>
    } 
    let SizerCaption; 
    if( this.props.DefaultInputs!==undefined && this.props.DefaultInputs!=='' )
      {
        SizerCaption = this.props.DefaultInputs["Sizers"]["SizerCaption"]
        this.state.HomePageJson = this.props.DefaultInputs;
        console.log(this.props.countries);
        if(TotalCountyNames.length == 0){
         this.props.countries.Countries.Country.map((val)=>{
                TotalCountyNames.push(val["Name"]);
          });
        }

        CountyList =TotalCountyNames.map(function(selCountry, index){
              return(<Anchor key={index} onClick={this.onSelCountry.bind(this)}> {selCountry} </Anchor>);
        }.bind(this)); 
        About = this.props.DefaultInputs.Sizers.Sizer.About.Para1
    
    /* display menu content dynamically stats here*/
     EPASizingHomeMenuItems = this.props.DefaultInputs.Sizers.Sizer.Index.Sections.Section.map((item)=>{
            var SpaceforLoad='start'
            var ChooseRadiobutton;
              var onClickAction;
              var TitleIcon;
              var   titleTag =item["@Title"]
             switch(titleTag){
             case 'Load Solution':
             SpaceforLoad='center';
              onClickAction=this.LoadSolutionPopupClick;
              TitleIcon=<Info size="large" colorIndex="accent-1"/>
             break;
             case 'Load Workload':
              SpaceforLoad='center'
              onClickAction=this.LoadWorkloadPopupClick;
              TitleIcon=<DocumentConfig size="large" colorIndex="accent-1"/> 
             break;

             case 'Build Solution':
             TitleIcon= <ObjectUngroup size="large" colorIndex="accent-1"/>
             onClickAction = () => { 
                                 $('#footer').hide();
                                 this.props.onUpdateActiveSession(this.props.sizerWorkLoad);                               
                                 this.props.onSaveCurrentSession();                                                                    
                                 this.props.onAddSession(CreateGuid(),'Default Session'); 
                                  // this.props.history.push('/Build/ContactInfo');
                                 this.props.history.push(this.state.RouteObj[0]['path']);                                                                                            
                                 if(said === 'SAPHANA'|| said==='EPA')
                                 {
                                   this.props.onNewSession(this.props.workloadTemplate);
                                   this.props.onUpdateDefaultSession(this.props.DefaultInputs);
                                 }
                                 else if(said === 'CS750VirtSizer')
                                 {
                                   var obj = {
                                     "Workload":this.props.workloadTemplate
                                   }
                                    this.props.onNewSession(obj);
                                 }
             }
             break;
             

             case 'Choose Server Type':      
              TitleIcon= <LinkIcon size="large" colorIndex="accent-1"/>
              ChooseRadiobutton =<RadioButton checked="true" className="SynergychooseRadiobtn"/>

             break;

             case 'View Preconfigured Systems':
             
             break;

             case ' Build your own solutions':
            
             case 'Reference Architecture':
             if( said==='EPA')
                     {
                          onClickAction= this.ReferernceArchitecture;
                           TitleIcon= <LinkIcon size="large" colorIndex="accent-1"/>
                         }
               // onClickAction= this.ReferernceArchitecture;
              // TitleIcon= <LinkIcon size="large" colorIndex="accent-1"/>
             break;

              case 'Additional Information':
               onClickAction= this.AdditionalInfo;
               TitleIcon=   <LinkIcon size="large" colorIndex="accent-1"/>
             break;
             default:
             console.log("we are not found")
             }

          console.log(item["@Title"])
                 if(item["@Title"]=="   Check for a Newer Version"){

                 }else if(item["@Title"]=="   View Preconfigured Systems"){

                 }else if(item["@Title"]=="   Let us build one for you"){

                 }else if(item["Text"]== "Customer Information"){
				 }else if(item["Text"]== "Company Name"){
				 }else if(item["Text"]== "Project Name"){
				 }else if(item["Text"]== "Project Contact Person e-Mail"){
				 }else if(item["Text"]== "SAP Lookup"){
				 }else if(item["Text"]== "Use SAPS Lookup table to view the SAP value of a specific server model."){
				 }
				 
				 else{
                    return(
                      <Box  margin="small"  onClick={onClickAction} className="onHoverTab" align='center' wrap={true} pad='small' basis="medium">
                              <Box direction='row'>
                                    <Anchor>
                                      {TitleIcon}
                                    </Anchor>
                              </Box> 
                              <Heading tag="h3" align="center" strong={true} style={{color:'#fff'}}>{item["@Title"]}</Heading>
                              <Box direction='row' alignContent="center" align="center" direction='row' style={{width:'100%'}}>
                                    <Paragraph margin="none" style={{color:'#fff',textAlign:SpaceforLoad,width:'100%'}}>
                                      {ChooseRadiobutton}  {item["Text"]}
                                    </Paragraph>
                              </Box> 
                      </Box>
                    );
                 }
  
        }) 
  }
        /*Display menu content ends here */



    var WhatsnewHere;
    var AboutHere;
    var HowToHere;
    var AdditionalInformation;
    var EULAInformationPopUp;
     if(this.state.EULAInformation){
       EULAInformationPopUp= <Layer className="EULAPOPupLayer">
                                <Form>
                                        <Box margin="none" pad="small" className="EULAcontentScroll"style={{overflow:'auto'}}>
                                           <Heading tag='h5'strong={true} uppercase={false} truncate={false} style={{color:'#01a982'}}>
                                                PLEASE READ CAREFULLY:
                                            </Heading>
                                            <Paragraph margin="small">
                                                1.<b>Applicability.</b>
                                                This end user license agreement (the "Agreement")   governs the use of accompanying software, unless it is subject to a separate agreement between you  and Hewlett Packard Enterprise Company and its subsidiaries (“HPE”). By downloading, copying, or using the software   you agree to this Agreement. HPE provides translations of this Agreement in certain languages other than English, which may be found at:
                                                <a href="http://www.hpe.com/software/SWLicensing" target="_blank">http://www.hpe.com/software/SWLicensing</a>
                                            </Paragraph>
                                              <Paragraph margin="small">
                                              2.<b>Terms.</b>
                                                This Agreement includes supporting material accompanying the software or referenced by HPE,  which may be software license information, additional license authorizations, software specifications,  published warranties, supplier terms, open source software licenses and similar content (Supporting Material).  Additional license authorizations are at:
                                                <a href="http://www.hpe.com/software/SWLicensing" target="_blank">http://www.hpe.com/software/SWLicensing</a>
                                            </Paragraph>
                                              <Paragraph margin="small">
                                              3.<b>Authorization.</b>
                                                 If you agree to this Agreement on behalf of another person or entity, you warrant you have authority to do so.
                                            </Paragraph>
                                              <Paragraph margin="small">
                                             4.<b>Consumer Rights.</b>
                                                 If you obtained software as a consumer, nothing in this Agreement affects your statutory rights.
                                            </Paragraph>
                                              <Paragraph margin="small">
                                               5.<b>Electronic Delivery.</b>
                                                     HPE may elect to deliver software and related software product or license information by electronic transmission or download.
                                            </Paragraph>
                                              <Paragraph margin="small">
                                               6.<b>License Grant.</b>
                                                     If you abide by this Agreement, HPE grants you a non-exclusive non-transferable license to use one copy of the version or
                                                      release of the accompanying software for your internal purposes only, and is subject to any specific software licensing
                                                    information that is in the software product or its Supporting Material.
                                                    Your use is subject to the following restrictions, unless specifically allowed in Supporting Material:
                                                          <Paragraph className="EULAPOPupSubtexts">
                                                          - You may not use software to provide services to third parties.
                                                          </Paragraph >
                                                          - You may not make copies and distribute, resell or sublicense software to third parties.
                                                          <Paragraph className="EULAPOPupSubtexts">
                                                          - You may not download and use patches, enhancements, bug fixes, or similar updates unless you have a license to the underlying software. However, such license doesn't automatically give you a right to receive such updates and HPE reserves the right to make such updates only available to customers with support contracts.
                                                          </Paragraph>
                                                          - You may not copy software or make it available on a public or external distributed network.
                                                          <Paragraph className="EULAPOPupSubtexts">
                                                          - You may not allow access on an intranet unless it is restricted to authorized users.
                                                          </Paragraph>
                                                          - You may make one copy of the software for archival purposes or when it is an essential step in authorized use.
                                                          <Paragraph className="EULAPOPupSubtexts">
                                                          - You may not modify, reverse engineer, disassemble, decrypt, decompile or make derivative works of software. If you have a mandatory right to do so under statute, you must inform HPE in writing about such modifications.
                                                          </Paragraph>
                                              </Paragraph>
                                             <Paragraph margin="small">
                                              7.<b>Remote Monitoring.</b>
                                                  Some software may require keys or other technical protection measures and HPE may monitor your compliance with the Agreement, remotely or otherwise. If HPE makes a license management program for recording and reporting license usage information, you will use such program no later than 180 days from the date it's made available.
                                            </Paragraph>
                                             <Paragraph margin="small">
                                              8.<b>Ownership.</b>
                                             No transfer of ownership of any intellectual property will occur under this Agreement.
                                            </Paragraph>
                                             <Paragraph margin="small">
                                              9.<b>Copyright Notices.</b>
                                                 You must reproduce copyright notices on software and documentation for authorized copies.
                                            </Paragraph>
                                             <Paragraph margin="small">
                                              10.<b>Operating Systems.</b>
                                               Operating system software may only be used on approved hardware and configurations.
                                            </Paragraph>
                                             <Paragraph margin="small">
                                               11.<b>90-day Limited Warranty for HPE Software.</b>
                                                    - HPE-branded software materially conforms to its specifications, if any, and is free of malware at the time of delivery;
                                                        if you notify HPE within 90 days of delivery of non-conformance to this warranty, HPE will replace your copy.
                                                        This Agreement states all remedies for warranty claims.
                                                    <Paragraph className="EULAPOPupSubtexts">
                                                    - HPE does not warrant that the operation of software will be uninterrupted or error free, or that software will operate in hardware
                                                        and software combinations other than as authorized by HPE in Supporting Material.
                                                        To the extent permitted by law, HPE disclaims all other warranties.
                                                    </Paragraph>
                                                    </Paragraph >
                                                    <Paragraph margin="small">
                                                        12.<b>Intellectual Property Rights Infringement.</b>
                                                            HPE will defend and/or settle any claims against you that allege that HPE-branded software as supplied under this Agreement infringes the intellectual property rights of a third party. HPE will rely on your prompt notification of the claim and cooperation   with our defense. HPE may modify the software so as to be non-infringing and materially equivalent, or we may procure a license.  If these options are not available, we will refund to you the amount paid for the affected product in the first year or the depreciated  value thereafter. HPE is not responsible for claims resulting from any unauthorized use of the software.
                                                    </Paragraph>
                                                    <Paragraph margin="small">
                                                      13.<b>Limitation of Liability.</b>
                                                        HPE's liability to you under this Agreement is limited to the amount actually paid by you to HPE for the relevant software,
                                                        except for amounts in Section 12 ("Intellectual Property Rights Infringement").
                                                        Neither you nor HPE will be liable for lost revenues or profits, downtime costs, loss or damage to data or indirect,
                                                        special or consequential costs or damages. This provision does not limit either party's liability for:
                                                        unauthorized use of intellectual property, death or bodily injury caused by their negligence; acts of fraud; willful
                                                        repudiation of the Agreement; or any liability that may not be excluded or limited by applicable law.
                                                    </Paragraph>

                                                      <Paragraph margin="small">
                                                     14.<b>Termination.</b>
                                                      This Agreement is effective until terminated or in the case of a limited-term license, upon expiration;
                                                      however, your rights under this Agreement terminate if you fail to comply with it.
                                                      Immediately upon termination or expiration, you will destroy the software and documentation and any copies, or return them to HPE.
                                                      You may keep one copy of software and documentation for archival purposes. We may ask you to certify in writing you have complied with
                                                      this section. Warranty disclaimers, the limitation of liability, this section on termination,
                                                      and Section 15 ("General") will survive termination.
                                                    </Paragraph>

                                                      <Paragraph margin="small">
                                                    15.<b>General.</b>
                                                          a.<u>Assignment.</u>
                                                          You may not assign this Agreement without prior written consent of HPE, payment of transfer fees and compliance with HPE's software
                                                          license transfer policies. Authorized assignments will terminate your license to the software and you must deliver software and
                                                          documentation and copies thereof to the assignee. The assignee will agree in writing to this Agreement. You may only transfer
                                                          firmware if you transfer associated hardware.
                                                          <Paragraph className="EULAPOPupSubtexts">

                                                              b.<u>U.S. Government.</u>
                                                              If the software is licensed to you for use in the performance of a U.S. Government prime contract or subcontract, you agree that,
                                                              consistent with FAR 12.211 and 12.212, commercial computer software, computer software documentation and technical data for
                                                              commercial items are licensed under HPE's standard commercial license.
                                                              </Paragraph>
                                                              c.<u>Global Trade Compliance.</u>
                                                              You agree to comply with the trade-related laws and regulations of the U.S. and other national governments. If you export,
                                                              import or otherwise transfer products provided under this Agreement, you will be responsible for obtaining any required export or
                                                              import authorizations. You confirm that you are not located in a country that is subject to trade control sanctions
                                                              (currently Cuba, Iran, N. Korea, N. Sudan, and Syria) and further agree that you will not retransfer the products to any such country.
                                                              HPE may suspend its performance under this Agreement to the extent required by laws applicable to either party.
                                                              <Paragraph className="EULAPOPupSubtexts">
                                                              d.<u>Audit.</u>
                                                              HPE may audit you for compliance with the software license terms. Upon reasonable notice, HPE may conduct an audit during
                                                              normal business hours (with the auditor's costs being at HPE's expense). If an audit reveals underpayments then you will pay to
                                                              HPE such underpayments. If underpayments discovered exceed five (5) percent, you will reimburse HPE for the auditor costs.
                                                              </Paragraph>
                                                              e.<u>Open Source Components.</u>
                                                              To the extent the Supporting Material includes open source licenses, such licenses shall control over this Agreement with
                                                              respect to the particular open source component. To the extent Supporting Material includes the GNU General Public License or
                                                              the GNU Lesser General Public License: (a) the software includes a copy of the source code; or (b) if you downloaded the
                                                              software from a website, a copy of the source code is available on the same website; or (c) if you send HPE written notice,
                                                              HPE will send you a copy of the source code for a reasonable fee.
                                                              <Paragraph className="EULAPOPupSubtexts">
                                                              f.<u>Notices.</u>
                                                              Written notices under this Agreement may be provided to HPE via the method provided in the Supporting Material.
                                                              </Paragraph>
                                                              g.<u>Governing Law.</u>
                                                              This Agreement will be governed by the laws of the state of California, U.S.A., excluding rules as to choice and conflict of law.
                                                              You and HPE agree that the United Nations Convention on Contracts for the International Sale of Goods will not apply.
                                                              <Paragraph className="EULAPOPupSubtexts">
                                                              h.<u>Force Majeure.</u>
                                                              Neither party will be liable for performance delays nor for non-performance due to causes beyond its reasonable control,
                                                              except for payment obligations.
                                                              </Paragraph>
                                                              i.<u>Entire Agreement.</u>
                                                              This Agreement represents our entire understanding with respect to its subject matter and supersedes any previous communication or
                                                              agreements that may exist. Modifications to the Agreement will be made only through a written amendment signed by both parties.
                                                              If HPE doesn't exercise its rights under this Agreement, such delay is not a waiver of its rights.
                                                    </Paragraph>
                                                    <Paragraph margin="small">
                                                     16.<b>Australian Consumers.</b>
                                                      If you acquired the software as a consumer within the meaning of the 'Australian Consumer Law' under the Australian Competition
                                                      and Consumer Act 2010 (Cth) then despite any other provision of this Agreement, the terms at this URL apply:

                                                      <a href="http://www.hpe.com/software/SWLicensing" target="_blank">http://www.hpe.com/software/SWLicensing</a>
                                                    </Paragraph>

                                                       <Paragraph margin="small">
                                                              17.<b>Russian Consumers.</b>
                                                                If you are based in the Russian Federation and the rights to use the software are provided to you under a separate license and/or sublicense agreement concluded between you and a duly authorized HPE partner, then this Agreement shall not be applicable.
                                                    </Paragraph>

                                        </Box>

                                          <Footer pad={{"vertical": "small"}} separator="top"  align='center' textAlign='center'>
                                              <Button primary={false} label='I Agree' type='submit' primary={true}  style={{marginLeft:'43%'}} onClick={this.EULAInformationPopUpClose}/>
                                          </Footer>
                            </Form>
                              </Layer>
     }
   
    
    const layer = (
      <Layer className='LoadPopupLayer'>
        <LoadFiles title = {this.state.LoadItemTitle}
                   history = {history}
                   redirectTo = {this.getNewRoute}
                   onClose = {this.closePopUps} />
      </Layer>
    );

 



    const layerelement = this.state.LoadPopupScr ? layer : '';
      // <Paragraph style={{margin:'2px 0px'}}>To allow solutions to be imported in one ConfigAdvanced, go to "Options" in the Main menu and enable "Show OCA buttons in Solution Alternatives"</Paragraph>                                             
    if(this.state.About){  
      var AboutLoop; 
            if(Array.isArray(this.state.HomePageJson.Sizers.Sizer.About.Para1)){
                  AboutLoop =    this.state.HomePageJson.Sizers.Sizer.About.Para1.map(function(item){                               
                                 return(
                                    <Paragraph style={{margin:'2px 0px'}}>{item}</Paragraph> 
                                 );
                              });
            }else{
                 AboutLoop  = <Paragraph style={{margin:'2px 0px'}}>{this.state.HomePageJson.Sizers.Sizer.About.Para1}</Paragraph> 
            }



          AboutHere = <Box margin="none" pad="none" direction="column"className="AboutContent" style={{width:'45%',height:'auto'}}>
                         <Box margin="none" pad="none" >
                              <Box margin="none" pad="none" align="center" className="triangle-up" style={{margin:'auto 88%'}}></Box>
                         </Box>
                         <Box margin="none" pad="none" style={{backgroundColor:'#fff',borderBottom: '3px solid #01a982'}} className="ListItemAlign1">
                              <Box direction="row" margin="none" pad="small" separator="bottom">
                                   <Box direction="row" margin="none" pad="none" align='start' style={{width:'96%'}}>
                                        <Heading tag="h4" strong={true} style={{marginBottom:'0px',color:'#01a982'}}>{this.state.HomePageJson.Sizers.SizerCaption}</Heading>
                                   </Box>
                                   <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={this.closePopUps} >
                                        <CloseIcon size='small' className="CloseIconStyle" />
                                   </Box>
                              </Box>
                              <Box margin="small" pad="none" align='start' style={{margin:'2px 12px'}} >
                                   {AboutLoop}                   
                              </Box>
                              <Box direction="row" margin="none" pad="small" separator='top'>
                              <Menu direction='row'  size='small'dropAlign={{"right": "right"}}>
                              <Anchor style={{cursor:'Default'}}> Version {version} </Anchor>
                              {/* <Anchor onClick={this.OtherSizersClick} className="OtherSizersHover" > Other Sizers </Anchor>
                              <Anchor href="https://www.hpe.com/us/en/privacy/ww-privacy-statement.html"
                                      target="_blank" style={{textDecoration:'none'}}>Privacy Policy</Anchor>   */}
                              <Anchor href={"mailto:ese_aa_solutions@hpe.com?Subject=HPE%20sizing%20tool%20for%20SAP%20Business%20Suite%20powered%20by%20HANA%20(Online%20Client)%20-%20v%20" + version }> Contact </Anchor>
                            </Menu>
                             </Box>
                         </Box>
        </Box>
    }else{
         AboutHere="";
    }

    if(this.state.AdditionalInfoPop){
      let AdditionalList = this.state.HomePageJson.Sizers.Sizer.AdditionalInformation.Doc.map(function(val,id){
                                  // <td> {val["Name"]}  </td>
                              return(
                                  <TableRow key={id}>
                                       <td className='secondary' > <a href={val["Url"]} target="_blank"> {val["Name"]} </a> </td>
                                   </TableRow>
                           );
      });
      AdditionalInformation =  <Layer className="AdditionalInflolayer" style={{width:'50%',height:'50%'}}>
                                <Box direction="column" margin="none" pad="none">
                                    <Box direction="row" colorIndex="neutral-1" margin="none" pad="small" separator="bottom">
                                          <Box direction="row" margin="none" pad="none" align='start' style={{width:'96%'}}>
                                               <Heading tag="h4"strong={true} style={{marginBottom:'0px',color:'#01a982'}}>Additional Information</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={this.closePopUps} >
                                               <CloseIcon size='small' colorIndex="light-2" className="CloseIconStyle" />
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
    }

    if(this.state.whatsNew){


       console.log(this.state.WhatsnewJson);
        WhatsnewHere =  <WhatsNewPage  click={this.WhatsNewParent}/>
     }else{
        WhatsnewHere="";
    }

    if(this.state.HowTo){
        HowToHere =  <Box margin="none" pad="none" direction="column"className="HOwTOContent" style={{width:'13%',height:'auto'}}>
                              <Box margin="none" pad="none" >
                               <Box margin="none" pad="none" align="center" className="triangle-up" style={{margin:'auto'}}></Box>
                              </Box>
                               <Box margin="none" pad="none" style={{backgroundColor:'#fff'}} className="ListItemAlign">
                               <Box margin="none" pad="none" align='end' onClick={this.closePopUps} >
                                    <CloseIcon size='small' className="CloseIconStyle"/>
                               </Box>
                               <List>
                                   <ListItem justify='between'> <span> How To </span> </ListItem>
                                   <ListItem justify='between'> <span> Eric </span> </ListItem>
                              </List>
                               </Box>
                           </Box>
    }else{
        HowToHere="";
    }
    // var MainApp={ maxWidth:'100%' }

    var showDelSession;
    var showUpdateSession;

    if(this.state.showUpdateSession){
          showUpdateSession = <Layer>
                                  <Box margin='none' pad='none' size='medium' justify='between' >
                                    <Box direction="row" colorIndex="neutral-1" margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <Heading tag="h4" strong={false} >Update Session</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ this.CloseDelSession } >
                                              <CloseIcon size='small' colorIndex="light-2" className="CloseIconStyle"  />
                                          </Box>
                                    </Box>
                                    <Box direction="row" margin="none" pad="small" justify="start" style={{width:'100%'}} >
                                      <TextInput value={this.state.SessionNameTxt} style={{width:'80%'}}
                                                 placeHolder='Session Name'
                                                 onDOMChange={ this.SessionTxtChange } />
                                      { this.state.SessionNameTxt === '' || this.state.SessionNameTxt.trim() === '' ?
                                          <Button primary={true} icon={<FormNextLink size='small' />} />
                                        :
                                          <Button primary={true} icon={<FormNextLink size='small' />}
                                                  onClick={ this.Submit_Update_Session } />
                                      }
                                    </Box>
                                  </Box>
                           </Layer>
      }else{
          showUpdateSession = ""
    }

    if(this.state.showDelSession){
          showDelSession = <Layer>
                                <Box margin='none' pad='none' size='medium' >
                                    <Box direction="row" colorIndex="neutral-1" margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <WarningIcon size='small' colorIndex='warning' />
                                              <Heading tag="h4" strong={false} >Please Confirm</Heading>
                                          </Box>
                                          <Box direction="row" margin="none" pad="none" align='start' alignContent="start"  >
                                              <CloseIcon size='small' colorIndex="light-2" className="CloseIconStyle" onClick={ this.CloseDelSession } />
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

    var sessionsMenu = "";

    if(this.props.allSessions.length > 0){

    var s = this.props.allSessions.map((val) => {
          return(

                <TableRow key={val.id}>
                  <td> <Anchor pad='none' margin='small' className="UserSelectionAnchor" style={{ width: '245px', margin:'0px 0px', fontWeight: '500'}}
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
      //     return(<ListItem key={val.id} pad='none' >
      //                      <Box direction="row" margin='none' pad='none' >
      //                          <Anchor pad='none' margin='small' style={{margin:'12px 0px', fontWeight: '500'}}
      //                                  onClick={() => this.Submit_Change_Session(val.id) }>
      //                                  {val.alias}
      //                          </Anchor>
      //                          <Box direction="row" margin='none' pad='none' align='end'>
      //                             <Button primary={false} plain={true} onClick = { () => this.setState({ SessionName: val, SessionNameTxt: val.alias, showUpdateSession: true }) }
      //                                     icon={<FormEdit size="small" colorIndex='#ff9374' />}  />
      //                             <Button primary={false} plain={true} onClick ={ () => this.ShowDelSession(val) }
      //                                     // onClick ={ ()=>this.props.onDeleteSession(val.id) }
      //                                     icon={<TrashIcon size="small" colorIndex='#ff9374' />}  />
      //                          </Box>
      //                      </Box>
      //            </ListItem>
      //     )
      // });
    }

    if(this.props.allSessions.length >0)
    {
      sessionsMenu = <Menu responsive={true} closeOnClick={true} size='medium' margin='none'
                            icon={<User size="small" colorIndex='accent-3' />}
                            label='Organize'  className="OrganiseMenu">
                        {s}
      </Menu>
    }

    var CountryChangeAlert = "";
    if(this.state.ShowCountryChangeAlert){
      CountryChangeAlert = <Layer>
                                <Box margin='none' pad='none' size='medium' >
                                    <Box direction="row" colorIndex='neutral-1' margin="none" style={{padding:'12px 12px 0px 12px'}} separator="bottom">
                                          <Box direction="row" margin="none" pad={{between:'small'}} align='start' style={{width:'96%'}}>
                                              <WarningIcon size='small' colorIndex='warning' />
                                              <Heading tag="h4" strong={false} >Notification</Heading>
                                          </Box>
                                    </Box>
                                    <Box margin="none" pad="small">
                                         <Heading tag='h6' strong={false} margin='none'>
                                            Change in country is observed, you should resize the workload to get the updated country price details in solution summary.
                                         </Heading>
                                    </Box>
                                    <Box direction='row' justify='end' margin='none' style={{padding:'0px 12px 12px 0px'}}>
                                        <Button label='Ok' className="SessionOutBtns"
                                                onClick={ () => {
                                                                  this.state.ShowCountryChangeAlert = false;
                                                                  this.props.history.push('/Build/SolnAlternative')
                                                                }
                                                        } />
                                    </Box>
                                </Box>
                      </Layer>
    }
     let ReferenceArchitectureDisplay;
      if(this.state.referenceArchitectureState){     
             ReferenceArchitectureDisplay=<ReferenceArchitecture redirectTo={this.getNewRoute} click={this.closePopUps}/>
      }else{
             ReferenceArchitectureDisplay=""
      }


    return (
      <Box margin="none" pad="none" className="HomeScreen">
           { EULAInformationPopUp }
           {AdditionalInformation}
           {ReferenceArchitectureDisplay}
           { layerelement }
           { showDelSession }
           { showUpdateSession }
           { CountryChangeAlert }
           <Box margin="none" pad="none" className="AppbackGroundImage" >
                <Box margin="none" pad="none" className="AppbackGround" >
                 <Box margin="none" pad="small"  style={{width:'100%', borderBottom: '1px solid #425563',padding:'6px'}}> <Heading tag='h3' strong={true} style={{textAlign:'center',color:'#fff',fontSize:'27px',margin:'0px'}}>{SizerCaption}</Heading></Box>
                     <Box pad="none" margin="none" style={{width:'100%',height:'100%'}}>
                          <Box margin="none" pad="none" style={{width:'100%',height:'100%',}}>
                               <Box margin="none" pad="none" style={{width:'100%',height:'100%'}}>
                                  <Box direction="row"  pad="small" justify="between" margin="none"
                                      style={{width:'100%'}}>
                                    <Box direction="row"  pad="none" justify="between" margin="none">
                                        <Label margin="none" className="WeightFontColor">Pricing Region</Label>
                                        <Menu justify="start" icon={<Map size="small" colorIndex='accent-3'/>} align="start" className="PricelistButton WeightFontColor" responsive={true} inline={false} label={this.props.country} size='small' primary={false} pad='none'>
                                          {CountyList}
                                        </Menu>
                                          {sessionsMenu}
                                    </Box>
                                    <Menu dropAlign={{"right": "right"}} direction="row"  className="MenuBarList">
                                    
                                     
                                    
                                       {whatsnewButton}
                                      {/*<Anchor className='active WeightFontColor' onClick={this.HowToClick}  label='How To' icon={ <WorkshopIcon colorIndex="#ff8d6d" size="small"/>}/>*/}
                                      <Anchor className='active WeightFontColor' onClick={this.AboutClick} label='About' icon={ <Catalog  colorIndex="accent-3" size="small"/>}/>
                                    </Menu>
                                  </Box>
                                  {AboutHere}
                                  {WhatsnewHere}
                                  {HowToHere}
                                <Box id='OptionsSection' style={{width:'100%',height:'100%'}} justify='start' align='center' wrap={false} pad='none' margin='none'>                 
                                      <Box direction="row" wrap={true} margin="none" pad="none" justify="center" style={{width:'78%'}}>
                                         {EPASizingHomeMenuItems}                          
                                       </Box>   
                                   </Box>  
                               </Box>
                          </Box>
                     </Box>
                </Box>
           </Box>
           { /* <CustomFooter  /> */ }
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      allSessions:state.sessions.sessions,
      activeSession: state.sessions.activeSession,
      DefaultInputs: state.sessions.sessionDefaults.inputs,
      WhatsNewContent: state.sessions.sessionDefaults.whatsNew,
      countries:state.sessions.sessionDefaults.Countries,
      country: state.sessions.Country,
      EULAInformation: state.sessions.EULAPopUpState,
      sizerWorkLoad: state.sizerWorkload.workload,
      workloadTemplate:state.sessions.sessionDefaults.workload,
      sessionDefaults:state.sizerWorkload.sessionDefaults

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onSaveCurrentSession:()=>{
        dispatch(SaveCurrentSession());
      },
      onAddSession : (id,name) => {
          dispatch(addSession(id,name));
      },
      onChangeSession : (id) => {
        dispatch(changeSession(id));
      },
      onDeleteSession : (id) => {
       dispatch(deleteSession(id));
      },
      onUpdateSession : (session) => {
         dispatch(updateSession(session))
      },
      onCountryChange: (country) =>{
        dispatch(updateCountry(country))
      },
       onUpdateEULA: (data) =>{
        dispatch(updateEULA(data))
      },
       onNewSession:(workload) => {
        dispatch({type:'UPDATE_SIZER_WORKLOAD',payload:workload})
      },
       onInsertSessionDefaults:(inputs) => {
        dispatch({type:'UPDATE_SESSION_DEFAULTS',payload:inputs})
      },
      onUpdateActiveSession:(workload) => {
        dispatch({type:'UPDATE_Active_WORKLOAD',payload:workload})
      },
      onUpdateDefaultSession: (inputs) => {
        dispatch({type:'UPDATE_SESSION_DEFAULTS',payload:inputs})
      }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyMain);



