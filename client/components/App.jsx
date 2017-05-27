import React from 'react';
import Main from "./main.jsx"
import Nav from "./common/nav/nav.jsx"
 /*
    Componente fondamentale della nostra app, esso effettua il rendering del componente Header (La nostra barra di navigazione)
    e della pagina data dalla route scelta.
 */


export default class App extends React.Component {
  render() {
    return (
        <div>
            <Nav/>
            <Main/>
        </div>
    );
  }
}

