import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import pdfjsLib from 'pdfjs-dist'

class Viewer2 extends Component {
  constructor (props) {
    super(props)

    this.loadPdf = this.loadPdf.bind(this)
  }

  componentDidMount () {
    this.loadPdf()
  }

  loadPdf () {
    pdfjsLib.PDFJS.workerSrc = '../../build/dist/build/pdf.worker.js'

    // Some PDFs need external cmaps.
    //
    // PDFJS.cMapUrl = '../../build/dist/cmaps/'
    // PDFJS.cMapPacked = true

    var DEFAULT_URL = '../../../data/PDF/2168444.pdf'
    var SEARCH_FOR = '' // try 'Mozilla'

    var container = document.getElementById('viewerContainer')

    // (Optionally) enable hyperlinks within PDF files.
    var pdfLinkService = new pdfjsLib.PDFJS.PDFLinkService()

    var pdfViewer = new pdfjsLib.PDFJS.PDFViewer({
      container: container,
      linkService: pdfLinkService
    })
    pdfLinkService.setViewer(pdfViewer)

    // (Optionally) enable find controller.
    var pdfFindController = new pdfjsLib.PDFJS.PDFFindController({
      pdfViewer: pdfViewer
    })
    pdfViewer.setFindController(pdfFindController)

    container.addEventListener('pagesinit', function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = 'page-width'

      if (SEARCH_FOR) { // We can try search for things
        pdfFindController.executeCommand('find', {query: SEARCH_FOR})
      }
    })

    // Loading document.
    pdfjsLib.PDFJS.getDocument(DEFAULT_URL).then(function (pdfDocument) {
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument)

      pdfLinkService.setDocument(pdfDocument, null)
    })
  }

  render () {
    return (
      <div id="viewerContainer">
        <div id="viewer" class="pdfViewer"></div>
      </div>
    )
  }
}

export default Viewer2
