import React, { Component } from 'react';
import {connect} from 'react-redux';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Close from 'grommet/components/icons/base/Close';
import BrandHpeElementPath from 'grommet/components/icons/base/BrandHpeElementPath';

class CustomFooter extends Component {
      
    constructor(props) {
      super(props);
      this.state={
        OtherSizers:false
      }
      this.closePopUps=this.closePopUps.bind(this);
      this.OtherSizersClick=this.OtherSizersClick.bind(this);
    }
    
    OtherSizersClick(){
      this.setState({OtherSizers:true});
    }
    
    closePopUps(){
      this.setState({OtherSizers:false});
    }
        
  render() {

  var OtherSizersPlaceHolder;
  if(this.state.OtherSizers){
          OtherSizersPlaceHolder = <Box margin="none" pad="none" 
                                         className="OtherSizersContent" style={{width:'13%',height:'20%'}}>                                                                                  
                                         <Box margin="none" pad="none" 
                                              style={{backgroundColor:'#fff', border: '2px solid #614767'}} className="">
                                            <Box margin="none" pad="none" align='end' onClick={this.closePopUps} >
                                              <Close size='small' className="CloseIconStyle" />
                                            </Box>
                                            <Box margin="none" pad="small" align='end' >
                                                <span style={{width:'100%',textAlign:'center'}} className='secondary'> 
                                                    Information on Other Sizers available </span>
                                            </Box>
                                         </Box>
                                         <Box margin="none" pad="none" >
                                              <Box margin="none" pad="none" align="center" 
                                                   className="triangle-down" style={{margin:'auto'}} />
                                         </Box>
                                   </Box>
    }else{
        OtherSizersPlaceHolder="";
    }


    return (
      <Box margin='none' pad='none'>
       {/*  <Footer colorIndex="light-2" justify='between' pad={{horizontal:'small'}} >         
            <BrandHpeElementPath colorIndex='brand' size='medium' /> 
            <Paragraph margin='none'>© Copyright 2018 Hewlett Packard Enterprise </Paragraph>           
            <Box direction='row' align='center' pad={{"between": "medium"}}>      
              {OtherSizersPlaceHolder}
              <Menu direction='row'  size='small'dropAlign={{"right": "right"}}>
                <Anchor style={{cursor:'Default'}}> Version 18.0.0 </Anchor>
                {/* <Anchor onClick={this.OtherSizersClick} className="OtherSizersHover" > Other Sizers </Anchor> 
                <Anchor href="https://www.hpe.com/us/en/privacy/ww-privacy-statement.html" 
                        target="_blank" style={{textDecoration:'none'}}>Privacy Policy</Anchor>       
                 <Anchor href="mailto:ese_aa_solutions@hpe.com?Subject=HPE%20sizing%20tool%20for%20SAP%20Business%20Suite%20powered%20by%20HANA%20(Online%20Client)%20-%20Version%2018.0.0"> Contact</Anchor>          
              </Menu>
            </Box> 
       </Footer>  */}
       </Box>
    );
  }
}


const mapStateToProps = (state) => {  
  return{      
      activeSession: state.sessions.activeSession
    };
  };

export default connect(mapStateToProps,null) (CustomFooter);
