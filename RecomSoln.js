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

//   componentwillReceiveProps(nextProps, nextState){
//       console.log(this.props.RoleData.RoleName);
//       console.log(nextProps.RoleData.RoleName);
//     if(this.props.RoleData.RoleName !== nextProps.RoleData.RoleName){
//         this.setState({currentObj: nextProps.RoleData});
//     }
//   }

  render() {
      RoleObj = this.state.currentObj;
      let MainServerName = RoleObj.Processor;
      let ProcDetails = RoleObj.ProcessorDetails;
      let MemoryDetails = RoleObj.Memory+" (Per server) ";
      
      let DASIntOnlineSpareQty = 0;
      let DASExtOnlineSpareQty = 0;
      let DASExtArrayType = '';
      let DAS_InternalStorages = [];      
      let DAS_ExternalStorages = [];

      let DASIntDiskQty = 0;
      let DASExtDiskQty = 0;

      if(RoleObj.DAS.TableData !== undefined){
        // Object.key(RoleObj.DAS.TableData).map( (key, index) => {               
        //   if(DASobj.ArrayType === undefined){                              
        //       DASIntDiskQty += parseInt(DASobj.DiskQty, 10);
        //       DASIntOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
        //       DAS_InternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");
        //   }
        //   else{
        //       DASExtArrayType = DASobj.ArrayType;
        //       DASExtDiskQty += parseInt(DASobj.DiskQty, 10);
        //       DASExtOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
        //       DAS_ExternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");              
        //   }                 
        // });  
      }else{
        RoleObj.DAS.map( (DASobj, index) => {               
          if(DASobj.ArrayType === undefined){                              
              DASIntDiskQty += parseInt(DASobj.DiskQty, 10);
              DASIntOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
              DAS_InternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");
          }
          else{
              DASExtArrayType = DASobj.ArrayType;
              DASExtDiskQty += parseInt(DASobj.DiskQty, 10);
              DASExtOnlineSpareQty += parseInt(DASobj.OnlineSpare, 10);
              DAS_ExternalStorages.push(DASobj.VolumeName+" - "+DASobj.DiskQty+" Disks ("+DASobj.Disk+") "+DASobj.RAIDLevel+" Spares ("+DASobj.OnlineSpare+") ");              
          }                 
        });      
      } 
                    
      let DASIntHeader = "Disk(DAS) - "+DASIntDiskQty+" Disks Spares ("+DASIntOnlineSpareQty+") (Per Server)";
      let DASExtHeader = "Disk(DAS) - "+DASExtDiskQty+" Disks ("+DASExtArrayType+") Spares ("+DASExtOnlineSpareQty+") (Per Server)";

    return (
      <Box margin='none' pad='none' className='RecomSolnBox' >
        <Box size='xlarge' margin='none' pad='none' align='start' >
            <Heading tag='h4' style={{fontWeight: '500'}} margin='none' > {MainServerName} </Heading>
            <Tiles selectable={false} fill={true} flush={true} align='start'
                   direction='row' margin='small' pad={{between: "small"}} >
                <Tile >
                    <Box direction='row' margin='none' pad='small' justify='between'>
                        <Image style={{height: '60px', width: '60px'}} src="../img/Generic Processor.jpg" />
                        <Box margin='none' pad={{horizontal:'small'}} justify='between'>
                            <Heading tag='h4' strong={true} margin='none'>Processor</Heading>
                            <Heading tag='h4' style={{fontWeight: '500'}} margin='none' > {ProcDetails} </Heading>
                        </Box>
                    </Box>
                </Tile>
                <Tile >
                    <Box direction='row' margin='none' pad='small' justify='between'>
                        <Image style={{height: '60px', width: '60px'}} src="../img/Generic Memory.jpg" />
                        <Box margin='none' pad={{horizontal:'small'}} justify='between'>
                            <Heading tag='h4' strong={true} margin='none'>Memory</Heading>
                            <Heading tag='h4' style={{fontWeight: '500'}} margin='none' > {MemoryDetails} </Heading>
                        </Box>
                    </Box>
                </Tile>

            </Tiles>
        </Box>
        <Box id='CustomArticlesContainer' margin='none' pad={{between: 'small'}}>
                <CustomArticle ArticleBackgroundColor='light-2'
                               ContentBackgroundColor='light-1'
                               title={DASIntHeader} 
                               titleIcon={<DASIcon size='small' colorIndex='#69506f' />}
                               content={<Box>
                                            { DAS_InternalStorages.map((value, index) => {
                                                return <li key={index} style={{maxWidth: '100%'}}>{value}</li>
                                              })
                                            } 
                                        </Box>
                               } />
                <CustomArticle ArticleBackgroundColor='light-2'
                               ContentBackgroundColor='light-1'
                               title={DASExtHeader}
                               titleIcon={<SANIcon size='small' colorIndex='#69506f' />}
                               content={<Box>
                                            { DAS_ExternalStorages.map((value, index) => {
                                                return <li key={index} style={{maxWidth: '100%'}}>{value}</li>
                                              })
                                            } 
                                        </Box>} />
        </Box>        
      </Box>
    );
  }
}

export default RecomSoln;
