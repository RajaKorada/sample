import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Legend from 'grommet/components/Legend';
import Value from 'grommet/components/Value';
import SunBurst from 'grommet/components/SunBurst';
import { connect } from 'react-redux';
import {fetchGRBomInput} from '../../State/actions/sessions';
let BOMSitesList=[];
let BOMRolesList=[];
let ObjectOfRoles=[];
let TableContent=[];
let TableListitemsLength;
let TableContentSection=[];
var ServerColorlen=0;
var ServerServiceColorlen=0;
var StorageColorlen=0;
var StorageServiceColorlen=0;
let TotalPrice=0;
let SiteDropDown;
let BOMSection;
 let StorageTotal=0;
let ServerServicesTotal=0;
let StorageServiceTotal=0;
let ServiceTotal=0;
var IntialStates=true;
let CountryName; let PriceFileDate;let CountryWithDate;let CurrencySign='';
class BOM extends Component{
  constructor(){
      super();
      this.state={
          RoleName:'',
          siteName:'',
      }
      this.BOMPricePresentation=this.BOMPricePresentation.bind(this);
      this.BOMonSiteSelChange=this.BOMonSiteSelChange.bind(this);
      this.BOMonRoleSelChange=this.BOMonRoleSelChange.bind(this);
      this.TableConentFunc=this.TableConentFunc.bind(this);
  }

componentWillMount(){
     if(this.props.activeSession.GRBomInput!='' &&this.props.activeSession.GRBomInput !==undefined){
       IntialStates=true;
          this.state.BOMPriceFile=this.props.activeSession.GRBomInput;
      }

   //  this.BOMPricePresentation();
}
componentDidMount(){
 if(this.props.activeSession.GRBomInput==''){
      if(this.props.actvSoln === undefined || this.props.actvSoln === null){
                var sessionObject = {"SessionID":this.props.activeSession.id };
                this.props.onfetchGRBomInput(sessionObject);
      }else{
                var sessionObject = {"SessionID":this.props.activeSession.id, "EPASolutionType": this.props.actvSoln };
                this.props.onfetchGRBomInput(sessionObject);
      }
     
    this.state.BOMPriceFile=this.props.activeSession.GRBomInput;
      
  }
}

componentWillReceiveProps(nextProps, nextState){
    if(nextProps.activeSession.GRBomInput !== this.props.activeSession.GRBomInput ){      
      this.state.BOMPriceFile =nextProps.activeSession.GRBomInput;
    }
} 

BOMonRoleSelChange(e){
   IntialStates=false;
      ServerColorlen =0;StorageColorlen =0;ServerServiceColorlen=0;StorageServiceColorlen =0
    TableContent.length=[];
    console.log(ObjectOfRoles);
    console.log(this.state.siteName);
    this.state.BOMPriceFile.RoleBOM.map((val,id)=>{

                if(BOMSitesList.length>0){
                 if(val["@SiteName"]== this.state.siteName && val["@Name"]==e.option){
                      TableContent=[...TableContent,val];
                 }
                }else{
                    if( val["@Name"]==e.option){
                       TableContent=[...TableContent,val];    
                 }
                }
            
   });
  //  ObjectOfRoles.map((val,id)=>{
  //      if(val["@Name"]==e.option){
  //          TableContent=[...TableContent,val]
  //      }
  //  });
   this.TableConentFunc(TableContent,e.option);
   this.setState({RoleName:e.option});
}

TableConentFunc(data,e){

     if(TableContent.length ==0){
    data.map((val,id)=>{
                    if(val["@Name"] == e){
                      TotalPrice=0;ServerServicesTotal=0;ServiceTotal=0; StorageTotal=0;StorageServiceTotal=0;

                    TableContentSection =  val.ConsolidatedBOM.TableData.map((obj,idx)=>{      

                       var PriceValue;
                               if(obj["Price"]=='NA' ||obj["Price"]=='NaN'){
                                    obj["Price"]='0'      
                               }
                             if(obj["Price"].indexOf(',')>-1){
                                  var PriceValue= obj["Price"]
                             }else{                          
                               var n=   parseInt(obj["Price"]);
                               var parts = n.toFixed(2).split(".");
                                PriceValue = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString();
                           
                             }

                          var PriceCostQty;
                          if(obj["CostAtQty"]=="NA"){
                                  obj["CostAtQty"]='0';
                               }
                             if(obj["CostAtQty"].indexOf(',')>-1){
                                  var PriceCostQty= obj["CostAtQty"]
                             }else{                          
                               var n=   parseInt(obj["CostAtQty"]);
                               var parts = n.toFixed(2).split(".");
                                PriceCostQty = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString();              
                             }


                    TotalPrice= TotalPrice + parseInt(obj["CostAtQty"].replace(/,/g, ""));
                      var RowBgColor;
                        if( obj["@Type"] =="ServerFamilyTotal" || obj["@Type"] =="ModelsTotal" || obj["@Type"] == "NICTotal" || obj["@Type"] =="DiskTotal" || obj["@Type"]== "ProcessorTotal" || obj["@Type"]=="MemoryTotal" ||obj["@Type"]==""){                        
                               if(obj["Description"].indexOf('Storage')>-1){
                                      RowBgColor ="rgba(95,122,118,0.8)";
                                      StorageColorlen =StorageColorlen+1; 
                                      StorageTotal= StorageTotal + parseInt(obj["CostAtQty"].replace(/,/g, ""));
                               }else{
                                 RowBgColor ="rgba(66,85,99,0.8)";
                                 ServerColorlen = ServerColorlen+1;
                                 ServiceTotal= ServiceTotal + parseInt(obj["CostAtQty"].replace(/,/g, ""));
                               }                    
                        }else if(obj["@Type"] =="ServicesTotal"){
                              RowBgColor ="rgba(128,116,110,0.8)";
                              ServerServiceColorlen =ServerServiceColorlen +1;
                              ServerServicesTotal= ServerServicesTotal + parseInt(obj["CostAtQty"].replace(/,/g, ""));
                        }else{
                           if(obj["@Type"] == undefined){
                               if(obj["Description"].indexOf("Service") >-1 || obj["Description"].indexOf("SVC") >-1 ){
                              RowBgColor ="rgba(118,118,118,0.8)"; 
                              StorageServiceColorlen =StorageServiceColorlen +1;
                              StorageServiceTotal= StorageServiceTotal + parseInt(obj["CostAtQty"].replace(/,/g, ""));
                                }else{
                                      RowBgColor ="rgba(95,122,118,0.8)";
                                      StorageColorlen =StorageColorlen+1; 
                                      StorageTotal= StorageTotal + parseInt(obj["CostAtQty"].replace(/,/g, ""));
                                }
                           }
                        }                      
                         var PartNumberText=0;
                      if(typeof obj["PartNumber"] ==="object"){
                            if(obj["PartNumber"] ==null){
                               PartNumberText=""
                            }else{
                               PartNumberText= obj["PartNumber"]["#text"];
                            }         
                      }else{                    
                                  PartNumberText=obj["PartNumber"];    
                      }
                        if(PartNumberText==""){

                        }else{
                          return(
                             <TableRow style={{backgroundColor: RowBgColor}}>
                            
                                <td>{obj["Qty"]}</td>
                                <td>{PartNumberText} </td>
                                <td>{obj["Description"]}</td>
                                <td>{obj["Status"]}</td>
                                <td>{PriceValue}</td>
                                <td>{PriceCostQty}</td>
                                </TableRow>
                       ); 
                        }
                    });
              TableListitemsLength =val.ConsolidatedBOM.TableData.length;
             console.log(TableListitemsLength);

                    }
                    else{

                    }
        });
     }else{
        TotalPrice=0;ServerServicesTotal=0;ServiceTotal=0;StorageTotal=0;StorageServiceTotal=0;
          
           if(Array.isArray(TableContent[0].ConsolidatedBOM.TableData)){
              
                }else{
                   var z = [];
                   z[0] =TableContent[0].ConsolidatedBOM.TableData;
                   TableContent[0].ConsolidatedBOM.TableData= z;                                 
                }

           TableContentSection= TableContent[0].ConsolidatedBOM.TableData.map((val,id)=>{
                             var PriceValue;
                              if(val["Price"]=='NA' ||val["Price"]=='NaN'){
                                    val["Price"]='0'      
                               }
                             if(val["Price"].indexOf(',')>-1){
                                  var PriceValue= val["Price"]
                             }else{                          
                               var n=   parseInt(val["Price"]);
                               var parts = n.toFixed(2).split(".");
                                PriceValue = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString();
                           
                             }
                               var PriceCostQty;

                               if(val["CostAtQty"]=="NA"){
                                  val["CostAtQty"]='0';
                               }
                             if(val["CostAtQty"].indexOf(',')>-1){
                                  var PriceCostQty= val["CostAtQty"]
                             }else{                          
                               var n=   parseInt(val["CostAtQty"]);
                               var parts = n.toFixed(2).split(".");
                                PriceCostQty = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString();              
                             }


              TotalPrice =TotalPrice + parseInt(val["CostAtQty"].replace(/,/g, ""));
                  var RowBgColor;
           if(val["@Type"] =="ServerFamilyTotal" || val["@Type"] =="ModelsTotal" ||val["@Type"] == "NICTotal"|| val["@Type"] =="DiskTotal" || val["@Type"]== "ProcessorTotal" ||val["@Type"]=="MemoryTotal" || val["@Type"]==""){
                           
                           
                                  if(val["Description"].indexOf('Storage')>-1){
                                      RowBgColor ="rgba(95,122,118,0.8)";
                                      StorageColorlen =StorageColorlen+1; 
                                      StorageTotal= StorageTotal + parseInt(val["CostAtQty"].replace(/,/g, ""));
                               }else{
                                  RowBgColor ="rgba(66,85,99,0.8)";
                                   ServerColorlen = ServerColorlen+1;
                                   ServiceTotal =ServiceTotal + parseInt(val["CostAtQty"].replace(/,/g, ""));
                               }
                                 
                       }else if(val["@Type"] =="ServicesTotal"){
                              RowBgColor ="rgba(128,116,110,0.8)";
                              ServerServiceColorlen =ServerServiceColorlen +1;
                              ServerServicesTotal= ServerServicesTotal + parseInt(val["CostAtQty"].replace(/,/g, ""));
                        }else{
                           if(val["@Type"] == undefined){
                              if(val["Description"].indexOf("Service") >-1 || val["Description"].indexOf("SVC") >-1 ){
                                    RowBgColor ="rgba(118,118,118,0.8)"; 
                              StorageServiceColorlen =StorageServiceColorlen +1;
                              StorageServiceTotal= StorageServiceTotal + parseInt(val["CostAtQty"].replace(/,/g, ""));

                                }else{
                                    RowBgColor ="rgba(95,122,118,0.8)";
                                       StorageColorlen =StorageColorlen+1; 
                                      StorageTotal= StorageTotal + parseInt(val["CostAtQty"].replace(/,/g, ""));
                                }
                           }
                        }
                          
             var PartNumberText=0;
                      if(typeof val["PartNumber"] ==="object"){

                        if(val["PartNumber"] ==null){
                               PartNumberText="";
                            }else{
                               PartNumberText= val["PartNumber"]["#text"];
                            }
                        
                      }else{
                           PartNumberText=val["PartNumber"];   
                      }  

                            if( PartNumberText=="")  {
                            } else{                               
                        return(
                             <TableRow style={{backgroundColor:RowBgColor}}>
                         
                                <td>{val["Qty"]}</td>
                                <td>{PartNumberText} </td>
                                <td>{val["Description"]}</td>
                                <td>{val["Status"]}</td>
                                <td>{PriceValue}</td>
                                <td>{PriceCostQty}</td>
                                </TableRow>

                               );
                            }
                         });
             TableListitemsLength =TableContent[0].ConsolidatedBOM.TableData.length;
             console.log(TableListitemsLength);
            console.log(TableContent); 
     }

 
}
BOMonSiteSelChange(e){
   IntialStates=false;
      ServerColorlen =0,StorageColorlen =0,ServerServiceColorlen=0
    TableContent.length=[];
    ObjectOfRoles.length=[];
     BOMRolesList.length=[];
     var selection =e.option;
     console.log(e);
     this.state.BOMPriceFile.RoleBOM.map((val,id)=>{
       if(val["@SiteName"]==selection){
           BOMRolesList=[...BOMRolesList,val["@Name"]];
          ObjectOfRoles=[...ObjectOfRoles,val];
       }    
    });

     this.TableConentFunc(ObjectOfRoles,BOMRolesList[0]);
     this.setState({RoleName:BOMRolesList[0],siteName:e.option});
  }
BOMPricePresentation(){
    ServerColorlen =0,StorageColorlen =0;ServerServiceColorlen=0;
    BOMRolesList.length=[];
    BOMSitesList.length=[];
    this.state.BOMPriceFile.RoleBOM.map((val,id)=>{


       var  SiteName =val["@SiteName"];
       var  RoleName =val["@Name"];

       if(val["@SiteName"] !==undefined && val["@SiteName"] !==""){
             if(BOMSitesList.indexOf(SiteName)==-1){
                BOMSitesList=[...BOMSitesList,SiteName];
             }
       }          
         if(BOMRolesList.indexOf(RoleName)==-1){
             BOMRolesList=[...BOMRolesList,RoleName];
         }        
     });
   
     TotalPrice=0;ServerServicesTotal=0;ServiceTotal=0;StorageServiceTotal=0;StorageTotal=0;
         if(this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM["@Country"] =="United States"){
              CountryName =this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM["@Country"] +" [$]" ;
              CurrencySign="$";
         }else{
            CountryName =this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM["@Country"] +" [" +this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM["@Currency"] +"]" ;
               CurrencySign=this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM["@Currency"]   ;
      
      }
   
    
   
   
      PriceFileDate =this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM["@PriceFileDate"];
                 CountryWithDate=  CountryName + ' - '+ PriceFileDate
                if(Array.isArray( this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM.TableData)){
              
                }else{
                   var z = [];
                   z[0] = this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM.TableData;
                   this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM.TableData = z;                                 
                }
         
         TableContentSection = this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM.TableData.map((rowvalue,id)=>{
                            var PriceValue;
                              if(rowvalue["Price"]=='NA' ||rowvalue["Price"]=='NaN'){
                                    rowvalue["Price"]='0'      
                               } 
                             if(rowvalue["Price"].indexOf(',')>-1){
                                  var PriceValue= rowvalue["Price"]
                             }else{                          
                               var n=   parseInt(rowvalue["Price"]);
                               var parts = n.toFixed(2).split(".");
                                PriceValue = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString();              
                             }   
                              var PriceCostQty;
                              if(rowvalue["CostAtQty"]=="NA"){
                                  rowvalue["CostAtQty"]='0';
                               }
                             if(rowvalue["CostAtQty"].indexOf(',')>-1){
                                  var PriceCostQty= rowvalue["CostAtQty"]
                             }else{                          
                               var n=   parseInt(rowvalue["CostAtQty"]);
                               var parts = n.toFixed(2).split(".");
                                PriceCostQty = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString();              
                             } 
          
                      var RowBgColor;
                     TotalPrice = TotalPrice + parseInt(rowvalue["CostAtQty"].replace(/,/g, ""));
                        if(rowvalue["@Type"] =="ServerFamilyTotal" || rowvalue["@Type"] =="ModelsTotal" ||rowvalue["@Type"] == "NICTotal"|| rowvalue["@Type"] =="DiskTotal" || rowvalue["@Type"]== "ProcessorTotal" || rowvalue["@Type"]=="MemoryTotal" ||rowvalue["@Type"]==""){
                                 
                                  if(rowvalue["Description"].indexOf('Storage')>-1){
                                      RowBgColor ="rgba(95,122,118,0.8)";
                                      StorageColorlen =StorageColorlen+1; 
                                      StorageTotal= StorageTotal + parseInt(rowvalue["CostAtQty"].replace(/,/g, ""));
                               }else{
                                  RowBgColor ="rgba(66,85,99,0.8)";
                                   ServerColorlen = ServerColorlen+1;
                                   ServiceTotal =ServiceTotal + parseInt(rowvalue["CostAtQty"].replace(/,/g, ""));
                               }
                                 
                                 
                                 
                                   
                        }else if(rowvalue["@Type"] =="ServicesTotal"){
                              RowBgColor ="rgba(128,116,110,0.8)";
                              ServerServiceColorlen =ServerServiceColorlen +1;
                              ServerServicesTotal= ServerServicesTotal + parseInt(rowvalue["CostAtQty"].replace(/,/g, ""));
                        }else{
                           if(rowvalue["@Type"] == undefined){

                               if(rowvalue["Description"].indexOf("Service") >-1 || rowvalue["Description"].indexOf("SVC") >-1 ){
                                    RowBgColor ="rgba(118,118,118,0.8)"; 
                              StorageServiceColorlen =StorageServiceColorlen +1;
                              StorageServiceTotal= StorageServiceTotal + parseInt(rowvalue["CostAtQty"].replace(/,/g, ""));

                                }else{
                                    RowBgColor ="rgba(95,122,118,0.8)";
                                       StorageColorlen =StorageColorlen+1; 
                                      StorageTotal= StorageTotal + parseInt(rowvalue["CostAtQty"].replace(/,/g, ""));
                                }
                           }
                        }
                    var PartNumberText=0;
                      if(typeof rowvalue["PartNumber"] ==="object"){
                          if(rowvalue["PartNumber"] ==null){
                               PartNumberText="";
                            }else{
                            PartNumberText= rowvalue["PartNumber"]["#text"];             
                            }                        
                      }            
                      else{
                                  PartNumberText=rowvalue["PartNumber"];                             
                      }
                       if( PartNumberText==""){

                       }else{
                          return(
                         
                             <TableRow id={id} style={{backgroundColor:RowBgColor}}>
                            
                                <td>{rowvalue["Qty"]}</td>
                                <td>{PartNumberText}</td>
                                <td>{rowvalue["Description"]}</td>
                                <td>{rowvalue["Status"]}</td>
                                <td>{PriceValue}</td>
                                <td>{PriceCostQty}</td>
                             </TableRow>

                               );
                       }
                      
         });
            
           TableListitemsLength =this.state.BOMPriceFile.RoleBOM[0].ConsolidatedBOM.TableData.length;   
           console.log(TableListitemsLength);
}

    render(){
        
      if( this.state.BOMPriceFile !== '' && this.state.BOMPriceFile !== undefined) {  
          if(IntialStates){
            this.BOMPricePresentation();
          }        
      }

      if(IntialStates){
          this.state.RoleName=BOMRolesList[0],
          this.state.siteName=BOMSitesList[0]
      }
      var fillColor;var ServerColorPercentage=0;var ServerServiceColorPercentage=0;var StorageServiceColorPercentage=0;
      var PercentageOfCOlor; var StorageColorPercentage=0;
      fillColor = 100 / TableListitemsLength;
      ServerColorPercentage = ServerColorlen * fillColor;
      StorageColorPercentage = StorageColorlen * fillColor;
      ServerServiceColorPercentage = ServerServiceColorlen * fillColor;
      StorageServiceColorPercentage = StorageServiceColorlen * fillColor;
    
      if(BOMSitesList.length>0){
                    SiteDropDown=  <Box direction='row' justify='start'  align='start'  wrap={true}  pad='none' margin='none'>
                                    <Heading margin="small"tag='h4' uppercase={false} strong={true}> Sites : </Heading>       
                                    <Select  options={BOMSitesList} multiple={false} value={this.state.siteName} onChange={(e)=>this.BOMonSiteSelChange(e)}/>                                 
                                </Box>
       }else{
       SiteDropDown=''
      }

        


        // if(ServiceTotal.indexOf('$') > -1){
        // }else{
        //     ServiceTotal=CurrencySign + ' ' +ServiceTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") ;
        // }

                
   if(this.state.BOMPriceFile !== '' && this.state.BOMPriceFile !==undefined){
           /* Assign comma to total sizes as per offline starts here */
        ServiceTotal=CurrencySign + ' ' +ServiceTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") ;
        StorageTotal=CurrencySign + ' ' +StorageTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") ;
        ServerServicesTotal=CurrencySign + ' ' +ServerServicesTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        StorageServiceTotal=CurrencySign + ' ' +StorageServiceTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        TotalPrice=CurrencySign + ' ' +TotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      BOMSection = 
                  <Box direction='row'justify='start' align='start' className="BOMDropdownMenu" wrap={true} pad='none' margin='none' style={{height:'100%'}} >
                   
                        <Box direction='row'justify='start' align='start' wrap={true} pad='small' margin='none' colorIndex='light-2' style={{width:'100%',height:'11%'}} separator ="bottom" >
                                  {SiteDropDown}
                                <Box direction='row' justify='start'  align='start'  wrap={true}  pad='none' margin='none'>
                                    <Heading margin="small"tag='h4' uppercase={false} strong={true}>Roles : </Heading> 
                                    <Select  options={BOMRolesList}   multiple={false}  value={this.state.RoleName} onChange={(e)=>this.BOMonRoleSelChange(e)}/> 
                                </Box>
                             
                            </Box>               
                 <Box direction="row" justify='start' align='start' className="BOMDTableMenu"  wrap={true} pad='small' margin='none'  style={{width:'100%',height:'84%',overflow:'auto'}}>
                   <Box  direction='row' justify='start' align='start' basis="2/3" wrap={true} pad='none' margin='none' colorIndex='light-2'  style={{height:'100%'}}>
                     <Table className="FixedHeaderTblBOM"scrollable={false} selectable={false} style={{height:'100%',overflow:'auto'}}>
                            <thead style={{backgroundColor:'#01a982'}}>
                                <tr>
                          
                                <th>Quantitiy</th>
                                <th> Part number</th>
                                <th> Description</th>
                                 <th>Status</th>
                                <th> List Price</th>
                                <th> Cost at Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                              {TableContentSection}
                               <TableRow >
                              
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{'Total Cost ('+CurrencySign+')'} </td>
                                <td>{TotalPrice.substring(2)}</td>
                             </TableRow>
                            </tbody>
                            </Table>

                 </Box>
                   <Box direction='row' justify='start' align='start' basis="1/3" wrap={true} pad='none' margin='none' colorIndex='light-2' style={{height:'100%'}}>
                        <SunBurst className="SunBurst" data={[
                                { "label": "root-1", "value": ServerColorPercentage, "colorIndex": "neutral-1"},
                                { "label": "root-2", "value": StorageColorPercentage , "colorIndex": "neutral-2"},
                                { "label": "root-3", "value":ServerServiceColorPercentage,"colorIndex": "neutral-3"},
                                { "label": "root-4", "value":StorageServiceColorPercentage,"colorIndex": "neutral-4"}
                            ]}
                            active={[0]}
                            label={<Legend series={[{ "label": "Price Date: ", "value": <Value className="ValueSizeText" value={CountryWithDate}   size='small' />
                        }]}/>} 
                        />
                        <Legend  className="TotalPricelistSunBurst" series={[{"label": "Server(SR)", "colorIndex": "neutral-1" ,"value":<Value className="ValueSizeText" value={ServiceTotal}   size='small' />
                        }, {"label": "Storage(ST)", "colorIndex": "neutral-2","value":<Value className="ValueSizeText" value={StorageTotal}   size='small' />
                      }, {"label": "Server Services(SRS) ", "colorIndex": "neutral-3" ,"value":<Value className="ValueSizeText" value={ ServerServicesTotal }   size='small' />
                      },
                       {"label": "Storage Services(STS)", "colorIndex": "neutral-4","value":<Value className="ValueSizeText" value={ StorageServiceTotal}   size='small' />
                      }, {"label": "Total Price: ", "colorIndex": "light-2","value":<Value className="ValueSizeText" value={TotalPrice}   size='small' />}
                        ]} />

                        </Box>
                    </Box>
                    </Box>
   }else{
     BOMSection = <Heading tag='h4' align='center' margin='medium' strong={false} >Loading...</Heading>  
   }   






        return(
          <Box margin="none" pad="none" full={true} justify='start' colorIndex='light-2'>
               {BOMSection}
          </Box>
        );
    }
}

const mapStateToProps = (state) => {  
  return{                
      activeSession: state.sessions.activeSession,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
   onfetchGRBomInput:(sessionID) =>{
        dispatch(fetchGRBomInput(sessionID));
      },
    };
};
//export default GrRackServerPresentation;
export default connect(mapStateToProps,mapDispatchToProps) (BOM);
