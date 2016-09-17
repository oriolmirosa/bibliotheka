import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import pdfjsLib from 'pdfjs-dist'
import { PDFJS } from 'pdfjs-dist/web/pdf_viewer'
import styles from 'pdfjs-dist/web/pdf_viewer.css'

class Viewer extends Component {
  constructor (props) {
    super(props)
    this.loadPdf = this.loadPdf.bind(this)
  }

  componentDidMount () {
    this.loadPdf()
  }

  loadPdf () {
    let pdfPath = '../../../data/PDF/2168444.pdf'

    pdfjsLib.PDFJS.workerSrc = '../../../build/js/pdf.worker.bundle.js'

    let container = ReactDOM.findDOMNode(this.container)
    let canvas = ReactDOM.findDOMNode(this.canvas)
    let textLayerDiv = ReactDOM.findDOMNode(this.textLayerDiv)
    textLayerDiv.setAttribute('class', styles.textLayer)

    pdfjsLib.getDocument(pdfPath).then(function (pdfDocument) {
      return pdfDocument.getPage(1).then(function (pdfPage) {
        let scaleForWidth = container.offsetWidth / pdfPage.getViewport(1).width
        let viewport = pdfPage.getViewport(scaleForWidth)
        canvas.width = viewport.width
        canvas.height = viewport.height
        let ctx = canvas.getContext('2d')

        let devicePixelRatio = window.devicePixelRatio || 1
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1

        let ratio = devicePixelRatio / backingStoreRatio

        var oldWidth = canvas.width
        var oldHeight = canvas.height

        canvas.width = oldWidth * ratio
        canvas.height = oldHeight * ratio

        canvas.style.width = oldWidth + 'px'
        canvas.style.height = oldHeight + 'px'

        ctx.scale(ratio, ratio)

        let renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport: viewport
        }).then(function () {
          return pdfPage.getTextContent()
        }).then(function (textContent) {
          let textLayer = new PDFJS.TextLayerBuilder({
            textLayerDiv: textLayerDiv,
            pageIndex: 0, // page_number - 1
            viewport: viewport
          })

          textLayer.setTextContent(textContent)
          textLayer.render()
        })
        return renderTask.promise
      })
    }).catch(function (reason) {
      console.error('Error: ' + reason)
    })
  }

  render () {
    return (
      <div ref={(ref) => this.container = ref} >
        <canvas ref={(ref) => this.canvas = ref} />
        <div ref={(ref) => this.textLayerDiv = ref} />
      </div>
    )
  }
}

export default Viewer
