import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import {fetchBOMString} from '../../State/actions/sessions';
// import Button from 'grommet/components/Button';
// import List from 'grommet/components/List';
// import Paragraph from 'grommet/components/Paragraph';
import DocumentExcel from 'grommet/components/icons/base/DocumentExcel';
import DocumentPdf from 'grommet/components/icons/base/DocumentPdf';
import Button from 'grommet/components/Button';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
// import Headline from 'grommet/components/Headline';
import LinkNext from 'grommet/components/icons/base/LinkNext';
import Mail from 'grommet/components/icons/base/Mail';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import TableHeader from 'grommet/components/TableHeader';
import BOMPriceFile from '../../Datafiles/BOMPriceFile.json';
import renderHTML from 'react-render-html';
import html2canvas from 'html2canvas';
import  jsPDF from 'jspdf';
import $ from 'jquery';
import {serviceUrl} from '../../AppConfig';
let TableContentMap;
let PartNumberText;
let TotalTableContentMap;
let TotalPrice;
var StringX;

class BOM extends Component{
    constructor(props){
        super(props);
        this.state={
            BOMTableData:[]
        }
        this.tableDataBind=this.tableDataBind.bind(this);
        this.onBomSavePdf=this.onBomSavePdf.bind(this);
        this.downloadPDF=this.downloadPDF.bind(this);
        this.PDFConvertionDownload=this.PDFConvertionDownload.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);
    }

    componentWillMount(){
        this.tableDataBind();
    }

    componentDidMount(){    
        if(this.props.activeSession.bomView==''){
            if(this.props.actvSoln === undefined || this.props.actvSoln === null){
                var sessionObject = {"SessionID":this.props.activeSession.id };
                this.props.onFetchBOMString(sessionObject);
            }else{
                var sessionObject = {"SessionID":this.props.activeSession.id, "EPASolutionType": this.props.actvSoln };
                this.props.onFetchBOMString(sessionObject);
            }            
        }
    }

     exportToExcel(){
            // var sessionObject = {"SessionID":this.props.activeSession.id, "EPASolutionType": this.props.actvSoln };
            if(this.props.actvSoln === undefined || this.props.actvSoln === null){
                var sessionObject = {"SessionID":this.props.activeSession.id };
            }else{
                var sessionObject = {"SessionID":this.props.activeSession.id, "EPASolutionType": this.props.actvSoln };
            }
            var mapForm = document.createElement("form");
            mapForm.id = "FormExportBOM";
            mapForm.setAttribute("method","GET")
            mapForm.setAttribute("action",serviceUrl+"/SizingEngine/GenerateBOMDocumet");

            mapForm.target = "_blank";
                                     
            var mapInput = document.createElement("input");
            mapInput.id = "BomHTMLTemp";
            mapInput.type = "text";
            mapInput.name = "value";
            mapInput.value = this.props.activeSession.id.toString();

            mapForm.appendChild(mapInput);
            document.body.appendChild(mapForm);
            mapForm.submit();
            $("#FormExportBOM").remove();
    }

    tableDataBind(){ 
        TotalPrice=0;
        this.state.BOMTableData=BOMPriceFile;
        TotalTableContentMap = this.state.BOMTableData.Solution.RoleBOM.map((val,id)=>{
                TableContentMap = val.ConsolidatedBOM.TableData.map((data, index)=>{    
                            TotalPrice = TotalPrice + parseInt(data["CostAtQty"].replace(/,/g, ""));
                            if(typeof data["PartNumber"] ==="object"){
                                PartNumberText= data["PartNumber"]["#text"];
                            }else{
                                PartNumberText=data["PartNumber"];
                            } 
                            return(                  
                                <TableRow key={index}>
                                    <td>{data["Qty"]}</td> <td>{PartNumberText}</td> <td>{data["Description"]}</td>
                                    <td>{data["Status"]}</td><td>{data["Price"]}</td><td>{data["CostAtQty"]}</td>
                                </TableRow>
                            );
                });
            return( <tbody> { TableContentMap } </tbody> );
        });
    }

    onBomSavePdf(){

        html2canvas(document.querySelector("#PrintBOM")).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
            
                var   doc;
               if(canvas.width > canvas.height){
                       doc = new jsPDF('l', 'mm', [500, 700]);
                       doc.addImage(imgData, 'JPEG', 50, 50);
               }
               else{
                       doc = new jsPDF('p', 'mm', [380, canvas.width]);
                       doc.addImage(imgData, 'JPEG', 15, 15);       
          }
         doc.save("BOM.pdf");
        });
    
    }

    downloadPDF(url,name){
            
    }

    PDFConvertionDownload(url){

    }

    render(){
        StringX = this.props.activeSession.bomView;
        return(
 
                <Box  id="PrintBOM" style={{width:'100%',position:'relative'}} margin="none" pad="none" className="StringSection">                          
                    {renderHTML(StringX)}
 
                        <Box direction='row' margin="none" pad="none" className="StringSection" alignSelf="start" align="start" alignContent="start" style={{marginLeft:'1%',marginBottom:'10px'}}>
                           <Button primary={false} label='Save as Excel' style={{marginRight: '15px'}}  onClick={this.exportToExcel }/>
                        {/*   <Button primary={false} label='Open in mail' /> */}
                    </Box>           
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
   onFetchBOMString:(sessionID) =>{
        dispatch(fetchBOMString(sessionID));
      },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(BOM);
