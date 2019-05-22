import React, {Component} from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';
import './App.css'

class App extends Component{
  state={
    termino:'',
    imagenes:[],
    pagina:'',
    cargando:false,
    totalPaginas:''
  }
  consultarAPI= async()=>{
    const {termino}=this.state;
    const pagina=this.state.pagina;
    const url=`https://pixabay.com/api/?key=505870-2cf7a292cc13cc9603ff47b3a&q=${termino}&per_page=30&page=${pagina}`;
    
    await fetch(url)
        .then(respuesta=>{
          this.setState({cargando:true})
          return respuesta.json()
        })
        .then(resultado=>{
            let totalPaginas=Math.ceil(resultado.totalHits/30)
            this.setState({
              imagenes:resultado.hits,
              cargando:false,
              totalPaginas
            })
        })
  }
  datosBusqueda=(termino)=>{
    this.setState({
      termino: termino,
      pagina: 1
    },() => {
      this.consultarAPI();
    })
  }
  paginaAnterior=()=>{
    let pagina=this.state.pagina;
    if(pagina===1) return null;
    pagina -=1;
    this.setState({
      pagina
    },()=>{
      this.consultarAPI();
      this.scroll();
    })
  }
  paginaSiguiente=()=>{
    let pagina=this.state.pagina;
    let totalPaginas=this.state.totalPaginas;
    if(pagina===totalPaginas) return null;
    pagina +=1;
    this.setState({
      pagina
    },()=>{
      this.consultarAPI();
      this.scroll();
    })
  }
  scroll=()=>{
    const elemento=document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  render(){
    const cargando=this.state.cargando;
    let resultado;
    if(cargando){
      resultado=<div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
                </div>
    }else{
      resultado=<Resultado 
                  imagenes={this.state.imagenes}
                  paginaAnterior={this.paginaAnterior}
                  paginaSiguiente={this.paginaSiguiente}
                  pagina={this.state.pagina}
                  totalPaginas={this.state.totalPaginas}
                />
    }
    return(
      <div className="App container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          {resultado}
        </div>
      </div>
    )
  }
}

export default App;
