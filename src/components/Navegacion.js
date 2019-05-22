import React, {Component} from 'react';

class Navegacion extends Component {
    mostrarAnterior=()=>{
        const {pagina}=this.props;
        if (pagina===1) return null;
        return(
            <button onClick={this.props.paginaAnterior}  type="button" className="btn btn-info mr-1">&larr; Anterior</button>
        )
    }
    mostrarSiguiente=()=>{
        const {pagina, totalPaginas}=this.props;
        if (pagina===totalPaginas)return null;
        return(
            <button onClick={this.props.paginaSiguiente}  type="button" className="btn btn-info">Siguiente &rarr; </button>
        )
    }
    render(){
        return (
            <div className="row py-5">
                {this.mostrarAnterior()}
                {this.mostrarSiguiente()}
            </div>
        );
    }
    
};

export default Navegacion;