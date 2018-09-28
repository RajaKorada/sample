import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import FormUp from 'grommet/components/icons/base/FormUp';
import FormDown from 'grommet/components/icons/base/FormDown';
import Animate from 'grommet/components/Animate';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
let ConfigDetailsOfRackServers;
let ServerBOMItems;
var ConfigDetails=[];
var ActiveAccordianBgColor;
class ConfigureSolutionDetails extends Component{
  constructor(){
      super();
      this.state={
        contentVisible: true ,
        HeadingAcc:'Collapse Configure Solution',
        ActiveTabIndex1:[0],
        Activedata:'',
        animate:true
      }
       this.onDivClick=this.onDivClick.bind(this);
       this.loopConfigureItems=this.loopConfigureItems.bind(this);
       this.OpenParallelActive=this.OpenParallelActive.bind(this);
  }
  
OpenParallelActive(e){
     console.log(e);
     //  this.state.ActiveTabIndex1.length=[];
    //    var index=0;
    //    if(Array.isArray(this.props.MapContent.Item)){
    //     this.props.MapContent.Item.map((val,id)=>{     
    //      if(e==id){    
    //         //alert(id);              
    //            index=id;   
    //         }          
    //      });
    //    }else{      
    //    }
    ActiveAccordianBgColor=false;
      var array=[];
      array=e;
 this.setState({ActiveTabIndex1:array});
}
onDivClick(){
  if(!this.state.contentVisible){
 var  SetTitle= 'Collapse Configure Solution' 
  }else{
  var SetTitle = 'Expand Configure Solution' 
  }
  this.setState({ contentVisible: !this.state.contentVisible,HeadingAcc:SetTitle });
}
componentWillMount(){
            ConfigDetails = this.props.MapContent.Item;
           
}

  componentWillReceiveProps(nextProps, nextState){
  console.log(nextProps);
 console.log(this.state.ActiveTabIndex1);
//  this.setState({ActiveTabIndex1:this.state.ActiveTabIndex1});
  }

ChildAccordianActive(d,e){     
      console.log(d); 
      console.log(this.state.ActiveTabIndex1);
     //  this.state.ActiveTabIndex1.length=[];
       var index=0;
       if(Array.isArray(this.props.MapContent.Item)){
        this.props.MapContent.Item.map((val,id)=>{     
         if(d==val["@name"] && e==val["@description"]){                 
               index=id;   
            }          
         });
       }
  var array = [];
  array.push(index);
  ActiveAccordianBgColor =true;
  this.setState({ActiveTabIndex1:array});         
  this.setState({animate:true});


}




 loopConfigureItems(Arraydata){
  ConfigDetailsOfRackServers =  Arraydata.map((val,idx)=>{ 
                                                 if(val.Display ==undefined){
                                           }else{
                                                 if(val.Display["Node"].length<1){

                                                 }else{
                                                            if(val.Display["Node"].length>1){
                                           ServerBOMItems=   val.Display["Node"].map(function(data){

                                                             if(data["#text"] ==undefined){
                                                               if(data["@ChildHeading"]== "" && data["@Heading"] == "" && data["@SubHeading"]== "" ){

                                                               } else{           
                                                                if(data["SubItem"]==undefined){
                                                                       var FirstSpanWidth ='40%';
                                                                       var SecondSpanWidth ='60%';
                                                                         if(data["@SubHeading"]==""){
                                                                              FirstSpanWidth ='100%';
                                                                              SecondSpanWidth ='0%';
                                                                         }
                                                                 return(  <Box direction="column" margin="none" pad="none">
                                                                        <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                                            <span style={{width:FirstSpanWidth,fontSize:'0.885em',color:'#000'}}>{data["@Heading"]}</span>
                                                                            <span className='secondary' style={{fontSize:'0.785em',width: SecondSpanWidth,color:'#000'}}> {': '+ data["@SubHeading"]} </span>
                                                                        </ListItem> 
                                                                 </Box> );
                                                                }  else{   
                                                                      if(data["@SubHeading"]==""){
                                                                        return(      <Box direction="column" margin="none" pad="none">
                                                                                <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                                                    <span style={{width:'40%',fontSize:'0.885em',color:'#000'}}>{data["@Heading"]}</span>
                                                                                    <span className='secondary' style={{fontSize:'0.785em',width:'60%',color:'#000'}}> {': '+ data["SubItem"]} </span>
                                                                                </ListItem> 
                                                                            </Box>
                                                                        );
                                                                      }else{
                                                                           console.log( data["@SubHeading"]);
                                                                           console.log(data["SubItem"]);
                                                                           return(
                                                                            <Box direction="column" margin="none" pad="none">
                                                                            <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                                                <span style={{width:'40%',fontSize:'0.885em',color:'#000'}}>{data["@Heading"]}</span>
                                                                                <span className='secondary' style={{fontSize:'0.785em',width:'60%',color:'#000'}}> {': '+ data["@SubHeading"]} </span>
                                                                            </ListItem> 
                                                                            <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                                                <span style={{width:'40%',fontSize:'0.885em'}}>Volume</span>
                                                                                <span className='secondary' style={{fontSize:'0.785em',width:'60%',color:'#000'}}> {': ' +data["SubItem"]} </span>
                                                                            </ListItem> 
                                                                            </Box> );
                         
                                                                      }


                                                                
                                                                }
                                                                
                                                              } }else{
                                                                  if(data["@Heading"] =="" || data["@Heading"]==undefined){
                                                                    if(data["#text"].indexOf(':')>-1){
                                                                        var SplitText= data["#text"].split(':');
                                                                            return(
                                                                                <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                                            <span style={{width:'40%',fontSize:'0.885em',color:'#000'}}>{SplitText[0]} </span>
                                                                            <span className='secondary' style={{fontSize:'0.785em',width:'60%',color:'#000'}}> {': ' +SplitText[1]} </span>
                                                                    </ListItem> 
                                                                            );
                                                                    }
                                                                   }else{
                                                                            return(
                                                                            <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                                                <span style={{width:'40%',fontSize:'0.885em',color:'#000'}}>{data["@Heading"]}  </span>
                                                                                <span className='secondary' style={{fontSize:'0.785em',width:'60%',color:'#000'}}> {': ' + data["#text"]} </span>
                                                                            </ListItem>   
                                                                        );
                                                                   }
                                                              }
                                                             
                                                          })  
                                                 } else{

                                                 }         
                                                 }
                                           }


                                        return(
                                                      <AccordionPanel heading={val["@name"]}>
                                                      <List>
                                                        <ListItem align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                            <span style={{width:'40%',fontSize:'0.885em',color:'#000'}}>Role Name </span>
                                                            <span className='secondary' style={{fontSize:'0.785em',width:'60%',color:'#000'}}> {': '+ val["@name"]} </span>
                                                        </ListItem>
                                                        <ListItem  align="start" alignContent="start" justify='between' className="ListItemsCls">
                                                            <span style={{width:'40%',fontSize:'0.885em',color:'#000'}}>Description  </span>
                                                            <span style={{fontSize:'0.785em',width:'60%',color:'#000'}} className='secondary'> {': '+ val["@description"]} </span>
                                                        </ListItem>  
                                                        {ServerBOMItems}                    
                                                      </List>
                                                    </AccordionPanel >
                                                
                                          
                                        ); 
              });
}

    render(){
        var findActiveTab='';
          if(ActiveAccordianBgColor){
                 findActiveTab="AccordianActiveTabfind"
          }else{
            findActiveTab='';
          }
              if(Array.isArray( this.props.MapContent.Item)){
                  this.loopConfigureItems(this.props.MapContent.Item);   
              }else{
              var data=[];
               data.push(this.props.MapContent.Item);
               this.loopConfigureItems(data);  
              }
  
        return( 
            <Box margin="none" pad="none"  justify='start' colorIndex="light-2" style={{width:'100%',height:'100%'}} >
                 <Box direction='row' style={{padding:'5px',width:'100%',height:'7%'}} separator="bottom"  justify='between' onClick={this.onDivClick} >
                    <Box direction='row' pad="none">
                        <Heading tag='h4' strong={true} margin='none' style={{color:'#01a982'}}>{this.state.HeadingAcc} </Heading>
                    </Box>
                        {this.state.contentVisible ? <FormUp size='small' /> : <FormDown size='small' /> }
                  </Box>
                    <Box direction='row' pad="none" style={{height:'93%',overflow:'auto',width:'100%'}}>   
                      <Box direction='column' pad='none'  style={{width:'100%'}}>
                          <Animate visible={this.state.contentVisible} keep={false}
                      enter={{"animation": "slide-down", "duration": 200, "delay": 0}} >       
                        <Accordion  active={this.state.ActiveTabIndex1} className={findActiveTab} animate ={this.state.animate} onActive={(e)=>this.OpenParallelActive(e)} openMulti={true}>
                           {ConfigDetailsOfRackServers}
                          </Accordion>   
                          </Animate>    
                      </Box>                       
             </Box>
            </Box>
        );
    }
}
export default ConfigureSolutionDetails;
