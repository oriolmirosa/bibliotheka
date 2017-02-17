import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import pdfjsLib from 'pdfjs-dist'
import { PDFJS } from 'pdfjs-dist/web/pdf_viewer'
import styles from 'pdfjs-dist/web/pdf_viewer.css'
import store from '../../store'
import { connect } from 'react-redux'

class Viewer extends Component {
  constructor (props) {
    super(props)
    this.loadPdf = this.loadPdf.bind(this)
    this.loadPage = this.loadPage.bind(this)
    this.renderPage = this.renderPage.bind(this)

    this.state = {canvasSizeRatio: 1}
  }

  componentDidMount () {
    let pdfPath = this.props.tabID === 0 ? this.props.pdfMainTab : '../../../data/PDF/' + this.props.pdf
    pdfjsLib.PDFJS.workerSrc = '../../../build/js/pdf.worker.bundle.js'
    this.loadPdf(pdfPath)
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
		if (this.props.tabID === 0 && newProps.pdfMainTab !== this.props.pdfMainTab) {
			this.loadPdf(newProps.pdfMainTab)
		}
  }

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
		let display = this.props.visible ? 'block' : 'none'
    let canvasses = numbers.map(function (num) {
      return (
        <div key={num} style={{position: 'relative', display: display}}>
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

const mapStateToProps = function (store) {
  let pdf
	store.refs.map(ref => {
		if (ref.selected) pdf = '../../../data/PDF/' + ref.pdf
	})
  return {
    pdfMainTab: pdf
  }
}

export default connect(mapStateToProps)(Viewer)
