import React, { Component } from 'react';
import {addSession, loadSessionList, loadSessionItem} from '../../State/actions/sessions';
import {connect} from 'react-redux';

import Image from 'grommet/components/Image';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';          
import Button from 'grommet/components/Button';                          
import Paragraph from 'grommet/components/Paragraph';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Layer from 'grommet/components/Layer';

import NewIcon from 'grommet/components/icons/base/New';
import Info from 'grommet/components/icons/base/Info';
import LinkIcon from 'grommet/components/icons/base/Link';
import DocumentConfig from 'grommet/components/icons/base/DocumentConfig';
import ObjectUngroup from 'grommet/components/icons/base/ObjectUngroup';
import VmMaintenance from 'grommet/components/icons/base/VmMaintenance';
import Calculator from 'grommet/components/icons/base/Calculator';
import WorkshopIcon from 'grommet/components/icons/base/Workshop';
import WorkLoadIcon from 'grommet/components/icons/base/DocumentConfig';
import SolutionIcon from 'grommet/components/icons/base/Info';
import Catalog from 'grommet/components/icons/base/Catalog';       
import Close from 'grommet/components/icons/base/Close';   

import DefaultWorkload from '../../Datafiles/Default_Workload';

var DataObj = { 
       "Workloads": {
          "Workload": [
            {
              "@Name": "Workload 1",
              "@ID": "1",
              "Content": DefaultWorkload.WorkLoad
            },
            {
              "@Name": "Workload 2",
              "@ID": "2",
              "Content": DefaultWorkload.WorkLoad
            },
            {
              "@Name": "Workload 3",
              "@ID": "3",
              "Content": DefaultWorkload.WorkLoad
            },
            {
              "@Name": "Workload 4",
              "@ID": "4",
              "Content": DefaultWorkload.WorkLoad
            }
          ]           
       },
       "Solutions": {
          "Solution": [
            {
              "@Name": "Solution 1",
              "@ID": "1"
            },
            {
              "@Name": "Solution 2",
              "@ID": "2"
            },
            {
              "@Name": "Solution 3",
              "@ID": "3"
            },
            {
              "@Name": "Solution 4",
              "@ID": "4"
            }
          ]           
       }
}

class LoadFiles extends Component {

  constructor() {
    super();
    this.state = { LoadItemIndex: '', WorkloadList: [], SolutionList: [] };
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount(){
        var userData = {
                    "UserId": "Madhukar",
                    "SizerId": "SAPHANA"                    
                   };
        this.props.onLoadWokload(userData);
  }

  onLoad(index){
    var selection = 0;
    if(this.props.title === 'Workload'){
      this.state.WorkloadList.filter( (value, id) => {
        if(index === id ){
          selection = value['id'];
        }
      });
      // this.props.onAddSession(Date.now(),'Load Workload Session');
      this.props.onLoadSession({"ID":selection});
      // this.props.history.push('/Build/ContactInfo');
      // this.props.onClose(false);
      // this.props.redirectTo('/Build/ContactInfo');
    
    }else if(this.props.title === 'Solution'){
      this.state.SolutionList.filter( (value, id) => {
        if(index === id ){
          selection = value['id'];
        }
      });
      // this.props.onAddSession(Date.now(),'Load Solution Session');
      this.props.onLoadSession({"ID":selection});
      // this.props.onClose(false);
      // this.props.redirectTo('/Build/SolnAlternative');
      // this.props.history.push('/Build/SolnAlternative');
    }else{ }      

    // this.props.onAddSession(Date.now(),'Loaded Workload');
    // if(this.props.activeSession !== ''){
    //   this.props.activeSession.workload = DataObj.Workloads.Workload[index]["Content"];
    //   this.props.onClose(false);
    //   this.props.history.push('/Build/ContactInfo');
    // }
  }

  componentWillReceiveProps(nextProps)
    {
        this.state.WorkloadList = [];
        this.state.SolutionList = [];
         nextProps.userData.map( (value, index) => {
              if(value['type'].indexOf('Workload') === 0 ){
                  if(this.state.WorkloadList.indexOf(value) !== 0 ){
                    this.state.WorkloadList.push(value);
                  }
              }else{
                  if(this.state.SolutionList.indexOf(value) !== 0 ){
                    this.state.SolutionList.push(value);
                  }
              }
        });


      var selsessionID = '';
      if(nextProps.title === 'Workload'){
        this.state.WorkloadList.filter( (value, id) => {
          if(this.state.LoadItemIndex === id ){
            selsessionID = value['sessionID'];
          }
        });
      }else if(nextProps.title === 'Solution'){
        this.state.SolutionList.filter( (value, id) => {
          if(this.state.LoadItemIndex === id ){
            selsessionID = value['sessionID'];
          }
        });
      }else{

      }

      if(nextProps.activeSession.id!="")
      {      
      if(nextProps.activeSession.id !== this.props.activeSession.id){
        if(nextProps.activeSession.treeView !== ''){
          this.props.onNewSession(nextProps.activeSession.workload);
          this.props.redirectTo('/Build/SolnAlternative');
          // this.props.history.push('/Build/SolnAlternative');
        }else{
          this.props.onNewSession(nextProps.activeSession.workload);
          this.props.redirectTo('/Build/ContactInfo');
          // this.props.history.push('/Build/ContactInfo');
        }    
      }
    }
    
  }

  render() {
    var TileItems = '';
    if(this.props.userData.length > 0){
        // this.props.userData.map( (value, index) => {
        //       if(value['type'].indexOf('Workload') === 0 ){
        //           if(this.state.WorkloadList.indexOf(value) !== 0 ){
        //             this.state.WorkloadList.push(value);
        //           }
        //       }else{
        //           if(this.state.SolutionList.indexOf(value) !== 0 ){
        //             this.state.SolutionList.push(value);
        //           }
        //       }
        // });
        
                           // <Header size='small' pad={{"horizontal": "small"}}>
                            //      <Box direction="row" margin="none" pad={{between: 'small'}} >
                            //           <Box className='WorkloadItemIcon'>
                            //             <WorkLoadIcon size='small' />
                            //           </Box>
                            //           <Heading tag='h5' strong={true} margin='none'>
                            //             {value['id']}
                            //           </Heading>
                            //     </Box>
                           // </Header>

                           // <Header size='medium' pad={{"horizontal": "small"}}>
                            //      <Box direction="row" margin="small" pad={{between: 'small'}} >
                            //           <Box justify='center' className='SolutionItemIcon'>
                            //                <SolutionIcon size='medium' />
                            //           </Box>
                            //           <Box margin="none" pad={{between: 'small'}}>
                            //                <Box direction="row" margin="none" pad={{between: 'small'}} > 
                            //                     <Heading tag='h5' strong={true} margin='none' style={{color:'#01a982'}} >
                            //                       ID:
                            //                     </Heading>
                            //                     <Heading tag='h5' strong={true} margin='none'>
                            //                       {value['id']}
                            //                     </Heading>
                            //                </Box>
                            //                <Box direction="row" margin="none" pad={{between: 'small'}} > 
                            //                     <Heading tag='h5' strong={true} margin='none' style={{color:'#01a982'}} >
                            //                       sessionID:
                            //                     </Heading>
                            //                     <Heading tag='h5' strong={true} margin='none'>
                            //                       {value['sessionID']}
                            //                     </Heading>
                            //                </Box>
                            //                <Box direction="row" margin="none" pad={{between: 'small'}} > 
                            //                     <Heading tag='h5' strong={true} margin='none' style={{color:'#01a982'}} >
                            //                       Created at:
                            //                     </Heading>
                            //                     <Heading tag='h5' strong={true} margin='none'>
                            //                       {value['timestamp']}
                            //                     </Heading>
                            //                </Box>
                            //           </Box>
                            //     </Box>
                           // </Header>
                                      
        if(this.props.title === 'Workload'){              
          var selectionstyleing;
               TileItems = this.state.WorkloadList.map( (value, index) => {

                 if(this.state.LoadItemIndex === index){
                   selectionstyleing='brand'                
                 }else{                 
                     selectionstyleing='accent-2-t'
                 }

                 return(<Box key={index} separator='top' align='start' className='LoadBoxInside' 
                                        onClick={ () => { this.setState({LoadItemIndex: index }) } }>
                                    
                                        <Header size='medium' pad={{"horizontal": "small"}}>
                                            <Box direction="row" margin="small" pad={{between: 'small'}} >
                                                  <Box justify='center' className='WorkloadItemIcon'>
                                                      <WorkLoadIcon size='medium' colorIndex={selectionstyleing} />
                                                  </Box>
                                                  <Box margin="none" pad={{between: 'none'}}>
                                                      <Box direction="row" margin="none" pad={{between: 'small'}} >                                                 
                                                            <Heading tag='h5' strong={true} margin='none'>
                                                              {value['alias']}
                                                            </Heading>
                                                      </Box>                                           
                                                      <Box direction="row" margin="none" pad={{between: 'small'}} > 
                                                            <Heading tag='h5' strong={false} margin='none' >
                                                            {value['timestamp']}
                                                            </Heading>                                                
                                                      </Box>
                                                  </Box>                                      
                                            </Box>
                                        </Header>
                                  </Box> );
                       
               });
        }else if(this.props.title === 'Solution'){
               TileItems = this.state.SolutionList.map( (value, index) => {
                 
                 if(this.state.LoadItemIndex === index){
                   selectionstyleing='brand'                
                 }else{                 
                     selectionstyleing='accent-3-t'
                 }

               return <Box key={index} separator='top' align='start' className={'LoadBoxInside ' + this.state.SelectedTabActive}
                           onClick={ () => { this.setState({LoadItemIndex: index }) } } >                          
                            <Header size='medium' pad={{"horizontal": "small"}}>
                                 <Box direction="row" margin="small" pad={{between: 'small'}} >
                                      <Box justify='center' className='SolutionItemIcon'>
                                           <SolutionIcon size='medium' colorIndex={selectionstyleing} />
                                      </Box>
                                      <Box margin="none" pad={{between: 'none'}}>
                                           <Box direction="row" margin="none" pad={{between: 'small'}} >                                                 
                                                <Heading tag='h5' strong={true} margin='none'>
                                                  {value['alias']}
                                                </Heading>
                                           </Box>                                           
                                           <Box direction="row" margin="none" pad={{between: 'small'}} > 
                                                <Heading tag='h5' strong={false} margin='none' >
                                                 {value['timestamp']}
                                                </Heading>                                                
                                           </Box>
                                      </Box>
                                </Box>
                            </Header>
                      </Box>        
               });
     
        }else{
          TileItems = 'No Data available.';
        }
        
    }
    // var TileItems = DataObj.Workloads.Workload.map( (value, index) => {
      // DataObj.Workloads.Workload.map( (value, index) => {
      //          return <Tile key={index} basis='1/2' separator='top' align='start' > 
      //                       <Header size='small' pad={{"horizontal": "small"}}>
      //                            <Box direction="row" margin="none" pad={{between: 'small'}} >
      //                                 <Box className='WorkloadItemIcon'>
      //                                   <WorkLoadIcon size='small' />
      //                                 </Box>
      //                                 <Box className='SolutionItemIcon'>
      //                                   <SolutionIcon size='small' />
      //                                 </Box>
      //                                 <Heading tag='h4' strong={true} margin='none'>
      //                                   {value['@ID']}
      //                                 </Heading>
      //                           </Box>
      //                       </Header>
      //                       <Box pad='small'>
      //                            <Heading tag='h4' strong={true} margin='none'> {value['@Name']} </Heading>
      //                       </Box>
      //                 </Tile>        
    // });

    return (
              <Box direction="column" margin="none" pad="none" style={{width: '100%', height:'100%'}} >
                   <Box direction="row" colorIndex="neutral-1" margin="none" pad="small" separator="bottom">
                        <Box direction="row" margin="none" pad="none" align='start' style={{width:'96%'}}>
                             <Heading tag="h4" strong={true} style={{marginBottom:'0px',color:'#01a982'}}>Your Saved {this.props.title}(s)</Heading>
                        </Box>
                        <Box direction="row" margin="none" pad="none" align='start' alignContent="start" onClick={ () => this.props.onClose(false) } >
                             <Close size='small' colorIndex='light-2' className="CloseIconStyle" />
                        </Box>
                   </Box>
                   <Box direction="row" margin="none" style={{padding:'12px 12px 0px 12px'}} >
                        <Heading tag="h4" strong={false} margin='none' >
                            Please select an item to load:
                        </Heading>
                  </Box>
                  <Box className='LoadScrTileContainer' margin="none" pad="small" separator="bottom">
                        <Box direction="row" margin="none" pad="none" >
                              { TileItems }
                        </Box>                                                                                                                    
                  </Box>     
                  <Box direction="row" margin="small" justify='end' separator="none" pad={{between:'small'}} >
                      { this.state.LoadItemIndex === '' ?
                          <Button primary={false} label='Load' />
                        :
                          <Button primary={false} label='Load' onClick={ () => this.onLoad(this.state.LoadItemIndex) } />
                      }
                          <Button primary={false} label='Cancel' onClick={ () => this.props.onClose(false) } critical={true} />
                  </Box>
              </Box>                          
              
    );
  }
}

const mapStateToProps = (state) => {  
  return{
      allSessions:state.sessions.sessions,
      activeSession: state.sessions.activeSession,
      DefaultInputs: state.sessions.sessionDefaults.inputs,
      userData: state.sessions.userData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onAddSession: (id,name) =>
      {              
          dispatch(addSession(id,name));
      },
      onLoadWokload: (userData) =>
      {              
          dispatch(loadSessionList( userData ) );
      },
      onLoadSession: (selectedID) =>
      {              
          dispatch(loadSessionItem( selectedID ) );
      },
      onNewSession:(workload) => {
        dispatch({type:'UPDATE_SIZER_WORKLOAD',payload:workload})
      },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LoadFiles);



