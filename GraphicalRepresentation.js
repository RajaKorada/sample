import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import GrRackServerPresentation from './GrRackServerPresentation';
import GrRackServerInnerPresentation from'./GrRackServerInnerPresentation';
import PEMGraph from'./WorkInProgress';
import BOMGRpresentation from'./BOMGRpresentation';

class GraphicalRepresentation extends Component{
  constructor(){
     super();
     this.state={
        GrConditionalView:true,
        ActiveSitedata:'',
     }  
     this.RackView=this.RackView.bind(this);
     this.ReverttoRackview=this.ReverttoRackview.bind(this);
     this.onBomChange=this.onBomChange.bind(this);
  }
  onBomChange(){
      console.log("onBomChage");
  }
componentWillMount(){
     console.log(this.props.listItem);
 }
  RackView(e,a){
  //   console.log(a);
     this.setState({GrConditionalView:e,ActiveSitedata:a});
  }

  ReverttoRackview(e){
      this.setState({GrConditionalView:e});
  }

  render(){
    let  BOMDisplay;
     if(this.props.listItem){
         BOMDisplay =  ''
     }else{
           BOMDisplay =  <Tab title='BOM' >
                        <Box direction='row' margin="none" pad="none"  className="GrTabInnerSection" justify='start' align='center'style={{height:'100%',width:'100%'}}>
                            <BOMGRpresentation actvSoln={this.props.actvSoln} />                            
                        </Box>
                     </Tab>
     }

      return(
       <Box className="GRPResentPage GRPageLayoutsink"direction='row' margin="none" pad="small"  justify='start'   style={{width:'100% !import',height:'100%'}}>
        
     
         <Tabs justify='start'  style={{width:'100%'}}>
           <Tab title=' Graphical Representation '>
          <Box direction='row' margin="none" pad="none"  className="GrTabInnerSection" justify='start' align='center'style={{height:'100%',width:'100%!import'}}>
                  {this.state.GrConditionalView ? <GrRackServerPresentation actvSoln={this.props.actvSoln} StaticGRlist={this.props.listItem} RackserverView1={this.RackView} /> :<GrRackServerInnerPresentation RackserverView={this.ReverttoRackview} PassActiveSite={this.state.ActiveSitedata} />}    
                </Box>
           </Tab>
            {BOMDisplay}    
         </Tabs>
       </Box>
      );
  }
}

export default GraphicalRepresentation;
