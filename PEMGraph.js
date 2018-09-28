import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Select from 'grommet/components/Select';
import Heading from 'grommet/components/Heading';
import GRInput from '../Datafiles/GRInput.json';

let SitesList=[];
let RolesList=[];
let SitesObjectlist=[];
let RolesObjectlist=[];
class  PEMGraph extends Component{
constructor(){
    super();
    this.state={
        siteName: '',
        RoleName: '',
        GrInputData:[]
    }
     this.GraphPresentation = this.GraphPresentation.bind(this);
     this.onSiteSelChange=this.onSiteSelChange.bind(this);
     this.onRoleSelChange=this.onRoleSelChange.bind(this);
}

onSiteSelChange(e){

     this.state.GrInputData.GraphicalInputs.PEMGraphs.PEMGraph.map((val,id)=>{
           if(val["-SiteName"]==e.option){
              SitesObjectlist=[...SitesObjectlist,val];
           }
       //     console.log(SitesObjectlist);
        });
  this.setState({siteName:e.option});
 
}
onRoleSelChange(e){

  SitesObjectlist.map((val,id)=>{
      if(RolesObjectlist["-RoleName"]==e.option){
        RolesObjectlist=[...RolesObjectlist,val];
    }
  });
  console.log(RolesObjectlist);
 this.setState({RoleName:e.option});
}
 componentDidMount(){
   console.log( SitesList);
 }
 componentWillMount(){
   this.state.GrInputData=GRInput;
     // this.GraphPresentation();
 }   

 GraphPresentation(){
      //    SitesList=[];
      // console.log(this.state.GrInputData);
      // this.state.GrInputData.GraphicalInputs.PEMGraphs.PEMGraph.map((val,id)=>{
      //      if(SitesList.indexOf(val["-SiteName"])==-1){
      //        SitesList=[...SitesList,val["-SiteName"]];          
      //       }else{

      //     }       

      //      if(RolesList.indexOf(val["-RoleName"])==-1){
      //         RolesList=[...RolesList,val["-RoleName"]];
      //      }else{           
      //      }    
      //   }); 
      //   console.log(RolesList);
      //   this.state.RoleName=RolesList[0];
      //   this.state.siteName=SitesList[0];
 }

render(){
        
    return(<Box margin="none" pad="none" full={true} justify='start'>
         <Box direction='row'justify='start' align='center' wrap={true} pad='small' margin='small' colorIndex='light-2'>
                 <Box direction='row' justify='start'  align='center'  wrap={true}  pad='small' margin='small' colorIndex='light-1'>
                    <Heading margin="small"tag='h4' uppercase={false} strong={true}> Sites : </Heading>       
                    <Select  options={SitesList} multiple={false} value={this.state.siteName} onChange={(e)=>this.onSiteSelChange(e)}/>                                 
                 </Box>
                 <Box direction='row' justify='start'  align='center'  wrap={true}  pad='small' margin='small' colorIndex='light-1'>
                    <Heading margin="small"tag='h4' uppercase={false} strong={true}>Roles : </Heading> 
                    <Select  options={RolesList}   multiple={false}  value={this.state.RoleName} onChange={(e)=>this.onRoleSelChange(e)}/> 
                 </Box>
                <Box direction='row' justify='start'  align='center'  wrap={true}  pad='small'  margin='small' colorIndex='light-1'>
                    <Heading margin="small"tag='h4' uppercase={false} strong={true}>Volume : </Heading> 
                    <Select placeHolder='None' options={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']}/>
                </Box>
         </Box>
        </Box>);
}
}

export default PEMGraph;