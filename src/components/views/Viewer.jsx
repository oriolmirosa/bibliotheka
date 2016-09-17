import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import pdfjsLib from 'pdfjs-dist'
import { PDFJS, getOutputScale } from 'pdfjs-dist/web/pdf_viewer'
import styles from 'pdfjs-dist/web/pdf_viewer.css'
// import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer'

// let lala = require('pdfjs-dist/web/pdf_viewer')

class Viewer extends Component {
  constructor (props) {
    super(props)
    this.loadPdf = this.loadPdf.bind(this)
    // this.renderPdf = this.renderPdf.bind(this)
  }

  componentDidMount () {
    this.loadPdf()
  }

  loadPdf () {

    // console.log('typeof TextLayerBuilder: ' + typeof pdfjsWeb)
    // console.log('TextLayerBuilder: ' + JSON.stringify(pdfjsWeb))

    let pdfPath = '../../../data/PDF/2168444.pdf'

    pdfjsLib.PDFJS.workerSrc = '../../../build/js/pdf.worker.bundle.js'

    // const reader = new FileReader()
    // reader.readAsArrayBuffer(pdfPath)
    // // reader.onloadend = () =>
    // pdfjsLib.PDFJS.getDocument(new Uint8Array(pdfPath))
    //   .then(function (pdf) {
    //     this.renderPdf(pdf)
    //   })
    // var loadingTask = pdfjsLib.getDocument(pdfPath)
    // loadingTask.promise.then(function (pdfDocument) {
    //   return pdfDocument.getPage(1).then(this.renderPdf(pdfPage))

    let container = ReactDOM.findDOMNode(this.container)
    var canvas = ReactDOM.findDOMNode(this.canvas)
    var textLayerDiv = ReactDOM.findDOMNode(this.textLayerDiv)
    textLayerDiv.setAttribute('class', styles.textLayer)

    var loadingTask = pdfjsLib.getDocument(pdfPath)
    loadingTask.promise.then(function (pdfDocument) {
      // Request a first page
      return pdfDocument.getPage(1).then(function (pdfPage) {
        // Display page on the existing canvas with 100% scale.
        // 

        var viewport = pdfPage.getViewport(container.offsetWidth / pdfPage.getViewport(1.0).width)
        console.log(`viewport: ${JSON.stringify(viewport)}`)
        canvas.width = viewport.width
        canvas.height = viewport.height
        console.log(canvas.width + ' ' + canvas.height)
        console.log(`canvas.clientWidth: ${canvas.clientWidth}`)
        console.log(`canvas.clientHeight: ${canvas.clientHeight}`)
        console.log(`container.width: ${container.offsetWidth}`)
        console.log(`container.height: ${container.offsetHeight}`)
        var ctx = canvas.getContext('2d')
        console.log(`context first: ${JSON.stringify(ctx)}`)

        function getOutputScale () {
          var pixelRatio = 'devicePixelRatio' in window ? window.devicePixelRatio : 1
          return {
            sx: pixelRatio,
            sy: pixelRatio,
            scaled: pixelRatio !== 1
          }
        }

        var outputScale = getOutputScale()
        // if (outputScale.scaled) {
        //   var cssScale = 'scale(' + (1 / outputScale.sx) + ', ' + (1 / outputScale.sy) + ')'
        //   console.log(`cssScale: ${cssScale}`)
        //   pdfjsLib.CustomStyle.setProp('transform', canvas, cssScale)
        //   pdfjsLib.CustomStyle.setProp('transformOrigin', canvas, '0% 0%')

        //   // if (textLayerDiv) {
        //   //   pdfjsLib.CustomStyle.setProp('transform', textLayerDiv, cssScale)
        //   //   pdfjsLib.CustomStyle.setProp('transformOrigin', textLayerDiv, '0% 0%')
        //   // }
        // }

        // container.style.height = canvas.height / 2
        // container.style.width = canvas.width / 2

        console.log(`context before: ${JSON.stringify(ctx)}`)

        // ctx._scaleX = outputScale.sx
        // ctx._scaleY = outputScale.sy
        // if (outputScale.scaled) {
        //   ctx.scale(outputScale.sx, outputScale.sy)
        // }

        console.log(`context after: ${JSON.stringify(ctx)}`)
        console.log(`viewport: ${JSON.stringify(viewport)}`)
        console.log(canvas.width + ' ' + canvas.height)

        // canvas.style.width = 481 * 2
        // canvas.style.height = 685 * 2

        var renderTask = pdfPage.render({
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

Viewer.defaultProps = {scale: 1.2}

export default Viewer
