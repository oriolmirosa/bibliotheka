import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import pdfjsLib from 'pdfjs-dist'
import { PDFJS } from 'pdfjs-dist/web/pdf_viewer'
import styles from 'pdfjs-dist/web/pdf_viewer.css'
import { connect } from 'react-redux'
import store from '../../store'

class Viewer extends Component {
  constructor (props) {
    super(props)
    this.loadPdf = this.loadPdf.bind(this)
    this.loadPage = this.loadPage.bind(this)
    this.renderPage = this.renderPage.bind(this)

    this.state = {}
  }

  componentDidMount () {
    let pdfPath = '../../../data/PDF/2168444.pdf'
    pdfjsLib.PDFJS.workerSrc = '../../../build/js/pdf.worker.bundle.js'
    this.loadPdf(pdfPath)

    // let container = ReactDOM.findDOMNode(this.refs.container)
    // container.addEventListener('resize', this.resizePdf)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.widthPdf !== this.props.widthPdf) {
      for (let i = 1; i <= this.state.numPages; i++) {
        let textLayerDiv = ReactDOM.findDOMNode(this.refs['textLayerDiv'.concat(i)])
        var scale = newProps.widthPdf / this.state.textLayerWidth
        let CustomStyle = pdfjsLib.CustomStyle
        CustomStyle.setProp('transform', textLayerDiv,
            'scale(' + scale + ', ' + scale + ')')
        CustomStyle.setProp('transformOrigin', textLayerDiv, '0% 0%')
      }
    }
  }
  // resizePdf () {
  //   console.log(`resizePdf triggered`)
  //   for (let i = 1; i < this.state.pdf.numPages; i++) {
  //     let canvas = ReactDOM.findDOMNode(this.refs['canvas'.concat(i)])
  //     canvas.width = this.props.width
  //   }
  // }

  loadPdf (pdfPath) {
    pdfjsLib.getDocument(pdfPath).then(function (pdf) {
      this.setState({pdf: pdf})
      this.setState({numPages: pdf.numPages})
      this.loadPage(pdf, 1)
    }.bind(this))
  }

  loadPage (pdf, pageNumber) {
    pdf.getPage(pageNumber).then(function (page) {
      this.setState({page: page})
      this.renderPage(page, pageNumber)
      if (pageNumber < pdf.numPages) {
        this.loadPage(pdf, pageNumber + 1)
      }
    }.bind(this))
  }

  renderPage (pdfPage, pageNumber) {
    let container = ReactDOM.findDOMNode(this.refs.container)
    let canvas = ReactDOM.findDOMNode(this.refs['canvas'.concat(pageNumber)])
    let textLayerDiv = ReactDOM.findDOMNode(this.refs['textLayerDiv'.concat(pageNumber)])
    textLayerDiv.setAttribute('class', styles.textLayer)

    let scaleForWidth = container.offsetWidth / pdfPage.getViewport(1).width
    let viewport = pdfPage.getViewport(scaleForWidth)
    // console.log(`this.props.width: ${this.props.width}`)
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

    let canvasSizeRatio = canvas.height / canvas.width
    this.setState({canvasSizeRatio: canvasSizeRatio})

    ctx.scale(ratio, ratio)

    pdfPage.render({
      canvasContext: ctx,
      viewport: viewport
    }).then(function () {
      return pdfPage.getTextContent()
    }).then(function (textContent) {
      let textLayer = new PDFJS.TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        pageIndex: pageNumber - 1,
        viewport: viewport,
        enhanceTextSelection: true
      })

      textLayer.setTextContent(textContent)
      console.log(`textLayer.viewport.width: ${textLayer.viewport.width}`)
      this.setState({textLayerWidth: textLayer.viewport.width})
      textLayer.render()
    }.bind(this)).catch(function (reason) {
      console.error('Error: ' + reason)
    })
  }

  render () {
    let width = this.props.widthPdf
    let height = width * this.state.canvasSizeRatio
    let numbers = []
    for (var i = 1; i <= this.state.numPages; i++) {
      numbers.push(i)
    }
    let canvasses = numbers.map(function (num) {
      return (
        <div style={{position: 'relative'}}>
          <canvas key={'canvas' + num} style={{width: width, height: height}} ref={'canvas' + num} />
          <div key={'div' + num} style={{width: width, height: height}} ref={'textLayerDiv' + num} />
          <div key={'separator' + num} style={{height: 10 + 'px', backgroundColor: 'grey'}} />
        </div>
      )
    })

    return (
      <div ref='container'>
        {canvasses}
      </div>
    )
  }
}

// const mapStateToProps = function (store) {
//   console.log(`store.bibliotheka[3].width: ${store.bibliotheka[3].width}`)
//   return {
//     width: store.bibliotheka[3].width
//   }
// }

// export default connect(mapStateToProps)(Viewer)
export default Viewer