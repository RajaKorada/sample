import React, { Component } from 'react';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';

class WorkInProgress extends Component {
    
  render() {
    
    return (
      <Box pad='small' margin='none' align='center' full={true} >
                <Heading tag='h3' align='center' margin='medium' strong={true} > Work In Progress </Heading>
                <Image src='../img/WorkInProgress.png' style={{width: '250px', height: '250px'}} />
      </Box>
    );
  }
}

export default WorkInProgress;