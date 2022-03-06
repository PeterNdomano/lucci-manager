import React, { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { MAIN_URL } from '../Helper';
import { MdNavigateNext, MdNavigateBefore, MdZoomIn, MdZoomOut } from 'react-icons/md';
import $ from 'jquery';
//import FileViewer from 'react-file-viewer';

export default function BookReader(props){

  pdfjs.GlobalWorkerOptions.workerSrc =  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth ] = useState(0);
  //const [currentPage, setCurrentPage ] = useState(null);


  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    //props.loaderCallback(false);
  });

  function docLoaded({ numPages }){
    setNumPages(numPages);
    setPageNumber(1);
    setPageWidth($('#docReader').width())
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => {
      if((prevPageNumber + offset) >= 1 && (prevPageNumber + offset) <= numPages){
        $('#pg').val(prevPageNumber + offset);
        return (prevPageNumber + offset)
      }
      else{
        $('#pg').val(1);
        return 1;
      }
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function goTo(){
    let pg = $('#pg').val();
    if(pg <= numPages){
      setPageNumber(Number(pg));

    }
  }

  function zoomIn(){
    let newWidth = pageWidth + 50;
    setPageWidth(newWidth);
  }

  function zoomOut(){
    let newWidth = pageWidth - 50;
    setPageWidth(newWidth);
  }

  return (
    <div className="BookReader" id="bookReader">
      <div className="mToolbar">
        <div className="container">
          <div className="d-flex flex-row justify-content-between">
            <div className="align-self-center p-2">
              <button className="btn btn-sm btn-outline-dark" onClick={previousPage}><MdNavigateBefore size={24}/></button>
            </div>
            <div className="align-self-center">
              <div className="text-center" style={{width: "100px"}}>
                <label style={{ fontSize:"12px" }}>{pageNumber} of {numPages}</label><br/>
                <input className="form-control" type="number"  style={{ height: "30px !important", fontSize:"12px" }} id="pg" onChange={() => { goTo() }} onKeyDown={() => { goTo() }}  defaultValue={pageNumber}/>
              </div>
            </div>
            <div className="align-self-center p-2">
              <button className="btn btn-sm btn-outline-dark" onClick={nextPage}> <MdNavigateNext size={24}/></button>
            </div>
          </div>
        </div>
      </div>
      <div className="docReader text-center" id="docReader">
        <Document className="" file={MAIN_URL+props.url} onLoadSuccess={ docLoaded }>
          <Page width={pageWidth} pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="mToolbarBtm">
        <div className="container">
          <div className="d-flex flex-row justify-content-between">
            <div className="align-self-center p-2">
              <button className="btn" onClick={zoomIn}><MdZoomIn size={24}/></button>
            </div>
            <div className="align-self-center p-2">
              <button className="btn btn-sm btn-dark" style={{ fontSize:"12px"}} onClick={props.closer}>Go Back</button>
            </div>
            <div className="align-self-center p-2">
              <button className="btn" onClick={zoomOut}> <MdZoomOut size={24}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
