'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tcc-sceh-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-37a80f550131c0146ad83c0c343b2f6ce9ea17e35254c0a57e48f4b7eccee9a84c7357f8f43df63a787eef880aa457a422f0a8ba21b66f8ef5960665858a1467"' : 'data-target="#xs-components-links-module-AppModule-37a80f550131c0146ad83c0c343b2f6ce9ea17e35254c0a57e48f4b7eccee9a84c7357f8f43df63a787eef880aa457a422f0a8ba21b66f8ef5960665858a1467"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-37a80f550131c0146ad83c0c343b2f6ce9ea17e35254c0a57e48f4b7eccee9a84c7357f8f43df63a787eef880aa457a422f0a8ba21b66f8ef5960665858a1467"' :
                                            'id="xs-components-links-module-AppModule-37a80f550131c0146ad83c0c343b2f6ce9ea17e35254c0a57e48f4b7eccee9a84c7357f8f43df63a787eef880aa457a422f0a8ba21b66f8ef5960665858a1467"' }>
                                            <li class="link">
                                                <a href="components/AlertasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastrarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CadastrarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EntrarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntrarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecursoDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecursoDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecursoEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecursoEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReservaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReservaDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservaDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReservaEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservaEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RodapeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RodapeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitacaoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitacaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitacaoDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitacaoDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitacaoEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitacaoEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitacaoRecursoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitacaoRecursoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Funcionario.html" data-type="entity-link" >Funcionario</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuncionarioLogin.html" data-type="entity-link" >FuncionarioLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hospital.html" data-type="entity-link" >Hospital</a>
                            </li>
                            <li class="link">
                                <a href="classes/HospitalRequest.html" data-type="entity-link" >HospitalRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permissao.html" data-type="entity-link" >Permissao</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecursoHospitalar.html" data-type="entity-link" >RecursoHospitalar</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecursoRequest.html" data-type="entity-link" >RecursoRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reserva.html" data-type="entity-link" >Reserva</a>
                            </li>
                            <li class="link">
                                <a href="classes/SolicitacaoRequest.html" data-type="entity-link" >SolicitacaoRequest</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertasService.html" data-type="entity-link" >AlertasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HospitalService.html" data-type="entity-link" >HospitalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecursoService.html" data-type="entity-link" >RecursoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReservaService.html" data-type="entity-link" >ReservaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SolicitacaoService.html" data-type="entity-link" >SolicitacaoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});