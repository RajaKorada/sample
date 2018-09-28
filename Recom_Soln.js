import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';

import CustomArticle from './CustomArticle';
import SANIcon from 'grommet/components/icons/base/Storage';
import DASIcon from 'grommet/components/icons/base/Database';

let RoleObj = {};

class RecomSoln extends Component {

  constructor(props) {
    super(props);
    this.state = {currentObj: this.props.RoleData};
  }

  componentWillReceiveProps(nextProps, nextState){
      if(this.props.RoleData !== nextProps.RoleData){
          this.setState({currentObj: nextProps.RoleData});
      }
  }

  render() {
      let RoleObj = this.state.currentObj;
      let MainServerName = null;
      let ProcDetails = null;
      let StorageDetails = null;
      let StorageVolumeDetails = null;
      let MemoryDetails = null;
      let MemoryDIMMDetails = null;
      
      if(RoleObj['RoleName'] !== 'Shared Storage'){
        if(RoleObj['Processor'] !== null && RoleObj['Processor'] !== '' && RoleObj['Processor'].length !== 0 ){
            MainServerName = RoleObj['Processor'];
        }
        if( RoleObj['ProcessorDetails'] !== null && RoleObj['ProcessorDetails'] !== '' && RoleObj['ProcessorDetails'].length !== 0 ){
            ProcDetails = RoleObj['ProcessorDetails'];
        }
        if( (RoleObj['HANA'] === undefined || RoleObj['HANA'] === 'false') && RoleObj['Memory'] !== null && RoleObj['Memory'].length !== 0 ){
            MemoryDetails = RoleObj['Memory'] + ' (Per Server)';
        }else{
            if( RoleObj['Memory'] !== null && RoleObj['Memory'] !== '' && RoleObj['Memory'].length !== 0 ){
                MemoryDetails = RoleObj['Memory'];
            }
            //   if(RoleObj['MemoryDIMMs'] !== '' && RoleObj['MemoryDIMMs'].length !== 0 ){
            //     MemoryDIMMDetails = RoleObj['MemoryDIMMs'];
            //   }
            //   MemoryDetails = RoleObj['Memory'];
            //   MemoryDIMMDetails = RoleObj['MemoryDIMMs'];
        }
        if(RoleObj['Storage'] !== null && RoleObj['Storage'] !== '' && RoleObj['Storage'].trim() !== 'GB Storage' && 
            RoleObj['Storage'].length !== 0 ){
            StorageDetails = RoleObj['Storage'];
        }
    //   if(RoleObj['StorageVolume'] !== undefined && RoleObj['StorageVolume'] !== '' && RoleObj['StorageVolume'] !== 'GB Storage' && RoleObj['ProcessorDetails'].length === 0 ){
    //       StorageVolumeDetails = RoleObj['StorageVolume'];
    //   }
      }

      let DASData = '';
      let SANData = '';

      if(RoleObj.DAS !== null && RoleObj.DAS !== '' && RoleObj.DAS.length !== 0 ){           
       // DAS variables
        let DASIntOnlineSpareQty = 0;
        let DASExtOnlineSpareQty = 0;
        let DASExtArrayQty = '';
        let DASExtArrayType = '';
        let DAS_InternalStorages = [];      
        let DAS_ExternalStorages = [];

        let DASIntDiskQty = 0;
        let DASExtDiskQty = 0;

       // if DAS.TableData is available
        if(RoleObj.DAS.TableData !== undefined){ 
            if ( Array.isArray( RoleObj.DAS.TableData ) ) {           
            // if DAS.TableData is an array
                RoleObj.DAS.TableData.map( (DASobj, index ) => {
                    if(DASobj.ArrayType === undefined){                              
                        DASIntDiskQty += parseInt(DASobj.DiskQty, 10);
                        DASIntOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
                        if(DASobj.DiskQty === '1'){
                            DAS_InternalStorages.push(DASobj.VolumeName+" - ("+DASobj.Disk+") "+DASobj.RaidLevel);
                        }else{
                            DAS_InternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");
                        }
                    }
                    else{
                        DASExtArrayType = DASobj.ArrayType;
                        DASExtDiskQty += parseInt(DASobj.DiskQty, 10);
                        DASExtOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
                        if(DASobj.DiskQty === '1'){
                            DAS_ExternalStorages.push(DASobj.VolumeName+" - ("+DASobj.Disk+") "+DASobj.RaidLevel);
                        }else{
                            DAS_ExternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");              
                        }
                    }
                });
            }else{
            // if DAS.TableData is an object
                if(RoleObj.DAS.TableData.ArrayType === undefined){ 
                    DASIntDiskQty += parseInt(RoleObj.DAS.TableData.DiskQty, 10);
                    DASIntOnlineSpareQty += parseInt(RoleObj.DAS.TableData.OnlineSpare, 10);
                    if(RoleObj.DAS.TableData.DiskQty === '1'){
                        DAS_ExternalStorages.push(RoleObj.DAS.TableData.VolumeName+" - ("+RoleObj.DAS.TableData.Disk+") "+RoleObj.DAS.TableData.RaidLevel+" Spares ("+RoleObj.DAS.TableData.OnlineSpare+") ");
                    }else{
                        DAS_InternalStorages.push(RoleObj.DAS.TableData.VolumeName+" - "+RoleObj.DAS.TableData.DiskQty+" Disks ("+RoleObj.DAS.TableData.Disk+") "+RoleObj.DAS.TableData.RAIDLevel+" Spares ("+RoleObj.DAS.TableData.OnlineSpare+") ");
                    }
                }else{
                    DASExtArrayType = RoleObj.DAS.TableData.ArrayType;
                    DASExtDiskQty += parseInt(RoleObj.DAS.TableData.DiskQty, 10);
                    DASExtOnlineSpareQty += parseInt(RoleObj.DAS.TableData.OnlineSpare, 10);
                    if(RoleObj.DAS.TableData.DiskQty === '1'){
                        DAS_ExternalStorages.push(RoleObj.DAS.TableData.VolumeName+" - ("+RoleObj.DAS.TableData.Disk+") "+RoleObj.DAS.TableData.RaidLevel+" Spares ("+RoleObj.DAS.TableData.OnlineSpare+") ");
                    }else{                            
                        DAS_ExternalStorages.push(RoleObj.DAS.TableData.VolumeName+" - "+RoleObj.DAS.TableData.DiskQty+" Disks ("+RoleObj.DAS.TableData.Disk+") "+RoleObj.DAS.TableData.RAIDLevel+" Spares ("+RoleObj.DAS.TableData.OnlineSpare+") ");
                    }
                }
            } 
        }else{
       // if DAS.TableData is not available          
          RoleObj.DAS.map( (DASobj, index) => {               
            if(DASobj.ArrayType === undefined){                              
               DASIntDiskQty += parseInt(DASobj.DiskQty, 10);
               DASIntOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
               if(DASobj.DiskQty === '1'){
                    DAS_InternalStorages.push(DASobj.VolumeName+" - ("+DASobj.Disk+") "+DASobj.RaidLevel+" Spares ("+DASobj.OnlineSpare+") ");
               }else{
                    DAS_InternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");
               }
            }else{
               DASExtArrayType = DASobj.ArrayType;
               DASExtDiskQty += parseInt(DASobj.DiskQty, 10);
               DASExtOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
               if(DASobj.DiskQty === '1'){
                    DAS_ExternalStorages.push(DASobj.VolumeName+" - ("+DASobj.Disk+") "+DASobj.RaidLevel+" Spares ("+DASobj.OnlineSpare+") ");
               }else{
                    DAS_ExternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");              
               }
            }                 
          });      
        } 
        
        let DASIntHeader = "Disk(DAS) - "+DASIntDiskQty+" Disks Spares ("+DASIntOnlineSpareQty+") (Per Server)";
        let DASExtHeader = '';

        if(RoleObj.DAS.StorageBoxes !== undefined){
            DASExtHeader = "Disk(DAS) - "+DASExtDiskQty+" Disks ("+RoleObj.DAS.StorageBoxes+" x "+DASExtArrayType+")";
        }else{
            DASExtHeader = "Disk(DAS) - "+DASExtDiskQty+" Disks ("+DASExtArrayType+") Spares ("+DASExtOnlineSpareQty+") (Per Server)";
        }
        
        // DASExtHeader = "Disk(DAS) - "+DASExtDiskQty+" Disks ("+DASExtArrayType+") Spares ("+DASExtOnlineSpareQty+") (Per Server)";
        
        let DASIntContent = '';
        let DASExtContent = '';

        if(DASIntDiskQty !== 0){
            DASIntContent = <CustomArticle ArticleBackgroundColor='light-2'
                               ContentBackgroundColor='light-1'
                               title={DASIntHeader}
                               titleIcon={<SANIcon size='small' colorIndex='#69506f' />}
                               content={<Box>
                                            { DAS_InternalStorages.map((value, index) => {
                                                return <li key={index} style={{maxWidth: '100%'}}>{value}</li>
                                              })
                                            } 
                                        </Box>} 
            />        
        }

        if(DASExtDiskQty !== 0){
            DASExtContent = <CustomArticle ArticleBackgroundColor='light-2'
                               ContentBackgroundColor='light-1'
                               title={DASExtHeader}
                               titleIcon={<SANIcon size='small' colorIndex='#69506f' />}
                               content={<Box>
                                            { DAS_ExternalStorages.map((value, index) => {
                                                return <li key={index} style={{maxWidth: '100%'}}>{value}</li>
                                              })
                                            } 
                                        </Box>} 
            />        
        }
        
        DASData = <Box id='CustomArticlesContainer' margin='none' pad={{between: 'small'}}>
                       {DASIntContent}
                       {DASExtContent}
                  </Box>
      }
    
      if(RoleObj.SAN['TableData'] !== undefined){              
       // SAN variables
        let SANExtOnlineSpareQty = 0;
        let SANExtArrayQty = '';     
        let SANExtArrayType = '';    
        let SAN_ExternalStorages = [];
        let SANExtDiskQty = 0;
             
       // if SAN.TableData is not available
        if(RoleObj.SAN.TableData === undefined){
        
        }else{
       // if SAN.TableData is available 
            SANExtArrayQty = RoleObj.SAN.StorageBoxes;
            if ( Array.isArray(RoleObj.SAN.TableData ) ) {
            // if SAN.TableData is an array
                RoleObj.SAN.TableData.map( (SANobj, index ) => {
                        SANExtArrayType = SANobj.ArrayType;
                        SANExtDiskQty += parseInt(SANobj.DiskQty, 10);
                        SANExtOnlineSpareQty += parseInt(SANobj.OnlineSpare, 10);
                        if(SANobj.DiskQty === '1'){
                            SAN_ExternalStorages.push(SANobj.VolumeName+" - ("+SANobj.Disk+") "+SANobj.RaidLevel);
                        }else{
                            SAN_ExternalStorages.push(SANobj.VolumeName+" - "+SANobj.DiskQty+" Disks ("+SANobj.Disk+") "+SANobj.RaidLevel);              
                        }
                });
            }else{
            // if SAN.TableData is an object
                SANExtArrayType = RoleObj.SAN.TableData.ArrayType;
                SANExtDiskQty += parseInt(RoleObj.SAN.TableData.DiskQty, 10);
                SANExtOnlineSpareQty += parseInt(RoleObj.SAN.TableData.OnlineSpare, 10);
                if(RoleObj.SAN.TableData.DiskQty === '1'){
                    SAN_ExternalStorages.push(RoleObj.SAN.TableData.VolumeName+" - ("+RoleObj.SAN.TableData.Disk+") "+RoleObj.SAN.TableData.RaidLevel);
                }else{
                    SAN_ExternalStorages.push(RoleObj.SAN.TableData.VolumeName+" - "+RoleObj.SAN.TableData.DiskQty+" Disks ("+RoleObj.SAN.TableData.Disk+") "+RoleObj.SAN.TableData.RaidLevel);
                }
            } 
       }                  

        let SANExtHeader = "Disk(SAN) - "+SANExtDiskQty+" Disks ("+SANExtArrayQty+" x "+SANExtArrayType+")";
        let SANExtContent = '';

        if(SANExtDiskQty !== 0){
            SANExtContent = <CustomArticle ArticleBackgroundColor='light-2'
                               ContentBackgroundColor='light-1'
                               title={SANExtHeader}
                               titleIcon={<SANIcon size='small' colorIndex='#69506f' />}
                               content={<Box>
                                            { SAN_ExternalStorages.map((value, index) => {
                                                return <li key={index} style={{maxWidth: '100%'}}>{value}</li>
                                              })
                                            } 
                                        </Box>} 
            />        
        }

        SANData = <Box id='CustomArticlesContainer' margin='none' pad={{between: 'small'}}>
                       {SANExtContent}
                  </Box>
      }
        
    return (
      <Box margin='none' pad='none' className='RecomSolnBox' >
        <Box size='xlarge' margin='none' pad='none' align='start' >
            { MainServerName === null ? null
                : <Heading tag='h5' style={{fontWeight: '500'}} margin='none' > {MainServerName} </Heading>
            }
            <Tiles selectable={false} fill={true} flush={true} align='start'
                   direction='row' margin='none' pad={{between: "small"}} >
                { ProcDetails === null || ProcDetails === '' ? null
                : <Tile basis='1/3'  style={{maxHeight:'220px'}}>
                    <Box direction='row' margin='none' pad='small' justify='between' style={{width:'100%'}}>
                        <Image style={{height: '100%', width: '20%'}} src="../img/Generic Processor.jpg" />
                        <Box margin='none' pad={{between:'small'}} style={{width:'80%', padding: '0px 12px'}}>
                            <Heading tag='h5' strong={true} margin='none'>Processor</Heading>
                            <Heading tag='h5' style={{fontWeight: '500'}} margin='none' > {ProcDetails} </Heading>
                        </Box>
                    </Box>
                  </Tile>
                }
                { MemoryDetails === null || MemoryDetails === '' ? null 
                : <Tile basis='1/3'  style={{maxHeight:'220px'}}>
                     <Box direction='row' margin='none' pad='small' justify='between' style={{width:'100%'}}>
                        <Image  src="../img/Generic Memory.jpg" style={{height: '100%', width: '20%'}} />
                        <Box margin='none' pad={{between:'small'}} style={{width:'80%', padding: '0px 12px'}}>
                            <Heading tag='h5' strong={true} margin='none'>Memory</Heading>
                            <Heading tag='h5' style={{fontWeight: '500'}} margin='none' > {MemoryDetails} </Heading>
                        </Box>
                     </Box>
                  </Tile>
                } 
                {/* MemoryDIMMDetails === null || MemoryDIMMDetails === '' ? null 
                : <Tile basis='1/3'  style={{maxHeight:'220px'}}>
                     <Box direction='row' margin='none' pad='small' justify='between' style={{width:'100%'}}>
                        <Image  src="../img/Generic Memory.jpg" style={{height: '100%', width: '20%'}} />
                        <Box margin='none' pad={{horizontal:'small'}} justify='between' style={{width:'80%'}}>
                            <Heading tag='h5' strong={true} margin='none'>Memory DIMM</Heading>
                            <Heading tag='h5' style={{fontWeight: '500'}} margin='none' > {MemoryDIMMDetails} </Heading>
                        </Box>
                     </Box>
                  </Tile>
                }  
                { StorageVolumeDetails === null || StorageVolumeDetails === '' ? null 
                : <Tile basis='1/3'  style={{maxHeight:'220px'}}>
                    <Box direction='row' margin='none' pad='small' justify='between' style={{width:'100%'}}>
                        <Image style={{height: '100%', width: '20%'}} src="../img/Generic Storage.jpg" />
                        <Box margin='none' pad={{horizontal:'small'}} justify='between' style={{width:'80%'}}>
                            <Heading tag='h5' strong={true} margin='none'>Storage Volume</Heading>
                            <Heading tag='h5' style={{fontWeight: '500'}} margin='none' > { StorageVolumeDetails } </Heading>
                        </Box>
                    </Box>
                  </Tile>   
                */}               
                { StorageDetails === null || StorageDetails === '' ? null 
                : <Tile basis='1/3'  style={{maxHeight:'220px'}}>
                    <Box direction='row' margin='none' pad='small' justify='between' style={{width:'100%'}}>
                        <Image style={{height: '100%', width: '20%'}} src="../img/Generic Storage.jpg" />
                        <Box margin='none' pad={{between:'small'}} style={{width:'80%', padding: '0px 12px'}}>
                            <Heading tag='h5' strong={true} margin='none'>Storage</Heading>
                            <Heading tag='h5' style={{fontWeight: '500'}} margin='none' > { StorageDetails } </Heading>
                        </Box>
                    </Box>
                  </Tile>   
                }             
            </Tiles>
        </Box>
        <Box margin='none' pad={{between: "small"}} >
            { DASData }
            { SANData }
        </Box> 
      </Box>
    );
  }
}

export default RecomSoln;
