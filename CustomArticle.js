import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Animate from 'grommet/components/Animate';
import FormUp from 'grommet/components/icons/base/FormUp';
import FormDown from 'grommet/components/icons/base/FormDown';

class CustomArticle extends Component {
    
  constructor(props) {
    super(props);
    this.state = { contentVisible: true }
    this.onDivClick = this.onDivClick.bind(this);
  }
  onDivClick(){
    this.setState({ contentVisible: !this.state.contentVisible });
  }

  render() {
    return (
      <Box colorIndex={this.props.ArticleBackgroundColor} style={{padding:'5px'}}>
            <Box direction='row' style={{padding:'5px'}} justify='between' onClick={this.onDivClick} >
                <Box direction='row' pad={{between:'small'}} >
                  {this.props.titleIcon}
                  <Heading tag='h4' strong={true} margin='none' style={{fontSize:'15px'}}>{this.props.title}</Heading>
                </Box>
                {this.state.contentVisible ? <FormUp size='small' /> : <FormDown size='small' /> }
            </Box>
        <Animate visible={this.state.contentVisible} keep={false}
                  enter={{"animation": "slide-down", "duration": 200, "delay": 0}} >            
                  <Box direction='column' pad='small' colorIndex={this.props.ContentBackgroundColor} >
                      {this.props.content}
                  </Box>        
        </Animate>   
      </Box>
    );
  }
}

export default CustomArticle;

